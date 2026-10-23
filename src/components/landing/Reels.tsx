import type { Dictionary } from "@/i18n";
import { priceGroups } from "@/app/(me)/demo/barber-drina/data";
import { schedule } from "@/app/(me)/demo/titan-gym/data";
import { Film, type FilmSource } from "@/components/motion/Film";
import { Tag } from "@/components/ui/Tag";
import { CheckIcon } from "./icons";
import { SectionHead } from "./SectionHead";

/* The four prices the Cjenovnik film reads out, by their ids in the Barber
   Drina concept — which transcribes them from the shop's own Instagram. */
const BARBER_ROWS = ["klasicno-sisanje", "fade-sisanje", "sisanje-brada", "kratka-brada"];

/**
 * The motion design videos, sold by being shown: three live films in the
 * vertical format they are delivered in, each a different kind of video a
 * business actually posts — a launch, a price list, a timetable.
 *
 * What the videos cost and include is `pricing.launchVideos`, said here once
 * instead of again under the packages. Every film is built from a concept on
 * this site and its caption says which; the phone in the launch film is the
 * Konoba Skadar concept, the prices and classes are the concepts' own.
 */
export function Reels({ dict }: { dict: Dictionary }) {
  const { reels } = dict;
  const offer = dict.pricing.launchVideos;
  const barber = priceGroups.flatMap((group) => group.items);
  const gym = dict.work.items.flatMap((item) => item.projects).find((p) => p.slug === "titan-gym");
  const drina = dict.work.items.flatMap((item) => item.projects).find((p) => p.slug === "barber-drina");

  const films: FilmSource[] = [
    {
      kind: "reel",
      inputProps: {
        kind: "launch",
        lines: [reels.launch.lines[0], reels.launch.lines[1]],
        slug: "konoba-skadar",
        domain: dict.motion.domain,
        cta: reels.launch.cta,
      },
    },
    {
      kind: "reel",
      inputProps: {
        kind: "prices",
        kicker: reels.prices.kicker,
        business: drina?.name ?? "Barber Drina",
        rows: BARBER_ROWS.flatMap((id) => {
          const item = barber.find((service) => service.id === id);
          return item ? [{ name: item.name, value: item.price }] : [];
        }),
        place: reels.prices.place,
      },
    },
    {
      kind: "reel",
      inputProps: {
        kind: "schedule",
        kicker: reels.schedule.kicker,
        business: gym?.name ?? "Titan Gym",
        rows: schedule[0].slots.map((slot) => ({ name: slot.name, value: slot.time })),
        cta: reels.schedule.cta,
      },
    },
  ];
  const grounds = ["bg-sun", "bg-ink", "bg-paper-2"];

  return (
    <section id="video" className="scroll-mt-24 overflow-hidden">
      <div className="shell grid gap-14 py-20 sm:py-28 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
        <div>
          <SectionHead eyebrow={reels.eyebrow} title={reels.title} mark={reels.titleMark} />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{offer.intro}</p>

          <ul className="mt-8 grid gap-3">
            {offer.includes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-sun">
                  <CheckIcon className="size-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted">
            <Tag>{offer.badge}</Tag>
            <span className="max-w-md">{offer.note}</span>
          </p>
        </div>

        {/* A row that swipes on a phone, three across from sm up. Focusable
            while it scrolls, so it is reachable without a pointer. */}
        <ul
          tabIndex={0}
          aria-label={reels.eyebrow}
          className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:p-0 [&::-webkit-scrollbar]:hidden"
        >
          {films.map((film, i) => (
            <li key={reels.formats[i].name} className="w-[62vw] max-w-[17rem] shrink-0 snap-start sm:w-auto sm:max-w-none">
              <figure>
                <Film
                  source={film}
                  labels={{ play: dict.motion.play, pause: dict.motion.pause }}
                  poster={<div className={`size-full ${grounds[i]}`} />}
                  className="overflow-hidden rounded-[1.5rem]"
                  controlsClassName="right-2.5 bottom-2.5"
                  delay={i * 900}
                />
                <figcaption className="mt-4">
                  <span className="block font-semibold">{reels.formats[i].name}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-muted">{reels.formats[i].source}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
