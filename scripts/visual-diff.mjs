/**
 * Compare two sets of shots from `visual-shots.mjs`.
 *
 *   node scripts/visual-shots.mjs shots/before http://localhost:4321   # built site
 *   …make the change…
 *   node scripts/visual-shots.mjs shots/after  http://localhost:3000   # dev server
 *   node scripts/visual-diff.mjs shots/before shots/after
 *
 * Writes a red overlay per changed page and prints how much moved. The point
 * is not a pass/fail gate — a deliberate redesign changes every pixel — but to
 * catch the change you did not intend, in the section you were not looking at.
 * Pages of different heights are compared over the overlap and the height
 * difference is reported.
 */
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const [before, after] = process.argv.slice(2);
if (!before || !after) {
  console.error("usage: node scripts/visual-diff.mjs <beforeDir> <afterDir>");
  process.exit(2);
}

const outDir = path.join(after, "diff");
fs.mkdirSync(outDir, { recursive: true });

for (const file of fs.readdirSync(before).filter((f) => f.endsWith(".png"))) {
  const other = path.join(after, file);
  if (!fs.existsSync(other)) {
    console.log(`  MISSING  ${file}`);
    continue;
  }

  const a = PNG.sync.read(fs.readFileSync(path.join(before, file)));
  const b = PNG.sync.read(fs.readFileSync(other));
  const width = Math.min(a.width, b.width);
  const height = Math.min(a.height, b.height);

  const crop = (png) => {
    if (png.width === width && png.height === height) return png;
    const out = new PNG({ width, height });
    PNG.bitblt(png, out, 0, 0, width, height, 0, 0);
    return out;
  };

  const diff = new PNG({ width, height });
  const changed = pixelmatch(crop(a).data, crop(b).data, diff.data, width, height, {
    threshold: 0.12,
  });
  const percent = ((changed / (width * height)) * 100).toFixed(2);
  const grew = b.height - a.height;

  if (changed > 0) fs.writeFileSync(path.join(outDir, file), PNG.sync.write(diff));
  console.log(
    `  ${file}: ${percent}% of pixels differ` +
      (grew ? `, page ${grew > 0 ? "grew" : "shrank"} ${Math.abs(grew)}px` : ""),
  );
}

console.log(`\nOverlays in ${outDir}`);
