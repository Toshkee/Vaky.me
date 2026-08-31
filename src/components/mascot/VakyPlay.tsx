"use client";

import { useEffect, useRef, useState } from "react";
import { Vaky, type VakyDirection, type VakyPose } from "./Vaky";

/**
 * The easter egg. A Vaky you can poke: one tap and he jumps, three quick taps
 * and he does a little roll before settling down. Nothing announces it and
 * nothing depends on it — he is aria-hidden decoration exactly like the
 * static Vaky, so this stays a plain div rather than a button.
 */
export function VakyPlay({
  direction = "front",
  pose = "idle",
  scale,
  jumps,
  className = "",
}: {
  direction?: VakyDirection;
  pose?: VakyPose;
  scale?: number;
  jumps?: number;
  className?: string;
}) {
  const [play, setPlay] = useState<VakyPose | null>(null);
  const taps = useRef<number[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function poke() {
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < 1600), now];
    if (timer.current) clearTimeout(timer.current);

    if (taps.current.length >= 3) {
      taps.current = [];
      setPlay("roll");
      timer.current = setTimeout(() => setPlay(null), 1500);
    } else {
      setPlay("jump");
      timer.current = setTimeout(() => setPlay(null), 950);
    }
  }

  return (
    <div onClick={poke} className={`cursor-pointer select-none ${className}`}>
      <Vaky direction={direction} pose={play ?? pose} scale={scale} jumps={jumps} />
    </div>
  );
}
