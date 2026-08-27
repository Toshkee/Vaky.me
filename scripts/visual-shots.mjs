/**
 * Full-page screenshots at the widths the design is actually judged at.
 *
 *   node scripts/visual-shots.mjs <outDir> [baseUrl]
 *
 * Used two ways: as a before/after pair while reworking a section, and as the
 * stored set a visual diff compares against. Motion is reduced and the page is
 * scrolled to the bottom and back first, so scroll-triggered scenes are in
 * their settled state rather than mid-animation.
 */
import fs from "node:fs";
import { chromium } from "playwright";

const OUT = process.argv[2] ?? "shots";
const BASE = (process.argv[3] ?? "http://localhost:3000").replace(/\/$/, "");

const WIDTHS = [
  ["phone", 390, 844],
  ["tablet", 768, 1024],
  ["desktop", 1440, 900],
];
const PAGES = [
  ["home", "/"],
  ["en", "/en/"],
];

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();

for (const [name, path] of PAGES) {
  for (const [label, width, height] of WIDTHS) {
    const ctx = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
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
    console.log(`${OUT}/${name}-${label}.png`);
    await ctx.close();
  }
}

await browser.close();
