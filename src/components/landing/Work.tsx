"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { FolderIcon } from "./icons";
import { SectionHead } from "./SectionHead";
import { DemoTicker } from "./DemoTicker";
import { useInView } from "./useInView";

/**
 * The portfolio as one phone.
 *
 * A row of business types — restoran, barber, teretana — picks a demo; the
 * phone shows that demo's opening screens paging through, and beside it the
 * same three lines every project gets: the situation, the move, what is in
 * it. The whole thing is judged where a client's customers will judge it,
 * on a phone, and a barber finds "Barber" before reading a word.
 *
 * The phone is a tall capture, not a live frame: `_headers` forbids framing
 * the site anywhere, including here, and a demo running inside a picture of
 * a phone on a real phone is worse than opening it. Tapping the phone or the
 * button opens the real thing full-screen.
 *
 * Captures are regenerated with `node scripts/capture-phone-shots.mjs`
 * against a running dev server whenever a demo's design changes.
 */
export function Work({ dict }: { dict: Dictionary }) {
  const { items } = dict.work;
  const [index, setIndex] = useState(0);
  /* Demos a pointer has shown interest in. Their captures are fetched
     before the tab is pressed, so the switch lands on a picture rather than
     a blank screen; a touch has no hover, so on a phone it is just the
     ~100 KB the tap itself asks for. */
  const [warm, setWarm] = useState<string[]>([]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const [screen, stage] = useInView<HTMLDivElement>();

  const item = items[index];
  const slugOf = (i: number) => items[i].href.split("/")[2];
  const slug = slugOf(index);
  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const prefetch = (i: number) => {
    const wanted = slugOf(i);
    setWarm((current) => (current.includes(wanted) ? current : [...current, wanted]));
  };
  const panelId = `${baseId}-panel`;

  /* A tablist moves focus with the arrow keys and selects as it goes, so
     a keyboard reaches every demo with the same two keys a swipe uses. */
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowLeft: -1, Home: -index, End: items.length - 1 - index }[
      event.key
    ];
    if (step === undefined) return;
    event.preventDefault();
    const next = (index + step + items.length) % items.length;
    setIndex(next);
    tabs.current[next]?.focus();
  };

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
          onKeyDown={onKeyDown}
          className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((entry, i) => {
            const selected = i === index;
            return (
              <button
                key={entry.name}
                ref={(node) => {
                  tabs.current[i] = node;
                }}
                type="button"
                role="tab"
                id={tabId(i)}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setIndex(i)}
                onPointerEnter={() => prefetch(i)}
                onFocus={() => prefetch(i)}
                data-umami-event="portfolio_demo_switched"
                data-umami-event-demo={slugOf(i)}
                className={`px inline-flex min-h-11 shrink-0 items-center border-2 border-ink px-4 text-[1.25rem] leading-none uppercase transition-colors ${
                  selected ? "bg-ink text-paper" : "bg-paper text-ink hover:text-red"
                }`}
              >
                {entry.type}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 lg:gap-16">
          {/* The phone: an ink body with a stepped corner, a paper screen
              with the same notch, a speaker slot above and a home bar below.
              It is one link — the whole device opens the demo. */}
          <Link
            href={item.href}
            aria-label={`${dict.work.open}: ${item.name}`}
            data-umami-event="portfolio_demo_opened"
            data-umami-event-demo={slug}
            className="group block w-[16.5rem] justify-self-center transition-transform duration-100 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 motion-reduce:transition-none sm:w-[18rem] sm:justify-self-start"
          >
            <div className="px-frame">
              <div className="px-notch relative bg-ink px-[3px] pt-6 pb-5">
                <span aria-hidden="true" className="absolute top-2.5 left-1/2 block h-1 w-10 -translate-x-1/2 bg-paper-2/40" />
                <div
                  ref={screen}
                  className={`phone-screen is-${stage} px-notch aspect-[9/17] overflow-hidden bg-paper-2`}
                >
                  <picture>
                    <source type="image/avif" srcSet={`/work/${slug}-phone.avif`} />
                    <img
                      key={slug}
                      src={`/work/${slug}-phone.webp`}
                      alt={dict.work.phoneAlt.replace("{name}", item.name)}
                      width={780}
                      loading="lazy"
                      decoding="async"
                      className="phone-page"
                    />
                  </picture>
                  {/* the warmed captures, fetched but not shown */}
                  {warm
                    .filter((other) => other !== slug)
                    .map((other) => (
                      <picture key={other} hidden>
                        <source type="image/avif" srcSet={`/work/${other}-phone.avif`} />
                        <img src={`/work/${other}-phone.webp`} alt="" width={780} decoding="async" />
                      </picture>
                    ))}
                </div>
                <span aria-hidden="true" className="absolute bottom-2 left-1/2 block h-1 w-16 -translate-x-1/2 bg-paper-2/40" />
              </div>
            </div>
          </Link>

          <div role="tabpanel" id={panelId} aria-labelledby={tabId(index)}>
            <p className="eyebrow text-red">
              {dict.work.conceptLabel}
              <span aria-hidden="true" className="text-muted"> · </span>
              <span className="text-muted">{item.tag}</span>
            </p>
            <h3 className="headline mt-2 text-2xl sm:text-3xl">{item.name}</h3>

            {/* What the concept was for, in the same three lines for every
                project: the situation, the move, what is in it. */}
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
              variant="secondary"
              arrow
              event="portfolio_demo_opened"
              className="mt-7"
            >
              {dict.work.open}
            </Button>
          </div>
        </div>

        <DemoTicker dict={dict} />
      </div>
    </section>
  );
}
