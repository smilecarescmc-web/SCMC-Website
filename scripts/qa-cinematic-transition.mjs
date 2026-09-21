import { chromium } from "playwright";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3100";
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 960 } });
const page = await context.newPage();

await page.goto(base + "/en", { waitUntil: "domcontentloaded", timeout: 30000 });

await page.waitForFunction(() => {
  const el = document.querySelector(".scmc-cinematic-preloader");
  if (!el) return true;
  const s = getComputedStyle(el);
  return s.visibility === "hidden" || s.pointerEvents === "none" || Number.parseFloat(s.opacity || "1") <= 0.05;
}, undefined, { timeout: 2500 }).catch(() => {});

const link = page.locator('a[href="/en/services"]').first();
await link.waitFor({ state: "visible", timeout: 10000 });
await link.hover().catch(() => {});
await page.waitForTimeout(80);

const started = Date.now();
await link.evaluate((el) => el.click());

const overlay = page.locator(".scmc-cinematic-transition--v19r");
await overlay.waitFor({ state: "visible", timeout: 800 });

const running = await page.evaluate(() => {
  const overlay = document.querySelector(".scmc-cinematic-transition--v19r");
  const left = document.querySelector(".scmc-cinematic-transition--v19r .scmc-transition-panel--left");
  const right = document.querySelector(".scmc-cinematic-transition--v19r .scmc-transition-panel--right");
  return {
    overlayAnimations: overlay?.getAnimations().length ?? 0,
    leftAnimations: left?.getAnimations().length ?? 0,
    rightAnimations: right?.getAnimations().length ?? 0,
  };
});

if (running.overlayAnimations < 1 || running.leftAnimations < 1 || running.rightAnimations < 1) {
  throw new Error(`Cinematic compositor animations missing: ${JSON.stringify(running)}`);
}

await page.waitForURL((url) => url.pathname === "/en/services", { timeout: 4000 });

await page.waitForFunction(() => {
  const el = document.querySelector(".scmc-cinematic-transition--v19r");
  if (!el) return true;
  const s = getComputedStyle(el);
  return s.visibility === "hidden" || s.pointerEvents === "none" || Number.parseFloat(s.opacity || "1") <= 0.05;
}, undefined, { timeout: 1900 });

const visualMs = Date.now() - started;
if (visualMs < 1050 || visualMs > 1850) {
  throw new Error(`Unexpected cinematic visual duration: ${visualMs}ms`);
}

await context.close();
await browser.close();

console.log(`Cinematic compositor QA PASS — visual sequence ${visualMs}ms.`);
