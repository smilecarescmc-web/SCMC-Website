import { chromium } from "playwright";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3100";
const browser = await chromium.launch({ headless: true });
const failures = [];

function fail(name, detail) {
  failures.push({ name, detail: String(detail) });
  console.error("FAIL", name, detail);
}

for (const viewport of [
  { name: "desktop", width: 1440, height: 960 },
  { name: "mobile", width: 390, height: 844 },
]) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    reducedMotion: "no-preference",
  });

  const page = await context.newPage();

  for (const route of ["/en", "/en/blog", "/en/doctors", "/ar/blog", "/ar/doctors"]) {
    await page.goto(base + route, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    await page.waitForFunction(() => {
      const el = document.querySelector(".scmc-cinematic-preloader");
      if (!el) return true;
      const s = getComputedStyle(el);
      return (
        s.visibility === "hidden" ||
        s.pointerEvents === "none" ||
        Number.parseFloat(s.opacity || "1") <= 0.05
      );
    }, undefined, { timeout: 3000 }).catch(() => {});

    await page.waitForTimeout(550);

    const state = await page.evaluate((route) => {
      const blurNodes = document.querySelectorAll(".scmc-proximity-node--blur").length;
      const doctorNodes = Array.from(
        document.querySelectorAll(".scmc-doctor-directory--v21 .scmc-proximity-node--doctor")
      );

      const blogIntro = document.querySelector(
        ".scmc-blog-intro .scmc-inner-hero__grid > p"
      )?.textContent?.trim() || "";

      const doctorFilters = doctorNodes.map((node) => getComputedStyle(node).filter);

      return {
        route,
        blurNodes,
        doctorNodes: doctorNodes.length,
        doctorFilters,
        blogIntro,
        overflow: Math.max(
          0,
          document.documentElement.scrollWidth - innerWidth
        ),
      };
    }, route);

    if (state.overflow > 1) fail(`${viewport.name}-${route}-overflow`, state.overflow);

    if (route.endsWith("/doctors")) {
      if (state.doctorNodes !== 14) {
        fail(`${viewport.name}-${route}-doctor-motion-count`, state.doctorNodes);
      }
      if (state.doctorFilters.some((value) => value !== "none")) {
        fail(`${viewport.name}-${route}-doctor-filter`, JSON.stringify(state.doctorFilters));
      }
    }

    if (route === "/en/blog") {
      if (!state.blogIntro.includes("Medical insights from Smile Care")) {
        fail(`${viewport.name}-en-blog-copy`, state.blogIntro);
      }
      if (state.blurNodes < 1) fail(`${viewport.name}-en-blog-blur`, "no blur nodes");
    }

    if (route === "/ar/blog") {
      if (!state.blogIntro.includes("مقالات ونصائح طبية من سمايل كير")) {
        fail(`${viewport.name}-ar-blog-copy`, state.blogIntro);
      }
    }

    console.log(`PASS ${viewport.name} ${route}`);
  }

  await context.close();
}

await browser.close();

if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log("V22.1 hybrid blur + doctor motion + blog copy QA PASS.");
