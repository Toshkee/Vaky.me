import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/* One registration for the whole landing page. Imported only by client
   components, so none of it reaches the server render. */
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

/** Whether the visitor has asked for less motion. Read at the moment an
    animation would start, never cached across a page's life. */
export function reducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Fired by the opening titles the moment the curtain starts to open, and at
    once when there are no titles this visit. */
export const INTRO_REVEAL = "vaky:intro-reveal";
