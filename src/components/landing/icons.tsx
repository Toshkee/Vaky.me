import { ArrowRight, ArrowUpRight, Check, Pause, Play, Plus, Volume2, VolumeX } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * The landing pages' icons: Lucide, at one stroke weight, and only the few
 * that carry meaning — the arrow on an action, the tick in a price list, the
 * plus that opens a row, play, pause and sound on the films. Sections have no icon
 * markers; the headline is the marker.
 *
 * Semantics are the caller's: an icon is presentational unless it is given a
 * label, which is how the pricing ticks stay readable to a screen reader
 * while the decorative arrows stay silent.
 */
type IconProps = {
  className?: string;
  /** Supplying a label makes the glyph an image with an accessible name. */
  label?: string;
};

function icon(Glyph: LucideIcon) {
  return function Icon({ className, label }: IconProps) {
    return (
      <Glyph
        className={className}
        strokeWidth={2.25}
        absoluteStrokeWidth={false}
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        focusable="false"
      />
    );
  };
}

export const ArrowIcon = icon(ArrowRight);
/** For a link that leaves the site. */
export const ExternalIcon = icon(ArrowUpRight);
export const CheckIcon = icon(Check);
export const PlusIcon = icon(Plus);
export const PlayIcon = icon(Play);
export const PauseIcon = icon(Pause);
export const SoundOnIcon = icon(Volume2);
export const SoundOffIcon = icon(VolumeX);
