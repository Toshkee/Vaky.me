import { readFileSync } from "node:fs";
import { chromium } from "playwright";

/* The capture is inlined rather than fetched: a data URI is the one image
   source a page built from a string can load without a server. */
const capture = readFileSync("public/work/reform-fitness-pocetna.webp").toString("base64");

/**
 * The share card (public/og.png, 1200x630) as the landing page's title card:
 * warm white, the red mark, the promise set in the title face with the
 * deadline under the red marker, and the showreel's first shot in a camera
 * viewfinder — the client app, live. Bricolage Grotesque comes from Google
 * Fonts with its width and optical-size axes.
 *
 * Usage: node scripts/generate-og.mjs
 */
const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #faf8f4; color: #101010;
         font-family: "Bricolage Grotesque", sans-serif; overflow: hidden; position: relative; }
  .lockup { position: absolute; left: 64px; top: 56px; display: flex; align-items: center; gap: 14px;
            font-size: 40px; font-weight: 800; letter-spacing: -0.04em; line-height: 1; }
  .lockup svg { width: 44px; height: 44px; }
  .eyebrow { position: absolute; left: 64px; top: 136px; font-size: 18px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; }
  .eyebrow::before { content: ""; display: inline-block; width: 11px; height: 11px; margin-right: 12px; border-radius: 50%; background: #c1121f; }
  h1 { position: absolute; left: 64px; top: 186px; width: 640px; font-size: 84px; font-weight: 800;
       font-stretch: 80%; line-height: .95; letter-spacing: -.025em; }
  .mark { background: #c1121f; color: #fff; padding: 0 .06em; white-space: nowrap; }
  .facts { position: absolute; left: 64px; bottom: 56px; display: flex; gap: 22px; font-size: 17px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; }
  .facts i { width: 8px; height: 8px; background: #c1121f; transform: rotate(45deg); align-self: center; }
  .reel { position: absolute; right: 56px; top: 56px; bottom: 56px; width: 400px; border-radius: 22px; background: #101010; color: #faf8f4; overflow: hidden; }
  .corner { position: absolute; width: 26px; height: 26px; border-color: #faf8f4; }
  .rec { position: absolute; left: 32px; top: 26px; color: #faf8f4; font-size: 14px; font-weight: 600; letter-spacing: .2em; }
  .rec::before { content: ""; display: inline-block; width: 9px; height: 9px; margin-right: 10px; border-radius: 50%; background: #ef4550; }
  .phone { position: absolute; left: 92px; top: 72px; width: 216px; height: 420px; padding: 8px; border-radius: 34px; background: #faf8f4; }
  .screen { width: 100%; height: 100%; border-radius: 27px; overflow: hidden; }
  .screen img { width: 100%; display: block; }
</style></head><body>
  <div class="lockup">
    <svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#c1121f"/><path d="M8.5 10.5h7.2l4.3 13.4 4.3-13.4h7.2L23.4 30.5h-6.8Z" fill="#fff"/></svg>
    vaky
  </div>
  <p class="eyebrow">Web studio — Crna Gora</p>
  <h1>Sajt za tvoj biznis.<br>Od €250,<br>za <span class="mark">10 dana.</span></h1>
  <div class="facts"><span>Besplatan koncept</span><i></i><span>MNE + EN</span><i></i><span>vaky.me</span></div>

  <div class="reel">
    <span class="corner" style="left:16px;top:16px;border-top:2px solid;border-left:2px solid"></span>
    <span class="corner" style="right:16px;top:16px;border-top:2px solid;border-right:2px solid"></span>
    <span class="corner" style="left:16px;bottom:16px;border-bottom:2px solid;border-left:2px solid"></span>
    <span class="corner" style="right:16px;bottom:16px;border-bottom:2px solid;border-right:2px solid"></span>
    <span class="rec">REC</span>
    <div class="phone"><div class="screen"><img src="data:image/webp;base64,${capture}" alt=""></div></div>
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);
await page.screenshot({ path: "public/og.png" });
console.log("public/og.png written");
await browser.close();
