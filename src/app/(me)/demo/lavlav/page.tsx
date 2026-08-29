import type { Metadata } from "next";
import Link from "next/link";
import { Plus_Jakarta_Sans, Tenor_Sans } from "next/font/google";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { MapEmbed } from "@/components/demo/MapEmbed";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { bookingSteps, hero, lookbook, services, studio, trustLine } from "./data";
import styles from "./lav.module.css";

/* Tenor Sans is a single weight with wide, open letterforms — it works set
   large and tracked out, and nowhere else, which is exactly what a lookbook
   needs. Plus Jakarta carries the rest. latin-ext for č/ć/š/ž/đ. */
const tenor = Tenor_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  display: "swap",
  variable: "--font-lav-display",
});
const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-lav-sans",
});

export const metadata: Metadata = {
  title: "LavLav — nail & beauty studio, Podgorica | Dizajn koncept",
  description:
    "Dizajn koncept za LavLav nail & beauty studio u Master kvartu: manikir, obrve, trepavice, laser, galerija radova i online rezervacija.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-lavlav.png"] },
};

const display = "[font-family:var(--font-lav-display),Georgia,serif]";
const label = "text-[0.68rem] uppercase tracking-[0.26em]";
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lav-red)]";
const primaryCta = `inline-flex min-h-12 items-center justify-center bg-[var(--lav-red)] px-7 text-sm font-semibold text-white transition-colors hover:bg-[var(--lav-ink)] ${focus}`;
const secondaryCta = `inline-flex min-h-12 items-center justify-center border border-[var(--lav-ink)] px-7 text-sm font-semibold transition-colors hover:bg-[var(--lav-ink)] hover:text-[var(--lav-cream)] ${focus}`;

/* Every second frame drops half a step, so the row reads as a lookbook spread
   rather than a product grid. */
const LOOK_OFFSET = ["", "sm:mt-10", "", "sm:mt-10", ""];

