import Link from "next/link";

/**
 * The growth loop: every demo site carries this slim strip linking back to
 * VibeCode.me. Rendered at the very top of each demo page.
 */
export function VibeCodeBar() {
  return (
    <Link
      href="/"
      className="group flex items-center justify-center gap-2 bg-[#0a0a0a] px-4 py-2 text-center text-xs font-medium tracking-wide text-white/80 transition-colors hover:text-white"
    >
      <span
        aria-hidden="true"
        className="font-bold italic text-[#e8323c]"
      >
        V
      </span>
      <span>
        Demo — ovakav sajt za tvoj biznis{" "}
        <span className="font-semibold text-[#e8323c] underline-offset-2 group-hover:underline">
          VibeCode.me →
        </span>
      </span>
    </Link>
  );
}
