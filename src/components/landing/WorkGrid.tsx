"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import { Flip, gsap, reducedMotion } from "@/components/motion/gsap";
import { ExternalIcon } from "./icons";
import { isLive } from "./facts";
import { SceneLabel, SectionHead } from "./SectionHead";

type Tile = {
  key: string;
  name: string;
  tag: string;
  href: string | null;
  thumb: string;
  live: boolean;
  /** "live" and the trade key, for the filter. */
  cats: string[];
};

/**
 * Scene six: everything made, as a contact sheet. The client work first —
 * the two live sites and the private app — then every concept, each tile the
 * opening screen of the real thing. A row of trades filters it; the tiles
 * that stay glide to their new places and the rest fall away, instead of the
 * grid jumping.
 *
 * Live client sites open in a new window; the app has nothing to open (it is
 * private) and says so; concepts open in place.
 */
export function WorkGrid({ dict }: { dict: Dictionary }) {
  const grid = useRef<HTMLUListElement>(null);
  const flip = useRef<Flip.FlipState | null>(null);
  const [filter, setFilter] = useState("all");
  const { work, film } = dict;

  const tiles: Tile[] = [];
  for (const item of work.items) {
    for (const project of item.projects) {
      const live = isLive(project.href);
      tiles.push({
        key: project.slug,
        name: project.name,
        tag: project.tag,
        href: project.href,
        thumb: project.slug,
        live,
        cats: live ? ["live", item.key] : [item.key],
      });
    }
  }
  tiles.sort((a, b) => Number(b.live) - Number(a.live));
  tiles.splice(2, 0, {
    key: "reform-fitness",
    name: work.app.name,
    tag: work.app.tag,
    href: null,
    thumb: "reform-fitness",
    live: true,
    cats: ["live"],
  });

  const trades = work.items.filter((item) => item.projects.some((p) => !isLive(p.href)));
  const chips = [
    { key: "all", label: film.work.all },
    { key: "live", label: film.work.live },
    ...trades.map((item) => ({ key: item.key, label: item.type })),
  ];
  const shown = (tile: Tile) => filter === "all" || tile.cats.includes(filter);

  function choose(next: string) {
    if (next === filter) return;
    if (grid.current && !reducedMotion()) flip.current = Flip.getState(Array.from(grid.current.children));
    setFilter(next);
  }

  /* After React has re-rendered the grid in its new order, play the move
     from where the tiles were. */
  useLayoutEffect(() => {
    const state = flip.current;
    if (!state) return;
    flip.current = null;
    Flip.from(state, {
      duration: 0.7,
      ease: "expo.inOut",
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.25 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.3 }),
    });
  }, [filter]);

  return (
    <section id="radovi" data-scene={film.scenes.work} className="scroll-mt-20 py-24 sm:py-32">
      <div className="shell">
        <SectionHead
          slate={<SceneLabel word={film.scene} n={6} name={film.scenes.work} />}
          title={work.title}
          sub={work.conceptsSub}
        />

        <div role="group" aria-label={work.tabsLabel} className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              aria-pressed={filter === chip.key}
              onClick={() => choose(chip.key)}
              data-umami-event="portfolio_filter"
              data-umami-event-filter={chip.key}
              className="inline-flex min-h-11 shrink-0 items-center rounded-full border-[1.5px] border-ink px-4 font-medium transition-colors hover:bg-ink hover:text-paper aria-pressed:border-red aria-pressed:bg-red aria-pressed:text-white"
            >
              {chip.label}
            </button>
          ))}
        </div>

        <ul ref={grid} className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {tiles.map((tile) => (
            <li key={tile.key} data-flip-id={tile.key} hidden={!shown(tile)}>
              <TileCard tile={tile} dict={dict} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TileCard({ tile, dict }: { tile: Tile; dict: Dictionary }) {
  const picture = (
    <span className="relative block aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-paper-2">
      <picture>
        <source type="image/avif" srcSet={`/work/thumbs/${tile.thumb}.avif`} />
        <img
          src={`/work/thumbs/${tile.thumb}.webp`}
          alt={dict.work.phoneAlt.replace("{name}", tile.name)}
          width={520}
          height={650}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04] motion-reduce:transition-none"
        />
      </picture>
      {tile.live && <span className="eyebrow absolute top-3 left-3 rounded-full bg-red px-2.5 py-1.5 text-white">{dict.film.live}</span>}
    </span>
  );
  const caption = (
    <span className="mt-3 block">
      <span className="flex items-center gap-1.5 font-semibold">
        {tile.name}
        {tile.live && tile.href && <ExternalIcon className="size-4 shrink-0" />}
      </span>
      <span className="mt-0.5 block text-sm text-muted">{tile.href ? tile.tag : dict.film.work.private}</span>
    </span>
  );

  if (!tile.href) {
    return (
      <div className="group">
        {picture}
        {caption}
      </div>
    );
  }
  return (
    <a
      href={tile.href}
      {...(tile.live ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      data-cursor={dict.film.work.view}
      data-umami-event="portfolio_demo_opened"
      data-umami-event-demo={tile.key}
      className="group block"
    >
      {picture}
      {caption}
      {tile.live && <span className="sr-only"> ({dict.work.newTab})</span>}
    </a>
  );
}
