"use client";

import { useEffect, useState } from "react";
import styles from "./telo.module.css";

/**
 * The mobile-only booking bar. It has exactly one job — put "Rezerviši čas"
 * back within thumb reach once the hero's own CTA has scrolled away — so it
 * has to stay out of the way everywhere else: hidden while that CTA is still
 * on screen, and hidden again from the closing booking section onward, so it
 * never sits on top of the final CTA or the footer beneath it.
 *
 * Three plain IntersectionObservers, not scroll math: each one only answers
 * "is this landmark on screen right now", and the three answers are combined
 * with the effect held to a single mount/unmount.
 */
export function StickyBookingBar({ bookingUrl }: { bookingUrl: string }) {
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);
  const [closingVisible, setClosingVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById("hero-cta");
    const closing = document.getElementById("rezervacija");
    const footer = document.getElementById("site-footer");
    if (!heroCta || !closing || !footer) return;

    const heroObserver = new IntersectionObserver(([entry]) => setHeroCtaVisible(entry.isIntersecting));
    const closingObserver = new IntersectionObserver(([entry]) => setClosingVisible(entry.isIntersecting));
    const footerObserver = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));

    heroObserver.observe(heroCta);
    closingObserver.observe(closing);
    footerObserver.observe(footer);

    return () => {
      heroObserver.disconnect();
      closingObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  const visible = !heroCtaVisible && !closingVisible && !footerVisible;

  return (
    <div
      aria-hidden={!visible}
      className={`${styles.stickyBar} fixed inset-x-0 bottom-0 z-50 bg-[var(--telo-ink)] pb-[env(safe-area-inset-bottom)] md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        data-umami-event="demo_booking"
        data-umami-event-demo="telo-pilates"
        data-umami-event-action="booking-sticky"
        className="flex min-h-14 w-full items-center justify-center px-5 text-[0.78rem] font-bold uppercase tracking-[0.2em] text-[var(--telo-butter)] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--telo-butter)]"
      >
        Rezerviši čas
      </a>
    </div>
  );
}
