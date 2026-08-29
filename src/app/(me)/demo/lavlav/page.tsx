import type { Metadata } from "next";
import Link from "next/link";
import { Plus_Jakarta_Sans, Tenor_Sans } from "next/font/google";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { MapEmbed } from "@/components/demo/MapEmbed";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { CalendarIcon, InstagramIcon } from "@/components/demo/ContactIcons";
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
            className={`${display} inline-flex min-h-11 items-center gap-2 text-lg leading-[0.95] tracking-[0.2em] sm:flex-col sm:items-start sm:gap-0 ${focus}`}
          >
            <span>LAV</span>
            <span className="text-[var(--lav-muted)]">LAV</span>
          </a>
          <nav aria-label="Glavna navigacija" className="hidden items-center gap-7 md:flex">
            {[
              ["#usluge", "Usluge"],
              ["#radovi", "Iz salona"],
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
        <section className="relative isolate mx-auto grid max-w-6xl overflow-hidden pb-0 sm:mx-8 sm:mt-10 sm:border sm:border-[var(--lav-line)] lg:mx-auto lg:mt-0 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:overflow-visible lg:border-0 lg:px-8 lg:pb-16 lg:pt-16">
          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-24 text-white sm:px-8 sm:pb-24 md:pb-10 lg:static lg:order-1 lg:px-0 lg:pb-0 lg:text-[var(--lav-ink)]">
            <p className={`${label} mb-4 text-white/80 lg:text-[var(--lav-red)]`}>
              Nail &amp; beauty · Master kvart
            </p>
            <h1
              className={`${display} max-w-lg text-[clamp(2.25rem,10vw,3.2rem)] leading-[1.02] tracking-[-0.01em] lg:text-[clamp(2rem,4.6vw,3rem)] lg:leading-[1.12]`}
            >
              Tvoja nijansa.
              <br />
              Tvoj termin.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85 sm:text-base lg:mt-7 lg:text-[var(--lav-muted)]">
              Intiman beauty studio u Master kvartu za manikir, pedikir, obrve, trepavice i lasersku
              epilaciju.
            </p>
            <div className="mt-7 hidden gap-2.5 sm:gap-3 md:flex lg:mt-9">
              <a
                href={studio.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_booking"
                data-umami-event-demo="lavlav"
                data-umami-event-action="dikidi-hero"
                className={`${primaryCta} flex-1 gap-2 px-4 sm:flex-none sm:px-7`}
              >
                <CalendarIcon className="h-4 w-4" />
                Rezerviši online
              </a>
              <a
                href="#radovi"
                className={`${secondaryCta} border-white/70 bg-[var(--lav-cream)] px-4 text-[var(--lav-ink)] sm:px-7 lg:border-[var(--lav-ink)] lg:bg-transparent`}
              >
                Radovi
              </a>
            </div>
          </div>

          <figure className="relative min-h-[34rem] sm:min-h-[38rem] lg:order-2 lg:min-h-0">
            <div className="absolute inset-0 overflow-hidden lg:relative">
              <DemoPhoto
                src={hero.src}
                alt={hero.alt}
                width={hero.width}
                height={hero.height}
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="h-full w-full object-cover object-[58%_center] lg:h-[30rem] lg:object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.04)_30%,rgba(17,17,17,0.88)_100%)] lg:hidden" />
            </div>
            <figcaption className={`absolute right-5 top-5 bg-[var(--lav-cream)] px-3 py-2 ${label} text-[var(--lav-ink)] sm:right-6 sm:top-6 lg:-bottom-8 lg:right-0 lg:top-auto lg:bg-transparent lg:px-0 lg:py-0 lg:text-[var(--lav-muted)]`}>
              {hero.caption}
            </figcaption>
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
            <div className="flex items-end justify-between gap-4">
              <h2 className={`${display} text-[clamp(1.75rem,4vw,2.5rem)] tracking-[0.02em]`}>
                Usluge
              </h2>
              <p className={`${label} pb-1 text-[var(--lav-red)] md:hidden`}>
                Dodirni za detalje
              </p>
              <p className="hidden max-w-xs text-sm leading-relaxed text-[var(--lav-muted)] md:block">
                Kompletan spisak sa cijenama i trajanjem stoji na DIKIDI-ju, gdje se i mijenja.
              </p>
            </div>

            {/* On a phone six full descriptions turn this into the longest
                section on the page. The service menu keeps every category in
                view and reveals only the description the visitor asks for. */}
            <div className="mt-8 grid grid-cols-2 border-l border-t border-[var(--lav-line)] md:hidden">
              {services.map((service, index) => (
                <details
                  key={service.id}
                  className="group border-b border-r border-[var(--lav-line)] bg-[var(--lav-cream)] open:bg-[var(--lav-shell)]"
                >
                  <summary className="flex min-h-28 cursor-pointer list-none flex-col justify-between gap-5 p-4 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-3">
                      <span className={`${label} text-[var(--lav-red)]`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`${display} text-xl leading-none text-[var(--lav-muted)] transition-transform group-open:rotate-45 motion-reduce:transition-none`}
                      >
                        +
                      </span>
                    </span>
                    <span className={`${display} text-lg leading-tight tracking-[0.02em]`}>
                      {service.title}
                    </span>
                  </summary>
                  <p className="border-t border-[var(--lav-line)] px-4 pb-5 pt-4 text-xs leading-relaxed text-[var(--lav-muted)]">
                    {service.body}
                  </p>
                </details>
              ))}
            </div>

            <a
              href={studio.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="demo_booking"
              data-umami-event-demo="lavlav"
              data-umami-event-action="dikidi-usluge"
              className={`mt-5 flex min-h-12 items-center justify-between border-b border-[var(--lav-ink)] text-sm font-semibold md:hidden ${focus}`}
            >
              Sve cijene i slobodni termini
              <span aria-hidden="true">↗</span>
            </a>

            <dl className="mt-10 hidden gap-x-10 gap-y-9 md:grid md:grid-cols-2 lg:grid-cols-3">
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
                Iz salona
              </h2>
              <p className={`${label} text-[var(--lav-muted)] sm:hidden`}>Prevuci za još ←→</p>
            </div>

            <ul
              className={`${styles.strip} -mx-5 mt-8 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3`}
            >
              {lookbook.map((look, index) => (
                // Every second frame drops half a step, so the row reads as a
                // lookbook spread rather than a product grid.
                <li
                  key={look.src}
                  className={`w-[78%] shrink-0 sm:w-auto ${index % 2 === 1 ? "sm:mt-10" : ""}`}
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
              Nezvanični dizajn koncept. Hero vizual je ilustrativan, a fotografije radova i podaci
              preuzeti su sa javnih Instagram profila studija.
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

      {/* Phone-only contact rail: the booking action is primary; the second
          action shows the real handle so the destination is clear before a
          visitor leaves the page. */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1.45fr_1fr] border-t border-[var(--lav-line)] bg-[var(--lav-cream)] pb-[env(safe-area-inset-bottom)] md:hidden">
        <a
          href={studio.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="demo_booking"
          data-umami-event-demo="lavlav"
          data-umami-event-action="dikidi-sticky"
          className="inline-flex min-h-16 items-center justify-center gap-2.5 bg-[var(--lav-red)] px-3 text-white focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
        >
          <CalendarIcon className="h-5 w-5 shrink-0" />
          <span className="text-left">
            <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/75">DIKIDI</span>
            <span className="block text-sm font-semibold">Rezerviši termin</span>
          </span>
        </a>
        <a
          href={studio.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="demo_contact"
          data-umami-event-demo="lavlav"
          data-umami-event-action="instagram-sticky"
          className="inline-flex min-h-16 items-center justify-center gap-2 border-l border-[var(--lav-line)] px-2 text-[var(--lav-ink)] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--lav-red)]"
        >
          <InstagramIcon className="h-5 w-5 shrink-0 text-[var(--lav-red)]" />
          <span className="text-left">
            <span className="block text-[0.6rem] uppercase tracking-[0.14em] text-[var(--lav-muted)]">Instagram</span>
            <span className="block text-xs font-semibold">@{studio.instagram}</span>
          </span>
        </a>
      </div>
    </div>
  );
}
