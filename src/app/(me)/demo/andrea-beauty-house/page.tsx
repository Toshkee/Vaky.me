import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, Work_Sans } from "next/font/google";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { VakyBar } from "@/components/demo/VakyBar";
import { InstagramIcon } from "@/components/demo/ContactIcons";
import {
  doorway,
  house,
  interiorPhotos,
  kidsPhotos,
  roomPhotos,
  rooms,
  salonServices,
} from "./data";
import styles from "./andrea.module.css";

/* Fraunces is a soft serif with real italics and a slight wonk in its
   display cuts — warm enough for the kids half of the house without turning
   the adult half into a children's page. Work Sans reads at any size and
   stays out of the way. latin-ext for č/ć/š/ž/đ. */
const display = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-abh-display",
});
const sans = Work_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-abh-sans",
});

export const metadata: Metadata = {
  title: "Andrea Beauty House — salon, braids i kids prostor, Podgorica | Dizajn koncept",
  description:
    "Dizajn koncept za Andrea Beauty House u New Cityju: salon za odrasle, pletenice i odvojen prostor za najmlađe — tri sobe pod istim krovom.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-andrea-beauty-house.png"] },
};

const serif = "[font-family:var(--font-abh-display),Georgia,serif]";
const plate = "text-[0.68rem] font-semibold uppercase tracking-[0.22em]";
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--abh-berry)]";
const focusLight =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--abh-white)]";

/* Every button on this page is a door: the top corners arch, the bottom sits
   flat on the floor. It is the one geometry the concept never breaks. */
const door = "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-t-[1.4rem] rounded-b-[0.15rem] px-6 text-sm font-semibold transition-colors sm:px-7";
const primaryCta = `${door} bg-[var(--abh-berry)] text-[var(--abh-white)] hover:bg-[var(--abh-berry-deep)] ${focus}`;
const secondaryCta = `${door} border border-[var(--abh-ink)] hover:bg-[var(--abh-ink)] hover:text-[var(--abh-white)] ${focus}`;
const roomLink = `${plate} inline-flex min-h-11 items-center gap-2 text-[var(--abh-berry)] underline-offset-[6px] hover:underline ${focus}`;

/* The braids room is the only part of the house with no photograph anywhere
   public, so it is drawn rather than shot: three strands crossing, on a
   150-unit repeat. The repeat is long on purpose — at a short one the three
   strands cross often enough to read as hatching rather than as a plait. It
   stands upright inside the room's portal and lies down as a band under the
   section that explains the room — one mark, two orientations, nothing else
   on the page borrows it. */
const BRAID_STEP = 150;

function strand(repeats: number, near: number, far: number) {
  let d = `M0 ${near}`;
  for (let i = 0; i < repeats; i += 1) {
    const x = i * BRAID_STEP;
    d += `C${x + 18} ${near} ${x + 34} ${far} ${x + 52} ${far}`;
    d += `C${x + 70} ${far} ${x + 86} ${near} ${x + BRAID_STEP} ${near}`;
  }
  return d;
}

