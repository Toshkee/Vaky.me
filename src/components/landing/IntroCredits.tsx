"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n";
import { site } from "@/config/site";
import { MARK_V } from "@/components/BrandWordmark";
import { INTRO_REVEAL, gsap } from "@/components/motion/gsap";

/**
 * Runs before first paint, inline in the page: the opening titles play on
 * the first page of a visit, and only where motion is welcome. Everything
 * else about them is decided by the `data-intro` attribute this sets.
 */
export const INTRO_GATE = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&!sessionStorage.getItem("vaky-intro"))document.documentElement.dataset.intro="play"}catch(e){}`;

/** When the curtain starts to rise, in seconds. */
const EXIT = 2.05;
/** How long it takes to rise, and the name to reach the masthead. */
const LIFT = 1.05;

/**
 * The opening titles: the name, set the way the masthead sets it, on black.
 *
 * The red tile pops up, the letters of "vaky" rise out of their own baseline
 * one after another, and the white "v" drops into the tile. Then the black
 * rises like a curtain and the name, instead of going with it, flies to its
 * place in the masthead — so the titles end on the page rather than in front
 * of it, and the hero comes up under the rising curtain.
 *
 * About three seconds. Once per visit (sessionStorage), never under reduced
 * motion, and any key, click or the skip button ends it at once. If the
 * script never runs, the stylesheet takes the overlay away on its own.
 */
export function IntroCredits({ copy }: { copy: Dictionary["film"]["intro"] }) {
  const root = useRef<HTMLDivElement>(null);
  const letters = Array.from(site.name.toLowerCase());

  useEffect(() => {
    const html = document.documentElement;
    const node = root.current;
    if (html.dataset.intro !== "play" || !node) {
      window.dispatchEvent(new Event(INTRO_REVEAL));
      return;
    }
    /* The script is here, so the stylesheet's failsafe can stand down. */
    node.style.animation = "none";

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      window.dispatchEvent(new Event(INTRO_REVEAL));
    };
    const finish = () => {
      reveal();
      try {
        sessionStorage.setItem("vaky-intro", "1");
      } catch {
        /* private mode: the titles will simply play again next time */
      }
      delete html.dataset.intro;
    };

    /* Built inside a context, so reverting it puts every element back as the
       markup has it — React runs this twice in development. */
    let tl: gsap.core.Timeline | undefined;
    const ctx = gsap.context((self) => {
      const q = gsap.utils.selector(node);
      const lockup = q("[data-lockup]")[0] as HTMLElement;
      const tile = node.querySelector<SVGSVGElement>("[data-tile]")!;

      gsap.set(lockup, { visibility: "visible" });
      gsap.set(tile, { scale: 0, rotation: -14, transformOrigin: "50% 50%" });
      gsap.set(q("[data-v]"), { y: -44 });
      gsap.set(q("[data-letter]"), { yPercent: 110 });

      tl = gsap.timeline({ onComplete: finish });
      tl.to(tile, { scale: 1, rotation: 0, duration: 0.7, ease: "back.out(1.7)" }, 0.15)
        .to(q("[data-letter]"), { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "expo.out" }, 0.3)
        .to(q("[data-v]"), { y: 0, duration: 0.6, ease: "back.out(2.6)" }, 1.0);

      /* The curtain rises; the name flies to the masthead, measured at that
         moment so a resize on the way is fine. Where the masthead logo cannot
         be found, the name simply goes up with the curtain. */
      tl.add(reveal, EXIT)
        .to(q("[data-panel]"), { yPercent: -100, duration: LIFT, ease: "expo.inOut" }, EXIT)
        .to(q("[data-skip]"), { autoAlpha: 0, duration: 0.3 }, EXIT)
        .add(() => {
          self.add(() => {
            const target = document.querySelector("[data-nav-logo] svg")?.getBoundingClientRect();
            if (!target) {
              gsap.to(lockup, { yPercent: -100, autoAlpha: 0, duration: LIFT, ease: "expo.inOut" });
              return;
            }
            const box = lockup.getBoundingClientRect();
            const from = tile.getBoundingClientRect();
            const k = target.height / from.height;
            gsap.set(lockup, { transformOrigin: "0 0" });
            gsap.to(lockup, {
              x: target.left - box.left - (from.left - box.left) * k,
              y: target.top - box.top - (from.top - box.top) * k,
              scale: k,
              color: "#101010",
              duration: LIFT,
              ease: "expo.inOut",
            });
          });
        }, EXIT)
        .to({}, { duration: LIFT }, EXIT);
    }, node);

    const skip = () => tl?.progress(1);
    window.addEventListener("keydown", skip);
    node.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      node.removeEventListener("pointerdown", skip);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="intro fixed inset-0 z-[90] cursor-pointer overflow-hidden">
      <div data-panel aria-hidden="true" className="absolute inset-0 bg-ink" />

      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        {/* The masthead's lockup, letter by letter, at title size. Hidden
            until the script has set every piece to its starting place. */}
        <span
          data-lockup
          className="invisible inline-flex items-center gap-[0.32em] text-[clamp(3.5rem,14vw,9rem)] leading-none text-paper"
        >
          <svg data-tile viewBox="0 0 40 40" className="size-[1.05em] shrink-0">
            <defs>
              <clipPath id="intro-tile">
                <rect width="40" height="40" rx="9" />
              </clipPath>
            </defs>
            <rect width="40" height="40" rx="9" fill="var(--color-red)" />
            <g clipPath="url(#intro-tile)">
              <path data-v d={MARK_V} fill="#ffffff" />
            </g>
          </svg>
          <span className="flex font-extrabold tracking-[-0.04em] whitespace-nowrap">
            {letters.map((letter, i) => (
              <span key={i} className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em]">
                <span data-letter className="inline-block">
                  {letter}
                </span>
              </span>
            ))}
          </span>
        </span>
      </div>

      <button
        type="button"
        data-skip
        className="eyebrow absolute top-3 right-3 min-h-11 rounded-full border border-current px-4 text-muted-dark transition-colors hover:text-paper sm:top-5 sm:right-6"
      >
        {copy.skip}
      </button>
    </div>
  );
}
