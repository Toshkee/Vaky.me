/* Temporary per-route screenshot helper for the four-concept build session.
   Usage: node scripts/tmp-shot.mjs /demo/<slug>/ <outPrefix>
   Deleted at the end of the session. */
import { chromium } from "playwright";

const [route, out, sizesArg] = process.argv.slice(2);
if (!route || !out) {
  console.error("usage: node scripts/tmp-shot.mjs /demo/<slug>/ <outPrefix> [360x800,390x844,...]");
  process.exit(1);
}

const SIZES = sizesArg
  ? sizesArg.split(",").map((s) => {
      const [w, h] = s.split("x").map(Number);
      return [`${w}x${h}`, w, h];
    })
  : [
      ["phone", 390, 844],
      ["tablet", 768, 1024],
      ["desktop", 1440, 900],
    ];

const browser = await chromium.launch();
for (const [label, width, height] of SIZES) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  const errors = [];
  const failed = [];
  const thirdParty = new Set();
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("requestfailed", (r) => failed.push(r.url()));
  page.on("request", (r) => {
    const host = new URL(r.url()).host;
    if (host && host !== "localhost:3000") thirdParty.add(host);
  });
  await page.goto("http://localhost:3000" + route, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  await page.screenshot({ path: `${out}-${label}.png`, fullPage: true });
  console.log(
    `${label}: overflow=${overflow}px errors=[${errors.join(" | ") || "none"}] failedRequests=[${failed.join(", ") || "none"}] thirdParty=[${[...thirdParty].join(", ") || "none"}]`,
  );
  await ctx.close();
}
await browser.close();
