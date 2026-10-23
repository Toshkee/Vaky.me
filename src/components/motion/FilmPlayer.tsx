"use client";

import { useEffect, type ComponentType, type RefObject } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import type { FilmSpec } from "./specs";

/**
 * What the stage around a film hands to its player: a ref to steer it, whether
 * it may move at all, and three callbacks — ready, playing or not, and which
 * frame is on screen. The player never starts itself; the stage decides.
 */
export type FilmControls = {
  playerRef: RefObject<PlayerRef | null>;
  /** Reduced motion: rest on the film's `still` frame instead of frame 0. */
  still: boolean;
  onReady: () => void;
  onPlaying: (playing: boolean) => void;
  /** The frame on screen while playing; `null` once it stops. */
  onFrame?: (frame: number | null) => void;
};

/**
 * One film in a Remotion Player, the same way for every film on the site.
 * Imported only by the film modules, which the page loads on demand — so
 * Remotion is fetched when the first film nears the screen, not before.
 */
export function FilmPlayer<P extends Record<string, unknown>>({
  spec,
  component,
  inputProps,
  playerRef,
  still,
  onReady,
  onPlaying,
  onFrame,
}: FilmControls & { spec: FilmSpec; component: ComponentType<P>; inputProps: P }) {
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const frame = ({ detail }: { detail: { frame: number } }) => {
      if (player.isPlaying()) onFrame?.(detail.frame);
    };
    const play = () => onPlaying(true);
    const pause = () => {
      onPlaying(false);
      onFrame?.(null);
    };
    player.addEventListener("frameupdate", frame);
    player.addEventListener("play", play);
    player.addEventListener("pause", pause);
    onReady();
    return () => {
      player.removeEventListener("frameupdate", frame);
      player.removeEventListener("play", play);
      player.removeEventListener("pause", pause);
    };
  }, [playerRef, onReady, onPlaying, onFrame]);

  return (
    <Player
      ref={playerRef}
      component={component}
      inputProps={inputProps}
      durationInFrames={spec.durationInFrames}
      fps={spec.fps}
      compositionWidth={spec.width}
      compositionHeight={spec.height}
      initialFrame={still ? spec.still : 0}
      loop
      clickToPlay={false}
      spaceKeyToPlayOrPause={false}
      /* Silent films, so no audio machinery: muted, the Player never creates
         an AudioContext (Chrome warns about one nobody clicked for), and with
         no shared tags it never loads the silent data: MP3 it keeps for iOS,
         which the site's CSP blocks. */
      initiallyMuted
      numberOfSharedAudioTags={0}
      acknowledgeRemotionLicense
      style={{ width: "100%", height: "100%" }}
    />
  );
}
