import { chromium, webkit, devices } from "playwright";

const BASE = "http://localhost:3000";
const targets = [
  { name: "home", path: "/" },
  { name: "en", path: "/en/" },
  { name: "start", path: "/start/" },
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
   `npx playwright install webkit` if the WebKit pass errors out. */
const engines = [
  ["Chromium", chromium],
  ["WebKit", webkit],
];

for (const [engineName, engine] of engines) {
  const browser = await engine.launch();

  for (const dev of ["iPhone SE", "iPhone 13"]) {
    const ctx = await browser.newContext({ ...devices[dev], reducedMotion: "reduce" });
    const page = await ctx.newPage();
    console.log(`\n=== ${engineName} · ${dev} (${devices[dev].viewport.width}px) ===`);

    for (const t of targets) {
      await page.goto(BASE + t.path, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);

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
      console.log(`  ${t.name.padEnd(8)} ${status}`);
      d.out.forEach((o) => console.log(`      ↳ ${o}`));
      if (d.small.length) d.small.forEach((s) => console.log(`      small-tap: ${s}`));
    }
    await ctx.close();
  }

  await browser.close();
}
