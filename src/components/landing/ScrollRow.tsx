"use client";

import { useRef, type ReactNode } from "react";
import { ArrowIcon } from "./icons";

/**
 * A row that runs off the right edge of the page and is scrolled sideways —
 * by swipe, trackpad, or the two arrows, which move it one screen at a time.
 * It starts on the page's left rail and bleeds to the window's edge.
 */
export function ScrollRow({
  children,
  labels,
  className = "",
}: {
  children: ReactNode;
  labels: { prev: string; next: string };
  className?: string;
}) {
  const row = useRef<HTMLUListElement>(null);
  const move = (dir: 1 | -1) => {
    const node = row.current;
    if (!node) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollBy({ left: dir * node.clientWidth * 0.8, behavior: still ? "auto" : "smooth" });
  };
  const rail = "px-5 sm:px-8 lg:px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))]";
  const arrow =
    "flex size-11 items-center justify-center rounded-full border-[1.5px] border-current transition-colors hover:border-red hover:bg-red hover:text-white";

  return (
    <div className={className}>
      <ul
        ref={row}
        className={`flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden ${rail} scroll-px-5 sm:scroll-px-8 lg:scroll-px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))]`}
      >
        {children}
      </ul>
      <div className="shell mt-5 hidden justify-end gap-3 sm:flex">
        <button type="button" onClick={() => move(-1)} aria-label={labels.prev} className={arrow}>
          <ArrowIcon className="size-4 rotate-180" />
        </button>
        <button type="button" onClick={() => move(1)} aria-label={labels.next} className={arrow}>
          <ArrowIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
