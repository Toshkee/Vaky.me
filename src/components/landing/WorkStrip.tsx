"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n";
import { ArrowIcon } from "./icons";

/**
 * Phone-only controls for the portfolio strip.
 *
 * The strip itself is CSS — a scroll-snap row that works with a thumb and
 * needs no JavaScript. What it cannot do on its own is say that there is more
 * to the right, or offer a target to anyone who is not swiping. So: a live
 * position readout, and two real buttons that move by one card.
 *
 * It drives the list by id rather than owning it, so the cards stay
 * server-rendered.
 */
export function WorkStrip({ dict, targetId }: { dict: Dictionary; targetId: string }) {
  const total = dict.work.items.length;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const strip = document.getElementById(targetId);
    if (!strip) return;

    const update = () => {
      const cards = [...strip.children] as HTMLElement[];
      const nearest = cards.reduce(
        (best, card, i) =>
          Math.abs(card.offsetLeft - strip.scrollLeft - strip.offsetLeft) < best.distance
            ? { i, distance: Math.abs(card.offsetLeft - strip.scrollLeft - strip.offsetLeft) }
            : best,
        { i: 0, distance: Infinity },
      );
      setIndex(nearest.i);
    };

    update();
    strip.addEventListener("scroll", update, { passive: true });
    return () => strip.removeEventListener("scroll", update);
  }, [targetId]);

  const go = (to: number) => {
    const strip = document.getElementById(targetId);
    const card = strip?.children[to] as HTMLElement | undefined;
    if (!strip || !card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollTo({
      left: card.offsetLeft - strip.offsetLeft,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <div className="mt-4 flex items-center justify-between gap-4 sm:hidden">
      <p className="text-sm text-muted">
        {/* Only the position is announced; repeating the hint on every swipe
            would talk over the thing the visitor is actually reading. */}
        <span aria-live="polite" className="tnum font-semibold text-ink">
          {dict.work.counter
            .replace("{n}", String(index + 1))
            .replace("{total}", String(total))}
        </span>
        <span aria-hidden="true"> · </span>
        {dict.work.swipeHint}
      </p>

      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => go(Math.max(0, index - 1))}
          disabled={index === 0}
          aria-label={dict.work.prev}
          className="px px-btn inline-flex h-11 w-11 items-center justify-center bg-paper text-ink disabled:opacity-35"
        >
          <ArrowIcon className="w-4 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => go(Math.min(total - 1, index + 1))}
          disabled={index === total - 1}
          aria-label={dict.work.next}
          className="px px-btn inline-flex h-11 w-11 items-center justify-center bg-paper text-ink disabled:opacity-35"
        >
          <ArrowIcon className="w-4" />
        </button>
      </div>
    </div>
  );
}
