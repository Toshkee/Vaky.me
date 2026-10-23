import fs from "node:fs";
import sharp from "sharp";

/**
 * The browser icons, drawn from the Vaky mark: a sun going down into the
 * Adriatic (src/components/BrandWordmark.tsx). The mark is two shapes, so it
 * is written out here as SVG and rasterised — no source file to keep in sync
 * beyond the path below, which must match `BrandMark`.
 *
 *   src/app/icon.png        256 px, transparent — tabs and bookmarks
 *   src/app/apple-icon.png  180 px, on paper — iOS fills transparency black
 *   public/favicon.ico      32 px, a PNG inside an ICO container
 *
 * Usage: node scripts/brand-assets.mjs
 */
const SUN = "#ff6a2b";
const INK = "#0a2e2b";
const PAPER = "#f2ede4";

const mark = (size, inset = 0, ground = null) => {
  const r = 20 - inset;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 40 40">
  ${ground ? `<rect width="40" height="40" fill="${ground}"/>` : ""}
  <clipPath id="c"><circle cx="20" cy="20" r="${r}"/></clipPath>
  <g clip-path="url(#c)">
    <rect width="40" height="40" fill="${SUN}"/>
    <path d="M0 25c6.7-3.6 13.3-3.6 20 0s13.3 3.6 20 0V40H0Z" fill="${INK}"/>
  </g>
</svg>`);
};

await sharp(mark(256)).png().toFile("src/app/icon.png");
await sharp(mark(180, 4, PAPER)).png().toFile("src/app/apple-icon.png");

/* An ICO is a 6-byte header, one 16-byte directory entry, then the image —
   and the image may be a whole PNG file, which every browser reads. */
const png = await sharp(mark(32)).png().toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);
entry.writeUInt8(32, 1);
entry.writeUInt8(0, 2);
entry.writeUInt8(0, 3);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(png.length, 8);
entry.writeUInt32LE(6 + 16, 12);
fs.writeFileSync("public/favicon.ico", Buffer.concat([header, entry, png]));

console.log("Wrote src/app/icon.png, src/app/apple-icon.png, public/favicon.ico");
