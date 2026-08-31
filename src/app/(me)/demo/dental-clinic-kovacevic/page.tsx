import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { clinic, fields, photos, steps, team } from "./data";
import styles from "./dental.module.css";

/* One superfamily, both halves of it. Source Serif 4 sets every heading, the
   place names and the figure captions; its italic is the page's only change of
   voice, so it is loaded on purpose rather than synthesised. Source Sans 3
   carries the running text and the small-caps labels a report leans on.
   latin-ext for č/ć/š/ž/đ. */
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
    "Dizajn koncept za porodičnu stomatološku ordinaciju Kovačević: oblasti rada, prvi korak do termina, tim i dvije ordinacije u Igalu i Zelenici.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-dental-clinic-kovacevic.png"] },
};

const serif = "[font-family:var(--font-dent-serif),Georgia,serif]";
const caps = "text-[0.68rem] font-semibold uppercase tracking-[0.2em]";
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--dent-teal)]";
const focusOnNavy =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--dent-teal-bright)]";
const button =
  "inline-flex min-h-12 items-center justify-center rounded-[2px] px-7 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors";
const primaryCta = `${button} bg-[var(--dent-navy)] text-[var(--dent-mineral)] hover:bg-[var(--dent-teal)] ${focus}`;
const secondaryCta = `${button} border border-[var(--dent-navy)] hover:bg-[var(--dent-navy)] hover:text-[var(--dent-mineral)] ${focus}`;
const inlineLink = `inline-flex min-h-11 items-center gap-1.5 text-[var(--dent-teal)] underline decoration-1 underline-offset-[6px] transition-colors hover:text-[var(--dent-navy)] ${focus}`;

/* The door and the room behind it — in that order in `data.ts`, and used in
   that order on the page: one opens it, one closes it. */
const [entrance, surgery] = photos;

/* The table of contents. Four destinations, named. An earlier draft numbered
   them 01–04, repeated the figures down the margin, numbered the three areas
   again inside the first section and had the team register cite those figures
   back — four tiers of numbering on a four-section page. The headings were
   already doing the work; the figures were decoration imitating structure. */
const contents = [
  { href: "#oblasti", label: "Oblasti" },
  { href: "#prvi-korak", label: "Prvi korak" },
  { href: "#tim", label: "Tim" },
  { href: "#lokacije", label: "Lokacije" },
];

/**
 * The report's ruled margin. Every section hangs off it: the narrow left
 * column, a hairline down its edge, the content in the right. It replaces the
 * card — nothing on this page needs a box, because everything already sits on
 * a shared vertical rule.
 *
 * The margin carries a label only where one says something the heading beside
 * it does not — the title block and the colophon. Elsewhere it is empty, and
 * the rule alone is the structure. A margin that repeats the heading in
 * smaller type is not an index, it is an echo.
 */
function Ruled({
  rail,
  tone = "light",
  children,
}: {
  rail?: ReactNode;
  tone?: "light" | "dark";
  children: ReactNode;
}) {
  const line = tone === "dark" ? "border-[var(--dent-mineral)]/25" : "border-[var(--dent-line)]";
  const ink = tone === "dark" ? "text-[var(--dent-teal-bright)]" : "text-[var(--dent-teal)]";
  return (
    <div className="mx-auto grid max-w-6xl gap-y-5 px-5 sm:px-8 md:grid-cols-[6rem_minmax(0,1fr)] md:gap-y-0 lg:grid-cols-[7.5rem_minmax(0,1fr)]">
      {/* The margin rule turns: a hairline down the edge of the rail on wide
          screens, a hairline under it on phones, where the rail sits above the
          content instead of beside it. With no label the phone rule would be a
          bare line under nothing, so there it is dropped and only the wide
          layout keeps the margin. */}
      <div
        className={`${serif} ${ink} text-xl leading-none ${line} ${rail ? "border-b pb-4 md:border-b-0 md:pb-0" : ""} md:border-r md:pr-6 md:text-right lg:pr-10`}
      >
        {rail}
      </div>
      <div className="md:pl-8 lg:pl-12">{children}</div>
    </div>
  );
}

