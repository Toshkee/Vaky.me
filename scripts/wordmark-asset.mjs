import fs from "node:fs";
import sharp from "sharp";

/**
 * Turns the supplied Vaky.me lockup — pixel art delivered as white-and-red
 * artwork on a flat black ground — into the shipped nav asset.
 *
 * The source ground is black rather than white, so brightness *is* coverage:
 * a fully lit pixel is solid ink, a half-lit edge pixel is a half-covered one.
 * That makes the conversion a straight screen-to-alpha, which keeps the
 * antialiasing the artwork already has instead of thresholding it away.
 * Hue then decides which brand colour the pixel becomes: the red "V" and the
 * red ".me" keep the brand red, everything else becomes ink.
 *
 * Usage: node scripts/wordmark-asset.mjs <lockup.png>
 */
const INK = [0x10, 0x10, 0x10];
const RED = [0xc1, 0x12, 0x1f];

/** Ground noise below FLOOR is discarded; artwork at or above CEIL is solid. */
const FLOOR = 48;
const CEIL = 170;

/** The nav shows the lockup at 30-34px. 96px keeps ~3x for retina. */
const OUTPUT_HEIGHT = 96;
const OUT = "public/logo-vaky.png";

const src = process.argv[2];
if (!src) {
  console.error("usage: node scripts/wordmark-asset.mjs <lockup.png>");
  process.exit(1);
}

const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.alloc(width * height * 4);

let minX = width;
let minY = height;
let maxX = -1;
let maxY = -1;

for (let i = 0, p = 0; i < data.length; i += channels, p += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  /* Coverage: how far this pixel is lit above the black ground. The max
     channel, not the average — a saturated red reads dark in luminance terms
     but is fully painted artwork. */
  const lit = Math.max(r, g, b);

  /* The delivered ground is not a pure black: it carries render noise and a
     faint vignette, which as raw coverage would ship a visible grey rectangle
     around the mark. FLOOR discards it; CEIL puts the artwork back at full
     strength, and the ramp between them keeps the real edge pixels soft. */
  const cover = Math.max(
    0,
    Math.min(255, Math.round(((lit - FLOOR) / (CEIL - FLOOR)) * 255)),
  );

  /* Red enough to be the mark's red rather than a grey edge pixel. The
     source is a JPEG-ish render, so this tolerates a fair amount of drift. */
  const isRed = r > 60 && r - Math.max(g, b) > 40;
  const [cr, cg, cb] = isRed ? RED : INK;

  out[p] = cr;
  out[p + 1] = cg;
  out[p + 2] = cb;
  out[p + 3] = cover;

  if (cover > 8) {
    const x = (i / channels) % width;
    const y = Math.floor(i / channels / width);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
}

if (maxX < 0) {
  console.error("nothing above the black ground — is this the right file?");
  process.exit(1);
}

const box = {
  left: minX,
  top: minY,
  width: maxX - minX + 1,
  height: maxY - minY + 1,
};

const png = await sharp(out, { raw: { width, height, channels: 4 } })
  .extract(box)
  .resize({ height: OUTPUT_HEIGHT, fit: "inside", kernel: "lanczos3" })
  .png({ compressionLevel: 9 })
  .toBuffer();

fs.writeFileSync(OUT, png);
const final = await sharp(png).metadata();
console.log(
  `${OUT} — ${final.width}x${final.height} (trimmed ${box.width}x${box.height} from ${width}x${height})`,
);
