import Link from "next/link";

/**
 * The growth loop: every demo site carries this slim strip linking back to
 * VibeLab. Rendered at the very top of each demo page.
 *
 * It is the one element repeated across every demo, so it takes its colours
 * from the studio's tokens rather than hardcoding them — and from
 * `red-bright`, because the brand red is unreadable on this ground.
 */
export function VibeLabBar() {
  return (
    <Link
      href="/"
      className="group flex flex-wrap items-center justify-center gap-x-2 bg-ink px-4 py-2.5 text-center text-xs font-medium tracking-wide text-white/85 transition-colors hover:text-white"
    >
      {/* On a phone this strip is the first thing between the visitor and the
          business's own photograph, so it says the same thing in half the
          height. The full sentence returns as soon as it fits on one line. */}
      <span className="sm:hidden">Dizajn koncept, ilustrativni podaci.</span>
      <span className="hidden sm:inline">
        Svaki demo je dizajn koncept sa ilustrativnim podacima o biznisu.
      </span>
      <span className="font-semibold text-red-bright underline-offset-2 group-hover:underline">
        VibeLab <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
