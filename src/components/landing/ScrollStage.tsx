"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { INTRO_REVEAL, ScrollTrigger, gsap, reducedMotion } from "@/components/motion/gsap";
import { SCROLL_TOP } from "./scroll";

/**
 * The landing page's projector: smooth scrolling, and the scenes coming up as
 * they reach the screen.
 *
 * Everything marked `data-reveal` below the fold is set down and faded on
 * the moment it arrives; what is already on screen at load is left alone,
 * so nothing that has been seen ever blinks out. Opacity only, never
 * visibility, so a keyboard can still reach what has not arrived yet.
 *
 * Under reduced motion none of this runs: the browser scrolls and everything
 * is simply there.
 */
export function ScrollStage() {
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
    /* The logo in the masthead, clicked on this page. */
    const toTop = () => lenis.scrollTo(0, { duration: 1.4 });
    window.addEventListener(SCROLL_TOP, toTop);

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
    });

    return () => {
      ctx.revert();
      window.removeEventListener(INTRO_REVEAL, release);
      window.removeEventListener(SCROLL_TOP, toTop);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
