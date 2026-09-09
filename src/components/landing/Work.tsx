"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { Dictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { FolderIcon } from "./icons";
import { PhoneFrame } from "./PhoneFrame";
import { SectionHead } from "./SectionHead";
import { useInView } from "./useInView";

/**
 * A project whose href leaves this site is a real client site that is live on
 * its own domain; everything under /demo/ is a concept. The distinction is the
 * only thing separating work we delivered from work we imagined, so it is read
 * off the destination rather than carried as a flag two dictionaries have to
 * keep in sync.
 */
const isLive = (href: string) => href.startsWith("https://");

/**
 * The portfolio as one phone.
 *
 * A row of trades — vila, restoran, barber — picks the work done for that kind
 * of business; the phone shows that project's opening screens, and beside it
 * the same three lines every project gets: the situation, the move, what is in
 * it. The whole thing is judged where a client's customers will judge it, on a
 * phone, and a barber finds "Barber" before reading a word.
 *
 * A trade can hold more than one project — two barbershops, two tattoo studios
 * — so a second, quieter row of names appears under the trades when there is
 * something to choose between. Trades with a single project never show it.
 *
 * Tapping the phone or the button opens the real thing full-screen; a live
 * client site opens in its own window, so the visitor does not lose this
 * page to it. The phone itself is PhoneFrame, shared with the trade pages.
 */
export function Work({ dict }: { dict: Dictionary }) {
  const { items } = dict.work;
  const [pick, setPick] = useState({ trade: 0, project: 0 });
  /* Projects a pointer has shown interest in. Their captures are fetched
     before the tab is pressed, so the switch lands on a picture rather than
     a blank screen; a touch has no hover, so on a phone it is just the
     ~100 KB the tap itself asks for. */
  const [warm, setWarm] = useState<string[]>([]);
  const tradeTabs = useRef<(HTMLButtonElement | null)[]>([]);
  const projectTabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const [screen, stage] = useInView<HTMLDivElement>();

  const { projects } = items[pick.trade];
  const item = projects[pick.project];
  const multiple = projects.length > 1;
  const live = isLive(item.href);

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

  const body = (
    <div className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 lg:gap-16">
      <PhoneFrame
        href={item.href}
        live={live}
        label={`${live ? dict.work.openLive : dict.work.open}: ${item.name}${
          live ? ` (${dict.work.newTab})` : ""
        }`}
        slug={item.slug}
        alt={dict.work.phoneAlt.replace("{name}", item.name)}
        screenRef={screen}
        screenClassName={`is-${stage}`}
        className="justify-self-center sm:justify-self-start"
      >
        {/* the warmed captures, fetched but not shown */}
        {warm
          .filter((other) => other !== item.slug)
          .map((other) => (
            <picture key={other} hidden>
              <source type="image/avif" srcSet={`/work/${other}-phone.avif`} />
              <img src={`/work/${other}-phone.webp`} alt="" width={780} decoding="async" />
            </picture>
          ))}
      </PhoneFrame>

      <div>
        <p className="eyebrow text-red">
          {live ? dict.work.liveLabel : dict.work.conceptLabel}
          <span aria-hidden="true" className="text-muted"> · </span>
          <span className="text-muted">{item.tag}</span>
        </p>
        <h3 className="headline mt-2 text-2xl sm:text-3xl">{item.name}</h3>

        {/* What the project was for, in the same three lines every time:
            the situation, the move, what is in it. */}
        <dl className="mt-5 grid max-w-md gap-x-5 gap-y-1 border-t-2 border-ink pt-4 text-sm leading-snug sm:grid-cols-[5.5rem_1fr] sm:gap-y-3">
          <dt className="eyebrow text-muted sm:mt-0.5">{dict.work.briefLabel}</dt>
          <dd className="mb-3 sm:mb-0">{item.brief}</dd>
          <dt className="eyebrow text-muted sm:mt-0.5">{dict.work.solutionLabel}</dt>
          <dd className="mb-3 sm:mb-0">{item.solution}</dd>
          <dt className="eyebrow text-muted sm:mt-0.5">{dict.work.includesLabel}</dt>
          <dd className="text-muted">{item.includes.join(" · ")}</dd>
        </dl>

        <Button
          href={item.href}
          external={live}
          variant="secondary"
          arrow
          event="portfolio_demo_opened"
          className="mt-7"
        >
          {live ? dict.work.openLive : dict.work.open}
          {live && <span className="sr-only"> ({dict.work.newTab})</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <section id="radovi" className="scroll-mt-24 border-t border-line">
      <div className="shell py-12 sm:py-16">
        <SectionHead icon={<FolderIcon />} title={dict.work.title} />
        <p className="mt-3 max-w-lg text-muted">{dict.work.sub}</p>

        {/* The question, then the answers. One row that scrolls on a phone
            and wraps from sm up; the chosen one is the ink key, the rest are
            paper. */}
        <p id={`${baseId}-question`} className="eyebrow mt-8 text-red">
          {dict.work.tabsLabel}
        </p>
        <div
          role="tablist"
          aria-labelledby={`${baseId}-question`}
          onKeyDown={(event) => arrows(event, items.length, pick.trade, chooseTrade)}
          className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((trade, i) => {
            const selected = i === pick.trade;
            return (
              <button
                key={trade.type}
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
          {/* Only when the trade holds more than one project. Names set
              quietly in the serif, so the row reads as a caption to the keys
              above rather than a second set of them. */}
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
            {...(multiple
              ? {
                  role: "tabpanel",
                  id: projectPanelId,
                  "aria-labelledby": projectTabId(pick.project),
                }
              : {})}
          >
            {body}
          </div>
        </div>
      </div>
    </section>
  );
}
