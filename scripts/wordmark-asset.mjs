import sharp from "sharp";

/**
 * Turns the supplied Vaky.me lockup — pixel art delivered as white-and-red
 * artwork on a flat black ground — into every shipped brand asset:
 *
 *   public/logo-vaky.png   the full horizontal lockup, 96px tall, transparent
 *   src/app/icon.png       256x256 favicon: the window mark alone, on paper
 *   src/app/apple-icon.png 180x180 of the same
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
const PAPER = { r: 0xfa, g: 0xf8, b: 0xf4, alpha: 1 };

/** Ground noise below FLOOR is discarded; artwork at or above CEIL is solid. */
const FLOOR = 48;
const CEIL = 170;

/** The nav shows the lockup at 28-32px. 96px keeps ~3x for retina. */
const LOCKUP_HEIGHT = 96;

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
const rgba = Buffer.alloc(width * height * 4);
/** Per-column ink total, so the gap between the mark and the word can be found. */
const columnInk = new Float64Array(width);

let minX = width;
let minY = height;
let maxX = -1;
let maxY = -1;

for (let i = 0, p = 0; i < data.length; i += channels, p += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  /* The max channel, not the average — a saturated red reads dark in
     luminance terms but is fully painted artwork. */
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

  rgba[p] = cr;
  rgba[p + 1] = cg;
  rgba[p + 2] = cb;
  rgba[p + 3] = cover;

  if (cover > 8) {
    const x = (i / channels) % width;
    const y = Math.floor(i / channels / width);
    columnInk[x] += cover;
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

const lockup = { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };

/**
 * The window mark is the leftmost shape, and the only clear vertical gap in
 * the artwork is the one between it and the "V" of Vaky — inside the word the
 * letters are too close to leave an empty column. So the first run of empty
 * columns after the artwork starts is where the mark ends.
 */
function markWidth() {
  const GAP = 4;
  let empty = 0;
  for (let x = minX; x <= maxX; x += 1) {
    if (columnInk[x] === 0) {
      empty += 1;
      if (empty >= GAP) return x - GAP + 1 - minX;
    } else {
      empty = 0;
    }
  }
  return 0;
}

const cut = markWidth();
if (cut === 0) {
  console.error("no gap found after the window mark — check FLOOR/CEIL");
  process.exit(1);
}

const raw = { raw: { width, height, channels: 4 } };

await sharp(rgba, raw)
  .extract(lockup)
  .resize({ height: LOCKUP_HEIGHT, fit: "inside", kernel: "lanczos3" })
  .png({ compressionLevel: 9 })
  .toFile("public/logo-vaky.png");

/* The column strip holding the mark still spans the whole lockup height —
   the word's descenders reach below the window. `trim` drops those empty
   rows so the icon is the window itself and not the window plus air. */
const strip = await sharp(rgba, raw)
  .extract({ left: minX, top: minY, width: cut, height: lockup.height })
  .png()
  .toBuffer();

/* A second pipeline, not another step on the first: sharp applies `trim`
   before `extract` regardless of call order, so trimming the strip has to
   start from the strip. */
const mark = await sharp(strip)
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 0 })
  .png()
  .toBuffer();

/* On paper rather than on transparency: the mark is ink, and a transparent
   favicon disappears into a dark browser theme — iOS makes it worse by
   compositing onto black. A solid brand ground reads everywhere. */
for (const [file, size] of [
  ["src/app/icon.png", 256],
  ["src/app/apple-icon.png", 180],
]) {
  const inner = Math.round(size * 0.78);
  await sharp({
    create: { width: size, height: size, channels: 4, background: PAPER },
  })
    .composite([
      {
        input: await sharp(mark)
          .resize(inner, inner, { fit: "contain", background: { ...PAPER, alpha: 0 } })
          .toBuffer(),
        gravity: "center",
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(file);
}

const out = await sharp("public/logo-vaky.png").metadata();
const markMeta = await sharp(mark).metadata();
console.log(
  `public/logo-vaky.png ${out.width}x${out.height}, mark ${markMeta.width}x${markMeta.height} -> icon.png 256, apple-icon.png 180`,
);
