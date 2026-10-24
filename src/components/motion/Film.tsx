"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { PlayerRef } from "@remotion/player";
import { PauseIcon, PlayIcon } from "@/components/landing/icons";
import type { FilmControls } from "./FilmPlayer";
import { APP_FILM, REEL_FILM, SHOWREEL_FILM, SITE_FILM, type FilmSpec } from "./specs";
import type { AppFilmProps } from "./films/AppFilm";
import type { ReelFilmProps } from "./films/ReelFilm";
import type { ShowreelFilmProps } from "./films/ShowreelFilm";
import type { SiteFilmProps } from "./films/SiteFilm";

/* One chunk per film, fetched the first time that film nears the screen. */
const PLAYERS = {
  showreel: dynamic(() => import("./films/ShowreelFilm").then((m) => m.ShowreelPlayer), { ssr: false }),
  site: dynamic(() => import("./films/SiteFilm").then((m) => m.SitePlayer), { ssr: false }),
  app: dynamic(() => import("./films/AppFilm").then((m) => m.AppPlayer), { ssr: false }),
  reel: dynamic(() => import("./films/ReelFilm").then((m) => m.ReelPlayer), { ssr: false }),
};

const SPECS: Record<keyof typeof PLAYERS, FilmSpec> = {
  showreel: SHOWREEL_FILM,
  site: SITE_FILM,
  app: APP_FILM,
  reel: REEL_FILM,
};

export type FilmSource =
  | { kind: "showreel"; inputProps: ShowreelFilmProps }
  | { kind: "site"; inputProps: SiteFilmProps }
  | { kind: "app"; inputProps: AppFilmProps }
  | { kind: "reel"; inputProps: ReelFilmProps };

/**
 * A film in the page.
 *
 * The box is reserved at the film's own aspect ratio from the first paint, so
 * nothing moves when Remotion arrives; until it does, `poster` stands in it.
 * The film loads when it comes within a few hundred pixels of the screen,
 * plays while at least a third of it is on screen, and pauses when it leaves
 * — nobody needs thirty frames a second drawn off screen.
 *
 * Every film loops, so it carries a pause button (WCAG 2.2.2), and a visitor
 * who pauses one is not overruled when it scrolls back into view. Under
 * reduced motion nothing starts on its own: the film rests on its `still`
 * frame, and the same button plays it for anyone who asks.
 *
 * The picture is decoration — every film tells what the text beside it
 * already says — so it is hidden from screen readers; the button is not.
 */
export function Film({
  source,
  labels,
  poster,
  className = "",
  controlsClassName = "right-3 bottom-3",
  delay = 0,
  onFrame,
}: {
  source: FilmSource;
  labels: { play: string; pause: string };
  poster?: ReactNode;
  className?: string;
  controlsClassName?: string;
  /** Milliseconds to hold the first start, so films side by side do not
   *  loop in lockstep. */
  delay?: number;
  onFrame?: (frame: number | null) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const player = useRef<PlayerRef>(null);
  const inView = useRef(false);
  const stopped = useRef(false);
  const [near, setNear] = useState(false);
  const [quiet, setQuiet] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const spec = SPECS[source.kind];

  useEffect(() => {
    const node = box.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    stopped.current = reduce;
    setQuiet(reduce);

    const approach = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        approach.disconnect();
      },
      { rootMargin: "400px 0px" },
    );
    const watch = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (!entry.isIntersecting) player.current?.pause();
        else if (!stopped.current) player.current?.play();
      },
      { threshold: 0.33 },
    );
    approach.observe(node);
    watch.observe(node);
    return () => {
      approach.disconnect();
      watch.disconnect();
    };
  }, []);

  /* The player arrives a moment after the film is near. A visitor scrolling
     fast may be gone by then, so it only starts if the film is still here. */
  const onReady = useCallback(() => {
    setReady(true);
    window.setTimeout(() => {
      if (inView.current && !stopped.current) player.current?.play();
    }, delay);
  }, [delay]);

  function toggle() {
    stopped.current = playing;
    player.current?.toggle();
  }

  const controls: FilmControls = { playerRef: player, still: quiet, onReady, onPlaying: setPlaying, onFrame };

  return (
    <div ref={box} className={`relative ${className}`} style={{ aspectRatio: `${spec.width} / ${spec.height}` }}>
      <div aria-hidden="true" className="absolute inset-0">
        {poster && <div className="absolute inset-0">{poster}</div>}
        {near && (
          <div className="absolute inset-0">
            <FilmFor source={source} controls={controls} />
          </div>
        )}
      </div>
      {ready && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? labels.pause : labels.play}
          className={`absolute flex size-11 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-red ${controlsClassName}`}
        >
          {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4 translate-x-px" />}
        </button>
      )}
    </div>
  );
}

/** The union narrowed one kind at a time, so each player gets its own props. */
function FilmFor({ source, controls }: { source: FilmSource; controls: FilmControls }) {
  switch (source.kind) {
    case "showreel":
      return <PLAYERS.showreel {...controls} inputProps={source.inputProps} />;
    case "site":
      return <PLAYERS.site {...controls} inputProps={source.inputProps} />;
    case "app":
      return <PLAYERS.app {...controls} inputProps={source.inputProps} />;
    case "reel":
      return <PLAYERS.reel {...controls} inputProps={source.inputProps} />;
  }
}
