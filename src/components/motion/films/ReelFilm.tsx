import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { REEL_FILM } from "../specs";
import { C, Capture, FONT, FadeUp, LineReveal, POSTER, Phone, glide } from "../kit";
import { FilmPlayer, type FilmControls } from "../FilmPlayer";

/**
 * The motion design genre's film: a launch video in the vertical format the
 * videos are delivered in — the headline, a new site rising on a phone (the
 * Konoba Skadar concept), the address and the call to look.
 *
 * Everything a viewer has to read stays inside the margins Reels, TikTok and
 * Shorts leave free of their own buttons and captions.
 */
export type ReelFilmProps = { kind: "launch"; lines: [string, string]; slug: string; domain: string; cta: string };

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

  return (
    <AbsoluteFill style={{ background: C.red, overflow: "hidden", fontFamily: FONT }}>
      <AbsoluteFill style={{ opacity: fade }}>
        <Launch frame={frame} {...props} />
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
}: { frame: number } & ReelFilmProps) {
  const rise = glide(frame, [34, 70], [1, 0]);
  const away = glide(frame, [LEAVE, END], [0, 1]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          top: SAFE.top,
          ...POSTER,
          color: C.white,
          fontSize: 300,
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

export function ReelPlayer(props: FilmControls & { inputProps: ReelFilmProps }) {
  return <FilmPlayer spec={REEL_FILM} component={ReelFilm} {...props} />;
}
