import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Onest } from "next/font/google";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { portrait, runningFoot, signature, studio, treatments } from "./data";
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
/* One caps register for the whole page — the small tracked capitals are the
   magazine's furniture: the running foot, the cover's foot line, the two
   rubrics and the contact label. Always its own block with margin below, so a
   heading set right after it can never be read as continuing the same line.
   Only two sections carry a rubric at all — Potpis and Dolazak — because those
   are the only two that say a word their heading does not. */
const caps =
  "block text-[0.65rem] font-medium uppercase tracking-[0.2em] sm:text-[0.68rem] sm:tracking-[0.26em]";
const kicker = `${caps} text-[var(--mila-rose-deep)]`;
const kickerOnCarbon = `${caps} text-[var(--mila-rose-light)]`;
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--mila-rose-deep)]";
const focusLight =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--mila-rose-light)]";

/* Button geometry for this concept: a thin carbon-ink border, square corners,
   wide letter-spacing, and a rose fill on hover/focus — the one filled moment
   on the page, and it is spent on the only thing a visitor can actually do
   here, which is write to the studio. Every other action is a word with a rose
   rule under it, so nothing else competes with it. */
const primaryCta = `${styles.primaryCta} inline-flex min-h-12 items-center justify-center gap-2 border border-[var(--mila-ink)] px-9 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--mila-ink)] ${focus}`;
const textCta = `${styles.inkline} inline-flex min-h-12 items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--mila-rose-deep)] ${focus}`;

/* The index is hand-set, not derived from array position: every treatment gets
   its span, its type size and its measure written down here. Permanent makeup
   is her signature craft, so it takes the one full-width cell and the one
   enlarged size; the other five are set at a single size, because nothing
   about this studio says epilacija outranks a face treatment. The spans are
   chosen so no row ever trails off with an empty cell — three across, then the
   full-width signature row, then a pair.

   Typed as a Record over the literal titles, so adding a category to data.ts is
   a compile error until it gets a real layout decision. */
const TREATMENT_LAYOUT: Record<
  (typeof treatments)[number]["title"],
  { cell: string; size: string; mark: string; deck: string }
> = {
  "Epilacija / laser": {
    cell: "lg:col-span-4",
    size: "text-[clamp(1.35rem,2.2vw,1.7rem)]",
    mark: "w-8",
    deck: "text-sm",
  },
  "Tretmani lica i tijela": {
    cell: "lg:col-span-4",
    size: "text-[clamp(1.35rem,2.2vw,1.7rem)]",
    mark: "w-8",
    deck: "text-sm",
  },
  "Lash & brow lift": {
    // Full width at sm so the tablet's two-column row is not left half empty
    // by the full-width cell that follows it — and the deck carries no measure
    // cap, because a capped one only moved the empty half onto this row.
    // Across the tablet's full column the line sets once and spans the row.
    cell: "sm:col-span-2 lg:col-span-4",
    size: "text-[clamp(1.35rem,2.2vw,1.7rem)]",
    mark: "w-8",
    deck: "text-sm",
  },
  "Permanent makeup": {
    // The featured cell: a row of its own, with the deck set out to the right
    // rail and dropped to the title's foot so the full width is spoken for.
    cell: "sm:col-span-2 lg:col-span-12 lg:grid lg:grid-cols-12 lg:gap-x-10",
    size: "text-[clamp(2rem,4.6vw,3.2rem)] lg:col-span-6",
    mark: "w-14 lg:col-span-12",
    deck: "max-w-2xl text-base lg:col-span-5 lg:col-start-8 lg:mt-0 lg:max-w-none lg:self-end",
  },
  Edukacije: {
    cell: "lg:col-span-6",
    size: "text-[clamp(1.35rem,2.2vw,1.7rem)]",
    mark: "w-8",
    deck: "max-w-md text-sm",
  },
  "Profesionalni shop": {
    cell: "lg:col-span-6",
    size: "text-[clamp(1.35rem,2.2vw,1.7rem)]",
    mark: "w-8",
    deck: "max-w-md text-sm",
  },
};

