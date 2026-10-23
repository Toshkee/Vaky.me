"use client";

import { useEffect, useRef } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import type { Phase } from "@/components/landing/Workstation";
import { SITE_BUILD, SiteBuild, type SiteBuildCopy } from "./SiteBuild";

/** Where each phase rests when nothing may move. */
const STILL: Record<Phase, number> = {
  idle: 0,
  building: SITE_BUILD.ready,
  ready: SITE_BUILD.ready,
  deploying: SITE_BUILD.end,
  online: SITE_BUILD.end,
};

/**
 * SiteBuild on the monitor, played by the desk rather than by a clock of its
 * own: each phase of Workstation's state machine plays one stretch of it.
 *
 *   idle      frame 0, an empty page
 *   building  plays to `ready` and stops there
 *   ready     holds while DEPLOY waits for the visitor
 *   deploying plays on to the end, and stays on the live page
 *
 * Under reduced motion nothing plays: each phase jumps to its own still.
 *
 * Loaded with next/dynamic only once the desk is on screen, which on a phone
 * is never — the hero hides it below lg — so phones never fetch Remotion.
 */
export default function SiteBuildPlayer({ phase, copy }: { phase: Phase; copy: SiteBuildCopy }) {
  const ref = useRef<PlayerRef>(null);
  const deployed = phase === "deploying" || phase === "online";

  useEffect(() => {
    const player = ref.current;
    if (!player) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      player.seekTo(STILL[phase]);
      return;
    }
    if (phase === "building") {
      player.seekTo(0);
      player.play();
    }
    if (phase === "deploying") player.play();
  }, [phase]);

  return (
    <Player
      ref={ref}
      component={SiteBuild}
      inputProps={copy}
      durationInFrames={SITE_BUILD.end + 1}
      fps={SITE_BUILD.fps}
      compositionWidth={SITE_BUILD.width}
      compositionHeight={SITE_BUILD.height}
      /* Each phase stops on its last frame instead of rewinding. */
      outFrame={deployed ? SITE_BUILD.end : SITE_BUILD.ready}
      moveToBeginningWhenEnded={false}
      clickToPlay={false}
      spaceKeyToPlayOrPause={false}
      /* Silent compositions, so no audio machinery: muted, the Player never
         creates an AudioContext (Chrome warns about one nobody clicked for),
         and with no shared tags it never loads the silent data: MP3 it keeps
         for iOS, which the site's CSP blocks. */
      initiallyMuted
      numberOfSharedAudioTags={0}
      acknowledgeRemotionLicense
      style={{ width: "100%", aspectRatio: `${SITE_BUILD.width} / ${SITE_BUILD.height}` }}
    />
  );
}
