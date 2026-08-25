"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Once-only scroll reveal. The hidden initial state lives in CSS behind the
 * `.js` class and `prefers-reduced-motion: no-preference`, so content is
 * always visible without JavaScript or with reduced motion.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** stagger delay in ms */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? ({ "--d": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
