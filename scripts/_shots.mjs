import { chromium } from "playwright";
import fs from "node:fs";
const OUT = process.argv[2] ?? "shots";
fs.mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:3000";
const views = [
  ["desk", 1440, 900],
  ["mob", 390, 844],
  ["se", 320, 568],
];
const browser = await chromium.launch();
for (const [vname, w, h] of views) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    reducedMotion: process.argv[3] === "motion" ? "no-preference" : "reduce",
  });
  const page = await ctx.newPage();
  const errs = [];
  page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.querySelector("nextjs-portal")?.remove());
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/${vname}-home.png`, fullPage: true });
  const m = await page.evaluate(() => ({
    ow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    h: document.documentElement.scrollHeight,
  }));
  console.log(`${vname} h=${m.h} overflow=${m.ow}${errs.length ? " ERRORS: " + errs.slice(0, 3).join(";") : ""}`);
  await ctx.close();
}
await browser.close();
