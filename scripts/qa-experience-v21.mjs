import { chromium } from "playwright";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3100";
const browser = await chromium.launch({ headless: true });
const failures = [];

function fail(name, detail) {
  failures.push({ name, detail: String(detail) });
  console.error("FAIL", name, detail);
}

async function waitVisualRelease(page, selector, timeout) {
  await page.waitForFunction((selector) => {
    const el = document.querySelector(selector);
    if (!el) return true;

    const style = getComputedStyle(el);
    return (
      style.visibility === "hidden" ||
      style.pointerEvents === "none" ||
      Number.parseFloat(style.opacity || "1") <= 0.05
    );
  }, selector, { timeout });
}

const context = await browser.newContext({
  viewport: { width: 1440, height: 960 },
  reducedMotion: "no-preference",
});

const page = await context.newPage();

/* PRELOADER */
await page.goto(base + "/en", { waitUntil: "domcontentloaded", timeout: 30000 });

const preloaderStarted = Date.now();
const preloader = page.locator(".scmc-cinematic-preloader--v21");
await preloader.waitFor({ state: "attached", timeout: 1000 });

const preloaderAnimations = await page.evaluate(() => {
  const root = document.querySelector(".scmc-cinematic-preloader--v21");
  const top = document.querySelector(".scmc-v21-preloader__shutter--top");
  const bottom = document.querySelector(".scmc-v21-preloader__shutter--bottom");
  const beam = document.querySelector(".scmc-v21-preloader__beam");

  return {
    root: root?.getAnimations().length ?? 0,
    top: top?.getAnimations().length ?? 0,
    bottom: bottom?.getAnimations().length ?? 0,
    beam: beam?.getAnimations().length ?? 0,
  };
});

if (
  preloaderAnimations.root < 1 ||
  preloaderAnimations.top < 1 ||
  preloaderAnimations.bottom < 1 ||
  preloaderAnimations.beam < 1
) {
  fail("preloader-motion", JSON.stringify(preloaderAnimations));
}

await waitVisualRelease(page, ".scmc-cinematic-preloader--v21", 2600);
const preloaderMs = Date.now() - preloaderStarted;

if (preloaderMs < 1050 || preloaderMs > 2300) {
  fail("preloader-duration", `${preloaderMs}ms`);
}

/* TRANSITION */
const services = page.locator('a[href="/en/services"]').first();
await services.waitFor({ state: "visible", timeout: 10000 });
await services.hover().catch(() => {});
await page.waitForTimeout(80);

const transitionStarted = Date.now();
await services.evaluate((el) => el.click());

const transition = page.locator(".scmc-v21-transition");
await transition.waitFor({ state: "attached", timeout: 600 });

const transitionAnimations = await page.evaluate(() => {
  const root = document.querySelector(".scmc-v21-transition");
  const a = document.querySelector(".scmc-v21-transition__plane--a");
  const b = document.querySelector(".scmc-v21-transition__plane--b");
  const c = document.querySelector(".scmc-v21-transition__plane--c");
  const sweep = document.querySelector(".scmc-v21-transition__sweep");

  return {
    root: root?.getAnimations().length ?? 0,
    a: a?.getAnimations().length ?? 0,
    b: b?.getAnimations().length ?? 0,
    c: c?.getAnimations().length ?? 0,
    sweep: sweep?.getAnimations().length ?? 0,
  };
});

if (
  transitionAnimations.root < 1 ||
  transitionAnimations.a < 1 ||
  transitionAnimations.b < 1 ||
  transitionAnimations.c < 1 ||
  transitionAnimations.sweep < 1
) {
  fail("transition-motion", JSON.stringify(transitionAnimations));
}

await page.waitForURL((url) => url.pathname === "/en/services", { timeout: 4000 });
await waitVisualRelease(page, ".scmc-v21-transition", 1800);

const transitionMs = Date.now() - transitionStarted;
if (transitionMs < 900 || transitionMs > 1700) {
  fail("transition-duration", `${transitionMs}ms`);
}

/* DOCTORS PAGE */
await page.goto(base + "/en/doctors", { waitUntil: "domcontentloaded", timeout: 30000 });
await waitVisualRelease(page, ".scmc-cinematic-preloader--v21", 2600);

