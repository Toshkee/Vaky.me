import type { Metadata } from "next";
import Link from "next/link";
import { Gilda_Display, Onest } from "next/font/google";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { InstagramIcon } from "@/components/demo/ContactIcons";
import type { InterestGroup } from "./data";
import {
  approach,
  groupPhotos,
  heroPhoto,
  interests,
  priceList,
  ritual,
  ritualPhoto,
  roomBand,
  studio,
} from "./data";
import styles from "./slz.module.css";

/* Two families with one job each, and the split is the page's typographic
   idea: the serif speaks, the sans lists. Gilda Display — a single 400 weight,
   high stroke contrast, narrow — carries every heading and the studio's name;
   Onest carries the treatment inventory, the guidance lines and every control.
   Nothing is set in the serif that a visitor has to read quickly.

   Both were checked against the Montenegrin set before being chosen: Gilda's
   cmap carries č ć ž š đ (and their capitals) plus the en dash and the
   typographic quotes, Onest carries all of it as well. Gilda has no ↗, which
   is why no arrow is ever set in it. latin-ext on both. */
const display = Gilda_Display({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  variable: "--font-slz-display",
});

const sans = Onest({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-slz-sans",
});

const serif = "[font-family:var(--font-slz-display),Georgia,serif]";

export const metadata: Metadata = {
  title: "Studio ljepote i zdravlja — tretmani lica i tijela, Podgorica | Dizajn koncept",
  description:
    "Dizajn koncept za Studio ljepote i zdravlja u Zabjelu, Podgorica: tretmani lica i tijela, masaže, obrve i trepavice, i miran put do prvog upita.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-studio-ljepote-zdravlja.png"] },
};

/* Two rings, because the page runs light sections against a full olive field
   and a focus outline sits on the ground around the control, not on the
   control. Ivory ground → cacao ring. Olive ground → ivory ring. */
const focusOnLight =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--slz-cacao)]";
const focusOnOlive =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--slz-ivory)]";

/* One primary control, used twice — hero and the featured treatment — and both
   times it opens the same place. Square, because every other edge on this page
   is a hairline or a keyline; a radius here would be the only soft corner. */
const primaryCta = `inline-flex min-h-14 items-center justify-center px-8 text-[0.95rem] font-medium tracking-[0.01em] bg-[var(--slz-olive)] text-[var(--slz-ivory)] transition-colors hover:bg-[var(--slz-cacao)] ${focusOnLight}`;

/* ── The mark ───────────────────────────────────────────────────────────
   A lens: two arcs meeting at points, ringed twice inside and veined from a
   centre rib. It is a leaf and it is an aperture, which is the whole concept
   in one shape. It used to fill the hero, because the page had no photograph
   to put there; now that it has one, the drawn shape stops competing with it
   and does the job a mark is for — it signs the page off at the close, at a
   tenth of the size, and appears nowhere else.

   Coordinates are mirrored around x = 210 by hand rather than by a transform,
   so the two halves stay identical under any scale. */
const OUTER_LENS = "M210 6C348 152 348 448 210 594 72 448 72 152 210 6Z";
const INNER_LENS = "M210 74C306 178 306 422 210 526 114 422 114 178 210 74Z";
const CORE_LENS = "M210 152C266 212 266 388 210 448 154 388 154 212 210 152Z";
const RIB = "M210 6V594";
/* Each vein lands on the silhouette rather than stopping near it: the outer
   curve passes through (313,286), (308,372) and (293,444), so those are the
   end points. Veins that stopped 25 units short left loose ends floating in
   the field once the plate was cropped. */
const VEINS = [
  "M210 170C252 196 288 240 312 286",
  "M210 170C168 196 132 240 108 286",
  "M210 268C250 292 284 330 306 372",
  "M210 268C170 292 136 330 114 372",
  "M210 366C244 384 272 412 290 444",
  "M210 366C176 384 148 412 130 444",
];

function LensMark({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 420 600"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g fill="none" stroke="var(--slz-gold-light)" strokeLinecap="round">
        <path d={OUTER_LENS} strokeWidth="3" />
        <path d={RIB} strokeWidth="2" opacity={0.7} />
        <path d={INNER_LENS} strokeWidth="2" opacity={0.55} />
        <path d={CORE_LENS} strokeWidth="2" opacity={0.45} />
        {VEINS.map((vein) => (
          <path key={vein} d={vein} strokeWidth="1.6" opacity={0.4} />
        ))}
      </g>
    </svg>
  );
}

