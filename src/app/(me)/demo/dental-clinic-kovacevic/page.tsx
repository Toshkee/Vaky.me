import type { Metadata } from "next";
import Link from "next/link";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { InstagramIcon } from "@/components/demo/ContactIcons";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { clinic, fields, photos, steps, team } from "./data";
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
const inlineLink = `inline-flex min-h-11 items-center gap-1.5 text-[var(--dent-teal)] underline decoration-1 underline-offset-[6px] transition-colors hover:text-[var(--dent-navy)] ${focus}`;

/* Shared frame for both photographs on the page: 6px softness, a thin warm
   keyline instead of a shadow, and a sand ground underneath so the box never
   flashes empty white while the file loads. */
const photoFrame =
  "relative overflow-hidden rounded-[6px] border border-[var(--dent-line)] bg-[var(--dent-sand)]";

export default function DentalClinicKovacevicPage() {
  return (
    <div
      className={`${styles.page} ${serifFont.variable} ${sansFont.variable} min-h-screen bg-[var(--dent-porcelain)] text-[var(--dent-navy)] [font-family:var(--font-dent-sans),system-ui,sans-serif]`}
    >
      <VibeLabBar />

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
        {/* Hero. The frosted-glass entrance is the trust signal, so it sits in
            the first view alongside the headline and the primary action —
            not three sections down, the way the earlier draft buried it. */}
        <section className="border-b border-[var(--dent-line)] py-9 sm:py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className={styles.hero}>
              <div className={styles.heroHeading}>
                <p className="text-[0.95rem] text-[var(--dent-teal)]">
                  Porodična stomatološka ordinacija
                </p>
                <h1
                  className={`${serif} mt-2.5 text-balance text-[clamp(2rem,7.4vw,4.2rem)] leading-[1.08] tracking-[-0.015em]`}
                >
                  Tri doktora.
                  <br />
                  Dvije lokacije.
                  <br />
                  <em>Jedan pažljiv pristup.</em>
                </h1>
              </div>

              <div className={styles.heroPhoto}>
                <div
                  className={`${photoFrame} ${styles.heroSettle} aspect-[4/3] lg:aspect-[3/4]`}
                >
                  <DemoPhoto
                    src={photos[0].src}
                    alt={photos[0].alt}
                    width={photos[0].width}
                    height={photos[0].height}
                    priority
                    sizes="(min-width: 1024px) 34vw, (min-width: 640px) 58vw, 88vw"
                    className="absolute inset-0 h-full w-full object-cover object-[28%_42%]"
                  />
                </div>
              </div>

              <div className={styles.heroBody}>
                <p className="max-w-[34rem] text-pretty leading-relaxed text-[var(--dent-navy-soft)] sm:text-[1.1rem]">
                  Stomatološka njega u Igalu i Zelenici — bez žurbe, i sve počinje jednom porukom.
                </p>
                <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
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
            </div>
          </div>
        </section>

        {/* Oblasti rada: three plain-language blocks, no numbering and no
            per-doctor cross-references — a patient reads what the ordinacija
            does, not an index. */}
        <section
          id="oblasti"
          className="scroll-mt-6 border-b border-[var(--dent-line)] py-14 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="max-w-[36rem]">
              <h2
                className={`${serif} text-[clamp(1.7rem,4vw,2.4rem)] leading-[1.1] tracking-[-0.01em]`}
              >
                Oblasti rada
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--dent-navy-soft)]">
                Tri oblasti kojima se ordinacija bavi, objašnjene jednostavno.
              </p>
              <span aria-hidden="true" className="mt-6 block h-0.5 w-8 bg-[var(--dent-teal)]" />
            </div>

            <ul className="mt-10 grid gap-10 sm:mt-14 sm:grid-cols-3 sm:gap-8">
              {fields.map((field) => (
                <li key={field.title}>
                  <h3 className={`${serif} text-[1.35rem] leading-tight tracking-[-0.01em]`}>
                    {field.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-[var(--dent-navy-soft)]">
                    {field.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Prva posjeta, on a warm sand band. Three steps read as one calm
            path rather than a table. */}
        <section
          id="prva-posjeta"
          className="scroll-mt-6 border-b border-[var(--dent-line)] bg-[var(--dent-sand)] py-14 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="max-w-[36rem]">
              <h2
                className={`${serif} text-[clamp(1.7rem,4vw,2.4rem)] leading-[1.1] tracking-[-0.01em]`}
              >
                Prva posjeta
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--dent-navy-soft)]">
                Bez formulara i bez naloga. Sve ide kroz jednu poruku.
              </p>
            </div>

            <ol className={`${styles.flow} mt-10 max-w-[28rem] sm:mt-14`}>
              {steps.map((step) => (
                <li key={step.title} className={styles.flowItem}>
                  <h3 className={`${serif} text-[1.15rem] leading-tight`}>{step.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-[var(--dent-navy-soft)]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-10">
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
          </div>
        </section>

        {/* Tim: three warm, simple rows — name and field exactly as the
            public record states them. No invented bios, no portraits. */}
        <section id="tim" className="scroll-mt-6 border-b border-[var(--dent-line)] py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="max-w-[36rem]">
              <h2
                className={`${serif} text-[clamp(1.7rem,4vw,2.4rem)] leading-[1.1] tracking-[-0.01em]`}
              >
                Tim
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--dent-navy-soft)]">
                Tri doktora, prema javno navedenim oblastima rada.
              </p>
            </div>

            <ul className="mt-10 flex max-w-[36rem] flex-col gap-7 sm:mt-14 sm:gap-8">
              {team.map((doctor) => (
                <li
                  key={doctor.name}
                  className="flex flex-col gap-1.5 border-b border-[var(--dent-line)] pb-7 last:border-b-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <h3
                    className={`${serif} text-[1.7rem] leading-tight tracking-[-0.01em] sm:min-w-[16rem]`}
                  >
                    {doctor.name}
                  </h3>
                  <p className="italic text-[var(--dent-navy-soft)]">{doctor.field}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Prostor ordinacije: the treatment-room photograph only — the
            entrance shot already opened the page as the hero, so it does not
            repeat here. One honest photo, captioned with what it shows, not
            with which of the two towns it was taken in, since the source
            does not say. */}
        <section
          id="lokacije"
          className="scroll-mt-6 border-b border-[var(--dent-line)] bg-[var(--dent-sand)] py-14 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="max-w-[36rem]">
              <h2
                className={`${serif} text-[clamp(1.7rem,4vw,2.4rem)] leading-[1.1] tracking-[-0.01em]`}
              >
                Prostor ordinacije
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--dent-navy-soft)]">
                Dvije ordinacije, u Igalu i u Zelenici — obje u Herceg&nbsp;Novom. Lokaciju birate
                kad dogovarate termin.
              </p>
            </div>

            <figure className="mt-10 max-w-[34rem] sm:mt-14">
              <div className={`${photoFrame} aspect-[4/3] sm:aspect-[3/2]`}>
                <DemoPhoto
                  src={photos[1].src}
                  alt={photos[1].alt}
                  width={photos[1].width}
                  height={photos[1].height}
                  sizes="(min-width: 640px) 54vw, 88vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <figcaption
                className={`${serif} mt-3 text-sm italic leading-relaxed text-[var(--dent-navy-soft)]`}
              >
                {photos[1].caption}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Close: the one dark field on the page. */}
        <section
          id="kontakt"
          className="scroll-mt-6 bg-[var(--dent-navy)] py-16 text-[var(--dent-porcelain)] sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <h2
                className={`${serif} text-[clamp(1.9rem,4.8vw,3rem)] leading-[1.1] tracking-[-0.015em]`}
              >
                Pišite kad vam odgovara.
              </h2>
              <p className="mt-5 max-w-[34rem] leading-relaxed text-[var(--dent-navy-muted)]">
                Upit stiže u Instagram poruke ordinacije. Tu se dogovara termin — u Igalu ili u
                Zelenici.
              </p>
            </div>

            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
              <a
                href={clinic.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="dental-clinic-kovacevic"
                data-umami-event-action="instagram-final"
                className={`${button} bg-[var(--dent-porcelain)] text-[var(--dent-navy)] hover:bg-[var(--dent-teal-bright)] ${focusOnNavy}`}
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
                className={`inline-flex min-h-11 items-center gap-1.5 text-[var(--dent-teal-bright)] underline decoration-1 underline-offset-[6px] transition-colors hover:text-[var(--dent-porcelain)] ${focusOnNavy}`}
              >
                @{clinic.instagram} <span aria-hidden="true">↗</span>
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
              Nezvanični dizajn koncept. Fotografije su preuzete sa javnog turističkog portala, a
              imena i oblasti rada sa javno dostupnog profila ordinacije — sve služi samo za prikaz
              ideje.
            </p>
          </div>
          <p className="text-xs text-[var(--dent-navy-soft)]">
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
