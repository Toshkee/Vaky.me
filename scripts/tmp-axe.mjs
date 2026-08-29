/* Temporary per-route axe helper for the four-concept build session.
   Usage: node scripts/tmp-axe.mjs /demo/<slug>/
   Deleted at the end of the session. */
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const route = process.argv[2];
if (!route) {
  console.error("usage: node scripts/tmp-axe.mjs /demo/<slug>/");
  process.exit(1);
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ reducedMotion: "reduce" });
const page = await ctx.newPage();
await page.goto("http://localhost:3000" + route, { waitUntil: "networkidle" });
const { violations } = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  .analyze();
if (!violations.length) console.log("no violations");
for (const v of violations) {
  console.log(`${v.id} (${v.impact}) — ${v.help}`);
  for (const n of v.nodes.slice(0, 5)) console.log(`  ${n.target.join(" ")}`);
}
await browser.close();
process.exit(violations.length ? 1 : 0);