/* Where the two illustrated interest groups put their frame. Box height and
   crop are the page's business, not the data's: the same photograph would be
   cropped differently on a page with a different rhythm. Masaže gets a wide,
   low letterbox — three stones need no more; Pogled gets the tall one, because
   its frame is the only portrait in the set and because it is the group that
   sits last, where a taller picture closes the list instead of cutting it.

   The `max-w` between sm and lg is what keeps them photographs rather than
   bands: in that range the article is still one column and a frame with no
   ceiling would run the full 40rem of it, twice, at the same width. Above lg
   the 15rem track sets the width and the ceiling comes off. */
const GROUP_FRAME: Partial<Record<InterestGroup["id"], { box: string; crop: string }>> = {
  masaze: {
    box: "h-[12rem] sm:h-[15rem] sm:max-w-[28rem] lg:h-[10rem] lg:max-w-none",
    crop: "object-[52%_58%]",
  },
  pogled: {
    box: "h-[23rem] sm:h-[26rem] sm:max-w-[19rem] lg:h-[17rem] lg:max-w-none",
    crop: "object-[44%_54%]",
  },
};

export default function StudioLjepoteZdravljaPage() {
  return (
    <div
      className={`${styles.page} ${display.variable} ${sans.variable} min-h-screen bg-[var(--slz-ivory)] text-[var(--slz-cacao)] [font-family:var(--font-slz-sans),system-ui,sans-serif]`}
    >
      <VibeLabBar />

      {/* A nameplate, not a navigation bar. Nothing here scrolls with the page
          and nothing here is a control: on a one-page concept a sticky header
          would spend a phone's first 56px on a menu with one destination. */}
      <header className="border-b border-[var(--slz-line)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-4 sm:px-8 sm:py-5">
          <p className={`${serif} text-[1.2rem] leading-tight sm:text-[1.45rem]`}>{studio.name}</p>
          <p className="text-[0.78rem] tracking-[0.05em] text-[var(--slz-muted)]">{studio.area}</p>
        </div>
      </header>

      <main>
        {/* The first screen: the sentence, the two ways forward, and then the
            plate — cropped by its own box and running off the right edge of
            the page, which is the one broken container here. A second one
            would cancel it. The negative margin is measured, not stepped: 50%
            of the container's content box minus 50vw is the exact distance to
            the viewport edge at every width, and the section clips its
            x-overflow, which absorbs the half-scrollbar that 50vw overcounts. */}
        <section className="overflow-x-clip">
          <div className="mx-auto max-w-6xl px-5 pt-11 pb-16 sm:px-8 sm:pt-16 sm:pb-20 xl:grid xl:grid-cols-[minmax(0,1.25fr)_minmax(17rem,0.75fr)] xl:items-center xl:gap-14 xl:pt-20 xl:pb-24">
            <div>
              {/* 9.5vw keeps the longest word ("slušanjem") inside a 320px
                  screen with room to spare, and leading 1.08 clears the
                  lowercase carons: Gilda's ink reaches 0.75em above the
                  baseline on č and š, well under its 0.892em ascent. */}
              <h1
                className={`${serif} max-w-[15ch] text-balance text-[clamp(2.45rem,9.5vw,5.25rem)] leading-[1.08] tracking-[-0.005em]`}
              >
                Njega koja počinje slušanjem kože.
              </h1>
              <p className="mt-6 max-w-[34ch] text-[1.05rem] leading-[1.6] text-[var(--slz-muted)] sm:mt-7 sm:text-[1.15rem]">
                Tretmani lica i tijela, masaže, obrve i trepavice. {studio.area}.
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:mt-9 sm:flex-row sm:items-center sm:gap-8">
                <a
                  href={studio.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_contact"
                  data-umami-event-demo="studio-ljepote-zdravlja"
                  data-umami-event-action="upit-hero"
                  className={`${primaryCta} w-full sm:w-auto`}
                >
                  Pošalji upit
                </a>
                <a
                  href="#tretmani"
                  className={`inline-flex min-h-12 items-center text-[0.95rem] font-medium underline decoration-[var(--slz-gold)] decoration-2 underline-offset-[7px] transition-colors hover:decoration-[var(--slz-cacao)] ${focusOnLight}`}
                >
                  Istraži tretmane
                </a>
              </div>
              {/* The destination, named. The primary control leaves the site
                  and a visitor is owed that before the tap, not after it. */}
              <p className="mt-5 text-[0.8rem] text-[var(--slz-muted)]">
                Upit otvara Instagram profil studija.
              </p>
            </div>

            {/* The aperture, and now there is something behind it. The frame
                reserves its own height before anything paints — an aspect
                ratio on a phone, a fixed height from sm up where a ratio would
                grow a 900px-tall picture on a laptop — so nothing shifts when
                the shutters run or when the file lands. No `w-full`: the box
                has to keep an auto width for the negative margin to widen it.

                4/5 rather than a taller ratio: the source is landscape, and a
                2/3 box threw away half its width, which is where the hand is.

                Two bleeds, because 50% means two different things here. Below
                xl the box is a block child of the container, so 50% is half
                the content box and `50% - 50vw` lands exactly on the viewport
                edge. At xl it is a grid item and 50% is half of its own track,
                which overshot the viewport by 312px at 1440; the distance is
                measured
                from the container instead: half the gutter (50vw - 36rem) plus
                the 2rem padding. */}
            <div
              className={`${styles.frame} mt-12 mr-[calc(50%_-_50vw)] aspect-[4/5] sm:mt-14 sm:aspect-auto sm:h-[26rem] lg:h-[30rem] xl:mt-0 xl:mr-[calc(34rem_-_50vw)] xl:h-[34rem]`}
            >
              {/* The page's one priority image, and the only one above the
                  fold. Everything below it lazy-loads. */}
              <DemoPhoto
                src={heroPhoto.src}
                alt={heroPhoto.alt}
                width={heroPhoto.width}
                height={heroPhoto.height}
                priority
                sizes="(min-width: 1280px) 36rem, (min-width: 640px) 96vw, calc(100vw - 1.25rem)"
                className="object-[46%_50%]"
              />
              <div className={`${styles.shutter} ${styles.shutterTop}`} />
              <div className={`${styles.shutter} ${styles.shutterBottom}`} />
            </div>
          </div>
        </section>

        {/* The page's density peak: the whole offer, grouped by what brings
            someone in. Four groups of four different lengths, because that is
            what the studio publishes — the face is where it writes most, and
            massage is a name with nothing under it. Padding the short ones out
            would mean inventing services. */}
        <section id="tretmani" className="scroll-mt-4 bg-[var(--slz-ivory-deep)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <h2
              className={`${serif} max-w-[16ch] text-balance text-[clamp(2rem,7vw,3.5rem)] leading-[1.1]`}
            >
              Lice, tijelo, masaže, pogled.
            </h2>
            <p className="mt-5 max-w-[54ch] text-[1rem] leading-[1.65] text-[var(--slz-muted)] sm:text-[1.05rem]">
              Ponuda studija, složena po tome šta te dovodi. Ispod svake grupe stoji ono što je
              korisno napisati u prvom upitu.
            </p>

            <div className="mt-12 flex flex-col gap-12 sm:mt-16 sm:gap-16">
              {interests.map((group) => {
                const photo = groupPhotos[group.id];
                const frame = GROUP_FRAME[group.id];

                return (
                  <article
                    key={group.id}
                    className="relative pl-6 sm:pl-9 lg:grid lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-12"
                  >
                    {/* The keyline is what holds a group together on a phone,
                        where the name and its treatments would otherwise float
                        apart. It unrolls downward as the group enters view. */}
                    <span
                      aria-hidden="true"
                      className={`${styles.keyline} absolute inset-y-0 left-0 w-[3px] bg-[var(--slz-olive)]`}
                    />
                    <div>
                      <h3
                        className={`${serif} text-[clamp(1.7rem,5.5vw,2.5rem)] leading-[1.15] text-[var(--slz-olive)]`}
                      >
                        {group.name}
                      </h3>
                      {/* Two of the four groups carry a picture, and it sits
                          under the name rather than beside the list: on a phone
                          that reads name → picture → what the name covers, and
                          on a laptop it fills the narrow column that would
                          otherwise be a name and a great deal of nothing. */}
                      {photo && frame ? (
                        <div className={`${styles.frame} mt-6 ${frame.box}`}>
                          <DemoPhoto
                            src={photo.src}
                            alt={photo.alt}
                            width={photo.width}
                            height={photo.height}
                            sizes="(min-width: 1024px) 15rem, (min-width: 640px) 28rem, calc(100vw - 3.5rem)"
                            className={frame.crop}
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="mt-5 lg:mt-1">
                      {/* The inventory, set in the sans: these are names to
                          scan, not sentences to read, and the serif is reserved
                          for what the page says in its own voice. */}
                      <ul>
                        {group.treatments.map((treatment) => (
                          <li
                            key={treatment}
                            className="border-t border-[var(--slz-line)] py-3 text-[1.05rem] font-medium tracking-[0.01em] sm:text-[1.15rem]"
                          >
                            {treatment}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 max-w-[48ch] text-[0.95rem] leading-[1.65] text-[var(--slz-muted)] sm:text-[1rem]">
                        {group.ask}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* The one picture that runs the full width of the screen, and the one
            that needs saying out loud. It closes the treatment list on the same
            ground rather than opening a new section: this is the room the list
            happens in — except that it is not, and the caption underneath is
            the page admitting it in the same breath it shows it. A caption is
            also the only honest place for that sentence; alt text reaches one
            reader in a hundred and a footnote reaches nobody.

            No text over the image, so there is no contrast problem to solve and
            nothing to lose when the crop changes shape between a phone and a
            desktop. */}
        {/* A figure, not a section: it has no heading of its own and it belongs
            to the list above it, so it carries the same ground and adds no
            landmark. */}
        <div className="bg-[var(--slz-ivory-deep)]">
          <figure>
            <div className={`${styles.frame} h-[14rem] sm:h-[20rem] lg:h-[27rem] xl:h-[32rem]`}>
              <DemoPhoto
                src={roomBand.photo.src}
                alt={roomBand.photo.alt}
                width={roomBand.photo.width}
                height={roomBand.photo.height}
                sizes="100vw"
                className="object-[42%_52%]"
              />
            </div>
            <figcaption className="mx-auto max-w-6xl px-5 pt-4 pb-16 sm:px-8 sm:pt-5 sm:pb-24">
              <span className="block max-w-[52ch] text-[0.82rem] leading-[1.6] text-[var(--slz-muted)]">
                {roomBand.caption}
              </span>
            </figcaption>
          </figure>
        </div>

        {/* The olive field, first of two. The heading is the studio's own
            phrase and the line under it says so — a sentence we would not be
            entitled to write ourselves reads as a quotation when it is
            attributed, and as a claim when it is not. */}
        <section className="bg-[var(--slz-olive)] text-[var(--slz-on-olive)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                {/* Balanced: unbalanced, "koži" fell to a line of its own at
                    390px, which reads as a mistake at display scale. */}
                <h2
                  className={`${serif} max-w-[14ch] text-balance text-[clamp(2rem,7vw,3.4rem)] leading-[1.1]`}
                >
                  {approach.heading}
                </h2>
                <p className="mt-4 text-[0.9rem] leading-[1.6] text-[var(--slz-gold-light)]">
                  {approach.attribution}
                </p>
              </div>
              <div className="lg:pt-2">
                <p className="max-w-[48ch] text-[1.05rem] leading-[1.7] sm:text-[1.1rem]">
                  {approach.offer}
                </p>
                <p className="mt-6 max-w-[48ch] text-[0.98rem] leading-[1.7] text-[var(--slz-on-olive-muted)]">
                  {approach.handoff}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* One treatment, given the room the other eight share. The gold
            keyline down the left is the only place gold runs at any length. */}
        <section>
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="border-l-[3px] border-[var(--slz-gold)] pl-6 sm:pl-10 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
              <div>
                <h2
                  className={`${serif} text-[clamp(2.2rem,8.5vw,4.25rem)] leading-[1.1]`}
                >
                  {ritual.name}
                </h2>
                <p className="mt-4 max-w-[34ch] text-[0.95rem] leading-[1.65] text-[var(--slz-muted)]">
                  {ritual.observation}
                </p>
                {/* What the treatment is done with, under the treatment's name.
                    A wide, low box on purpose: the flat lay is mostly empty
                    white, and cropping into the middle of it is the difference
                    between a photograph and a stock still with a lot of air. */}
                <div className={`${styles.frame} mt-8 h-[11rem] sm:h-[14rem] lg:mt-10 lg:h-[13rem]`}>
                  <DemoPhoto
                    src={ritualPhoto.src}
                    alt={ritualPhoto.alt}
                    width={ritualPhoto.width}
                    height={ritualPhoto.height}
                    sizes="(min-width: 1024px) 24rem, (min-width: 640px) calc(100vw - 7rem), calc(100vw - 3.5rem)"
                    className="object-[56%_54%]"
                  />
                </div>
              </div>
              <div className="mt-8 lg:mt-1">
                <p className="max-w-[46ch] text-[1.1rem] leading-[1.7] sm:text-[1.15rem]">
                  {ritual.body}
                </p>
                <a
                  href={studio.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_contact"
                  data-umami-event-demo="studio-ljepote-zdravlja"
                  data-umami-event-action="upit-tretman"
                  className={`${primaryCta} mt-8 w-full sm:w-auto`}
                >
                  Pošalji upit
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* The price list the package can carry, modelled and deliberately
            empty. The categories are real and rendered; the numbers wait for
            the studio. A row of dashes would read as a broken page, and last
            season's promotion would read as this season's price. */}
        <section className="bg-[var(--slz-ivory-deep)]">
          <div className="mx-auto max-w-6xl px-5 py-10 sm:flex sm:items-start sm:justify-between sm:gap-14 sm:px-8 sm:py-12">
            <div>
              <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--slz-gold-text)]">
                Cjenovnik
              </h2>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[1.05rem] font-medium">
                {priceList.categories.map((category) => (
                  <li key={category.groupId}>
                    {interests.find((group) => group.id === category.groupId)?.name}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 max-w-[46ch] text-[0.9rem] leading-[1.65] text-[var(--slz-muted)] sm:mt-0">
              {priceList.note}
            </p>
          </div>
        </section>

        {/* The close: the olive field again, the neighbourhood at display
            scale, and the profile as the address rather than a fourth button.
            The plate returns here in outline, a tenth of its hero size. */}
        <section className="bg-[var(--slz-olive)] text-[var(--slz-on-olive)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
              <div>
                <h2 className={`${serif} text-[clamp(2.3rem,9vw,4.5rem)] leading-[1.08]`}>
                  {studio.area}.
                </h2>
                <p className="mt-6 max-w-[40ch] text-[1.05rem] leading-[1.7] text-[var(--slz-on-olive-muted)]">
                  Upit ide na Instagram studija — tamo su i aktuelne objave o tretmanima.
                </p>
                <address className="not-italic">
                  <a
                    href={studio.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="demo_contact"
                    data-umami-event-demo="studio-ljepote-zdravlja"
                    data-umami-event-action="instagram-zavrsni"
                    className={`mt-6 inline-flex min-h-14 items-center gap-3 text-[clamp(1.25rem,5.5vw,1.9rem)] underline decoration-[var(--slz-gold-light)] decoration-2 underline-offset-[8px] transition-colors hover:decoration-[var(--slz-ivory)] ${focusOnOlive}`}
                  >
                    <InstagramIcon className="h-[1.3rem] w-[1.3rem] shrink-0" />@{studio.instagram}
                  </a>
                </address>
              </div>
              <div className="lg:justify-self-end">
                <LensMark className="block h-auto w-[10rem] sm:w-[13rem]" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--slz-line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:gap-12 sm:px-8">
          <div>
            <p className={`${serif} text-[1.15rem]`}>{studio.name}</p>
            <p className="mt-3 max-w-[56ch] text-xs leading-[1.75] text-[var(--slz-muted)]">
              Nezvanični dizajn koncept. Podaci su pročitani 30. avgusta 2026. na javnom Instagram
              profilu studija i u javnom poslovnom registru. Sve fotografije na stranici su
              licencirane ilustrativne fotografije i ne prikazuju ovaj studio — zamjenjuju se
              njegovim snimcima uz njegovu saglasnost.
            </p>
          </div>
          <p className="text-xs text-[var(--slz-muted)]">
            Koncept:{" "}
            <Link
              href="/"
              className={`inline-flex min-h-11 items-center font-semibold text-[var(--slz-cacao)] hover:underline ${focusOnLight}`}
            >
              VibeLab
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
