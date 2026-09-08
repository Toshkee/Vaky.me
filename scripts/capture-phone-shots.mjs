import { chromium } from "playwright";
import fs from "node:fs";
import sharp from "sharp";

/**
 * Tall phone-width captures of every project in the Radovi phone.
 *
 *   node scripts/capture-phone-shots.mjs [baseUrl]   (against a running dev server)
 *
 * Covers both kinds of project: the demos on this site, and the client sites
 * that are live on their own domains — those are shot straight off the public
 * web, so a capture is only as current as the last time this ran.
 *
 * Shot at 390px wide and 2x, then cut to the first ~3200 CSS px — enough to
 * scroll through the opening screens inside the phone frame without shipping
 * a 10,000px image nobody sees the end of. Written as AVIF and WebP only; both
 * are universal on the phones this is judged on.
 *
 * Fixed elements are removed first: a fixed element is pinned once at the
 * bottom of a full-page capture, where it reads as a stray footer. On a demo
 * the Vaky back-link bar goes too — that strip is site chrome, not the design.
 */
const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const OUT = "public/work";
const MAX_HEIGHT = 3200;
fs.mkdirSync(OUT, { recursive: true });

/* Slugs match the `slug` on each project in src/i18n/me.ts; the capture is
   read from /work/<slug>-phone.avif. A demo is named by its slug alone, a
   live client site carries the URL it is shot from. */
const projects = [
  { slug: "villa-vucje", url: "https://villavucje.me/" },
  { slug: "mandarina", url: "https://mandarinapt.me/" },
  "lucky-chopsticks",
  "konoba-skadar",
  "barber-drina",
  "barbershop-stari-grad",
  "andrea-beauty-house",
  "studio-ljepote-mila",
  "studio-ljepote-zdravlja",
  "lavlav",
  "skyline-tattoo",
  "kraftart",
  "soul-studio",
  "telo-pilates",
  "pilates-by-maja",
  "titan-gym",
  "dental-clinic-kovacevic",
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

for (const project of projects) {
  const demo = typeof project === "string";
  const slug = demo ? project : project.slug;
  const url = demo ? `${BASE}/demo/${slug}/` : project.url;

  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate((demo) => {
    if (demo) document.querySelector('a[href="/"]')?.remove();
    document.querySelector("nextjs-portal")?.remove();
    for (const el of document.querySelectorAll("a, div, nav, header")) {
      if (getComputedStyle(el).position === "fixed") el.remove();
    }
    window.scrollTo(0, 0);
  }, demo);
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
