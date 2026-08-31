import type { Metadata } from "next";
import Link from "next/link";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { InstagramIcon } from "@/components/demo/ContactIcons";
import { MapEmbed } from "@/components/demo/MapEmbed";
import { VakyBar } from "@/components/demo/VakyBar";
import { clinic, doorPhoto, fields, roomPhoto, steps, team } from "./data";
import styles from "./dental.module.css";

/* One superfamily, both halves of it. Source Serif 4 sets every heading and
   the photo captions; its italic is the page's only change of voice, so it is
   loaded on purpose rather than synthesised. Source Sans 3 carries the
   running text. latin-ext for č/ć/š/ž/đ. */
const serifFont = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-dent-serif",
});
const sansFont = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-dent-sans",
});

export const metadata: Metadata = {
  title: "Dental Clinic Kovačević — stomatološka ordinacija, Igalo i Zelenika | Dizajn koncept",
  description:
    "Dizajn koncept za porodičnu stomatološku ordinaciju Kovačević: oblasti rada, prvi korak do termina, tim i ordinacije u Igalu i Zelenici.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-dental-clinic-kovacevic.png"] },
};

const serif = "[font-family:var(--font-dent-serif),Georgia,serif]";
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--dent-teal)]";
const focusOnNavy =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--dent-teal-bright)]";
const button =
  "inline-flex min-h-12 items-center justify-center rounded-[6px] px-7 text-[0.95rem] font-medium transition-colors";
const primaryCta = `${button} bg-[var(--dent-navy)] text-[var(--dent-porcelain)] hover:bg-[var(--dent-teal)] ${focus}`;
const secondaryCta = `${button} border border-[var(--dent-navy)]/25 text-[var(--dent-navy)] hover:border-[var(--dent-navy)] hover:bg-[var(--dent-porcelain)] ${focus}`;
/* inline-block with vertical padding, not inline-flex with a gap: a flex row
   draws the underline under each item separately, so the rule broke either side
   of the arrow while the map link beside it drew one continuous line. The
   padding carries the 44px tap target instead of min-h. */
const inlineLink = `inline-block py-3 text-[var(--dent-teal)] underline decoration-1 underline-offset-[6px] transition-colors hover:text-[var(--dent-navy)] ${focus}`;

/* Shared frame for both photographs on the page: 6px softness, a thin warm
   keyline instead of a shadow, and a sand ground underneath so the box never
   flashes empty white while the file loads. */
const photoFrame =
  "relative overflow-hidden rounded-[6px] border border-[var(--dent-line)] bg-[var(--dent-sand)]";

const sectionHeading = `${serif} text-[clamp(1.7rem,4vw,2.4rem)] leading-[1.1] tracking-[-0.01em]`;

/**
 * The clinic's own mark, traced by hand from the glass of its front door — one
 * open stroke that draws a molar crown and keeps going as the thread of an
 * implant root. Provenance is recorded as `doorMark` in data.ts; it is not our
 * shape.
 *
 * Traced against the source rather than approximated, because at 256px the
 * differences are the whole picture: the crown is asymmetric with a shallow
 * saddle between two unequal humps (not a heart's deep notch), its one open
 * terminal tapers off on the LEFT, and the root below is three flattened
 * elliptical coils shrinking downwards (not a zigzag), the last of them
 * running out to the lower left.
 *
 * It is the only drawn thing on the page and it appears in exactly two places:
 * three times as a small mark on the "Prva posjeta" thread, and once printed
 * large and faint on the closing field. Nowhere else — a mark used everywhere
 * stops being a signature.
 */
function ToothGlyph({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 28 36"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M5.8 14.6C3.5 11.5 1.3 8.7 1.9 5.9C2.7 2.3 6.5 0.8 9.5 2.5C12.5 4.2 14.8 6.1 17.4 6.2C19.6 6.4 20.2 3.9 22.6 4.4C25.2 4.9 26.5 7 26.4 9.7C26.3 13 25.6 16.6 22.4 18.2C19 17.6 12 13.8 8.6 15.3C6.6 16.2 6.7 18.3 9.6 19.3C13.4 20.6 19.2 20.6 21.8 20C19 21.1 11.8 20.9 9.2 22.2C7.4 23.2 7.8 24.9 10.4 25.6C14 26.5 19 26.1 21.2 24.9C21.9 26.5 20.6 28.5 17.4 30.3C15.4 31.4 13.8 32.4 12.8 33.8" />
    </svg>
  );
}

