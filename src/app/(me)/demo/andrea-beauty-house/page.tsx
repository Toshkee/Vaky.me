import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, Work_Sans } from "next/font/google";
import { DemoPhoto } from "@/components/demo/DemoPhoto";
import { VibeLabBar } from "@/components/demo/VibeLabBar";
import { InstagramIcon } from "@/components/demo/ContactIcons";
import { FloatingDoor } from "./FloatingDoor";
import {
  doorway,
  house,
  interiorPhotos,
  kidsPhotos,
  roomPhotos,
  rooms,
  salonServices,
  sectionNav,
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
  title: "Andrea Beauty House — salon, pletenice i kids prostor, Podgorica | Dizajn koncept",
  description:
    "Dizajn koncept za Andrea Beauty House u New Cityju: salon za odrasle, pletenice i odvojen prostor za najmlađe — jedna kuća, tri vrata.",
  robots: { index: false, follow: false },
  openGraph: { images: ["/og-demo-andrea-beauty-house.png"] },
};

const serif = "[font-family:var(--font-abh-display),Georgia,serif]";
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--abh-berry)]";
const focusLight =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--abh-white)]";

/* The one geometry the page repeats: a photo's own box gets a 50% radius on
   its top corners and a near-flat bottom. Because the radius is a percentage
   it fits itself to whatever box it's given, so every photo, doorway and
   detail on the page is cut from the same curve without picking a different
   pixel value per breakpoint. Kept portrait-to-square everywhere — on a wide
   box the same 50% flattens into a tombstone dome.

   Three parts, and the split matters: the mat is the blush border, the box
   owns the height and clips, the image only fills. `DemoPhoto` renders an
   inline `<picture>`, so without a clipping box of its own height the mat
   grows a descender-tall shelf under every photograph. Height belongs to the
   box and is never also written on the image. */
const archMat = "rounded-t-[50%] rounded-b-[10px] bg-[var(--abh-blush)] p-2";
const archBox = "overflow-hidden rounded-t-[50%] rounded-b-[6px]";
const archPhoto = "h-full w-full object-cover";

const doorCta = `inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-[var(--abh-berry)] px-6 text-sm font-semibold text-[var(--abh-white)] transition-colors hover:bg-[var(--abh-berry-deep)] sm:px-7 ${focus}`;
const ghostCta = `inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[var(--abh-ink)] px-6 text-sm font-semibold transition-colors hover:bg-[var(--abh-ink)] hover:text-[var(--abh-white)] sm:px-7 ${focus}`;

/* The braids room has no public photograph anywhere, so its door is drawn
   rather than shot: three strands actually weaving over and under each other
   on a 104-unit repeat — not two crossing wires, which reads as a double
   helix. It always stands upright, once inside its door and once filling the
   room's own arch, and nothing else on the page borrows it.

   A period is 104 units against a ~55-unit band of strands, which is roughly
   the 2:1 of a real plait; the weight is what has to carry at small sizes, so
   the stroke is thick enough that the three cords nearly touch. */
const BRAID_STEP = 104;
const BRAID_MID = 48;
const BRAID_AMP = 23;
const BRAID_SAMPLE = 4;
const BRAID_WEIGHT = 15;
const BRAID_PHASES = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
/* Both ends of the plait sit on a crossing, a twelfth of a turn in: there two
   strands meet in a single point and the third turns around them, which is
   how a real plait closes. Starting at x = 0 instead puts all three strands
   at maximum spread, so their round caps line up across the band and the
   terminal reads as a flat cut bar. */
const BRAID_START = BRAID_STEP / 12;
/* A round cap overshoots its own endpoint by half a stroke, and an svg clips
   at its viewport edge — which is what was slicing the caps flat. The box is
   opened by that much at both ends so the ends stay round. */
const BRAID_CAP = BRAID_WEIGHT / 2 + 1;

function braidY(x: number, phase: number) {
  return BRAID_MID + BRAID_AMP * Math.sin((2 * Math.PI * x) / BRAID_STEP + phase);
}

