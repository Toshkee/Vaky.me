import { chromium } from "playwright";
const BASE = "http://localhost:3000";
const browser = await chromium.launch();

async function at(w, fn) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const r = await fn(page);
  console.log(`--- w=${w}`, JSON.stringify(r, null, 1));
  await ctx.close();
}

// footer vs FAB overlap at mobile widths
for (const w of [344, 412, 640, 767]) {
  await at(w, async (page) => {
    await page.evaluate(() => document.querySelector("footer").scrollIntoView({ block: "end" }));
    await page.waitForTimeout(300);
    return page.evaluate(() => {
      const fab = document.querySelector('a[class*="fab-appear"]')?.getBoundingClientRect();
      const handle = [...document.querySelectorAll("footer a")].find((a) => a.textContent.includes("@"));
      const copy = document.querySelector("footer span:last-child")?.getBoundingClientRect();
      const h = handle?.getBoundingClientRect();
      const ov = (a, b) => a && b && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
      return {
        fab: fab && { l: Math.round(fab.left), r: Math.round(fab.right), t: Math.round(fab.top), b: Math.round(fab.bottom) },
        handle: h && { l: Math.round(h.left), r: Math.round(h.right), t: Math.round(h.top), b: Math.round(h.bottom) },
        copyright: copy && { l: Math.round(copy.left), r: Math.round(copy.right), t: Math.round(copy.top), b: Math.round(copy.bottom) },
        fabOverHandle: ov(fab, h),
        fabOverCopyright: ov(fab, copy),
      };
    });
  });
}

// footer wrap range: does the handle sit on a second row?
for (const w of [768, 820, 900, 960, 1000, 1024]) {
  await at(w, (page) =>
    page.evaluate(() => {
      const handle = [...document.querySelectorAll("footer a")].find((a) => a.textContent.includes("@"));
      const logo = document.querySelector("footer a");
      return { wrapped: handle.getBoundingClientRect().top - logo.getBoundingClientRect().top > 10 };
    })
  );
}

// hero at 1024: cursor icon vs Tony
await at(1024, (page) =>
  page.evaluate(() => {
    const patch = document.querySelector(".px-grid");
    const svgs = [...patch.querySelectorAll(":scope > svg")].map((s) => {
      const r = s.getBoundingClientRect();
      return { cls: s.getAttribute("class"), l: Math.round(r.left), r: Math.round(r.right), t: Math.round(r.top), b: Math.round(r.bottom) };
    });
    const tony = patch.querySelector('[class*="tony"], [class*="mascot"]')?.getBoundingClientRect();
    const all = [...patch.querySelectorAll("*")]
      .filter((e) => /tony|mascot/i.test(e.className?.baseVal ?? e.className ?? ""))
      .slice(0, 4)
      .map((e) => {
        const r = e.getBoundingClientRect();
        return { cls: String(e.className?.baseVal ?? e.className).slice(0, 40), l: Math.round(r.left), r: Math.round(r.right), t: Math.round(r.top), b: Math.round(r.bottom) };
      });
    return { svgs, tony: tony && { l: Math.round(tony.left), r: Math.round(tony.right), t: Math.round(tony.top), b: Math.round(tony.bottom) }, all };
  })
);

await browser.close();