export default function DentalClinicKovacevicPage() {
  return (
    <div
      className={`${styles.page} ${serifFont.variable} ${sansFont.variable} min-h-screen bg-[var(--dent-porcelain)] text-[var(--dent-navy)] [font-family:var(--font-dent-sans),system-ui,sans-serif]`}
    >
      <VakyBar />

      {/* A single slim row: the clinic's name, and a quiet way to reach it on
          Instagram without repeating the same button in the masthead. */}
      <header className="border-b border-[var(--dent-line)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a
            href="#vrh"
            className={`${serif} inline-flex min-h-11 items-center text-[1.05rem] tracking-[-0.01em] sm:text-xl ${focus}`}
          >
            Dental Clinic Kovačević
          </a>
          <a
            href={clinic.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ordinacije: @${clinic.instagram}`}
            data-umami-event="demo_contact"
            data-umami-event-demo="dental-clinic-kovacevic"
            data-umami-event-action="instagram-header"
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-[6px] text-[var(--dent-teal)] transition-colors hover:bg-[var(--dent-sand)] ${focus}`}
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </div>
      </header>

      <main id="vrh">
        {/* Hero. The treatment room opens the page: it is the sharp frame, it
            is what the clinic actually sells, and the clinic's own name is
            painted by hand on the wall inside it. Type holds five columns of
            twelve, the room holds seven and runs past the container's right
            edge — the page's one and only container break. */}
        <section className="border-b border-[var(--dent-line)] py-9 sm:py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className={styles.hero}>
              <div className={styles.heroHeading}>
                <p className="text-[0.95rem] text-[var(--dent-navy-soft)]">
                  Porodična stomatološka ordinacija
                </p>
                {/* The breaks are set by hand, so there is no text-balance to
                    fight them — which means the type has to be sized to the
                    lines rather than the other way round. The italic line is
                    the widest at 9.06em; the five-column type well is at its
                    tightest ~433px at 1280 and up, so the desktop maximum is
                    2.85rem (≈413px) and every lg width keeps it on one line. */}
                <h1
                  className={`${serif} mt-2.5 text-[clamp(2.15rem,8.5vw,3.4rem)] leading-[1.08] tracking-[-0.015em] lg:text-[clamp(2.2rem,3.7vw,2.85rem)]`}
                >
                  Tri doktora.
                  <br />
                  Dvije lokacije.
                  <br />
                  <span className="italic">Jedan pažljiv pristup.</span>
                </h1>
              </div>

              {/* The caption is the only place the hand-painted wall lettering
                  is named in copy a sighted reader gets, and it is the reason
                  this frame opens the page. It sits under the plate, so the
                  hero's two columns still finish on one line — the button row
                  bottom-aligns with the caption rather than with the crop. */}
              <figure className={styles.heroPhoto}>
                <div
                  className={`${photoFrame} aspect-[3/2] lg:-mr-8 xl:-mr-16`}
                >
                  <DemoPhoto
                    src={roomPhoto.src}
                    alt={roomPhoto.alt}
                    width={roomPhoto.width}
                    height={roomPhoto.height}
                    priority
                    sizes="(min-width: 1024px) 52vw, 92vw"
                    className="absolute inset-0 h-full w-full object-cover object-right"
                  />
                </div>
                <figcaption
                  className={`${serif} mt-3 text-sm italic leading-relaxed text-[var(--dent-navy-soft)]`}
                >
                  {roomPhoto.caption}
                </figcaption>
              </figure>

              <div className={styles.heroBody}>
                <p className="max-w-[30rem] text-pretty leading-relaxed text-[var(--dent-navy-soft)] sm:text-[1.1rem]">
                  Stomatološka njega u Igalu i Zelenici — bez žurbe, i sve počinje jednom porukom.
                </p>
                {/* Full-width on a phone: the two labels are very different
                    lengths, and stacked pills of unequal width read as an
                    accident rather than as a pair. */}
                <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <a
                    href={clinic.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="demo_contact"
                    data-umami-event-demo="dental-clinic-kovacevic"
                    data-umami-event-action="instagram-masthead"
                    className={`${primaryCta} w-full sm:w-auto`}
                  >
                    Pošalji upit
                  </a>
                  {/* Points at the answer a patient actually wants first —
                      which of the two towns — and says so on the control. */}
                  <a href="#lokacije" className={`${secondaryCta} w-full sm:w-auto`}>
                    Igalo ili Zelenika
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Oblasti rada: a definition board rather than three columns of body
            copy. The heading holds a third of the width and does nothing else;
            the three areas run down the wide column as term-and-definition
            rows, so a longer title wraps inside its own row instead of ragging
            a shared heading line. */}
        <section
          id="oblasti"
          className="scroll-mt-6 border-b border-[var(--dent-line)] py-14 sm:py-20 lg:py-24"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2 className={sectionHeading}>Oblasti rada</h2>
              <p className="mt-4 max-w-[30rem] leading-relaxed text-[var(--dent-navy-soft)]">
                Tri oblasti kojima se ordinacija bavi, objašnjene jednostavno.
              </p>
            </div>

            <dl className="border-t border-[var(--dent-line)] lg:col-span-8">
              {fields.map((field) => (
                <div
                  key={field.title}
                  className="grid gap-x-10 gap-y-2 border-b border-[var(--dent-line)] py-7 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:py-9"
                >
                  <dt
                    className={`${serif} leading-tight tracking-[-0.01em] text-[var(--dent-teal)] ${
                      field.entry ? "text-[1.6rem]" : "text-[1.3rem]"
                    }`}
                  >
                    {field.title}
                  </dt>
                  <dd className="leading-relaxed text-[var(--dent-navy-soft)]">{field.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Prva posjeta, on a warm sand band. Three steps read as one calm
            path, each marked with the clinic's own door glyph. */}
        <section
          id="prva-posjeta"
          className="scroll-mt-6 border-b border-[var(--dent-line)] bg-[var(--dent-sand)] py-14 sm:py-20 lg:py-24"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2 className={sectionHeading}>Prva posjeta</h2>
              <p className="mt-4 max-w-[30rem] leading-relaxed text-[var(--dent-navy-soft)]">
                Bez formulara i bez naloga.
              </p>
              <p className="mt-4">
                <a
                  href={clinic.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_contact"
                  data-umami-event-demo="dental-clinic-kovacevic"
                  data-umami-event-action="instagram-prvi-korak"
                  className={inlineLink}
                >
                  Napiši prvu poruku&nbsp;<span aria-hidden="true">↗</span>
                </a>
              </p>
            </div>

            {/* Columns 6–12, not 5–12: the flow needs about 34rem and no more,
                so the wide half is set to the width the content actually wants
                and the slack becomes gutter on the inside rather than an empty
                third against the container's right edge. */}
            <ol className={`${styles.flow} max-w-[34rem] lg:col-span-7 lg:col-start-6 lg:max-w-none`}>
              {steps.map((step) => (
                <li key={step.title} className={styles.flowItem}>
                  <ToothGlyph className={styles.flowMark} />
                  <h3 className={`${serif} text-[1.15rem] leading-tight`}>{step.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-[var(--dent-navy-soft)]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Tim: a roster board. Name left, field in its own fixed column, so
            the italics line up whatever the name's length — the old flex row
            sized its names at 16rem and one of them is wider than that. */}
        <section
          id="tim"
          className="scroll-mt-6 border-b border-[var(--dent-line)] py-14 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex flex-col gap-3 border-b border-[var(--dent-line)] pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
              <h2 className={sectionHeading}>Tim</h2>
              <p className="max-w-[24rem] leading-relaxed text-[var(--dent-navy-soft)] sm:text-right">
                Tri doktora, prema javno navedenim oblastima rada.
              </p>
            </div>

            <ul>
              {team.map((doctor) => (
                <li
                  key={doctor.name}
                  className="grid items-baseline gap-x-10 gap-y-1 border-b border-[var(--dent-line)] py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,12rem)] sm:py-7"
                >
                  {/* 1.45rem on a phone, not 1.7: the longest name on the
                      roster reaches the padding edge at 390px and breaks in two
                      on a 360px handset, which puts the ragged column back. */}
                  <h3
                    className={`${serif} text-[1.45rem] leading-tight tracking-[-0.01em] sm:text-[1.7rem]`}
                  >
                    {doctor.name}
                  </h3>
                  <p className="italic text-[var(--dent-navy-soft)]">{doctor.field}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The page changes gear here, once. Everything above is a heading, a
            lede and a column of content; this section answers the patient's
            first question — which town — and prints the two answers larger
            than any heading on the page, on a board rather than in prose.
            What the clinic has never published (an address, a phone number,
            opening hours, which doctor works where) stays unpublished: the one
            map plate searches for the ordinacija by name, and the line beside
            it says plainly where the rest gets settled. */}
        <section
          id="lokacije"
          className="scroll-mt-6 border-b border-[var(--dent-line)] bg-[var(--dent-sand)] py-16 sm:py-24 lg:py-28"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            {/* Heading and lede stand on their own line rather than sharing a
                row with the door plate: paired against a 208px photograph, a
                two-line text block left a screen-wide patch of empty sand
                beside it. The plate now sits with the map, where the two
                columns are the same height. */}
            <div className="max-w-[34rem]">
              <h2 className={sectionHeading}>Dvije ordinacije</h2>
              <p className="mt-4 leading-relaxed text-[var(--dent-navy-soft)]">
                Obje su u Herceg&nbsp;Novom, i obje se javljaju na isto Instagram sanduče.
              </p>
            </div>

            <ul className="mt-12 grid border-t border-[var(--dent-line)] sm:mt-14 sm:grid-cols-2">
              {clinic.areas.map((town) => (
                <li
                  key={town}
                  className="border-b border-[var(--dent-line)] py-8 sm:first:border-r sm:first:pr-8 sm:last:pl-8 lg:py-10 lg:first:pr-12 lg:last:pl-12"
                >
                  <h3
                    className={`${serif} text-[clamp(2.2rem,6vw,3.6rem)] leading-[1.02] tracking-[-0.02em]`}
                  >
                    {town}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--dent-navy-soft)]">
                    {clinic.municipality}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
              {/* One map, not one per town. Two plates meant two identical
                  graph-paper rectangles carrying the same sentence and four
                  controls; the search is by clinic name in the municipality,
                  which covers both ordinacije without asserting a pin. */}
              <div className="lg:col-span-8">
                <div className="overflow-hidden rounded-[6px] border border-[var(--dent-line)] bg-[var(--dent-porcelain)]">
                  <MapEmbed
                    query={`${clinic.name}, ${clinic.municipality}`}
                    title={`Mapa — pretraga za ${clinic.name} u opštini ${clinic.municipality}`}
                    className="h-56 w-full max-w-full border-0 sm:h-64"
                    buttonClassName={secondaryCta}
                    linkClassName={`text-xs text-[var(--dent-teal)] underline underline-offset-4 ${focus}`}
                    note="Mapa se otvara tek na klik i pretražuje ime ordinacije, ne adresu."
                  />
                </div>
                <p className="mt-6 max-w-[40rem] leading-relaxed text-[var(--dent-navy-soft)]">
                  Koja ordinacija i koji termin, dogovara se u toj poruci — zato ovdje nema
                  fiksnog rasporeda po gradovima.
                </p>
              </div>

              {/* The entrance photograph, kept only at the crop where its
                  subject is the mark itself. */}
              <figure className="lg:col-span-3 lg:col-start-10 lg:justify-self-end">
                {/* 13rem square × the 3.75 crop scale = a 780px render, which
                    is the 768px variant at its own size rather than upscaled. */}
                <div className={`${photoFrame} aspect-square w-full max-w-[13rem]`}>
                  <DemoPhoto
                    src={doorPhoto.src}
                    alt={doorPhoto.alt}
                    width={doorPhoto.width}
                    height={doorPhoto.height}
                    sizes="780px"
                    className={styles.doorCrop}
                  />
                </div>
                <figcaption
                  className={`${serif} mt-3 max-w-[13rem] text-sm italic leading-relaxed text-[var(--dent-navy-soft)]`}
                >
                  {doorPhoto.caption}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Close: the one dark field on the page, and the one place the door
            mark is printed at size. */}
        <section
          id="kontakt"
          className="relative scroll-mt-6 overflow-hidden bg-[var(--dent-navy)] py-16 text-[var(--dent-porcelain)] sm:py-20"
        >
          <ToothGlyph className={styles.markPrint} />
          <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <h2
                className={`${serif} text-[clamp(1.9rem,4.8vw,3rem)] leading-[1.1] tracking-[-0.015em]`}
              >
                Pišite kad vam odgovara.
              </h2>
              {/* Not the inbox, the towns and the termin again: the paragraph
                  that closes "Dvije ordinacije" sits a screen above this one
                  and already carries all three. This line does the one job
                  nothing else on the page does — it lowers the bar for the
                  first message. */}
              <p className="mt-5 max-w-[34rem] leading-relaxed text-[var(--dent-navy-muted)]">
                Ne mora da bude hitno ni opširno — dovoljna je jedna rečenica o tome šta vas
                zanima.
              </p>
            </div>

            {/* One control, and it names where it lands. */}
            <div className="mt-9">
              <a
                href={clinic.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="dental-clinic-kovacevic"
                data-umami-event-action="instagram-final"
                className={`${button} bg-[var(--dent-porcelain)] text-[var(--dent-navy)] hover:bg-[var(--dent-teal-bright)] ${focusOnNavy}`}
              >
                Piši na @{clinic.instagram}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--dent-line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className={`${serif} text-lg tracking-[-0.01em]`}>{clinic.name}</p>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-[var(--dent-navy-soft)]">
              Nezvanični dizajn koncept. Fotografije su preuzete sa javnog turističkog portala, znak
              ordinacije je precrtan sa njenih ulaznih vrata, a imena i oblasti rada sa javno
              dostupnog profila ordinacije — sve služi samo za prikaz ideje.
            </p>
          </div>
          {/* The credit link sits on its own line rather than inside the
              sentence: a 44px target inside a 12px paragraph inflates that
              line box. The target itself comes from padding with a matching
              negative bottom margin, so what `items-end` aligns is the word's
              own baseline and not the tap box under it. */}
          <div className="text-xs text-[var(--dent-navy-soft)] sm:text-right">
            <p>Koncept</p>
            <Link
              href="/"
              className={`-mb-3.5 inline-block py-3.5 font-semibold text-[var(--dent-navy)] hover:underline ${focus}`}
            >
              Vaky
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
