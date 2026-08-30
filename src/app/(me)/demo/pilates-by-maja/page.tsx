import type { Metadata } from "next";
import Link from "next/link";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { InstagramIcon } from "@/components/demo/ContactIcons";
import {
  deck,
  disciplines,
  firstVisit,
  firstVisitPhoto,
  headline,
  heroPhoto,
  method,
  methodPhoto,
  publicRecord,
  studio,
  tracks,
  trainingPhoto,
} from "./data";
import styles from "./maja.module.css";

/* Instrument Serif carries every heading, and it is the whole reason this page
   stopped reading as a men's gym. A condensed grotesque set in caps is what a
   weights floor paints on its wall; a single-weight editorial serif set in
   sentence case is what a studio that teaches control writes. It exists in one
   weight and two styles, so the display voice cannot drift — the italic is the
   only emphasis available, and it is spent twice on the whole page.

   Instrument Sans reads everything anyone actually reads. Same family idea,
   built to sit under the serif without arguing with it. latin-ext on both, for
   č/ć/š/ž/đ: this copy is full of them ("vježbe", "opterećenjem", "držiš"),
   and the latin subset alone would silently fall back mid-word. */
const display = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-maja-display",
});
const sans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-maja-sans",
});

export const metadata: Metadata = {
  title: "Studio Pilates by Maja — grupni i personalni trening, Podgorica | Dizajn koncept",
  description:
    "Dizajn koncept za Studio Pilates by Maja u Podgorici: kontrolisan pokret, razlika između grupnog i personalnog treninga, kako izgleda prvi dolazak i direktan put do prijave.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-pilates-by-maja.png"] },
};

const serif = "[font-family:var(--font-maja-display),Georgia,'Times New Roman',serif]";

/* Two rings, chosen against the field the offset ring lands on rather than
   against the control it belongs to. Chalk and clay grounds take the petrol
   ring; the petrol band takes the chalk one. */
const focusOnLight =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--maja-ink)]";
const focusOnDark =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--maja-chalk)]";

/* Buttons are quiet rectangles with a 6px corner — a pill would read as a
   beauty page and a hard square as a gym one, and this studio is neither.
   Each variant carries its own ring: without one they inherit the site-wide
   brand red, which lands almost invisibly on the clay band. */
const ctaBase =
  "inline-flex min-h-14 items-center justify-center gap-2.5 rounded-[6px] px-7 text-[0.95rem] font-medium transition-colors";
const heroPrimary = `${ctaBase} bg-[var(--maja-ink)] text-[var(--maja-chalk)] hover:bg-[var(--maja-teal)] ${focusOnLight}`;
const heroSecondary = `${ctaBase} border border-[var(--maja-ink)] text-[var(--maja-ink)] hover:bg-[var(--maja-ink)] hover:text-[var(--maja-chalk)] ${focusOnLight}`;
/* the one control on the clay band */
const scheduleCta = `${ctaBase} bg-[var(--maja-ink)] text-[var(--maja-chalk)] hover:bg-[var(--maja-chalk)] hover:text-[var(--maja-ink)] ${focusOnLight}`;
/* and the one on the petrol close, where the ring has to go the other way */
const closePrimary = `${ctaBase} bg-[var(--maja-clay)] text-[var(--maja-ink)] hover:bg-[var(--maja-chalk)] ${focusOnDark}`;

const sectionHeading = `${serif} text-[clamp(2.1rem,8.5vw,3.75rem)] leading-[1.06] tracking-[-0.01em]`;

