import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const projectRoot = path.resolve(import.meta.dirname, "..");
const post = JSON.parse(await fs.readFile(path.join(projectRoot, "posts/SKL-0001-find-skills/post.json"), "utf8"));
const templateUrl = pathToFileURL(path.join(projectRoot, "templates/skillog-card-template.html")).href;
const widths = [320, 375, 414, 768, 1080];

const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
});

const failures = [];
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: Math.ceil(width * 4 / 3) } });
  await page.goto(templateUrl, { waitUntil: "networkidle" });
  for (let index = 0; index < post.cards.length; index += 1) {
    await page.evaluate(({ postData, cardIndex }) => window.renderSkillogCard(postData, cardIndex), {
      postData: post,
      cardIndex: index
    });
    const result = await page.evaluate(() => {
      window.scrollTo(100, 0);
      const card = document.querySelector("#card").getBoundingClientRect();
      return {
        scrollX: window.scrollX,
        cardLeft: card.left,
        cardRight: card.right,
        viewport: window.innerWidth
      };
    });
    if (result.scrollX !== 0 || result.cardLeft < -0.5 || result.cardRight > result.viewport + 0.5) {
      failures.push({ width, card: index + 1, ...result });
    }
  }
  await page.close();
}

await browser.close();
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}
console.log(`Template verification passed at ${widths.join(", ")} px for all ${post.cards.length} cards.`);
