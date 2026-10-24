/** Asks the landing page's smooth scroller to take the page back to the top. */
export const SCROLL_TOP = "vaky:scroll-top";

/**
 * The logo on the page it links to: back to the very top instead of a
 * navigation to the same address, with any #section dropped from the address.
 * Lenis scrolls the landing page, so when it is running it is asked to do it;
 * anywhere else the browser does, at once under reduced motion.
 */
export function backToTop(event: { preventDefault(): void }, home: string) {
  if (window.location.pathname !== home) return;
  event.preventDefault();
  if (window.location.hash) window.history.replaceState(null, "", home);
  if (document.documentElement.classList.contains("lenis")) {
    window.dispatchEvent(new Event(SCROLL_TOP));
    return;
  }
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });
}