export default function LavLavPage() {
  return (
    <div
      className={`${styles.page} ${tenor.variable} ${sans.variable} min-h-screen bg-[var(--lav-cream)] pb-[calc(5rem+env(safe-area-inset-bottom))] text-[var(--lav-ink)] [font-family:var(--font-lav-sans),system-ui,sans-serif] md:pb-0`}
    >
      <VibeLabBar />

      <header className="border-b border-[var(--lav-line)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
          {/* The studio's mark is a stacked wordmark, so the wordmark is what
              the page uses. No reconstruction, no invented monogram. */}
          <a
            href="#vrh"
            className={`${display} inline-flex min-h-11 flex-col justify-center text-lg leading-[0.95] tracking-[0.2em] ${focus}`}
          >
            <span>LAV</span>
            <span className="text-[var(--lav-muted)]">LAV</span>
          </a>
          <nav aria-label="Glavna navigacija" className="hidden items-center gap-7 md:flex">
            {[
              ["#usluge", "Usluge"],
              ["#radovi", "Radovi"],
              ["#rezervacija", "Rezervacija"],
              ["#kontakt", "Kontakt"],
            ].map(([href, text]) => (
              <a
                key={href}
                href={href}
                className={`${label} text-[var(--lav-muted)] transition-colors hover:text-[var(--lav-ink)] ${focus}`}
              >
                {text}
              </a>
            ))}
          </nav>
          <a
            href={studio.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="demo_booking"
            data-umami-event-demo="lavlav"
            data-umami-event-action="dikidi-header"
            className={`hidden min-h-10 items-center bg-[var(--lav-red)] px-5 text-xs font-semibold text-white transition-colors hover:bg-[var(--lav-ink)] sm:inline-flex ${focus}`}
          >
            Rezerviši online
          </a>
        </div>
      </header>

      <main id="vrh">
        <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-14 pt-8 sm:px-8 sm:pb-16 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div className="order-2 lg:order-1">
            <p className={`${label} text-[var(--lav-muted)]`}>Nails · Brows · Lashes · {studio.city}</p>
            <h1
              className={`${display} mt-7 text-[clamp(2rem,4.6vw,3rem)] leading-[1.12] tracking-[-0.01em]`}
            >
              Više od 200 nijansi.
              <br />
              Jedan termin za sebe.
            </h1>
            <p className="mt-7 max-w-md leading-relaxed text-[var(--lav-muted)]">
              Intiman beauty studio u Master kvartu za manikir, pedikir, obrve, trepavice i pažljivo
              odabrane beauty tretmane.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={studio.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_booking"
                data-umami-event-demo="lavlav"
                data-umami-event-action="dikidi-hero"
                className={primaryCta}
              >
                Rezerviši online
              </a>
              <a href="#radovi" className={secondaryCta}>
                Pogledaj radove
              </a>
            </div>
          </div>

          <figure className="order-1 lg:order-2">
            <div className="overflow-hidden">
              <DemoPhoto
                src={hero.src}
                alt={hero.alt}
                width={hero.width}
                height={hero.height}
                priority
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="h-52 w-full object-cover min-[380px]:h-64 sm:h-[26rem] lg:h-[30rem]"
              />
            </div>
            <figcaption className={`mt-3 ${label} text-[var(--lav-muted)]`}>{hero.caption}</figcaption>
          </figure>
        </section>

        {/* Three claims the studio makes itself, set as a rule across the page
            rather than as three badge pills. */}
        <section aria-label="Zašto LavLav" className="border-y border-[var(--lav-line)]">
          <ul className="mx-auto grid max-w-6xl sm:grid-cols-3">
            {trustLine.map((item, index) => (
              <li
                key={item}
                className={`px-5 py-5 sm:px-8 ${index > 0 ? "border-t border-[var(--lav-line)] sm:border-l sm:border-t-0" : ""}`}
              >
                <p className={`${display} text-lg tracking-[0.08em]`}>{item}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="usluge" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className={`${display} text-[clamp(1.75rem,4vw,2.5rem)] tracking-[0.02em]`}>
                Usluge
              </h2>
              <p className="max-w-xs text-sm leading-relaxed text-[var(--lav-muted)]">
                Kompletan spisak sa cijenama i trajanjem stoji na DIKIDI-ju, gdje se i mijenja.
              </p>
            </div>

            <dl className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div key={service.id} className="border-t border-[var(--lav-line)] pt-5">
                  <dt className={`${display} text-xl tracking-[0.04em]`}>{service.title}</dt>
                  <dd className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--lav-muted)]">
                    {service.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Phone: a strip the reader swipes. Pointer: a staggered spread with a
            slow crop on hover. Same markup, two behaviours, no JavaScript. */}
        <section id="radovi" className="scroll-mt-6 bg-[var(--lav-shell)]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className={`${display} text-[clamp(1.75rem,4vw,2.5rem)] tracking-[0.02em]`}>
                Radovi
              </h2>
              <p className={`${label} text-[var(--lav-muted)] sm:hidden`}>Prevuci za još ←→</p>
            </div>

            <ul
              className={`${styles.strip} -mx-5 mt-8 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3`}
            >
              {lookbook.map((look, index) => (
                <li
                  key={look.src}
                  className={`w-[78%] shrink-0 sm:w-auto ${LOOK_OFFSET[index]}`}
                >
                  <figure className={styles.frame}>
                    <div className="overflow-hidden">
                      <DemoPhoto
                        src={look.src}
                        alt={look.alt}
                        width={look.width}
                        height={look.height}
                        sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 78vw"
                        className={`${styles.crop} aspect-[4/5] w-full object-cover`}
                      />
                    </div>
                    <figcaption className={`mt-3 ${label} text-[var(--lav-muted)]`}>
                      {look.caption}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="rezervacija" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div>
                <h2 className={`${display} text-[clamp(1.75rem,4vw,2.5rem)] leading-tight tracking-[0.02em]`}>
                  Rezervacija bez dopisivanja
                </h2>
                <p className="mt-6 max-w-sm leading-relaxed text-[var(--lav-muted)]">
                  Termini se biraju online, u sistemu koji studio već koristi. Nema čekanja na
                  odgovor i nema dogovaranja u porukama.
                </p>
                <a
                  href={studio.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_booking"
                  data-umami-event-demo="lavlav"
                  data-umami-event-action="dikidi-rezervacija"
                  className={`${primaryCta} mt-8`}
                >
                  Otvori DIKIDI <span aria-hidden="true">↗</span>
                </a>
              </div>

              <ol className="grid gap-8 sm:grid-cols-3">
                {bookingSteps.map((step) => (
                  <li key={step.n}>
                    <p className={`${display} text-3xl leading-none text-[var(--lav-red)]`}>
                      {step.n}
                    </p>
                    <h3 className={`${display} mt-4 text-lg leading-snug tracking-[0.03em]`}>
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--lav-muted)]">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="kontakt" className="scroll-mt-6 border-t border-[var(--lav-line)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className={`${display} text-[clamp(1.75rem,4vw,2.5rem)] tracking-[0.02em]`}>
                Master kvart
              </h2>
              <address className="mt-6 not-italic">
                <p className="max-w-xs leading-relaxed">{studio.address}</p>
                <p className="mt-5">
                  <a
                    href={studio.phoneUrl}
                    data-umami-event="demo_contact"
                    data-umami-event-demo="lavlav"
                    data-umami-event-action="phone-kontakt"
                    className={`${display} inline-flex min-h-11 items-center text-xl tracking-[0.06em] underline decoration-[var(--lav-red)] decoration-2 underline-offset-8 hover:decoration-[var(--lav-ink)] ${focus}`}
                  >
                    {studio.phoneDisplay}
                  </a>
                </p>
              </address>

              <ul className="mt-8 border-t border-[var(--lav-line)]">
                {[
                  {
                    key: "instagram",
                    href: studio.instagramUrl,
                    text: `@${studio.instagram}`,
                    meta: "Nokti, obrve, trepavice",
                  },
                  {
                    key: "instagram-laser",
                    href: studio.laserInstagramUrl,
                    text: `@${studio.laserInstagram}`,
                    meta: "Laser",
                  },
                ].map((row) => (
                  <li key={row.key} className="border-b border-[var(--lav-line)]">
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-umami-event="demo_contact"
                      data-umami-event-demo="lavlav"
                      data-umami-event-action={row.key}
                      className={`flex min-h-14 items-center justify-between gap-4 transition-colors hover:text-[var(--lav-red)] ${focus}`}
                    >
                      <span className="font-semibold">{row.text}</span>
                      <span className={`${label} text-[var(--lav-muted)]`}>{row.meta}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[var(--lav-line)] p-1.5">
              <MapEmbed
                query={studio.mapQuery}
                title="Mapa — Master kvart, Podgorica"
                className="h-72 w-full max-w-full border-0 lg:h-full lg:min-h-80"
                buttonClassName={primaryCta}
                linkClassName={`text-xs underline underline-offset-4 ${focus}`}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--lav-line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className={`${display} text-base tracking-[0.2em]`}>LAV LAV</p>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-[var(--lav-muted)]">
              Nezvanični dizajn koncept. Fotografije i podaci preuzeti su sa javnih Instagram profila
              studija i služe samo za prikaz ideje.
            </p>
          </div>
          <p className="text-xs text-[var(--lav-muted)]">
            Koncept:{" "}
            <Link href="/" className={`inline-flex min-h-11 items-center font-semibold text-[var(--lav-ink)] hover:underline ${focus}`}>
              VibeLab
            </Link>
          </p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[var(--lav-line)] bg-[var(--lav-cream)] px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 md:hidden">
        <a
          href={studio.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="demo_booking"
          data-umami-event-demo="lavlav"
          data-umami-event-action="dikidi-sticky"
          className={`inline-flex min-h-12 items-center justify-center bg-[var(--lav-red)] px-4 text-sm font-semibold text-white ${focus}`}
        >
          Rezerviši
        </a>
        <a
          href={studio.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="demo_contact"
          data-umami-event-demo="lavlav"
          data-umami-event-action="instagram-sticky"
          className={`inline-flex min-h-12 items-center justify-center border border-[var(--lav-ink)] px-4 text-sm font-semibold ${focus}`}
        >
          Instagram
        </a>
      </div>
    </div>
  );
}
