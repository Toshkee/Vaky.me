"use client";

import { useEffect, type RefObject } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { PROCESS_STORY, ProcessStory, SCENE, type ProcessStoryCopy } from "./ProcessStory";

/**
 * ProcessStory in a Player, for ProcessStage. The stage owns playing and
 * pausing (its button, its viewport watch) and this never starts itself: it
 * says when it is ready, then reports which step is on screen and whether it
 * is moving.
 *
 * Under reduced motion it rests on the last scene, the site online — the
 * outcome, rather than the first chat bubble.
 */
export default function ProcessPlayer({
  copy,
  playerRef,
  onReady,
  onStep,
  onPlaying,
}: {
  copy: ProcessStoryCopy;
  playerRef: RefObject<PlayerRef | null>;
  onReady: () => void;
  onStep: (step: number) => void;
  onPlaying: (playing: boolean) => void;
}) {
  const quiet =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const step = ({ detail }: { detail: { frame: number } }) => {
      if (player.isPlaying()) onStep(Math.floor(detail.frame / SCENE));
    };
    const play = () => onPlaying(true);
    const pause = () => onPlaying(false);
    player.addEventListener("frameupdate", step);
    player.addEventListener("play", play);
    player.addEventListener("pause", pause);
    onReady();
    return () => {
      player.removeEventListener("frameupdate", step);
      player.removeEventListener("play", play);
      player.removeEventListener("pause", pause);
    };
  }, [playerRef, onReady, onStep, onPlaying]);

  return (
    <Player
      ref={playerRef}
      component={ProcessStory}
      inputProps={copy}
      durationInFrames={PROCESS_STORY.durationInFrames}
      fps={PROCESS_STORY.fps}
      compositionWidth={PROCESS_STORY.width}
      compositionHeight={PROCESS_STORY.height}
      initialFrame={quiet ? PROCESS_STORY.durationInFrames - 1 : 0}
      loop
      clickToPlay={false}
      spaceKeyToPlayOrPause={false}
      /* Silent compositions, so no audio machinery: muted, the Player never
         creates an AudioContext (Chrome warns about one nobody clicked for),
         and with no shared tags it never loads the silent data: MP3 it keeps
         for iOS, which the site's CSP blocks. */
      initiallyMuted
      numberOfSharedAudioTags={0}
      acknowledgeRemotionLicense
      style={{ width: "100%", aspectRatio: `${PROCESS_STORY.width} / ${PROCESS_STORY.height}` }}
    />
  );
}
