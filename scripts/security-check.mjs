/**
 * Security regression check.
 *
 *   node scripts/security-check.mjs [baseUrl]      # default: production
 *
 * Two kinds of check live here. Edge checks (headers, redirects, method
 * handling, sensitive paths) only mean something against something that serves
 * `vercel.json` — production or a Vercel preview — so they are skipped, loudly,
 * when the target is a local dev server. Page checks (cookies, map privacy,
 * source maps, rel on new-tab links, XSS probes) run anywhere.
 *
 * Exit code 1 if any check fails, so CI can gate on it.
 */
import { chromium, request } from "playwright";

const BASE = (process.argv[2] || "https://vibelab.it.com").replace(/\/$/, "");
const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)/.test(BASE);
const apex = "https://vibelab.it.com";

const PAGES = [
  "/",
  "/en/",
  "/demo/barber-drina/",
  "/demo/titan-gym/",
  /* The four outreach concepts: unlisted pages carrying photographs taken from
     public profiles and links out to Instagram, WhatsApp, Viber and DIKIDI.
     They are the pages most likely to grow a hotlink or a bare target=_blank. */
  "/demo/soul-studio/",
  "/demo/zlatara-opal/",
  "/demo/kraftart/",
  "/demo/lavlav/",
];

let failed = 0;
let skipped = 0;

function ok(name, detail = "") {
  console.log(`  PASS  ${name}${detail ? ` — ${detail}` : ""}`);
}
function bad(name, detail) {
  failed++;
  console.log(`  FAIL  ${name} — ${detail}`);
}
function skip(name, why) {
  skipped++;
  console.log(`  SKIP  ${name} — ${why}`);
}
function check(name, condition, detail) {
  if (condition) ok(name);
  else bad(name, detail);
}

const api = await request.newContext({ ignoreHTTPSErrors: false });

/* ── Edge: response headers ──────────────────────────────────────── */

console.log(`\n=== Headers · ${BASE} ===`);
if (isLocal) {
  skip("security headers", "vercel.json headers are not applied by next dev");
} else {
  const res = await api.get(`${BASE}/`);
  const h = res.headers();
  const csp = h["content-security-policy"] || "";

  check("Content-Security-Policy present", csp.length > 0, "header missing");
  for (const directive of [
    "default-src 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
  ]) {
    check(`CSP · ${directive}`, csp.includes(directive), `not in: ${csp || "(none)"}`);
  }
  check(
    "CSP has no wildcard source",
    !/(^|[\s;])\*|https:\s*(;|$)/.test(csp),
    `wildcard origin in: ${csp}`,
  );
  check("X-Frame-Options: DENY", h["x-frame-options"] === "DENY", h["x-frame-options"] || "missing");
  check(
    "HSTS one year, subdomains, no preload",
    /max-age=31536000/.test(h["strict-transport-security"] || "") &&
      /includeSubDomains/i.test(h["strict-transport-security"] || "") &&
      !/preload/i.test(h["strict-transport-security"] || ""),
    h["strict-transport-security"] || "missing",
  );
  check(
    "X-Content-Type-Options: nosniff",
    h["x-content-type-options"] === "nosniff",
    h["x-content-type-options"] || "missing",
  );
  check(
    "Referrer-Policy: strict-origin-when-cross-origin",
    h["referrer-policy"] === "strict-origin-when-cross-origin",
    h["referrer-policy"] || "missing",
  );
  check(
    "Permissions-Policy locks camera/mic/geolocation",
    /camera=\(\)/.test(h["permissions-policy"] || "") &&
      /microphone=\(\)/.test(h["permissions-policy"] || "") &&
      /geolocation=\(\)/.test(h["permissions-policy"] || ""),
    h["permissions-policy"] || "missing",
  );
  check(
    "Cross-Origin-Opener-Policy set",
    (h["cross-origin-opener-policy"] || "").startsWith("same-origin"),
    h["cross-origin-opener-policy"] || "missing",
  );
  /* Not exploitable on a site with no private data, but a wildcard CORS
     header on a static host is always someone's leftover rule. */
  check(
    "no wildcard Access-Control-Allow-Origin",
    h["access-control-allow-origin"] !== "*",
    "Access-Control-Allow-Origin: *",
  );
}

/* ── Edge: canonical host and scheme ─────────────────────────────── */

console.log("\n=== Redirects ===");
if (isLocal) {
  skip("canonical redirects", "local target");
} else {
  for (const [name, url, wantHost] of [
    ["www → apex", "https://www.vibelab.it.com/", apex],
    ["http → https", "http://vibelab.it.com/", apex],
  ]) {
    const res = await api.get(url, { maxRedirects: 0 }).catch((e) => e);
    const status = typeof res.status === "function" ? res.status() : 0;
    const location = typeof res.headers === "function" ? res.headers()["location"] || "" : "";
    check(
      name,
      [301, 308].includes(status) && location.startsWith(wantHost),
      `status ${status}, location "${location}"`,
    );
  }
}

/* ── Edge: nothing served that should not be ─────────────────────── */

