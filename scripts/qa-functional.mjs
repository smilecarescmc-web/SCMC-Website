import { chromium } from "playwright";
import fs from "node:fs";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3100";
const doctorSource = fs.readFileSync("lib/officialDoctors.ts", "utf8");
const blogSource = fs.readFileSync("lib/official-blog.generated.ts", "utf8");

const doctorSlugs = [...doctorSource.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const blogSlugs = [...blogSource.matchAll(/"slug":\s*"([^"]+)"/g)].map((m) => m[1]);

const serviceSlugs = [
  "dental",
  "botox-fillers",
  "dermatology",
  "facials",
  "laser-hair-removal",
  "laboratory",
];

const core = ["", "/services", "/doctors", "/about", "/contact", "/blog"];
const detail = [
  ...serviceSlugs.map((s) => `/services/${s}`),
  ...doctorSlugs.map((s) => `/doctors/${s}`),
  ...blogSlugs.map((s) => `/blog/${s}`),
];

const routes = ["en", "ar"].flatMap((locale) =>
  [...core, ...detail].map((path) => `/${locale}${path}`)
);

const browser = await chromium.launch({ headless: true });
const failures = [];

async function recordFailure(route, type, detail) {
  failures.push({ route, type, detail: String(detail) });
  console.error("FAIL", route, type, detail);
}

const context = await browser.newContext({ viewport: { width: 1440, height: 960 } });
const page = await context.newPage();

for (const route of routes) {
  // Move away before attaching route-specific listeners so cancellation of
  // the previous route cannot be attributed to the next one.
  await page.goto("about:blank", { waitUntil: "commit" }).catch(() => {});

  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];

  const onConsole = (msg) => {
    if (msg.type() === "error") {
      const text = msg.text();
      consoleErrors.push(text);
    }
  };
  const onPageError = (err) => pageErrors.push(err.message);
  const onFailed = (req) => {
    const url = req.url();
    const failure = req.failure()?.errorText || "FAILED";

    // Chromium aborts pending image/chunk requests when Playwright starts the
    // next navigation. This is expected browser behavior, not a site failure.
    if (failure === "net::ERR_ABORTED") return;

    const important = ["document", "script", "stylesheet", "image"].includes(req.resourceType());
    if (important && !url.includes("googletagmanager") && !url.includes("google-analytics")) {
      failedRequests.push(`${failure} ${url}`);
    }
  };

  page.on("console", onConsole);
  page.on("pageerror", onPageError);
  page.on("requestfailed", onFailed);

  try {
    const response = await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 30000 });
    const status = response?.status() || 0;
    if (status >= 400 || status === 0) await recordFailure(route, "http", status);

    await page.waitForSelector(".scmc-header", { timeout: 10000 });
    await page.waitForTimeout(350);

    const result = await page.evaluate((route) => {
      const ar = route.startsWith("/ar");
      const imgs = Array.from(document.images);
      return {
        lang: document.documentElement.lang,
        dir: document.documentElement.dir,
        broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
        oldHostImages: imgs.filter((i) => /smilecare\.ae/i.test(i.currentSrc || i.src)).map((i) => i.currentSrc || i.src),
        wrongWa: Array.from(document.querySelectorAll('a[href*="wa.me"]'))
          .map((a) => a.getAttribute("href") || "")
          .filter((href) => /97172282080/.test(href)),
        horizontalOverflow: Math.max(0, document.body.scrollWidth - window.innerWidth),
        expectedLang: ar ? "ar" : "en",
        expectedDir: ar ? "rtl" : "ltr",
      };
    }, route);

    if (result.lang !== result.expectedLang) await recordFailure(route, "lang", JSON.stringify(result));
    if (result.dir !== result.expectedDir) await recordFailure(route, "dir", JSON.stringify(result));
    if (result.broken.length) await recordFailure(route, "broken-images", result.broken.join("\n"));
    if (result.oldHostImages.length) await recordFailure(route, "old-host-images", result.oldHostImages.join("\n"));
    if (result.wrongWa.length) await recordFailure(route, "wrong-whatsapp", result.wrongWa.join("\n"));
    if (result.horizontalOverflow > 1) await recordFailure(route, "horizontal-overflow", result.horizontalOverflow);

    if (consoleErrors.length) await recordFailure(route, "console-error", consoleErrors.join("\n"));
    if (pageErrors.length) await recordFailure(route, "page-error", pageErrors.join("\n"));
    if (failedRequests.length) await recordFailure(route, "request-failed", failedRequests.join("\n"));
  } catch (err) {
    await recordFailure(route, "exception", err instanceof Error ? err.message : err);
  } finally {
    page.off("console", onConsole);
    page.off("pageerror", onPageError);
    page.off("requestfailed", onFailed);
  }
}

// Cross-route hash navigation: verifies cinematic transition does not erase #appointment.
try {
  await page.goto(base + "/en", { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".scmc-cinematic-preloader", { state: "detached", timeout: 7000 }).catch(() => {});
  const booking = page.locator('a[href="/en/contact#appointment"]').first();
  await booking.click();
  await page.waitForURL(/\/en\/contact#appointment/, { timeout: 10000 });
  await page.waitForTimeout(700);
  const hashResult = await page.evaluate(() => {
    const el = document.getElementById("appointment");
    if (!el) {
      return { found: false, top: null, hash: location.hash, viewportHeight: window.innerHeight };
    }
    return {
      found: true,
      top: el.getBoundingClientRect().top,
      hash: location.hash,
      viewportHeight: window.innerHeight,
    };
  });
  if (
    !hashResult.found ||
    hashResult.hash !== "#appointment" ||
    hashResult.top === null ||
    hashResult.top > hashResult.viewportHeight * 0.85
  ) {
    await recordFailure("/en -> /en/contact#appointment", "hash-navigation", JSON.stringify(hashResult));
  }
} catch (err) {
  await recordFailure("/en -> /en/contact#appointment", "hash-navigation-exception", err instanceof Error ? err.message : err);
}

// Mobile/tablet smoke test for menu and overflow.
for (const viewport of [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tablet-1024", width: 1024, height: 768 },
  { name: "desktop-1920", width: 1920, height: 1080 },
]) {
  const ctx = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  const p = await ctx.newPage();
  for (const route of ["/en", "/ar", "/en/doctors", "/ar/doctors", "/en/contact", "/ar/contact"]) {
    try {
      const response = await p.goto(base + route, { waitUntil: "domcontentloaded", timeout: 30000 });
      if (!response || response.status() >= 400) await recordFailure(`${viewport.name} ${route}`, "http", response?.status());
      const overflow = await p.evaluate(() => Math.max(0, document.body.scrollWidth - innerWidth));
      if (overflow > 1) await recordFailure(`${viewport.name} ${route}`, "horizontal-overflow", overflow);
    } catch (err) {
      await recordFailure(`${viewport.name} ${route}`, "viewport-exception", err instanceof Error ? err.message : err);
    }
  }
  await ctx.close();
}

await context.close();
await browser.close();

fs.mkdirSync("qa-artifacts", { recursive: true });
fs.writeFileSync(
  "qa-artifacts/functional-report.json",
  JSON.stringify({ generatedAt: new Date().toISOString(), checkedRoutes: routes.length, failures }, null, 2)
);

if (failures.length) {
  console.error(`Functional QA failed: ${failures.length} issue(s).`);
  process.exit(1);
}
console.log(`Functional QA PASS Ã¢â‚¬â€ ${routes.length} EN/AR routes + responsive/hash smoke tests.`);