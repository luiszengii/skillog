import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const projectRoot = path.resolve(import.meta.dirname, "../../..");
const postFile = path.resolve(projectRoot, process.argv[2] ?? "posts/SKL-0001-find-skills/data/post.json");
const post = JSON.parse(await fs.readFile(postFile, "utf8"));
const postRoot = path.basename(path.dirname(postFile)) === "data"
  ? path.resolve(path.dirname(postFile), "..")
  : path.dirname(postFile);
const outputDir = path.join(postRoot, "cards");
const templateUrl = pathToFileURL(path.resolve(projectRoot, "pipelines/v1/layout/card-template.html")).href;

if (!post.illustration) throw new Error(`Missing illustration in ${postFile}`);
post.illustrationUrl = pathToFileURL(path.resolve(path.dirname(postFile), post.illustration)).href;

await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
});

for (let index = 0; index < post.cards.length; index += 1) {
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1440 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  await page.goto(templateUrl, { waitUntil: "networkidle" });
  await page.evaluate(({ postData, cardIndex }) => window.renderSkillogCard(postData, cardIndex), {
    postData: post,
    cardIndex: index
  });
  await page.waitForFunction(() => document.documentElement.dataset.ready === "true");
  const filename = `${String(index + 1).padStart(2, "0")}-${post.cards[index].kind}.png`;
  await page.locator("#card").screenshot({ path: path.join(outputDir, filename) });
  await context.close();
}

await browser.close();
console.log(`Rendered ${post.cards.length} cards to ${outputDir}`);
