"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { INTRO_REVEAL, ScrollTrigger, gsap, reducedMotion, timecode } from "@/components/motion/gsap";

/**
 * The landing page's projector: smooth scrolling, the scenes coming up as
 * they reach the screen, and the slate in the corner that names the scene
 * you are in and runs a timecode off the scroll position — the page read as
 * one long take.
 *
 * Everything marked `data-reveal` below the fold is set down and faded on
 * the moment it arrives; what is already on screen at load is left alone,
 * so nothing that has been seen ever blinks out. Opacity only, never
 * visibility, so a keyboard can still reach what has not arrived yet.
 *
 * Under reduced motion none of this runs: the browser scrolls, everything is
 * simply there, and the slate stays hidden.
 */
export function ScrollStage({ word }: { word: string }) {
  const slate = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLSpanElement>(null);
  const clock = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;

    const lenis = new Lenis({ anchors: { offset: -72 }, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    /* The opening titles hold the page still until the curtain opens. */
    if (document.documentElement.dataset.intro === "play") lenis.stop();
    const release = () => lenis.start();
    window.addEventListener(INTRO_REVEAL, release);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const later = items.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
      gsap.set(later, { y: 48, opacity: 0 });
      ScrollTrigger.batch(later, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "expo.out", clearProps: "transform,opacity" }),
      });

      gsap.utils.toArray<HTMLElement>("[data-scene]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive && scene.current) {
              scene.current.textContent = `${word} ${String(i + 1).padStart(2, "0")} — ${el.dataset.scene}`;
            }
          },
        });
      });

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (clock.current) clock.current.textContent = timecode(self.scroll() / 3);
        },
      });
      gsap.to(slate.current, { opacity: 1, duration: 0.6, delay: 0.4 });
    });

    return () => {
      ctx.revert();
      window.removeEventListener(INTRO_REVEAL, release);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [word]);

  return (
    <div
      ref={slate}
      aria-hidden="true"
      className="pointer-events-none fixed bottom-5 left-5 z-40 hidden gap-4 font-semibold tracking-[0.2em] text-white uppercase opacity-0 mix-blend-difference lg:flex"
    >
      <span className="text-[0.6875rem]" ref={scene} />
      <span className="tnum text-[0.6875rem]" ref={clock}>
        00:00:00:00
      </span>
    </div>
  );
}
