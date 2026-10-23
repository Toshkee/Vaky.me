import fs from "node:fs";
import sharp from "sharp";

/**
 * The browser icons, drawn from the Vaky mark: a red tile with a white "v"
 * (src/components/BrandWordmark.tsx). The mark is two shapes, so it is
 * written out here as SVG and rasterised — the "v" path must match
 * `MARK_V` there.
 *
 *   src/app/icon.png        256 px, transparent — tabs and bookmarks
 *   src/app/apple-icon.png  180 px, on paper — iOS fills transparency black
 *   public/favicon.ico      32 px, a PNG inside an ICO container
 *
 * Usage: node scripts/brand-assets.mjs
 */
const RED = "#c1121f";
const PAPER = "#faf8f4";
const V = "M8.5 10.5h7.2l4.3 13.4 4.3-13.4h7.2L23.4 30.5h-6.8Z";

const mark = (size, ground = null) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 40 40">
  ${ground ? `<rect width="40" height="40" fill="${ground}"/>` : ""}
  <rect ${ground ? 'x="3" y="3" width="34" height="34" rx="8"' : 'width="40" height="40" rx="9"'} fill="${RED}"/>
  <path d="${V}" fill="#ffffff" ${ground ? 'transform="translate(3 3) scale(0.85)"' : ""}/>
</svg>`);

await sharp(mark(256)).png().toFile("src/app/icon.png");
await sharp(mark(180, PAPER)).png().toFile("src/app/apple-icon.png");

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
