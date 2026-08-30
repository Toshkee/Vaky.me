"use client";

import { useEffect, useState } from "react";
import { InstagramIcon } from "@/components/demo/ContactIcons";
import styles from "./andrea.module.css";

/**
 * The one fixed element on the page, phones only. It has to earn its place
 * on screen: it stays off entirely until the hero's own Instagram button has
 * scrolled out of view, and it steps aside again once the closing section —
 * which ends on the same button — arrives. Two sentinels in `page.tsx` mark
 * those moments; this component only watches them.
 */
export function FloatingDoor({ href, label }: { href: string; label: string }) {
  const [pastHero, setPastHero] = useState(false);
  const [atClosing, setAtClosing] = useState(false);

  /* Position is read directly on every scroll rather than through an
     IntersectionObserver: an observer on a hairline sentinel only fires when
     the intersection ratio changes, so a single large jump from one
     non-intersecting position to another produces no callback and the button
     stays stuck. A rAF-throttled read of getBoundingClientRect is correct
     regardless of how far one scroll event travels. */
  useEffect(() => {
    const hero = document.getElementById("hero-cta-sentinel");
    const closing = document.getElementById("closing-sentinel");
    if (!hero || !closing) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      setPastHero(hero.getBoundingClientRect().bottom < 0);
      setAtClosing(closing.getBoundingClientRect().top < window.innerHeight * 0.9);
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  const visible = pastHero && !atClosing;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[calc(0.85rem+env(safe-area-inset-bottom))] md:hidden"
      aria-hidden={!visible}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-umami-event="demo_contact"
        data-umami-event-demo="andrea-beauty-house"
        data-umami-event-action="instagram-sticky"
        tabIndex={visible ? 0 : -1}
        className={`${styles.floatingCta} ${visible ? "" : styles.floatingCtaHidden} pointer-events-auto inline-flex min-h-14 items-center gap-2.5 rounded-full bg-[var(--abh-berry)] px-6 text-sm font-semibold text-[var(--abh-white)] shadow-[0_8px_24px_rgba(27,20,24,0.24)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--abh-white)]`}
      >
        <InstagramIcon className="h-5 w-5" />
        {label}
      </a>
    </div>
  );
}
