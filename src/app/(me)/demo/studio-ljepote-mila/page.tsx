import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Onest } from "next/font/google";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { entrances, portrait, runningFoot, signature, studio, treatments } from "./data";
import styles from "./mila.module.css";

/* Cormorant Garamond at 500/600 rather than 300/400: the light weights turn to
   thread at masthead sizes on a cold ground, and the whole concept is a drawn
   line that has to hold. Its real italic — not a slanted roman — is why the two
   accented words on the page can be italic at all. Onest carries every word a
   visitor actually has to read. latin-ext for č/ć/š/ž/đ. */
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
   magazine's furniture: rubric names, running foot, captions, CTAs. */
const label = "text-[0.56rem] font-medium uppercase tracking-[0.18em] sm:text-[0.66rem] sm:tracking-[0.24em]";
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--mila-rose-deep)]";
const focusLight =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--mila-rose-light)]";

/* Button geometry: radius 0 everywhere, and exactly one filled rectangle on the
   page. Every other action is a word with a rose rule that grows under it, so
   the page never grows a second visual voice competing with the type. */
const primaryCta = `inline-flex min-h-12 items-center justify-center bg-[var(--mila-carbon)] px-8 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--mila-on-carbon)] transition-colors hover:bg-[var(--mila-rose-deep)] ${focus}`;
const textCta = `${styles.inkline} inline-flex min-h-12 items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${focus}`;
const textCtaLight = `${styles.inkline} ${styles.inklineLight} inline-flex min-h-12 items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--mila-on-carbon)] ${focusLight}`;

/* The three rubrics step right down a fixed set of hairlines while their decks
   stay locked in one right-hand column — a contents spread, where the tension
   is between the cascade and the alignment it never breaks. Indexed rather than
   keyed by id on purpose: here the position in the list *is* the meaning, so a
   reordered list should get a reordered staircase. */
const RUBRIC_INDENT = ["", "md:pl-10 lg:pl-24", "md:pl-20 lg:pl-48"];

