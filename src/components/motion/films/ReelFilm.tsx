import type { ReactNode } from "react";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { REEL_FILM } from "../specs";
import { C, Capture, FONT, FadeUp, LineReveal, Marker, Phone, glide } from "../kit";
import { FilmPlayer, type FilmControls } from "../FilmPlayer";

/**
 * Three of the formats the motion design videos are sold in, as live
 * vertical films: a launch, a price list, a timetable. Each is built from a
 * concept on this site and its own published content — Barber Drina's prices
 * are the ones on its own Instagram post — so nothing on screen is made up
 * for the occasion.
 *
 * Everything a viewer has to read stays inside the margins Reels, TikTok and
 * Shorts leave free of their own buttons and captions.
 */
type Row = { name: string; value: string };

export type ReelFilmProps =
  | { kind: "launch"; lines: [string, string]; slug: string; domain: string; cta: string }
  | { kind: "prices"; kicker: string; business: string; rows: Row[]; place: string }
  | { kind: "schedule"; kicker: string; business: string; rows: Row[]; cta: string };

const SAFE = { top: 250, right: 168, bottom: 420, left: 96 };
const END = REEL_FILM.durationInFrames;
/* Everything leaves together before the loop comes round. */
const LEAVE = END - 22;

export function ReelFilm(props: ReelFilmProps) {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 6, END - 8, END], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ground = props.kind === "launch" ? C.sun : props.kind === "prices" ? C.ink : C.paper2;

  return (
    <AbsoluteFill style={{ background: ground, overflow: "hidden", fontFamily: FONT }}>
      <AbsoluteFill style={{ opacity: fade }}>
        {props.kind === "launch" && <Launch frame={frame} {...props} />}
        {props.kind === "prices" && <Prices {...props} />}
        {props.kind === "schedule" && <Schedule {...props} />}
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

/* ── Najava: the new site, on a phone ── */

const PHONE = { width: 600, height: 1180 };
const SCREEN_W = PHONE.width - 42;

function Launch({
  frame,
  lines,
  slug,
  domain,
  cta,
}: { frame: number } & Extract<ReelFilmProps, { kind: "launch" }>) {
  const rise = glide(frame, [34, 70], [1, 0]);
  const away = glide(frame, [LEAVE, END], [0, 1]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          top: SAFE.top,
          color: C.ink,
          fontSize: 230,
          fontWeight: 900,
          fontStretch: "120%",
          letterSpacing: "-0.055em",
          lineHeight: 0.9,
        }}
      >
        <LineReveal at={6} out={LEAVE}>
          {lines[0]}
        </LineReveal>
        <LineReveal at={12} out={LEAVE}>
          {lines[1]}
        </LineReveal>
      </div>

      <div
        style={{
          position: "absolute",
          left: 540 - 380,
          top: 980 + rise * 300 - away * 200,
          width: 760,
          height: 760,
          borderRadius: "50%",
          background: C.paper,
          opacity: 1 - rise,
        }}
      />
      <Phone
        width={PHONE.width}
        height={PHONE.height}
        style={{ left: 540 - PHONE.width / 2, top: 760 + rise * 1200 + away * 1200, transform: `rotate(${rise * 12}deg)` }}
      >
        <Capture
          src={staticFile(`work/${slug}-phone.avif`)}
          progress={glide(frame, [76, LEAVE], [0, 0.35])}
          pageHeight={(6400 / 780) * SCREEN_W}
          screenHeight={PHONE.height - 42}
        />
      </Phone>

      <FadeUp
        at={96}
        out={LEAVE}
        style={{ position: "absolute", left: SAFE.left, bottom: SAFE.bottom + 40, display: "grid", gap: 18, justifyItems: "start" }}
      >
        <div
          style={{
            padding: "22px 36px",
            borderRadius: 999,
            background: C.ink,
            color: C.paper,
            fontSize: 58,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {domain}
        </div>
      </FadeUp>
      <FadeUp at={112} out={LEAVE} style={{ position: "absolute", left: SAFE.left, bottom: SAFE.bottom - 60 }}>
        <div
          style={{
            padding: "20px 34px",
            borderRadius: 999,
            background: C.paper,
            color: C.ink,
            fontSize: 48,
            fontWeight: 600,
          }}
        >
          {cta} →
        </div>
      </FadeUp>
    </>
  );
}

/* ── Cjenovnik: prices, one line at a time ── */

function Prices({ kicker, business, rows, place }: Extract<ReelFilmProps, { kind: "prices" }>) {
  return (
    <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right - 40, top: SAFE.top, color: C.paper }}>
      <FadeUp at={4} out={LEAVE}>
        <Kicker tone="dark">{kicker}</Kicker>
      </FadeUp>
      <div
        style={{
          marginTop: 40,
          fontSize: 150,
          fontWeight: 900,
          fontStretch: "118%",
          letterSpacing: "-0.05em",
          lineHeight: 0.92,
        }}
      >
        {business.split(" ").map((word, i) => (
          <LineReveal key={word} at={10 + i * 6} out={LEAVE}>
            {word}
          </LineReveal>
        ))}
      </div>

      <div style={{ marginTop: 80, display: "grid" }}>
        {rows.map((row, i) => (
          <Slide key={row.name} at={48 + i * 12}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 30,
                padding: "34px 0",
                borderTop: `3px solid ${C.ink2}`,
              }}
            >
              <span style={{ fontSize: 50, fontWeight: 500, lineHeight: 1.15, color: C.paper }}>{row.name}</span>
              <span
                style={{
                  fontSize: 72,
                  fontWeight: 850,
                  fontStretch: "112%",
                  letterSpacing: "-0.03em",
                  color: C.sun,
                  whiteSpace: "nowrap",
                }}
              >
                {row.value}
              </span>
            </div>
          </Slide>
        ))}
      </div>

      <FadeUp at={48 + rows.length * 12 + 10} out={LEAVE}>
        <div style={{ marginTop: 50, fontSize: 44, fontWeight: 500, color: C.mutedDark }}>{place}</div>
      </FadeUp>
    </div>
  );
}

