import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Onest } from "next/font/google";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { entrances, portrait, signature, studio, treatments } from "./data";
import styles from "./mila.module.css";

/* Cormorant Garamond at 500/600 rather than 300/400: the light weights turn to
   thread at masthead sizes, and the whole concept rests on a drawn line that
   has to hold. Its real italic — not a slanted roman — is why the accented
   words on the page can be italic at all. Onest carries every word a visitor
   actually has to read. latin-ext for č/ć/š/ž/đ. */
const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-mila-display",
});
const sans = Onest({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-mila-sans",
});

export const metadata: Metadata = {
  title: "Studio ljepote Mila — tretmani, permanent makeup i edukacije, Podgorica | Dizajn koncept",
  description:
    "Dizajn koncept za Studio ljepote Mila u Podgorici: tretmani lica i tijela, epilacija, permanent makeup i edukacije pod jednim potpisom, uz postojeći profesionalni shop.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-studio-ljepote-mila.png"] },
};

const serif = "[font-family:var(--font-mila-display),Georgia,serif]";
/* One label size for the whole page — the small tracked capitals are the
   magazine's furniture: rubric names, running foot, captions. Always its own
   block with margin below, so a heading set right after it can never be read
   as continuing the same line. */
const kicker = "block text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[var(--mila-rose-deep)] sm:text-[0.68rem] sm:tracking-[0.26em]";
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--mila-rose-deep)]";
const focusLight =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--mila-rose-light)]";

/* Permanent makeup is her signature craft, so it gets the one enlarged,
   full-width cell in "Šta se radi" instead of sitting as a seventh identical
   box — the extra line it earns reuses the entrance deck already approved in
   data.ts rather than inventing new copy. */
const PMU_TREATMENT_TITLE = "Permanent makeup";

/* Button geometry for this concept: a thin carbon-ink border, square corners,
   wide letter-spacing, and a rose fill on hover/focus — the one filled moment
   on the page. Every other action is a word with a rose rule under it, so nothing
   else competes with it for attention. */
const primaryCta = `${styles.primaryCta} inline-flex min-h-12 items-center justify-center border border-[var(--mila-ink)] px-9 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--mila-ink)] ${focus}`;
const textCta = `${styles.inkline} inline-flex min-h-12 items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--mila-rose-deep)] ${focus}`;

/* Three doors, not a staircase: each entry gets its own grid position,
   alignment and type size, plus a rose rule that starts at a different width.
   Position in the array still drives the composition, so a reordered list
   reorders the layout — but the device itself is asymmetric placement, not
   indentation. */
const ENTRANCE_LAYOUT = [
  {
    box: "lg:col-span-7",
    align: "text-left",
    size: "text-[clamp(2.1rem,6.4vw,3.6rem)]",
    rule: styles.entranceWide,
  },
  {
    box: "lg:col-span-6 lg:col-start-7 lg:justify-self-end lg:text-right",
    // Below lg the three entries would otherwise stack as one identical
    // left-aligned list; indenting the middle door keeps "three different
    // doors" legible on a phone, not just from lg up.
    align: "ml-10 text-left sm:ml-14 lg:ml-0 lg:text-right",
    size: "text-[clamp(1.7rem,5vw,2.7rem)]",
    rule: styles.entranceMid,
  },
  {
    box: "lg:col-span-6",
    align: "text-left",
    size: "text-[clamp(1.5rem,4.2vw,2.2rem)]",
    rule: styles.entranceNarrow,
  },
];

/* Fallback so a future data.ts edit (an added or removed entrance) fails soft
   — a plain, on-brand layout — rather than crashing on ENTRANCE_LAYOUT[index]
   being undefined. */
const FALLBACK_ENTRANCE_LAYOUT = {
  box: "lg:col-span-6",
  align: "text-left",
  size: "text-[clamp(1.5rem,4.2vw,2.2rem)]",
  rule: styles.entranceNarrow,
};

