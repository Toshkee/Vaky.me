/* AFTER shots of the 4 fixed demos — same settings as scripts/visual-shots.mjs */
import fs from "node:fs";
import { chromium } from "playwright";

const OUT = "C:/Users/tosii/vibecode.me/.tmp/shots-after";
const BASE = "http://localhost:4173";
const WIDTHS = [["phone", 390, 844], ["tablet", 768, 1024], ["desktop", 1440, 900]];
const PAGES = [
  ["telo-pilates", "/demo/telo-pilates/"],
  ["dental-clinic-kovacevic", "/demo/dental-clinic-kovacevic/"],
  ["andrea-beauty-house", "/demo/andrea-beauty-house/"],
  ["studio-ljepote-mila", "/demo/studio-ljepote-mila/"],
];

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
for (const [name, path] of PAGES) {
  for (const [label, width, height] of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/${name}-${label}.png`, fullPage: true });
    console.log(`${name}-${label}.png`);
    await ctx.close();
  }
}
await browser.close();
