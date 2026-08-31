import { chromium } from "playwright";
import fs from "node:fs";
import sharp from "sharp";

/**
 * One-off processing of the Tony mascot PNG (exported with a flat white ground
 * and generous padding) into the shipped asset:
 *
 *   public/tony-head.png    — trimmed head mark, transparent, 96px tall.
 *                             The footer shows it at 24px.
 *
 * The wordmark and the icons are not made here: they are cut from the Vaky.me
 * lockup by `scripts/wordmark-asset.mjs`, which owns them.
 *
 * Usage: node scripts/brand-assets.mjs <head.png>
 */
const [headSrc] = process.argv.slice(2);

const browser = await chromium.launch();
const page = await browser.newPage();

async function process_(srcPath, opts) {
  const data = fs.readFileSync(srcPath).toString("base64");
  const out = await page.evaluate(
    async ({ data, opts }) => {
      const img = new Image();
      img.src = "data:image/png;base64," + data;
      await img.decode();

      const c = document.createElement("canvas");
      c.width = img.width;
      c.height = img.height;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const px = ctx.getImageData(0, 0, c.width, c.height);
      const d = px.data;

      // white (and near-white halo) -> transparent, and find the content box
      let minX = c.width, minY = c.height, maxX = 0, maxY = 0;
      for (let y = 0; y < c.height; y++) {
        for (let x = 0; x < c.width; x++) {
          const i = (y * c.width + x) * 4;
          const white = d[i] > 248 && d[i + 1] > 248 && d[i + 2] > 248;
          if (white || d[i + 3] < 10) {
            d[i + 3] = 0;
          } else {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      ctx.putImageData(px, 0, 0);

      const w = maxX - minX + 1;
      const h = maxY - minY + 1;

      let outW, outH, padX = 0, padY = 0;
      if (opts.square) {
        const side = Math.max(w, h);
        outW = outH = opts.size;
        padX = ((side - w) / 2 / side) * opts.size;
        padY = ((side - h) / 2 / side) * opts.size;
      } else {
        outH = opts.height;
        outW = Math.round((w / h) * outH);
      }

      const o = document.createElement("canvas");
      o.width = outW;
      o.height = outH;
      const octx = o.getContext("2d");
      if (opts.bg) {
        octx.fillStyle = opts.bg;
        octx.fillRect(0, 0, outW, outH);
      }
      octx.imageSmoothingQuality = "high";
      if (opts.square) {
        const side = Math.max(w, h);
        const scale = opts.size / side;
        octx.drawImage(img === null ? c : c, minX, minY, w, h, padX, padY, w * scale, h * scale);
      } else {
        octx.drawImage(c, minX, minY, w, h, 0, 0, outW, outH);
      }
      return o.toDataURL("image/png").split(",")[1];
    },
    { data, opts },
  );
  /* Canvas writes a full 8-bit RGBA PNG. These marks are flat pixel art with
     a handful of colours, so a palette costs nothing visible and cut the
     favicon from 62KB to 11KB — a file every visitor fetches on every page. */
  const compressed = await sharp(Buffer.from(out, "base64"))
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
  fs.writeFileSync(opts.out, compressed);
  const kb = Math.round(fs.statSync(opts.out).size / 1024);
  console.log(`${opts.out}: ${kb}KB`);
}

await process_(headSrc, { out: "public/tony-head.png", height: 96 });

await browser.close();
