import type { Metadata } from "next";
import Link from "next/link";
import { Albert_Sans } from "next/font/google";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { InstagramIcon } from "@/components/demo/ContactIcons";
import { firstVisit, formats, languages, method, studio } from "./data";
import { StickyBookingBar } from "./StickyBookingBar";
import styles from "./telo.module.css";

/* Albert Sans, at extreme weight contrast, is the whole typeface system: 900
   for every display line, regular/medium for anything meant to be read at
   length. No second family — a reformer studio's poster voice comes from
   scale and weight, not from a second typeface doing the "editorial" job the
   old pass leaned on. latin-ext for č/ć/š/ž/đ. */
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

const eyebrow = "text-[0.72rem] font-semibold uppercase tracking-[0.28em]";

/* Two focus rings, because the page now has real ink slabs, not just ink
   text: whatever a focus outline sits on, it has to out-contrast the section
   behind it, not the element it's attached to (the offset ring lands on the
   surrounding field). Butter ground → ink ring. Ink ground → butter ring. */
const focusOnLight =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--telo-ink)]";
const focusOnDark =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--telo-butter)]";

/* One slab voice, used everywhere a CTA sits on the ink ground: butter fill,
   ink type, radius 0. There is no CTA left on a light ground on this page —
   both bookings and the hero live on ink now — so one variant is enough. */
const ctaType =
  "items-center justify-center text-[0.72rem] font-bold uppercase tracking-[0.18em] transition-colors";
const primaryCta = `inline-flex min-h-14 px-9 ${ctaType} bg-[var(--telo-butter)] text-[var(--telo-ink)] hover:bg-[var(--telo-line-butter)] ${focusOnDark}`;
const headerCta = `hidden min-h-11 px-6 sm:inline-flex ${ctaType} bg-[var(--telo-butter)] text-[0.66rem] text-[var(--telo-ink)] hover:bg-[var(--telo-line-butter)] ${focusOnDark}`;

/**
 * The page's one signature graphic: a rail, two fixed stops, and the arc a
 * reformer carriage travels between them. It appears four times — under the
 * hero line, between the formats board and the closing handoff, and as a
 * smaller echo in the close — because the page carries no photographs, and
 * this is the only picture on it of the studio's own equipment.
 *
 * `preserveAspectRatio="none"` lets the drawing stretch to whatever box it is
 * given, so the arc keeps a usable height on a phone instead of flattening
 * into a hairline. The rail and the arc are `non-scaling-stroke` (or scale in
 * the drawing's own units, stepped down in the CSS module) so they read as a
 * consistent weight at every size. The two stops are square-capped ticks, not
 * filled circles — geometry that survives the non-uniform stretch instead of
 * being squashed by it. The round dot at the far stop is the carriage itself,
 * and it is the one part of the mark that still moves: on scroll it lands
 * just as the arc finishes drawing; with reduced motion, or without
 * scroll-driven animation support, it is simply already there.
 */