function Braid({
  repeats,
  vertical = false,
  className = "",
}: {
  repeats: number;
  vertical?: boolean;
  className?: string;
}) {
  const length = repeats * BRAID_STEP;
  let centre = "M0 48";
  for (let i = 0; i < repeats; i += 1) {
    const x = i * BRAID_STEP;
    centre += `C${x + 13} 63 ${x + 39} 63 ${x + 52} 48C${x + 65} 33 ${x + 91} 33 ${x + BRAID_STEP} 48`;
  }

  return (
    <svg
      viewBox={vertical ? `0 0 96 ${length}` : `0 0 ${length} 96`}
      /* Laid down, the band is drawn longer than any container and cropped by
         it, so one wave is the same size on a phone and on a desktop instead
         of squashing to fit. */
      preserveAspectRatio={vertical ? undefined : "xMinYMid slice"}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g
        transform={vertical ? "rotate(90) translate(0 -96)" : undefined}
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      >
        <path d={strand(repeats, 24, 72)} vectorEffect="non-scaling-stroke" />
        <path d={strand(repeats, 72, 24)} vectorEffect="non-scaling-stroke" />
        <path d={centre} vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}

/* Heights and crops per portal, keyed by room id rather than array position:
   a hallway of doors is only convincing if the doors are not the same size,
   and an index-matched array goes quietly wrong the day a room is added or
   reordered. Three heights, one floor — the openings all stand on the same
   line and differ upward, which is how a wall is actually built. */
const PORTAL: Record<(typeof rooms)[number]["id"], { frame: string; crop: string }> = {
  salon: { frame: "h-[17rem] sm:h-[21rem] lg:h-[25rem]", crop: "object-[64%_52%]" },
  braids: { frame: "h-[19rem] sm:h-[24rem] lg:h-[28rem]", crop: "" },
  kids: { frame: "h-[16rem] sm:h-[19rem] lg:h-[21rem]", crop: "object-[50%_58%]" },
};

export default function AndreaBeautyHousePage() {
  return (
    <div
      className={`${styles.page} ${display.variable} ${sans.variable} min-h-screen bg-[var(--abh-white)] pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-[var(--abh-ink)] [font-family:var(--font-abh-sans),system-ui,sans-serif] md:pb-0`}
    >
      <VakyBar />

      {/* The header is the building directory: the name on the left, the three
          rooms as door plates on the right, separated by the thin vertical
          jambs that run through the whole page. On a phone the directory drops
          to its own strip under the name — three doors always visible, never
          folded into a hamburger. */}
      <header className="border-b border-[var(--abh-line)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 px-5 pt-3 sm:px-8 sm:py-4">
          <a href="#vrh" className={`inline-flex min-h-11 flex-col justify-center ${focus}`}>
            <span className={`${serif} text-lg leading-none tracking-tight sm:text-xl`}>Andrea</span>
            <span className={`${plate} mt-1 text-[0.6rem] text-[var(--abh-muted)]`}>
              Beauty House
            </span>
          </a>

          <a
            href={house.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="demo_contact"
            data-umami-event-demo="andrea-beauty-house"
            data-umami-event-action="instagram-header"
            className={`hidden min-h-11 items-center rounded-t-[1.1rem] rounded-b-[0.15rem] border border-[var(--abh-berry)] px-5 text-xs font-semibold text-[var(--abh-berry)] transition-colors hover:bg-[var(--abh-berry)] hover:text-[var(--abh-white)] sm:inline-flex md:order-1 md:ml-8 ${focus}`}
          >
            Piši na Instagramu
          </a>

          <nav
            aria-label="Sobe u kući"
            className="order-last -mx-5 mt-3 flex w-[calc(100%+2.5rem)] border-t border-[var(--abh-line)] sm:-mx-8 sm:w-[calc(100%+4rem)] md:order-none md:mx-0 md:ml-auto md:mt-0 md:w-auto md:border-t-0"
          >
            {rooms.map((room, index) => (
              <a
                key={room.id}
                href={`#${room.id}`}
                className={`flex min-h-11 flex-1 items-center justify-center gap-2 px-3 transition-colors hover:text-[var(--abh-berry)] md:flex-none md:px-5 ${index > 0 ? "border-l border-[var(--abh-line)]" : ""} ${focus}`}
              >
                <span className={`${plate} text-[0.66rem]`}>{room.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="vrh">
        {/* The doorway. One photograph — the house's own pink booth, with its
            name written across it — hung inside an arched opening, with a
            second arch drawn around it like the casing of a real door. The
            casing's right jamb passes behind the headline, so the words sit
            in the opening rather than beside it. */}
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14 md:grid md:grid-cols-[18rem_1fr] md:items-center md:gap-10 lg:grid-cols-[25rem_1fr] lg:gap-16 lg:pb-24 lg:pt-16">
          <div className="relative order-1 mx-auto mb-14 max-w-[21rem] sm:max-w-[24rem] md:mx-0 md:mb-0 md:max-w-none">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 bottom-10 left-8 hidden rounded-t-[12rem] rounded-b-[0.2rem] border border-[var(--abh-line-strong)] lg:block lg:-right-16"
            />
            <figure className="relative overflow-hidden rounded-t-[12rem] rounded-b-[0.2rem] border border-[var(--abh-line-strong)] bg-[var(--abh-blush)] p-2.5">
              <DemoPhoto
                src={doorway.src}
                alt={doorway.alt}
                width={doorway.width}
                height={doorway.height}
                priority
                sizes="(min-width: 1024px) 25rem, (min-width: 768px) 18rem, (min-width: 640px) 24rem, 88vw"
                className="block h-[17.5rem] w-full rounded-t-[11rem] rounded-b-[0.1rem] object-cover object-[54%_38%] sm:h-[24rem] md:h-[25rem] lg:h-[32rem]"
              />
            </figure>
            {/* The plate a building puts beside its front door: what is inside. */}
            <p className="absolute -bottom-6 left-0 border border-[var(--abh-line-strong)] bg-[var(--abh-white)] px-4 py-3 md:-left-4">
              <span className={`${plate} text-[0.6rem] text-[var(--abh-muted)]`}>
                Salon · Braids · Kids
              </span>
            </p>
          </div>

          <div className="relative z-10 order-2 lg:-ml-10">
            <p className={`${plate} text-[var(--abh-berry)]`}>
              Beauty house · {house.area}
            </p>
            <h1
              className={`${serif} mt-5 text-[clamp(2.4rem,7vw,2.9rem)] leading-[1.02] tracking-[-0.02em] lg:text-[clamp(2.8rem,4.4vw,4.3rem)]`}
            >
              Jedna kuća.
              <br />
              <em className="text-[var(--abh-berry)]">Mnogo načina</em>
              <br />
              da budeš svoja.
            </h1>
            <p className="mt-7 max-w-md text-base leading-relaxed text-[var(--abh-muted)] sm:text-lg">
              Beauty usluge za odrasle i poseban svijet za najmlađe u New Cityju.
            </p>
            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
              <a
                href={house.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="andrea-beauty-house"
                data-umami-event-action="instagram-hero"
                className={`${primaryCta} ${styles.ring}`}
              >
                <InstagramIcon className="h-4 w-4" />
                Piši na Instagramu
              </a>
              <a href="#sobe" className={secondaryCta}>
                Istraži sobe
              </a>
            </div>
          </div>
        </section>

        {/* Three doors, three widths, three heights. The house really does run
            a separate profile for each room, so this is the page's spine and
            not a card grid: the portals sit at different heights the way
            openings do in a wall that was built room by room. */}
        <section id="sobe" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className={`${styles.threshold} border-t border-[var(--abh-line)] pt-12 sm:pt-16`}>
              <h2
                className={`${serif} max-w-xl text-[clamp(1.9rem,5vw,3rem)] leading-[1.08] tracking-tight`}
              >
                Tri sobe pod istim krovom.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-[var(--abh-muted)]">
                Svaka soba ima svoju publiku i svoj Instagram profil. Izaberi vrata kroz koja
                ulaziš.
              </p>
            </div>

            {/* Two rows, shared by every door: the openings, then everything
                written under them. Each room takes both rows as a subgrid, so
                three portals of three different heights all stand on one floor
                line and the three names start on one line above the fold of
                text. Without the floor line they read as three cards that
                failed to line up rather than as a wall with openings cut into
                it at different heights. */}
            <ul className="mt-12 grid gap-12 sm:mt-16 md:grid-cols-[1.1fr_0.82fr_1.05fr] md:grid-rows-[auto_auto] md:gap-x-6 md:gap-y-0 lg:gap-x-10">
              {rooms.map((room) => {
                const shape = PORTAL[room.id];
                const photo = room.id === "salon" ? roomPhotos.salon : room.id === "kids" ? roomPhotos.kids : null;

                return (
                  <li key={room.id} className="md:row-span-2 md:grid md:grid-rows-subgrid">
                    {/* Same construction as the doorway: a blush mat, then the
                        opening cut into it. The mat is what makes the frame
                        line legible — and the frame line is the thing that
                        opens as the portal arrives. */}
                    <div
                      className={`${styles.frame} relative rounded-t-[9rem] rounded-b-[0.25rem] bg-[var(--abh-blush)] p-2 md:self-end ${shape.frame}`}
                    >
                      <div
                        className={`h-full overflow-hidden rounded-t-[8.5rem] rounded-b-[0.15rem] ${photo ? "" : "bg-[var(--abh-berry)]"}`}
                      >
                        {photo ? (
                          <DemoPhoto
                            src={photo.src}
                            alt={photo.alt}
                            width={photo.width}
                            height={photo.height}
                            sizes="(min-width: 768px) 32vw, 88vw"
                            className={`block h-full w-full object-cover ${shape.crop}`}
                          />
                        ) : (
                          /* The arch is at its tallest on the centre line, so
                             the drawing hangs there and the words sit on the
                             floor of the opening — nothing runs into the curve. */
                          <div className="flex h-full flex-col items-center justify-between gap-5 px-5 pb-7 pt-9 text-center text-[var(--abh-white)]">
                            {/* Height only, width from the drawing: the plait
                                is the room's picture, so it is given the depth
                                of the opening rather than a thumbnail's worth
                                of it. */}
                            <Braid
                              repeats={2}
                              vertical
                              className="h-36 w-auto shrink-0 text-[var(--abh-gold)] sm:h-48 lg:h-56"
                            />
                            <div>
                              <p
                                className={`${serif} text-[clamp(1.7rem,4vw,2.4rem)] italic leading-[1]`}
                              >
                                Pletenice
                              </p>
                              <p className={`${plate} mt-3 text-[0.58rem] text-[var(--abh-on-berry)]`}>
                                i afro pletenice
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* The door plate: one block, so the three of them occupy
                        the subgrid's second row together and their names share
                        a baseline however tall the opening above them is. */}
                    <div className="mt-5">
                      <h3 className={`${serif} text-2xl tracking-tight sm:text-3xl`}>
                        {room.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--abh-muted)]">
                        {room.line}
                      </p>
                      <a
                        href={room.cta.href}
                        {...(room.cta.external
                          ? {
                              target: "_blank",
                              rel: "noopener noreferrer",
                              "data-umami-event": "demo_contact",
                              "data-umami-event-demo": "andrea-beauty-house",
                              "data-umami-event-action": room.cta.umamiAction,
                            }
                          : {})}
                        className={`${roomLink} mt-3`}
                      >
                        {room.cta.label}
                        <span aria-hidden="true">{room.cta.external ? "↗" : "↓"}</span>
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* The adult half, set on the one dark ground on the page. Six services
            written as a single running line with gold points between them —
            the profile lists them as a sentence, so the page keeps them one. */}
        <section
          id="salon"
          className="mt-20 scroll-mt-6 bg-[var(--abh-ink)] text-[var(--abh-white)] sm:mt-28"
        >
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:grid lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className={`${plate} text-[var(--abh-gold)]`}>Salon</p>
              <h2
                className={`${serif} mt-5 text-[clamp(1.8rem,4.4vw,2.6rem)] leading-[1.1] tracking-tight`}
              >
                Za odrasle, u mirnijem dijelu kuće.
              </h2>
              <p className="mt-6 max-w-sm leading-relaxed text-[var(--abh-on-ink)]">
                Bijeli prostor sa zidom lakova, lučnim ogledalima i roze detaljima — isti onaj koji
                se vidi kroz izlog iz New Cityja.
              </p>
            </div>

            <ul
              className={`${serif} mt-10 flex flex-wrap items-baseline text-[clamp(1.55rem,4.6vw,3.1rem)] leading-[1.14] lg:mt-0`}
            >
              {salonServices.map((service, index) => (
                <li key={service} className="flex items-baseline">
                  {service}
                  {index < salonServices.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="px-3 text-[0.45em] text-[var(--abh-gold)] sm:px-4"
                    >
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The kids room, and the only place on the page where the colour is
            allowed to rise. The copy stays deliberately short: the space is
            real and photographed, everything else — what a visit includes, how
            long it lasts, who is there — is the owner's to say, not ours. */}
        <section id="kids" className="scroll-mt-6 bg-[var(--abh-blush)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:grid lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <div>
              <p className={`${plate} text-[var(--abh-berry)]`}>Kids</p>
              <h2
                className={`${serif} mt-5 text-[clamp(1.9rem,4.6vw,2.8rem)] leading-[1.08] tracking-tight`}
              >
                Svijet napravljen{" "}
                <em className="text-[var(--abh-berry)]">za najmlađe.</em>
              </h2>
              <p className="mt-6 max-w-sm leading-relaxed text-[var(--abh-muted)]">
                Odvojen dio kuće, sa sopstvenim muralima, foteljama i toaletnim stočićima. Nije
                umanjena verzija salona — napravljen je za djecu od prvog detalja.
              </p>
              <a
                href="https://www.instagram.com/kids_beautyhouse/"
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="andrea-beauty-house"
                data-umami-event-action="instagram-kids-sekcija"
                className={`${primaryCta} mt-8`}
              >
                <InstagramIcon className="h-4 w-4" />
                @kids_beautyhouse
              </a>
            </div>

            {/* Two frames, unequal in width and height, hung from the same
                picture rail: the tops line up and the difference falls at the
                bottom, so the pair reads as hung rather than as one frame that
                slid down the wall. */}
            <div className="mt-10 grid gap-4 sm:grid-cols-[1.24fr_0.76fr] sm:items-start sm:gap-5 lg:mt-0">
              <figure className="border border-[var(--abh-line-strong)] bg-[var(--abh-white)] p-2">
                <DemoPhoto
                  src={kidsPhotos[0].src}
                  alt={kidsPhotos[0].alt}
                  width={kidsPhotos[0].width}
                  height={kidsPhotos[0].height}
                  sizes="(min-width: 1024px) 42vw, (min-width: 640px) 60vw, 88vw"
                  className="block h-56 w-full object-cover sm:h-[22rem] lg:h-[26rem]"
                />
              </figure>
              <figure className="border border-[var(--abh-line-strong)] bg-[var(--abh-white)] p-2">
                <DemoPhoto
                  src={kidsPhotos[1].src}
                  alt={kidsPhotos[1].alt}
                  width={kidsPhotos[1].width}
                  height={kidsPhotos[1].height}
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 88vw"
                  className="block h-56 w-full object-cover sm:h-[17rem] lg:h-[20rem]"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* Braids has a profile of its own and no public photograph, so this
            block is typographic on purpose rather than by accident. */}
        <section id="braids" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            {/* Heading left, the reason right, the mark underneath: the one
                section on the page that runs horizontally instead of splitting
                into a text column and a picture column. */}
            <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
              <div>
                <p className={`${plate} text-[var(--abh-berry)]`}>Braids</p>
                <h2
                  className={`${serif} mt-5 text-[clamp(1.9rem,5.4vw,3.2rem)] leading-[1.04] tracking-tight`}
                >
                  Pletenice i <em>afro pletenice.</em>
                </h2>
              </div>
              <div className="lg:pb-2">
                <p className="max-w-md leading-relaxed text-[var(--abh-muted)]">
                  Zaseban posao i zaseban profil: tamo stoje završene pletenice, i tamo se dogovara
                  termin.
                </p>
                <a
                  href="https://www.instagram.com/braids_beautyhouse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="demo_contact"
                  data-umami-event-demo="andrea-beauty-house"
                  data-umami-event-action="instagram-braids-sekcija"
                  className={`${primaryCta} mt-7`}
                >
                  <InstagramIcon className="h-4 w-4" />
                  @braids_beautyhouse
                </a>
              </div>
            </div>

            <div className="mt-12 overflow-hidden border-y border-[var(--abh-line)] py-7 sm:mt-16 sm:py-9">
              <Braid repeats={11} className="h-24 w-full text-[var(--abh-berry)] sm:h-28 lg:h-32" />
            </div>
          </div>
        </section>

        {/* Two frames from inside the house: the macaron stools that stand in
            the window beside the booth, and the wall of polish behind the
            manicure desks. Unequal on purpose — a matched pair would flatten
            them into a gallery widget. */}
        <section id="enterijer" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
            <div className={`${styles.threshold} border-t border-[var(--abh-line)] pt-12 sm:pt-16`}>
              <h2
                className={`${serif} max-w-lg text-[clamp(1.8rem,4.4vw,2.5rem)] leading-[1.1] tracking-tight`}
              >
                Kuća se vidi u detaljima.
              </h2>
            </div>

            <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-[0.95fr_0.62fr_0.9fr] sm:gap-6 lg:gap-10">
              <figure
                className={`${styles.frame} relative self-start rounded-t-[7rem] rounded-b-[0.25rem] bg-[var(--abh-blush)] p-2`}
              >
                <div className="overflow-hidden rounded-t-[6.6rem] rounded-b-[0.15rem]">
                  <DemoPhoto
                    src={interiorPhotos[0].src}
                    alt={interiorPhotos[0].alt}
                    width={interiorPhotos[0].width}
                    height={interiorPhotos[0].height}
                    sizes="(min-width: 640px) 32vw, 88vw"
                    className="block h-72 w-full object-cover sm:h-[26rem] lg:h-[30rem]"
                  />
                </div>
              </figure>
              <figure
                className={`${styles.frame} relative self-start rounded-t-[5rem] rounded-b-[0.25rem] bg-[var(--abh-blush)] p-2 sm:mt-16`}
              >
                <div className="overflow-hidden rounded-t-[4.6rem] rounded-b-[0.15rem]">
                  <DemoPhoto
                    src={interiorPhotos[1].src}
                    alt={interiorPhotos[1].alt}
                    width={interiorPhotos[1].width}
                    height={interiorPhotos[1].height}
                    sizes="(min-width: 640px) 21vw, 88vw"
                    className="block h-64 w-full object-cover sm:h-[21rem] lg:h-[24rem]"
                  />
                </div>
              </figure>
              <div className="sm:mt-40">
                <p className="max-w-sm leading-relaxed text-[var(--abh-muted)]">
                  Roze govornica na ulazu, tabure u obliku makarona uz izlog, zid sa lakovima iza
                  stolova za manikir — detalji po kojima se kuća pamti.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The way out is the way in: one address line, one channel. */}
        <section className="bg-[var(--abh-berry)] text-[var(--abh-white)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            <div>
              <h2
                className={`${serif} text-[clamp(2.1rem,6vw,3.4rem)] leading-[1.02] tracking-tight`}
              >
                Vrata su otvorena.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-[var(--abh-on-berry)]">
                Za termin, dogovor i sve ostalo — poruka na Instagram stiže direktno u kuću. Za
                pletenice i za najmlađe postoje posebni profili.
              </p>
            </div>

            <address className="mt-10 not-italic lg:mt-0">
              <p className={`${plate} text-[var(--abh-on-berry)]`}>Gdje smo</p>
              <p className={`${serif} mt-3 text-2xl tracking-tight sm:text-3xl`}>{house.area}</p>
              <a
                href={house.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="andrea-beauty-house"
                data-umami-event-action="instagram-close"
                className={`${door} ${styles.ring} mt-7 bg-[var(--abh-white)] text-[var(--abh-berry)] hover:bg-[var(--abh-blush)] ${focusLight}`}
              >
                <InstagramIcon className="h-4 w-4" />@{house.instagram}
              </a>
            </address>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--abh-line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className={`${serif} text-xl tracking-tight`}>{house.name}</p>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-[var(--abh-muted)]">
              Nezvanični dizajn koncept. Fotografije su preuzete iz javnog onlajn kataloga
              podgoričkih objekata, a podaci o uslugama sa zvaničnih Instagram profila kuće — sve
              služi samo za prikaz ideje.
            </p>
          </div>
          <p className="text-xs text-[var(--abh-muted)]">
            Koncept:{" "}
            <Link
              href="/"
              className={`inline-flex min-h-11 items-center font-semibold text-[var(--abh-ink)] hover:underline ${focus}`}
            >
              Vaky
            </Link>
          </p>
        </div>
      </footer>

      {/* Phones only: the booth itself, shrunk to a button. Arched top, berry
          ground, and the thin white line the real booth wears as its name
          plate. It floats centred rather than spanning the screen, so the page
          underneath is never cut in half by a bar. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[calc(0.85rem+env(safe-area-inset-bottom))] md:hidden">
        <a
          href={house.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="demo_contact"
          data-umami-event-demo="andrea-beauty-house"
          data-umami-event-action="instagram-sticky"
          className={`pointer-events-auto relative inline-flex min-h-14 items-center gap-2.5 rounded-t-[1.35rem] rounded-b-[0.25rem] bg-[var(--abh-berry)] px-6 pt-2 text-sm font-semibold text-[var(--abh-white)] shadow-[0_6px_22px_rgba(27,20,24,0.22)] ${focusLight}`}
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-4 top-2.5 h-px bg-[color-mix(in_srgb,var(--abh-white)_45%,transparent)]"
          />
          <InstagramIcon className="h-5 w-5" />
          Piši nam
        </a>
      </div>
    </div>
  );
}
