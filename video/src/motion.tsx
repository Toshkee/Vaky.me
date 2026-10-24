import type { CSSProperties, ReactNode } from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

/** An exit that never comes: what `out` means when it is left off. */
const NEVER = 1e9;

/**
 * 0 → 1 over about 0.8 s, starting at frame `at` of the current scene. No
 * overshoot: the businesses these videos are made for are restaurants and
 * salons, and a headline that bounces into place reads as a toy.
 */
export function useEntrance(at: number, durationInFrames = 24) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - at, fps, durationInFrames, config: { damping: 200 } });
}

/**
 * One line of type rising out of its own baseline, the way film titles set a
 * headline. The mask is padded so descenders and the overhang of an italic
 * are not cut off by it; the negative margin gives that room back to the
 * layout. `out` sends the line up and away again for a headline that is
 * replaced mid-scene.
 */
export function LineReveal({
  at,
  out,
  children,
}: {
  at: number;
  out?: number;
  children: ReactNode;
}) {
  const enter = useEntrance(at);
  const exit = useEntrance(out ?? NEVER, 16);
  const offset = (1 - enter) * 110 - exit * 110;

  return (
    <span
      style={{
        display: "block",
        overflow: "hidden",
        padding: "0 0.15em 0.16em 0",
        marginBottom: "-0.16em",
      }}
    >
      <span style={{ display: "block", transform: `translateY(${offset}%)` }}>{children}</span>
    </span>
  );
}

/** For everything that is not a headline: eyebrows, body copy, buttons. */
export function FadeUp({
  at,
  out,
  distance = 28,
  style,
  children,
}: {
  at: number;
  out?: number;
  distance?: number;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const enter = useEntrance(at);
  const exit = useEntrance(out ?? NEVER, 16);

  return (
    <div
      style={{
        opacity: enter - exit,
        transform: `translateY(${(1 - enter) * distance - exit * distance}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * A photograph filling the frame with a slow push-in, so a still never sits
 * dead on screen. `position` picks the crop: the photos are landscape and the
 * frame is not, so most of each one is off screen and this decides which part
 * stays.
 */
export function SlowZoom({
  src,
  duration,
  from = 1.12,
  to = 1,
  position = "50% 50%",
}: {
  src: string;
  duration: number;
  from?: number;
  to?: number;
  position?: string;
}) {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, duration], [from, to], { extrapolateRight: "clamp" });

  return (
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: position,
        transform: `scale(${scale})`,
      }}
    />
  );
}