export default function DentalClinicKovacevicPage() {
  return (
    <div
      className={`${styles.page} ${serifFont.variable} ${sansFont.variable} min-h-screen bg-[var(--dent-mineral)] text-[var(--dent-navy)] [font-family:var(--font-dent-sans),system-ui,sans-serif]`}
    >
      <VibeLabBar />

      {/* Two-row masthead. The name and the two places sit on the first line the
          way a report prints its title and its place of issue; the contents bar
          underneath is a real index, not a menu dressed as one. */}
      <header className="border-b border-[var(--dent-line)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-4 px-5 py-4 sm:px-8">
          <a
            href="#vrh"
            className={`${serif} inline-flex min-h-11 items-center text-[1.05rem] tracking-[-0.01em] sm:text-xl ${focus}`}
          >
            Dental Clinic Kovačević
          </a>
          <p className={`${caps} text-[var(--dent-steel)]`}>Igalo · Zelenika</p>
        </div>

        <nav aria-label="Sadržaj strane" className="border-t border-[var(--dent-line)]">
          <ul
            className={`${styles.index} mx-auto grid max-w-6xl grid-cols-2 px-5 sm:px-8 md:grid-cols-4`}
          >
            {contents.map((entry) => (
              <li key={entry.href}>
                <a href={entry.href} className={`flex min-h-12 items-center pl-4 ${focus}`}>
                  <span className={`${caps} text-[var(--dent-steel)]`}>{entry.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="vrh">
        {/* Title page: no photograph, no badge, no card. A kicker in the margin,
            three lines of type, the trace, and the standing details — in the
            order a printed report puts them. */}
        <section className="border-b border-[var(--dent-line)] py-12 sm:py-16 lg:py-24">
          <Ruled rail={<span className={`${caps} block pt-1`}>Stomatološka ordinacija</span>}>
            <h1
              className={`${serif} text-[clamp(2.1rem,6.6vw,4.5rem)] leading-[1.06] tracking-[-0.015em]`}
            >
              Tri doktora.
              <br />
              Dvije lokacije.
              <br />
              <em>Jedan pažljiv pristup.</em>
            </h1>

            {/* The clinic's own mark is a tooth over a helical thread, etched on
                the frosted glass of its door. Unrolled into a single horizontal
                line it becomes a reading: flat, one crown, a few settling
                oscillations, flat again. It draws once and stops. */}
            <svg
              className={`${styles.trace} mt-6 h-auto w-full text-[var(--dent-teal)]`}
              viewBox="0 0 720 46"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path
                pathLength={1}
                vectorEffect="non-scaling-stroke"
                d="M 2 32 H248 C270 32 272 6 298 6 C314 6 316 18 330 18 C344 18 346 4 364 4 C390 4 390 32 414 32 C436 32 440 22 460 26 C480 30 484 22 504 26 C522 29 526 25 544 28 C558 30 562 32 578 32 H716"
              />
            </svg>

            <p className="mt-7 max-w-[36rem] text-[1.05rem] leading-relaxed text-[var(--dent-steel)] sm:text-[1.15rem]">
              Stomatološka njega u Igalu i Zelenici, predstavljena jasno i bez suvišnih koraka.
            </p>

            {/* The standing details and the two actions share one rule, the way a
                report closes its title block: what this is on the left, what to
                do about it on the right. */}
            <div className="mt-9 flex flex-col items-start gap-6 border-t border-[var(--dent-line)] pt-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <p className={`${caps} leading-[2] text-[var(--dent-steel)]`}>
                Porodična ordinacija · Igalo · Zelenika, Herceg Novi
              </p>
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <a
                  href={clinic.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_contact"
                  data-umami-event-demo="dental-clinic-kovacevic"
                  data-umami-event-action="instagram-masthead"
                  className={primaryCta}
                >
                  Pošalji upit
                </a>
                <a href="#tim" className={secondaryCta}>
                  Upoznaj tim
                </a>
              </div>
            </div>

            {/* The frontispiece. A report sets its title block in a measure the
                eye can read and then, before the first numbered section, shows
                the thing it is about — full across the column the text only
                half fills. It is the door of the ordinacija, which is also the
                only picture on the page anyone arriving has already seen in
                person. */}
            <figure className="mt-12 sm:mt-14">
              <DemoPhoto
                src={entrance.src}
                alt={entrance.alt}
                width={entrance.width}
                height={entrance.height}
                priority
                sizes="(min-width: 1152px) 920px, (min-width: 768px) 74vw, 88vw"
                className="h-[13rem] w-full border border-[var(--dent-line)] object-cover object-[50%_46%] sm:h-[16rem] lg:h-[19rem]"
              />
              <figcaption
                className={`${serif} mt-3 text-sm italic leading-relaxed text-[var(--dent-steel)]`}
              >
                {entrance.caption}
              </figcaption>
            </figure>
          </Ruled>
        </section>

        {/* The index. Wide report rows, not tiles: the area and two lines of
            context. The public record does not assign individual doctors to an
            area, so the page deliberately does not infer those pairings. */}
        <section
          id="oblasti"
          className="scroll-mt-6 border-b border-[var(--dent-line)] py-14 sm:py-20"
        >
          <Ruled>
            <h2
              className={`${serif} text-[clamp(1.7rem,4vw,2.4rem)] leading-[1.1] tracking-[-0.01em]`}
            >
              Oblasti rada
            </h2>
            <p className="mt-4 max-w-[36rem] leading-relaxed text-[var(--dent-steel)]">
              Tri oblasti u kojima ordinacija radi.
            </p>

            <ol className="mt-10 border-b border-[var(--dent-line)]">
              {fields.map((field) => (
                <li
                  key={field.title}
                  className="grid gap-x-10 gap-y-3 border-t border-[var(--dent-line)] py-7 lg:grid-cols-[minmax(0,1fr)_13rem]"
                >
                  <div>
                    <h3 className={`${serif} text-[1.45rem] leading-tight tracking-[-0.01em]`}>
                      {field.title}
                    </h3>
                    <p className="mt-2.5 max-w-[36rem] leading-relaxed text-[var(--dent-steel)]">
                      {field.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Ruled>
        </section>

        {/* The shortest section on the page, on a half-tone band: what happens,
            in the order it happens. */}
        <section
          id="prvi-korak"
          className="scroll-mt-6 border-b border-[var(--dent-line)] bg-[var(--dent-paper)] py-12 sm:py-14"
        >
          <Ruled>
            <h2
              className={`${serif} text-[clamp(1.7rem,4vw,2.4rem)] leading-[1.1] tracking-[-0.01em]`}
            >
              Prvi korak
            </h2>
            <p className="mt-4 max-w-[36rem] leading-relaxed text-[var(--dent-steel)]">
              Bez formulara i bez naloga. Sve ide kroz jednu poruku.
            </p>

            <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-7">
              {steps.map((step) => (
                <li
                  key={step.title}
                  className="border-t border-[var(--dent-line-strong)] pt-5"
                >
                  <h3 className={`${serif} text-[1.15rem] leading-tight`}>{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--dent-steel)]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-9">
              <a
                href={clinic.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="dental-clinic-kovacevic"
                data-umami-event-action="instagram-prvi-korak"
                className={inlineLink}
              >
                Pošalji upit porukom <span aria-hidden="true">↗</span>
              </a>
            </p>
          </Ruled>
        </section>

        {/* The register. The same three names the public record lists, each with
            the field that record gives it — and nothing else. An earlier draft
            printed an area number beside every row, which restated in figures
            the word already sitting to its left. */}
        <section id="tim" className="scroll-mt-6 border-b border-[var(--dent-line)] py-14 sm:py-20">
          <Ruled>
            <h2
              className={`${serif} text-[clamp(1.7rem,4vw,2.4rem)] leading-[1.1] tracking-[-0.01em]`}
            >
              Tim
            </h2>
            <p className="mt-4 max-w-[36rem] leading-relaxed text-[var(--dent-steel)]">
              Tri doktora, prema javno navedenim oblastima rada.
            </p>

            <ul className="mt-10">
              {team.map((doctor) => (
                <li
                  key={doctor.name}
                  className="grid items-baseline gap-x-8 gap-y-1.5 border-t border-[var(--dent-line)] py-6 sm:grid-cols-[minmax(0,1fr)_auto]"
                >
                  <p className={`${serif} text-[1.3rem] leading-tight tracking-[-0.01em]`}>
                    {doctor.name}
                  </p>
                  {/* Ranged right, against the edge the areas index above ranges
                      its attributions to: name on one margin, field on the
                      other, the way a register is actually set. */}
                  <p className="text-[var(--dent-steel)] sm:text-right">{doctor.field}</p>
                </li>
              ))}
            </ul>

            <div className="border-t border-[var(--dent-line)] pt-5">
              <p className="max-w-[36rem] text-sm leading-relaxed text-[var(--dent-steel)]">
                Estetski i protetski rad vodi se kao rad ordinacije — pojedinačne uloge u njemu
                nijesu javno navedene.
              </p>
            </div>
          </Ruled>
        </section>

        {/* Two place names, set large, divided by the same hairline that
            runs down the margin. The photographs come after them as figures, and
            neither is captioned with a location: the source does not say which
            of the two ordinacije it shows. */}
        <section
          id="lokacije"
          className="scroll-mt-6 border-b border-[var(--dent-line)] py-14 sm:py-20"
        >
          <Ruled>
            <h2
              className={`${serif} text-[clamp(1.7rem,4vw,2.4rem)] leading-[1.1] tracking-[-0.01em]`}
            >
              Dvije ordinacije
            </h2>
            <p className="mt-4 max-w-[36rem] leading-relaxed text-[var(--dent-steel)]">
              Igalo i Zelenika, obje u Herceg Novom. Kod dogovora termina birate lokaciju koja vam
              više odgovara.
            </p>

            {/* The two plates share the column geometry of the two photographs
                below them, so the place names sit exactly on top of the frames
                and the divider falls in the middle of the same gutter. */}
            <div className="mt-10 grid sm:grid-cols-2 sm:gap-x-6">
              {clinic.areas.map((place, index) => (
                <div
                  key={place}
                  className={
                    index === 0
                      ? "border-t border-[var(--dent-navy)] pb-8 pt-6 sm:pb-0 sm:pr-6"
                      : "border-t border-[var(--dent-navy)] pt-6 sm:-ml-3 sm:border-l sm:border-l-[var(--dent-line)] sm:pl-3"
                  }
                >
                  <p
                    className={`${serif} text-[clamp(2.3rem,6.4vw,3.6rem)] leading-none tracking-[-0.02em]`}
                  >
                    {place}
                  </p>
                  <p className={`mt-3 ${caps} text-[var(--dent-steel)]`}>{clinic.municipality}</p>
                </div>
              ))}
            </div>

            {/* One frame, not a pair: the door is already the frontispiece, and
                the second picture is the room behind it. Set wide rather than
                halved, so what it shows — a working surgery — is actually
                legible instead of thumbnail-sized. */}
            <figure className="mt-14">
              <h3 className={`${caps} text-[var(--dent-steel)]`}>Prostor</h3>
              <DemoPhoto
                src={surgery.src}
                alt={surgery.alt}
                width={surgery.width}
                height={surgery.height}
                sizes="(min-width: 1152px) 920px, (min-width: 768px) 74vw, 88vw"
                className="mt-5 h-[14rem] w-full border border-[var(--dent-line)] object-cover sm:h-[18rem] lg:h-[22rem]"
              />
              <figcaption
                className={`${serif} mt-3 text-sm italic leading-relaxed text-[var(--dent-steel)]`}
              >
                {surgery.caption}
              </figcaption>
            </figure>
          </Ruled>
        </section>

        {/* The colophon: the one dark field on the page, and the only place the
            handle is printed in full. */}
        <section
          id="kontakt"
          className="scroll-mt-6 bg-[var(--dent-navy)] py-16 text-[var(--dent-mineral)] sm:py-20"
        >
          <Ruled rail={<span className={`${caps} block pt-1`}>Kontakt</span>} tone="dark">
            <h2
              className={`${serif} text-[clamp(1.9rem,4.8vw,3rem)] leading-[1.1] tracking-[-0.015em]`}
            >
              Pišite kad vam odgovara.
            </h2>

            {/* Same split as the title block: what this is on the left, what to
                do about it on the right, one rule holding them together. */}
            <div className="mt-8 grid gap-8 border-t border-[var(--dent-mineral)]/25 pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-14">
              <p className="max-w-[34rem] leading-relaxed text-[var(--dent-navy-muted)]">
                Upit stiže u Instagram poruke ordinacije. Tu se dogovara termin — u Igalu ili u
                Zelenici.
              </p>

              <address className="flex flex-col items-start gap-5 not-italic sm:flex-row sm:items-center sm:gap-7">
                <a
                  href={clinic.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_contact"
                  data-umami-event-demo="dental-clinic-kovacevic"
                  data-umami-event-action="instagram-final"
                  className={`${button} bg-[var(--dent-mineral)] text-[var(--dent-navy)] hover:bg-[var(--dent-teal-bright)] ${focusOnNavy}`}
                >
                  Pošalji upit
                </a>
                <a
                  href={clinic.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_contact"
                  data-umami-event-demo="dental-clinic-kovacevic"
                  data-umami-event-action="instagram-kontakt"
                  className={`inline-flex min-h-11 items-center gap-1.5 text-[var(--dent-teal-bright)] underline decoration-1 underline-offset-[6px] transition-colors hover:text-[var(--dent-mineral)] ${focusOnNavy}`}
                >
                  @{clinic.instagram} <span aria-hidden="true">↗</span>
                </a>
              </address>
            </div>
          </Ruled>
        </section>
      </main>

      <footer className="border-t border-[var(--dent-line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className={`${serif} text-lg tracking-[-0.01em]`}>{clinic.name}</p>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-[var(--dent-steel)]">
              Nezvanični dizajn koncept. Fotografije su preuzete sa javnog turističkog portala, a
              imena i oblasti rada sa javno dostupnog profila ordinacije — sve služi samo za prikaz
              ideje.
            </p>
          </div>
          <p className="text-xs text-[var(--dent-steel)]">
            Koncept:{" "}
            <Link
              href="/"
              className={`inline-flex min-h-11 items-center font-semibold text-[var(--dent-navy)] hover:underline ${focus}`}
            >
              VibeLab
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
