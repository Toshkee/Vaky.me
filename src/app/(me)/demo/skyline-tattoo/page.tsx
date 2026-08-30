import type { Metadata } from "next";
import Link from "next/link";
import { Onest, Unbounded } from "next/font/google";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { brief, heroWork, strands, studio, studioFront, works } from "./data";
import styles from "./sky.module.css";

/* Unbounded is the whole display voice and it is used sparingly: the h1, the
   three strand names, the closing line and the wordmark. It is very wide, so
   at poster scale it behaves like a horizon rather than a stack — which is the
   one thing this studio's name asks a typeface to do. Its variable weight axis
   is doing real work here: the three strands of the work are set at 300, 800
   and 500, so the type itself sits on the same line-weight scale the studio
   draws on.

   Onest carries everything anyone actually reads. Both faces were checked for
   č/ć/š/ž/đ before being chosen — latin-ext is not optional on a Montenegrin
   page, and a display face that silently drops a caron ruins a headline. */
const display = Unbounded({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sky-display",
});
const text = Onest({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sky-text",
});

export const metadata: Metadata = {
  title: "Skyline Tattoo Studio — tattoo i piercing, Podgorica | Dizajn koncept",
  description:
    "Dizajn koncept za Skyline Tattoo Studio u Podgorici: neprekinut vertikalni portfolio radova, minimal, bold i piercing razdvojeni u tri cjeline, i direktan put od ideje do poruke studiju.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-skyline-tattoo.png"] },
};

const displayFace = "[font-family:var(--font-sky-display),system-ui,sans-serif]";

/* Two rings, because the offset ring lands on the field around a control, not
   on the control. Everything on this page sits on a dark ground, so mint is
   the ring — except on the mint-filled button, where a mint ring would read as
   a halo of the button itself. */
const ring =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sky-mint)]";
const ringOnMint =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sky-bone)]";

/* The page's one filled control, used at the two moments that matter: the
   first screen and the last. Sentence case, not tracked caps — this is a
   studio talking, not a gym. Full width on a phone, intrinsic above sm. */
const primaryCta = `inline-flex min-h-14 w-full items-center justify-center bg-[var(--sky-mint)] px-8 text-[0.95rem] font-semibold text-[var(--sky-black)] transition-colors hover:bg-[var(--sky-mint-deep)] sm:w-auto ${ringOnMint}`;

/* The three quiet links into the studio's own gallery. They share a shape but
   never a label — each one names the highlight it opens. */
const galleryLink = `${styles.gallery} inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-medium text-[var(--sky-bone)] underline decoration-[var(--sky-smoke)] decoration-1 underline-offset-[7px] transition-colors hover:decoration-[var(--sky-mint)] ${ring}`;

const strandBody =
  "text-[1rem] leading-[1.65] text-[var(--sky-smoke)] sm:text-[1.08rem]";

/* Portfolio captions. They name the technique and the placement, sit small and
   quiet under the frame, and never carry a link — the whole run is one body of
   work, not a row of clickable tiles. */
const caption = "mt-4 text-[0.82rem] leading-[1.5] text-[var(--sky-smoke)]";

/**
 * The page's only drawing, and its only ornament: a line-weight scale.
 *
 * Seven horizontal strokes running out of the left edge, hairline at the top
 * and solid at the bottom, each a different length so the right side stays
 * ragged. It is the studio's own craft written as a graphic — the distance
 * between the `Minimal` end of the work and the `Bold` end is exactly this —
 * and read side-on it is a horizon under a black sky, which is the other half
 * of the name.
 *
 * `preserveAspectRatio="none"` on purpose: the frame is given a real height in
 * CSS and the strokes stretch to fill it, so the mark stays a horizon on a
 * 360px phone instead of collapsing into a 57px sliver. They are bars, so
 * non-uniform scaling costs them nothing.
 *
 * Used twice — under the hero and, inverted, above the closing line — and
 * nowhere in between.
 */
