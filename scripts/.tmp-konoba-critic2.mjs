import { chromium, devices } from "playwright";
const SCRATCH = "/private/tmp/claude-501/-Users-toshkee-vibecode-me/746d155c-bf78-4549-9eaf-8672ab9f2fdf/scratchpad";
const b = await chromium.launch();

// Mobile clips
const ctx = await b.newContext({ ...devices["iPhone 13"], reducedMotion: "reduce" });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/demo/konoba-skadar/", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
await p.screenshot({ path: `${SCRATCH}/m-hero.png` });
await p.locator("#meni").scrollIntoViewIfNeeded();
await p.waitForTimeout(300);
await p.screenshot({ path: `${SCRATCH}/m-menu.png` });
await p.locator("#kontakt").scrollIntoViewIfNeeded();
await p.evaluate(() => window.scrollBy(0, 300));
await p.waitForTimeout(1500);
await p.screenshot({ path: `${SCRATCH}/m-kontakt.png` });
await p.evaluate(() => window.scrollBy(0, 700));
await p.waitForTimeout(1500);
await p.screenshot({ path: `${SCRATCH}/m-map.png` });
await ctx.close();

// Desktop map area with long wait
const ctx2 = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
const p2 = await ctx2.newPage();
await p2.goto("http://localhost:3000/demo/konoba-skadar/", { waitUntil: "networkidle" });
await p2.locator("#kontakt").scrollIntoViewIfNeeded();
await p2.waitForTimeout(4000);
await p2.screenshot({ path: `${SCRATCH}/d-kontakt.png` });
await ctx2.close();
await b.close();
