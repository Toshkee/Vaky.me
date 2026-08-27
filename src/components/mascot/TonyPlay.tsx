"use client";

import { useEffect, useRef, useState } from "react";
import { Tony, type TonyDirection, type TonyPose } from "./Tony";

/**
 * The easter egg. A Tony you can poke: one tap and he jumps, three quick taps
 * and he does a little roll before settling down. Nothing announces it and
 * nothing depends on it — he is aria-hidden decoration exactly like the
 * static Tony, so this stays a plain div rather than a button.
 */
export function TonyPlay({
  direction = "front",
  pose = "idle",
  scale,
  className = "",
}: {
  direction?: TonyDirection;
  pose?: TonyPose;
  scale?: number;
  className?: string;
}) {
  const [play, setPlay] = useState<TonyPose | null>(null);
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
      <Tony direction={direction} pose={play ?? pose} scale={scale} />
    </div>
  );
}