export default function StudioLjepoteMilaPage() {
  return (
    <div
      className={`${styles.page} ${display.variable} ${sans.variable} min-h-screen bg-[var(--mila-porcelain)] text-[var(--mila-ink)] [font-family:var(--font-mila-sans),system-ui,sans-serif]`}
    >
      <a
        href="#vrh"
        className={`${focus} sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:border focus:border-[var(--mila-ink)] focus:bg-[var(--mila-porcelain)] focus:px-5 focus:text-[0.68rem] focus:font-semibold focus:uppercase focus:tracking-[0.2em] focus:text-[var(--mila-ink)]`}
      >
        Preskoči na sadržaj
      </a>

      <VibeLabBar />

      {/* A magazine masthead, not a header bar: a thin utility strip of tracked
          capitals, then the studio's name set as large as the measure allows,
          closed off by a single fine stroke that runs the full measure and
          carries the running foot beneath it. */}
      <header>
        <div className="border-b border-[var(--mila-silver)]">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 sm:gap-6 sm:px-8">
            <nav aria-label="Glavna navigacija" className="flex flex-wrap items-center gap-3 sm:gap-7">
              {[
                ["#potpis", "Potpis"],
                ["#tretmani", "Tretmani"],
                ["#edukacije", "Edukacije"],
                ["#kontakt", "Dolazak"],
              ].map(([href, text]) => (
                <a
                  key={href}
                  href={href}
                  className={`${styles.inkline} inline-flex min-h-11 items-center text-[0.68rem] font-medium uppercase tracking-[0.08em] text-[var(--mila-muted)] transition-colors hover:text-[var(--mila-ink)] sm:tracking-[0.26em] ${focus}`}
                >
                  {text}
                </a>
              ))}
            </nav>
            {/* Four tracked-caps anchors plus this link do not fit legibly on a
                390px strip, and legibility wins: on a phone the action is the
                filled button one screen below, which is now the page's primary. */}
            <a
              href={studio.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="demo_contact"
              data-umami-event-demo="studio-ljepote-mila"
              data-umami-event-action="instagram-header"
              className={`${styles.inkline} hidden min-h-11 shrink-0 items-center gap-1.5 text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[var(--mila-rose-deep)] sm:inline-flex ${focus}`}
            >
              Piši studiju <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-5 pt-7 sm:px-8 sm:pb-7 sm:pt-10">
          <p
            className={`${serif} text-balance text-[clamp(2.9rem,11vw,8.4rem)] font-medium leading-[0.9] tracking-[-0.02em]`}
          >
            Studio ljepote <em className="text-[var(--mila-rose-deep)]">Mila</em>
          </p>
          {/* The fine drawn stroke, run to the full measure of the name so it
              reads as the rule the masthead sits on rather than a squiggle that
              stops somewhere. pathLength="1" keeps the dash math independent of
              the actual curve — which is also why the stroke must scale with
              the box: `vector-effect: non-scaling-stroke` measures the dash
              against the *rendered* path, and under this viewBox's ~3.6x
              horizontal stretch that turns one continuous line into two. The
              curve is near-horizontal and the box is scaled only in x, so a
              scaling stroke still renders at its 2px thickness. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 300 14"
            preserveAspectRatio="none"
            className="mt-5 h-3.5 w-full"
          >
            <path
              d="M1 10.5C40 3, 90 2, 140 7.5S 230 13, 299 4"
              fill="none"
              stroke="var(--mila-rose-deep)"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={1}
              className={styles.strokeMotif}
            />
          </svg>
          {/* The running foot: what the studio does, in its own order, bounded
              by the drawn stroke above and a hairline below. It tells a visitor
              the whole scope of the work inside the first screen, without
              costing a section. */}
          <ul className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-[var(--mila-silver)] pb-3 lg:flex-nowrap lg:justify-between">
            {runningFoot.map((category) => (
              <li
                key={category}
                className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[var(--mila-muted)] sm:text-[0.68rem] sm:tracking-[0.24em]"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <main id="vrh" tabIndex={-1}>
        {/* The cover. Text sits on the left rail; the portrait is matted on a
            rose panel that bleeds off the right edge of the viewport — and the
            print hangs 4rem proud of the panel's bottom, which is the one place
            on the page where anything breaks its container.

            `overflow-x: clip` is load-bearing, not decoration: the mat bleeds
            with `right: calc(50% - 50vw)`, where the 50vw measures the viewport
            *including* a classic scrollbar while the 50% measures the container
            centred inside it. On any browser with space-consuming scrollbars
            the panel therefore overhangs the document by half a scrollbar and
            puts a horizontal scrollbar on the page. `clip` rather than `hidden`
            because it creates no scroll container and leaves the vertical axis
            visible — nothing in here is sticky, and the print's overhang is
            vertical, so it survives. */}
        <section className="overflow-x-clip">
          <div className="relative mx-auto grid max-w-6xl gap-y-8 px-5 pt-6 sm:px-8 sm:pt-9 lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:pb-16 lg:pt-12">
            {/* The mat: a sibling of both columns so its right edge can reach
                the viewport edge whatever the container width. Its left edge is
                `50% + half a gap - 4rem`, i.e. exactly 4rem outside where the
                photo column starts on a 12-column grid — the same 4rem the
                photo is inset from the panel's top, and the same 4rem it hangs
                below the panel's bottom. One measurement, used three times. */}
            <div
              aria-hidden="true"
              className="absolute left-[calc(50%-3rem)] right-[calc(50%-50vw)] top-12 hidden h-[38rem] bg-[var(--mila-rose-field)] lg:block"
            />

            <div className="relative lg:col-span-6">
              <p className={kicker}>
                {studio.artist} — {studio.role}
              </p>
              <h1
                className={`${serif} text-balance mt-4 text-[clamp(1.7rem,6.6vw,4rem)] font-medium leading-[1.04] tracking-[-0.02em] sm:mt-6`}
              >
                Preciznost koja ostaje <em>prirodna</em>.
              </h1>
              <p className="mt-5 max-w-[32rem] text-pretty text-base leading-relaxed text-[var(--mila-muted)] sm:mt-6 sm:text-lg">
                Tretmani, permanent makeup i edukacije pod jednim potpisom.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 sm:mt-9">
                <a
                  href={studio.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_contact"
                  data-umami-event-demo="studio-ljepote-mila"
                  data-umami-event-action="instagram-hero"
                  className={primaryCta}
                >
                  {/* Names the question this route answers rather than
                      repeating the header's generic contact label: the page's
                      four contact controls now read termin / edukacije /
                      Instagram / the header shortcut, so no two of them ask a
                      visitor to guess which one they want. */}
                  Piši za termin <span aria-hidden="true">↗</span>
                </a>
                <a href="#tretmani" className={textCta}>
                  Pogledaj tretmane
                </a>
              </div>

              {/* The one line the cover still owes a visitor — where this is —
                  set as a short captioned rule a measured distance under the
                  buttons. It is deliberately NOT pushed to the foot of a rail
                  stretched to the photograph: that pinned the rule to the
                  print's bottom crop but drew a hairline across the bottom of
                  ~290px of empty porcelain, which framed the gap instead of
                  closing it. Top-aligned, the rail simply ends and the print
                  hangs past it. Below lg the columns stack and the closing band
                  carries the same line, so it does not print twice. */}
              <p className="mt-14 hidden max-w-[22rem] border-t border-[var(--mila-rose-soft)] pt-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[var(--mila-muted)] sm:tracking-[0.26em] lg:block">
                {studio.area}
              </p>
            </div>

            {/* Below lg the mat is padding around the photograph, so the colour
                is there on a phone. From lg the bleed panel takes over, the
                padding drops away and the photograph is mounted on it. */}
            <div className="relative mt-9 lg:col-span-6 lg:mt-0 lg:pt-16">
              <div className="relative bg-[var(--mila-rose-field)] p-3 sm:p-4 lg:bg-transparent lg:p-0">
                {/* The source frame is a symmetrical studio headshot with wide
                    flat grey on both sides. Scaling inside a clipped box brings
                    the crop in on the face and the shoulder line and cuts most
                    of that backdrop; the origin sits high so the hair and the
                    flower keep their headroom. `sizes` is quoted above the
                    box's own 44vw/88vw because the crop scales the frame 1.16x
                    inside it. */}
                <div className="relative overflow-hidden">
                  <DemoPhoto
                    src={portrait.src}
                    alt={portrait.alt}
                    width={portrait.width}
                    height={portrait.height}
                    priority
                    sizes="(min-width: 1024px) 52vw, 96vw"
                    className="block h-[29rem] w-full origin-[50%_12%] scale-[1.16] object-cover object-[50%_16%] min-[430px]:h-[32rem] md:h-[34rem] md:object-[50%_10%] lg:h-[38rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The page's density peak: the most vertical measure, and the largest
            single element on it. No second photograph — the studio published one
            portrait, and the thing worth printing big is her own hand. */}
        <section
          id="potpis"
          className="scroll-mt-6 border-y border-[var(--mila-silver)] bg-[var(--mila-porcelain-deep)]"
        >
          <div className="mx-auto grid max-w-6xl gap-y-14 px-5 py-20 sm:px-8 sm:py-32 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-5">
              <h2
                className={`${serif} text-balance text-[clamp(1.8rem,3.8vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.015em]`}
              >
                Jedan <em className="text-[var(--mila-rose-deep)]">potpis</em> nad tretmanima,
                edukacijama i shopom.
              </h2>
              <p className="mt-8 max-w-md text-pretty leading-relaxed text-[var(--mila-muted)]">
                {studio.artist} je {studio.role}. Isti rukopis stoji iza tretmana u studiju, iza
                obuka i iza izbora preparata u shopu.
              </p>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-[var(--mila-muted)]">
                Permanent makeup je rad milimetrom, pa se o tome šta je moguće razgovara prije nego
                što se počne. Ništa se ne radi na brzinu i ništa se ne obećava unaprijed.
              </p>
            </div>

            <figure className="lg:col-span-7 lg:col-start-6 lg:self-end">
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
                className={`${styles.signature} mt-6 block h-auto w-full max-w-[38rem]`}
              />
              <figcaption className="mt-6 border-t border-[var(--mila-rose-soft)] pt-4 text-sm text-[var(--mila-muted)]">
                {studio.artist} — {studio.role}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* The index: six categories, hand-set through TREATMENT_LAYOUT so the
            grid never resolves into six matching boxes. */}
        <section id="tretmani" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
              <h2
                className={`${serif} text-balance text-[clamp(1.8rem,4vw,2.8rem)] font-medium leading-[1.08] tracking-[-0.015em] lg:col-span-6`}
              >
                Šta se radi u studiju.
              </h2>
              <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-[var(--mila-muted)] lg:col-span-5 lg:col-start-8 lg:mt-1 lg:self-end">
                Šest kategorija rada. Plan i termin dogovaraju se porukom, prije nego što se bilo šta
                počne.
              </p>
            </div>

            <dl className="mt-12 grid gap-x-10 gap-y-10 sm:mt-16 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-12">
              {treatments.map((treatment) => {
                const layout = TREATMENT_LAYOUT[treatment.title];
                return (
                  <div key={treatment.title} className={layout.cell}>
                    <span
                      aria-hidden="true"
                      className={`block h-[3px] bg-[var(--mila-rose-deep)] ${layout.mark}`}
                    />
                    <dt
                      className={`${serif} mt-4 font-medium leading-tight tracking-[-0.01em] ${layout.size}`}
                    >
                      {treatment.title}
                    </dt>
                    <dd
                      className={`mt-2 text-pretty leading-relaxed text-[var(--mila-muted)] ${layout.deck}`}
                    >
                      {treatment.line}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </section>

        {/* Edukacije gets a rose ground instead of a dark band — a change of
            light, not a change of contrast. Kept deliberately short: the studio
            publishes no program, no duration and no group size, so the honest
            version of this section is a compact band that says so, not a tall
            one padded with rhetoric. */}
        <section id="edukacije" className="scroll-mt-6 bg-[var(--mila-rose-field)]">
          <div className="mx-auto grid max-w-6xl gap-y-6 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-12 lg:items-start lg:gap-x-10">
            <h2
              className={`${serif} text-balance text-[clamp(1.7rem,3.6vw,2.6rem)] font-medium leading-[1.06] tracking-[-0.015em] lg:col-span-6`}
            >
              Edukacije pod <em>istim</em> potpisom.
            </h2>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="max-w-sm text-pretty leading-relaxed text-[var(--mila-ink)]">
                Obuke drži ista osoba koja radi tretmane. Program, trajanje i broj polaznika nisu
                javno objavljeni — na njih odgovara sam studio.
              </p>
              <a
                href={studio.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="studio-ljepote-mila"
                data-umami-event-action="instagram-edukacije"
                className={`${textCta} mt-4`}
              >
                {/* Named for its own destination rather than a fourth copy of
                    the page's generic contact label: the two words tell a
                    visitor which question this route answers. */}
                Piši za edukacije <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* The shop already exists and works. This is a doorway to it, kept
            deliberately slim and framed in hairlines rather than a second
            wash of colour, so it never reads as a rose band stacked under the
            rose band above it.

            It is also the one band that does not run the page's serif-h2 on the
            left / muted deck in the right rail grammar. Edukacije, this bridge
            and the closing band sat in a row on that same skeleton, and this is
            the one with the least to say — so it changes shape instead: a
            single sentence set across the measure, with the route under it. Its
            heading is gone with it, because "Profesionalni shop već postoji."
            was the index entry two sections above printed a second time. */}
        <section className="border-y border-[var(--mila-silver)] bg-[var(--mila-porcelain)]">
          <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
            <p
              className={`${serif} max-w-4xl text-pretty text-[clamp(1.35rem,3vw,2.1rem)] font-medium leading-[1.2] tracking-[-0.01em]`}
            >
              Porudžbine i dalje idu preko zvanične onlajn prodavnice studija — ovaj koncept je samo{" "}
              <em className="text-[var(--mila-rose-deep)]">ulaz</em>, shop ostaje tamo gdje jeste.
            </p>
            <a
              href={studio.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="demo_outbound"
              data-umami-event-demo="studio-ljepote-mila"
              data-umami-event-action="shop-bridge"
              className={`${textCta} mt-5`}
            >
              Posjeti shop <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        {/* The one dark spread, and the last word. The handle is the largest
            thing on it, because it is the only thing on this screen anyone can
            act on; the neighbourhood is a labelled line, not a headline. */}
        <section
          id="kontakt"
          className="scroll-mt-6 bg-[var(--mila-carbon)] text-[var(--mila-on-carbon)]"
        >
          <div className="mx-auto grid max-w-6xl gap-y-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:items-start lg:gap-x-10">
            <div className="lg:col-span-4">
              <p className={kickerOnCarbon}>Dolazak</p>
              <h2
                className={`${serif} text-balance mt-4 text-[clamp(1.5rem,2.4vw,1.9rem)] font-medium leading-[1.15] tracking-[-0.01em]`}
              >
                {studio.area}
              </h2>
              <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-[var(--mila-on-carbon-muted)]">
                Tačna adresa i termin dogovaraju se u poruci — najbolje je pisati prije dolaska.
              </p>
            </div>

            {/* One contact route, set at display scale. Its rule is permanent
                rather than on hover: nobody hovers the final call to action
                before deciding. */}
            <address className="not-italic lg:col-span-7 lg:col-start-6">
              <a
                href={studio.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="studio-ljepote-mila"
                data-umami-event-action="instagram-kontakt"
                className={`inline-flex min-h-12 flex-col justify-center gap-3 transition-colors hover:text-[var(--mila-rose-light)] ${focusLight}`}
              >
                {/* The label names where the tap lands, not a fourth "Piši
                    studiju" — the handle under it is the destination, set at
                    display scale. */}
                <span className={kickerOnCarbon}>Poruka na Instagramu</span>
                <span
                  className={`${serif} ${styles.drawn} text-[clamp(1.8rem,5vw,3.2rem)] font-medium leading-tight tracking-[-0.01em]`}
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
