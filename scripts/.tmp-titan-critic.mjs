import { chromium, devices } from "playwright";
const SCRATCH = "/private/tmp/claude-501/-Users-toshkee-vibecode-me/746d155c-bf78-4549-9eaf-8672ab9f2fdf/scratchpad";
const b = await chromium.launch();

// Desktop 1440
const ctx1 = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
const p1 = await ctx1.newPage();
await p1.goto("http://localhost:3000/demo/titan-gym/", { waitUntil: "networkidle" });
await p1.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; document.querySelectorAll(".reveal").forEach(el => el.classList.add("in")); });
await p1.waitForTimeout(600);
await p1.screenshot({ path: SCRATCH + "/titan-desktop-1440.png", fullPage: true });
await ctx1.close();

// iPhone 13
const ctx2 = await b.newContext({ ...devices["iPhone 13"], reducedMotion: "reduce" });
const p2 = await ctx2.newPage();
await p2.goto("http://localhost:3000/demo/titan-gym/", { waitUntil: "networkidle" });
await p2.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; document.querySelectorAll(".reveal").forEach(el => el.classList.add("in")); });
await p2.waitForTimeout(600);
await p2.screenshot({ path: SCRATCH + "/titan-iphone13.png", fullPage: true });

// horizontal overflow check on mobile
const overflow = await p2.evaluate(() => {
  const docW = document.documentElement.clientWidth;
  const bad = [];
  document.querySelectorAll("*").forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.right > docW + 1 || r.left < -1) {
      if (r.width > 0 && r.height > 0) bad.push(`${el.tagName}.${(el.className||"").toString().slice(0,60)} right=${Math.round(r.right)} left=${Math.round(r.left)}`);
    }
  });
  return { docW, scrollW: document.documentElement.scrollWidth, bad: bad.slice(0, 15) };
});
console.log("MOBILE OVERFLOW:", JSON.stringify(overflow, null, 2));
await ctx2.close();
await b.close();
