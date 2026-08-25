import type { Metadata } from "next";
import Link from "next/link";
import { DM_Serif_Display } from "next/font/google";
import { VibeCodeBar } from "@/components/demo/VibeCodeBar";
import { barbers, hours, prices, quote } from "./data";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Barbershop Stari Grad — Stara Varoš, Podgorica",
  description:
    "Klasičan berberski zanat u srcu Stare Varoši. Šišanje, fade, brijanje toplim peškirom i njega brade. Zakazivanje preko Vibera — Njegoševa 27, Podgorica.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-barbershop-stari-grad.png"] },
};

/* ── Shared style tokens ─────────────────────────────────────────── */

const display = "[font-family:var(--font-dm-serif),Georgia,serif]";
const smallCaps = "text-[11px] font-semibold uppercase tracking-[0.2em]";
const smallCapsWide = "text-[11px] font-semibold uppercase tracking-[0.3em]";
/* Lightened gold for TEXT on deep green — #b08d3e reads ~4.2:1 there (AA-fail
   for small text); #c8a35a passes at ~5.4:1. Decorative rules keep true gold.
   On cream, gold is decorative-only (rules) — text there is green or red. */
const goldText = "text-[#c8a35a]";
const focusLight =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barber-red";
const focusDark =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barber-gold";
/* The barber pole. Appears exactly once — a vertical strip at the hero's
   left edge, where the pole would stand beside the shop door. */
const poleStripes =
  "bg-[repeating-linear-gradient(-45deg,#16382b_0px,#16382b_9px,#f5efe4_9px,#f5efe4_13px,#a4342c_13px,#a4342c_22px,#f5efe4_22px,#f5efe4_26px,#b08d3e_26px,#b08d3e_35px,#f5efe4_35px,#f5efe4_39px)]";

/* ── Emblem — the frosted-glass mark ─────────────────────────────── */

function Emblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 116" className={className} aria-hidden="true">
      {/* top diamond */}
      <path d="M70 4l4 7-4 7-4-7 4-7Z" fill="#a4342c" />
      {/* laurel — left branch */}
      <g fill="none" stroke="#b08d3e" strokeWidth={2} strokeLinecap="round">
        <path d="M40 106C20 92 12 62 26 36" />
        <path d="M32 98q-13 3-20-6" />
        <path d="M25 86q-13 0-17-10" />
        <path d="M21 72q-12-2-14-13" />
        <path d="M21 57q-11-5-10-16" />
        <path d="M25 43q-9-7-6-17" />
      </g>
      {/* laurel — right branch (mirrored) */}
      <g
        fill="none"
        stroke="#b08d3e"
        strokeWidth={2}
        strokeLinecap="round"
        transform="matrix(-1 0 0 1 140 0)"
      >
        <path d="M40 106C20 92 12 62 26 36" />
        <path d="M32 98q-13 3-20-6" />
        <path d="M25 86q-13 0-17-10" />
        <path d="M21 72q-12-2-14-13" />
        <path d="M21 57q-11-5-10-16" />
        <path d="M25 43q-9-7-6-17" />
      </g>
      {/* crossed scissor blades */}
      <path
        d="M70 70C61 53 53 35 48 19c11 15 19 32 26 49Z"
        fill="currentColor"
      />
      <path
        d="M70 70c9-17 17-35 22-51-11 15-19 32-26 49Z"
        fill="currentColor"
      />
      <g fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path d="M67 74l-7 8" />
        <path d="M73 74l7 8" />
        <circle cx="57" cy="89" r="7" />
        <circle cx="83" cy="89" r="7" />
      </g>
      <circle cx="70" cy="70" r="3.5" fill="#b08d3e" />
    </svg>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */

