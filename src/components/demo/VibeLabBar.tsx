import Link from "next/link";

/**
 * The growth loop: every demo site carries this slim strip linking back to
 * VibeLab.me. Rendered at the very top of each demo page.
 *
 * It is the one element repeated across all three demos, so it takes its
 * colours from the studio's tokens rather than hardcoding them — and from
 * `red-bright`, because the brand red is unreadable on this ground.
 */
export function VibeLabBar() {
  return (
    <Link
      href="/"
      className="group flex flex-wrap items-center justify-center gap-x-2 bg-ink px-4 py-2.5 text-center text-xs font-medium tracking-wide text-white/85 transition-colors hover:text-white"
    >
      <span>Svaki demo je dizajn koncept sa ilustrativnim podacima o biznisu.</span>
      <span className="font-semibold text-red-bright underline-offset-2 group-hover:underline">
        VibeLab.me <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
