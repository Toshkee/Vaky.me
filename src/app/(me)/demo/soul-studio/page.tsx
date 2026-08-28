import type { Metadata } from "next";
import Link from "next/link";
import { Bodoni_Moda, Manrope } from "next/font/google";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { MapEmbed } from "@/components/demo/MapEmbed";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { gallery, hero, practices, studio } from "./data";
import styles from "./soul.module.css";

/* Bodoni's hairlines are the whole point at display sizes and unreadable below
   them, so it sets headings only; Manrope carries every word a visitor
   actually has to read. latin-ext for č/ć/š/ž/đ. */
const display = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-soul-display",
});
const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-soul-sans",
});

export const metadata: Metadata = {
  title: "Soul Studio — Yoga & Reformer Pilates, Podgorica | Dizajn koncept",
  description:
    "Dizajn koncept za Soul Studio u Podgorici: razlika između joge i Reformer Pilatesa, prostor, lokacija i kontakt za termin.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-soul-studio.png"] },
};

const serif = "[font-family:var(--font-soul-display),Georgia,serif]";
const eyebrow = "text-[0.7rem] font-semibold uppercase tracking-[0.28em]";
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--soul-clay-deep)]";
const primaryCta = `inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--soul-clay-deep)] px-7 text-sm font-semibold text-[var(--soul-bone)] transition-colors hover:bg-[var(--soul-ink)] ${focus}`;
const secondaryCta = `inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--soul-line)] px-7 text-sm font-semibold transition-colors hover:border-[var(--soul-ink)] ${focus}`;

/* Per-cell placement for the four gallery frames, in `gallery` order:
   poruka (tall) · reformer · sala · pokret (wide). */
const GALLERY_CELL = ["sm:row-span-2", "", "", "sm:col-span-2"];
const GALLERY_BOX = ["aspect-[4/5] sm:aspect-auto sm:h-full", "h-56 sm:h-64", "h-56 sm:h-64", "h-56 sm:h-72"];

function Hairline({ clay = false }: { clay?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`${styles.rule} block h-px w-full ${clay ? "bg-[var(--soul-line-clay)]" : "bg-[var(--soul-line)]"}`}
    />
  );
}

