"use client";

import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/components/motion/gsap";

/**
 * A second cursor for the work: a red dot that follows the pointer and, over
 * anything marked `data-cursor`, opens into a disc with that word in it —
 * "Pogledaj". Fine pointers only, never under reduced motion, and never in
 * place of the real cursor: it rides beside it and catches no clicks.
 */
export function FilmCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = dot.current;
    if (!node || reducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const x = gsap.quickTo(node, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(node, "y", { duration: 0.35, ease: "power3" });
    gsap.set(node, { scale: 0 });

    const move = (event: PointerEvent) => {
      x(event.clientX);
      y(event.clientY);
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      const word = target?.dataset.cursor ?? "";
      if (label.current && label.current.textContent !== word) label.current.textContent = word;
      gsap.to(node, { scale: target ? 1 : 0.18, duration: 0.35, ease: "power3.out", overwrite: "auto" });
    };
    const out = () => gsap.to(node, { scale: 0, duration: 0.3 });
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", out);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", out);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="cursor pointer-events-none fixed top-0 left-0 z-[80] -mt-12 -ml-12 size-24 items-center justify-center rounded-full bg-red text-white"
    >
      <span ref={label} className="eyebrow" />
    </div>
  );
}
