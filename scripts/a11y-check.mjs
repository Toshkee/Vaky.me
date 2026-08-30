/**
 * Automated accessibility check — axe-core over every page the site ships.
 *
 *   node scripts/a11y-check.mjs [baseUrl]     # default: http://localhost:3000
 *
 * Automation catches roughly the third of accessibility problems that are
 * mechanical: contrast, names, roles, landmarks, order. It cannot tell you
 * whether the page makes sense in a screen reader or whether the focus order
 * follows the design. Keep reading it as a floor, not a certificate.
 *
 * Exits non-zero on any violation.
 */
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const PAGES = [
  "/",
  "/en/",
  "/privacy/",
  "/en/privacy/",
  "/demo/lucky-chopsticks/",
  "/demo/konoba-skadar/",
  "/demo/titan-gym/",
  "/demo/barbershop-stari-grad/",
  "/demo/barber-drina/",
  "/demo/soul-studio/",
  "/demo/zlatara-opal/",
  "/demo/kraftart/",
  "/demo/lavlav/",
  "/demo/telo-pilates/",
  "/demo/dental-clinic-kovacevic/",
  "/demo/andrea-beauty-house/",
  "/demo/studio-ljepote-mila/",
  "/demo/studio-ljepote-zdravlja/",
  "/demo/pilates-by-maja/",
  "/demo/skyline-tattoo/",
  "/demo/maluni-shop/",
];

const browser = await chromium.launch();
let total = 0;

for (const path of PAGES) {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE + path, { waitUntil: "networkidle" });

  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  total += violations.length;
  console.log(`\n=== ${path} — ${violations.length || "no"} violation(s) ===`);
  for (const violation of violations) {
    console.log(`  ${violation.id} (${violation.impact}) — ${violation.help}`);
    for (const node of violation.nodes.slice(0, 4)) {
      console.log(`    ${node.target.join(" ")}`);
    }
  }

  await ctx.close();
}

await browser.close();
console.log(`\n${total === 0 ? "OK" : "FAILED"} — ${total} violation(s)`);
process.exit(total === 0 ? 0 : 1);
