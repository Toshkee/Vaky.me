"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, reducedMotion } from "@/components/motion/gsap";

const REST = "M0 20 Q 500 20 1000 20";

/** A divider that can bend: drawn in a 1000×40 box stretched to the row. */
export function BendLine() {
  return (
    <svg
      data-bend
      aria-hidden="true"
      viewBox="0 0 1000 40"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 -bottom-5 h-10 w-full overflow-visible"
    >
      <path d={REST} fill="none" stroke="var(--color-line-strong)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/**
 * Rows whose dividers lean toward the pointer: the line nearest it bows
 * toward it like a plucked string and springs back when the pointer moves
 * on. Only for a mouse, and only where motion is welcome; everywhere else
 * the dividers are plain straight lines.
 */
export function BendLines({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node || reducedMotion() || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const lines = Array.from(node.querySelectorAll<SVGSVGElement>("[data-bend]")).map((svg) => ({
      svg,
      path: svg.querySelector("path")!,
      bend: { x: 500, y: 0 },
      near: false,
    }));
    const draw = (line: (typeof lines)[number]) =>
      line.path.setAttribute("d", `M0 20 Q ${line.bend.x} ${20 + line.bend.y} 1000 20`);

    const move = (event: PointerEvent) => {
      for (const line of lines) {
        const box = line.svg.getBoundingClientRect();
        const dy = event.clientY - (box.top + box.height / 2);
        const near = Math.abs(dy) < 48;
        if (near) {
          /* The control point sits twice as far out as the curve's peak. */
          gsap.to(line.bend, {
            x: ((event.clientX - box.left) / box.width) * 1000,
            y: gsap.utils.clamp(-30, 30, dy * 0.9),
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
            onUpdate: () => draw(line),
          });
        } else if (line.near) {
          release(line);
        }
        line.near = near;
      }
    };
    const release = (line: (typeof lines)[number]) =>
      gsap.to(line.bend, { y: 0, duration: 1.4, ease: "elastic.out(1, 0.25)", overwrite: true, onUpdate: () => draw(line) });
    const leave = () => lines.forEach((line) => {
      line.near = false;
      release(line);
    });

    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
      lines.forEach((line) => {
        gsap.killTweensOf(line.bend);
        line.path.setAttribute("d", REST);
      });
    };
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