function HorizonMark({ className = "", inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <div className={`${styles.scaleFrame} ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 185"
        preserveAspectRatio="none"
        focusable="false"
        className={`block h-full w-full ${inverted ? "rotate-180" : ""}`}
      >
        <g>
          <rect className={styles.stroke} x="0" y="0" width="1200" height="3" fill="var(--sky-mint)" />
          <rect className={styles.stroke} x="0" y="17" width="1010" height="4" fill="var(--sky-smoke)" />
          <rect className={styles.stroke} x="0" y="35" width="1160" height="6" fill="var(--sky-smoke)" />
          <rect className={styles.stroke} x="0" y="57" width="880" height="9" fill="var(--sky-smoke)" />
          <rect className={styles.stroke} x="0" y="82" width="1200" height="14" fill="var(--sky-bone)" />
          <rect className={styles.stroke} x="0" y="112" width="1090" height="22" fill="var(--sky-bone)" />
          <rect className={styles.stroke} x="0" y="150" width="1200" height="35" fill="var(--sky-bone)" />
        </g>
      </svg>
    </div>
  );
}

export default function SkylineTattooPage() {
  return (
    <div
      className={`${styles.page} ${display.variable} ${text.variable} min-h-screen bg-[var(--sky-black)] text-[var(--sky-bone)] [font-family:var(--font-sky-text),system-ui,sans-serif]`}
    >
      <VibeLabBar />

      {/* The header carries no controls at all. On a one-screen cinematic
          portfolio a button pinned above the title competes with the title;
          the two things worth doing are both in the hero, three lines below. */}
      <header className="border-b border-[var(--sky-hair)] bg-[var(--sky-black)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-5 sm:px-8">
          <p
            className={`text-[1.05rem] font-semibold tracking-[0.3em] text-[var(--sky-bone)] sm:text-[1.2rem] ${displayFace}`}
          >
            {studio.wordmark}
          </p>
          <p className="text-[0.85rem] text-[var(--sky-smoke)]">
            {studio.descriptor} · {studio.area}
          </p>
        </div>
      </header>

      <main>
        {/* The work first, then the line that names what the page is about.
            The photograph was shot against black, and this page's ground is
            black to within a shade, so the forearm arrives with no frame, no
            card and no visible edge — it is simply on the page. Type never
            sits over it: the two share the first screen but not a rectangle,
            which is the only arrangement in which a headline over photography
            stays readable at every crop and every width. */}
        <section className="bg-[var(--sky-black)]">
          <div className="mx-auto grid max-w-6xl lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end lg:gap-14 lg:px-8 lg:pt-16 lg:pb-10">
            {/* The box owns the height and the crop, the image only fills it.
                On a phone the frame is a window onto the middle of the piece so
                the whole headline still lands on the first screen; from lg the
                column is 24rem against a 30rem box, which is the source's own
                4:5 — the piece is shown whole there, uncropped. */}
            <figure className="lg:order-last">
              <div className="h-[clamp(14rem,38svh,20rem)] overflow-hidden lg:h-[30rem]">
                <DemoPhoto
                  src={heroWork.src}
                  alt={heroWork.alt}
                  width={heroWork.width}
                  height={heroWork.height}
                  priority
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="h-full w-full object-cover object-[50%_34%] lg:object-[50%_50%]"
                />
              </div>
            </figure>
            <div className="px-5 pt-12 pb-12 sm:px-8 sm:pt-14 sm:pb-16 lg:order-first lg:px-0 lg:pt-0 lg:pb-14">
              {/* Three fixed lines, and none of them locked against wrapping —
                  at 320px the longest word still fits inside the column, and if
                  a face ever renders wider than expected it breaks rather than
                  pushing the page sideways. The full stop is the page's
                  smallest use of mint and its most literal: the trace itself. */}
              <h1
                className={`text-[clamp(2.75rem,12.5vw,6.75rem)] font-normal leading-[0.95] tracking-[-0.045em] ${displayFace}`}
              >
                <span className="block">Ideja</span>
                <span className="block">postaje</span>
                <span className="block">
                  trag<span className="text-[var(--sky-mint)]">.</span>
                </span>
              </h1>
              <p className="mt-7 max-w-[36ch] text-pretty text-[1.02rem] leading-[1.6] text-[var(--sky-smoke)] sm:mt-9 sm:text-[1.15rem]">
                Tattoo i piercing studio u Podgorici. Motiv, linija i pozicija dogovaraju se prije
                nego što išta krene na kožu.
              </p>
              <div className="mt-9 flex flex-col items-start gap-5 sm:mt-11 sm:flex-row sm:items-center sm:gap-8">
                <a
                  href={studio.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_contact"
                  data-umami-event-demo="skyline-tattoo"
                  data-umami-event-action="ideja-hero"
                  className={primaryCta}
                >
                  Pošalji ideju
                </a>
                <a
                  href="#radovi"
                  className={`inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-medium text-[var(--sky-bone)] underline decoration-[var(--sky-smoke)] decoration-1 underline-offset-[7px] transition-colors hover:decoration-[var(--sky-mint)] ${ring}`}
                >
                  Pogledaj radove
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
          {/* Edge to edge, outside the container — no negative margins, so
              there is nothing here that can overflow at 320px. */}
          <HorizonMark className="h-[clamp(116px,20vw,224px)] w-full" />
        </section>

        {/* The portfolio: one continuous vertical run down the page, and the
            single most important thing on it.

            Not a grid, and the rules that keep it from becoming one are these.
            No frame repeats a width. No two consecutive frames sit against the
            same edge. The gaps between them are deliberately unequal. And no
            tattoo is ever cropped — a portfolio that slices the work to fit a
            box is arguing against itself — so each photograph keeps its own
            aspect ratio and the composition is made out of width, alignment and
            scale instead. Three of these were shot against black and are left
            edgeless on the page's own black; the two shot in daylight keep
            their hard rectangle and become the run's loud moments. */}
        <section id="radovi" className="scroll-mt-4 bg-[var(--sky-black)] pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-8 sm:pt-24 sm:pb-16">
            <h2
              className={`max-w-[16ch] text-[clamp(1.9rem,7vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.035em] ${displayFace}`}
            >
              Trag, izbliza.
            </h2>
            <p className="mt-6 max-w-[46ch] text-[1rem] leading-[1.65] text-[var(--sky-smoke)] sm:text-[1.08rem]">
              Kadrovi rada iz javne galerije studija. Uz saglasnost studija i klijenata, ovdje
              stoji njihov potpun izbor, u originalnoj rezoluciji.
            </p>
          </div>

          {/* Edge to edge on a phone — the run's tallest frame and the only
              one that takes the whole screen width. Fresh line, still blue,
              still in progress: the page's own title as a photograph rather
              than as a claim. From lg it returns into the column everything
              else is measured against; a portrait held at full width on a
              1440px screen is a slice, not a portfolio. */}
          <figure className={`${styles.horizon} lg:mx-auto lg:max-w-6xl lg:px-8`}>
            <DemoPhoto
              src={works.konj.src}
              alt={works.konj.alt}
              width={works.konj.width}
              height={works.konj.height}
              sizes="(min-width: 1024px) 32rem, 100vw"
              className="block h-auto w-full lg:w-[32rem]"
            />
            <figcaption className={`${caption} px-5 sm:px-8 lg:px-0`}>
              {works.konj.caption}
            </figcaption>
          </figure>

          {/* Against the right edge, with the page's black running down its
              left. Inset only on the left, so the frame touches the screen
              edge on the side it is aligned to. */}
          <figure className="mt-16 pl-5 sm:mt-20 sm:pl-8 lg:mx-auto lg:mt-24 lg:max-w-6xl lg:px-8">
            <div className="ml-auto w-[82%] sm:w-[68%] lg:w-[26rem]">
              <DemoPhoto
                src={works.fineLinije.src}
                alt={works.fineLinije.alt}
                width={works.fineLinije.width}
                height={works.fineLinije.height}
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 68vw, 82vw"
                className="block h-auto w-full"
              />
              <figcaption className={caption}>{works.fineLinije.caption}</figcaption>
            </div>
          </figure>

          {/* The page's only colour, and the only frame with daylight in it.
              It is set narrow on purpose: red on a black page needs no help. */}
          <figure className="mx-auto mt-20 max-w-6xl px-5 sm:mt-24 sm:px-8">
            <div className="w-[70%] sm:w-[52%] lg:ml-[14%] lg:w-[22rem]">
              <DemoPhoto
                src={works.bulke.src}
                alt={works.bulke.alt}
                width={works.bulke.width}
                height={works.bulke.height}
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 52vw, 70vw"
                className="block h-auto w-full"
              />
              <figcaption className={caption}>{works.bulke.caption}</figcaption>
            </div>
          </figure>

          {/* The quietest frame on the page, and the only one that shares its
              row with a sentence. The sentence is an observation about the run
              as a whole, and it is what hands the page over to the three
              strands below. */}
          <div className="mx-auto mt-16 max-w-6xl px-5 sm:mt-20 sm:px-8 lg:mt-24 lg:grid lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <figure>
              <div className="ml-auto w-[58%] sm:w-[44%] lg:ml-0 lg:w-full">
                <DemoPhoto
                  src={works.suma.src}
                  alt={works.suma.alt}
                  width={works.suma.width}
                  height={works.suma.height}
                  sizes="(min-width: 1024px) 19rem, (min-width: 640px) 44vw, 58vw"
                  className="block h-auto w-full"
                />
                <figcaption className={caption}>{works.suma.caption}</figcaption>
              </div>
            </figure>
            <p className="mt-10 max-w-[34ch] text-[1rem] leading-[1.65] text-[var(--sky-smoke)] sm:text-[1.08rem] lg:mt-0">
              Isti studio, dvije potpuno različite težine linije — i odluka koja od njih odgovara
              ideji donosi se prije igle.
            </p>
          </div>

          {/* The largest piece, and the end of the run: full width on a phone,
              and on a wide screen the widest frame on the page. */}
          <figure
            className={`${styles.horizon} mt-20 sm:mt-24 lg:mx-auto lg:mt-28 lg:max-w-6xl lg:px-8`}
          >
            <DemoPhoto
              src={works.vaza.src}
              alt={works.vaza.alt}
              width={works.vaza.width}
              height={works.vaza.height}
              sizes="(min-width: 1024px) 38rem, 100vw"
              className="block h-auto w-full lg:w-[38rem]"
            />
            <figcaption className={`${caption} px-5 sm:px-8 lg:px-0`}>
              {works.vaza.caption}
            </figcaption>
          </figure>
        </section>

        {/* The three strands, as type. Same continuous logic as the portfolio:
            no frames, no cards, no grid. Each is set at its own weight and its
            own scale, and the middle one takes a black slab — the density
            peak. */}
        <section id="cjeline" className="scroll-mt-4 bg-[var(--sky-graphite)]">
          <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24">
            <h2
              className={`max-w-[18ch] text-[clamp(1.9rem,7vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.035em] ${displayFace}`}
            >
              Tri težine linije.
            </h2>
            <p className="mt-6 max-w-[46ch] text-[1rem] leading-[1.65] text-[var(--sky-smoke)] sm:text-[1.08rem]">
              Studio radove razvrstava u tri cjeline, po sopstvenim oznakama na profilu. Puni izbor
              po svakoj od njih stoji tamo.
            </p>
          </div>

          {/* Minimal: the lightest weight on the page, widely tracked, with a
              short measure and a lot of air around it. */}
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-24">
            <h3
              className={`${styles.horizon} text-[clamp(2rem,10vw,4rem)] font-light tracking-[0.04em] ${displayFace}`}
            >
              {strands.minimal.name}
            </h3>
            <p className={`mt-6 max-w-[34ch] ${strandBody}`}>{strands.minimal.line}</p>
            <a
              href={studio.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="demo_portfolio"
              data-umami-event-demo="skyline-tattoo"
              data-umami-event-action="radovi-minimal"
              className={`${galleryLink} mt-7`}
            >
              {strands.minimal.highlight} na Instagramu
              <span aria-hidden="true" className={`${styles.arrow} text-[var(--sky-mint)]`}>
                ↗
              </span>
            </a>
          </div>

          {/* Bold: the heaviest weight, the largest size, the darkest ground,
              and the only place on the page where a block of copy is pushed
              off to the right. One peak, once. */}
          <div className="bg-[var(--sky-black)]">
            <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
              <h3
                className={`${styles.horizon} text-[clamp(3.5rem,27vw,15rem)] font-extrabold leading-[0.84] tracking-[-0.06em] ${displayFace}`}
              >
                {strands.bold.name}
              </h3>
              <div className="mt-9 max-w-[40ch] sm:mt-12 lg:ml-auto">
                <p className={strandBody}>{strands.bold.line}</p>
                <a
                  href={studio.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_portfolio"
                  data-umami-event-demo="skyline-tattoo"
                  data-umami-event-action="radovi-bold"
                  className={`${galleryLink} mt-7`}
                >
                  {strands.bold.highlight} na Instagramu
                  <span aria-hidden="true" className={`${styles.arrow} text-[var(--sky-mint)]`}>
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Piercing: mid weight, mid scale, and indented on a wide screen so
              the three strands never line up on one left edge. The indent is a
              margin on an inner block rather than padding on the container —
              `pl-*` and `px-*` are a physical/logical pair whose cascade order
              is not worth betting a layout on. */}
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
            <div className="lg:ml-[26%]">
              <h3
                className={`${styles.horizon} text-[clamp(2.1rem,12.5vw,5.25rem)] font-medium tracking-[-0.02em] ${displayFace}`}
              >
                {strands.piercing.name}
              </h3>
              <p className={`mt-6 max-w-[36ch] ${strandBody}`}>{strands.piercing.line}</p>
              <a
                href={studio.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_portfolio"
                data-umami-event-demo="skyline-tattoo"
                data-umami-event-action="radovi-piercing"
                className={`${galleryLink} mt-7`}
              >
                {strands.piercing.highlight} na Instagramu
                <span aria-hidden="true" className={`${styles.arrow} text-[var(--sky-mint)]`}>
                  ↗
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* The consultation, as prose. No form, no steps, no numbers: the four
            things worth putting in a first message are set as running type,
            because a page that cannot deliver a message must not look like it
            is collecting one. */}
        <section className="bg-[var(--sky-slate)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-11 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <h2
                  className={`max-w-[20ch] text-[clamp(1.7rem,6vw,2.75rem)] font-normal leading-[1.08] tracking-[-0.035em] ${displayFace}`}
                >
                  Kako ideja stiže do studija
                </h2>
                <p className="mt-6 max-w-[44ch] text-[1rem] leading-[1.65] text-[var(--sky-smoke)] sm:text-[1.08rem]">
                  Nema formulara ni sistema za zakazivanje. Prva poruka ide direktno studiju, na
                  Instagram, i najviše koristi kad u njoj već stoji ono što se ionako pita na
                  početku:
                </p>
              </div>
              <div>
                <ul
                  className={`flex flex-wrap items-baseline text-[clamp(1.3rem,5.5vw,2.1rem)] font-light leading-[1.3] tracking-[-0.02em] ${displayFace}`}
                >
                  {brief.map((item, index) => (
                    <li key={item}>
                      {item}
                      {index < brief.length - 1 && (
                        <span aria-hidden="true" className="px-3 text-[var(--sky-mint)]">
                          /
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 max-w-[44ch] text-[1rem] leading-[1.65] text-[var(--sky-smoke)] sm:text-[1.08rem]">
                  Termin, trajanje i cijena dogovaraju se u istom razgovoru.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The doorway, at dusk, and the page's one true full-bleed band —
            the only photograph here wide enough to be cropped to a horizon
            without losing what it is of. It arrives straight off the slate
            section with no heading above it, because the sign in the frame is
            the heading: the studio's own name, lit, over its own door. */}
        <section className="bg-[var(--sky-black)]">
          <figure className={styles.horizon}>
            {/* The crop is anchored high on purpose and re-anchored higher
                again from lg: the sign is the subject, and at a wide band the
                default centre cuts it in half. */}
            <div className="h-[clamp(13rem,42svw,22rem)] overflow-hidden lg:h-[30rem]">
              <DemoPhoto
                src={studioFront.src}
                alt={studioFront.alt}
                width={studioFront.width}
                height={studioFront.height}
                sizes="100vw"
                className={`${styles.dusk} h-full w-full object-cover object-[50%_26%] lg:object-[50%_18%]`}
              />
            </div>
          </figure>
          <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14">
            <h2
              className={`max-w-[16ch] text-[clamp(1.7rem,6vw,2.75rem)] font-normal leading-[1.08] tracking-[-0.035em] ${displayFace}`}
            >
              Studio je u Podgorici.
            </h2>
            <p className="mt-6 max-w-[46ch] text-[1rem] leading-[1.65] text-[var(--sky-smoke)] sm:text-[1.08rem]">
              Natpis iznad ulaza je jedini podatak o lokaciji koji ovdje stoji. Tačna adresa i
              termin stižu u odgovoru na poruku.
            </p>
          </div>
        </section>

        {/* The close. The mark returns inverted — solid at the top, hairline at
            the bottom — so the page ends where it started, upside down. */}
        <section className="bg-[var(--sky-black)]">
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
            <HorizonMark inverted className="h-[clamp(76px,12vw,140px)] w-full" />
            <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
              <h2
                className={`${styles.horizon} text-[clamp(2rem,8.5vw,4.75rem)] font-normal leading-[1.02] tracking-[-0.045em] ${displayFace}`}
              >
                <span className="block">Tvoja ideja.</span>
                <span className="block text-[var(--sky-smoke)]">Njihova linija.</span>
              </h2>
              <div>
                <p className="max-w-[38ch] text-[1.02rem] leading-[1.6] text-[var(--sky-smoke)] sm:text-[1.1rem]">
                  Jedna poruka na profil studija. Odatle kreće sve ostalo — dogovor o motivu,
                  liniji i terminu.
                </p>
                <a
                  href={studio.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_contact"
                  data-umami-event-demo="skyline-tattoo"
                  data-umami-event-action="ideja-zavrsna"
                  className={`${primaryCta} mt-8`}
                >
                  Pošalji ideju
                </a>
                {/* Plain text, deliberately: the handle identifies where the
                    button lands without becoming a second control to the same
                    place. */}
                <p className="mt-4 text-[0.88rem] text-[var(--sky-smoke)]">
                  Poruka stiže na @{studio.instagram}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--sky-hair)] bg-[var(--sky-black)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 pt-10 pb-[calc(2.5rem_+_env(safe-area-inset-bottom))] sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className={`text-[0.95rem] font-semibold tracking-[0.3em] ${displayFace}`}>
              {studio.wordmark}
            </p>
            <p className="mt-4 max-w-[62ch] text-xs leading-relaxed text-[var(--sky-smoke)]">
              Nezvanični dizajn koncept. Podaci su preuzeti sa javnog Instagram profila studija, 30.
              avgusta 2026. Fotografije su iz javne galerije poslovnog listinga, sačuvane i
              obrađene lokalno; prava nijesu potvrđena i prije produkcije se zamjenjuju originalima
              studija, uz saglasnost klijenata. U izboru nema prepoznatljivih lica ni intimnih
              djelova tijela. Telefoni, tačna adresa i imena umjetnika se ne prikazuju.
            </p>
          </div>
          <p className="text-xs text-[var(--sky-smoke)]">
            Koncept:{" "}
            <Link
              href="/"
              className={`inline-flex min-h-11 items-center font-semibold text-[var(--sky-bone)] hover:underline ${ring}`}
            >
              VibeLab
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
