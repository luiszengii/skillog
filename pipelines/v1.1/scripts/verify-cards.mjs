import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const projectRoot = path.resolve(import.meta.dirname, "../../..");
const postFile = path.resolve(projectRoot, process.argv[2] ?? "posts/SKL-0001-find-skills/data/post.json");
if (!process.argv[3]) {
  throw new Error("v1.1 trial verification requires a layout config path.");
}
const layoutFile = path.resolve(projectRoot, process.argv[3]);
const post = JSON.parse(await fs.readFile(postFile, "utf8"));
const layout = JSON.parse(await fs.readFile(layoutFile, "utf8"));
post.illustrationUrl = pathToFileURL(path.resolve(path.dirname(postFile), post.illustration)).href;
const templateUrl = pathToFileURL(path.join(projectRoot, "pipelines/v1.1/layout/card-template.html")).href;
const widths = [320, 375, 414, 768, 1080];
const requestedKinds = new Set(layout.cards ?? post.cards.map((card) => card.kind));

const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
});

const failures = [];
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: Math.ceil(width * 4 / 3) } });
  await page.goto(templateUrl, { waitUntil: "networkidle" });
  for (let index = 0; index < post.cards.length; index += 1) {
    if (!requestedKinds.has(post.cards[index].kind)) continue;
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

    const alignment = await page.evaluate((kind) => {
      const rounded = (value) => Math.round(value * 10) / 10;
      if (kind === "result") {
        const heading = document.querySelector(".result-page > section:first-child").getBoundingClientRect();
        const panel = document.querySelector(".result-panel").getBoundingClientRect();
        const stats = document.querySelector(".result-page__stats").getBoundingClientRect();
        const statBoxes = [...document.querySelectorAll(".stat")].map((node) => node.getBoundingClientRect());
        return {
          kind,
          sharedLeft: [heading.left, panel.left, stats.left].map(rounded),
          statTops: statBoxes.map((box) => rounded(box.top)),
          statWidths: statBoxes.map((box) => rounded(box.width))
        };
      }
      if (kind === "intro") {
        return {
          kind,
          stepTextLefts: [...document.querySelectorAll(".step > div")]
            .map((node) => rounded(node.getBoundingClientRect().left))
        };
      }
      return { kind };
    }, post.cards[index].kind);

    const allEqual = (values = []) => values.every((value) => Math.abs(value - values[0]) <= 0.5);
    if (alignment.kind === "result" && (
      !allEqual(alignment.sharedLeft) ||
      !allEqual(alignment.statTops) ||
      !allEqual(alignment.statWidths)
    )) {
      failures.push({ width, card: index + 1, alignment });
    }
    if (alignment.kind === "intro" && !allEqual(alignment.stepTextLefts)) {
      failures.push({ width, card: index + 1, alignment });
    }
  }
  await page.close();
}

await browser.close();
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}
console.log(`Template verification passed at ${widths.join(", ")} px for ${[...requestedKinds].join(", ")}.`);
