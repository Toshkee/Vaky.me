"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n";
import { BrandMark } from "@/components/BrandWordmark";
import { INTRO_REVEAL, gsap, timecode } from "@/components/motion/gsap";

/**
 * Runs before first paint, inline in the page: the opening titles play on
 * the first page of a visit, and only where motion is welcome. Everything
 * else about them is decided by the `data-intro` attribute this sets.
 */
export const INTRO_GATE = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&!sessionStorage.getItem("vaky-intro"))document.documentElement.dataset.intro="play"}catch(e){}`;

/**
 * The opening titles. Three words cut in hard on black, the way a film
 * announces itself — Sajtovi. Aplikacije. Motion design. — then the name on
 * red, and the red parts like a curtain onto the first scene. About three
 * seconds, with a timecode running in the corner.
 *
 * Once per visit (sessionStorage), never under reduced motion, and any key,
 * click or the skip button ends it at once. If the script never runs, the
 * stylesheet takes the overlay away on its own after a few seconds.
 */
export function IntroCredits({ copy }: { copy: Dictionary["film"]["intro"] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const node = root.current;
    if (html.dataset.intro !== "play" || !node) {
      window.dispatchEvent(new Event(INTRO_REVEAL));
      return;
    }
    /* The script is here, so the stylesheet's failsafe can stand down. */
    node.style.animation = "none";

    const q = gsap.utils.selector(node);
    const clock = q("[data-clock]")[0] as HTMLElement | undefined;
    const words = q("[data-word]");
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

    const tl = gsap.timeline({ onComplete: finish });
    const frames = { n: 0 };
    tl.to(frames, {
      n: 72,
      duration: 3,
      ease: "none",
      onUpdate: () => {
        if (clock) clock.textContent = timecode(frames.n);
      },
    }, 0);

    words.forEach((word, i) => {
      const at = 0.2 + i * 0.38;
      tl.set(words, { autoAlpha: 0 }, at).fromTo(
        word,
        { autoAlpha: 1, scale: 1.12 },
        { autoAlpha: 1, scale: 1, duration: 0.34, ease: "expo.out" },
        at,
      );
    });

    tl.set(words, { autoAlpha: 0 }, 1.36)
      .set(q("[data-half]"), { backgroundColor: "var(--color-red)" }, 1.36)
      .fromTo(q("[data-title]"), { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "expo.out" }, 1.36)
      .to(q("[data-chrome]"), { autoAlpha: 0, duration: 0.2 }, 1.36)
      .to(q("[data-title]"), { autoAlpha: 0, scale: 1.04, duration: 0.3, ease: "power2.in" }, 2.05)
      .add(reveal, 2.2)
      .to(q("[data-half='top']"), { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, 2.2)
      .to(q("[data-half='bottom']"), { yPercent: 100, duration: 0.8, ease: "expo.inOut" }, 2.2);

    const skip = () => tl.progress(1);
    window.addEventListener("keydown", skip);
    node.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      node.removeEventListener("pointerdown", skip);
      tl.kill();
    };
  }, []);

  return (
    <div ref={root} className="intro fixed inset-0 z-[90] cursor-pointer">
      <div aria-hidden="true">
        <div data-half="top" className="absolute inset-x-0 top-0 h-1/2 bg-ink" />
        <div data-half="bottom" className="absolute inset-x-0 bottom-0 h-1/2 bg-ink" />

        <div className="absolute inset-0 flex items-center justify-center px-6 text-paper">
          {copy.words.map((word) => (
            <p
              key={word}
              data-word
              className="display invisible absolute text-center text-[clamp(4rem,15vw,15rem)]"
            >
              {word}
            </p>
          ))}
          <div data-title className="invisible absolute flex items-center gap-[0.3em] text-[clamp(4rem,14vw,12rem)] leading-none text-white">
            <BrandMark className="size-[0.95em] [&_rect]:fill-white [&_path]:fill-[var(--color-red)]" />
            <span className="font-black tracking-[-0.04em] [font-stretch:110%]">vaky</span>
          </div>
        </div>

        <div data-chrome className="eyebrow absolute inset-x-5 top-5 flex justify-between text-muted-dark sm:inset-x-8 sm:top-7">
          <span className="rec">{copy.presents}</span>
        </div>
        <div data-chrome className="eyebrow absolute inset-x-5 bottom-5 flex justify-between text-muted-dark sm:inset-x-8 sm:bottom-7">
          <span>{copy.place}</span>
          <span data-clock className="tnum">
            00:00:00:00
          </span>
        </div>
      </div>

      <button
        type="button"
        className="eyebrow absolute top-3 right-3 min-h-11 rounded-full border border-current px-4 text-muted-dark transition-colors hover:text-paper sm:top-5 sm:right-6"
      >
        {copy.skip}
      </button>
    </div>
  );
}
