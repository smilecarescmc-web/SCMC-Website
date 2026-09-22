import { chromium } from "playwright";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3100";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 960 },
  reducedMotion: "no-preference",
});

const failures = [];

function fail(name, detail) {
  failures.push({ name, detail: String(detail) });
  console.error("FAIL", name, detail);
}

async function waitPreloader() {
  await page.waitForFunction(() => {
    const el = document.querySelector(".scmc-cinematic-preloader");
    if (!el) return true;
    const s = getComputedStyle(el);
    return (
      s.visibility === "hidden" ||
      s.pointerEvents === "none" ||
      Number.parseFloat(s.opacity || "1") <= 0.05
    );
  }, undefined, { timeout: 3500 }).catch(() => {});
}

async function y() {
  return page.evaluate(() => Math.round(window.scrollY));
}

await page.goto(base + "/en/doctors", { waitUntil: "domcontentloaded" });
await waitPreloader();
const beforeSame = await page.evaluate(async () => {
  const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
  const target = Math.min(Math.max(420, innerHeight * 0.65), max);

  window.scrollTo({ top: target, left: 0, behavior: "instant" });
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  return Math.round(window.scrollY);
});

console.log(`INFO same-route test starts at scrollY=${beforeSame}`);

await page.locator('.scmc-header__nav a[href="/en/doctors"]').click();
await page.waitForTimeout(700);
const afterSame = await y();
if (afterSame > 8) fail("same-route-active-link-top", afterSame);
else console.log("PASS same-route active header link returns to top");

await page.evaluate(() => window.scrollTo(0, Math.min(1100, document.documentElement.scrollHeight - innerHeight)));
await page.locator('.scmc-header__nav a[href="/en/services"]').click();
await page.waitForURL("**/en/services");
await page.waitForTimeout(250);
const crossTop = await y();
if (crossTop > 8) fail("cross-route-new-page-top", crossTop);
else console.log("PASS cross-route navigation opens at top");

await page.evaluate(() => window.scrollTo(0, Math.min(900, document.documentElement.scrollHeight - innerHeight)));
await page.locator('.scmc-header__nav a[href="/en/doctors"]').click();
await page.waitForURL("**/en/doctors");
await page.waitForTimeout(250);
const returnTop = await y();
if (returnTop > 8) fail("return-route-top", returnTop);
else console.log("PASS returning to visited route opens at top");

await page.evaluate(() => window.scrollTo(0, Math.min(800, document.documentElement.scrollHeight - innerHeight)));
await page.locator('.scmc-header__nav a[href="/en/about"]').click();
await page.waitForURL("**/en/about");
await page.waitForTimeout(200);
await page.goBack({ waitUntil: "domcontentloaded" });
await page.waitForURL("**/en/doctors");
await page.waitForTimeout(250);
const backTop = await y();
if (backTop > 8) fail("browser-back-top", backTop);
else console.log("PASS browser back uses manual top restoration");

await page.goto(base + "/en/services", { waitUntil: "domcontentloaded" });
await waitPreloader();
await page.locator('a[href="/en/contact#appointment"]').first().click();
await page.waitForURL("**/en/contact#appointment");
await page.waitForTimeout(250);

const hashState = await page.evaluate(() => {
  const target = document.getElementById("appointment");
  if (!target) return { exists: false, top: 99999 };
  return { exists: true, top: Math.round(target.getBoundingClientRect().top) };
});

if (!hashState.exists) fail("appointment-anchor-exists", "missing");
else if (Math.abs(hashState.top) > 80) fail("appointment-anchor-position", hashState.top);
else console.log("PASS intentional #appointment anchor preserved");

await browser.close();

if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log("SCMC scroll restoration QA PASS.");
