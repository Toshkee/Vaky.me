"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { Dictionary } from "@/i18n";
import { FolderIcon } from "./icons";
import { ProjectCase, isLive } from "./ProjectCase";
import { SectionHead } from "./SectionHead";

/**
 * The portfolio, in two honest halves.
 *
 * First the sites that are live for real clients — every one of them, side by
 * side, with its own domain. Then the concepts: a row of trades — restoran,
 * barber, tattoo — picks the work imagined for that kind of business, and one
 * phone shows it. A trade whose only project is a live site has nothing to
 * show here; it is up top already.
 *
 * A trade can hold more than one concept — two barbershops, two tattoo
 * studios — so a second, quieter row of names appears under the trades when
 * there is something to choose between. Trades with a single one never show
 * it.
 *
 * Tapping the phone or the button opens the real thing full-screen; a live
 * client site opens in its own window, so the visitor does not lose this
 * page to it.
 */
export function Work({ dict }: { dict: Dictionary }) {
  const live = dict.work.items.flatMap((item) => item.projects).filter((p) => isLive(p.href));
  const trades = dict.work.items
    .map((item) => ({ ...item, projects: item.projects.filter((p) => !isLive(p.href)) }))
    .filter((item) => item.projects.length > 0);

  const [pick, setPick] = useState({ trade: 0, project: 0 });
  /* Projects a pointer has shown interest in. Their captures are fetched
     before the tab is pressed, so the switch lands on a picture rather than
     a wait; a touch has no hover, so on a phone it is just the ~100 KB the
     tap itself asks for. */
  const [warm, setWarm] = useState<string[]>([]);
  const tradeTabs = useRef<(HTMLButtonElement | null)[]>([]);
  const projectTabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const { projects } = trades[pick.trade];
  const item = projects[pick.project];
  const multiple = projects.length > 1;

  const tradeTabId = (i: number) => `${baseId}-trade-${i}`;
  const projectTabId = (i: number) => `${baseId}-project-${i}`;
  const tradePanelId = `${baseId}-trade-panel`;
  const projectPanelId = `${baseId}-project-panel`;

  const prefetch = (slug: string) =>
    setWarm((current) => (current.includes(slug) ? current : [...current, slug]));

  /* Both rows are tablists, so both move focus with the arrow keys and select
     as they go: a keyboard reaches every project with the same two keys a
     swipe uses. */
  const arrows = (
    event: KeyboardEvent,
    length: number,
    current: number,
    go: (next: number) => void,
  ) => {
    const step = { ArrowRight: 1, ArrowLeft: -1, Home: -current, End: length - 1 - current }[
      event.key
    ];
    if (step === undefined) return;
    event.preventDefault();
    go((current + step + length) % length);
  };

  const chooseTrade = (next: number) => {
    setPick({ trade: next, project: 0 });
    tradeTabs.current[next]?.focus();
  };

  const chooseProject = (next: number) => {
    setPick((current) => ({ ...current, project: next }));
    projectTabs.current[next]?.focus();
  };

  return (
    <section id="radovi" className="scroll-mt-24 border-t border-line">
      <div className="shell py-12 sm:py-16">
        <SectionHead icon={<FolderIcon />} title={dict.work.title} />

        {live.length > 0 && (
          <div className="mt-8 sm:mt-10">
            <h3 className="headline text-xl sm:text-2xl">{dict.work.liveTitle}</h3>
            <p className="mt-1.5 max-w-lg text-muted">{dict.work.liveSub}</p>
            {/* Two columns at every width: on a phone that is two small
                phones side by side, which is half the height of two large
                ones one under the other. */}
            <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 lg:gap-x-10">
              {live.map((project) => (
                <ProjectCase key={project.slug} project={project} dict={dict} compact />
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 border-t-2 border-ink pt-8 sm:mt-16 sm:pt-10">
          <h3 className="headline text-xl sm:text-2xl">{dict.work.conceptsTitle}</h3>
          <p className="mt-1.5 max-w-lg text-muted">{dict.work.conceptsSub}</p>

          {/* The question, then the answers. One row that scrolls on a phone
              and wraps from sm up; the chosen one is the ink key, the rest are
              paper. */}
          <p id={`${baseId}-question`} className="eyebrow mt-7 text-red">
            {dict.work.tabsLabel}
          </p>
          <div
            role="tablist"
            aria-labelledby={`${baseId}-question`}
            onKeyDown={(event) => arrows(event, trades.length, pick.trade, chooseTrade)}
            className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {trades.map((trade, i) => {
              const selected = i === pick.trade;
              return (
                <button
                  key={trade.key}
                  ref={(node) => {
                    tradeTabs.current[i] = node;
                  }}
                  type="button"
                  role="tab"
                  id={tradeTabId(i)}
                  aria-selected={selected}
                  aria-controls={tradePanelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => chooseTrade(i)}
                  onPointerEnter={() => prefetch(trade.projects[0].slug)}
                  onFocus={() => prefetch(trade.projects[0].slug)}
                  data-umami-event="portfolio_demo_switched"
                  data-umami-event-demo={trade.projects[0].slug}
                  className={`px inline-flex min-h-11 shrink-0 items-center border-2 border-ink px-4 text-[1.0625rem] leading-none uppercase transition-colors ${
                    selected ? "bg-ink text-paper" : "bg-paper text-ink hover:text-red"
                  }`}
                >
                  {trade.type}
                </button>
              );
            })}
          </div>

          <div role="tabpanel" id={tradePanelId} aria-labelledby={tradeTabId(pick.trade)}>
            {/* Only when the trade holds more than one concept. Names set
                quietly, so the row reads as a caption to the keys above
                rather than a second set of them. */}
            {multiple && (
              <div
                role="tablist"
                aria-label={dict.work.pickLabel}
                onKeyDown={(event) => arrows(event, projects.length, pick.project, chooseProject)}
                className="mt-4 flex flex-wrap items-center gap-x-7"
              >
                {projects.map((project, i) => {
                  const selected = i === pick.project;
                  return (
                    <button
                      key={project.slug}
                      ref={(node) => {
                        projectTabs.current[i] = node;
                      }}
                      type="button"
                      role="tab"
                      id={projectTabId(i)}
                      aria-selected={selected}
                      aria-controls={projectPanelId}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => chooseProject(i)}
                      onPointerEnter={() => prefetch(project.slug)}
                      onFocus={() => prefetch(project.slug)}
                      data-umami-event="portfolio_demo_switched"
                      data-umami-event-demo={project.slug}
                      className={`headline inline-flex min-h-11 items-center text-lg underline decoration-2 underline-offset-[6px] transition-colors ${
                        selected
                          ? "text-ink decoration-red"
                          : "text-muted decoration-transparent hover:text-red"
                      }`}
                    >
                      {project.name}
                    </button>
                  );
                })}
              </div>
            )}
            {/* Always the same element in the same slot, so switching trades
                swaps the picture inside the phone instead of rebuilding it. */}
            <div
              className="mt-8 sm:mt-10"
              {...(multiple
                ? {
                    role: "tabpanel",
                    id: projectPanelId,
                    "aria-labelledby": projectTabId(pick.project),
                  }
                : {})}
            >
              <ProjectCase project={item} dict={dict}>
                {/* the warmed captures, fetched but not shown */}
                {warm
                  .filter((other) => other !== item.slug)
                  .map((other) => (
                    <picture key={other} hidden>
                      <source type="image/avif" srcSet={`/work/${other}-phone.avif`} />
                      <img src={`/work/${other}-phone.webp`} alt="" width={780} decoding="async" />
                    </picture>
                  ))}
              </ProjectCase>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
