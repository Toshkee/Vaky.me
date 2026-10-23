"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n";
import { gsap, reducedMotion } from "@/components/motion/gsap";

/**
 * The last scene before the credits: the whole screen red, the question set
 * as a poster, and one round button that leans toward the pointer while it
 * is anywhere in the scene — it wants to be pressed. A link, so it works
 * as one everywhere; the lean is only for a fine pointer.
 */
export function CtaBand({ dict }: { dict: Dictionary }) {
  const band = useRef<HTMLElement>(null);
  const button = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const node = band.current;
    if (!node || !button.current || reducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const x = gsap.quickTo(button.current, "x", { duration: 0.8, ease: "power3" });
    const y = gsap.quickTo(button.current, "y", { duration: 0.8, ease: "power3" });
    const move = (event: PointerEvent) => {
      const rect = button.current!.getBoundingClientRect();
      x((event.clientX - (rect.left + rect.width / 2)) * 0.18);
      y((event.clientY - (rect.top + rect.height / 2)) * 0.18);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section ref={band} className="on-red overflow-hidden bg-red text-white">
      <div className="shell grid items-center gap-12 py-24 sm:py-32 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <h2 className="display text-[clamp(3.5rem,11vw,11rem)]">{dict.contact.title}</h2>
        <a
          ref={button}
          href="#kontakt"
          data-umami-event="cta_band"
          className="flex size-40 shrink-0 items-center justify-center rounded-full bg-white text-center text-lg font-semibold text-red transition-colors hover:bg-ink hover:text-white sm:size-52 sm:text-xl"
        >
          {dict.film.cta} →
        </a>
      </div>
    </section>
  );
}
