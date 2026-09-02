import { chromium } from "playwright";
import fs from "node:fs";
import sharp from "sharp";

/**
 * Tall phone-width captures of each demo for the Radovi phone.
 *
 *   node scripts/capture-phone-shots.mjs      (against a running dev server)
 *
 * Shot at 390px wide and 2x, then cut to the first ~3200 CSS px — enough to
 * scroll through the opening screens inside the phone frame without shipping
 * a 10,000px image nobody sees the end of. Written as AVIF and WebP only; both
 * are universal on the phones this is judged on.
 *
 * The Vaky back-link bar and the demo's fixed bottom bar are removed first:
 * the strip is site chrome, and a fixed element is pinned once at the bottom
 * of a full-page capture, where it reads as a stray footer.
 */
const BASE = "http://localhost:3000";
const OUT = "public/work";
const MAX_HEIGHT = 3200;
fs.mkdirSync(OUT, { recursive: true });

const demos = [
  "lucky-chopsticks",
  "barber-drina",
  "konoba-skadar",
  "titan-gym",
  "barbershop-stari-grad",
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  reducedMotion: "reduce",
});
const page = await ctx.newPage();

for (const slug of demos) {
  await page.goto(`${BASE}/demo/${slug}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    document.querySelector('a[href="/"]')?.remove();
    document.querySelector("nextjs-portal")?.remove();
    for (const el of document.querySelectorAll("a, div, nav")) {
      if (getComputedStyle(el).position === "fixed") el.remove();
    }
    window.scrollTo(0, 0);
  });
  // lazy images below the fold only load once they are near it
  await page.evaluate(async () => {
    const total = document.documentElement.scrollHeight;
    for (let y = 0; y < total; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);

  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const height = Math.min(total, MAX_HEIGHT);
  const png = await page.screenshot({
    type: "png",
    fullPage: true,
    clip: { x: 0, y: 0, width: 390, height },
  });

  for (const [format, options] of [
    ["avif", { quality: 50 }],
    ["webp", { quality: 72 }],
  ]) {
    const out = `${OUT}/${slug}-phone.${format}`;
    await sharp(png)[format](options).toFile(out);
    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log(`${out} — ${kb} KB (${height} css px of ${total})`);
  }
}

await browser.close();
