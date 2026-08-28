import { chromium } from "playwright";
import fs from "node:fs";

/**
 * Portfolio screenshots for the Radovi browser-window cards.
 *
 * Captured at 1280x854 (3:2) so the ~460px-wide card shows them at better
 * than 2x, JPEG q78 to keep the four of them around half a megabyte total.
 * The VibeLab back-link bar is removed before the shot — it is site chrome,
 * not part of the client's design.
 */
const BASE = "http://localhost:3000";
const OUT = "public/work";
fs.mkdirSync(OUT, { recursive: true });

const demos = [
  "lucky-chopsticks",
  "konoba-skadar",
  "titan-gym",
  "barbershop-stari-grad",
  "barber-drina",
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 854 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
const page = await ctx.newPage();

for (const slug of demos) {
  await page.goto(`${BASE}/demo/${slug}/`, { waitUntil: "networkidle" });
  // strip the VibeLab bar (the only body-level link back to "/") and the
  // Next dev-tools indicator, which only exists because we shoot the dev server
  await page.evaluate(() => {
    document.querySelector('a[href="/"]')?.remove();
    document.querySelector("nextjs-portal")?.remove();
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
  const path = `${OUT}/${slug}.jpg`;
  await page.screenshot({ path, type: "jpeg", quality: 78 });
  const kb = Math.round(fs.statSync(path).size / 1024);
  console.log(`${slug}: ${kb}KB`);
}

await browser.close();
