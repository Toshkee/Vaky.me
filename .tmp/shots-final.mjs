/* FINAL shots of the 4 fixed demos at 5 widths + horizontal-overflow measurement */
import fs from "node:fs";
import { chromium } from "playwright";

const OUT = "C:/Users/tosii/vibecode.me/.tmp/shots-final";
const BASE = "http://localhost:4173";
const WIDTHS = [["phone", 390, 844], ["tablet", 768, 1024], ["laptop", 1024, 768], ["desktop", 1440, 900], ["wide", 1920, 1080]];
const PAGES = [
  ["telo-pilates", "/demo/telo-pilates/"],
  ["dental-clinic-kovacevic", "/demo/dental-clinic-kovacevic/"],
  ["andrea-beauty-house", "/demo/andrea-beauty-house/"],
  ["studio-ljepote-mila", "/demo/studio-ljepote-mila/"],
];

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
let overflowFail = 0;
for (const [name, path] of PAGES) {
  for (const [label, width, height] of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);
    const m = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
    }));
    const over = m.sw > m.cw;
    if (over) overflowFail++;
    // screenshots only at the three judged widths + laptop for telo hero check
    if (["phone", "tablet", "desktop"].includes(label) || label === "laptop") {
      await page.screenshot({ path: `${OUT}/${name}-${label}.png`, fullPage: true });
    }
    console.log(`${name} @${width}: scrollWidth=${m.sw} clientWidth=${m.cw} ${over ? "OVERFLOW!" : "ok"}`);
    await ctx.close();
  }
}
await browser.close();
console.log(overflowFail === 0 ? "NO horizontal overflow anywhere" : `${overflowFail} overflow case(s)!`);
