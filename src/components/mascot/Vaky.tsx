export type VakyDirection = "front" | "right" | "back" | "left";

/**
 * What he is doing.
 *
 * `idle` `walk` `roll` and `jump` are the drawn poses played straight.
 * `patrol` is an out-and-back run that turns around at each end.
 * `work` and `look` are the two quiet ones — leaning in over a desk, and
 * glancing around while waiting — built by animating only the frame and only
 * the facing respectively.
 * `stand` is a single held frame for scenes where he poses rather than moves
 * (idle itself is the frame with the concept document in his hand). All of
 * them are defined in globals.css and none of them need JavaScript.
 */
export type VakyPose =
  | "idle"
  | "stand"
  | "walk"
  | "jump"
  | "roll"
  | "work"
  | "look"
  | "patrol";

type VakyProps = {
  /** Which way he faces. Nine poses were drawn for each of the four.
   *  `patrol` animates the facing itself; this is what it falls back to when
   *  motion is off. */
  direction?: VakyDirection;
  pose?: VakyPose;
  /** Fraction of the sheet's native 127x232 frame. 0.5 is the intended size:
   *  the art is drawn at 2x so it stays sharp on a retina screen. */
  scale?: number;
  /** Seconds for one out-and-back run. `patrol` only. */
  lap?: number;
  /** How many times a one-shot `jump` plays. */
  jumps?: number;
  /** Give him an accessible name only where he carries meaning. Left off, he
   *  is hidden from screen readers, which is right for decoration. */
  label?: string;
  className?: string;
};

/**
 * The Vaky mascot, animated off a single sprite sheet.
 *
 * All of the motion is CSS on `step-end` keyframes, so this stays a server
 * component: no client JS, no hydration, and one image request shared by every
 * instance on the page no matter how many there are.
 */
export function Vaky({
  direction = "front",
  pose = "idle",
  scale = 0.5,
  lap,
  jumps = 1,
  label,
  className = "",
}: VakyProps) {
  return (
    <div
      className={`vaky vaky--${direction} vaky--${pose} ${className}`}
      style={
        {
          "--vaky-scale": scale,
          "--vaky-jumps": jumps,
          ...(lap ? { "--vaky-lap": `${lap}s` } : {}),
        } as React.CSSProperties
      }
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    />
  );
}