/* ── Raspored: today's classes, and the one button ── */

function Schedule({ kicker, business, rows, cta }: Extract<ReelFilmProps, { kind: "schedule" }>) {
  return (
    <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right - 40, top: SAFE.top, color: C.ink }}>
      <FadeUp at={4} out={LEAVE}>
        <Kicker tone="light">{kicker}</Kicker>
      </FadeUp>
      <div
        style={{
          marginTop: 40,
          fontSize: 128,
          fontWeight: 900,
          fontStretch: "118%",
          letterSpacing: "-0.05em",
          lineHeight: 0.92,
        }}
      >
        <LineReveal at={10} out={LEAVE}>
          <Marker at={30}>{business}</Marker>
        </LineReveal>
      </div>

      <div style={{ marginTop: 90, display: "grid", gap: 26 }}>
        {rows.map((row, i) => (
          <Slide key={row.value + row.name} at={44 + i * 12}>
            <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
              <span
                style={{
                  flex: "none",
                  width: 250,
                  padding: "20px 0",
                  borderRadius: 999,
                  background: C.ink,
                  color: C.paper,
                  textAlign: "center",
                  fontSize: 58,
                  fontWeight: 700,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {row.value}
              </span>
              <span style={{ fontSize: 74, fontWeight: 800, fontStretch: "110%", letterSpacing: "-0.03em" }}>
                {row.name}
              </span>
            </div>
          </Slide>
        ))}
      </div>

      <FadeUp at={44 + rows.length * 12 + 14} out={LEAVE}>
        <div
          style={{
            display: "inline-block",
            marginTop: 110,
            padding: "30px 52px",
            borderRadius: 999,
            border: `5px solid ${C.ink}`,
            background: C.sun,
            fontSize: 62,
            fontWeight: 750,
            letterSpacing: "-0.02em",
          }}
        >
          {cta} →
        </div>
      </FadeUp>
    </div>
  );
}

function Kicker({ tone, children }: { tone: "light" | "dark"; children: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 18,
        padding: "16px 30px",
        borderRadius: 999,
        border: `4px solid ${tone === "dark" ? C.sun : C.ink}`,
        color: tone === "dark" ? C.sun : C.ink,
        fontSize: 40,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      <span style={{ width: 18, height: 18, borderRadius: "50%", background: C.sun }} />
      {children}
    </div>
  );
}

/** A row sliding in from the right edge, and out to the left at the end. */
function Slide({ at, children }: { at: number; children: ReactNode }) {
  const frame = useCurrentFrame();
  const enter = glide(frame, [at, at + 18], [1, 0]);
  const leave = glide(frame, [LEAVE, END - 4], [0, 1]);
  return (
    <div style={{ transform: `translateX(${enter * 900 - leave * 900}px)`, opacity: 1 - enter * 0.6 }}>{children}</div>
  );
}

export function ReelPlayer(props: FilmControls & { inputProps: ReelFilmProps }) {
  return <FilmPlayer spec={REEL_FILM} component={ReelFilm} {...props} />;
}
