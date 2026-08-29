import type { Metadata } from "next";
import Link from "next/link";
import { DM_Sans, Newsreader } from "next/font/google";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { MapEmbed } from "@/components/demo/MapEmbed";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { collections, hero, pieces, shop, steps } from "./data";
import styles from "./opal.module.css";

/* Newsreader has a proper drawn italic rather than a slanted roman, which is
   the only reason italics appear on this page at all. DM Sans keeps the
   interface quiet underneath it. latin-ext for č/ć/š/ž/đ. */
const display = Newsreader({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-opal-display",
});
const sans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-opal-sans",
});

export const metadata: Metadata = {
  title: "Zlatara Opal — izrada nakita po narudžbi, Podgorica | Dizajn koncept",
  description:
    "Dizajn koncept za Zlataru Opal u Podgorici: zlato i srebro, izrada nakita po narudžbi, galerija radova, lokacija i kontakt.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-zlatara-opal.png"] },
};

const serif = "[font-family:var(--font-opal-display),Georgia,serif]";
const eyebrow = "text-[0.68rem] font-medium uppercase tracking-[0.3em]";
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--opal-champagne-deep)]";
const primaryCta = `inline-flex min-h-12 items-center justify-center bg-[var(--opal-graphite)] px-7 text-sm font-medium text-[var(--opal-ivory)] transition-colors hover:bg-[var(--opal-champagne-deep)] ${focus}`;
/* The other three concepts share one recipe for a secondary action: an
   outline that fills solid on hover. Opal breaks it — a soft champagne fill
   from the start, no inversion — so the two buttons in the hero read as a
   pair rather than a primary/ghost combination. Graphite text on champagne
   at 25–45% opacity over ivory stays well past 4.5:1 in both states. */
const secondaryCta = `inline-flex min-h-12 items-center justify-center border border-[var(--opal-champagne)] bg-[var(--opal-champagne)]/25 px-7 text-sm font-medium transition-colors hover:bg-[var(--opal-champagne)]/45 ${focus}`;

/* Six frames on a twelve-column rail, two rows of three, no two the same
   width — the shop photographs one piece at a time and the grid should not
   pretend they arrived as a matched set.

   Keyed by photo src rather than array index: an index-based lookup goes
   silently out of sync the moment a piece is added, removed or reordered in
   data.ts, and nothing would catch it. Record<(typeof pieces)[number]["src"], …>
   forces TypeScript to error if a piece's src doesn't have a matching layout
   entry here. */
const PIECE_LAYOUT: Record<(typeof pieces)[number]["src"], { span: string; box: string }> = {
  "/demo/zlatara-opal/privezak": { span: "lg:col-span-4", box: "aspect-[4/5]" },
  "/demo/zlatara-opal/manzetne": { span: "lg:col-span-5", box: "aspect-[5/3]" },
  "/demo/zlatara-opal/bros": { span: "lg:col-span-3", box: "aspect-square" },
  /* Near-square source (1080x982), so it gets a square box — a 4/5 crop would
     cut the shoulders off and leave the tallest gap in the second row. */
  "/demo/zlatara-opal/ogrlica-detelina": { span: "lg:col-span-5", box: "aspect-square" },
  "/demo/zlatara-opal/narukvica": { span: "lg:col-span-3", box: "aspect-[4/5]" },
  "/demo/zlatara-opal/prsten": { span: "lg:col-span-4", box: "aspect-[6/5]" },
};

