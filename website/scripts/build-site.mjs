import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = path.resolve(import.meta.dirname, "../..");
const website = path.join(root, "website");
const docs = path.join(root, "docs");
const assets = path.join(docs, "assets");
const postsRoot = path.join(root, "posts");

await fs.rm(docs, { recursive: true, force: true });
await fs.mkdir(path.join(docs, "data"), { recursive: true });
await fs.mkdir(path.join(assets, "notion"), { recursive: true });
await fs.mkdir(path.join(assets, "mascot"), { recursive: true });

const copies = [
  ["website/src/index.html", "docs/index.html"],
  ["website/src/site.css", "docs/assets/site.css"],
  ["website/src/site.js", "docs/assets/site.js"],
  ["website/src/favicon.svg", "docs/assets/favicon.svg"],
  ["website/src/robots.txt", "docs/robots.txt"],
  ["pipelines/v1/layout/tokens.css", "docs/assets/tokens.css"],
  ["website/data/conversations.json", "docs/data/conversations.json"],
  ["website/assets/notion/root-01.png", "docs/assets/notion/root-01.png"],
  ["website/assets/notion/root-02.png", "docs/assets/notion/root-02.png"],
  ["pipelines/v1/illustration/skillog-robot-illustrations/assets/skillog-robot-reference.png", "docs/assets/mascot/skillog-robot-reference-v2.png"]
];

for (const [source, target] of copies) {
  await fs.copyFile(path.join(root, source), path.join(root, target));
}

const journalTarget = path.join(assets, "journal");
await fs.cp(path.join(website, "archive"), journalTarget, { recursive: true });

const project = JSON.parse(await fs.readFile(path.join(website, "data/project.json"), "utf8"));
const postDirectories = (await fs.readdir(postsRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
const content = [];
const metricEntries = [];

for (const directory of postDirectories) {
  const postRoot = path.join(postsRoot, directory);
  const postFile = path.join(postRoot, "data/post.json");
  try {
    await fs.access(postFile);
  } catch {
    continue;
  }

  const post = JSON.parse(await fs.readFile(postFile, "utf8"));
  const metrics = JSON.parse(await fs.readFile(path.join(postRoot, "data/metrics.json"), "utf8"));
  metricEntries.push(...metrics.entries);
  const postAssets = path.join(assets, "posts", post.id);
  const artworkAssets = path.join(postAssets, "artwork");
  const cards = post.cards.map((card, index) => `${String(index + 1).padStart(2, "0")}-${card.kind}.png`);
  await fs.mkdir(postAssets, { recursive: true });
  await fs.mkdir(artworkAssets, { recursive: true });
  await fs.copyFile(path.join(postRoot, "content/caption.md"), path.join(postAssets, "caption.md"));
  const artworkSource = path.resolve(path.dirname(postFile), post.illustration);
  const artworkName = path.basename(artworkSource);
  await fs.copyFile(artworkSource, path.join(artworkAssets, artworkName));
  for (const card of cards) {
    await fs.copyFile(path.join(postRoot, "cards", card), path.join(postAssets, card));
  }

  const zipName = `${post.id}-cards.zip`;
  await execFileAsync("/usr/bin/zip", [
    "-j",
    "-q",
    "-X",
    path.join(postAssets, zipName),
    ...cards.map((card) => path.join(postRoot, "cards", card))
  ]);

  content.push({
    id: post.id,
    name: post.skill,
    type: post.type,
    status: post.status,
    discoveredAt: post.discoveredAt,
    templateVersion: post.templateVersion,
    title: post.title,
    hook: post.hook,
    singleResult: post.singleResult,
    body: post.body,
    source: post.sourceUrl,
    sourceLabels: post.sourceLabels,
    heat: post.heat,
    verification: post.verification,
    archivePath: `posts/${directory}`,
    illustrationPath: `assets/posts/${post.id}/artwork/${artworkName}`,
    cards: cards.map((card) => `assets/posts/${post.id}/${card}`),
    cardsZip: `assets/posts/${post.id}/${zipName}`,
    captionFile: `assets/posts/${post.id}/caption.md`
  });
}

await fs.writeFile(
  path.join(docs, "data/site.json"),
  `${JSON.stringify({ ...project, content }, null, 2)}\n`,
  "utf8"
);
await fs.writeFile(
  path.join(docs, "data/metrics.json"),
  `${JSON.stringify({ entries: metricEntries }, null, 2)}\n`,
  "utf8"
);

await fs.writeFile(path.join(docs, ".nojekyll"), "", "utf8");
await fs.copyFile(path.join(docs, "index.html"), path.join(docs, "404.html"));
console.log(`Built GitHub Pages output in ${docs}`);