export default function SoulStudioPage() {
  return (
    <div
      className={`${styles.page} ${display.variable} ${sans.variable} min-h-screen bg-[var(--soul-bone)] pb-[calc(5rem+env(safe-area-inset-bottom))] text-[var(--soul-ink)] [font-family:var(--font-soul-sans),system-ui,sans-serif] md:pb-0`}
    >
      <VibeLabBar />

      <header className="border-b border-[var(--soul-line)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <a
            href="#vrh"
            className={`${serif} inline-flex min-h-11 items-center text-xl tracking-tight ${focus}`}
          >
            Soul Studio
          </a>
          <nav aria-label="Glavna navigacija" className="hidden items-center gap-8 md:flex">
            {[
              ["#prakse", "Prakse"],
              ["#pristup", "Pristup"],
              ["#prostor", "Prostor"],
              ["#kontakt", "Kontakt"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className={`${eyebrow} text-[var(--soul-muted)] transition-colors hover:text-[var(--soul-ink)] ${focus}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href={studio.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="demo_contact"
            data-umami-event-demo="soul-studio"
            data-umami-event-action="instagram-header"
            className={`hidden min-h-10 items-center rounded-full border border-[var(--soul-clay-deep)] px-5 text-xs font-semibold text-[var(--soul-clay-deep)] transition-colors hover:bg-[var(--soul-clay-deep)] hover:text-[var(--soul-bone)] sm:inline-flex ${focus}`}
          >
            Javi se za termin
          </a>
        </div>
      </header>

      <main id="vrh">
        {/* Text on the left rail, one photograph on the right cut into an arch —
            the same arch the studio has built into its own back wall. It is the
            only rounded crop on the page. */}
        <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <p className={`${eyebrow} text-[var(--soul-clay-deep)]`}>
              {studio.tagline} · {studio.city}
            </p>
            <h1
              className={`${serif} mt-6 text-[clamp(2.75rem,9vw,5rem)] leading-[0.98] tracking-[-0.02em]`}
            >
              Pokret.
              <br />
              Disanje.
              <br />
              <em className="text-[var(--soul-clay)]">Prisustvo.</em>
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-[var(--soul-muted)] sm:text-lg">
              Yoga i Reformer Pilates u prostoru u kojem svaki pokret ima svrhu — za snagu, lakoću i
              vrijeme posvećeno sebi.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={studio.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="soul-studio"
                data-umami-event-action="instagram-hero"
                className={primaryCta}
              >
                Javi se za termin
              </a>
              <a
                href={studio.phoneUrl}
                data-umami-event="demo_contact"
                data-umami-event-demo="soul-studio"
                data-umami-event-action="phone-hero"
                className={secondaryCta}
              >
                Pozovi studio
              </a>
            </div>
            <p className="mt-8 text-sm text-[var(--soul-muted)]">{studio.address}</p>
          </div>

          <div className="overflow-hidden rounded-t-[14rem] rounded-b-sm">
            <DemoPhoto
              src={hero.src}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              priority
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="h-[22rem] w-full object-cover sm:h-[30rem] lg:h-[34rem]"
            />
          </div>
        </section>

        {/* The two practices, written against each other — the one thing a
            newcomer needs to know before they write. */}
        <section id="prakse" className="scroll-mt-6 border-t border-[var(--soul-line)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <h2
              className={`${serif} max-w-xl text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.08] tracking-tight`}
            >
              Dvije prakse, jedan prostor.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--soul-muted)]">
              Rade zajedno, ali se ne rade isto. Ovako izgleda razlika prije nego što prvi put uđeš u
              salu.
            </p>

            <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-x-16">
              {practices.map((practice, index) => (
                <article key={practice.id}>
                  <Hairline clay />
                  <p className={`mt-6 ${eyebrow} text-[var(--soul-clay-deep)]`}>
                    {practice.eyebrow} — 0{index + 1}
                  </p>
                  <h3 className={`${serif} mt-4 text-4xl tracking-tight sm:text-5xl`}>
                    {practice.title}
                  </h3>
                  <p className="mt-5 max-w-md leading-relaxed">{practice.body}</p>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--soul-muted)]">
                    {practice.note}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* The studio's own motto, set as the largest thing on the page. */}
        <section id="pristup" className="scroll-mt-6 bg-[var(--soul-sand)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div>
                <p className={`${eyebrow} text-[var(--soul-clay-deep)]`}>Soul pristup</p>
                <h2
                  className={`${serif} mt-5 text-[clamp(1.9rem,4.5vw,2.75rem)] leading-[1.1] tracking-tight`}
                >
                  Tijelo prvo. Ostalo dolazi za njim.
                </h2>
                <p className="mt-6 max-w-sm leading-relaxed text-[var(--soul-muted)]">
                  Ista rečenica stoji na zidu sale i ispod objava studija. Nije slogan — to je
                  redoslijed po kojem se radi.
                </p>
              </div>

              <ul className="grid content-center gap-6">
                {studio.motto.map((line) => (
                  <li key={line}>
                    <Hairline />
                    <p
                      className={`${serif} mt-5 text-[clamp(1.75rem,6vw,3.25rem)] leading-none tracking-tight`}
                    >
                      {line}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Story and space share one grid, so the text never sits alone in a
            full-width column. */}
        <section id="prostor" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div className="lg:sticky lg:top-8 lg:self-start">
                <p className={`${eyebrow} text-[var(--soul-clay-deep)]`}>Prostor i priča</p>
                <h2
                  className={`${serif} mt-5 text-[clamp(1.9rem,4.5vw,2.75rem)] leading-[1.1] tracking-tight`}
                >
                  Godine joge, pa prvi reformeri.
                </h2>
                <p className="mt-6 max-w-sm leading-relaxed text-[var(--soul-muted)]">
                  Soul Studio je izrastao iz dugogodišnjeg rada sa jogom. Prvi Reformer studio
                  otvoren je {studio.reformerSince}. godine — drvene sprave, topao enterijer i sala u
                  kojoj se čuje samo dah i opruga.
                </p>
                <p className="mt-4 max-w-sm leading-relaxed text-[var(--soul-muted)]">
                  Uz treninge se ponekad koriste aromaterapija i red light ambijent. Tu su zbog
                  atmosfere u prostoriji, ništa više od toga.
                </p>
              </div>

              {/* Deliberately uneven: the tall frame with the studio's own wall
                  lettering holds a full column, two square-ish frames stack
                  beside it, and the landscape frame closes the block. A 2×2 of
                  identical tiles is the grid this page is trying not to be. */}
              <ul className="grid gap-5 sm:grid-cols-2">
                {gallery.map((photo, index) => (
                  <li key={photo.src} className={GALLERY_CELL[index]}>
                    <div className={`${styles.reveal} h-full overflow-hidden rounded-sm`}>
                      <DemoPhoto
                        src={photo.src}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 92vw"
                        className={`w-full object-cover ${GALLERY_BOX[index]}`}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="kontakt" className="scroll-mt-6 border-t border-[var(--soul-line)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className={`${eyebrow} text-[var(--soul-clay-deep)]`}>Dolazak</p>
              <h2
                className={`${serif} mt-5 text-[clamp(1.9rem,4.5vw,2.75rem)] leading-[1.1] tracking-tight`}
              >
                Crnogorskih Serdara 45
              </h2>
              <address className="mt-7 not-italic">
                <p className="text-base">{studio.address}</p>
                <p className="mt-4">
                  <a
                    href={studio.phoneUrl}
                    data-umami-event="demo_contact"
                    data-umami-event-demo="soul-studio"
                    data-umami-event-action="phone-kontakt"
                    className={`text-lg font-semibold underline decoration-[var(--soul-clay)] decoration-2 underline-offset-8 hover:decoration-[var(--soul-ink)] ${focus}`}
                  >
                    {studio.phoneDisplay}
                  </a>
                </p>
                <p className="mt-4 text-sm text-[var(--soul-muted)]">
                  <a
                    href={studio.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="demo_contact"
                    data-umami-event-demo="soul-studio"
                    data-umami-event-action="instagram-kontakt"
                    className={`underline underline-offset-4 transition-colors hover:text-[var(--soul-ink)] ${focus}`}
                  >
                    @{studio.instagram} <span aria-hidden="true">↗</span>
                  </a>
                </p>
              </address>
              <p className="mt-8 max-w-sm text-sm leading-relaxed text-[var(--soul-muted)]">
                Za termin, raspored i sve ostalo javi se porukom na Instagram ili pozovi — dogovor
                ide direktno sa studijom.
              </p>
            </div>

            <div className="overflow-hidden rounded-sm border border-[var(--soul-line)]">
              <MapEmbed
                query={studio.mapQuery}
                title={`Mapa — ${studio.address}`}
                className="h-72 w-full max-w-full border-0 lg:h-full lg:min-h-80"
                buttonClassName={primaryCta}
                linkClassName={`text-xs underline underline-offset-4 ${focus}`}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--soul-line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className={`${serif} text-xl tracking-tight`}>Soul Studio</p>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-[var(--soul-muted)]">
              Nezvanični dizajn koncept. Fotografije i podaci preuzeti su sa javnog Instagram profila
              studija i služe samo za prikaz ideje.
            </p>
          </div>
          <p className="text-xs text-[var(--soul-muted)]">
            Koncept:{" "}
            <Link href="/" className={`font-semibold text-[var(--soul-ink)] hover:underline ${focus}`}>
              VibeLab
            </Link>
          </p>
        </div>
      </footer>

      {/* Phones only. It sits above the home indicator rather than under it, and
          the page carries matching bottom padding so the footer is never hidden
          behind it. */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[var(--soul-line)] bg-[var(--soul-bone)] px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 md:hidden">
        <a
          href={studio.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="demo_contact"
          data-umami-event-demo="soul-studio"
          data-umami-event-action="instagram-sticky"
          className={`inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--soul-clay-deep)] px-4 text-sm font-semibold text-[var(--soul-bone)] ${focus}`}
        >
          Javi se za termin
        </a>
        <a
          href={studio.phoneUrl}
          data-umami-event="demo_contact"
          data-umami-event-demo="soul-studio"
          data-umami-event-action="phone-sticky"
          className={`inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--soul-line)] px-4 text-sm font-semibold ${focus}`}
        >
          Pozovi
        </a>
      </div>
    </div>
  );
}
