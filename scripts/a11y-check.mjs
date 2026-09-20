/**
 * Automated accessibility check — axe-core over every page the site ships.
 *
 *   node scripts/a11y-check.mjs [baseUrl]     # default: http://localhost:3001
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

const BASE = (process.argv[2] ?? "http://localhost:3001").replace(/\/$/, "");
const PAGES = [
  "/",
  "/en/",
  "/privacy/",
  "/en/privacy/",
  /* One trade page per language stands for all ten: they share one
     component and differ only in copy. */
  "/sajt-za-frizere/",
  "/en/website-for-villas/",
  /* The onboarding wizard. axe only ever sees the screen a URL lands on, so
     this covers the language gate and nothing past it — the steps themselves
     are keyboard-and-screen-reader work that has to be done by hand. */
  "/start/",
  /* Hit directly, with no token in the URL, this is the loading state every
     /start/<token>/ link passes through before the rewrite hands it one. */
  "/start/form/",
  /* The internal dashboard's password gate — the only screen a logged-out
     run can ever reach here. */
  "/admin/",
  "/demo/lucky-chopsticks/",
  "/demo/konoba-skadar/",
  "/demo/titan-gym/",
  "/demo/barbershop-stari-grad/",
  "/demo/barber-drina/",
  "/demo/soul-studio/",
  "/demo/kraftart/",
  "/demo/lavlav/",
  "/demo/telo-pilates/",
  "/demo/dental-clinic-kovacevic/",
  "/demo/andrea-beauty-house/",
  "/demo/studio-ljepote-mila/",
  "/demo/studio-ljepote-zdravlja/",
  "/demo/pilates-by-maja/",
  "/demo/skyline-tattoo/",
];

/* The dashboard behind the password. Every screen here is one the studio
   works in every day, and until this existed none of them had ever been
   scanned — the run stopped at the login form, which is the one admin screen
   nobody uses twice.

   It needs a server with /api/ in front of it, so it is skipped under a plain
   `next dev`: point the script at `npm run dev:api` (or pass that base URL)
   and set ADMIN_PASSWORD to the value in .dev.vars to include them. */
const ADMIN_VIEWS = [
  "/admin/?v=pregled",
  "/admin/?v=upiti",
  "/admin/?v=projekti",
];

const browser = await chromium.launch();
let total = 0;

async function scan(page, name) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  total += violations.length;
  console.log(`\n=== ${name} — ${violations.length || "no"} violation(s) ===`);
  for (const violation of violations) {
    console.log(`  ${violation.id} (${violation.impact}) — ${violation.help}`);
    for (const node of violation.nodes.slice(0, 4)) {
      console.log(`    ${node.target.join(" ")}`);
    }
  }
}

for (const path of PAGES) {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE + path, { waitUntil: "load" });
  await scan(page, path);
  await ctx.close();
}

const password = process.env.ADMIN_PASSWORD;
if (!password) {
  console.log(
    "\n=== /admin/ (logged in) — skipped ===\n" +
      "  Set ADMIN_PASSWORD and point this at a base URL with /api/ behind it\n" +
      "  (npm run dev:api) to scan the dashboard rather than its login form.",
  );
} else {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/admin/`, { waitUntil: "load" });
  await page.getByLabel(/lozinka/i).fill(password);
  await page.getByRole("button", { name: /prijav/i }).click();

  /* The dashboard's own nav is the signal that the session took. Deliberately
     not "wait for an h1": the login screen has one of those too, so that wait
     would resolve on the form still being on screen and scan it instead. */
  const landed = await page
    .getByRole("navigation", { name: "Glavna navigacija" })
    .waitFor({ timeout: 15_000 })
    .then(() => true)
    .catch(() => false);

  if (!landed) {
    console.log(
      "\n=== /admin/ (logged in) — could not sign in ===\n" +
        "  Is /api/ being served, and does ADMIN_PASSWORD match this server's?",
    );
    total += 1;
  } else {
    for (const view of ADMIN_VIEWS) {
      await page.goto(BASE + view, { waitUntil: "load" });
      await page.getByRole("heading", { level: 1 }).first().waitFor({ timeout: 15_000 });
      await scan(page, view);
    }
  }

  await ctx.close();
}

await browser.close();
console.log(`\n${total === 0 ? "OK" : "FAILED"} — ${total} violation(s)`);
process.exit(total === 0 ? 0 : 1);
