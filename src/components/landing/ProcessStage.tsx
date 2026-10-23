"use client";

import { useCallback, useState, type ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { Film } from "@/components/motion/Film";
import { PROCESS_SCENE } from "@/components/motion/specs";

/**
 * The process list with its film beside it.
 *
 * The list is the content and stays server-rendered; it arrives here as
 * `children`. Beside it, from lg up — where the list leaves a column empty —
 * the process film plays, and the step it is on lights in the list: this sets
 * `data-step`, and globals.css fills that step's number with the sun. Below
 * lg the film is `display: none`, so it never comes into view and a phone
 * never downloads it, nor scrolls past a second telling of the same steps.
 */
export function ProcessStage({
  motion,
  handle,
  children,
}: {
  motion: Dictionary["motion"];
  handle: string;
  children: ReactNode;
}) {
  const [step, setStep] = useState<number | null>(null);
  // Only a running film names a step; paused, the list is just a list.
  const onFrame = useCallback(
    (frame: number | null) => setStep(frame === null ? null : Math.floor(frame / PROCESS_SCENE)),
    [],
  );

  return (
    <div
      data-step={step ?? undefined}
      className="process-stage mt-14 sm:mt-16 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:items-start lg:gap-16"
    >
      {children}

      <div className="hidden lg:sticky lg:top-28 lg:block">
        <Film
          source={{
            kind: "process",
            inputProps: { ...motion.story, domain: motion.domain, handle },
          }}
          labels={{ play: motion.play, pause: motion.pause }}
          onFrame={onFrame}
          className="overflow-hidden rounded-[1.5rem] bg-paper"
        />
      </div>
    </div>
  );
}
