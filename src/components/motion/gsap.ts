import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/* One registration for the whole landing page. Imported only by client
   components, so none of it reaches the server render. */
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

export { gsap, Flip, ScrollTrigger, SplitText };

/** Whether the visitor has asked for less motion. Read at the moment an
    animation would start, never cached across a page's life. */
export function reducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Frames as a film timecode, hh:mm:ss:ff at 24 fps. */
export function timecode(frames: number): string {
  const f = Math.max(0, Math.floor(frames));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(f / 86400))}:${pad(Math.floor(f / 1440) % 60)}:${pad(Math.floor(f / 24) % 60)}:${pad(f % 24)}`;
}

/** Fired by the opening titles the moment the curtain starts to open, and at
    once when there are no titles this visit. */
export const INTRO_REVEAL = "vaky:intro-reveal";