await page.waitForFunction(async () => {
  const imgs = Array.from(document.querySelectorAll(".scmc-doctor-directory--v21 img"));
  if (imgs.length < 14) return false;

  if (!imgs.every((img) => img.complete && img.naturalWidth > 0)) return false;

  await Promise.all(imgs.map((img) => img.decode?.().catch(() => undefined)));
  return true;
}, undefined, { timeout: 15000 });

await page.waitForTimeout(220);

const doctorImageAudit = await page.evaluate(() => {
  const imgs = Array.from(document.querySelectorAll(".scmc-doctor-directory--v21 img"));
  const rawHuge = imgs
    .map((img) => img.currentSrc || img.src)
    .filter((src) => /\/assets\/doctors-final\//i.test(src) && !/\/_next\/image/i.test(src));

  return {
    count: imgs.length,
    rawHuge,
    proxied: imgs.filter((img) => /\/_next\/image/i.test(img.currentSrc || img.src)).length,
  };
});

if (doctorImageAudit.count < 14) fail("doctor-image-count", doctorImageAudit.count);
if (doctorImageAudit.rawHuge.length) fail("doctor-raw-huge-images", doctorImageAudit.rawHuge.join("\n"));
if (doctorImageAudit.proxied < 14) fail("doctor-next-image-proxy", JSON.stringify(doctorImageAudit));

const frameResult = await page.evaluate(async () => {
  document.documentElement.style.scrollBehavior = "auto";
  document.body.style.scrollBehavior = "auto";

  const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  window.scrollTo(0, 0);

  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  const gaps = [];
  let last = performance.now();

  for (let i = 1; i <= 54; i += 1) {
    await new Promise((resolve) => {
      requestAnimationFrame((now) => {
        gaps.push(now - last);
        last = now;
        window.scrollTo(0, (max * i) / 54);
        resolve();
      });
    });
  }

  const usable = gaps.slice(3);
  const sorted = [...usable].sort((a, b) => a - b);
  const p95 = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))];

  return {
    max: Math.max(...usable),
    avg: usable.reduce((sum, value) => sum + value, 0) / usable.length,
    p95,
  };
});

console.log(
  `Doctors steady-state scroll: avg=${frameResult.avg.toFixed(1)}ms p95=${frameResult.p95.toFixed(1)}ms max=${frameResult.max.toFixed(1)}ms`
);

if (frameResult.avg > 65) fail("doctor-scroll-avg", `${frameResult.avg.toFixed(1)}ms`);
if (frameResult.p95 > 120) fail("doctor-scroll-p95", `${frameResult.p95.toFixed(1)}ms`);
if (frameResult.max > 350) fail("doctor-scroll-max", `${frameResult.max.toFixed(1)}ms`);

/* HOME DOCTOR DISCOVERY */
await page.goto(base + "/en", { waitUntil: "domcontentloaded", timeout: 30000 });
await waitVisualRelease(page, ".scmc-cinematic-preloader--v21", 2600);

const discovery = await page.evaluate(() => {
  const section = document.querySelector(".scmc-doctor-discovery");
  const track = document.querySelector(".scmc-doctor-discovery__track");
  const viewport = document.querySelector(".scmc-doctor-discovery__viewport--desktop");

  if (!section || !track || !viewport) return null;

  const maxShift = Math.max(0, track.scrollWidth - viewport.clientWidth);
  const travel = Math.max(1, section.offsetHeight - innerHeight);

  return {
    maxShift,
    travel,
    gain: maxShift / travel,
  };
});

if (!discovery) {
  fail("doctor-discovery", "missing");
} else if (discovery.maxShift > 0 && discovery.gain < 1.5) {
  fail("doctor-discovery-gain", JSON.stringify(discovery));
}

await context.close();
await browser.close();

if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log(
  `SCMC V21 EXPERIENCE QA PASS — preloader=${preloaderMs}ms transition=${transitionMs}ms doctors avg=${frameResult.avg.toFixed(1)}ms p95=${frameResult.p95.toFixed(1)}ms.`
);