export default function PilatesByMajaPage() {
  return (
    <div
      className={`${styles.page} ${display.variable} ${sans.variable} min-h-screen bg-[var(--maja-chalk)] text-[var(--maja-ink)] [font-family:var(--font-maja-sans),system-ui,sans-serif]`}
    >
      <VibeLabBar />

      {/* No bottom bar on this page. The top rail follows the reader instead:
          a 48px chalk strip with the name and the one thing to do, separated
          from the ink VibeLab strip above it by being light rather than by
          being a second dark band. */}
      <header className="sticky top-0 z-30 border-b border-[var(--maja-line)] bg-[var(--maja-chalk)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <a
            href="#vrh"
            className={`inline-flex min-h-12 items-baseline gap-[0.45em] whitespace-nowrap ${focusOnLight}`}
          >
            {/* The name exactly as the profile writes it, with the two halves
                separated by face rather than by a mark we invented. */}
            <span className={`${serif} text-[1.15rem] leading-none sm:text-[1.3rem]`}>
              {studio.wordmarkStrong}
            </span>
            <span className="text-[0.78rem] text-[var(--maja-muted)] sm:text-[0.85rem]">
              {studio.wordmarkLight}
            </span>
          </a>
          <a
            href={studio.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="demo_contact"
            data-umami-event-demo="pilates-by-maja"
            data-umami-event-action="prijava-header"
            className={`inline-flex min-h-12 items-center whitespace-nowrap text-[0.9rem] font-medium underline decoration-[var(--maja-teal)] decoration-2 underline-offset-[6px] hover:decoration-[var(--maja-ink)] ${focusOnLight}`}
          >
            Prijavi se
          </a>
        </div>
      </header>

      <main id="vrh">
        {/* The room first, then the sentence. On a phone the photograph runs
            edge to edge under the header and the chalk panel steps up over its
            lower edge — type sits on chalk, never over the picture. From lg the
            same two pieces stop overlapping and stand side by side, the frame
            keeping the source's own 3:4 so the mats and the barre survive the
            crop instead of being sliced into a letterbox. */}
        <section className="bg-[var(--maja-chalk)] pb-14 sm:pb-20 lg:pt-14">
          <div className="lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center lg:gap-14 lg:px-8">
            <figure
              className={`${styles.frame} h-[22rem] w-full sm:h-[27rem] lg:order-2 lg:h-[34rem]`}
            >
              <DemoPhoto
                {...heroPhoto}
                priority
                sizes="(min-width: 1024px) 26rem, 100vw"
                className={`${styles.settle} h-full w-full object-cover object-[50%_58%]`}
              />
            </figure>

            <div className="relative z-10 -mt-12 pl-5 sm:-mt-16 sm:pl-8 lg:order-1 lg:mt-0 lg:pl-0">
              <div className="bg-[var(--maja-chalk)] pt-7 pr-5 sm:pt-9 sm:pr-8 lg:bg-transparent lg:p-0">
                <h1
                  className={`${serif} text-[clamp(2.4rem,10.5vw,4.5rem)] leading-[1.08] tracking-[-0.015em]`}
                >
                  <span className="italic">{headline.accent}</span> {headline.rest}
                </h1>
                <p className="mt-5 max-w-md text-[1.0625rem] leading-[1.55] text-[var(--maja-muted)] sm:mt-6 sm:text-[1.125rem]">
                  {deck}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={studio.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="demo_contact"
                    data-umami-event-demo="pilates-by-maja"
                    data-umami-event-action="prijava-hero"
                    className={heroPrimary}
                  >
                    Prijavi se na trening
                  </a>
                  <a href="#kako" className={heroSecondary}>
                    Kako treniramo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The one decision a visitor to this profile cannot currently make.
            Two tracks separated by a single hairline, with the movement frame
            beside them on a wide screen and directly under the intro on a
            phone — so the format question is read next to a picture of the
            work rather than next to a pair of boxes. */}
        <section id="kako" className="scroll-mt-16 bg-[var(--maja-chalk)] pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 className={sectionHeading}>Kako treniramo</h2>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.6] text-[var(--maja-muted)] sm:mt-6 sm:text-[1.125rem]">
              Ista sala i isti pristup — razlika je u tome ko drži tempo i koliko se čas prilagođava
              tebi.
            </p>

            <div className="mt-9 grid gap-10 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-16">
              <figure
                className={`${styles.frame} order-1 h-[20rem] sm:h-[26rem] lg:order-2 lg:h-[30rem]`}
              >
                <DemoPhoto
                  {...trainingPhoto}
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
                  className={`${styles.settle} h-full w-full object-cover object-[45%_45%]`}
                />
              </figure>

              <div className="order-2 lg:order-1">
                {tracks.map((track, index) => (
                  <article
                    key={track.id}
                    className={index === 0 ? "" : "mt-10 border-t border-[var(--maja-line)] pt-10"}
                  >
                    <h3 className={`${serif} text-[clamp(1.6rem,5.5vw,2.15rem)] leading-[1.12]`}>
                      {track.name}
                    </h3>
                    <p className="mt-4 max-w-lg text-[1.0625rem] leading-[1.6]">{track.lead}</p>
                    <p className="mt-3 max-w-lg text-[0.975rem] leading-[1.6] text-[var(--maja-muted)]">
                      {track.suits}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* The page's one inverted band, and the only place it goes dark. It
            opens on a full-bleed frame of the work and then says, in prose,
            what the room is actually optimising for — breath, tempo, the shape
            of the movement at the end of the set. An inventory written as a
            sentence, not a row of tiles with icons on them. */}
        <section className="bg-[var(--maja-ink)] text-[var(--maja-chalk)]">
          <figure className={`${styles.frame} h-[13rem] w-full sm:h-[18rem] lg:h-[24rem]`}>
            <DemoPhoto
              {...methodPhoto}
              sizes="100vw"
              className={`${styles.settle} h-full w-full object-cover object-[36%_50%]`}
            />
          </figure>

          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <h2 className={sectionHeading}>Šta radimo</h2>
            <p className="mt-7 max-w-3xl text-[1.15rem] leading-[1.6] text-[var(--maja-muted-ink)] sm:mt-9 sm:text-[1.3rem]">
              U sali se smjenjuju{" "}
              {disciplines.map((item, index) => (
                <span key={item}>
                  {index > 0 && (index === disciplines.length - 1 ? " i " : ", ")}
                  <strong className="font-medium text-[var(--maja-chalk)]">{item}</strong>
                </span>
              ))}
              .
            </p>
            {method.map((paragraph) => (
              <p key={paragraph} className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.6]">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Prose, and no numbers: three counted steps would turn a first visit
            into a procedure. The detail frame sits on the left rail so the
            section reads as one spread rather than as another full-width band. */}
        <section className="bg-[var(--maja-chalk)] py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-9 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
              <figure className={`${styles.frame} h-[13rem] sm:h-[17rem] lg:h-[15rem]`}>
                <DemoPhoto
                  {...firstVisitPhoto}
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
                  className={`${styles.settle} h-full w-full object-cover object-[50%_62%]`}
                />
              </figure>

              <div>
                <h2 className={sectionHeading}>Prvi dolazak</h2>
                <div className="mt-7 flex flex-col gap-5">
                  {firstVisit.map((paragraph) => (
                    <p key={paragraph} className="max-w-xl text-[1.0625rem] leading-[1.6]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The accent, used once. The schedule is the thing this business
            changes most often and the thing a concept page has no business
            copying, so the handover gets the one coloured surface on the page
            and says plainly why nothing is reprinted here. */}
        <section className="bg-[var(--maja-clay)] text-[var(--maja-ink)]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 md:grid md:grid-cols-[max-content_minmax(0,1fr)] md:items-start md:gap-14">
            <h2 className={sectionHeading}>Termini</h2>
            <div className="mt-6 md:mt-2">
              <p className="max-w-xl text-[1.0625rem] leading-[1.6] sm:text-[1.125rem]">
                Raspored se mijenja iz sedmice u sedmicu, pa stoji tamo gdje ga studio i objavljuje —
                u posljednjoj objavi na Instagramu. Ovdje ga namjerno ne prepisujemo, da ne bi
                zastario već prve sedmice.
              </p>
              <a
                href={studio.scheduleUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_outbound"
                data-umami-event-demo="pilates-by-maja"
                data-umami-event-action="raspored-instagram"
                className={`${scheduleCta} mt-8 w-full sm:w-auto`}
              >
                Pogledaj aktuelne termine
              </a>
              <p className="mt-6 max-w-md text-[0.9rem] leading-[1.6]">
                Kada studio bude htio, raspored može da živi i na sajtu — na jednom mjestu za
                izmjenu, bez nove objave.
              </p>
            </div>
          </div>
        </section>

        {/* The close returns to the petrol band and spends the second and last
            italic on the word the whole page has been arguing for. */}
        <section className="bg-[var(--maja-ink)] text-[var(--maja-chalk)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <h2
              className={`${serif} text-[clamp(2.6rem,11vw,5rem)] leading-[1.06] tracking-[-0.015em]`}
            >
              Pokret sa <span className="italic text-[var(--maja-clay)]">svrhom</span>.
            </h2>

            <div className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_max-content] lg:items-end lg:gap-16">
              <div>
                <p className="max-w-lg text-[1.0625rem] leading-[1.6] sm:text-[1.125rem]">
                  {studio.name} radi u {studio.area}. Za slobodne termine, prijavu i cijene najbrže
                  je poslati poruku na Instagram.
                </p>
                <p className="mt-5 max-w-lg text-[0.9rem] leading-[1.6] text-[var(--maja-muted-ink)]">
                  {publicRecord}
                </p>
              </div>
              <address className="not-italic">
                <a
                  href={studio.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_contact"
                  data-umami-event-demo="pilates-by-maja"
                  data-umami-event-action="instagram-close"
                  className={`${closePrimary} w-full sm:w-auto`}
                >
                  <InstagramIcon className="h-[1.25rem] w-[1.25rem] shrink-0" />
                  Javi se na Instagramu
                </a>
                <p className="mt-4 text-[0.9rem] text-[var(--maja-muted-ink)]">
                  @{studio.instagram} · {studio.area}
                </p>
              </address>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--maja-line)] bg-[var(--maja-chalk)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 pt-10 pb-[calc(2.5rem+env(safe-area-inset-bottom))] sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className="flex items-baseline gap-[0.45em]">
              <span className={`${serif} text-[1.05rem] leading-none`}>
                {studio.wordmarkStrong}
              </span>
              <span className="text-[0.75rem] text-[var(--maja-muted)]">
                {studio.wordmarkLight}
              </span>
            </p>
            <p className="mt-4 max-w-xl text-xs leading-relaxed text-[var(--maja-muted)]">
              Nezvanični dizajn koncept. Podaci su preuzeti sa javnog Instagram profila studija i iz
              javnih poslovnih evidencija, 30. avgusta 2026. Fotografije su licencirani stock kadrovi
              koji stoje umjesto studijskih — ne prikazuju ovaj studio, njegov prostor ni njegove
              klijente, i prije objave ih zamjenjuju originali studija.
            </p>
          </div>
          <p className="text-xs text-[var(--maja-muted)]">
            Koncept:{" "}
            <Link
              href="/"
              className={`inline-flex min-h-11 items-center font-medium text-[var(--maja-ink)] hover:underline ${focusOnLight}`}
            >
              VibeLab
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
