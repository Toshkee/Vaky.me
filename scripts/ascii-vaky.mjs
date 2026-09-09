/**
 * Traces Vaky's idle frame (frame 0 of public/mascot/vaky.webp) as text, for
 * the console greeting in src/components/ConsoleGreeting.tsx.
 *
 *   node scripts/ascii-vaky.mjs
 *
 * The sheet is 9 frames by 4 facings. Each character cell is one sprite
 * pixel wide and two tall, since terminal glyphs are roughly that shape.
 */
import sharp from "sharp";

const SHEET = "public/mascot/vaky.webp";
const COLUMNS = 44;

const { width, height } = await sharp(SHEET).metadata();
const frame = { width: Math.round(width / 9), height: Math.round(height / 4) };
const rows = Math.round((frame.height / frame.width) * COLUMNS / 2);

const { data } = await sharp(SHEET)
  .extract({ left: 0, top: 0, ...frame })
  .resize(COLUMNS, rows, { fit: "fill", kernel: "nearest" })
  .raw()
  .toBuffer({ resolveWithObject: true });

const glyph = (r, g, b, a) => {
  if (a < 128) return " ";
  if (r > 150 && g < 90) return "@";
  const lum = (r * 299 + g * 587 + b * 114) / 1000;
  return lum < 70 ? "#" : lum < 200 ? "+" : ".";
};

let out = "";
for (let y = 0; y < rows; y++) {
  let row = "";
  for (let x = 0; x < COLUMNS; x++) {
    const i = (y * COLUMNS + x) * 4;
    row += glyph(data[i], data[i + 1], data[i + 2], data[i + 3]);
  }
  out += row.trimEnd() + "\n";
}
process.stdout.write(out);
