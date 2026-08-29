import type { Metadata } from "next";
import Link from "next/link";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { MapEmbed } from "@/components/demo/MapEmbed";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { InstagramIcon, WhatsAppIcon } from "@/components/demo/ContactIcons";
import { artists, beforeVisit, hero, services, studio, works } from "./data";
import styles from "./kraft.module.css";

/* Archivo is a grotesque with a wide range and no soft edges — it holds a
   headline at 5rem and a caption at 12px without changing character. Plex Mono
   carries the workshop labels: position, artist, address. latin-ext for
   č/ć/š/ž/đ. */
const sans = Archivo({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-kraft-sans",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-kraft-mono",
});

export const metadata: Metadata = {
  title: "KraftArt — tattoo i piercing studio, Podgorica | Dizajn koncept",
  description:
    "Dizajn koncept za tattoo i piercing studio KraftArt u Podgorici: izbor radova, usluge, priprema za termin i kontakt.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-kraftart.png"] },
};

const label =
  "[font-family:var(--font-kraft-mono),ui-monospace,monospace] text-[0.7rem] uppercase tracking-[0.14em]";
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--kraft-oxide)]";
const primaryCta = `inline-flex min-h-12 items-center justify-center bg-[var(--kraft-ink)] px-7 text-sm font-semibold text-[var(--kraft-bone)] transition-colors hover:bg-[var(--kraft-oxide)] ${focus}`;
const secondaryCta = `inline-flex min-h-12 items-center justify-center border border-[var(--kraft-ink)] px-7 text-sm font-semibold transition-colors hover:bg-[var(--kraft-ink)] hover:text-[var(--kraft-bone)] ${focus}`;

/* Five frames on a twelve-column rail, in two full rows: one wide piece and
   two narrow ones, then a pair. The eye lands on a whole arm before it starts
   scanning thumbnails, and no row trails off into empty columns.

   Keyed by photo src rather than array index: an index-based lookup goes
   silently out of sync the moment a work is added, removed or reordered in
   data.ts, and nothing would catch it. Record<(typeof works)[number]["src"], …>
   forces TypeScript to error if a work's src doesn't have a matching layout
   entry here. */
const WORK_LAYOUT: Record<(typeof works)[number]["src"], { span: string; box: string }> = {
  "/demo/kraftart/limun": {
    span: "sm:col-span-2 lg:col-span-6",
    box: "aspect-[4/5] lg:aspect-[5/4]",
  },
  "/demo/kraftart/orah": {
    span: "lg:col-span-3",
    box: "aspect-[4/5]",
  },
  "/demo/kraftart/katane": {
    span: "lg:col-span-3",
    box: "aspect-[4/5]",
  },
  "/demo/kraftart/talas": {
    span: "lg:col-span-6",
    box: "aspect-[4/5] lg:aspect-square",
  },
  "/demo/kraftart/piercing": {
    span: "lg:col-span-6",
    box: "aspect-[4/5] lg:aspect-square",
  },
};

