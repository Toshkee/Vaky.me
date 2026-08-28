import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { ArrowIcon, FolderIcon } from "./icons";
import { SectionHead } from "./SectionHead";
import { WorkStrip } from "./WorkStrip";

/**
 * The portfolio as four framed screens: each demo shown as a real screenshot
 * of its own opening view inside a titled browser window, with a system
 * metadata row underneath — the frames are ours, the design inside each one
 * is the client's.
 *
 * Each carries the same three lines underneath — the brief, the move, what is
 * in it — because "Konoba Skadar · design concept" tells a business owner
 * nothing about whether we can do the thing they need done.
 *
 * From sm up they sit in a two-column grid, large enough to read. Below that
 * they become a scroll-snap strip — one strong card at a time with the next
 * one peeking in. The strip is pure CSS; `WorkStrip` adds only what CSS
 * cannot say, which is where you are in it and how to step through it.
 *
 * Screenshots are regenerated with `node scripts/capture-work-shots.mjs`
 * against a running dev server whenever a demo's design changes, then
 * `node scripts/optimize-work-shots.mjs` for the widths served here.
 */
/* One card is 82% of a phone's width and just under half the rail from sm up. */
const SIZES = "(min-width: 640px) 45vw, 82vw";
const WIDTHS = [480, 768, 1280];

const srcSet = (slug: string, format: "avif" | "webp") =>
  WIDTHS.map((width) => `/work/${slug}-${width}.${format} ${width}w`).join(", ");

export function Work({ dict }: { dict: Dictionary }) {
  return (
    <section id="radovi" className="scroll-mt-24 border-t border-line">
      <div className="shell py-12 sm:py-16">
        <SectionHead icon={<FolderIcon />} title={dict.work.title} />
        <p className="mt-3 max-w-md text-muted">{dict.work.sub}</p>

        <ul
          id="work-strip"
          className="snap-row mt-7 -mx-5 gap-4 px-5 sm:mx-0 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 sm:overflow-visible sm:px-0"
        >
          {dict.work.items.map((item) => {
            const slug = item.href.split("/")[2];
            return (
              <li key={item.name} className="w-[82%] shrink-0 sm:w-auto">
                <Link
                  href={item.href}
                  className="group block"
                  data-umami-event="portfolio_demo_opened"
                  data-umami-event-demo={slug}
                >
                  <PixelWindow
                    title={slug}
                    className="transition-transform duration-100 group-hover:-translate-y-0.5 group-active:translate-x-1 group-active:translate-y-1 motion-reduce:transition-none"
                  >
                    {/* Plain <picture>: the export runs unoptimized, so
                        next/image would ship the same single JPG to a phone
                        that a desktop gets. The variants come from
                        `node scripts/optimize-work-shots.mjs`. */}
                    <div className="aspect-[3/2] overflow-hidden border-b-2 border-ink">
                      <picture>
                        <source type="image/avif" srcSet={srcSet(slug, "avif")} sizes={SIZES} />
                        <source type="image/webp" srcSet={srcSet(slug, "webp")} sizes={SIZES} />
                        <img
                          src={`/work/${slug}.jpg`}
                          alt={`${item.name} — ${item.tag}`}
                          width={1280}
                          height={854}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-top"
                        />
                      </picture>
                    </div>
                    <div className="flex items-center justify-between gap-3 px-3 py-2">
                      <span className="px text-[1.1rem] leading-none text-muted uppercase">
                        {item.tag}
                      </span>
                      <span className="px inline-flex items-center gap-1.5 text-[1.1rem] leading-none text-ok uppercase">
                        <span aria-hidden="true" className="block h-1.5 w-1.5 bg-ok" />
                        Online
                      </span>
                    </div>
                  </PixelWindow>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <h3 className="headline text-xl transition-colors duration-300 group-hover:text-red">
                      {item.name}
                    </h3>
                    <ArrowIcon className="w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <p className="eyebrow mt-1 text-red">{dict.work.conceptLabel}</p>

                  {/* What the concept was for, in the same three lines for
                      every project: the situation, the move, what is in it.
                      Stacked, a label must sit visibly closer to its own text
                      than to the previous entry, or the pairs dissolve. */}
                  <dl className="mt-3 grid gap-x-4 gap-y-1 text-sm leading-snug sm:gap-y-2.5 sm:grid-cols-[5.5rem_1fr]">
                    <dt className="eyebrow text-muted sm:mt-0.5">{dict.work.briefLabel}</dt>
                    <dd className="mb-2.5 sm:mb-0">{item.brief}</dd>
                    <dt className="eyebrow text-muted sm:mt-0.5">{dict.work.solutionLabel}</dt>
                    <dd className="mb-2.5 sm:mb-0">{item.solution}</dd>
                    <dt className="eyebrow text-muted sm:mt-0.5">{dict.work.includesLabel}</dt>
                    <dd className="text-muted">{item.includes.join(" · ")}</dd>
                  </dl>
                </Link>
              </li>
            );
          })}
        </ul>

        <WorkStrip dict={dict} targetId="work-strip" />
      </div>
    </section>
  );
}
