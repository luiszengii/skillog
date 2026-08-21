import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(import.meta.dirname, "..");
const baseUrl = process.argv[2] ?? "http://127.0.0.1:4173";
const exportData = JSON.parse(await fs.readFile(path.join(root, "data", "notion-export.json"), "utf8"));
const expectedDecisionCount = exportData.decisions.length;
const viewports = [
  { name: "mobile-320", width: 320, height: 720 },
  { name: "mobile-375", width: 375, height: 812 },
  { name: "mobile-414", width: 414, height: 896 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 1000 }
];

await fs.mkdir(path.join(root, "site-previews"), { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
});
const failures = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, permissions: ["clipboard-read", "clipboard-write"] });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForSelector(".post-feature");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.evaluate(async () => {
    const images = [...document.images];
    images.forEach((image) => { image.loading = "eager"; });
    await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
  });

  const state = await page.evaluate(() => ({
    title: document.title,
    hasContent: document.body.innerText.includes("SKL-0001"),
    decisionCount: document.querySelectorAll(".decision").length,
    imageCount: document.images.length,
    brokenImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  }));

  if (consoleErrors.length || !state.hasContent || state.decisionCount !== expectedDecisionCount || state.brokenImages.length || state.horizontalOverflow) {
    failures.push({ viewport: viewport.name, consoleErrors, ...state });
  }

  if (viewport.name === "mobile-375") {
    const button = page.getByRole("button", { name: "复制标题" });
    await button.click();
    await page.waitForFunction(() => document.querySelector("[data-copy-title]")?.textContent === "已复制");
  }

  if (viewport.name === "mobile-375" || viewport.name === "desktop-1440") {
    await page.screenshot({
      path: path.join(root, "site-previews", `${viewport.name}.png`),
      fullPage: true
    });
  }
  await context.close();
}

const zipResponse = await fetch(`${baseUrl}/assets/posts/SKL-0001/SKL-0001-cards.zip`);
if (!zipResponse.ok || Number(zipResponse.headers.get("content-length") ?? 0) === 0) {
  failures.push({ download: "SKL-0001-cards.zip", status: zipResponse.status });
}

await browser.close();
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}
console.log(`Site verification passed at ${viewports.map((item) => item.width).join(", ")} px; data, images, copy, and ZIP download are working.`);
