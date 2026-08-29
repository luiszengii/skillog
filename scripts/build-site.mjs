import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = path.resolve(import.meta.dirname, "..");
const docs = path.join(root, "docs");
const assets = path.join(docs, "assets");
const postAssets = path.join(assets, "posts", "SKL-0001");

await fs.mkdir(path.join(docs, "data"), { recursive: true });
await fs.mkdir(path.join(assets, "notion"), { recursive: true });
await fs.mkdir(path.join(assets, "mascot"), { recursive: true });
await fs.mkdir(postAssets, { recursive: true });

const copies = [
  ["site/index.html", "docs/index.html"],
  ["site/site.css", "docs/assets/site.css"],
  ["site/site.js", "docs/assets/site.js"],
  ["site/favicon.svg", "docs/assets/favicon.svg"],
  ["site/robots.txt", "docs/robots.txt"],
  ["tokens.css", "docs/assets/tokens.css"],
  ["data/notion-export.json", "docs/data/notion-export.json"],
  ["data/conversations.json", "docs/data/conversations.json"],
  ["data/metrics.json", "docs/data/metrics.json"],
  ["data/notion-assets/root-01.png", "docs/assets/notion/root-01.png"],
  ["data/notion-assets/root-02.png", "docs/assets/notion/root-02.png"],
  ["assets/mascot/skillog-robot-reference-v2.png", "docs/assets/mascot/skillog-robot-reference-v2.png"],
  ["posts/SKL-0001-find-skills/caption.md", "docs/assets/posts/SKL-0001/caption.md"]
];

const cards = ["01-cover.png", "02-result.png", "03-intro.png", "04-access.png"];
for (const card of cards) copies.push([
  `posts/SKL-0001-find-skills/cards/${card}`,
  `docs/assets/posts/SKL-0001/${card}`
]);

for (const [source, target] of copies) {
  await fs.copyFile(path.join(root, source), path.join(root, target));
}

const journalTarget = path.join(assets, "journal");
await fs.rm(journalTarget, { recursive: true, force: true });
await fs.cp(path.join(root, "journal"), journalTarget, { recursive: true });

const zipPath = path.join(postAssets, "SKL-0001-cards.zip");
await fs.rm(zipPath, { force: true });
await execFileAsync("/usr/bin/zip", [
  "-j",
  "-q",
  "-X",
  zipPath,
  ...cards.map((card) => path.join(root, "posts", "SKL-0001-find-skills", "cards", card))
]);

await fs.writeFile(path.join(docs, ".nojekyll"), "", "utf8");
await fs.copyFile(path.join(docs, "index.html"), path.join(docs, "404.html"));
console.log(`Built GitHub Pages output in ${docs}`);
