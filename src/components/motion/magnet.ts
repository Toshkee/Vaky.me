"use client";

import { useEffect, type RefObject } from "react";
import { gsap, reducedMotion } from "./gsap";

/**
 * Everything marked `data-magnet` inside `scope` leans toward a mouse over it
 * and settles back when it leaves. The attribute's value is how far it
 * follows, as a share of the pointer's distance from its centre (0.3 if
 * empty). Only for a fine pointer, and only where motion is welcome.
 */
export function useMagnets(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root || reducedMotion() || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const undo = Array.from(root.querySelectorAll<HTMLElement>("[data-magnet]")).map((el) => {
      const pull = Number(el.dataset.magnet) || 0.3;
      const x = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3" });
      const y = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3" });
      const move = (event: PointerEvent) => {
        const box = el.getBoundingClientRect();
        x((event.clientX - (box.left + box.width / 2)) * pull);
        y((event.clientY - (box.top + box.height / 2)) * pull);
      };
      const leave = () => {
        x(0);
        y(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: "transform" });
      };
    });
    return () => undo.forEach((fn) => fn());
  }, [scope]);
}