export default function Page() {
  return (
    <div
      className={`${dmSerif.variable} min-h-screen bg-barber-bg font-sans text-barber-green`}
    >
      <VibeCodeBar />

      {/* ── Nav ── */}
      <header className="border-b border-barber-green/15">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-5 py-5 sm:flex-row sm:justify-between">
          <p className={`${display} text-xl leading-none`}>
            Barbershop <span className="text-barber-red">Stari Grad</span>
          </p>
          <nav
            aria-label="Glavna navigacija"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
          >
            <a
              href="#cjenovnik"
              className={`${smallCaps} transition-colors hover:text-barber-red ${focusLight}`}
            >
              Cjenovnik
            </a>
            <a
              href="#majstori"
              className={`${smallCaps} transition-colors hover:text-barber-red ${focusLight}`}
            >
              Majstori
            </a>
            <a
              href="#kontakt"
              className={`${smallCaps} transition-colors hover:text-barber-red ${focusLight}`}
            >
              Kontakt
            </a>
            <a
              href="tel:+38267000000"
              className={`text-sm font-semibold transition-colors hover:text-barber-red ${focusLight}`}
            >
              +382 67 000 000
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero — letterhead lockup beside the pole ── */}
        <section className="relative">
          <span
            aria-hidden="true"
            className={`absolute inset-y-0 left-0 w-2 sm:w-2.5 ${poleStripes}`}
          />
          <div className="mx-auto max-w-5xl px-6 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
            <div className="max-w-2xl">
              <Emblem className="h-20 w-auto text-barber-green sm:h-24" />
              <h1 className="mt-8">
                <span className="block text-[13px] font-semibold uppercase tracking-[0.45em] text-barber-red">
                  Barbershop
                </span>
                <span
                  className={`${display} mt-2 block text-5xl leading-[0.95] sm:text-7xl`}
                >
                  Stari Grad
                </span>
              </h1>
              <div className="mt-6 flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-12 bg-barber-gold" />
                <p className={`${smallCaps} text-barber-green/70`}>
                  Est. 2018 · Stara Varoš · Podgorica
                </p>
              </div>
              <p
                className={`${display} mt-9 text-2xl italic leading-snug sm:text-3xl`}
              >
                Klasičan zanat. Moderan stil.
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-barber-green/75 sm:text-base">
                Precizno šišanje, njega brade i brijanje toplim peškirom — po
                starinski, u srcu Stare Varoši.
              </p>
              <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                <a
                  href="viber://chat?number=%2B38267000000"
                  className={`inline-flex items-center justify-center bg-barber-green px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-barber-bg transition-colors hover:bg-[#1e4a39] ${focusLight}`}
                >
                  Zakaži preko Vibera
                </a>
                <a
                  href="tel:+38267000000"
                  className={`text-sm font-semibold underline decoration-barber-gold decoration-2 underline-offset-4 transition-colors hover:text-barber-red ${focusLight}`}
                >
                  ili pozovi +382 67 000 000
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cjenovnik — the sign in the window ── */}
        <section
          id="cjenovnik"
          className="scroll-mt-6 border-t border-barber-green/15"
        >
          <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
            <div className="mx-auto max-w-lg border border-barber-green/40 bg-barber-card p-1.5">
              <div className="border border-barber-green/20 px-6 py-10 sm:px-10 sm:py-12">
                <h2
                  className={`${display} text-center text-2xl uppercase tracking-[0.28em] sm:text-3xl`}
                >
                  Cjenovnik
                </h2>
                <span
                  aria-hidden="true"
                  className="mx-auto mt-5 block h-[5px] w-14 border-y border-barber-gold"
                />
                <ul className="mt-8">
                  {prices.map((item) => (
                    <li
                      key={item.name}
                      className="border-b border-barber-green/15 py-3.5 last:border-b-0"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-[15px] font-medium">
                          {item.name}
                        </span>
                        <span className={`${display} text-xl text-barber-red`}>
                          {item.price}
                        </span>
                      </div>
                      {item.note ? (
                        <p className="mt-0.5 text-xs italic text-barber-green/70">
                          {item.note}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-barber-green/15 pt-5 text-center text-xs italic leading-relaxed text-barber-green/70 sm:text-sm">
                  Zakazivanje obavezno — termini se brzo popune.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Majstori — roster, set like a playbill ── */}
        <section id="majstori" className="scroll-mt-6">
          <div className="mx-auto max-w-5xl px-5 pb-16 sm:pb-24">
            <p className={`${smallCapsWide} text-barber-red`}>Naš tim</p>
            <h2 className={`${display} mt-3 text-3xl sm:text-4xl`}>
              Majstori zanata
            </h2>
            <ul className="mt-10 border-t border-barber-green/20">
              {barbers.map((barber) => (
                <li
                  key={barber.name}
                  className="grid gap-2 border-b border-barber-green/20 py-7 sm:grid-cols-[10rem_1fr] sm:gap-8"
                >
                  <div>
                    <h3 className={`${display} text-2xl`}>{barber.name}</h3>
                    <p className={`${smallCaps} mt-1.5 text-barber-red`}>
                      {barber.role}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-barber-green/75 sm:self-center sm:text-[15px]">
                    {barber.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Jedna riječ mušterije ── */}
        <section className="border-y border-barber-green/15 bg-barber-card">
          <div className="mx-auto max-w-2xl px-5 py-14 text-center sm:py-20">
            <blockquote>
              <p
                className={`${display} text-2xl italic leading-snug sm:text-3xl`}
              >
                „{quote.text}“
              </p>
              <footer className={`${smallCaps} mt-6 text-barber-red`}>
                — {quote.name}
              </footer>
            </blockquote>
          </div>
        </section>

        {/* ── Radno vrijeme + Kontakt ── */}
        <section
          id="kontakt"
          className="scroll-mt-6 bg-barber-green text-barber-bg"
        >
          <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
            <p className={`${smallCapsWide} ${goldText}`}>Kontakt</p>
            <h2 className={`${display} mt-3 text-3xl sm:text-4xl`}>
              Radno vrijeme i zakazivanje
            </h2>
            <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Radno vrijeme */}
              <div>
                <h3 className={`${display} text-xl`}>Radno vrijeme</h3>
                <ul className="mt-5 border-t border-barber-bg/15">
                  {hours.map((row) => (
                    <li
                      key={row.days}
                      className="flex items-baseline justify-between gap-4 border-b border-barber-bg/15 py-3.5"
                    >
                      <span className="text-sm font-medium sm:text-base">
                        {row.days}
                      </span>
                      <span
                        className={
                          row.closed
                            ? `${goldText} text-sm italic sm:text-base`
                            : `${display} text-base sm:text-lg`
                        }
                      >
                        {row.time}
                      </span>
                    </li>
                  ))}
                </ul>
                <address className="mt-8 text-sm not-italic leading-relaxed text-barber-bg/85">
                  <span className={`${smallCaps} ${goldText} block`}>
                    Adresa
                  </span>
                  <span className="mt-2 block">
                    Njegoševa 27, 81000 Podgorica — Stara Varoš
                  </span>
                </address>
              </div>

              {/* Zakazivanje */}
              <div>
                <h3 className={`${display} text-xl`}>Zakaži svoj termin</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-barber-bg/75">
                  Najbrže preko Vibera — javi se i dogovorićemo termin koji ti
                  odgovara. Odgovaramo u toku radnog vremena.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:max-w-xs">
                  <a
                    href="viber://chat?number=%2B38267000000"
                    className={`inline-flex items-center justify-center bg-barber-bg px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-barber-green transition-colors hover:bg-barber-card ${focusDark}`}
                  >
                    Zakaži preko Vibera
                  </a>
                  <a
                    href="tel:+38267000000"
                    className={`inline-flex items-center justify-center border border-barber-bg/60 px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors hover:border-barber-bg hover:bg-barber-bg/10 ${focusDark}`}
                  >
                    +382 67 000 000
                  </a>
                </div>
                <p className="mt-6 text-sm text-barber-bg/70">
                  Instagram:{" "}
                  <span className="font-semibold text-barber-bg/90">
                    @barbershop.starigrad
                  </span>
                </p>
              </div>
            </div>

            {/* Mapa */}
            <div className="mt-14 border border-barber-bg/25 p-1.5">
              <iframe
                src="https://www.google.com/maps?q=Stara+Varo%C5%A1,+Podgorica,+Crna+Gora&output=embed"
                title="Mapa — Barbershop Stari Grad, Njegoševa 27, Stara Varoš, Podgorica"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full sepia-[.2] sm:h-80"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#102b21] text-barber-bg">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-5 py-12 text-center">
          <p className={`${display} text-lg`}>Barbershop Stari Grad</p>
          <p className={`${smallCapsWide} ${goldText}`}>
            Est. 2018 · Stara Varoš
          </p>
          <p className="text-sm text-barber-bg/70">
            Pon–Pet 09–20 · Sub 09–16 · Ned zatvoreno
          </p>
          <p className="text-sm text-barber-bg/70">
            Njegoševa 27, Podgorica · +382 67 000 000
          </p>
          <p className="mt-4 text-xs text-barber-bg/60">
            Sajt:{" "}
            <Link
              href="/"
              className={`${goldText} font-semibold underline-offset-4 transition-colors hover:underline ${focusDark}`}
            >
              VibeCode.me
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
