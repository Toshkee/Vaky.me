import type { Metadata } from "next";
import Link from "next/link";
import { Albert_Sans } from "next/font/google";
import { VakyBar } from "@/components/demo/VakyBar";
import { InstagramIcon } from "@/components/demo/ContactIcons";
import { firstVisit, formats, languages, method, studio } from "./data";
import { StickyBookingBar } from "./StickyBookingBar";
import styles from "./telo.module.css";

/* Albert Sans, at extreme weight contrast, is the whole typeface system: 900
   for the h1 and the two headings that open a band, 700 for everything else
   that carries display scale, regular/medium for anything meant to be read at
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
   both bookings and the hero live on ink now — so one variant is enough. The
   header slab stays visible on a phone: hiding it left the header as a 60px
   band with a wordmark and nothing else. */
const ctaType =
  "items-center justify-center text-[0.72rem] font-bold uppercase tracking-[0.18em] transition-colors";
/* The min-width is the floor that keeps the page's primary control from ever
   reading as smaller than the compact header slab above it: below sm it runs
   full width, above sm it is at least 15rem whatever the column does. */
const primaryCta = `inline-flex min-h-14 px-9 ${ctaType} sm:min-w-[15rem] bg-[var(--telo-butter)] text-[var(--telo-ink)] hover:bg-[var(--telo-line-butter)] ${focusOnDark}`;
const headerCta = `inline-flex min-h-11 px-4 sm:px-6 ${ctaType} bg-[var(--telo-butter)] text-[0.66rem] text-[var(--telo-ink)] hover:bg-[var(--telo-line-butter)] ${focusOnDark}`;

/* The entry format: the one most first-timers book. It gets the board's one
   size step up and its own row structure, so five formats are not five
   identical rows. */
const ENTRY_FORMAT = "grupni-reformer";

/* The label under every row of the board and inside every phone tile. It names
   where the tap lands — the studio's booking system — and deliberately does
   not promise a per-format deep link, which the tenant may not support. */
const bookingWord = "otvori booking ↗";

/**
 * The page's one picture: a reformer in side elevation. There are no
 * photographs of this studio, so this mark carries the entire visual load,
 * which is why it is drawn in filled geometry rather than strokes — solid end
 * frames, a double rail, a carriage block — with nothing in it lighter than
 * the h1's stem. It scales uniformly, so it reads as a machine at 350px on a
 * phone and at 1200px on a desktop.
 *
 * One part moves: the carriage. It is drawn at the far end of its travel, so
 * the settled machine is what a browser without scroll-driven animation and
 * anyone who asked for reduced motion sees; where the timeline is supported it
 * runs the rail as the mark scrolls into view. Used twice on the page — hero
 * and close — and nowhere else.
 */
