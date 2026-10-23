"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { INTRO_REVEAL, SplitText, gsap } from "@/components/motion/gsap";
import { ArrowIcon } from "./icons";
import { Marked, SceneLabel } from "./SectionHead";

/**
 * Scene one: the title card. The promise set as a film poster, in capitals
 * across the whole width, with the deadline under the red marker.
 *
 * When the opening titles play, the poster's lines rise out of their own
 * baselines as the curtain opens; on any later page of the visit the poster
 * is simply there.
 */
export function Hero({ dict }: { dict: Dictionary }) {
  const title = useRef<HTMLHeadingElement>(null);
  const rest = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.documentElement.dataset.intro !== "play" || !title.current) return;
    const split = SplitText.create(title.current, { type: "lines", mask: "lines" });
    gsap.set(split.lines, { yPercent: 110 });
    gsap.set(rest.current, { opacity: 0, y: 30 });
    const play = () => {
      gsap.to(split.lines, { yPercent: 0, duration: 1.2, stagger: 0.08, ease: "expo.out", delay: 0.15 });
      gsap.to(rest.current, { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.5 });
    };
    window.addEventListener(INTRO_REVEAL, play, { once: true });
    return () => {
      window.removeEventListener(INTRO_REVEAL, play);
      split.revert();
    };
  }, []);

  return (
    <section data-scene={dict.film.scenes.hero} className="pt-8 sm:pt-12">
      <div className="shell">
        <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
          <p className="eyebrow rec">{dict.hero.eyebrow}</p>
          <SceneLabel word={dict.film.scene} n={1} name={dict.film.scenes.hero} className="hidden sm:block" />
        </div>

        <h1 ref={title} className="display mt-8 text-[clamp(3.25rem,10.4vw,10.75rem)] sm:mt-10">
          {dict.hero.titleA} <Marked text={dict.hero.titleB} mark={dict.hero.titleMark} now />
        </h1>

        <div ref={rest} className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <p className="max-w-[40ch] text-lg leading-relaxed text-muted sm:text-xl">{dict.hero.sub}</p>
          {/* One action carries the page; the work is the same journey one
              scroll further down, so it is a link, not a second button. */}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <Button href="#kontakt" arrow event="hero_primary_cta">
              {dict.hero.ctaPrimary}
            </Button>
            <a
              href="#radovi"
              className="group inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-red decoration-2 underline-offset-[6px] transition-colors hover:text-red"
            >
              {dict.hero.ctaSecondary}
              <ArrowIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
