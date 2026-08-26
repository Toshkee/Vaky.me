import { chromium, devices } from "playwright";
const SCRATCH = "/private/tmp/claude-501/-Users-toshkee-vibecode-me/746d155c-bf78-4549-9eaf-8672ab9f2fdf/scratchpad";
const b = await chromium.launch();

// contrast math
function lum(hex) {
  const c = hex.replace("#","").match(/../g).map(h => parseInt(h,16)/255)
    .map(v => v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4));
  return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2];
}
function ratio(a,bg) { const [l1,l2] = [lum(a),lum(bg)].sort((x,y)=>y-x); return ((l1+0.05)/(l2+0.05)).toFixed(2); }
const bg = "#0b0c0e", card = "#141619", volt = "#c8f31d", steel = "#8b939e", white="#ffffff";
console.log("volt on bg:", ratio(volt,bg));
console.log("volt on card:", ratio(volt,card));
console.log("steel on bg:", ratio(steel,bg));
console.log("steel on card:", ratio(steel,card));
console.log("white/70 approx #b3b3b6 on bg:", ratio("#b3b3b6",bg));
console.log("white/85 approx #d9d9db on card:", ratio("#d9d9db",card));
console.log("bg on volt (buttons):", ratio(bg,volt));
console.log("white on bg:", ratio(white,bg));

// Desktop clips
const ctx1 = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
const p1 = await ctx1.newPage();
await p1.goto("http://localhost:3000/demo/titan-gym/", { waitUntil: "networkidle" });
await p1.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });
await p1.waitForTimeout(2500); // give the maps iframe time
const kontakt = p1.locator("#kontakt");
await kontakt.scrollIntoViewIfNeeded();
await p1.waitForTimeout(2000);
await kontakt.screenshot({ path: SCRATCH + "/titan-desktop-kontakt.png" });
await p1.locator("#clanarine").screenshot({ path: SCRATCH + "/titan-desktop-pricing.png" });
await ctx1.close();

// iPhone clips
const ctx2 = await b.newContext({ ...devices["iPhone 13"], reducedMotion: "reduce" });
const p2 = await ctx2.newPage();
await p2.goto("http://localhost:3000/demo/titan-gym/", { waitUntil: "networkidle" });
await p2.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; });
await p2.waitForTimeout(1500);
// hero viewport
await p2.screenshot({ path: SCRATCH + "/titan-m-hero.png" });
await p2.locator("#clanarine").screenshot({ path: SCRATCH + "/titan-m-pricing.png" });
await p2.locator("#raspored").screenshot({ path: SCRATCH + "/titan-m-raspored.png" });
const kontakt2 = p2.locator("#kontakt");
await kontakt2.scrollIntoViewIfNeeded();
await p2.waitForTimeout(2000);
await kontakt2.screenshot({ path: SCRATCH + "/titan-m-kontakt.png" });

// tap target audit on mobile
const taps = await p2.evaluate(() => {
  const out = [];
  document.querySelectorAll("a, button").forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width && r.height && (r.height < 40 || r.width < 40)) {
      out.push(`${(el.textContent||"").trim().slice(0,30)} -> ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
  });
  return out;
});
console.log("SMALL TAP TARGETS (<40px):", JSON.stringify(taps, null, 2));
await ctx2.close();
await b.close();
