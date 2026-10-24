import type { Dictionary } from "@/i18n";
import { ExternalIcon } from "./icons";
import type { WorkTileData } from "./portfolio";

/**
 * One piece of work: the opening screen of the real thing, what it is, its
 * name, and a sentence on what was made. Live client sites open in a new
 * window; the app has nothing to open (it is private) and says so; concepts
 * open in place.
 */
export function WorkTile({ tile, dict }: { tile: WorkTileData; dict: Dictionary }) {
  const picture = (
    <span className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-paper-2">
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
    <span className="mt-4 block">
      <span className="eyebrow block text-muted">{tile.label}</span>
      <span className="headline mt-2 flex items-center gap-1.5 text-lg sm:text-xl">
        {tile.name}
        {tile.live && tile.href && <ExternalIcon className="size-4 shrink-0" />}
      </span>
      <span className="mt-1 block text-sm text-muted">{tile.href ? tile.tag : dict.film.work.private}</span>
      <span className="mt-3 line-clamp-3 block text-sm leading-relaxed">{tile.line}</span>
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
