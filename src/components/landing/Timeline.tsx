"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n";
import { gsap, reducedMotion } from "@/components/motion/gsap";
import { SceneLabel, SectionHead } from "./SectionHead";

/* Where each step sits on the ten days, as a share of the track: the first
   message on day one, the concept on day two, the build through day nine,
   live by day ten. The same days the steps' own labels give. */
const CLIPS: [number, number][] = [
  [0, 0.1],
  [0.1, 0.2],
  [0.2, 0.9],
  [0.9, 1],
];
const DAYS = 10;

/**
 * Scene five: the process as an edit. Ten days on a ruler, the four steps as
 * clips on a track, and a red playhead. From lg up the scene pins and the
 * scroll scrubs the playhead from day one to day ten; the step under the
 * playhead lights, and the steps' own text slides past beneath. Below lg —
 * and under reduced motion — it is the same timeline at rest with the steps
 * listed under it.
 */
export function Timeline({ dict }: { dict: Dictionary }) {
  const section = useRef<HTMLElement>(null);
  const { steps } = dict.process;

  useEffect(() => {
    if (reducedMotion() || !section.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 64rem)", () => {
        const row = section.current!.querySelector<HTMLElement>("[data-steps]")!;
        const clips = gsap.utils.toArray<HTMLElement>("[data-clip]");
        const cards = gsap.utils.toArray<HTMLElement>("[data-step]");
        const head = section.current!.querySelector<HTMLElement>("[data-playhead]");
        const travel = () => Math.max(0, row.scrollWidth - row.clientWidth);

        const light = (progress: number) => {
          const active = CLIPS.findIndex(([a, b]) => progress >= a && progress <= b);
          clips.forEach((clip, i) => clip.toggleAttribute("data-active", i === active));
          cards.forEach((card, i) => card.toggleAttribute("data-active", i === active));
        };
        light(0);

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: () => `+=${window.innerHeight * 1.6 + travel()}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (self) => light(self.progress),
            },
          })
          .fromTo(head, { left: "0%" }, { left: "100%", ease: "none" }, 0)
          .to(row.firstElementChild, { x: () => -travel(), ease: "none" }, 0);
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="proces"
      data-scene={dict.film.scenes.process}
      className="on-ink overflow-hidden bg-ink text-paper lg:flex lg:h-screen lg:flex-col lg:justify-center"
    >
      <div className="shell pt-24 lg:pt-0">
        <SectionHead
          slate={<SceneLabel word={dict.film.scene} n={5} name={dict.film.scenes.process} tone="ink" />}
          title={dict.process.title}
          sub={dict.process.sub}
          tone="ink"
        />
      </div>

      {/* The edit: a ruler of days, one track of clips, the playhead. */}
      <div aria-hidden="true" className="shell mt-12">
        <div className="relative">
          <div className="relative h-4 text-[0.625rem] font-semibold tracking-[0.2em] text-muted-dark uppercase">
            {Array.from({ length: DAYS }, (_, i) => (
              <span key={i} className="tnum absolute top-0 border-l border-white/20 pl-1.5" style={{ left: `${(i / DAYS) * 100}%` }}>
                D{i + 1}
              </span>
            ))}
          </div>
          <div className="relative mt-3 h-14 rounded-lg bg-ink-2">
            {CLIPS.map(([a, b], i) => (
              <span
                key={steps[i].title}
                data-clip
                className="absolute inset-y-1.5 flex items-center overflow-hidden rounded-md border border-white/15 bg-white/5 px-3 text-xs font-semibold whitespace-nowrap text-muted-dark transition-colors duration-300 data-active:border-red data-active:bg-red data-active:text-white"
                style={{ left: `calc(${a * 100}% + 2px)`, width: `calc(${(b - a) * 100}% - 4px)` }}
              >
                {steps[i].title}
              </span>
            ))}
            <span data-playhead className="absolute -top-5 bottom-0 left-full w-0.5 -translate-x-1/2 bg-red-bright">
              <span className="absolute -top-1 left-1/2 size-3 -translate-x-1/2 rotate-45 bg-red-bright" />
            </span>
          </div>
        </div>
      </div>

      <div data-steps className="mt-12 overflow-hidden pb-24 lg:pb-0">
        <ol className="shell grid gap-5 sm:grid-cols-2 lg:flex lg:w-max lg:max-w-none lg:gap-6 lg:px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))]">
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-step
              className="rounded-2xl border border-white/10 bg-ink-2 p-6 transition-colors duration-300 data-active:border-red-bright lg:w-[26rem] lg:p-8"
            >
              <p className="eyebrow text-red-bright">
                {String(i + 1).padStart(2, "0")} · {step.when}
              </p>
              <h3 className="headline mt-4 text-3xl">{step.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-dark">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
