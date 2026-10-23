import { readFileSync } from "node:fs";
import { chromium } from "playwright";

/* The capture is inlined rather than fetched: a data URI is the one image
   source a page built from a string can load without a server. */
const capture = readFileSync("public/work/villa-vucje-phone.webp").toString("base64");

/**
 * The share card (public/og.png, 1200x630) in the site's own system: paper,
 * the lockup, the hero's headline with its marker, and the hero film's last
 * idea held still — the sun over the sea, a phone showing a client site that
 * is live. Archivo comes from Google Fonts with its width axis.
 *
 * Usage: node scripts/generate-og.mjs
 */
const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #f2ede4; color: #0a2e2b;
         font-family: "Archivo", sans-serif; overflow: hidden; position: relative; }
  .lockup { position: absolute; left: 72px; top: 64px; display: flex; align-items: center; gap: 14px;
            font-size: 44px; font-weight: 900; font-stretch: 125%; letter-spacing: -0.045em; line-height: 1; }
  .lockup svg { width: 48px; height: 48px; }
  .eyebrow { position: absolute; left: 72px; top: 170px; display: flex; align-items: center; gap: 14px;
             font-size: 20px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; }
  .eyebrow::before { content: ""; width: 12px; height: 12px; border-radius: 50%; background: #ff6a2b; }
  h1 { position: absolute; left: 72px; top: 212px; width: 680px; font-size: 76px; font-weight: 850;
       font-stretch: 115%; letter-spacing: -0.045em; line-height: .95; }
  .mark { position: relative; z-index: 0; padding: 0 .1em; white-space: nowrap; }
  .mark::before { content: ""; position: absolute; inset: .1em 0 .02em; background: #ff6a2b; z-index: -1; }
  .facts { position: absolute; left: 72px; bottom: 60px; display: flex; gap: 34px; font-size: 26px; font-weight: 600; }
  .facts i { width: 8px; height: 8px; border-radius: 50%; background: #ff6a2b; align-self: center; }
  .sun { position: absolute; right: 120px; top: 70px; width: 400px; height: 400px; border-radius: 50%; background: #ff6a2b; }
  .sea { position: absolute; right: 0; bottom: 0; width: 520px; height: 170px; }
  .phone { position: absolute; right: 170px; top: 96px; width: 250px; height: 500px; padding: 9px;
           border-radius: 36px; background: #0a2e2b; transform: rotate(6deg); }
  .screen { width: 100%; height: 100%; border-radius: 28px; overflow: hidden; background: #e8e0d2; }
  .screen img { width: 100%; display: block; }
</style></head><body>
  <div class="lockup">
    <svg viewBox="0 0 40 40"><clipPath id="c"><circle cx="20" cy="20" r="20"/></clipPath>
      <g clip-path="url(#c)"><rect width="40" height="40" fill="#ff6a2b"/>
      <path d="M0 25c6.7-3.6 13.3-3.6 20 0s13.3 3.6 20 0V40H0Z" fill="#0a2e2b"/></g></svg>
    vaky
  </div>
  <p class="eyebrow">Web studio — Crna Gora</p>
  <h1>Sajt za tvoj<br>biznis.<br>Od €250, za <span class="mark">10 dana.</span></h1>
  <div class="facts"><span>Besplatan koncept</span><i></i><span>MNE + EN</span><i></i><span>vaky.me</span></div>

  <div class="sun"></div>
  <div class="phone"><div class="screen"><img src="data:image/webp;base64,${capture}" alt=""></div></div>
  <svg class="sea" viewBox="0 0 520 170" preserveAspectRatio="none">
    <path d="M0 40c87-20 173-20 260 0s173 20 260 0V170H0Z" fill="#0a2e2b"/>
    <path d="M0 78c87-16 173-16 260 0s173 16 260 0" fill="none" stroke="#9ed9cf" stroke-width="6" stroke-linecap="round"/>
  </svg>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);
await page.screenshot({ path: "public/og.png" });
console.log("public/og.png written");
await browser.close();
