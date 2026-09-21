import { chromium } from "playwright";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3100";
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 960 } });
const page = await context.newPage();

const failures = [];

function fail(name, detail) {
  failures.push({ name, detail });
  console.error("FAIL", name, detail);
}

async function waitForPreloaderRelease(timeout = 2200) {
  await page.waitForFunction(() => {
    const el = document.querySelector(".scmc-cinematic-preloader");
    if (!el) return true;

    const style = getComputedStyle(el);
    return (
      style.visibility === "hidden" ||
      style.pointerEvents === "none" ||
      Number.parseFloat(style.opacity || "1") <= 0.05
    );
  }, undefined, { timeout });
}

async function clickAndMeasure(from, href, expectedPath, readySelector = "h1") {
  await page.goto(base + from, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector(".scmc-header", { timeout: 10000 });
  await waitForPreloaderRelease().catch(() => {});

  const link = page.locator(`a[href="${href}"]`).first();
  await link.waitFor({ state: "visible", timeout: 10000 });

  await link.hover().catch(() => {});
  await page.waitForTimeout(100);

  const started = Date.now();
  await link.evaluate((element) => element.click());

  await page.waitForURL((url) => url.pathname === expectedPath, { timeout: 4000 });
  const routeCommitMs = Date.now() - started;

  await page.waitForSelector(readySelector, { state: "visible", timeout: 4000 });
  const contentReadyMs = Date.now() - started;

  await page.waitForFunction(() => {
    const el = document.querySelector(".scmc-cinematic-transition");
    if (!el) return true;
    const style = getComputedStyle(el);
    return (
      style.visibility === "hidden" ||
      Number.parseFloat(style.opacity || "1") <= 0.05
    );
  }, undefined, { timeout: 2200 }).catch(() => {});

  const settledMs = Date.now() - started;

  console.log(`NAV ${from} -> ${expectedPath}: route=${routeCommitMs}ms content=${contentReadyMs}ms settled=${settledMs}ms`);

  if (routeCommitMs > 1300) fail(`${from} -> ${expectedPath}`, `route commit ${routeCommitMs}ms`);
  if (contentReadyMs > 1500) fail(`${from} -> ${expectedPath}`, `content ready ${contentReadyMs}ms`);
  if (settledMs > 1900) fail(`${from} -> ${expectedPath}`, `transition settled ${settledMs}ms`);
}

await page.goto(base + "/en", { waitUntil: "domcontentloaded", timeout: 30000 });
const preloaderStart = Date.now();
await waitForPreloaderRelease(2200).catch(() => {});
const preloaderMs = Date.now() - preloaderStart;

console.log(`FIRST VISIT PRELOADER BLOCKING TIME after DOMContentLoaded: ${preloaderMs}ms`);
if (preloaderMs > 1900) fail("preloader", `${preloaderMs}ms blocking after DOMContentLoaded`);

await clickAndMeasure("/en", "/en/services", "/en/services");
await clickAndMeasure("/en/services", "/en/doctors", "/en/doctors");
await clickAndMeasure("/en/doctors", "/en/contact#appointment", "/en/contact", "#appointment");

await context.close();
await browser.close();

if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log("Navigation performance smoke QA PASS.");
