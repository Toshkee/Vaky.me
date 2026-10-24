import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { HEIGHT, SAFE, WIDTH } from "../format";
import { FadeUp, useEntrance } from "../motion";
import { color, credit, font, handle } from "./brand";

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** The heavy capitals of the concept's headings. */
export const caps: CSSProperties = {
  fontFamily: font,
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "-0.04em",
  lineHeight: 0.95,
};

export function Eyebrow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <p
      style={{
        margin: 0,
        fontFamily: font,
        fontWeight: 600,
        fontSize: 30,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: color.dim,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/** How long the stripe cut takes; it covers the frame at its middle. */
export const CUT = 20;

/**
 * The cut between scenes: a band of diagonal black and white stripes, a
 * barber's pole laid on its side, sweeping up through the frame. Starts at
 * `at`; whatever changes underneath at `at + CUT / 2` changes unseen.
 */
export function Stripes({ at }: { at: number }) {
  const frame = useCurrentFrame();
  if (frame < at || frame > at + CUT) return null;
  const y = interpolate(frame, [at, at + CUT], [HEIGHT * 1.45, -HEIGHT * 1.45], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  return (
    <div
      style={{
        position: "absolute",
        left: -WIDTH * 0.25,
        width: WIDTH * 1.5,
        top: -HEIGHT * 0.2,
        height: HEIGHT * 1.4,
        transform: `translateY(${y}px) skewY(-10deg)`,
        background: `repeating-linear-gradient(135deg, ${color.white} 0 70px, ${color.black} 70px 140px)`,
      }}
    />
  );
}

/** A phone, edge-on dark like the concept itself, its screen clipped. */
export function Phone({ width, height, style, children }: { width: number; height: number; style?: CSSProperties; children: ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        padding: 14,
        borderRadius: 74,
        background: color.bezel,
        boxShadow: `0 0 0 2px ${color.line}`,
        ...style,
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 60, overflow: "hidden", background: color.black }}>
        {children}
      </div>
    </div>
  );
}

/**
 * The sign-off every video ends on: the shop's logo, where to find it, and
 * the line that says this was made as a concept.
 */
export function EndCard({ cta }: { cta: string }) {
  const logo = useEntrance(2, 30);
  return (
    <AbsoluteFill style={{ background: color.black, alignItems: "center", justifyContent: "center", fontFamily: font, color: color.white }}>
      <Img
        src={staticFile("barber-drina-logo.jpg")}
        style={{ width: 640, opacity: logo, transform: `scale(${0.92 + logo * 0.08})` }}
      />
      <FadeUp at={16} style={{ marginTop: 40, textAlign: "center" }}>
        <div style={{ ...caps, fontSize: 104 }}>{cta}</div>
        <div style={{ marginTop: 22, fontSize: 44, fontWeight: 600, color: color.dim }}>{handle}</div>
      </FadeUp>
      <FadeUp at={26} style={{ position: "absolute", bottom: SAFE.bottom - 140 }}>
        <Eyebrow style={{ fontSize: 24, letterSpacing: "0.18em" }}>{credit}</Eyebrow>
      </FadeUp>
    </AbsoluteFill>
  );
}
