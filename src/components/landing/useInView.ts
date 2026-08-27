"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Three stages rather than a boolean, because a scene that plays once has to
 * look right in three different situations and they are not the same picture:
 *
 *   ssr     — what the server renders, and what a visitor without JavaScript
 *             keeps forever: the finished scene.
 *   waiting — the reset to the opening frame. Only ever applied by the client,
 *             so nothing can get stuck on it.
 *   live    — the element has reached the viewport; play.
 */
export type InViewStage = "ssr" | "waiting" | "live";

/**
 * Fires once, the first time the element comes into view, then stops
 * observing. The bottom margin means "when its top has crossed 85% of the
 * viewport" rather than a ratio, so it behaves the same for a scene the size
 * of a card and one taller than the screen.
 */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [stage, setStage] = useState<InViewStage>("ssr");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    setStage("waiting");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStage("live");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, stage] as const;
}
