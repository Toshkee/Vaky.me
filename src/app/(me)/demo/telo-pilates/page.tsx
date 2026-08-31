import type { Metadata } from "next";
import Link from "next/link";
import { Albert_Sans, Libre_Caslon_Display } from "next/font/google";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { InstagramIcon } from "@/components/demo/ContactIcons";
import { firstVisit, formats, languages, method, studio } from "./data";
import styles from "./telo.module.css";

/* Libre Caslon Display is the studio's own logotype voice — a high-contrast
   Caslon that only behaves at size, which is exactly how this page uses it:
   the wordmark, the display lines and the format names, all lowercase. Albert
   Sans carries every sentence anyone actually has to read. latin-ext for
   č/ć/š/ž/đ. */
const display = Libre_Caslon_Display({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-telo-display",
});
const sans = Albert_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-telo-sans",
});

export const metadata: Metadata = {
  title: "Telo Pilates Club — reformer pilates, Podgorica | Dizajn koncept",
  description:
    "Dizajn koncept za Telo Pilates Club u Podgorici: formati na reformeru, kako izgleda prvi čas i direktan put do rezervacije.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-telo-pilates.png"] },
};

const serif = "[font-family:var(--font-telo-display),Georgia,serif]";
const label = "text-[0.68rem] font-semibold uppercase tracking-[0.26em]";
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--telo-ink)]";

/* Rectangles, radius 0, wide letterspacing: the geometry of the reformer frame
   rather than of a wellness pill.

   The primary keeps its ink fill on the butter fields too. Inverting it there —
   butter fill on butter ground — would need a border to exist at all, which is
   the secondary's job; the one action on the page should not have to be
   outlined to be seen. The inversion instead lives where the ground is dark:
   the language band and the phone booking slab, where butter becomes the fill. */
const ctaType =
  "items-center justify-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors";
const primaryCta = `inline-flex min-h-12 px-8 ${ctaType} bg-[var(--telo-ink)] text-[var(--telo-butter)] hover:bg-[var(--telo-ink-hover)] ${focus}`;
const secondaryCta = `inline-flex min-h-12 px-8 ${ctaType} border border-[var(--telo-ink)] hover:bg-[var(--telo-ink)] hover:text-[var(--telo-butter)] ${focus}`;
const headerCta = `hidden min-h-11 px-6 sm:inline-flex ${ctaType} bg-[var(--telo-ink)] text-[0.66rem] text-[var(--telo-butter)] hover:bg-[var(--telo-ink-hover)] ${focus}`;

/**
 * The page's one graphic: a rail, two stops, and the arc a reformer carriage
 * travels between them.
 *
 * It is drawn twice — edge to edge under the hero, and a quarter of that width
 * under the closing line — because the page carries no photographs and this is
 * the only thing on it that is a picture of the studio's own equipment. On
 * scroll the stroke extends from the first stop and settles on the second;
 * without scroll timelines, or with reduced motion, it is simply already there.
 *
 * The drawing stretches to whatever box it is given (`preserveAspectRatio` is
 * off) so the arc keeps a usable height on a phone instead of flattening into a
 * hairline. The rail, the stops and the carriage are `non-scaling-stroke` and
 * stay exactly one device pixel — the carriage is a zero-length round-capped
 * segment, a dot that cannot go oval however the box is scaled.
 *
 * The arc deliberately is not: a dashed stroke measured in device pixels can no
 * longer be normalised by `pathLength`, and the draw would clip short of the
 * far stop at some widths. Scaling with the box instead costs it a little
 * modulation on a narrow screen — thinner where the curve runs flat, fuller
 * where it turns — which is the same thin/thick logic as the Caslon it is
 * drawn under. Stroke width steps down as the box widens (see the CSS module)
 * so the line lands around three pixels everywhere.
 */