console.log("\n=== Sensitive paths and methods ===");
if (isLocal) {
  skip("sensitive paths and methods", "local target");
} else {
  for (const path of [
    "/.env",
    "/.env.local",
    "/.git/config",
    "/.git/HEAD",
    "/.vercel/project.json",
    "/package.json",
    "/next.config.ts",
    "/tsconfig.json",
  ]) {
    const res = await api.get(BASE + path);
    check(`404 ${path}`, res.status() === 404, `status ${res.status()}`);
  }
  for (const method of ["TRACE", "PUT", "DELETE"]) {
    const res = await api
      .fetch(`${BASE}/`, { method, failOnStatusCode: false })
      .catch(() => null);
    const status = res ? res.status() : 0;
    check(`${method} is refused`, status === 0 || status >= 400, `status ${status}`);
  }
}

/* ── Pages: what the browser actually does ───────────────────────── */

const browser = await chromium.launch();

console.log(`\n=== Pages · ${BASE} ===`);
for (const path of PAGES) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const thirdParty = [];
  page.on("request", (req) => {
    const host = new URL(req.url()).host;
    if (host && !BASE.includes(host) && host !== "localhost") thirdParty.push(host);
  });
  const pageErrors = [];
  page.on("pageerror", (e) => pageErrors.push(e.message));

  await page.goto(BASE + path, { waitUntil: "networkidle" });

  const cookies = await ctx.cookies();
  check(`${path} sets no cookies`, cookies.length === 0, cookies.map((c) => c.name).join(", "));

  const google = thirdParty.filter((h) => /google|gstatic|doubleclick/.test(h));
  check(
    `${path} contacts no Google host before consent`,
    google.length === 0,
    [...new Set(google)].join(", "),
  );

  /* Every photograph on the concept pages is served from this origin, which
     is all `img-src 'self' data:` allows. This catches a hotlink back to
     Instagram's CDN slipping in with a new image. */
  const remoteAssets = thirdParty.filter((h) => /instagram|fbcdn|facebook|dikidi/.test(h));
  check(
    `${path} loads no remote social assets`,
    remoteAssets.length === 0,
    [...new Set(remoteAssets)].join(", "),
  );

  const blank = await page.$$eval('a[target="_blank"]', (links) =>
    links.filter((a) => !/noopener/.test(a.rel)).map((a) => a.href),
  );
  check(`${path} new-tab links carry rel=noopener`, blank.length === 0, blank.join(", "));

  /* Only our own bundles: a third party publishing its source maps is that
     third party's business, and nothing about our code leaks through it. */
  const scripts = (await page.$$eval("script[src]", (s) => s.map((el) => el.src))).filter((src) =>
    src.startsWith(BASE),
  );
  const sourceMaps = [];
  for (const src of scripts) {
    const res = await api.get(`${src}.map`).catch(() => null);
    if (res && res.status() === 200) sourceMaps.push(`${src}.map`);
  }
  check(`${path} ships no source maps`, sourceMaps.length === 0, sourceMaps.join(", "));

  check(`${path} loads without page errors`, pageErrors.length === 0, pageErrors.join(" | "));

  await ctx.close();
}

/* The map must stay unbuilt until a visitor asks for it, and must actually
   build when they do — a placeholder that never loads is not privacy, it is
   a broken feature. */
console.log("\n=== Click-to-load map ===");
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const googleHits = [];
  page.on("request", (req) => {
    if (/google\.com/.test(req.url())) googleHits.push(req.url());
  });
  await page.goto(`${BASE}/demo/titan-gym/`, { waitUntil: "networkidle" });
  check("no Google request on load", googleHits.length === 0, googleHits.join(", "));

  const button = page.getByRole("button", { name: /prikaži mapu/i }).first();
  if (await button.count()) {
    await button.focus();
    await page.keyboard.press("Enter");
    await page.waitForSelector('iframe[src*="google.com/maps"]', { timeout: 10_000 });
    const referrerPolicy = await page.getAttribute("iframe", "referrerpolicy");
    ok("map loads from the keyboard");
    check("loaded map sends no referrer", referrerPolicy === "no-referrer", referrerPolicy || "unset");
  } else {
    bad("click-to-load map", "no 'Prikaži mapu' button found");
  }
  await ctx.close();
}

/* ── Pages: reflected-input probes ───────────────────────────────── */

console.log("\n=== Query-string probes ===");
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  page.on("dialog", async (d) => {
    bad("XSS probe", `dialog opened: ${d.message()}`);
    await d.dismiss();
  });
  for (const payload of [
    "<script>window.__xss=1</script>",
    '"><img src=x onerror=window.__xss=1>',
    "javascript:window.__xss=1",
  ]) {
    await page.goto(`${BASE}/?q=${encodeURIComponent(payload)}`, { waitUntil: "load" });
    const executed = await page.evaluate(() => "__xss" in window);
    check(`payload inert: ${payload.slice(0, 24)}…`, !executed, "payload executed");
  }
  await ctx.close();
}

await browser.close();
await api.dispose();

console.log(
  `\n${failed === 0 ? "OK" : "FAILED"} — ${failed} failing check${failed === 1 ? "" : "s"}` +
    (skipped ? `, ${skipped} skipped (run against a deployed URL to cover them)` : ""),
);
process.exit(failed === 0 ? 0 : 1);
