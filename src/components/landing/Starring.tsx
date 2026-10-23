"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n";
import { ScrollTrigger, gsap, reducedMotion } from "@/components/motion/gsap";
import { isLive } from "./facts";

/**
 * "U glavnim ulogama": the cast list, rolling sideways like credits — every
 * project on the site, the live ones first and marked so. It drifts on its
 * own, speeds up with the scroll and turns round when the scroll does.
 *
 * The names are a real list for a screen reader; the second copy that makes
 * the loop seamless is hidden from it.
 */
export function Starring({ dict }: { dict: Dictionary }) {
  const track = useRef<HTMLDivElement>(null);
  const projects = dict.work.items.flatMap((item) => item.projects);
  const cast = [...projects.filter((p) => isLive(p.href)), dict.work.app, ...projects.filter((p) => !isLive(p.href))];

  useEffect(() => {
    if (reducedMotion() || !track.current) return;
    const ctx = gsap.context(() => {
      const roll = gsap.to(track.current, { xPercent: -50, duration: 60, ease: "none", repeat: -1 });
      ScrollTrigger.create({
        onUpdate: (self) => {
          const boost = Math.min(Math.abs(self.getVelocity()) / 250, 5);
          gsap.to(roll, { timeScale: self.direction * (1 + boost), duration: 0.3, overwrite: true });
          gsap.to(roll, { timeScale: self.direction, duration: 1.4, delay: 0.3 });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const names = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {cast.map((project) => {
        const live = "href" in project ? isLive(project.href) : true;
        return (
          <li key={project.name} className="flex items-center">
            <span className={`display px-6 text-[clamp(3rem,7.5vw,7rem)] sm:px-10 ${live ? "" : "text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)]"}`}>
              {project.name}
            </span>
            {live && <span className="eyebrow rec -ml-2 mr-4 text-red sm:mr-6">{dict.film.live}</span>}
            <span aria-hidden="true" className="size-2.5 shrink-0 rotate-45 bg-red" />
          </li>
        );
      })}
    </ul>
  );

  return (
    <section aria-labelledby="starring" className="overflow-hidden border-y border-line py-8 sm:py-10">
      <h2 id="starring" className="shell eyebrow text-muted">
        {dict.film.starring}
      </h2>
      <div ref={track} className="mt-5 flex w-max">
        {names(false)}
        {names(true)}
      </div>
    </section>
  );
}