export default function StudioLjepoteMilaPage() {
  const pmuDeck = entrances.find((entrance) => entrance.id === "pmu")?.deck;

  return (
    <div
      className={`${styles.page} ${display.variable} ${sans.variable} min-h-screen bg-[var(--mila-porcelain)] text-[var(--mila-ink)] [font-family:var(--font-mila-sans),system-ui,sans-serif]`}
    >
      <VibeLabBar />

      {/* A magazine masthead, not a header bar: a thin utility strip of tracked
          capitals, then the studio's name set as large as the measure allows,
          closed off by a single fine stroke — the one place the signature's
          gesture is echoed outside the artist section. */}
      <header>
        <div className="border-b border-[var(--mila-silver)]">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 sm:gap-6 sm:px-8">
            <nav aria-label="Glavna navigacija" className="flex items-center gap-3.5 sm:gap-7">
              {[
                /* Potpis steps out below 420px so the four anchors and the
                   contact link never crowd each other on the narrowest phones —
                   the section is still one tap away from the Permanent makeup
                   entry. */
                ["#tretmani", "Tretmani", ""],
                ["#potpis", "Potpis", "hidden min-[420px]:inline-flex"],
                ["#edukacije", "Edukacije", ""],
                ["#shop", "Shop", ""],
              ].map(([href, text, visibility]) => (
                <a
                  key={href}
                  href={href}
                  className={`text-[0.6rem] font-medium uppercase tracking-[0.14em] sm:text-[0.68rem] sm:tracking-[0.26em] ${styles.inkline} ${visibility || "inline-flex"} min-h-11 items-center text-[var(--mila-muted)] transition-colors hover:text-[var(--mila-ink)] ${focus}`}
                >
                  {text}
                </a>
              ))}
            </nav>
            <a
              href={studio.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="demo_contact"
              data-umami-event-demo="studio-ljepote-mila"
              data-umami-event-action="instagram-header"
              className={`text-[0.6rem] font-medium uppercase tracking-[0.14em] sm:text-[0.68rem] sm:tracking-[0.26em] ${styles.inkline} inline-flex min-h-11 shrink-0 items-center gap-1.5 text-[var(--mila-rose-deep)] ${focus}`}
            >
              Piši studiju <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-5 pt-7 sm:px-8 sm:pb-7 sm:pt-10">
          <p
            className={`${serif} text-balance text-[clamp(2.4rem,10vw,8.4rem)] font-medium leading-[0.9] tracking-[-0.02em]`}
          >
            Studio ljepote <em className="text-[var(--mila-rose-deep)]">Mila</em>
          </p>
          {/* The fine drawn stroke: a single hand-drawn-feeling gesture, not a
              plain hairline. pathLength="1" keeps the dash math independent of
              the actual curve. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 300 14"
            preserveAspectRatio="none"
            className="mt-5 h-3.5 w-full max-w-xs sm:max-w-sm"
          >
            <path
              d="M1 10.5C40 3, 90 2, 140 7.5S 230 13, 299 4"
              fill="none"
              stroke="var(--mila-rose-deep)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              className={styles.strokeMotif}
            />
          </svg>
        </div>
      </header>

      <main id="vrh">
        {/* The cover. Text sits on the left rail; the portrait sits inside a
            rose mat that, from lg up, opens into a full bleed panel behind it —
            the studio's colour is present in the composition from the very
            first screen, not saved for a caption. */}
        <section>
          <div className="relative mx-auto grid max-w-6xl gap-y-8 px-5 pt-6 sm:px-8 sm:pt-9 lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:pt-12">
            {/* The bleed panel: a sibling of both grid columns, positioned
                against the true centered container so its right edge reaches
                the viewport edge regardless of how wide that container is. */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-[46%] right-[calc(50%-50vw)] hidden bg-[var(--mila-rose-field)] lg:block"
            />

            <div className="relative lg:col-span-6">
              <p className={kicker}>
                {studio.artist} — {studio.role}
              </p>
              <h1
                className={`${serif} text-balance mt-4 text-[clamp(2.1rem,6.6vw,4rem)] font-medium leading-[1.04] tracking-[-0.02em] sm:mt-6`}
              >
                Preciznost koja ostaje <em>prirodna</em>.
              </h1>
              <p className="mt-5 max-w-[32rem] text-pretty text-base leading-relaxed text-[var(--mila-muted)] sm:mt-6 sm:text-lg">
                Tretmani, permanent makeup i edukacije pod jednim potpisom.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 sm:mt-9">
                <a href="#tretmani" className={primaryCta}>
                  Pogledaj tretmane
                </a>
                <a
                  href={studio.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_contact"
                  data-umami-event-demo="studio-ljepote-mila"
                  data-umami-event-action="instagram-hero"
                  className={textCta}
                >
                  Piši studiju <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* The rose mat: padding + background on every size, so the colour
                is there on a phone. From lg, the bleed panel above takes over
                and the mat's own padding drops away so the photograph reads
                larger. */}
            <div className="relative mt-9 lg:col-span-6 lg:mt-0 lg:pt-10">
              <div className="relative bg-[var(--mila-rose-field)] p-3 sm:p-4 lg:bg-transparent lg:p-0">
                <DemoPhoto
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  priority
                  sizes="(min-width: 1024px) 44vw, 88vw"
                  className="h-[29rem] w-full object-cover object-[50%_14%] min-[430px]:h-[32rem] md:h-[34rem] md:object-[50%_5%] lg:h-[38rem]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Three doors into the same studio, composed as an asymmetric cluster
            rather than a list: different columns, different alignment,
            different type size, each with its own rose rule already partly
            drawn. */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className={kicker}>Gdje početi</p>
          <h2
            className={`${serif} text-balance mt-4 max-w-2xl text-[clamp(1.8rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-[-0.015em]`}
          >
            Počnite od onoga što vam sada treba.
          </h2>

          <ul className="mt-12 grid gap-y-10 sm:mt-16 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-14">
            {entrances.map((entrance, index) => {
              const layout = ENTRANCE_LAYOUT[index] ?? FALLBACK_ENTRANCE_LAYOUT;
              return (
                <li key={entrance.id} className={layout.box}>
                  <a
                    href={entrance.href}
                    className={`${styles.entranceLink} block ${layout.align} ${focus}`}
                  >
                    <h3
                      className={`${serif} ${layout.size} font-medium leading-[1.05] tracking-[-0.02em]`}
                    >
                      <span className={`${styles.entrance} ${layout.rule}`}>{entrance.title}</span>
                    </h3>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--mila-muted)]">
                      {entrance.deck}
                    </p>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        {/* The artist section is the signature itself, printed large. No
            second photograph: the studio published one portrait, and printing
            it twice would be the tell that this is a template. */}
        <section
          id="potpis"
          className="scroll-mt-6 border-y border-[var(--mila-silver)] bg-[var(--mila-porcelain-deep)]"
        >
          <div className="mx-auto grid max-w-6xl gap-y-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-6">
              <h2
                className={`${serif} text-balance max-w-lg text-[clamp(1.8rem,3.8vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.015em]`}
              >
                Jedan <em className="text-[var(--mila-rose-deep)]">potpis</em> nad tretmanima,
                edukacijama i shopom.
              </h2>
              <p className="mt-8 max-w-md text-pretty leading-relaxed text-[var(--mila-muted)]">
                {studio.artist} je {studio.role}. Isti rukopis stoji iza tretmana u studiju, iza
                obuka i iza izbora preparata u shopu.
              </p>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-[var(--mila-muted)]">
                Permanent makeup je rad milimetrom: pigment se polaže u tankim potezima, tako da crta
                prati oblik lica umjesto da ga nadglasa. Ništa se ne radi na brzinu i ništa se ne
                obećava unaprijed.
              </p>
            </div>

            <figure className="lg:col-span-5 lg:col-start-8 lg:self-end">
              <p className={kicker}>Potpis</p>
              {/* A plain <img>, not DemoPhoto: the signature is a 609px
                  transparent PNG that is never rendered wider than its source,
                  so AVIF/WebP variants would add files without saving a byte,
                  and the alpha channel is the whole point — it is why the
                  strokes can sit straight on porcelain with no plate behind
                  them. The export runs with images.unoptimized, so next/image
                  would ship the identical file through more machinery. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={signature.src}
                alt={signature.alt}
                width={signature.width}
                height={signature.height}
                loading="lazy"
                decoding="async"
                className={`${styles.signature} mt-6 block h-auto w-full max-w-[30rem]`}
              />
              <figcaption className="mt-6 border-t border-[var(--mila-rose-soft)] pt-4 text-sm text-[var(--mila-muted)]">
                {studio.artist} — {studio.role}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* The index: six categories, grouped two-by-two, each opened by a
            small rose marker instead of a hairline row. */}
        <section id="tretmani" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
              <div className="lg:col-span-6">
                <p className={kicker}>Šta se radi</p>
                <h2
                  className={`${serif} text-balance mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-medium leading-[1.08] tracking-[-0.015em]`}
                >
                  Šta se radi u studiju.
                </h2>
              </div>
              <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-[var(--mila-muted)] lg:col-span-5 lg:col-start-8 lg:mt-1 lg:self-end">
                Šest kategorija rada. Plan i termin dogovaraju se porukom, prije nego što se bilo šta
                počne.
              </p>
            </div>

            <dl className="mt-12 grid gap-x-10 gap-y-10 sm:mt-16 sm:grid-cols-2 sm:gap-y-12">
              {treatments.map((treatment, index) => {
                const isSignature = treatment.title === PMU_TREATMENT_TITLE;
                return (
                  <div key={treatment.title} className={isSignature ? "sm:col-span-2" : undefined}>
                    <span
                      aria-hidden="true"
                      className={`block bg-[var(--mila-rose-deep)] ${isSignature ? "h-[3px] w-14" : "h-[3px] w-8"}`}
                    />
                    <dt
                      className={`${serif} mt-4 font-medium leading-tight tracking-[-0.01em] ${
                        isSignature
                          ? "text-[clamp(2rem,4.6vw,3.2rem)]"
                          : index % 2 === 0
                            ? "text-[clamp(1.4rem,2.6vw,1.9rem)]"
                            : "text-[clamp(1.2rem,2.2vw,1.6rem)]"
                      }`}
                    >
                      {treatment.title}
                    </dt>
                    <dd
                      className={`mt-2 text-pretty text-sm leading-relaxed text-[var(--mila-muted)] ${isSignature ? "max-w-xl sm:text-base" : "max-w-sm"}`}
                    >
                      {treatment.line}
                      {isSignature && pmuDeck ? ` ${pmuDeck}` : null}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </section>

        {/* Edukacije gets a rose ground instead of a dark band — a change of
            light, not a change of contrast. It is the only section that stays
            entirely within the studio's own colour. */}
        <section id="edukacije" className="scroll-mt-6 bg-[var(--mila-rose-field)]">
          <div className="mx-auto grid max-w-6xl gap-y-8 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:items-end lg:gap-x-10">
            <div className="lg:col-span-7">
              <p className={kicker}>Edukacije</p>
              <h2
                className={`${serif} text-balance mt-4 text-[clamp(1.9rem,4.6vw,3.2rem)] font-medium leading-[1.06] tracking-[-0.015em]`}
              >
                Edukacije pod <em>istim</em> potpisom.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="max-w-sm text-pretty leading-relaxed text-[var(--mila-ink)]">
                Ista preciznost koja stoji iza tretmana stoji i iza obuka. Program, trajanje i
                termine dogovaramo porukom — odgovor stiže direktno iz studija.
              </p>
              <a
                href={studio.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="studio-ljepote-mila"
                data-umami-event-action="instagram-edukacije"
                className={`${textCta} mt-5`}
              >
                Piši studiju <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* The shop already exists and works. This is a doorway to it, kept
            deliberately slim and framed in hairlines rather than a second
            wash of colour, so it never reads as a rose band stacked under the
            rose band above it. */}
        <section
          id="shop"
          className="scroll-mt-6 border-y border-[var(--mila-silver)] bg-[var(--mila-porcelain)]"
        >
          <div className="mx-auto grid max-w-6xl gap-y-5 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-12 lg:items-baseline lg:gap-x-10">
            <div className="lg:col-span-4">
              <p className={kicker}>Shop</p>
              <h2
                className={`${serif} text-balance mt-3 max-w-xs text-[clamp(1.4rem,2.6vw,1.9rem)] font-medium leading-[1.1] tracking-[-0.01em]`}
              >
                Profesionalni shop već postoji.
              </h2>
            </div>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-[var(--mila-muted)] lg:col-span-5 lg:col-start-6 lg:text-base">
              Preparati i pribor koje studio koristi naručuju se preko zvanične onlajn prodavnice.
              Ovaj koncept je samo ulaz — shop ostaje tamo gdje jeste.
            </p>
            <div className="lg:col-span-2 lg:col-start-11 lg:justify-self-end">
              <a
                href={studio.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_outbound"
                data-umami-event-demo="studio-ljepote-mila"
                data-umami-event-action="shop-bridge"
                className={textCta}
              >
                Posjeti shop <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* The one dark spread on the page — closing rather than in the
            middle, so it lands as the last word instead of a second loud
            moment competing with the entrances above. */}
        <section
          id="kontakt"
          className="scroll-mt-6 bg-[var(--mila-carbon)] text-[var(--mila-on-carbon)]"
        >
          <div className="mx-auto grid max-w-6xl gap-y-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:items-end lg:gap-x-10">
            <div className="lg:col-span-6">
              <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[var(--mila-rose-light)] sm:text-[0.68rem] sm:tracking-[0.26em]">
                Dolazak
              </p>
              <h2
                className={`${serif} text-balance mt-5 text-[clamp(2rem,5.2vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.02em]`}
              >
                {studio.area}
              </h2>
              <p className="mt-6 max-w-md text-pretty leading-relaxed text-[var(--mila-on-carbon-muted)]">
                Tačna adresa i termin dogovaraju se u poruci — najbolje je pisati prije dolaska.
              </p>
            </div>

            {/* One contact route, written out large enough to be the last
                thing anyone reads. Its rule is permanent rather than on
                hover: nobody hovers the final call to action before
                deciding. */}
            <address className="not-italic lg:col-span-5 lg:col-start-8">
              <a
                href={studio.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="studio-ljepote-mila"
                data-umami-event-action="instagram-kontakt"
                className={`inline-flex min-h-12 flex-col justify-center gap-2 transition-colors hover:text-[var(--mila-rose-light)] ${focusLight}`}
              >
                <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[var(--mila-rose-light)] sm:text-[0.68rem] sm:tracking-[0.26em]">
                  Piši studiju
                </span>
                <span
                  className={`${serif} ${styles.drawn} text-[clamp(1.4rem,3.2vw,2.1rem)] leading-tight tracking-[-0.01em]`}
                >
                  @{studio.instagram} <span aria-hidden="true">↗</span>
                </span>
              </a>
            </address>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--mila-silver)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className={`${serif} text-2xl font-medium tracking-[-0.015em]`}>{studio.name}</p>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-[var(--mila-muted)]">
              Nezvanični dizajn koncept. Portret i potpis preuzeti su sa zvaničnog sajta studija, a
              ostali podaci sa javnih profila — sve služi samo za prikaz ideje.
            </p>
          </div>
          <p className="text-xs text-[var(--mila-muted)]">
            Koncept:{" "}
            <Link
              href="/"
              className={`inline-flex min-h-11 items-center font-medium text-[var(--mila-ink)] hover:underline ${focus}`}
            >
              VibeLab
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
