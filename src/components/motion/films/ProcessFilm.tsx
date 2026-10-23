import type { ReactNode } from "react";
import { AbsoluteFill, interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { PROCESS_FILM, PROCESS_SCENE as SCENE } from "../specs";
import { C, FONT, FadeUp, LineReveal, Phone, glide, typed, useEntrance } from "../kit";
import { FilmPlayer, type FilmControls } from "../FilmPlayer";

/**
 * "Kako radim" as four short scenes, one per step of the list beside it: the
 * first message and the reply, the free concept sketched and stamped, the
 * materials ticked off while the sketch fills in, and the domain going live.
 *
 * Every scene is SCENE frames long, so the step on screen is
 * `floor(frame / SCENE)` — which is how the list lights the matching step.
 * Every word in it comes from the dictionary.
 */
export type ProcessFilmProps = {
  handle: string;
  message: string;
  reply: string;
  stamp: string;
  checklist: readonly string[];
  live: string;
  domain: string;
};

const OUT = SCENE - 10;

export function ProcessFilm(props: ProcessFilmProps) {
  const frame = useCurrentFrame();
  const scene = Math.floor(frame / SCENE);
  const local = frame % SCENE;

  return (
    <AbsoluteFill style={{ background: C.paper, overflow: "hidden", fontFamily: FONT, color: C.ink }}>
      {scene === 0 && <Message frame={local} {...props} />}
      {scene === 1 && <Concept frame={local} stamp={props.stamp} />}
      {scene === 2 && <Build frame={local} checklist={props.checklist} />}
      {scene === 3 && <Online frame={local} domain={props.domain} live={props.live} />}
    </AbsoluteFill>
  );
}

/* ── 1. Javiš se ── */

function Message({ frame, handle, message, reply }: { frame: number } & ProcessFilmProps) {
  const shown = typed(message, frame, 10, 1.4);
  const waiting = frame >= 50 && frame < 62;

  return (
    <>
      <FadeUp at={0} out={OUT} style={{ position: "absolute", left: 70, top: 70, right: 70 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22, paddingBottom: 30, borderBottom: `3px solid ${C.paper2}` }}>
          <Sun size={74} />
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em" }}>@{handle}</div>
        </div>
      </FadeUp>

      <FadeUp at={4} out={OUT} style={{ position: "absolute", left: 70, top: 260, maxWidth: 720 }}>
        <Bubble side="in">
          {shown}
          {/* the untyped rest holds the bubble at its final size */}
          <span style={{ visibility: "hidden" }}>{message.slice(shown.length)}</span>
        </Bubble>
      </FadeUp>

      {waiting && (
        <div style={{ position: "absolute", right: 70, top: 520 }}>
          <Bubble side="out">
            <span style={{ display: "inline-flex", gap: 14, padding: "8px 0" }}>
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: C.paper,
                    opacity: 0.35 + 0.65 * Math.abs(Math.sin((frame - dot * 4) / 5)),
                  }}
                />
              ))}
            </span>
          </Bubble>
        </div>
      )}

      {frame >= 62 && (
        <FadeUp at={62} out={OUT} style={{ position: "absolute", right: 70, top: 520, maxWidth: 720 }}>
          <Bubble side="out">{reply}</Bubble>
        </FadeUp>
      )}
    </>
  );
}

function Bubble({ side, children }: { side: "in" | "out"; children: ReactNode }) {
  return (
    <div
      style={{
        padding: "28px 36px",
        borderRadius: side === "in" ? "40px 40px 40px 10px" : "40px 40px 10px 40px",
        background: side === "in" ? C.paper2 : C.ink,
        color: side === "in" ? C.ink : C.paper,
        fontSize: 46,
        lineHeight: 1.25,
        fontWeight: 500,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </div>
  );
}

/* ── The sketch the next two scenes share ── */

const SKETCH = { left: 520, top: 140, width: 380, height: 720 };

/** The concept on a phone: drawn as outlines first, then filled in. */
function Sketch({ frame, fill, at = 0 }: { frame: number; fill: number[]; at?: number }) {
  const draw = (i: number) => glide(frame, [at + i * 5, at + i * 5 + 16], [0, 1]);
  const block = (i: number, color: string) => ({
    transform: `scaleX(${draw(i)})`,
    transformOrigin: "left center",
    background: interpolateColors(fill[i] ?? 0, [0, 1], [C.paper, color]),
    border: `4px solid ${interpolateColors(fill[i] ?? 0, [0, 1], [C.line, color])}`,
  });

  return (
    <Phone width={SKETCH.width} height={SKETCH.height} screen={C.white} style={{ left: SKETCH.left, top: SKETCH.top }}>
      <div style={{ position: "absolute", inset: 0, padding: "40px 26px", display: "grid", gap: 20, alignContent: "start" }}>
        <div style={{ height: 22, width: "45%", borderRadius: 11, ...block(0, C.ink) }} />
        <div style={{ position: "relative", height: 250, borderRadius: 26, overflow: "hidden", ...block(1, C.foam) }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: interpolate(fill[1] ?? 0, [0, 1], [-140, -40]),
              width: 150,
              height: 150,
              marginLeft: -75,
              borderRadius: "50%",
              background: C.sun,
              opacity: fill[1] ?? 0,
            }}
          />
        </div>
        <div style={{ height: 18, width: "88%", borderRadius: 9, ...block(2, C.ink) }} />
        <div style={{ height: 18, width: "70%", borderRadius: 9, ...block(3, C.ink) }} />
        <div style={{ height: 18, width: "78%", borderRadius: 9, ...block(4, C.ink) }} />
        <div style={{ marginTop: 16, height: 74, borderRadius: 37, ...block(5, C.sun) }} />
      </div>
    </Phone>
  );
}

/* ── 2. Besplatan koncept ── */

function Concept({ frame, stamp }: { frame: number; stamp: string }) {
  const land = glide(frame, [44, 62], [0, 1]);
  const leave = glide(frame, [OUT, SCENE], [0, 1]);

  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - leave, transform: `translateX(${-leave * 60}px)` }}>
      <Sketch frame={frame} fill={[]} at={4} />
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 300,
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: C.sun,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 40,
          fontSize: 52,
          fontWeight: 850,
          fontStretch: "112%",
          lineHeight: 1,
          letterSpacing: "-0.035em",
          opacity: land,
          transform: `rotate(${interpolate(land, [0, 1], [-30, -10])}deg) scale(${interpolate(land, [0, 1], [1.5, 1])})`,
        }}
      >
        {stamp}
      </div>
    </div>
  );
}

