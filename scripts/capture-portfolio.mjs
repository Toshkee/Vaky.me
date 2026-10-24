import { chromium } from "playwright";
import sharp from "sharp";

/**
 * The opening screen of pavletosic.com, for the last shot of the showreel.
 *
 *   node scripts/capture-portfolio.mjs
 *
 * One desktop screen, shot off the public site — nothing is typed into the
 * chat, because every question asked there spends the portfolio's AI budget.
 */
const OUT = "public/work";
const WIDTH = 1280;
const HEIGHT = 800;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 2,
  colorScheme: "light",
  reducedMotion: "reduce",
});
await page.goto("https://pavletosic.com/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const png = await page.screenshot({ type: "png" });
await browser.close();

const base = sharp(png).resize({ width: 1600 });
await base.clone().avif({ quality: 60 }).toFile(`${OUT}/pavletosic-com.avif`);
await base.clone().webp({ quality: 78 }).toFile(`${OUT}/pavletosic-com.webp`);

console.log("Saved public/work/pavletosic-com.{avif,webp}");
