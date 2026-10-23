"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { PlayerRef } from "@remotion/player";
import type { Dictionary } from "@/i18n";
import { PixelWindow } from "@/components/ui/PixelWindow";
import type { ProcessStoryCopy } from "@/components/motion/ProcessStory";
import { PauseIcon, PlayIcon } from "./icons";

const ProcessPlayer = dynamic(() => import("@/components/motion/ProcessPlayer"), { ssr: false });

/**
 * The process list with its animation beside it.
 *
 * The list is the content and stays server-rendered; it arrives here as
 * `children`. Beside it, from lg up — where the list leaves a column empty —
 * a Vaky OS window plays ProcessStory, and the step it is on lights in the
 * list: this sets `data-step`, and globals.css turns that step's icon tile
 * red. Below lg the window is not rendered at all, so a phone neither
 * downloads Remotion nor scrolls past a second telling of the same four
 * steps.
 *
 * The animation loops, so it has a pause button (WCAG 2.2.2), and a visitor
 * who pauses it is not overruled when it scrolls back into view. It also
 * pauses itself off screen, which is most of the time — no reason to redraw
 * thirty frames a second nobody sees.
 */
export function ProcessStage({
  steps,
  motion,
  children,
}: {
  steps: Dictionary["process"]["steps"];
  motion: Dictionary["motion"];
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const player = useRef<PlayerRef>(null);
  /* Whether the window is on screen right now, and whether the visitor (or
     their reduced-motion setting) has said not to play. */
  const inView = useRef(false);
  const stopped = useRef(false);
  const [seen, setSeen] = useState(false);
  const [step, setStep] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const copy: ProcessStoryCopy = { ...motion.story, domain: motion.domain };

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    stopped.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          player.current?.pause();
          return;
        }
        setSeen(true);
        if (!stopped.current) player.current?.play();
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const onPlaying = useCallback((now: boolean) => {
    setPlaying(now);
    // Only a running animation names a step; paused, the list is just a list.
    if (!now) setStep(null);
  }, []);
  const onStep = useCallback((now: number) => setStep(now), []);
  /* The Player arrives a moment after the window is seen. A visitor scrolling
     fast may be gone by then, so it only starts if the window is still here. */
  const onReady = useCallback(() => {
    if (inView.current && !stopped.current) player.current?.play();
  }, []);

  function toggle() {
    stopped.current = playing;
    player.current?.toggle();
  }

  return (
    <div
      data-step={step ?? undefined}
      className="process-stage mt-8 sm:mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-12"
    >
      {children}

      <div ref={ref} className="hidden lg:block">
        <PixelWindow title={step === null ? "VAKY OS" : steps[step].when}>
          <div aria-hidden="true" className="px-grid aspect-[4/3] bg-paper">
            {seen && (
              <ProcessPlayer
                copy={copy}
                playerRef={player}
                onReady={onReady}
                onStep={onStep}
                onPlaying={onPlaying}
              />
            )}
          </div>
        </PixelWindow>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? motion.pause : motion.play}
          className="px-btn mt-5 inline-flex h-11 w-11 items-center justify-center bg-paper"
        >
          {playing ? <PauseIcon className="w-4" /> : <PlayIcon className="w-4" />}
        </button>
      </div>
    </div>
  );
}
