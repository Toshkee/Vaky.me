/**
 * Responsive AVIF/WebP versions of the outreach-concept photographs.
 *
 *   node scripts/demo-photos.mjs
 *
 * Same job as `optimize-work-shots.mjs` does for the portfolio screenshots,
 * for the photos under `public/demo/<slug>/`. The export runs with
 * `images.unoptimized`, so nothing resizes these at request time — without
 * this a phone downloads the full-width JPG to draw it 320px wide.
 *
 * The base JPGs are committed; the variants are generated. Sharp writes no
 * EXIF unless asked to, so the copies carry no camera, location or authoring
 * metadata from the originals. Provenance lives in each route's `data.ts`.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = "public/demo";
const WIDTHS = [480, 768, 1200];

/* `node scripts/demo-photos.mjs <slug>` limits the run to one concept's
   directory, so two people adding photos to different concepts don't both
   rewrite every other concept's variants. No argument keeps the full sweep. */
const only = process.argv[2];
const slugs = only ? [only] : await fs.readdir(ROOT);

for (const slug of slugs) {
  const dir = path.join(ROOT, slug);
  const sources = (await fs.readdir(dir)).filter(
    (file) => file.endsWith(".jpg") && !/-\d+\.(avif|webp)$/.test(file),
  );

  for (const file of sources) {
    const name = path.basename(file, ".jpg");
    const input = path.join(dir, file);
    const { width: intrinsic } = await sharp(input).metadata();

    for (const width of WIDTHS) {
      /* A variant wider than the source would be an upscale of an already
         compressed download — skip it rather than ship a bigger blurrier file. */
      if (width > intrinsic) continue;

      for (const [format, options] of [
        ["avif", { quality: 52 }],
        ["webp", { quality: 74 }],
      ]) {
        const out = path.join(dir, `${name}-${width}.${format}`);
        await sharp(input).resize({ width, withoutEnlargement: true })[format](options).toFile(out);
        const { size } = await fs.stat(out);
        console.log(`${out} — ${Math.round(size / 1024)} KB`);
      }
    }
  }
}
