import type { Dictionary } from "@/i18n";
import { instagramDmLink } from "@/config/site";
import { InstagramIcon } from "./icons";

/** Mobile-only Instagram shortcut, always within thumb reach. */
export function InstagramFab({ dict }: { dict: Dictionary }) {
  return (
    <a
      href={instagramDmLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.fab}
      className="fab-appear fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-red text-white transition-transform active:scale-90 md:hidden"
    >
      <InstagramIcon className="h-7 w-7" />
    </a>
  );
}
