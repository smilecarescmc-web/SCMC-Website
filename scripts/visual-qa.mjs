import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3100";
const outDir = path.resolve("qa-artifacts");
await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(outDir, { recursive: true });

const routes = [
  "/en",
  "/en/services",
  "/en/doctors",
  "/en/about",
  "/en/contact",
  "/en/blog",
  "/ar",
  "/ar/services",
  "/ar/doctors",
  "/ar/about",
  "/ar/contact",
  "/ar/blog",
  "/en/blog/when-dental-implants-become-a-necessity-to-preserve-the-jaw",
  "/ar/blog/precise-skin-analysis-5-essential-steps",
];

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile-375", width: 375, height: 812 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-430", width: 430, height: 932 },
];

const themes = ["light", "dark"];
const browser = await chromium.launch({ headless: true });
const results = [];

for (const viewport of viewports) {
  for (const theme of themes) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      colorScheme: theme,
      deviceScaleFactor: 1,
    });

    await context.addInitScript((value) => {
      localStorage.setItem("scmc-theme", value);
      document.documentElement.dataset.theme = value;
    }, theme);

    const page = await context.newPage();

    for (const route of routes) {
      const slug = route.replace(/^\//, "").replaceAll("/", "__") || "root";
      const filename = `${viewport.name}__${theme}__${slug}.png`;
      const url = base + route;

      let status = null;
      let error = null;
      let metrics = null;

      try {
        const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
        status = response?.status() ?? null;
        await page.waitForSelector(".scmc-header", { timeout: 10000 });
        await page.waitForSelector(".scmc-cinematic-preloader", { state: "detached", timeout: 6000 }).catch(() => {});
        await page.evaluate(async () => {
          if (document.fonts?.ready) await document.fonts.ready;
          const step = Math.max(320, Math.floor(window.innerHeight * 0.72));
          for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((resolve) => setTimeout(resolve, 110));
          }
          window.scrollTo(0, document.body.scrollHeight);
          await new Promise((resolve) => setTimeout(resolve, 350));
          await Promise.race([
            Promise.all(
              Array.from(document.images).map((img) =>
                img.complete
                  ? Promise.resolve()
                  : new Promise((resolve) => {
                      img.addEventListener("load", resolve, { once: true });
                      img.addEventListener("error", resolve, { once: true });
                    })
              )
            ),
            new Promise((resolve) => setTimeout(resolve, 12000)),
          ]);
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(300);

        metrics = await page.evaluate(({ route, theme }) => {
          const root = document.documentElement;
          const body = document.body;
          const header = document.querySelector(".scmc-header");
          const headerRect = header?.getBoundingClientRect();
          const bodyStyle = getComputedStyle(body);
          const expectedDir = route.startsWith("/ar") ? "rtl" : "ltr";
          const heroVideo = document.querySelector(".scmc-hero__video");
          const brokenImages = Array.from(document.images)
            .filter((img) => img.complete && img.naturalWidth === 0)
            .map((img) => img.currentSrc || img.src);

          return {
            title: document.title,
            dir: root.dir,
            expectedDir,
            lang: root.lang,
            theme: root.dataset.theme || "",
            expectedTheme: theme,
            fontFamily: bodyStyle.fontFamily,
            bodyScrollWidth: body.scrollWidth,
            viewportWidth: window.innerWidth,
            horizontalOverflow: Math.max(0, body.scrollWidth - window.innerWidth),
            headerVisible: Boolean(headerRect && headerRect.width > 0 && headerRect.bottom > 0 && headerRect.top < window.innerHeight),
            headerWithinViewport: Boolean(headerRect && headerRect.left >= -1 && headerRect.right <= window.innerWidth + 1),
            h1: document.querySelector("h1")?.textContent?.trim() || "",
            heroVideoSrc: heroVideo?.getAttribute("src") || "",
            brokenImages,
          };
        }, { route, theme });

        await page.screenshot({ path: path.join(outDir, filename), fullPage: true, animations: "disabled" });
      } catch (err) {
        error = err instanceof Error ? err.message : String(err);
      }

      const passed = Boolean(
        !error &&
        status && status < 400 &&
        metrics &&
        metrics.dir === metrics.expectedDir &&
        metrics.theme === metrics.expectedTheme &&
        metrics.horizontalOverflow <= 1 &&
        metrics.headerVisible &&
        metrics.headerWithinViewport &&
        metrics.h1 &&
        metrics.fontFamily.toLowerCase().includes("almarai") &&
        metrics.brokenImages.length === 0 &&
        (!route.endsWith("/en") || true)
      );

      results.push({ route, viewport: viewport.name, theme, status, passed, error, metrics });
      console.log(`${passed ? "PASS" : "FAIL"} ${viewport.name} ${theme} ${route}`);
    }

    await context.close();
  }
}

await browser.close();

const failures = results.filter((item) => !item.passed);
await fs.writeFile(path.join(outDir, "report.json"), JSON.stringify({ generatedAt: new Date().toISOString(), total: results.length, failures: failures.length, results }, null, 2));
await fs.writeFile(path.join(outDir, "summary.txt"), [
  `Total checks: ${results.length}`,
  `Failures: ${failures.length}`,
  "",
  ...failures.map((f) => `${f.viewport} | ${f.theme} | ${f.route} | ${f.error || JSON.stringify(f.metrics)}`)
].join("\n"));

if (failures.length) process.exitCode = 1;
