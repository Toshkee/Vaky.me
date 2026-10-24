import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { SkipLink } from "@/components/ui/SkipLink";
import { Contact } from "./Contact";
import { FilmCursor } from "./FilmCursor";
import { Footer } from "./Footer";
import { ArrowIcon } from "./icons";
import { Nav } from "./Nav";
import { SceneLabel } from "./SectionHead";
import { tradePath, type TradeKey } from "./TradePage";
import { WorkTile } from "./WorkTile";
import { conceptGroups, conceptsCount } from "./portfolio";

/**
 * Every concept on one page, grouped by the trade it was made for: an index
 * of the trades at the top, then one block per trade, each with a way to the
 * page about sites for that trade. No filters — a barber reads down to
 * "Barber", or jumps there from the index. The enquiry form closes the page.
 */
export function ConceptsPage({ dict }: { dict: Dictionary }) {
  const { work } = dict;
  const groups = conceptGroups(dict);
  const total = groups.reduce((sum, group) => sum + group.tiles.length, 0);
  const isTrade = (key: string): key is TradeKey => key in dict.trades.items;

  return (
    <>
      <SkipLink>{dict.nav.skip}</SkipLink>
      <Nav dict={dict} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <header className="shell pt-10 pb-6 sm:pt-16">
          <SceneLabel name={conceptsCount(dict, total)} />
          <h1 className="display mt-4 text-poster-xl">{work.conceptsTitle}</h1>
          <p className="mt-5 max-w-xl leading-relaxed text-muted sm:text-lg">{work.conceptsSub}</p>

          <nav aria-label={work.conceptsPage.indexLabel} className="mt-10 border-t border-ink pt-3">
            <ul className="flex flex-wrap gap-x-6 gap-y-0">
              {groups.map((group) => (
                <li key={group.key}>
                  <a href={`#${group.key}`} className="inline-flex min-h-11 items-center gap-1.5 font-semibold transition-colors hover:text-red">
                    {group.type}
                    <span className="tnum text-sm font-normal text-muted">{group.tiles.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {groups.map((group) => (
          <section key={group.key} id={group.key} aria-labelledby={`${group.key}-title`} className="shell scroll-mt-24 py-10 sm:py-14">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-line pb-4">
              <h2 id={`${group.key}-title`} className="display text-poster-md">
                {group.type}
              </h2>
              {isTrade(group.key) && (
                <Link
                  href={tradePath(dict, group.key)}
                  className="group inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-red decoration-2 underline-offset-[6px] transition-colors hover:text-red"
                >
                  {work.conceptsPage.tradeLink}
                  <ArrowIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                </Link>
              )}
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
              {group.tiles.map((tile) => (
                <li key={tile.key}>
                  <WorkTile tile={tile} dict={dict} />
                </li>
              ))}
            </ul>
          </section>
        ))}

        <Contact dict={dict} />
      </main>
      <Footer dict={dict} />
      <FilmCursor />
    </>
  );
}
