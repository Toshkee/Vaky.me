"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n";
import { reducedMotion } from "@/components/motion/gsap";
import { ArrowIcon } from "./icons";
import { conceptGroups, conceptsCount, conceptsPath } from "./portfolio";

/** The hand, left to right: five trades, with Barber Drina in the middle. */
const HAND = ["lucky-chopsticks", "andrea-beauty-house", "barber-drina", "studio-ljepote-mila", "skyline-tattoo"];

/**
 * The door to the concepts page: what is behind it and how many, the trades
 * they were made for, and five of them as a hand of cards. The hand is dealt
 * — stacked, then fanned — as the panel comes into view, and spreads a little
 * further under the pointer. Without script, or with less motion, it is
 * simply fanned.
 */
export function ConceptsTeaser({ dict }: { dict: Dictionary }) {
  const hand = useRef<HTMLDivElement>(null);
  const { work, film } = dict;
  const groups = conceptGroups(dict);
  const total = groups.reduce((sum, group) => sum + group.tiles.length, 0);
  const tiles = groups.flatMap((group) => group.tiles);
  const cards = HAND.flatMap((slug) => tiles.filter((tile) => tile.key === slug));

  useEffect(() => {
    const node = hand.current;
    if (!node || reducedMotion()) return;
    const box = node.getBoundingClientRect();
    if (box.top < innerHeight && box.bottom > 0) return;
    node.dataset.fan = "closed";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.fan = "open";
        io.disconnect();
      },
      { threshold: 0.45 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={conceptsPath(dict)}
      data-cursor={film.work.view}
      data-umami-event="concepts_opened"
      className="group on-ink mt-16 grid overflow-hidden rounded-2xl bg-ink text-paper sm:mt-20 lg:grid-cols-2"
    >
      <span className="flex flex-col p-6 sm:p-10 lg:p-12">
        <span className="eyebrow text-red-bright">{conceptsCount(dict, total)}</span>
        <span className="display mt-4 block text-poster-lg">{work.conceptsTitle}</span>
        <span className="mt-4 block max-w-md leading-relaxed text-muted-dark">{work.conceptsSub}</span>
        <span className="mt-6 block max-w-md text-sm leading-relaxed text-paper">
          {groups.map((group) => group.type).join(" · ")}
        </span>
        <span className="btn mt-8 inline-flex min-h-12 w-fit items-center gap-2.5 border-paper bg-paper px-6 py-3 text-ink transition-colors group-hover:border-red group-hover:bg-red group-hover:text-white">
          {work.conceptsAll}
          <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </span>
      </span>

      <span ref={hand} aria-hidden="true" className="relative block h-72 sm:h-96 lg:h-auto lg:min-h-[30rem]">
        {cards.map((card, i) => (
          <span
            key={card.key}
            className="fan-card absolute top-1/2 left-1/2 block w-[36%] max-w-[12.5rem] overflow-hidden rounded-xl border-2 border-ink bg-paper-2"
            style={{ "--o": i - 2, zIndex: 3 - Math.abs(i - 2) } as React.CSSProperties}
          >
            <picture>
              <source type="image/avif" srcSet={`/work/thumbs/${card.thumb}.avif`} />
              <img
                src={`/work/thumbs/${card.thumb}.webp`}
                alt=""
                width={520}
                height={650}
                loading="lazy"
                decoding="async"
                className="block aspect-[4/5] w-full object-cover object-top"
              />
            </picture>
          </span>
        ))}
      </span>
    </a>
  );
}