/* One strand's path over a single third-of-a-period stretch, sampled finely
   enough that the thick stroke reads as a smooth cord rather than facets. */
function braidSegment(phase: number, from: number, to: number) {
  let d = "";
  for (let x = from; x <= to; x += BRAID_SAMPLE) {
    d += `${x === from ? "M" : "L"}${x.toFixed(1)} ${braidY(x, phase).toFixed(1)} `;
  }
  if ((to - from) % BRAID_SAMPLE !== 0) {
    d += `L${to.toFixed(1)} ${braidY(to, phase).toFixed(1)}`;
  }
  return d;
}

function Braid({ repeats, className = "" }: { repeats: number; className?: string }) {
  /* Whole repeats only, `meet` rather than `slice`, and both terminals moved
     onto a crossing with room left for their caps: the plait then closes at
     each end instead of being cut through the middle of a loop or shaved off
     square by the viewport. The svg carries real width and height attributes
     so callers can set the height alone and let the width fall out of the
     ratio — nothing is ever squeezed. */
  const length = repeats * BRAID_STEP;
  const end = BRAID_START + length;
  const third = BRAID_STEP / 3;
  const chunkCount = Math.ceil(end / third);

  /* A real three-strand plait alternates which strand crosses in front every
     third of a turn. Splitting the path into third-period chunks and, in
     each one, drawing the other two strands first and the "front" strand
     last reproduces that over/under weave with plain z-order — no colour
     tricks needed. */
  const chunks = Array.from({ length: chunkCount }, (_, n) => ({
    from: Math.max(n * third, BRAID_START),
    to: Math.min((n + 1) * third, end),
    front: n % 3,
  }));

  const viewFrom = BRAID_START - BRAID_CAP;
  const viewLength = length + BRAID_CAP * 2;

  return (
    <svg
      viewBox={`0 ${viewFrom.toFixed(2)} 96 ${viewLength}`}
      preserveAspectRatio="xMidYMid meet"
      width={96}
      height={viewLength}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g
        transform="rotate(90) translate(0 -96)"
        stroke="currentColor"
        strokeWidth={BRAID_WEIGHT}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {chunks.map((chunk, i) => (
          <g key={i}>
            {BRAID_PHASES.map(
              (phase, k) =>
                k !== chunk.front && (
                  <path key={k} d={braidSegment(phase, chunk.from, chunk.to)} />
                ),
            )}
            <path d={braidSegment(BRAID_PHASES[chunk.front], chunk.from, chunk.to)} />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* The hallway, authored door by door instead of poured into three equal
   cells: Salon is the business, so it gets the widest and tallest door and
   stands flush at the left; Pletenice and Kids step back and down beside it.
   Keyed by room id, so adding a fourth room is a type error until someone
   decides what its door looks like. */
const DOOR_LAYOUT: Record<(typeof rooms)[number]["id"], { cell: string; box: string }> = {
  salon: { cell: "", box: "h-[21rem] sm:h-[18rem] lg:h-[26rem]" },
  braids: {
    cell: "max-w-[86%] sm:mt-6 sm:max-w-none lg:mt-8",
    box: "h-[18rem] sm:h-[15rem] lg:h-[21rem]",
  },
  kids: {
    cell: "max-w-[72%] sm:mt-12 sm:max-w-none lg:mt-16",
    box: "h-[15rem] sm:h-[13rem] lg:h-[17rem]",
  },
};

/* Crop and rendered width per room photograph, keyed by the photo map's own
   keys rather than by room id — the braids door is drawn, not shot, so it
   never needs an empty entry here. */
const ROOM_FRAME: Record<keyof typeof roomPhotos, { crop: string; sizes: string }> = {
  salon: {
    crop: "object-[64%_52%]",
    sizes: "(min-width: 1024px) 26rem, (min-width: 640px) 34vw, 92vw",
  },
  kids: {
    crop: "object-[50%_58%]",
    sizes: "(min-width: 1024px) 18rem, (min-width: 640px) 23vw, 72vw",
  },
};

const roomsById = Object.fromEntries(rooms.map((room) => [room.id, room])) as Record<
  (typeof rooms)[number]["id"],
  (typeof rooms)[number]
>;

export default function AndreaBeautyHousePage() {
  return (
    <div
      className={`${styles.page} ${display.variable} ${sans.variable} min-h-screen bg-[var(--abh-white)] pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-[var(--abh-ink)] [font-family:var(--font-abh-sans),system-ui,sans-serif] md:pb-0`}
    >
      <VibeLabBar />

      <header className="border-b border-[var(--abh-line)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <a href="#vrh" className={`inline-flex min-h-11 items-baseline gap-2 ${focus}`}>
            <span className={`${serif} text-lg leading-none sm:text-xl`}>Andrea</span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--abh-muted)]">
              Beauty House
            </span>
          </a>

          <nav aria-label="Dijelovi kuće" className="hidden items-center gap-6 md:flex">
            {sectionNav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`inline-flex min-h-11 items-center text-sm text-[var(--abh-muted)] transition-colors hover:text-[var(--abh-berry)] ${focus}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={house.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="demo_contact"
            data-umami-event-demo="andrea-beauty-house"
            data-umami-event-action="instagram-header"
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--abh-berry)] px-4 text-xs font-semibold text-[var(--abh-berry)] transition-colors hover:bg-[var(--abh-berry)] hover:text-[var(--abh-white)] sm:px-5 sm:text-sm ${focus}`}
          >
            <InstagramIcon className="h-4 w-4" />
            Instagram
          </a>
        </div>
      </header>

      <main id="vrh">
        {/* Everything a visitor needs to decide whether to walk in: the
            house's own pink booth, what the house actually does, one way to
            say hello. On a phone these three things fill the first screen on
            their own — nothing else competes for it. */}
        <section className="mx-auto max-w-6xl px-5 pb-14 pt-9 sm:px-8 sm:pb-20 sm:pt-14 md:grid md:grid-cols-[15rem_1fr] md:items-center md:gap-12 lg:grid-cols-[26rem_1fr] lg:gap-20 lg:pb-28 lg:pt-16">
          <div className="relative order-1 mx-auto mb-9 max-w-[17.5rem] sm:mb-12 sm:max-w-[20rem] md:mx-0 md:mb-0 md:max-w-none">
            {/* A second arch offset behind the photo, closed on all four
                sides — an echo of the booth, not a line that stops short. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 hidden rounded-t-[50%] rounded-b-[10px] border border-[var(--abh-line-strong)] lg:block"
            />
            <figure className={`relative ${archMat}`}>
              <div className={`${archBox} h-[16rem] sm:h-[19rem] md:h-[22rem] lg:h-[28rem]`}>
                <DemoPhoto
                  src={doorway.src}
                  alt={doorway.alt}
                  width={doorway.width}
                  height={doorway.height}
                  priority
                  sizes="(min-width: 1024px) 26rem, (min-width: 768px) 15rem, (min-width: 640px) 20rem, 75vw"
                  className={`${archPhoto} object-[62%_46%] sm:object-[54%_38%]`}
                />
              </div>
            </figure>
          </div>

          <div className="relative z-10 order-2 lg:-ml-6">
            <p className="text-sm text-[var(--abh-muted)]">
              Frizerske usluge, nokti i šminka — {house.area}.
            </p>
            <h1
              className={`${serif} mt-4 [text-wrap:balance] text-[clamp(2.1rem,7.4vw,2.7rem)] leading-[1.05] tracking-[-0.01em] lg:text-[clamp(2.6rem,4.2vw,4rem)]`}
            >
              Jedna kuća. <em className="text-[var(--abh-berry)]">Mnogo načina</em> da budeš svoja.
            </h1>
            <p className="mt-5 max-w-md [text-wrap:pretty] text-base leading-relaxed text-[var(--abh-muted)] sm:text-lg">
              Salon za odrasle, pletenice i poseban svijet za najmlađe — sve pod istim krovom.
            </p>
            {/* Labels never break: `whitespace-nowrap` on both buttons plus a
                wrapping row, so a container that runs out of width drops the
                second button onto its own line instead of splitting a label
                across two — the failure mode stays visible in review. */}
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {/* The one knock on the page. Every other button on the page is
                  a plain colour change, so this gesture stays a signature
                  instead of a habit. */}
              <a
                href={house.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="andrea-beauty-house"
                data-umami-event-action="instagram-hero"
                className={`${styles.knock} ${doorCta}`}
              >
                <InstagramIcon className="h-4 w-4" />
                Piši na Instagramu
              </a>
              <a href="#sobe" className={ghostCta}>
                Pogledaj sobe
              </a>
            </div>
            {/* Marks the end of the hero's own call to action. The floating
                door button below stays off the page until this point has
                scrolled out of view, so the two never compete. */}
            <div id="hero-cta-sentinel" aria-hidden="true" className="h-px" />
          </div>
        </section>

        {/* Three doors, one hallway. Each opens straight onto the room's own
            Instagram — that really is how the house runs itself — so this is
            a set of doors to walk through, not a card grid to read. The doors
            are deliberately unequal: the salon is the business. */}
        <section id="sobe" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="border-t border-[var(--abh-gold)] pt-12 sm:pt-16">
              <div className="max-w-lg">
                <h2 className={`${serif} [text-wrap:balance] text-[clamp(1.8rem,5vw,2.6rem)] leading-[1.1] tracking-tight`}>
                  Tri sobe, jedan ulaz.
                </h2>
                <p className="mt-4 [text-wrap:pretty] leading-relaxed text-[var(--abh-muted)]">
                  Svaka soba ima svoju publiku i svoj profil. Pokucaj na vrata koja te zovu.
                </p>
              </div>
            </div>

            <ul className="mt-10 grid gap-10 sm:mt-14 sm:grid-cols-[1.25fr_1fr_0.85fr] sm:gap-5 lg:gap-9">
              {rooms.map((room) => (
                <li key={room.id} className={DOOR_LAYOUT[room.id].cell}>
                  <a
                    href={room.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="demo_contact"
                    data-umami-event-demo="andrea-beauty-house"
                    data-umami-event-action={room.umamiAction}
                    className={`${styles.door} flex h-full flex-col ${focus}`}
                  >
                    <div className={archMat}>
                      <div className={`${archBox} ${DOOR_LAYOUT[room.id].box}`}>
                        {room.id === "braids" ? (
                          <div className="flex h-full w-full items-center justify-center bg-[var(--abh-berry)]">
                            <Braid
                              repeats={2}
                              className="h-[82%] w-auto text-[var(--abh-on-berry)]"
                            />
                          </div>
                        ) : (
                          <DemoPhoto
                            src={roomPhotos[room.id].src}
                            alt={roomPhotos[room.id].alt}
                            width={roomPhotos[room.id].width}
                            height={roomPhotos[room.id].height}
                            sizes={ROOM_FRAME[room.id].sizes}
                            className={`${archPhoto} ${ROOM_FRAME[room.id].crop}`}
                          />
                        )}
                      </div>
                    </div>

                    <h3 className={`${serif} mt-5 text-2xl tracking-tight sm:text-[1.6rem]`}>
                      {room.name}
                    </h3>
                    {/* The door's only hover state: a berry rule drawn under
                        its name, left to right. Flat panels stay flat — no
                        lift, no zoom on the photograph behind them. */}
                    <span
                      aria-hidden="true"
                      className={`${styles.rule} mt-2 block h-[2px] w-14 bg-[var(--abh-berry)]`}
                    />
                    <p className="mt-3 text-sm leading-relaxed text-[var(--abh-muted)]">
                      {room.line}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-[var(--abh-berry)]">
                      @{room.instagram}
                      <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The page's one deep section. The salon is the reason someone walks
            in, so it carries the whole service list as a running sentence,
            the tall wall of polishes the copy names, and its own way to write
            — and the two room sections after it stay deliberately quieter. */}
        <section id="salon" className="mt-20 scroll-mt-6 bg-[var(--abh-blush)] sm:mt-28">
          {/* Same max-w-6xl rail as every other section — the peak section is
              denser than the rest, not inset from it. The arch's track is in
              rem so the wall of polishes keeps its own portrait proportion
              instead of stretching with the container. */}
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:grid lg:grid-cols-[1fr_21rem] lg:items-start lg:gap-14">
            <div>
              <h2 className={`${serif} [text-wrap:balance] text-[clamp(2rem,5.4vw,3rem)] leading-[1.06] tracking-tight`}>
                Za odrasle, u mirnijem dijelu kuće.
              </h2>
              <p className="mt-5 max-w-md [text-wrap:pretty] leading-relaxed text-[var(--abh-muted)]">
                Bijeli prostor sa zidom lakova, lučnim ogledalima i roze detaljima — isti onaj koji
                se vidi kroz izlog iz New Cityja.
              </p>

              {/* The separator is never a flex item of its own: it trails the
                  service it follows, inside that item, with equal air on both
                  sides. A break can then only fall after a dot, so no line
                  ever opens with one hanging outside the left rail. */}
              <p
                className={`${serif} mt-8 flex flex-wrap items-baseline text-[clamp(1.5rem,4vw,2.35rem)] italic leading-[1.3] text-[var(--abh-berry-deep)]`}
              >
                {salonServices.map((service, index) => (
                  <span key={service} className="flex items-baseline">
                    {service}
                    {index < salonServices.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="mx-2 not-italic text-[0.66em] text-[var(--abh-berry)] sm:mx-2.5"
                      >
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </p>

              <a
                href={roomsById.salon.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="andrea-beauty-house"
                data-umami-event-action="instagram-salon-sekcija"
                className={`${doorCta} mt-9`}
              >
                <InstagramIcon className="h-4 w-4" />@{roomsById.salon.instagram}
              </a>
            </div>

            {/* The wall of polishes the paragraph names, at the size it
                deserves. Its only source variant is 480px wide, so the
                rendered width stays under that at every breakpoint. From sm
                up it sits on the type's own left rail rather than floating
                centred in a column nothing else aligns to. */}
            <figure className="mx-auto mt-12 max-w-[15rem] sm:mx-0 sm:max-w-[17rem] lg:mt-0 lg:max-w-none">
              <div className={archMat}>
                <div className={`${archBox} h-[19rem] sm:h-[22rem] lg:h-[25rem]`}>
                  <DemoPhoto
                    src={interiorPhotos[1].src}
                    alt={interiorPhotos[1].alt}
                    width={interiorPhotos[1].width}
                    height={interiorPhotos[1].height}
                    sizes="(min-width: 1024px) 21rem, (min-width: 640px) 17rem, 15rem"
                    className={`${archPhoto} object-[50%_10%]`}
                  />
                </div>
              </div>
            </figure>
          </div>
        </section>

        {/* The kids room, and the one place the colour is allowed to warm up.
            The copy stays short: the space is real and photographed, and
            everything else is the owner's to say once she confirms it. */}
        <section id="kids" className="scroll-mt-6 bg-[var(--abh-kids-field)]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <div>
              <h2 className={`${serif} [text-wrap:balance] text-[clamp(1.75rem,4.4vw,2.2rem)] leading-[1.12] tracking-tight`}>
                Svijet napravljen <em className="text-[var(--abh-berry)]">za najmlađe.</em>
              </h2>
              <p className="mt-5 max-w-sm [text-wrap:pretty] leading-relaxed text-[var(--abh-muted)]">
                Odvojen dio kuće, sa sopstvenim muralima, foteljama i toaletnim stočićima. Nije
                umanjena verzija salona — napravljen je za djecu od prvog detalja.
              </p>
              <a
                href={roomsById.kids.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="andrea-beauty-house"
                data-umami-event-action="instagram-kids-sekcija"
                className={`${doorCta} mt-8`}
              >
                <InstagramIcon className="h-4 w-4" />@{roomsById.kids.instagram}
              </a>
            </div>

            {/* The two frames disagree in height, not by a few pixels of
                margin: a low wide one beside a tall narrow one, so the offset
                survives every breakpoint instead of collapsing on desktop. */}
            <div className="mt-10 grid grid-cols-[0.9fr_1.1fr] items-start gap-4 sm:gap-6 lg:mt-0">
              <div className={archMat}>
                <div className={`${archBox} h-[11rem] sm:h-[14rem] lg:h-[16rem]`}>
                  <DemoPhoto
                    src={kidsPhotos[0].src}
                    alt={kidsPhotos[0].alt}
                    width={kidsPhotos[0].width}
                    height={kidsPhotos[0].height}
                    sizes="(min-width: 1024px) 16rem, (min-width: 640px) 34vw, 42vw"
                    className={archPhoto}
                  />
                </div>
              </div>
              {/* Cropped to the floor: the children's table with its pink
                  towels and hair ties is the subject and the balloon mural
                  behind it only a top band. Object-position alone cannot do
                  it — the source is portrait and so is the arch, so there is
                  barely any slack to slide. The frame is the wider of the two
                  instead, which is what buys the crop, and it stays under a
                  1:1 box so the 50% radius keeps its dome. */}
              <div className={`${archMat} mt-6 sm:mt-10 lg:mt-12`}>
                <div className={`${archBox} h-[13rem] sm:h-[20rem] lg:h-[21rem]`}>
                  <DemoPhoto
                    src={kidsPhotos[1].src}
                    alt={kidsPhotos[1].alt}
                    width={kidsPhotos[1].width}
                    height={kidsPhotos[1].height}
                    sizes="(min-width: 1024px) 20rem, (min-width: 640px) 40vw, 48vw"
                    className={`${archPhoto} object-[50%_100%]`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Braids has a profile of its own and no public photograph, so its
            door is drawn: the three-strand plait standing the full height of
            an arch cut and matted exactly like the photographed ones. */}
        <section id="pletenice" className="scroll-mt-6">
          {/* The door's track is sized in rem rather than as a fraction: the
              arch is a drawn shape, not a photograph, so nothing inside it
              gives the column a width to work from. */}
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:grid lg:grid-cols-[1fr_20rem] lg:items-start lg:gap-16">
            <div className="order-2 lg:order-1">
              <h2 className={`${serif} [text-wrap:balance] text-[clamp(1.75rem,4.6vw,2.2rem)] leading-[1.12] tracking-tight`}>
                Pletenice i <em>afro pletenice.</em>
              </h2>
              <p className="mt-5 max-w-sm [text-wrap:pretty] leading-relaxed text-[var(--abh-muted)]">
                Zaseban posao i zaseban profil: tamo stoje završene pletenice, i tamo se dogovara
                termin.
              </p>
              <a
                href={roomsById.braids.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="andrea-beauty-house"
                data-umami-event-action="instagram-braids-sekcija"
                className={`${doorCta} mt-8`}
              >
                <InstagramIcon className="h-4 w-4" />@{roomsById.braids.instagram}
              </a>
            </div>

            {/* `sm:mx-0` matters twice over: an auto margin on a grid item
                turns off the default stretch, and the item would then shrink
                to the plait's own 110px — a surfboard, not a door — and below
                lg it is what puts the door on the same left rail as the type
                instead of centring it against nothing. */}
            <div className="order-1 mx-auto mb-10 max-w-[13rem] sm:mx-0 sm:max-w-[15rem] lg:order-2 lg:mb-0 lg:max-w-none">
              <div className={archMat}>
                <div
                  className={`${archBox} flex h-[19rem] items-center justify-center bg-[var(--abh-berry)] sm:h-[22rem] lg:h-[26rem]`}
                >
                  <Braid repeats={3} className="h-[86%] w-auto text-[var(--abh-on-berry)]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* One frame from inside the house, at full height: the macaron
            stools by the window with the pink booth standing behind them. */}
        <section id="enterijer" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            {/* The page's second gold hairline, and it spans the same full
                container as the first one above the doors — one mark, one
                width, or it stops reading as one device. The narrow measure
                belongs to the column under it, not to the rule. */}
            <div className="border-t border-[var(--abh-gold)] pt-12 sm:pt-16 lg:grid lg:grid-cols-[1fr_0.72fr] lg:items-start lg:gap-16">
              <div className="lg:max-w-sm">
                <h2 className={`${serif} [text-wrap:balance] text-[clamp(1.6rem,4vw,2rem)] leading-[1.14] tracking-tight`}>
                  Kuća se vidi u detaljima.
                </h2>
                <p className="mt-4 [text-wrap:pretty] leading-relaxed text-[var(--abh-muted)]">
                  Roze govornica na ulazu i tabure u obliku makarona uz izlog — sitnice po kojima se
                  kuća pamti.
                </p>
              </div>

              {/* Left rail from sm up, then flush to the container's right
                  edge at lg — capped at 22rem so the 810x1080 frame keeps its
                  own portrait ratio instead of stretching into a tombstone. */}
              <figure className="mx-auto mt-10 max-w-[16rem] sm:mx-0 sm:max-w-[19rem] lg:mt-0 lg:max-w-[22rem] lg:justify-self-end">
                <div className={archMat}>
                  <div className={`${archBox} h-[22rem] sm:h-[24rem] lg:h-[28rem]`}>
                    <DemoPhoto
                      src={interiorPhotos[0].src}
                      alt={interiorPhotos[0].alt}
                      width={interiorPhotos[0].width}
                      height={interiorPhotos[0].height}
                      sizes="(min-width: 1024px) 22rem, (min-width: 640px) 19rem, 16rem"
                      className={archPhoto}
                    />
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </section>

        {/* The way out is the way in: one location, one channel. */}
        <section className="bg-[var(--abh-berry)] text-[var(--abh-white)]">
          {/* Marks the start of the closing section. The floating door button
              steps aside once this scrolls into view, since the section ends
              on the same Instagram button. It sits outside the grid below on
              purpose — inside it, the hairline would take grid cell one. */}
          <div id="closing-sentinel" aria-hidden="true" className="h-px" />
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            <div>
              <h2 className={`${serif} [text-wrap:balance] text-[clamp(2rem,6vw,3.2rem)] leading-[1.05] tracking-tight`}>
                Vrata su otvorena.
              </h2>
              <p className="mt-5 max-w-md [text-wrap:pretty] leading-relaxed text-[var(--abh-on-berry)]">
                Za termin, dogovor i sve ostalo — poruka na Instagram stiže direktno u kuću. Za
                pletenice i za najmlađe postoje posebni profili.
              </p>
            </div>

            <address className="mt-10 not-italic lg:mt-0">
              <p className="text-sm text-[var(--abh-on-berry)]">
                Gdje smo
              </p>
              <p className={`${serif} mt-2 text-2xl tracking-tight sm:text-3xl`}>{house.area}</p>
              <a
                href={house.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="andrea-beauty-house"
                data-umami-event-action="instagram-close"
                className={`mt-7 inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-[var(--abh-white)] px-6 text-sm font-semibold text-[var(--abh-berry)] transition-colors hover:bg-[var(--abh-kids-field)] sm:px-7 ${focusLight}`}
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
              VibeLab
            </Link>
          </p>
        </div>
      </footer>

      <FloatingDoor href={house.instagramUrl} label="Piši nam" />
    </div>
  );
}