function RangeMark({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles.trackFrame} ${className}`}>
      <svg
        viewBox="0 0 900 200"
        aria-hidden="true"
        focusable="false"
        className="block h-auto w-full"
        fill="currentColor"
      >
        {/* the two rails, running the full width of the frame */}
        <rect x="0" y="88" width="900" height="18" />
        <rect x="0" y="126" width="900" height="18" />
        {/* left: the footbar frame the feet push against */}
        <rect x="0" y="26" width="70" height="16" />
        <rect x="20" y="26" width="32" height="62" />
        <rect x="20" y="144" width="32" height="56" />
        {/* right: the taller riser frame at the far end of the rail */}
        <rect x="830" y="0" width="70" height="18" />
        <rect x="848" y="0" width="32" height="88" />
        <rect x="848" y="144" width="32" height="56" />
        {/* the carriage, with its shoulder rest, drawn where it comes to rest */}
        <g className={styles.carriage}>
          <rect x="644" y="46" width="180" height="42" />
          <rect x="644" y="16" width="44" height="30" />
        </g>
      </svg>
    </div>
  );
}

export default function TeloPilatesPage() {
  return (
    <div
      className={`${styles.page} ${sans.variable} min-h-screen bg-[var(--telo-chalk)] text-[var(--telo-ink)] [font-family:var(--font-telo-sans),system-ui,sans-serif]`}
    >
      <VakyBar />

      {/* Header and hero share one unbroken ink field — the poster ground —
          so the page opens on full contrast instead of easing into it. */}
      <header className="bg-[var(--telo-ink)] text-[var(--telo-butter)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5">
          <a
            href="#vrh"
            className={`inline-flex min-h-11 items-center text-[1.1rem] font-bold leading-none tracking-[-0.01em] lowercase sm:text-[1.35rem] ${focusOnDark}`}
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
        {/* The first screen names the machine and the number of ways to get on
            it, signs itself underneath, and then draws the reformer at poster
            size — the mark breaking the container on the right, the one place
            on the page where the rail leaves the rail. */}
        <section className="overflow-x-clip bg-[var(--telo-ink)] text-[var(--telo-butter)]">
          {/* The hero splits in two at xl, not at lg, and both tracks are
              capped with minmax(0,…). At 9rem the h1's longest line
              ("formata." plus its indent) has a ~675px min-content, which is
              more than a 1.3fr share of the 896px available at 1024 — so the
              old lg split handed the left track its intrinsic width and sized
              the right one to its own min-content, leaving the CTA 154px wide
              with a wrapping label and the hero's right edge short of every
              rule below it. Below 1280 the poster stacks instead, which is the
              only honest thing to do with a headline that wide. */}
          <div className="mx-auto max-w-6xl px-5 pt-8 pb-0 sm:px-8 sm:pt-10 lg:pt-16 xl:grid xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] xl:items-start xl:gap-16">
            <div>
              <h1 className="text-[clamp(3.25rem,15vw,9rem)] font-black leading-[0.86] tracking-[-0.03em] lowercase">
                <span className="block">reformer.</span>
                <span className="block pl-[0.5em]">pet</span>
                <span className="block pl-[1em]">formata.</span>
              </h1>
              {/* The category descriptor signs the headline instead of
                  introducing it — no badge above the h1, and no caps block
                  orphaning "Podgorica" onto a second line at 390px. */}
              <p className="mt-6 border-t border-[var(--telo-muted-ink)]/40 pt-4 text-[0.95rem] font-medium text-[var(--telo-muted-ink)] sm:mt-8">
                Reformer pilates · {studio.area}
              </p>
            </div>
            <div className="mt-9 xl:mt-2">
              <p className="max-w-md text-pretty text-[1.05rem] leading-[1.55] text-[var(--telo-muted-ink)] sm:text-[1.15rem]">
                Reformer studio u Podgorici — grupno, u paru ili individualno.
              </p>
              <a
                id="hero-cta"
                href={studio.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_booking"
                data-umami-event-demo="telo-pilates"
                data-umami-event-action="booking-hero"
                className={`${primaryCta} mt-7 w-full sm:mt-8 sm:w-auto xl:w-full`}
              >
                Rezerviši čas
              </a>
              <div className="mt-7 border-t border-[var(--telo-muted-ink)]/30 pt-5">
                <a
                  href="#formati"
                  className={`inline-flex min-h-11 items-center text-[0.85rem] font-semibold underline decoration-2 underline-offset-[6px] hover:decoration-[var(--telo-line-butter)] ${focusOnDark}`}
                >
                  Pogledaj formate
                </a>
              </div>
            </div>
          </div>
          {/* The one broken container on the page. A second one would cancel
              it, so nothing else overhangs. The negative margin is measured
              rather than stepped: 50% of the container's content box minus
              50vw is exactly the distance from the rail to the viewport edge
              at every width, so the machine runs off the page at 390 and at
              1920 alike instead of stopping 320px short. The section clips its
              x-overflow, which absorbs the half-scrollbar 50vw over-counts. */}
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <RangeMark className="mt-10 mr-[calc(50%_-_50vw)] text-[var(--telo-butter)] sm:mt-14" />
          </div>
        </section>

        {/* The formats, as a class board rather than an editorial score. On a
            pointer the entry format takes a full row of its own and the other
            four sit a step down beside their descriptions; on a phone the same
            five become a tap grid, because five poster names with wrapping
            copy is the longest stretch on the page at 390px. */}
        <section id="formati" className="scroll-mt-6 bg-[var(--telo-chalk)]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <h2 className="max-w-2xl text-[clamp(2rem,7vw,3.5rem)] font-black leading-[0.96] tracking-[-0.02em] lowercase">
              izaberi format, pa termin
            </h2>
            <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-[var(--telo-muted)]">
              Format se bira u booking sistemu studija, gdje stoje i slobodni termini — ovdje je
              odluka koja im prethodi.
            </p>

            {/* Three columns, and none of them fixed. The name is max-content,
                not a shared 23rem — a column wide enough for the longest name
                stranded "split / duo" and "stretching" across a ~260px gutter
                from their own description. The description takes what is left,
                and the booking word closes the row on the right, so each row
                fills the rule it sits under instead of stopping a quarter of a
                container short of it. */}
            <ul className="mt-10 hidden border-t-2 border-[var(--telo-ink)] sm:mt-14 md:block">
              {formats.map((format) => {
                const entry = format.id === ENTRY_FORMAT;
                return (
                  <li key={format.id} className="border-b-2 border-[var(--telo-ink)]">
                    <a
                      href={studio.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-umami-event="demo_booking"
                      data-umami-event-demo="telo-pilates"
                      data-umami-event-action={`booking-format-${format.id}`}
                      className={`group block py-7 ${focusOnLight} ${
                        entry
                          ? "sm:py-9"
                          : "grid grid-cols-[max-content_minmax(0,1fr)_max-content] items-baseline gap-x-8 lg:gap-x-12"
                      }`}
                    >
                      <h3
                        className={`w-fit font-bold leading-[1] tracking-[-0.02em] lowercase ${
                          entry ? "text-[clamp(2.5rem,6vw,4rem)]" : "text-[clamp(1.9rem,4vw,2.75rem)]"
                        }`}
                      >
                        {format.name}
                        {/* kraftart's drawn mark: the rule under the name is
                            the affordance, on hover and on keyboard focus. */}
                        <span
                          aria-hidden="true"
                          className="mt-2 block h-[3px] origin-left scale-x-0 bg-[var(--telo-ink)] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                        />
                      </h3>
                      {entry ? (
                        <div className="mt-5 max-w-md">
                          <p className="text-[1.15rem] leading-relaxed text-[var(--telo-muted)] sm:text-[1.25rem]">
                            {format.setting}
                          </p>
                          <span className="mt-3 block text-[0.78rem] font-semibold text-[var(--telo-ink)]">
                            {bookingWord}
                          </span>
                        </div>
                      ) : (
                        <>
                          <p className="text-[0.95rem] leading-relaxed text-[var(--telo-muted)]">
                            {format.setting}
                          </p>
                          <span className="whitespace-nowrap text-[0.78rem] font-semibold text-[var(--telo-ink)]">
                            {bookingWord}
                          </span>
                        </>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Phone: the same five formats as a tap grid, drawn once with
                border-l/border-t on the container and border-b/border-r on the
                cells so no line doubles. The entry format takes the full row.
                The open tile inverts to the poster ground — butter on chalk is
                1.01:1 and invisible, and this is the one place where the ink
                slab and the accent reach the light half of the page. The names
                are h3s here as they are on the board, so the phone keeps the
                same document outline as the desktop. */}
            <div className="mt-10 grid grid-cols-2 border-l-2 border-t-2 border-[var(--telo-ink)] md:hidden">
              {formats.map((format) => (
                <details
                  key={format.id}
                  className={`group border-r-2 border-b-2 border-[var(--telo-ink)] open:bg-[var(--telo-ink)] open:text-[var(--telo-butter)] ${
                    format.id === ENTRY_FORMAT ? "col-span-2" : ""
                  }`}
                >
                  <summary className="flex min-h-28 cursor-pointer list-none flex-col justify-between gap-5 p-4 [&::-webkit-details-marker]:hidden">
                    <span
                      aria-hidden="true"
                      className="self-end text-xl leading-none text-[var(--telo-muted)] transition-transform group-open:rotate-45 group-open:text-[var(--telo-muted-ink)] motion-reduce:transition-none"
                    >
                      +
                    </span>
                    <h3 className="text-[1.2rem] font-bold leading-tight tracking-[-0.02em] lowercase">
                      {format.name}
                    </h3>
                  </summary>
                  <div className="border-t border-[var(--telo-butter)]/25 px-4 pt-4 pb-5">
                    <p className="text-[0.9rem] leading-relaxed text-[var(--telo-muted-ink)]">
                      {format.setting}
                    </p>
                    <a
                      href={studio.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-umami-event="demo_booking"
                      data-umami-event-demo="telo-pilates"
                      data-umami-event-action={`booking-format-${format.id}`}
                      className={`mt-3 inline-flex min-h-11 items-center text-[0.8rem] font-semibold underline underline-offset-4 ${focusOnDark}`}
                    >
                      {bookingWord}
                    </a>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* The page's density peak: the apparatus. It is the most concrete,
            most studio-specific thing here, so it gets the band's display
            scale — the studio's own five words doing the job a stat block
            would otherwise be invented for. The claim keeps its attribution
            and the language line stays a sentence. */}
        <section className="bg-[var(--telo-ink)] text-[var(--telo-butter)]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <p className="max-w-xl text-[1.15rem] font-semibold leading-snug sm:text-[1.3rem]">
              {method.claim}
            </p>
            <ul className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-y border-[var(--telo-butter)]/25 py-7 sm:mt-10 sm:gap-x-12 sm:py-9">
              {method.equipment.map((item) => (
                <li
                  key={item}
                  className="text-[clamp(1.5rem,4.5vw,2.25rem)] font-bold leading-none tracking-[-0.02em] lowercase"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 max-w-xl text-[1rem] leading-relaxed text-[var(--telo-muted-ink)] sm:text-[1.05rem]">
              {languages.line}{" "}
              {/* nowrap: the three codes are one object. Left to wrap freely
                  they broke after "eng" at 768px and at 1440px, orphaning
                  "rus" onto a line of its own. */}
              <span className="whitespace-nowrap font-semibold text-[var(--telo-butter)]">
                {languages.codes.join(" · ")}
              </span>
            </p>
          </div>
        </section>

        {/* One chalk beat, not two: what a first class looks like on the left,
            where the studio is and how to ask it something on the right. */}
        <section className="bg-[var(--telo-chalk)]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
              <div>
                <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold leading-[0.98] tracking-[-0.02em] lowercase">
                  kako izgleda prvi čas
                </h2>
                <ul className="mt-7 flex flex-col gap-5 sm:mt-9 sm:gap-6">
                  {firstVisit.map((step) => (
                    <li key={step} className="max-w-lg text-[1.05rem] leading-relaxed sm:text-[1.1rem]">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold leading-[0.98] tracking-[-0.02em] lowercase">
                  {studio.area.toLowerCase()}
                </h2>
                <address className="not-italic">
                  <span className="mt-7 block text-[0.95rem] leading-relaxed text-[var(--telo-muted)] sm:mt-9">
                    Pitanja prije prvog dolaska:
                  </span>
                  <a
                    href={studio.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="demo_contact"
                    data-umami-event-demo="telo-pilates"
                    data-umami-event-action="instagram-lokacija"
                    className={`mt-2 inline-flex min-h-14 items-center gap-3 text-[clamp(1.35rem,4vw,1.9rem)] font-bold tracking-[-0.01em] underline decoration-2 underline-offset-[8px] hover:no-underline ${focusOnLight}`}
                  >
                    <InstagramIcon className="h-[1.35rem] w-[1.35rem] shrink-0" />@{studio.instagram}
                  </a>
                </address>
              </div>
            </div>
          </div>
        </section>

        {/* The handoff: the poster ground one last time, the wordmark line
            at full scale, and the carriage arriving under it. */}
        <section id="rezervacija" className="scroll-mt-6 bg-[var(--telo-ink)] text-[var(--telo-butter)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-16">
              <div>
                <h2 className="text-[clamp(3rem,12vw,7rem)] font-black leading-[0.86] tracking-[-0.03em] lowercase">
                  telo u pokretu.
                </h2>
                <RangeMark className="mt-10 max-w-[38rem] text-[var(--telo-butter)] sm:mt-12" />
              </div>
              <div className="lg:pt-4">
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
            <p className="text-lg font-bold lowercase tracking-[-0.01em]">{studio.wordmark}</p>
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
              Vaky
            </Link>
          </p>
        </div>
      </footer>

      <StickyBookingBar bookingUrl={studio.bookingUrl} />
    </div>
  );
}