/* ── 3. Izrada ── */

function Build({ frame, checklist }: { frame: number; checklist: readonly string[] }) {
  const ticks = [14, 32, 50];
  const done = ticks.map((at) => glide(frame, [at, at + 12], [0, 1]));
  /* Each ticked item fills in part of the sketch: the logo the header, the
     photos the picture, the text the lines and the button. */
  const fill = [done[0], done[1], done[2], done[2], done[2], glide(frame, [62, 74], [0, 1])];
  const leave = glide(frame, [OUT, SCENE], [0, 1]);

  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - leave }}>
      <Sketch frame={SCENE} fill={fill} />
      <div style={{ position: "absolute", left: 70, top: 330, display: "grid", gap: 34 }}>
        {checklist.map((item, i) => (
          <FadeUp key={item} at={i * 4}>
            <div style={{ display: "flex", alignItems: "center", gap: 26, fontSize: 48, fontWeight: 700, letterSpacing: "-0.02em" }}>
              <Tick progress={done[i]} />
              {item}
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}

function Tick({ progress }: { progress: number }) {
  return (
    <svg width={64} height={64} viewBox="0 0 64 64">
      <rect
        x={3}
        y={3}
        width={58}
        height={58}
        rx={18}
        fill={interpolateColors(progress, [0, 0.3], [C.paper, C.sun])}
        stroke={interpolateColors(progress, [0, 0.3], [C.line, C.sun])}
        strokeWidth={5}
      />
      <path
        d="M18 33l9 9 19-20"
        fill="none"
        stroke={C.ink}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={44}
        strokeDashoffset={44 * (1 - progress)}
      />
    </svg>
  );
}

/* ── 4. Online ── */

function Online({ frame, domain, live }: { frame: number; domain: string; live: string }) {
  const rise = glide(frame, [26, 64], [0, 1]);
  const pulse = 1 + 0.5 * ((frame % 30) / 30);
  const light = useEntrance(38, 12);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 500 - 230,
          top: interpolate(rise, [0, 1], [1080, 470]),
          width: 460,
          height: 460,
          borderRadius: "50%",
          background: C.sun,
        }}
      />
      <svg width={1000} height={260} viewBox="0 0 1000 260" style={{ position: "absolute", left: 0, bottom: 0 }}>
        <path d="M0 40c166-36 333-36 500 0s334 36 500 0V260H0Z" fill={C.ink} />
        <path d="M0 96c166-30 333-30 500 0s334 30 500 0" fill="none" stroke={C.foam} strokeWidth={8} />
      </svg>

      <FadeUp at={0} style={{ position: "absolute", left: 90, right: 90, top: 110 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            padding: "26px 36px",
            borderRadius: 999,
            background: C.white,
            border: `3px solid ${C.line}`,
            fontSize: 46,
            fontWeight: 600,
          }}
        >
          <span style={{ width: 20, height: 20, borderRadius: "50%", background: C.ok, flex: "none" }} />
          <span>
            {typed(domain, frame, 6, 1.6)}
            <span style={{ opacity: frame % 20 < 10 ? 1 : 0, fontWeight: 300 }}>|</span>
          </span>
        </div>
      </FadeUp>

      <div style={{ position: "absolute", left: 90, top: 270, display: "flex", alignItems: "center", gap: 34 }}>
        <span style={{ position: "relative", width: 44, height: 44, flex: "none" }}>
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: C.ok,
              opacity: frame > 40 ? 0.25 * (2 - pulse) : 0,
              transform: `scale(${pulse * 1.4})`,
            }}
          />
          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: C.ok, opacity: light }} />
        </span>
        <div style={{ fontSize: 170, fontWeight: 850, fontStretch: "118%", letterSpacing: "-0.05em", lineHeight: 1 }}>
          <LineReveal at={40}>{live}</LineReveal>
        </div>
      </div>
    </>
  );
}

function Sun({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <clipPath id="process-sun">
        <circle cx="20" cy="20" r="20" />
      </clipPath>
      <g clipPath="url(#process-sun)">
        <rect width="40" height="40" fill={C.sun} />
        <path d="M0 25c6.7-3.6 13.3-3.6 20 0s13.3 3.6 20 0V40H0Z" fill={C.ink} />
      </g>
    </svg>
  );
}

export function ProcessPlayer(props: FilmControls & { inputProps: ProcessFilmProps }) {
  return <FilmPlayer spec={PROCESS_FILM} component={ProcessFilm} {...props} />;
}
