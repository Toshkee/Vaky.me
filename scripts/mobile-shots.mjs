import { chromium, devices } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2] ?? "shots";
const PATH_ = process.argv[3] ?? "/";
const TAG = process.argv[4] ?? "home";
const BASE = "http://localhost:3000";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  ...devices["iPhone 13"],
  reducedMotion: "reduce",
});
const page = await ctx.newPage();
await page.goto(BASE + PATH_, { waitUntil: "networkidle" });
await page.waitForTimeout(500);

const { total, vh } = await page.evaluate(() => ({
  total: document.documentElement.scrollHeight,
  vh: window.innerHeight,
}));

const step = Math.round(vh * 0.9);
const slices = Math.ceil(total / step);
for (let i = 0; i < slices; i++) {
  const y = i * step;
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${OUT}/${TAG}-${String(i).padStart(2, "0")}.png` });
}

console.log(`${TAG}: ${slices} slices, total=${total}px vh=${vh}`);
await browser.close();
