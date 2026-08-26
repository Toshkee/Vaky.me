import { chromium, devices } from "playwright";
const OUT = "/private/tmp/claude-501/-Users-toshkee-vibecode-me/746d155c-bf78-4549-9eaf-8672ab9f2fdf/scratchpad";
const b = await chromium.launch();

// Desktop 1440
{
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, reducedMotion:"reduce" });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3000/demo/barbershop-stari-grad/", { waitUntil:"networkidle" });
  await p.evaluate(() => { document.documentElement.style.scrollBehavior="auto"; document.querySelectorAll(".reveal").forEach(el=>el.classList.add("in")); });
  await p.waitForTimeout(600);
  await p.screenshot({ path: `${OUT}/barber-desktop-full.png`, fullPage: true });
  await ctx.close();
}

// iPhone 13
{
  const ctx = await b.newContext({ ...devices["iPhone 13"], reducedMotion:"reduce" });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3000/demo/barbershop-stari-grad/", { waitUntil:"networkidle" });
  await p.evaluate(() => { document.documentElement.style.scrollBehavior="auto"; document.querySelectorAll(".reveal").forEach(el=>el.classList.add("in")); });
  await p.waitForTimeout(600);
  await p.screenshot({ path: `${OUT}/barber-mobile-full.png`, fullPage: true });
  await ctx.close();
}
await b.close();
console.log("done");
