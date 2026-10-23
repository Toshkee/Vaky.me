import fs from "node:fs";
import sharp from "sharp";

/**
 * Tiles for the work grid: the opening screen of each project, cut from the
 * tall phone captures in public/work (see capture-phone-shots.mjs) and from
 * the client app's home screen. The captures run to 6400px; a tile shows
 * the first 4:5 of one, so it ships that and nothing else.
 *
 *   node scripts/work-thumbs.mjs
 */
const SRC = "public/work";
const OUT = "public/work/thumbs";
fs.mkdirSync(OUT, { recursive: true });

const sources = fs
  .readdirSync(SRC)
  .filter((file) => file.endsWith("-phone.webp"))
  .map((file) => ({ slug: file.replace("-phone.webp", ""), file }));
sources.push({ slug: "reform-fitness", file: "reform-fitness-pocetna.webp" });

for (const { slug, file } of sources) {
  const image = sharp(`${SRC}/${file}`);
  const { width } = await image.metadata();
  const crop = image.extract({ left: 0, top: 0, width, height: Math.round(width * 1.25) }).resize({ width: 520 });
  await crop.clone().avif({ quality: 55 }).toFile(`${OUT}/${slug}.avif`);
  await crop.clone().webp({ quality: 74 }).toFile(`${OUT}/${slug}.webp`);
}
console.log(`${sources.length} tiles written to ${OUT}`);
