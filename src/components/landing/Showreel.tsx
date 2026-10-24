"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n";
import { site } from "@/config/site";
import { Film } from "@/components/motion/Film";
import type { ReelShot } from "@/components/motion/films/ShowreelFilm";
import { SHOWREEL_FILM } from "@/components/motion/specs";
import { gsap, reducedMotion } from "@/components/motion/gsap";
import { isLive } from "./facts";

/** Frames per shot in the showreel film. */
const SHOT = 120;
/** The live sites that close the reel; any other live site comes before the
    portfolio. */
const LAST = ["villa-vucje", "mandarina"];

/**
 * Scene two: the showreel, and under it the five pieces of work it shows —
 * what each one is, its name, and what was made. The one on screen is
 * picked out and a red line runs under it for as long as its shot lasts, so
 * the list reads as the film's own captions. The film comes up a touch small
 * and grows to the rail as it is scrolled into.
 */
export function Showreel({ dict }: { dict: Dictionary }) {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);

  const live = dict.work.items.flatMap((item) => item.projects).filter((p) => isLive(p.href));
  const { app } = dict.work;
  const portfolioHost = new URL(site.founder.url).host;

  /* The reel in the order it plays: the app, the live sites that are not
     saved for last, the portfolio, then Villa Vučje and Mandarina. Each shot
     carries what the film shows and the sentence the caption list prints. */
  const siteShot = (p: (typeof live)[number]) => ({
    film: { kind: "site", slug: p.slug, label: dict.work.liveLabel, name: p.name, tag: p.tag } satisfies ReelShot,
    line: p.solution,
  });
  const reel = [
    {
      film: {
        kind: "app",
        label: app.label,
        name: app.name,
        tag: app.tag,
        screens: [app.screens[0].slug, app.screens[1].slug, app.screens[2].slug],
      } satisfies ReelShot,
      line: app.solution,
    },
    ...live.filter((p) => !LAST.includes(p.slug)).map(siteShot),
    {
      film: {
        kind: "web",
        label: dict.film.reel.portfolio,
        name: portfolioHost,
        tag: dict.film.reel.portfolioTag,
        url: portfolioHost,
      } satisfies ReelShot,
      line: dict.about.portfolioNote,
    },
    ...LAST.flatMap((slug) => live.filter((p) => p.slug === slug)).map(siteShot),
  ];

  /* The film's frame decides which caption is lit and how far its line has
     run. Written straight to the DOM: this runs thirty times a second. */
  const onFrame = useCallback((n: number | null) => {
    const items = list.current?.children;
    if (n === null || !items) return;
    const shot = Math.min(items.length - 1, Math.floor(n / SHOT));
    const progress = (n % SHOT) / SHOT;
    Array.from(items).forEach((item, i) => {
      item.toggleAttribute("data-active", i === shot);
      const bar = item.querySelector<HTMLElement>("[data-bar]");
      if (bar) bar.style.transform = `scaleX(${i === shot ? progress : 0})`;
    });
  }, []);

  useEffect(() => {
    const scope = section.current;
    if (reducedMotion() || !frame.current || !scope) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame.current,
        { scale: 0.9, borderRadius: "1.5rem" },
        {
          scale: 1,
          borderRadius: "0.75rem",
          ease: "none",
          scrollTrigger: { trigger: scope, start: "top bottom", end: "center 58%", scrub: true },
        },
      );
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} aria-label={dict.film.reel.label} className="py-10 sm:py-14">
      <div className="shell">
        <div ref={frame} className="on-ink relative overflow-hidden rounded-xl bg-ink text-paper">
          <Film
            source={{
              kind: "showreel",
              inputProps: { shots: reel.map((shot) => shot.film) },
            }}
            labels={{ play: dict.motion.play, pause: dict.motion.pause }}
            onFrame={onFrame}
            poster={<div className="size-full bg-ink" />}
            className="w-full"
            controlsClassName="right-4 bottom-4 sm:right-6 sm:bottom-6"
          />
        </div>

        <ol ref={list} className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
          {reel.map(({ film, line }, i) => (
            <li key={film.name} data-active={i === Math.floor(SHOWREEL_FILM.still / SHOT) ? "" : undefined}>
              <span aria-hidden="true" className="block h-0.5 bg-line">
                <span data-bar className="block h-full origin-left bg-red" style={{ transform: "scaleX(0)" }} />
              </span>
              <p className="eyebrow mt-3 text-muted">{film.label}</p>
              <p className="headline mt-1.5 text-lg text-muted transition-colors in-data-active:text-ink">{film.name}</p>
              <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted">{line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