export default function StudioLjepoteMilaPage() {
  return (
    <div
      className={`${styles.page} ${display.variable} ${sans.variable} min-h-screen bg-[var(--mila-porcelain)] text-[var(--mila-ink)] [font-family:var(--font-mila-sans),system-ui,sans-serif]`}
    >
      <VibeLabBar />

      {/* A magazine masthead, not a header bar: a thin utility strip of tracked
          capitals, then the studio's name set as large as the measure allows,
          ruled off underneath. Nothing is boxed and nothing floats. */}
      <header>
        <div className="border-b border-[var(--mila-silver)]">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 sm:gap-6 sm:px-8">
            <nav aria-label="Glavna navigacija" className="flex items-center gap-3.5 sm:gap-7">
              {[
                /* Potpis steps out below 420px so the four anchors and the
                   contact link never crowd each other on the narrowest phones —
                   the section is still one tap away from the Permanent makeup
                   rubric. */
                ["#tretmani", "Tretmani", ""],
                ["#potpis", "Potpis", "hidden min-[420px]:inline-flex"],
                ["#edukacije", "Edukacije", ""],
                ["#shop", "Shop", ""],
              ].map(([href, text, visibility]) => (
                <a
                  key={href}
                  href={href}
                  className={`${label} ${styles.inkline} ${visibility || "inline-flex"} min-h-11 items-center text-[var(--mila-muted)] transition-colors hover:text-[var(--mila-ink)] ${focus}`}
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
              className={`${label} ${styles.inkline} inline-flex min-h-11 shrink-0 items-center gap-1.5 text-[var(--mila-rose-deep)] ${focus}`}
            >
              Piši studiju <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-4 pt-7 sm:px-8 sm:pb-6 sm:pt-10">
          <p
            className={`${serif} text-[clamp(2.5rem,10.6vw,9.2rem)] font-medium leading-[0.86] tracking-[-0.025em]`}
          >
            Studio ljepote <em className="text-[var(--mila-rose-deep)]">Mila</em>
          </p>
          <span aria-hidden="true" className="mt-5 block h-px w-full bg-[var(--mila-rose)]" />
        </div>
      </header>

      <main id="vrh">
        {/* The cover: text on the left rail, the portrait mounted on a carbon
            panel that bleeds off the right edge of the screen and carries on
            into the running foot underneath. The photograph is the cut between
            the two grounds — the only place the page changes colour mid-line. */}
        <section>
          <div className="relative mx-auto grid max-w-6xl gap-y-9 px-5 pt-6 sm:px-8 sm:pt-10 lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:pt-12">
            {/* The carbon mount. It starts inside the container and runs off the
                right edge of the screen, so the portrait is half on porcelain
                and half on carbon — the page's one hard cut. Positioned, and
                first in the DOM, so the two positioned columns below paint over
                it without anyone needing a z-index. */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-[54%] right-[calc(50%-50vw)] hidden bg-[var(--mila-carbon)] lg:block"
            />

            <div className="relative pb-10 lg:col-span-6 lg:pb-0">
              <div>
                {/* The cover byline: the portrait needs a name beside it, and
                    this is the only place on the page that gives it one. */}
                <p className={`${label} text-[var(--mila-rose-deep)]`}>
                  {studio.artist} — {studio.role}
                </p>
                <h1
                  className={`${serif} mt-5 text-[clamp(2.1rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] sm:mt-7`}
                >
                  Preciznost koja ostaje <em>prirodna</em>.
                </h1>
                <p className="mt-6 max-w-[32rem] text-pretty text-base leading-relaxed text-[var(--mila-muted)] sm:mt-7 sm:text-lg">
                  Tretmani, permanent makeup i edukacije pod jednim potpisom.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-1 sm:mt-10 lg:mt-12">
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

            {/* Inset from the top of the mount so the carbon reads as a mount
                rather than a bar beside the picture; flush with its bottom, so
                the portrait sits down onto the running foot. On wide screens it
                runs off the right edge of the screen with the mount instead of
                stopping at the container — otherwise the bleed is a strip of
                empty carbon beside the picture rather than the picture itself
                leaving the page. Only the tablet box is landscape, so it is the
                one width where the vertical crop does anything — 6% keeps the
                flower and the hairline in frame. */}
            {/* The bleed is written in vw and px only. A percentage margin on a
                grid item resolves against its own cell, not against the
                container, so the `50% - 50vw` the mount above uses would
                overrun the page by the width of the cell if it were repeated
                here. Below 1216px the container has not reached its max width
                and its own padding is the whole distance to the screen edge;
                above it the container is centred and the distance grows with
                the viewport — `min()` picks whichever of the two applies. */}
            <div className="relative lg:col-span-5 lg:col-start-8 lg:mr-[min(-2rem,544px_-_50vw)] lg:pt-14">
              <DemoPhoto
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                priority
                sizes="(min-width: 1024px) 43vw, 92vw"
                className="h-[27rem] w-full object-cover object-[50%_16%] min-[430px]:h-[30rem] md:h-[30rem] md:object-[50%_6%] lg:h-[34rem]"
              />
            </div>
          </div>

          {/* The running foot: where the studio is, and everything it does, in
              one line of capitals. It is the band the portrait sits down onto. */}
          <div className="bg-[var(--mila-carbon)]">
            <div className="mx-auto flex max-w-6xl flex-col gap-y-2 px-5 py-4 sm:px-8 lg:flex-row lg:items-baseline lg:justify-between lg:gap-x-10">
              <p className={`${label} text-[var(--mila-on-carbon)]`}>
                {studio.name} — {studio.area}
              </p>
              <p className={`${label} text-[var(--mila-on-carbon-muted)]`}>
                {runningFoot.join(" · ")}
              </p>
            </div>
          </div>
        </section>

        {/* Three rubrics, not three cards: the words are the interface. */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className={`${label} text-[var(--mila-rose-deep)]`}>Tri ulaza</h2>

          <ul className="mt-8 sm:mt-10">
            {entrances.map((entrance, index) => (
              <li key={entrance.id} className="border-t border-[var(--mila-rose-soft)] last:border-b">
                <a
                  href={entrance.href}
                  className={`${styles.rubric} block py-7 sm:py-9 md:grid md:grid-cols-[minmax(0,1fr)_16rem] md:items-baseline md:gap-x-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-x-16 ${focus}`}
                >
                  <h3
                    className={`${serif} text-[clamp(1.9rem,5.4vw,3.5rem)] font-medium leading-[1.0] tracking-[-0.025em] ${RUBRIC_INDENT[index]}`}
                  >
                    <span className={styles.rubricWord}>{entrance.title}</span>
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--mila-muted)] md:mt-0">
                    {entrance.deck}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* The artist section is the signature itself. No second photograph:
            the studio published one portrait, and printing it twice would be
            the tell that this is a template. */}
        <section
          id="potpis"
          className="scroll-mt-6 border-y border-[var(--mila-silver)] bg-[var(--mila-porcelain-deep)]"
        >
          <div className="mx-auto grid max-w-6xl gap-y-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-6">
              <h2
                className={`${serif} max-w-lg text-[clamp(1.7rem,3.6vw,2.7rem)] font-medium leading-[1.08] tracking-[-0.015em]`}
              >
                Jedan <em>potpis</em> nad tretmanima, edukacijama i shopom.
              </h2>
              <p className="mt-8 max-w-md leading-relaxed text-[var(--mila-muted)]">
                {studio.artist} je {studio.role}. Isti rukopis stoji iza tretmana u studiju, iza
                obuka i iza izbora preparata u shopu.
              </p>
              <p className="mt-4 max-w-md leading-relaxed text-[var(--mila-muted)]">
                Permanent makeup je rad milimetrom: pigment se polaže u tankim potezima, tako da crta
                prati oblik lica umjesto da ga nadglasa. Ništa se ne radi na brzinu i ništa se ne
                obećava unaprijed.
              </p>
            </div>

            <figure className="lg:col-span-5 lg:col-start-8 lg:self-end">
              <p className={`${label} text-[var(--mila-rose-deep)]`}>Potpis</p>
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
                className={`${styles.signature} mt-6 block h-auto w-full max-w-[26rem]`}
              />
              <figcaption className="mt-6 border-t border-[var(--mila-rose-soft)] pt-4 text-sm text-[var(--mila-muted)]">
                {studio.artist} — {studio.role}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* The index: six categories, one line each, ruled in rose. */}
        <section id="tretmani" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
              <h2
                className={`${serif} text-[clamp(1.7rem,3.8vw,2.8rem)] font-medium leading-[1.06] tracking-[-0.015em] lg:col-span-5`}
              >
                Šta se radi u studiju.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--mila-muted)] lg:col-span-4 lg:col-start-9 lg:mt-2">
                Šest kategorija rada. Plan i termin dogovaraju se porukom, prije nego što se bilo šta
                počne.
              </p>
            </div>

            <dl className="mt-12 sm:mt-16">
              {treatments.map((treatment) => (
                <div
                  key={treatment.title}
                  className="grid gap-x-10 gap-y-1.5 border-t border-[var(--mila-rose-soft)] py-6 last:border-b sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:py-7"
                >
                  <dt
                    className={`${serif} text-[clamp(1.3rem,2.6vw,1.85rem)] font-medium leading-tight tracking-[-0.01em]`}
                  >
                    {treatment.title}
                  </dt>
                  <dd className="max-w-lg text-sm leading-relaxed text-[var(--mila-muted)]">
                    {treatment.line}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* The one dark spread — the page's loudest moment, given to the part of
            the business that is hardest to explain in a caption. */}
        <section
          id="edukacije"
          className="scroll-mt-6 bg-[var(--mila-carbon)] text-[var(--mila-on-carbon)]"
        >
          <div className="mx-auto grid max-w-6xl gap-y-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:items-end lg:gap-x-8">
            <div className="lg:col-span-7">
              <h2
                className={`${serif} text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.02em]`}
              >
                Edukacije pod <em>istim</em> potpisom.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="max-w-sm leading-relaxed text-[var(--mila-on-carbon-muted)]">
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
                className={`${textCtaLight} mt-4`}
              >
                Piši studiju <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* The shop already exists and works. This band is a door to it, not a
            replacement for it — so it gets its own ground and no product grid. */}
        <section id="shop" className="scroll-mt-6 bg-[var(--mila-rose-wash)]">
          {/* A bridge reads across, not down: label, sentence and door sit on one
              baseline row so this band is visibly shorter and flatter than the
              two full spreads it sits between. */}
          <div className="mx-auto grid max-w-6xl gap-y-6 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-12 lg:items-baseline lg:gap-x-8">
            <div className="lg:col-span-4">
              <h2
                className={`${serif} max-w-xs text-[clamp(1.5rem,2.8vw,2rem)] font-medium leading-[1.08] tracking-[-0.015em]`}
              >
                Profesionalni shop već postoji.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--mila-muted)] lg:col-span-5 lg:col-start-6 lg:text-base">
              Preparati i pribor koje studio koristi naručuju se preko zvanične online prodavnice.
              Ovaj koncept je samo ulaz — shop ostaje tamo gdje jeste.
            </p>
            <div className="lg:col-span-2 lg:col-start-11 lg:justify-self-end">
              <a
                href={studio.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="studio-ljepote-mila"
                data-umami-event-action="shop-bridge"
                className={textCta}
              >
                Posjeti shop <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section id="kontakt" className="scroll-mt-6">
          <div className="mx-auto grid max-w-6xl gap-y-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:items-end lg:gap-x-8">
            <div className="lg:col-span-6">
              <h2 className={`${label} text-[var(--mila-rose-deep)]`}>Dolazak</h2>
              <p
                className={`${serif} mt-6 text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.02em]`}
              >
                {studio.area}
              </p>
              <p className="mt-7 max-w-md leading-relaxed text-[var(--mila-muted)]">
                Tačna adresa i termin dogovaraju se u poruci — najkraće je pisati prije dolaska.
              </p>
            </div>

            {/* One contact route, written out large enough to be the last thing
                anyone reads. Its rule is permanent rather than on hover: nobody
                hovers the final call to action before deciding. */}
            <address className="not-italic lg:col-span-5 lg:col-start-8">
              <a
                href={studio.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="studio-ljepote-mila"
                data-umami-event-action="instagram-kontakt"
                className={`inline-flex min-h-12 flex-col justify-center gap-2 transition-colors hover:text-[var(--mila-rose-deep)] ${focus}`}
              >
                <span className={`${label} text-[var(--mila-rose-deep)]`}>Piši studiju</span>
                <span className={`${serif} ${styles.drawn} text-[clamp(1.35rem,3vw,2rem)] leading-tight tracking-[-0.01em]`}>
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
