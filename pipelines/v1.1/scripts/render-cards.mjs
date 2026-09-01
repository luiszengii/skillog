import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const projectRoot = path.resolve(import.meta.dirname, "../../..");
const postFile = path.resolve(projectRoot, process.argv[2] ?? "posts/SKL-0001-find-skills/data/post.json");
if (!process.argv[3]) {
  throw new Error("v1.1 trial rendering requires a layout config path; refusing to write into formal cards.");
}
const layoutFile = path.resolve(projectRoot, process.argv[3]);
const post = JSON.parse(await fs.readFile(postFile, "utf8"));
const layout = JSON.parse(await fs.readFile(layoutFile, "utf8"));
const outputDir = path.resolve(path.dirname(layoutFile), layout.outputDir ?? "cards");
const templateUrl = pathToFileURL(path.resolve(projectRoot, "pipelines/v1.1/layout/card-template.html")).href;

const choices = {
  result: ["dense-ledger", "split-stats"],
  intro: ["staggered-steps", "number-rail"],
  access: ["inline-audit", "split-command"]
};

function stableIndex(value, size) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash % size;
}

const requestedKinds = new Set(layout.cards ?? post.cards.map((card) => card.kind));
const resolvedVariants = Object.fromEntries(Object.entries(choices).map(([kind, variants]) => {
  const pinned = layout.variants?.[kind];
  if (pinned) {
    if (!variants.includes(pinned)) throw new Error(`Unknown ${kind} variant: ${pinned}`);
    return [kind, pinned];
  }
  const key = `${layout.seed ?? 1}:${post.id}:${kind}`;
  return [kind, variants[stableIndex(key, variants.length)]];
}));
post.layout = { seed: layout.seed ?? 1, resolvedVariants };

if (!post.illustration) throw new Error(`Missing illustration in ${postFile}`);
post.illustrationUrl = pathToFileURL(path.resolve(path.dirname(postFile), post.illustration)).href;

await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
});

for (let index = 0; index < post.cards.length; index += 1) {
  if (!requestedKinds.has(post.cards[index].kind)) continue;
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
const manifest = {
  pipelineVersion: "v1.1-trial",
  post: post.id,
  seed: post.layout.seed,
  cards: [...requestedKinds],
  resolvedVariants
};
await fs.writeFile(path.join(path.dirname(outputDir), "render-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Rendered ${[...requestedKinds].length} cards to ${outputDir}`);
console.log(`Resolved variants: ${JSON.stringify(resolvedVariants)}`);
