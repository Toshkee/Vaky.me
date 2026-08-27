"use client";

import type { ReactNode } from "react";
import { useInView } from "./useInView";

/**
 * A decorative scene that plays its storyboard once, when it reaches the
 * viewport. All it does is put the stage class on a wrapper — the whole
 * storyboard is CSS, so the contents stay server components and this ships no
 * animation code to the browser.
 *
 * Everything inside is decoration by definition: it illustrates the copy next
 * to it and says nothing that copy does not, so the wrapper is hidden from
 * assistive tech.
 */
export function Scene({ className = "", children }: { className?: string; children: ReactNode }) {
  const [ref, stage] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} aria-hidden="true" className={`scene is-${stage} ${className}`}>
      {children}
    </div>
  );
}