function CarriageTrack({ className = "" }: { className?: string }) {
  const ink = "var(--telo-ink)";
  return (
    <div className={`${styles.trackFrame} ${className}`}>
      <svg
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className="block h-full w-full"
        stroke={ink}
        fill="none"
      >
        <path d="M0 128H1200" strokeOpacity="0.22" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M140 110V146M1060 110V146" strokeOpacity="0.45" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path
          className={styles.trackStroke}
          pathLength={1}
          d="M140 128C340 128 380 28 620 28C880 28 980 112 1060 128"
          strokeLinecap="round"
        />
        <path
          className={styles.trackEnd}
          d="M1060 128h0.01"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export default function TeloPilatesPage() {
  return (
    <div
      className={`${styles.page} ${display.variable} ${sans.variable} min-h-screen bg-[var(--telo-chalk)] pb-[calc(4rem+env(safe-area-inset-bottom))] text-[var(--telo-ink)] [font-family:var(--font-telo-sans),system-ui,sans-serif] md:pb-0`}
    >
      <VibeLabBar />

      {/* Header and hero share one butter field — the studio's wordmark tile
          blown up to the width of the page. No centre anchor row: there is one
          thing to do here, and it is booking. */}
      <header className="bg-[var(--telo-butter)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:py-6">
          <a
            href="#vrh"
            className={`${serif} inline-flex min-h-11 items-center text-[1.35rem] leading-none tracking-[-0.01em] sm:text-[1.6rem] ${focus}`}
          >
            {studio.wordmark}
          </a>
          <a
            href={studio.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="demo_booking"
            data-umami-event-demo="telo-pilates"
            data-umami-event-action="booking-header"
            className={headerCta}
          >
            Rezerviši čas
          </a>
        </div>
      </header>

      <main id="vrh">
        <section className="bg-[var(--telo-butter)]">
          <div className="mx-auto max-w-6xl px-5 pt-8 pb-10 sm:px-8 sm:pt-14 sm:pb-14">
            <div className="grid gap-9 lg:grid-cols-[1.05fr_0.85fr] lg:items-end lg:gap-12">
              <div>
                <p className={`${label} text-[var(--telo-muted)]`}>reformer pilates · podgorica</p>
                {/* Three words, each stepping further in — the same stagger the
                    format rows use further down, and the same direction the
                    carriage travels. */}
                <h1
                  className={`${serif} mt-6 text-[clamp(3rem,13vw,7.5rem)] leading-[0.88] tracking-[-0.03em] sm:mt-8`}
                >
                  <span className="block">kontrola.</span>
                  <span className="block pl-[0.55em]">snaga.</span>
                  <span className="block pl-[1.1em]">pokret.</span>
                </h1>
              </div>

              <div className="lg:pb-4">
                <p className="max-w-md text-[1.125rem] leading-[1.6] text-[var(--telo-muted)] sm:text-[1.2rem]">
                  Reformer, individualni i grupni formati u Podgorici — rezervacija bez suvišnih
                  koraka.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={studio.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="demo_booking"
                    data-umami-event-demo="telo-pilates"
                    data-umami-event-action="booking-hero"
                    className={primaryCta}
                  >
                    Rezerviši čas
                  </a>
                  <a href="#formati" className={secondaryCta}>
                    Izaberi format
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Edge to edge on purpose: the rail is the floor the hero stands on,
              not an ornament parked inside the text column. */}
          <div className="pb-8 sm:pb-12">
            <CarriageTrack className="h-24 sm:h-32 lg:h-40" />
          </div>
        </section>

        {/* The formats, written as a score rather than as five cards: one rule
            per line, the name stepping in, the setting holding its column. */}
        <section id="formati" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="max-w-2xl">
              <h2
                className={`${serif} text-[clamp(1.9rem,5vw,3.25rem)] leading-[1.02] tracking-[-0.02em]`}
              >
                izaberi format, pa termin.
              </h2>
              <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-[var(--telo-muted)]">
                Pet načina da uđeš u salu. Slobodni termini i raspored stoje u booking sistemu
                studija — ovdje je samo odluka koja im prethodi.
              </p>
            </div>

            <ul className={`${styles.score} mt-12 border-b border-[var(--telo-line)] sm:mt-16`}>
              {formats.map((format) => (
                <li key={format.id} className="border-t border-[var(--telo-line)] py-6 sm:py-7">
                  <div className="grid gap-x-10 gap-y-2.5 md:grid-cols-[minmax(0,1fr)_15rem] md:items-baseline lg:grid-cols-[minmax(0,1fr)_19rem]">
                    <h3
                      className={`${styles.stave} ${serif} text-[clamp(2.1rem,6vw,3.75rem)] leading-[1] tracking-[-0.025em]`}
                    >
                      {format.name}
                    </h3>
                    <p className="text-[0.95rem] leading-relaxed text-[var(--telo-muted)]">
                      {format.setting}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Method and machines in one short band, on butter rather than chalk.
            Between the formats and the first visit the page would otherwise run
            three long light sections in a row; the studio's own ground turned
            back on here is what separates the choice from the arrival. The
            studio's claim keeps its attribution; the apparatus is a set line,
            not five feature tiles. */}
        <section className="bg-[var(--telo-butter)]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="grid gap-8 border-t-2 border-[var(--telo-ink)] pt-8 md:grid-cols-[0.85fr_1.15fr] md:gap-14 md:pt-10">
              <div>
                <h2
                  className={`${serif} text-[clamp(1.5rem,3.4vw,2.25rem)] leading-[1.12] tracking-[-0.02em]`}
                >
                  {method.claim}
                </h2>
              </div>
              <div>
                <p className="text-[0.9rem] leading-relaxed text-[var(--telo-muted)]">
                  Sprave koje studio navodi uz individualni rad:
                </p>
                <p
                  className={`${serif} mt-4 text-[clamp(1.1rem,3vw,1.9rem)] leading-[1.35] tracking-[-0.01em]`}
                >
                  {method.equipment.join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The one section on the page that runs across instead of splitting
            into a heading column and a content column: three steps side by
            side, in the order they happen. Read down, the rest of the page is a
            list of choices; this is the only part that is a sequence, and
            laying it out horizontally is what says so. */}
        <section>
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <h2
              className={`${serif} max-w-2xl text-[clamp(1.9rem,5vw,3rem)] leading-[1.04] tracking-[-0.02em]`}
            >
              kako izgleda prvi čas.
            </h2>

            {/* No numerals over the three entries. Reading order is left to
                right, the sentences are already in sequence, and `ol` says so
                to anything that is not reading with its eyes — a set of 01 02
                03 on top of that is a figure for its own sake. The rule each
                one hangs from is the same weight as the rule under the method
                band above, so the section is tied to the page rather than
                dressed up as its own component. */}
            <ol className="mt-12 grid gap-10 sm:mt-14 md:grid-cols-3 md:gap-8 lg:gap-12">
              {firstVisit.map((step) => (
                <li
                  key={step}
                  className="border-t-2 border-[var(--telo-ink)] pt-5 text-[1.05rem] leading-relaxed sm:text-[1.125rem] lg:text-[1.2rem]"
                >
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* The one dark field on the page, and the one place the palette
            inverts: butter becomes the ink. */}
        <section className="bg-[var(--telo-ink)] text-[var(--telo-butter)]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="grid gap-7 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-12">
              <p
                className={`${serif} text-[clamp(2.6rem,10vw,5.75rem)] leading-[0.9] tracking-[-0.03em]`}
              >
                {languages.codes.join(" · ")}
              </p>
              <div className="md:pb-2">
                <h2 className={`${serif} text-[clamp(1.4rem,3vw,1.9rem)] leading-[1.15]`}>
                  jezik u sali.
                </h2>
                <p className="mt-4 max-w-sm text-[1rem] leading-relaxed text-[var(--telo-muted-ink)]">
                  {languages.line}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="grid gap-6 border-t-2 border-[var(--telo-ink)] pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12">
              <div>
                <p className={`${label} text-[var(--telo-muted)]`}>gdje</p>
                <h2
                  className={`${serif} mt-4 text-[clamp(2rem,6.5vw,3.75rem)] leading-[0.98] tracking-[-0.025em]`}
                >
                  {studio.area.toLowerCase()}.
                </h2>
              </div>
              <address className="not-italic md:pb-1 md:text-right">
                <span className="block text-[0.9rem] leading-relaxed text-[var(--telo-muted)]">
                  Pitanja prije prvog dolaska:
                </span>
                <a
                  href={studio.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_contact"
                  data-umami-event-demo="telo-pilates"
                  data-umami-event-action="instagram-lokacija"
                  className={`mt-1 inline-flex min-h-11 items-center gap-2 text-[1.05rem] font-semibold underline underline-offset-[6px] hover:no-underline ${focus}`}
                >
                  <InstagramIcon className="h-[1.15rem] w-[1.15rem]" />@{studio.instagram}
                </a>
              </address>
            </div>
          </div>
        </section>

        {/* The handoff. Butter field, the studio's alternate lockup at full
            size, and the carriage arriving under it one last time. */}
        <section id="rezervacija" className="scroll-mt-6 bg-[var(--telo-butter)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
              <div>
                <p className={`${label} text-[var(--telo-muted)]`}>rezervacija</p>
                <h2
                  className={`${serif} mt-6 text-[clamp(2.9rem,11vw,6.25rem)] leading-[0.9] tracking-[-0.03em]`}
                >
                  telo u pokretu.
                </h2>
                <CarriageTrack
                  className={`${styles.trackEcho} mt-9 h-20 max-w-[21rem] sm:mt-12 sm:h-24 sm:max-w-md`}
                />
              </div>
              <div className="lg:pb-2">
                <p className="max-w-md text-[1.0625rem] leading-relaxed text-[var(--telo-muted)]">
                  Rasporedom upravlja booking sistem studija — formati, slobodni termini i prijava
                  stoje na jednom mjestu.
                </p>
                <a
                  href={studio.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_booking"
                  data-umami-event-demo="telo-pilates"
                  data-umami-event-action="booking-final"
                  className={`${primaryCta} mt-8 w-full sm:w-auto lg:w-full`}
                >
                  Rezerviši čas
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--telo-line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className={`${serif} text-xl tracking-[-0.01em]`}>{studio.wordmark}</p>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-[var(--telo-muted)]">
              Nezvanični dizajn koncept. Podaci su preuzeti sa javnog Instagram profila studija i
              njegovog javnog booking sistema; strana je namjerno bez fotografija i služi samo za
              prikaz ideje.
            </p>
          </div>
          <p className="text-xs text-[var(--telo-muted)]">
            Koncept:{" "}
            <Link
              href="/"
              className={`inline-flex min-h-11 items-center font-semibold text-[var(--telo-ink)] hover:underline ${focus}`}
            >
              VibeLab
            </Link>
          </p>
        </div>
      </footer>

      {/* Phones only, and one action wide. The page asks for exactly one thing,
          so the bar is not a row of choices — it is that thing, always within
          thumb reach. The root carries matching bottom padding so the footer is
          never trapped behind it. */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-[var(--telo-ink)] pb-[env(safe-area-inset-bottom)] md:hidden">
        <a
          href={studio.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="demo_booking"
          data-umami-event-demo="telo-pilates"
          data-umami-event-action="booking-sticky"
          className="flex min-h-14 w-full items-center justify-center px-5 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-[var(--telo-butter)] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--telo-butter)]"
        >
          Rezerviši čas
        </a>
      </div>
    </div>
  );
}
