"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n";
import { site } from "@/config/site";
import { Film } from "@/components/motion/Film";
import { ScrollTrigger, gsap, reducedMotion, timecode } from "@/components/motion/gsap";
import { isLive } from "./facts";
import { SceneLabel } from "./SectionHead";

/**
 * Scene two: the showreel, framed like a camera's viewfinder — corner
 * brackets, the recording light, a timecode that is the film's own frame
 * counter. It comes up the page small and grows to the width of the screen
 * as it is scrolled into, so the moment it fills the view is the moment the
 * work starts.
 */
export function Showreel({ dict }: { dict: Dictionary }) {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const clock = useRef<HTMLSpanElement>(null);

  const live = dict.work.items.flatMap((item) => item.projects).filter((p) => isLive(p.href));
  const { app } = dict.work;
  const portfolioHost = new URL(site.founder.url).host;

  const onFrame = useCallback((n: number | null) => {
    if (n !== null && clock.current) clock.current.textContent = timecode((n / 30) * 24);
  }, []);

  useEffect(() => {
    if (reducedMotion() || !frame.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame.current,
        { scale: 0.8, borderRadius: "2.5rem" },
        {
          scale: 1,
          borderRadius: "1rem",
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top bottom", end: "center 58%", scrub: true },
        },
      );
    }, section);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section ref={section} data-scene={dict.film.scenes.reel} className="px-3 py-10 sm:px-4 sm:py-16">
      <div className="shell mb-5 flex items-center justify-between gap-4">
        <SceneLabel word={dict.film.scene} n={2} name={dict.film.reel.label} />
        <p className="eyebrow hidden text-muted sm:block">{dict.film.reel.sub}</p>
      </div>

      <div ref={frame} className="on-ink relative mx-auto max-w-[110rem] overflow-hidden bg-ink text-paper">
        <Film
          source={{
            kind: "showreel",
            inputProps: {
              sites: [
                { slug: live[0].slug, label: dict.work.liveLabel, name: live[0].name, tag: live[0].tag },
                { slug: live[1].slug, label: dict.work.liveLabel, name: live[1].name, tag: live[1].tag },
              ],
              app: {
                label: app.label,
                name: app.name,
                tag: app.tag,
                screens: [app.screens[0].slug, app.screens[1].slug, app.screens[2].slug],
              },
              portfolio: {
                label: dict.film.reel.portfolio,
                name: portfolioHost,
                tag: dict.film.reel.portfolioTag,
                url: portfolioHost,
              },
            },
          }}
          labels={{ play: dict.motion.play, pause: dict.motion.pause }}
          onFrame={onFrame}
          poster={<div className="size-full bg-ink" />}
          className="w-full"
          controlsClassName="right-4 bottom-4 sm:right-6 sm:bottom-6"
        />

        {/* The viewfinder, over the film. Decoration: the film says it all. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-3 sm:inset-6">
          <span className="viewfinder-corner top-0 left-0 border-t-2 border-l-2" />
          <span className="viewfinder-corner top-0 right-0 border-t-2 border-r-2" />
          <span className="viewfinder-corner bottom-0 left-0 border-b-2 border-l-2" />
          <span className="viewfinder-corner right-0 bottom-0 border-r-2 border-b-2" />
          <div className="eyebrow absolute top-3 left-4 flex gap-5 text-[0.625rem] sm:top-5 sm:left-6 sm:text-xs">
            <span className="rec">REC</span>
            <span className="hidden sm:inline">{dict.film.reel.label}</span>
          </div>
          <span ref={clock} className="eyebrow tnum absolute top-3 right-4 text-[0.625rem] sm:top-5 sm:right-6 sm:text-xs">
            00:00:00:00
          </span>
        </div>
      </div>
    </section>
  );
}
