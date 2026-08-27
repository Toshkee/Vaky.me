/**
 * Responsive AVIF/WebP versions of the portfolio screenshots.
 *
 *   node scripts/optimize-work-shots.mjs
 *
 * The export runs with `images.unoptimized`, so nothing resizes these at
 * request time — a phone was downloading the full 1280px JPG to draw it 320px
 * wide. This writes the three widths the layout actually asks for, in both
 * modern formats, and leaves the original JPG in place as the fallback.
 *
 * Run it after `node scripts/capture-work-shots.mjs` regenerates the sources.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = "public/work";
const WIDTHS = [480, 768, 1280];

const sources = (await fs.readdir(DIR)).filter(
  (file) => file.endsWith(".jpg") && !/-\d+\.(avif|webp|jpg)$/.test(file),
);

for (const file of sources) {
  const slug = path.basename(file, ".jpg");
  const input = path.join(DIR, file);

  for (const width of WIDTHS) {
    for (const [format, options] of [
      ["avif", { quality: 52 }],
      ["webp", { quality: 74 }],
    ]) {
      const out = path.join(DIR, `${slug}-${width}.${format}`);
      await sharp(input).resize({ width, withoutEnlargement: true })[format](options).toFile(out);
      const { size } = await fs.stat(out);
      console.log(`${out} — ${Math.round(size / 1024)} KB`);
    }
  }
}