function RangeMark({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles.trackFrame} ${className}`}>
      <svg
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className="block h-full w-full"
        stroke="currentColor"
        fill="none"
      >
        <path d="M0 128H1200" strokeOpacity="0.3" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        <path
          className={styles.trackTick}
          d="M140 104V152M1060 104V152"
          strokeOpacity="0.85"
          strokeLinecap="square"
          vectorEffect="non-scaling-stroke"
        />
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
      className={`${styles.page} ${sans.variable} min-h-screen bg-[var(--telo-chalk)] text-[var(--telo-ink)] [font-family:var(--font-telo-sans),system-ui,sans-serif]`}
    >
      <VibeLabBar />

      {/* Header and hero share one unbroken ink field — the poster ground —
          so the page opens on full contrast instead of easing into it. */}
      <header className="bg-[var(--telo-ink)] text-[var(--telo-butter)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5">
          <a
            href="#vrh"
            className={`inline-flex min-h-11 items-center text-[1.1rem] font-black leading-none tracking-[-0.01em] lowercase sm:text-[1.35rem] ${focusOnDark}`}
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
        {/* The whole first screen: one line of context, the three-word
            stack, the range mark as a live underline, one line of subcopy,
            and the booking CTA — composed to finish before the fold. */}
        <section className="bg-[var(--telo-ink)] text-[var(--telo-butter)]">
          <div className="mx-auto max-w-6xl px-5 pt-8 pb-12 sm:px-8 sm:pt-10 sm:pb-16 lg:grid lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-16 lg:pt-16 lg:pb-24">
            <div>
              <p className={`${eyebrow} text-[var(--telo-muted-ink)]`}>
                reformer pilates · {studio.area.toLowerCase()}
              </p>
              <h1 className="mt-5 text-[clamp(3.25rem,15vw,9rem)] font-black leading-[0.86] tracking-[-0.03em] lowercase sm:mt-6">
                <span className="block">kontrola.</span>
                <span className="block pl-[0.5em]">snaga.</span>
                <span className="block pl-[1em]">pokret.</span>
              </h1>
            </div>
            <div className="lg:pb-3">
              <RangeMark className="mt-7 h-9 w-full max-w-[15rem] text-[var(--telo-butter)] sm:mt-8 sm:h-11 sm:max-w-xs lg:mt-0 lg:max-w-none" />
              <p className="mt-7 max-w-md text-pretty text-[1.05rem] leading-[1.55] text-[var(--telo-muted-ink)] sm:mt-8 sm:text-[1.15rem]">
                Reformer studio u Podgorici — grupno, u paru ili individualno.
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:mt-9 sm:flex-row sm:items-center sm:gap-7 lg:flex-col lg:items-stretch lg:gap-5">
                <a
                  id="hero-cta"
                  href={studio.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_booking"
                  data-umami-event-demo="telo-pilates"
                  data-umami-event-action="booking-hero"
                  className={`${primaryCta} lg:w-full`}
                >
                  Rezerviši čas
                </a>
                <a
                  href="#formati"
                  className={`inline-flex min-h-11 items-center justify-center text-[0.85rem] font-semibold underline decoration-2 underline-offset-[6px] hover:decoration-[var(--telo-line-butter)] ${focusOnDark}`}
                >
                  Pogledaj formate
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* The formats, as a class board rather than an editorial score: two
            solid rules per row, the name at full poster weight, one terse
            line of orientation beside it. */}
        <section id="formati" className="scroll-mt-6 bg-[var(--telo-chalk)]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="max-w-2xl">
              <h2 className="text-[clamp(2rem,7vw,3.5rem)] font-black leading-[0.96] tracking-[-0.02em] lowercase">
                izaberi format, pa termin.
              </h2>
              <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-[var(--telo-muted)]">
                Pet formata na reformeru. Slobodni termini i raspored stoje u booking sistemu
                studija — ovdje je samo odluka koja im prethodi.
              </p>
            </div>

            <ul className="mt-10 border-t-2 border-[var(--telo-ink)] sm:mt-14">
              {formats.map((format) => (
                <li key={format.id} className="border-b-2 border-[var(--telo-ink)] py-6 sm:py-7">
                  <div className="grid gap-x-10 gap-y-2 md:grid-cols-[minmax(0,1fr)_17rem] md:items-baseline">
                    <h3 className="text-[clamp(1.9rem,6.5vw,3rem)] font-black leading-[1] tracking-[-0.02em] lowercase">
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

        {/* Method, machines and language, one composed ink band rather than
            three separate slabs. The claim keeps its attribution, the
            apparatus reads as a set line, and the language codes keep their
            own punchy display treatment below a hairline rule — so the shift
            in register (small-caps line → poster-scale type) reads as an
            intentional break, not a cramped afterthought. */}
        <section className="bg-[var(--telo-ink)] text-[var(--telo-butter)]">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
            <div className="flex flex-col gap-7 sm:gap-8">
              <div className="grid gap-6 sm:gap-7 md:grid-cols-[1fr_1.3fr] md:items-center md:gap-12">
                <p className="text-[1.15rem] font-semibold leading-snug sm:text-[1.3rem]">
                  {method.claim}
                </p>
                <p className="text-[0.95rem] font-medium uppercase tracking-[0.1em] text-[var(--telo-muted-ink)] sm:text-[1rem]">
                  {method.equipment.join(" · ")}
                </p>
              </div>

              <div className="flex flex-col gap-6 border-t border-[var(--telo-muted-ink)]/20 pt-7 sm:gap-7 sm:pt-8 md:flex-row md:items-end md:justify-between md:gap-12">
                <p className="text-[clamp(2.5rem,10vw,5rem)] font-black leading-[0.85] tracking-[-0.03em] lowercase">
                  {languages.codes.join(" / ")}
                </p>
                <p className="max-w-sm text-[1rem] leading-relaxed text-[var(--telo-muted-ink)] sm:text-[1.05rem]">
                  {languages.line}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Three things a first-timer can act on, run as a ghost-numeral row
            rather than a listy column — the number carries the sequence, the
            sentence carries the point. */}
        <section className="bg-[var(--telo-chalk)]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <h2 className="max-w-xl text-[clamp(1.9rem,6vw,3rem)] font-black leading-[0.98] tracking-[-0.02em] lowercase">
              kako izgleda prvi čas.
            </h2>
            <ol className="mt-10 grid gap-7 sm:mt-12 sm:grid-cols-3 sm:gap-6">
              {firstVisit.map((step, index) => (
                <li key={step} className="flex items-start gap-4 sm:flex-col sm:gap-3">
                  <span
                    aria-hidden="true"
                    className="text-[2.75rem] font-black leading-none text-[var(--telo-ink)]/15 sm:text-[3.25rem]"
                  >
                    {index + 1}
                  </span>
                  <p className="pt-2 text-[1.05rem] leading-relaxed sm:pt-0 sm:text-[1.1rem]">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[var(--telo-chalk)]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="flex flex-col gap-9 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className={`${eyebrow} text-[var(--telo-muted)]`}>gdje</h2>
                <p className="mt-3 text-[clamp(2.25rem,7vw,4rem)] font-black leading-[0.95] tracking-[-0.02em] lowercase">
                  {studio.area.toLowerCase()}.
                </p>
              </div>
              <address className="not-italic sm:text-right">
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
                  className={`mt-1 inline-flex min-h-11 items-center gap-2 text-[1.05rem] font-semibold underline underline-offset-[6px] hover:no-underline ${focusOnLight}`}
                >
                  <InstagramIcon className="h-[1.15rem] w-[1.15rem]" />@{studio.instagram}
                </a>
              </address>
            </div>
          </div>
        </section>

        {/* The handoff: the poster ground one last time, the wordmark line
            at full scale, and the carriage arriving under it. */}
        <section id="rezervacija" className="scroll-mt-6 bg-[var(--telo-ink)] text-[var(--telo-butter)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
              <div>
                <h2 className="text-[clamp(3rem,12vw,7rem)] font-black leading-[0.86] tracking-[-0.03em] lowercase">
                  telo u pokretu.
                </h2>
                <RangeMark
                  className={`${styles.trackEcho} mt-8 h-16 max-w-[16rem] text-[var(--telo-butter)] sm:mt-10 sm:h-20 sm:max-w-xs`}
                />
              </div>
              <div className="lg:pb-2">
                <p className="max-w-md text-pretty text-[1.0625rem] leading-relaxed text-[var(--telo-muted-ink)]">
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
                  className={`${primaryCta} mt-8 w-full justify-center sm:w-auto lg:w-full`}
                >
                  Rezerviši čas
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="site-footer" className="border-t-2 border-[var(--telo-ink)] bg-[var(--telo-chalk)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className="text-lg font-black lowercase tracking-[-0.01em]">{studio.wordmark}</p>
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
              className={`inline-flex min-h-11 items-center font-semibold text-[var(--telo-ink)] hover:underline ${focusOnLight}`}
            >
              VibeLab
            </Link>
          </p>
        </div>
      </footer>

      <StickyBookingBar bookingUrl={studio.bookingUrl} />
    </div>
  );
}