export default function KraftArtPage() {
  return (
    <div
      className={`${styles.page} ${sans.variable} ${mono.variable} min-h-screen bg-[var(--kraft-bone)] pb-[calc(5rem+env(safe-area-inset-bottom))] text-[var(--kraft-ink)] [font-family:var(--font-kraft-sans),system-ui,sans-serif] md:pb-0`}
    >
      <VibeLabBar />

      <header className="border-b border-[var(--kraft-ink)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-3 sm:px-8">
          <a
            href="#vrh"
            className={`inline-flex min-h-11 items-center text-lg font-extrabold uppercase tracking-[-0.02em] ${focus}`}
          >
            Kraft<span className="text-[var(--kraft-oxide)]">Art</span>
          </a>
          <nav aria-label="Glavna navigacija" className="hidden items-center gap-7 md:flex">
            {[
              ["#radovi", "Radovi"],
              ["#usluge", "Usluge"],
              ["#priprema", "Prije termina"],
              ["#kontakt", "Kontakt"],
            ].map(([href, text]) => (
              <a
                key={href}
                href={href}
                className={`${label} text-[var(--kraft-gray)] transition-colors hover:text-[var(--kraft-ink)] ${focus}`}
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
            data-umami-event-demo="kraftart"
            data-umami-event-action="instagram-header"
            className={`hidden min-h-11 items-center bg-[var(--kraft-oxide)] px-4 text-xs font-bold uppercase tracking-[0.08em] text-[var(--kraft-bone)] transition-colors hover:bg-[var(--kraft-ink)] sm:inline-flex ${focus}`}
          >
            Zakaži termin
          </a>
        </div>
      </header>

      <main id="vrh">
        {/* One finished piece, at full height, before a single claim is made. */}
        <section className="border-b border-[var(--kraft-ink)]">
          <div className="mx-auto grid max-w-6xl lg:grid-cols-[1fr_0.8fr]">
            <div className="order-2 flex flex-col justify-between gap-10 px-5 pb-12 pt-8 sm:px-8 sm:py-16 lg:order-1 lg:border-r lg:border-[var(--kraft-ink)] lg:pr-12">
              <div>
                <p className={`${label} text-[var(--kraft-oxide)]`}>
                  Tattoo &amp; Piercing Studio · {studio.city}
                </p>
                <h1 className="mt-7 text-[clamp(2.75rem,9vw,5.25rem)] font-extrabold leading-[0.92] tracking-[-0.035em]">
                  Dođite da
                  <br />
                  se crtamo.
                </h1>
                <p className="mt-7 max-w-md leading-relaxed text-[var(--kraft-gray)]">
                  Tetovaže i piercing uz obavezno zakazivanje, konsultaciju i fokus na higijenu.
                </p>
              </div>

              <div>
                <div className="flex flex-col gap-3 border-t border-[var(--kraft-line)] pt-8 sm:flex-row">
                  <a
                    href={studio.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="demo_contact"
                    data-umami-event-demo="kraftart"
                    data-umami-event-action="instagram-hero"
                    className={primaryCta}
                  >
                    Zakaži termin
                  </a>
                  <a href="#radovi" className={secondaryCta}>
                    Pogledaj radove
                  </a>
                </div>
                <p className={`mt-7 ${label} text-[var(--kraft-gray)]`}>
                  {studio.address}
                  <br />
                  Subotom zatvoreno
                </p>
              </div>
            </div>

            {/* No caption plate here: the studio burns its own watermark and
                the artist's handle into the bottom of every photograph, and a
                second credit lands straight on top of it. */}
            <DemoPhoto
              src={hero.src}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="order-1 h-60 w-full object-cover min-[380px]:h-72 sm:h-[32rem] lg:order-2 lg:h-full lg:min-h-[34rem]"
            />
          </div>
        </section>

        {/* The portfolio is the point of the page, so it comes before the words
            and each frame opens the studio's own post rather than a lightbox. */}
        <section id="radovi" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="flex flex-col gap-4 border-b border-[var(--kraft-ink)] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">Radovi</h2>
              <p className={`${label} text-[var(--kraft-gray)]`}>
                Izbor sa zvaničnog profila · klik otvara objavu
              </p>
            </div>

            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-12">
              {works.map((work) => (
                <li key={work.src} className={WORK_LAYOUT[work.src].span}>
                  <a
                    href={work.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="demo_portfolio"
                    data-umami-event-demo="kraftart"
                    data-umami-event-work={work.src.split("/").pop()}
                    className={`${styles.frame} group block ${focus}`}
                  >
                    <div className={`${styles.wipe} overflow-hidden bg-[var(--kraft-paper)]`}>
                      <DemoPhoto
                        src={work.src}
                        alt={work.alt}
                        width={work.width}
                        height={work.height}
                        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 46vw, 92vw"
                        className={`w-full object-cover ${WORK_LAYOUT[work.src].box}`}
                      />
                    </div>
                    <div className="flex items-baseline justify-between gap-4 pt-3">
                      <span className={`${label} text-[var(--kraft-gray)]`}>@{work.artist}</span>
                      <span className={`${label} text-[var(--kraft-ink)]`}>Objava</span>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`${styles.bar} mt-2 block h-0.5 w-full bg-[var(--kraft-oxide)]`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="usluge" className="scroll-mt-6 border-y border-[var(--kraft-ink)] bg-[var(--kraft-paper)]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <h2 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">Usluge</h2>
            <dl className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {services.map((service) => (
                <div key={service.id} className={styles.slide}>
                  <dt>
                    <span className="block text-2xl font-bold tracking-[-0.02em]">
                      {service.title}
                    </span>
                  </dt>
                  <dd className="mt-3 max-w-sm leading-relaxed text-[var(--kraft-gray)]">
                    {service.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Two handles, nothing else. We have no biographies to print and will
            not invent any. */}
        <section aria-label="Umjetnici" className="border-b border-[var(--kraft-ink)]">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className={`${label} text-[var(--kraft-gray)]`}>Radove potpisuju</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {artists.map((artist) => (
                <li key={artist.handle}>
                  <a
                    href={artist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="demo_contact"
                    data-umami-event-demo="kraftart"
                    data-umami-event-action={`artist-${artist.handle}`}
                    className={`inline-flex min-h-11 items-center text-xl font-bold tracking-[-0.02em] underline decoration-[var(--kraft-oxide)] decoration-2 underline-offset-[6px] hover:text-[var(--kraft-oxide)] ${focus}`}
                  >
                    @{artist.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* A workshop checklist, not a row of cards: title and intro run full
            width, then each step is one line across the whole measure, split
            by hairline rules rather than boxed off from its neighbours. */}
        <section id="priprema" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <h2 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
              Prije termina
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-[var(--kraft-gray)]">
              Tri stvari u prvoj poruci skraćuju dogovor sa nekoliko dana na jedno popodne.
            </p>

            <ol className="mt-10">
              {beforeVisit.map((step, index) => (
                <li
                  key={step.title}
                  className={`grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 py-8 sm:grid-cols-[3rem_1fr_1.4fr] sm:items-baseline sm:gap-y-0 ${
                    index === 0 ? "" : "border-t border-[var(--kraft-line)]"
                  } ${styles.slide}`}
                >
                  <span
                    aria-hidden="true"
                    className="col-start-1 row-start-1 mt-1.5 block h-1 w-10 bg-[var(--kraft-oxide)] sm:mt-0"
                  />
                  <h3 className="col-start-2 row-start-1 text-xl font-bold tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="col-start-2 text-sm leading-relaxed text-[var(--kraft-gray)] sm:col-start-3 sm:row-start-1">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="kontakt" className="scroll-mt-6 border-t border-[var(--kraft-ink)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">Kontakt</h2>
              <p className="mt-6 max-w-sm leading-relaxed text-[var(--kraft-gray)]">
                Javi se kako ti je najlakše — sve četiri linije vode do istog studija.
              </p>

              <ul className="mt-8 border-t border-[var(--kraft-ink)]">
                {[
                  {
                    key: "whatsapp",
                    href: studio.whatsappUrl,
                    text: "WhatsApp",
                    meta: studio.phoneDisplay,
                    external: true,
                  },
                  {
                    key: "instagram",
                    href: studio.instagramUrl,
                    text: "Instagram DM",
                    meta: `@${studio.instagram}`,
                    external: true,
                  },
                  {
                    key: "viber",
                    href: studio.viberUrl,
                    text: "Viber",
                    meta: studio.phoneDisplay,
                    external: false,
                  },
                  {
                    key: "phone",
                    href: studio.phoneUrl,
                    text: "Poziv",
                    meta: studio.phoneDisplay,
                    external: false,
                  },
                ].map((row) => (
                  <li key={row.key} className="border-b border-[var(--kraft-line)]">
                    <a
                      href={row.href}
                      {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      data-umami-event="demo_contact"
                      data-umami-event-demo="kraftart"
                      data-umami-event-action={row.key}
                      className={`flex min-h-14 items-center justify-between gap-4 transition-colors hover:text-[var(--kraft-oxide)] ${focus}`}
                    >
                      <span className="text-lg font-bold tracking-[-0.02em]">{row.text}</span>
                      <span className={`${label} text-[var(--kraft-gray)]`}>{row.meta}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <address className={`mt-8 ${label} not-italic leading-relaxed text-[var(--kraft-gray)]`}>
                {studio.address}
                <br />
                Subotom zatvoreno
              </address>
            </div>

            <div className="border border-[var(--kraft-ink)] p-1.5">
              <MapEmbed
                query={studio.mapQuery}
                title={`Mapa — ${studio.address}`}
                className="h-72 w-full max-w-full border-0 grayscale lg:h-full lg:min-h-80"
                buttonClassName={primaryCta}
                linkClassName={`${label} underline underline-offset-4 ${focus}`}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--kraft-ink)] bg-[var(--kraft-ink)] text-[var(--kraft-bone)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className="text-lg font-extrabold uppercase tracking-[-0.02em]">
              Kraft<span className="text-[var(--kraft-oxide-bright)]">Art</span>
            </p>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-[var(--kraft-bone)]/70">
              Nezvanični dizajn koncept. Fotografije i podaci preuzeti su sa javnog Instagram profila
              studija i služe samo za prikaz ideje.
            </p>
          </div>
          <p className="text-xs text-[var(--kraft-bone)]/70">
            Koncept:{" "}
            <Link
              href="/"
              className={`inline-flex min-h-11 items-center font-bold text-[var(--kraft-bone)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--kraft-bone)]`}
            >
              VibeLab
            </Link>
          </p>
        </div>
      </footer>

      {/* Phone-only contact slab. It keeps KraftArt's hard workshop edges and
          names both destinations instead of making the visitor guess. */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[0.9fr_1.1fr] border-t-2 border-[var(--kraft-ink)] bg-[var(--kraft-bone)] pb-[env(safe-area-inset-bottom)] md:hidden">
        <a
          href={studio.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="demo_contact"
          data-umami-event-demo="kraftart"
          data-umami-event-action="whatsapp-sticky"
          className="inline-flex min-h-16 items-center justify-center gap-2.5 bg-[var(--kraft-ink)] px-3 text-[var(--kraft-bone)] focus-visible:outline-2 focus-visible:outline-offset-[-5px] focus-visible:outline-[var(--kraft-oxide-bright)]"
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0 text-[var(--kraft-oxide-bright)]" />
          <span className="text-left">
            <span className={`${label} block text-[var(--kraft-bone)]/65`}>Termin</span>
            <span className="block text-sm font-bold">WhatsApp</span>
          </span>
        </a>
        <a
          href={studio.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="demo_contact"
          data-umami-event-demo="kraftart"
          data-umami-event-action="instagram-sticky"
          className="inline-flex min-h-16 items-center justify-center gap-2 border-l-2 border-[var(--kraft-ink)] bg-[var(--kraft-bone)] px-2 text-[var(--kraft-ink)] focus-visible:outline-2 focus-visible:outline-offset-[-5px] focus-visible:outline-[var(--kraft-oxide)]"
        >
          <InstagramIcon className="h-5 w-5 shrink-0 text-[var(--kraft-oxide)]" />
          <span className="min-w-0 text-left">
            <span className={`${label} block text-[var(--kraft-gray)]`}>Instagram</span>
            <span className="block truncate text-xs font-bold">@{studio.instagram}</span>
          </span>
        </a>
      </div>
    </div>
  );
}
