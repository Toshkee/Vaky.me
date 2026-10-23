import { chromium } from "playwright";
import sharp from "sharp";

/**
 * The opening screen of pavletosic.com, for the portfolio film beside "Ko
 * stoji iza Vakyja".
 *
 *   node scripts/capture-portfolio.mjs
 *
 * One desktop screen, shot off the public site — nothing is typed into the
 * chat, because every question asked there spends the portfolio's AI budget.
 * The film types its own question over the capture, so the position of the
 * "Ask me anything" field is measured here and printed: if the portfolio's
 * layout changes, copy the printed box into PORTFOLIO_INPUT in
 * src/components/motion/films/PortfolioFilm.tsx.
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

const box = await page.evaluate(() => {
  const input = document.querySelector("input, textarea");
  const rect = input?.closest("form")?.getBoundingClientRect() ?? input?.getBoundingClientRect();
  return rect && { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
});

const png = await page.screenshot({ type: "png" });
await browser.close();

const base = sharp(png).resize({ width: 1600 });
await base.clone().avif({ quality: 60 }).toFile(`${OUT}/pavletosic-com.avif`);
await base.clone().webp({ quality: 78 }).toFile(`${OUT}/pavletosic-com.webp`);

console.log("Saved public/work/pavletosic-com.{avif,webp}");
console.log("Input box, as a fraction of the screen:", box && {
  x: +(box.x / WIDTH).toFixed(4),
  y: +(box.y / HEIGHT).toFixed(4),
  width: +(box.width / WIDTH).toFixed(4),
  height: +(box.height / HEIGHT).toFixed(4),
});
