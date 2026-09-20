import { chromium, webkit, devices } from "playwright";

const BASE = (process.argv[2] ?? "http://localhost:3001").replace(/\/$/, "");
const targets = [
  { name: "home", path: "/" },
  { name: "en", path: "/en/" },
  { name: "start", path: "/start/" },
  { name: "start-form", path: "/start/form/" },
  { name: "admin", path: "/admin/" },
  { name: "lucky", path: "/demo/lucky-chopsticks/" },
  { name: "konoba", path: "/demo/konoba-skadar/" },
  { name: "titan", path: "/demo/titan-gym/" },
  { name: "barber", path: "/demo/barbershop-stari-grad/" },
  { name: "drina", path: "/demo/barber-drina/" },
  { name: "soul", path: "/demo/soul-studio/" },
  { name: "kraft", path: "/demo/kraftart/" },
  { name: "lavlav", path: "/demo/lavlav/" },
  { name: "telo", path: "/demo/telo-pilates/" },
  { name: "dental", path: "/demo/dental-clinic-kovacevic/" },
  { name: "andrea", path: "/demo/andrea-beauty-house/" },
  { name: "mila", path: "/demo/studio-ljepote-mila/" },
  { name: "ljepota", path: "/demo/studio-ljepote-zdravlja/" },
  { name: "maja", path: "/demo/pilates-by-maja/" },
  { name: "skyline", path: "/demo/skyline-tattoo/" },
];

/* Playwright's iPhone profiles are Chromium with a spoofed UA, which is the
   wrong engine for exactly the things phones break on — :active under touch,
   clip-path, filters. So the same sweep runs twice, once per engine.
   `npx playwright install webkit` if the WebKit pass errors out.

   Two servers, two jobs. Against `npm run dev` this covers both engines but
   stops at the dashboard's password. Against `npm run dev:api` — with
   ADMIN_PASSWORD set — it also measures the admin screens, but only in
   Chromium: WebKit cannot open a wrangler dev server at all and times out on
   the first page. Run it both ways rather than expecting one to do both. */
const engines = [
  ["Chromium", chromium],
  ["WebKit", webkit],
];

for (const [engineName, engine] of engines) {
  const browser = await engine.launch();

  /* Signed in once per engine, not once per device. The login endpoint is
     rate limited — four sign-ins in a row from the same run is enough to be
     told to wait a minute, and the sweep then reports a dashboard it never
     reached as if it were broken. The cookie is handed to each device
     context instead. */
  let adminCookies = null;
  if (process.env.ADMIN_PASSWORD) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    if (await signIn(page)) adminCookies = await ctx.cookies();
    await ctx.close();
  }

  for (const dev of ["iPhone SE", "iPhone 13"]) {
    const ctx = await browser.newContext({ ...devices[dev], reducedMotion: "reduce" });
    if (adminCookies) await ctx.addCookies(adminCookies);
    const page = await ctx.newPage();
    console.log(`\n=== ${engineName} · ${dev} (${devices[dev].viewport.width}px) ===`);

    for (const t of targets) {
      await page.goto(BASE + t.path, { waitUntil: "load" });
      await page.waitForTimeout(300);
      await report(page, t.name);
    }

    /* The dashboard past its password. `/admin/` on its own is the login box,
       which is one narrow form and has never been the thing at risk — the
       screens that hold a full-width row of leads or projects are, and until
       this they were never measured on a phone at all. Needs /api/ in front
       of the build (npm run dev:api) and ADMIN_PASSWORD from .dev.vars; the
       sweep says so and carries on when it does not have them. */
    if (!process.env.ADMIN_PASSWORD) {
      console.log("  admin-in skipped — set ADMIN_PASSWORD and use a base URL with /api/");
    } else if (adminCookies) {
      for (const view of ["pregled", "upiti", "projekti"]) {
        await page.goto(`${BASE}/admin/?v=${view}`, { waitUntil: "load" });
        await page.getByRole("heading", { level: 1 }).first().waitFor({ timeout: 15_000 });
        await report(page, view);
      }
    } else {
      console.log("  admin-in FAILED to sign in — is /api/ served and the password right?");
    }

    await ctx.close();
  }

  await browser.close();
}

async function signIn(page) {
  await page.goto(`${BASE}/admin/`, { waitUntil: "load" });
  await page.getByLabel(/lozinka/i).fill(process.env.ADMIN_PASSWORD);
  await page.getByRole("button", { name: /prijav/i }).click();
  /* The dashboard nav, not an h1 — the login screen has an h1 of its own and
     waiting on that would pass while the form is still on screen. */
  return page
    .getByRole("navigation", { name: "Glavna navigacija" })
    .waitFor({ timeout: 15_000 })
    .then(() => true)
    .catch((error) => {
      console.log(`  sign-in: ${String(error).split("\n")[0]}`);
      return false;
    });
}

async function report(page, name) {
  const d = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const scrollW = document.documentElement.scrollWidth;
    // only report elements NOT clipped by an overflow-hidden ancestor
    const clipped = (el) => {
      let p = el.parentElement;
      while (p && p !== document.body) {
        const o = getComputedStyle(p);
        if (o.overflowX !== "visible" || o.overflow !== "visible") return true;
        p = p.parentElement;
      }
      return false;
    };
    const out = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if ((r.right > vw + 1 || r.left < -1) && !clipped(el)) {
        out.push(
          `${el.tagName.toLowerCase()}.${(el.getAttribute("class") || "").split(" ")[0]} [${Math.round(r.left)}→${Math.round(r.right)}] "${(el.textContent || "").trim().slice(0, 28)}"`,
        );
      }
    }
    // tap-target check: real hit test 20px above the element's centre, so
    // ::before-expanded hit areas are measured rather than just the text box
    const small = [];
    for (const el of document.querySelectorAll("a, button, summary, input")) {
      const r = el.getBoundingClientRect();
      if (r.height === 0 || r.width === 0 || r.height >= 40) continue;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      if (cy - 20 < 0 || cy + 20 > window.innerHeight) continue; // off-screen
      const hits = (y) => {
        const t = document.elementFromPoint(cx, y);
        return t === el || el.contains(t);
      };
      if (!hits(cy - 18) || !hits(cy + 18)) {
        small.push(
          `${el.tagName.toLowerCase()} ${Math.round(r.width)}x${Math.round(r.height)} "${(el.textContent || "").trim().slice(0, 24)}"`,
        );
      }
    }
    return { vw, overflow: scrollW - vw, out: out.slice(0, 6), small: small.slice(0, 6) };
  });

  const status = d.overflow > 0 ? `OVERFLOW +${d.overflow}px` : "ok";
  console.log(`  ${name.padEnd(8)} ${status}`);
  d.out.forEach((o) => console.log(`      ↳ ${o}`));
  if (d.small.length) d.small.forEach((s) => console.log(`      small-tap: ${s}`));
}
