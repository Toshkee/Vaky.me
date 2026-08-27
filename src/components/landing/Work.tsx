import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/i18n";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { ArrowIcon, FolderIcon } from "./icons";
import { SectionHead } from "./SectionHead";

/**
 * The portfolio as four framed screens: each demo shown as a real screenshot
 * of its own opening view inside a titled browser window, with a system
 * metadata row underneath — the frames are ours, the design inside each one
 * is the client's.
 *
 * From sm up they sit in a two-column grid, large enough to read. Below that
 * they become a scroll-snap strip — one strong card at a time with the next
 * one peeking in, no JavaScript involved.
 *
 * Screenshots are regenerated with `node scripts/capture-work-shots.mjs`
 * against a running dev server whenever a demo's design changes.
 */
export function Work({ dict }: { dict: Dictionary }) {
  return (
    <section id="radovi" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <SectionHead icon={<FolderIcon />} title={dict.work.title} />
        <p className="mt-3 max-w-md text-muted">{dict.work.sub}</p>

        <ul className="snap-row mt-7 -mx-5 gap-4 px-5 sm:mx-0 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0">
          {dict.work.items.map((item) => {
            const slug = item.href.split("/")[2];
            return (
              <li key={item.name} className="w-[82%] shrink-0 sm:w-auto">
                <Link href={item.href} className="group block">
                  <PixelWindow
                    title={slug}
                    className="transition-transform duration-100 group-hover:-translate-y-0.5 group-active:translate-x-1 group-active:translate-y-1 motion-reduce:transition-none"
                  >
                    <div className="aspect-[3/2] overflow-hidden border-b-2 border-ink">
                      <Image
                        src={`/work/${slug}.jpg`}
                        alt={`${item.name} — ${item.tag}`}
                        width={1280}
                        height={854}
                        className="h-full w-full object-cover object-top"
                      />
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
                    <h3 className="headline text-lg transition-colors duration-300 group-hover:text-red">
                      {item.name}
                    </h3>
                    <ArrowIcon className="w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <p className="eyebrow mt-1 text-red">{dict.work.conceptLabel}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
