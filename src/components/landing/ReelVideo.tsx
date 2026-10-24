"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon, SoundOffIcon, SoundOnIcon } from "./icons";

/**
 * One vertical video in the page: a real MP4 with its poster, muted and
 * looping. Once the page has loaded it plays while at least half of it is on
 * screen, and pauses when it leaves; a visitor who pauses it is not overruled when it scrolls back.
 * Under reduced motion it rests on its poster until asked. Every loop gets a
 * pause button (WCAG 2.2.2), and a video with a soundtrack gets a second
 * one that turns the sound on — it always starts muted.
 */
export function ReelVideo({
  src,
  poster,
  labels,
  sound = false,
}: {
  src: string;
  poster: string;
  labels: { play: string; pause: string; soundOn: string; soundOff: string };
  /** The file has a soundtrack worth offering. */
  sound?: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const stopped = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const node = video.current;
    if (!node) return;
    stopped.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* Nothing starts before the page has loaded, so a video near the top does
       not take the network from the fonts and images the page needs first. */
    let loaded = document.readyState === "complete";
    let visible = false;
    const start = () => {
      if (visible && loaded && !stopped.current) node.play().catch(() => {});
    };
    const onLoad = () => {
      loaded = true;
      start();
    };
    if (!loaded) window.addEventListener("load", onLoad, { once: true });
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) node.pause();
        else start();
      },
      { threshold: 0.5 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      window.removeEventListener("load", onLoad);
    };
  }, []);

  function toggleSound() {
    const node = video.current;
    if (!node) return;
    node.muted = !node.muted;
    setMuted(node.muted);
    if (!node.muted && node.paused) {
      stopped.current = false;
      node.play().catch(() => {});
    }
  }

  function toggle() {
    const node = video.current;
    if (!node) return;
    if (node.paused) {
      stopped.current = false;
      node.play().catch(() => {});
    } else {
      stopped.current = true;
      node.pause();
    }
  }

  const button =
    "flex size-11 items-center justify-center rounded-full bg-paper text-ink transition-colors hover:bg-red hover:text-white";

  return (
    <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-black ring-1 ring-ink/10">
      <video
        ref={video}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        width={540}
        height={960}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="size-full object-cover"
      />
      <div className="absolute right-3 bottom-3 flex gap-2">
        {sound && (
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? labels.soundOn : labels.soundOff}
            className={button}
          >
            {muted ? <SoundOffIcon className="size-4" /> : <SoundOnIcon className="size-4" />}
          </button>
        )}
        <button type="button" onClick={toggle} aria-label={playing ? labels.pause : labels.play} className={button}>
          {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4 translate-x-px" />}
        </button>
      </div>
    </div>
  );
}
