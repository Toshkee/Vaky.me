import { chromium } from "playwright";

/**
 * The share card (public/og.png, 1200x630) composed from the live design
 * system: paper ground with the dot grid, the lockup, the headline, the real
 * offer line — and Tony beside a VAKY OS window that has already finished
 * the build. Fonts come from Google, images from the running dev server.
 *
 * Usage: dev server on :3000, then  node scripts/generate-og.mjs
 */
const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Jersey+10&family=Libre+Franklin:wght@600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #faf8f4; color: #101010;
         font-family: "Libre Franklin", sans-serif; overflow: hidden; position: relative; }
  .frame { position: absolute; inset: 26px; border: 3px solid #101010; background: #faf8f4; padding: 46px 56px;
           background-image: radial-gradient(rgba(207,205,198,.5) 2px, transparent 2px);
           background-size: 34px 34px; }
  .top { display: flex; justify-content: space-between; align-items: center; }
  .wordmark { font-size: 54px; font-weight: 800; letter-spacing: -.055em; line-height: 1; }
  .wordmark span { color: #c1121f; }
  .eyebrow { font-size: 22px; font-weight: 700; letter-spacing: .2em; color: #5c5c58; }
  h1 { margin-top: 64px; font-size: 68px; font-weight: 800; line-height: 1.06; letter-spacing: -0.02em; white-space: nowrap; }
  h1 span { color: #c1121f; }
  .bottom { position: absolute; left: 56px; right: 56px; bottom: 44px;
            border-top: 3px solid #101010; padding-top: 26px;
            display: flex; gap: 40px; font-size: 30px; font-weight: 600; color: #101010; }
  .bottom b { font-weight: 800; }
  .dot { color: #c1121f; }
  .scene { position: absolute; right: 66px; bottom: 122px; display: flex; align-items: flex-end; gap: 26px; }
  .win { width: 300px; border: 3px solid #101010; background: #faf8f4; box-shadow: 8px 8px 0 #101010; }
  .bar { display: flex; align-items: center; gap: 7px; padding: 9px 12px; background: #f0ede7; border-bottom: 3px solid #101010; }
  .bar i { width: 9px; height: 9px; }
  .bar span { font-family: "Jersey 10"; font-size: 24px; color: #5c5c58; margin-left: 6px; letter-spacing: .04em; }
  .scr { padding: 18px 18px 20px; font-family: "Jersey 10"; font-size: 27px; }
  .row { display: flex; justify-content: space-between; margin-top: 8px; }
  .ok { color: #2e7d44; }
  .tony { width: 190.5px; height: 348px; background: url(http://localhost:3000/mascot/tony.webp) no-repeat;
          background-size: ${190.5 * 9}px ${348 * 4}px; background-position: 0 0; }
</style></head><body>
  <div class="frame">
    <div class="top">
      <div class="wordmark">Vaky<span>.</span></div>
      <p class="eyebrow">PODGORICA · CRNA GORA</p>
    </div>
    <h1>Sajtovi koji<br><span>donose klijente.</span></h1>
    <div class="scene">
      <div class="tony"></div>
      <div class="win">
        <div class="bar"><i style="background:#c1121f"></i><i style="background:#d9a441"></i><i style="background:#2e7d44"></i><span>VAKY OS</span></div>
        <div class="scr">
          <div>DEPLOYED <span class="ok">OK</span></div>
          <div class="row"><span>DESIGN</span><span class="ok">OK</span></div>
          <div class="row"><span>MOBILE</span><span class="ok">OK</span></div>
          <div class="row"><span>SEO</span><span class="ok">OK</span></div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <span>Od <b>€100</b></span><span class="dot">·</span>
      <span>Rok <b>do 10 dana</b></span><span class="dot">·</span>
      <span>Besplatan koncept</span>
    </div>
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
