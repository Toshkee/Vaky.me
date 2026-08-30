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
   it fits itself to whatever box it's given — tall, wide, square — so every
   photo, doorway and detail on the page is cut from the same curve without
   picking a different pixel value per breakpoint. */
const archMat = "rounded-t-[50%] rounded-b-[10px] bg-[var(--abh-blush)] p-2";
const archPhoto = "block h-full w-full rounded-t-[50%] rounded-b-[6px] object-cover";

const doorCta = `${styles.knock} inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[var(--abh-berry)] px-6 text-sm font-semibold text-[var(--abh-white)] transition-colors hover:bg-[var(--abh-berry-deep)] sm:px-7 ${focus}`;
const ghostCta = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--abh-ink)] px-6 text-sm font-semibold transition-colors hover:bg-[var(--abh-ink)] hover:text-[var(--abh-white)] sm:px-7 ${focus}`;

/* The braids room has no public photograph anywhere, so its door is drawn
   rather than shot: three strands actually weaving over and under each
   other on a 104-unit repeat — not two crossing wires, which reads as a
   double helix. Upright inside the door, lying flat as the big panel in the
   room's own section — one mark, two orientations, and nothing else on the
   page borrows it. */
const BRAID_STEP = 104;
const BRAID_MID = 48;
const BRAID_AMP = 23;
const BRAID_SAMPLE = 4;
const BRAID_PHASES = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];

function braidY(x: number, phase: number) {
  return BRAID_MID + BRAID_AMP * Math.sin((2 * Math.PI * x) / BRAID_STEP + phase);
}

/* One strand's path over a single third-of-a-period stretch, sampled finely
   enough that the thick stroke reads as a smooth cord rather than facets. */
function braidSegment(phase: number, from: number, to: number) {
  let d = "";
  for (let x = from; x <= to; x += BRAID_SAMPLE) {
    d += `${x === from ? "M" : "L"}${x} ${braidY(x, phase).toFixed(1)} `;
  }
  if ((to - from) % BRAID_SAMPLE !== 0) {
    d += `L${to} ${braidY(to, phase).toFixed(1)}`;
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
  const third = BRAID_STEP / 3;
  const chunkCount = Math.ceil(length / third);

  /* A real three-strand plait alternates which strand crosses in front every
     third of a turn. Splitting the path into third-period chunks and, in
     each one, drawing the other two strands first and the "front" strand
     last reproduces that over/under weave with plain z-order — no colour
     tricks needed. */
  const chunks = Array.from({ length: chunkCount }, (_, n) => ({
    from: n * third,
    to: Math.min((n + 1) * third, length),
    front: n % 3,
  }));

  return (
    <svg
      viewBox={vertical ? `0 0 96 ${length}` : `0 0 ${length} 96`}
      preserveAspectRatio={vertical ? "xMidYMin slice" : "xMidYMid meet"}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g
        transform={vertical ? "rotate(90) translate(0 -96)" : undefined}
        stroke="currentColor"
        strokeWidth="9"
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

/* Crop points curated per room photo so the arch always frames the part of
   the room worth seeing, keyed by id rather than array position. */
const ROOM_CROP: Record<(typeof rooms)[number]["id"], string> = {
  salon: "object-[64%_52%]",
  braids: "",
  kids: "object-[50%_58%]",
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
            house's own pink booth, the headline, one way to say hello. On a
            phone these three things fill the first screen on their own —
            nothing else competes for it. */}
        <section className="mx-auto max-w-6xl px-5 pb-14 pt-9 sm:px-8 sm:pb-20 sm:pt-14 md:grid md:grid-cols-[21rem_1fr] md:items-center md:gap-12 lg:grid-cols-[26rem_1fr] lg:gap-20 lg:pb-28 lg:pt-16">
          <div className="relative order-1 mx-auto mb-9 max-w-[17.5rem] sm:mb-12 sm:max-w-[20rem] md:mx-0 md:mb-0 md:max-w-none">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-3 -top-3 bottom-6 hidden rounded-t-[50%] rounded-b-[10px] border border-[var(--abh-line-strong)] lg:block"
            />
            <figure className={`relative ${archMat}`}>
              <DemoPhoto
                src={doorway.src}
                alt={doorway.alt}
                width={doorway.width}
                height={doorway.height}
                priority
                sizes="(min-width: 1024px) 26rem, (min-width: 768px) 21rem, (min-width: 640px) 20rem, 75vw"
                className={`${archPhoto} h-[16rem] object-[62%_46%] sm:h-[19rem] sm:object-[54%_38%] md:h-[22rem] lg:h-[28rem]`}
              />
            </figure>
          </div>

          <div className="relative z-10 order-2 lg:-ml-6">
            <p className="text-sm text-[var(--abh-muted)]">
              Beauty house u New Cityju, Podgorica.
            </p>
            <h1
              className={`${serif} mt-4 [text-wrap:balance] text-[clamp(2.1rem,7.4vw,2.7rem)] leading-[1.05] tracking-[-0.01em] lg:text-[clamp(2.6rem,4.2vw,4rem)]`}
            >
              Jedna kuća. <em className="text-[var(--abh-berry)]">Mnogo načina</em> da budeš svoja.
            </h1>
            <p className="mt-5 max-w-md [text-wrap:pretty] text-base leading-relaxed text-[var(--abh-muted)] sm:text-lg">
              Salon za odrasle, pletenice i poseban svijet za najmlađe — sve pod istim krovom.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href={house.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="demo_contact"
                data-umami-event-demo="andrea-beauty-house"
                data-umami-event-action="instagram-hero"
                className={doorCta}
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
            a set of doors to walk through, not a card grid to read. */}
        <section id="sobe" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="max-w-lg border-t border-[var(--abh-line)] pt-12 sm:pt-16">
              <h2 className={`${serif} [text-wrap:balance] text-[clamp(1.8rem,5vw,2.6rem)] leading-[1.1] tracking-tight`}>
                Tri sobe, jedan ulaz.
              </h2>
              <p className="mt-4 [text-wrap:pretty] leading-relaxed text-[var(--abh-muted)]">
                Svaka soba ima svoju publiku i svoj profil. Pokucaj na vrata koja te zovu.
              </p>
            </div>

            <ul className="mt-10 grid gap-10 sm:mt-14 sm:grid-cols-3 sm:gap-6 lg:gap-9">
              {rooms.map((room) => (
                <li key={room.id}>
                  <a
                    href={room.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="demo_contact"
                    data-umami-event-demo="andrea-beauty-house"
                    data-umami-event-action={room.umamiAction}
                    className={`group block ${focus}`}
                  >
                    <div className={archMat}>
                      <div className="h-[15rem] overflow-hidden rounded-t-[50%] rounded-b-[6px] sm:h-[17rem]">
                        {room.id === "braids" ? (
                          <div className="flex h-full items-center justify-center bg-[var(--abh-berry)]">
                            <Braid
                              repeats={2}
                              vertical
                              className="h-[85%] w-10 text-[var(--abh-on-berry)] sm:w-12"
                            />
                          </div>
                        ) : (
                          <DemoPhoto
                            src={roomPhotos[room.id].src}
                            alt={roomPhotos[room.id].alt}
                            width={roomPhotos[room.id].width}
                            height={roomPhotos[room.id].height}
                            sizes="(min-width: 640px) 30vw, 80vw"
                            className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${ROOM_CROP[room.id]}`}
                          />
                        )}
                      </div>
                    </div>

                    <h3 className={`${serif} mt-5 text-2xl tracking-tight sm:text-[1.65rem]`}>
                      {room.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--abh-muted)]">{room.line}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--abh-berry)] group-hover:underline">
                      @{room.instagram}
                      <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The adult room's services, exactly as the profile states them —
            one running sentence on a warm field, not a poster of giant words
            on black. */}
        <section id="salon" className="mt-20 scroll-mt-6 bg-[var(--abh-blush)] sm:mt-28">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
            <div>
              <h2 className={`${serif} [text-wrap:balance] text-[clamp(1.8rem,4.4vw,2.4rem)] leading-[1.12] tracking-tight`}>
                Za odrasle, u mirnijem dijelu kuće.
              </h2>
              <p className="mt-5 max-w-sm [text-wrap:pretty] leading-relaxed text-[var(--abh-muted)]">
                Bijeli prostor sa zidom lakova, lučnim ogledalima i roze detaljima — isti onaj koji
                se vidi kroz izlog iz New Cityja.
              </p>
              <figure className="mt-8 max-w-[5.5rem] sm:max-w-[8rem]">
                <div className={archMat}>
                  <DemoPhoto
                    src={interiorPhotos[1].src}
                    alt={interiorPhotos[1].alt}
                    width={interiorPhotos[1].width}
                    height={interiorPhotos[1].height}
                    sizes="(min-width: 640px) 8rem, 5.5rem"
                    className={`${archPhoto} h-24 sm:h-32`}
                  />
                </div>
              </figure>
            </div>

            <p
              className={`${serif} mt-10 flex flex-wrap items-baseline gap-x-1 text-[clamp(1.4rem,3.6vw,2.1rem)] italic leading-[1.3] text-[var(--abh-berry-deep)] lg:mt-0`}
            >
              {salonServices.map((service, index) => (
                <span key={service} className="flex items-baseline">
                  {service}
                  {index < salonServices.length - 1 && (
                    <span aria-hidden="true" className="mx-2.5 not-italic text-[0.5em] text-[var(--abh-gold)] sm:mx-3">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* The kids room, and the one place the colour is allowed to warm up.
            The copy stays short: the space is real and photographed, and
            everything else is the owner's to say once she confirms it. */}
        <section id="kids" className="scroll-mt-6 bg-[var(--abh-kids-field)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
            <div>
              <h2 className={`${serif} [text-wrap:balance] text-[clamp(1.9rem,4.8vw,2.6rem)] leading-[1.1] tracking-tight`}>
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
                <InstagramIcon className="h-4 w-4" />
                @{roomsById.kids.instagram}
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-0">
              <div className={`${archMat} self-end`}>
                <DemoPhoto
                  src={kidsPhotos[0].src}
                  alt={kidsPhotos[0].alt}
                  width={kidsPhotos[0].width}
                  height={kidsPhotos[0].height}
                  sizes="(min-width: 1024px) 26vw, (min-width: 640px) 34vw, 42vw"
                  className={`${archPhoto} h-44 sm:h-64 lg:h-72`}
                />
              </div>
              <div className={`${archMat} mt-8 self-end sm:mt-14`}>
                <DemoPhoto
                  src={kidsPhotos[1].src}
                  alt={kidsPhotos[1].alt}
                  width={kidsPhotos[1].width}
                  height={kidsPhotos[1].height}
                  sizes="(min-width: 1024px) 26vw, (min-width: 640px) 34vw, 42vw"
                  className={`${archPhoto} h-44 sm:h-64 lg:h-72`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Braids has a profile of its own and no public photograph, so this
            is its own confident moment built from the mark instead: the
            three-strand pattern, standing tall, filling one big arch. */}
        <section id="pletenice" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
            <div className="order-2 lg:order-1">
              <h2 className={`${serif} [text-wrap:balance] text-[clamp(1.9rem,5.4vw,2.8rem)] leading-[1.08] tracking-tight`}>
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
                <InstagramIcon className="h-4 w-4" />
                @{roomsById.braids.instagram}
              </a>
            </div>

            <div className="order-1 mx-auto mb-10 max-w-[16rem] lg:order-2 lg:mx-0 lg:mb-0 lg:max-w-none">
              <div className="flex h-[14rem] w-full items-center justify-center rounded-t-[50%] rounded-b-[10px] bg-[var(--abh-berry)] sm:h-[16rem] lg:h-[19rem]">
                <Braid repeats={6} className="h-16 w-[85%] text-[var(--abh-on-berry)] sm:h-20" />
              </div>
            </div>
          </div>
        </section>

        {/* Two frames from inside the house: the booth by the window and the
            macaron stools that sit beside it. Unequal on purpose. */}
        <section id="enterijer" className="scroll-mt-6">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="max-w-lg border-t border-[var(--abh-line)] pt-12 sm:pt-16">
              <h2 className={`${serif} [text-wrap:balance] text-[clamp(1.7rem,4.4vw,2.3rem)] leading-[1.14] tracking-tight`}>
                Kuća se vidi u detaljima.
              </h2>
              <p className="mt-4 [text-wrap:pretty] leading-relaxed text-[var(--abh-muted)]">
                Roze govornica na ulazu i tabure u obliku makarona uz izlog — sitnice po kojima se
                kuća pamti.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-5 sm:mt-12 sm:gap-8 lg:grid-cols-[0.62fr_0.38fr] lg:gap-10">
              <div className={archMat}>
                <DemoPhoto
                  src={interiorPhotos[0].src}
                  alt={interiorPhotos[0].alt}
                  width={interiorPhotos[0].width}
                  height={interiorPhotos[0].height}
                  sizes="(min-width: 1024px) 38vw, 44vw"
                  className={`${archPhoto} h-56 sm:h-72 lg:h-80`}
                />
              </div>
              <div className={`${archMat} mt-8 sm:mt-12`}>
                <DemoPhoto
                  src={doorway.src}
                  alt="Roze telefonska govornica sa natpisom Andrea Beauty House, kadar sa gornje polovine i vijenca od cvijeća"
                  width={doorway.width}
                  height={doorway.height}
                  sizes="(min-width: 1024px) 24vw, 44vw"
                  className={`${archPhoto} h-56 object-[50%_15%] sm:h-72 lg:h-80`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* The way out is the way in: one location, one channel. */}
        <section className="bg-[var(--abh-berry)] text-[var(--abh-white)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            {/* Marks the start of the closing section. The floating door
                button steps aside once this scrolls into view, since the
                section ends on the same Instagram button. */}
            <div id="closing-sentinel" aria-hidden="true" className="h-px" />
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
                className={`${styles.knock} mt-7 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[var(--abh-white)] px-6 text-sm font-semibold text-[var(--abh-berry)] transition-colors hover:bg-[var(--abh-kids-field)] sm:px-7 ${focusLight}`}
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
