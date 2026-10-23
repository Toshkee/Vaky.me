import type { CSSProperties, ReactNode } from "react";
import { Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * What every film on the site is made of: the palette, the face, and four
 * moves. Nothing bounces — the businesses these films speak to are konobas
 * and salons, and a headline that overshoots into place reads as a toy. Type
 * rises out of its own baseline, shapes glide on one curve, and that is the
 * whole vocabulary.
 *
 * The films are rendered live in the page by @remotion/player, so the colours
 * are written out here rather than read from CSS: they are interpolated
 * frame by frame, and a custom property cannot be. They mirror the @theme
 * tokens in globals.css — change one, change the other.
 */
export const C = {
  paper: "#f2ede4",
  paper2: "#e8e0d2",
  ink: "#0a2e2b",
  ink2: "#123b37",
  muted: "#4d5f5b",
  mutedDark: "#a9bdb8",
  line: "#c9c0b0",
  sun: "#ff6a2b",
  foam: "#9ed9cf",
  ok: "#276b3a",
  white: "#ffffff",
} as const;

/** Archivo, loaded once by the root layout and inherited by the Player. */
export const FONT = "var(--font-archivo), system-ui, sans-serif";

/** The page's own ease-out, cubic-bezier(0.16, 1, 0.3, 1). */
const EASE = Easing.bezier(0.16, 1, 0.3, 1);

/** `frame` mapped from [a, b] onto [from, to] on the house curve, clamped. */
export function glide(frame: number, [a, b]: [number, number], [from, to]: [number, number]) {
  return interpolate(frame, [a, b], [from, to], {
    easing: EASE,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/** 0 → 1 over about 0.8 s from frame `at`, critically damped: no overshoot. */
export function useEntrance(at: number, durationInFrames = 24) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - at, fps, durationInFrames, config: { damping: 200 } });
}

/** An exit that never comes: what `out` means when it is left off. */
const NEVER = 1e9;

/**
 * One line of type rising out of its own baseline and, if `out` is given,
 * leaving upward again. The mask is padded so descenders survive it; the
 * negative margin gives that room back to the layout.
 */
export function LineReveal({ at, out, children }: { at: number; out?: number; children: ReactNode }) {
  const enter = useEntrance(at);
  const exit = useEntrance(out ?? NEVER, 16);
  const offset = (1 - enter) * 110 - exit * 110;

  return (
    <span style={{ display: "block", overflow: "hidden", padding: "0 0.12em 0.14em 0", marginBottom: "-0.14em" }}>
      <span style={{ display: "block", transform: `translateY(${offset}%)` }}>{children}</span>
    </span>
  );
}

/** For everything that is not a headline: labels, chips, rows. */
export function FadeUp({
  at,
  out,
  distance = 24,
  style,
  children,
}: {
  at: number;
  out?: number;
  distance?: number;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const enter = useEntrance(at, 20);
  const exit = useEntrance(out ?? NEVER, 14);
  return (
    <div
      style={{
        ...style,
        opacity: enter * (1 - exit),
        transform: `translateY(${(1 - enter) * distance - exit * distance}px)`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * The sun's block behind a word, drawn left to right — the same marker the
 * site's headlines carry, so a film and the page around it speak alike.
 */
export function Marker({ at, children }: { at: number; children: ReactNode }) {
  const draw = useEntrance(at, 18);
  return (
    <span style={{ position: "relative", display: "inline-block", padding: "0 0.12em" }}>
      <span
        style={{
          position: "absolute",
          inset: "0.1em 0 0.02em",
          background: C.sun,
          transform: `scaleX(${draw})`,
          transformOrigin: "left center",
        }}
      />
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  );
}

/** Text that types itself in, one character every `every` frames from `at`. */
export function typed(text: string, frame: number, at: number, every = 2) {
  const count = Math.max(0, Math.min(text.length, Math.floor((frame - at) / every)));
  return text.slice(0, count);
}

/**
 * A phone: ink body, rounded screen, nothing else. The screen clips whatever
 * goes in it, so a tall capture can scroll behind it.
 */
export function Phone({
  width,
  height,
  screen = C.paper2,
  style,
  children,
}: {
  width: number;
  height: number;
  screen?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const bezel = Math.round(width * 0.035);
  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        padding: bezel,
        borderRadius: width * 0.14,
        background: C.ink,
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: width * 0.11,
          overflow: "hidden",
          background: screen,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * A tall capture of a site, scrolled from its top by `progress` (0 → 1) of
 * its overhang. `pageHeight` is the capture's height at the screen's width.
 */
export function Capture({
  src,
  progress,
  pageHeight,
  screenHeight,
}: {
  src: string;
  progress: number;
  pageHeight: number;
  screenHeight: number;
}) {
  const travel = Math.max(0, pageHeight - screenHeight);
  return (
    <Img
      src={src}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        transform: `translateY(${-travel * progress}px)`,
      }}
    />
  );
}

/** A small rounded label: a coloured dot, then the words. */
export function Chip({
  children,
  dot = C.sun,
  tone = "light",
  size = 34,
  style,
}: {
  children: ReactNode;
  dot?: string;
  tone?: "light" | "dark";
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.45,
        padding: `${size * 0.42}px ${size * 0.7}px`,
        borderRadius: 999,
        background: tone === "light" ? C.paper : C.ink,
        color: tone === "light" ? C.ink : C.paper,
        fontFamily: FONT,
        fontSize: size,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <span style={{ width: size * 0.42, height: size * 0.42, borderRadius: "50%", background: dot, flex: "none" }} />
      {children}
    </div>
  );
}
