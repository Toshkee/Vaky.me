import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * Turns a square Vaky profile mark into the favicon and Apple touch icon.
 * The source artwork stays visually unchanged; this only finds the bright
 * mark, crops excess background evenly, resizes, and compresses the PNGs.
 *
 * Usage: node scripts/process-favicon.mjs <source.png>
 */
const [source] = process.argv.slice(2);

if (!source || !fs.existsSync(source)) {
  console.error("Usage: node scripts/process-favicon.mjs <source.png>");
  process.exit(1);
}

const image = sharp(source);
const { data, info } = await image.clone().raw().toBuffer({ resolveWithObject: true });

let minX = info.width;
let minY = info.height;
let maxX = -1;
let maxY = -1;

for (let y = 0; y < info.height; y += 1) {
  for (let x = 0; x < info.width; x += 1) {
    const offset = (y * info.width + x) * info.channels;
    const brightest = Math.max(data[offset], data[offset + 1], data[offset + 2]);

    // The supplied artwork has a near-black textured ground. This threshold
    // finds the white/red robot mark without treating that texture as content.
    if (brightest < 30) continue;

    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
}

if (maxX < minX || maxY < minY) {
  throw new Error("No visible favicon mark found in the source image.");
}

const markWidth = maxX - minX + 1;
const markHeight = maxY - minY + 1;
const side = Math.min(
  Math.ceil(Math.max(markWidth, markHeight) * 1.16),
  info.width,
  info.height,
);
const centerX = (minX + maxX) / 2;
const centerY = (minY + maxY) / 2;
const left = Math.max(0, Math.min(info.width - side, Math.round(centerX - side / 2)));
const top = Math.max(0, Math.min(info.height - side, Math.round(centerY - side / 2)));

const crop = image.clone().extract({ left, top, width: side, height: side });
const outputs = [
  { file: "src/app/icon.png", size: 256 },
  { file: "src/app/apple-icon.png", size: 180 },
];

for (const output of outputs) {
  await crop
    .clone()
    .resize(output.size, output.size, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9, palette: true, quality: 100 })
    .toFile(output.file);

  const kb = Math.round(fs.statSync(output.file).size / 1024);
  console.log(`${path.normalize(output.file)}: ${output.size}x${output.size}, ${kb}KB`);
}