export default function ZlataraOpalPage() {
  return (
    <div
      className={`${styles.page} ${display.variable} ${sans.variable} min-h-screen bg-[var(--opal-ivory)] pb-[calc(5rem+env(safe-area-inset-bottom))] text-[var(--opal-graphite)] [font-family:var(--font-opal-sans),system-ui,sans-serif] md:pb-0`}
    >
      <VibeLabBar />

      <header className="border-b border-[var(--opal-line)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          {/* A typographic wordmark, not a reconstructed logo: the shop has no
              public mark we could reproduce honestly. */}
          <a href="#vrh" className={`inline-flex min-h-11 flex-col justify-center ${focus}`}>
            <span className={`${eyebrow} text-[var(--opal-champagne-deep)]`}>Zlatara</span>
            <span className={`${serif} text-xl leading-tight tracking-[0.06em]`}>OPAL</span>
          </a>
          <nav aria-label="Glavna navigacija" className="hidden items-center gap-8 md:flex">
            {[
              ["#kolekcije", "Kolekcije"],
              ["#narudzba", "Po narudžbi"],
              ["#radovi", "Iz radionice"],
              ["#kontakt", "Kontakt"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className={`${eyebrow} text-[var(--opal-muted)] transition-colors hover:text-[var(--opal-graphite)] ${focus}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href={shop.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="demo_contact"
            data-umami-event-demo="zlatara-opal"
            data-umami-event-action="instagram-header"
            className={`hidden min-h-10 items-center border border-[var(--opal-graphite)] px-5 text-xs font-medium transition-colors hover:bg-[var(--opal-graphite)] hover:text-[var(--opal-ivory)] sm:inline-flex ${focus}`}
          >
            Pošalji svoju ideju
          </a>
        </div>
      </header>

      <main id="vrh">
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-20">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="order-2 lg:order-1 lg:col-span-5">
              {/* Every other concept opens on a tracked-out capital eyebrow;
                  Opal opens on a serif italic sentence instead — the one
                  place the page announces its hand before the headline. */}
              <p className={`${serif} text-sm italic text-[var(--opal-champagne-deep)]`}>
                Zlato i srebro, po narudžbi
              </p>
              <h1
                className={`${serif} mt-5 text-[clamp(2.5rem,7.5vw,4.25rem)] sm:mt-7 leading-[1.02] tracking-[-0.015em]`}
              >
                Nakit koji nosi <em>tvoju priču</em>.
              </h1>
              <p className="mt-7 max-w-md leading-relaxed text-[var(--opal-muted)]">
                Unikatni komadi u srebru i zlatu, izrađeni prema tvojoj ideji — u srcu Zlatarske
                ulice.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={shop.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_contact"
                  data-umami-event-demo="zlatara-opal"
                  data-umami-event-action="instagram-hero"
                  className={primaryCta}
                >
                  Pošalji svoju ideju
                </a>
                <a href="#kontakt" className={secondaryCta}>
                  Posjeti zlataru
                </a>
              </div>
            </div>

            {/* The photograph runs past the text rail on the right and stops
                short of it on the left — the page is built off-centre. */}
            <figure className="order-1 lg:order-2 lg:col-span-7 lg:-mr-8 xl:-mr-16">
              <div className="overflow-hidden">
                <DemoPhoto
                  src={hero.src}
                  alt={hero.alt}
                  width={hero.width}
                  height={hero.height}
                  priority
                  sizes="(min-width: 1024px) 58vw, 92vw"
                  className="h-52 w-full object-cover min-[380px]:h-64 sm:h-[26rem] lg:h-[32rem]"
                />
              </div>
              <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 text-xs text-[var(--opal-muted)]">
                <span className={`${serif} text-sm text-[var(--opal-graphite)]`}>{hero.title}</span>
                <span className={eyebrow}>{hero.material}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="kolekcije" className="scroll-mt-6 border-t border-[var(--opal-line)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <h2
                  className={`${serif} text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.1] tracking-tight`}
                >
                  Četiri stvari, bez kataloga.
                </h2>
              </div>

              <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-8">
                {collections.map((collection) => (
                  <div key={collection.id}>
                    <span
                      aria-hidden="true"
                      className={`${styles.rule} mb-5 block h-px w-full bg-[var(--opal-champagne)]`}
                    />
                    <dt className={`${serif} text-2xl tracking-tight`}>{collection.title}</dt>
                    <dd className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--opal-muted)]">
                      {collection.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* The main event: this shop's product is the conversation, so the
            three steps get the page's widest type. */}
        <section id="narudzba" className="scroll-mt-6 bg-[var(--opal-shell)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <p className={`${eyebrow} text-[var(--opal-champagne-deep)]`}>Kako nastaje komad</p>
            <h2
              className={`${serif} mt-5 max-w-2xl text-[clamp(2rem,5vw,3.25rem)] leading-[1.06] tracking-tight`}
            >
              Od <em>crteža</em> do komada.
            </h2>

            <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
              {steps.map((step) => (
                <li key={step.n}>
                  <span
                    aria-hidden="true"
                    className={`${styles.rule} block h-px w-full bg-[var(--opal-graphite)]/30`}
                  />
                  <p className={`${serif} mt-6 text-4xl text-[var(--opal-champagne-deep)]`}>{step.n}</p>
                  <h3 className={`${serif} mt-3 text-2xl tracking-tight`}>{step.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--opal-muted)]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-12 max-w-xl text-sm leading-relaxed text-[var(--opal-muted)]">
              Nema korpe ni naručivanja preko sajta. Svaki komad se dogovara — porukom na Instagramu
              ili u radnji.
            </p>
          </div>
        </section>

        <section id="radovi" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  className={`${serif} text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.1] tracking-tight`}
                >
                  Šest komada, šest priča.
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-[var(--opal-muted)]">
                Izbor iz onoga što je izašlo iz radionice. Svaki je rađen za jednu osobu.
              </p>
            </div>

            <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
              {pieces.map((piece) => (
                <li key={piece.src} className={PIECE_LAYOUT[piece.src].span}>
                  <figure>
                    <div className="overflow-hidden">
                      <DemoPhoto
                        src={piece.src}
                        alt={piece.alt}
                        width={piece.width}
                        height={piece.height}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                        className={`${styles.settle} w-full object-cover ${PIECE_LAYOUT[piece.src].box}`}
                      />
                    </div>
                    <figcaption className="mt-4">
                      <p className={`${serif} text-lg leading-tight tracking-tight`}>{piece.title}</p>
                      <p className={`mt-1.5 ${eyebrow} text-[var(--opal-muted)]`}>{piece.material}</p>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* One cool note in a warm page — the only place the opal blue appears
            as a surface. */}
        <section className="border-y border-[var(--opal-line)] bg-[var(--opal-blue)]/25">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
            <div>
              <h2
                className={`${serif} text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.1] tracking-tight`}
              >
                Poklon koji ostaje.
              </h2>
            </div>
            <p className="max-w-md leading-relaxed text-[var(--opal-muted)]">
              Srebrne figure i komadi rađeni za posebne prilike — rođenja, krštenja, godišnjice i
              datume koji se ne zaboravljaju. Ako još ne znaš šta tačno tražiš, pošalji priliku i
              rok, pa krenemo odatle.
            </p>
          </div>
        </section>

        <section id="kontakt" className="scroll-mt-6">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className={`${eyebrow} text-[var(--opal-champagne-deep)]`}>Zlatarska ulica</p>
              <h2
                className={`${serif} mt-5 text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.1] tracking-tight`}
              >
                Miljana Vukova 2
              </h2>
              <address className="mt-7 not-italic">
                <p>{shop.address}</p>
                <p className="mt-5">
                  <a
                    href={shop.phoneUrl}
                    data-umami-event="demo_contact"
                    data-umami-event-demo="zlatara-opal"
                    data-umami-event-action="phone-kontakt"
                    className={`${styles.underline} ${serif} inline-flex min-h-11 items-center text-2xl tracking-tight ${focus}`}
                  >
                    {shop.phoneDisplay}
                  </a>
                </p>
                <p className="mt-5 text-sm">
                  <a
                    href={shop.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="demo_contact"
                    data-umami-event-demo="zlatara-opal"
                    data-umami-event-action="instagram-kontakt"
                    className={`${styles.underline} inline-flex min-h-11 items-center text-[var(--opal-muted)] ${focus}`}
                  >
                    @{shop.instagram} <span aria-hidden="true">↗</span>
                  </a>
                </p>
              </address>
              <p className="mt-8 max-w-sm text-sm leading-relaxed text-[var(--opal-muted)]">
                Radno vrijeme nije navedeno jer se javni izvori razlikuju — prije dolaska najkraće
                je pozvati.
              </p>
            </div>

            <div className="border border-[var(--opal-line)] p-1.5">
              <MapEmbed
                query={shop.mapQuery}
                title={`Mapa — ${shop.address}`}
                className="h-72 w-full max-w-full border-0 lg:h-full lg:min-h-80"
                buttonClassName={primaryCta}
                linkClassName={`text-xs underline underline-offset-4 ${focus}`}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--opal-line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className={`${serif} text-lg tracking-[0.06em]`}>ZLATARA OPAL</p>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-[var(--opal-muted)]">
              Nezvanični dizajn koncept. Fotografije i podaci preuzeti su sa javnog Instagram profila
              zlatare i služe samo za prikaz ideje.
            </p>
          </div>
          <p className="text-xs text-[var(--opal-muted)]">
            Koncept:{" "}
            <Link
              href="/"
              className={`inline-flex min-h-11 items-center font-medium text-[var(--opal-graphite)] hover:underline ${focus}`}
            >
              VibeLab
            </Link>
          </p>
        </div>
      </footer>

      {/* The other three concepts close on a bar of filled buttons; Opal
          closes on a plain dark strip of text instead — the two actions read
          as a line you speak, split by a champagne rule, not a pair of CTAs. */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 bg-[var(--opal-graphite)] pb-[env(safe-area-inset-bottom)] md:hidden">
        <a
          href={shop.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="demo_contact"
          data-umami-event-demo="zlatara-opal"
          data-umami-event-action="instagram-sticky"
          className={`${serif} inline-flex min-h-14 items-center justify-center text-base text-[var(--opal-ivory)] ${focus}`}
        >
          Javi se
        </a>
        <a
          href={shop.phoneUrl}
          data-umami-event="demo_contact"
          data-umami-event-demo="zlatara-opal"
          data-umami-event-action="phone-sticky"
          className={`${serif} inline-flex min-h-14 items-center justify-center border-l border-[var(--opal-champagne)]/40 text-base text-[var(--opal-ivory)] ${focus}`}
        >
          Pozovi
        </a>
      </div>
    </div>
  );
}
