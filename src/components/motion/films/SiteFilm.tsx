import { AbsoluteFill, interpolate, interpolateColors, staticFile, useCurrentFrame } from "remotion";
import { SITE_FILM } from "../specs";
import { C, Capture, FONT, FadeUp, Phone, glide } from "../kit";
import { FilmPlayer, type FilmControls } from "../FilmPlayer";

/**
 * The websites genre in one loop: a phone sketched in outline, the sketch
 * filled in, and then the real site that sketch became — a client site live
 * on its own domain — scrolling on the same phone.
 */
export type SiteFilmProps = { slug: string; domain: string; live: string };

const PHONE = { left: 290, top: 60, width: 420, height: 860 };
const SCREEN_W = PHONE.width - 30;
const END = SITE_FILM.durationInFrames;

export function SiteFilm({ slug, domain, live }: SiteFilmProps) {
  const frame = useCurrentFrame();
  const draw = (i: number) => glide(frame, [6 + i * 5, 22 + i * 5], [0, 1]);
  const fill = glide(frame, [52, 84], [0, 1]);
  const real = glide(frame, [96, 116], [0, 1]);
  const fade = interpolate(frame, [0, 6, END - 10, END], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const block = (i: number, color: string) => ({
    transform: `scaleX(${draw(i)})`,
    transformOrigin: "left center",
    background: interpolateColors(fill, [0, 1], ["rgba(0,0,0,0)", color]),
    border: `4px solid ${interpolateColors(fill, [0, 1], [C.paper, color])}`,
  });

  return (
    <AbsoluteFill style={{ background: C.ink, fontFamily: FONT, opacity: fade }}>
      <Phone width={PHONE.width} height={PHONE.height} body={C.paper} screen={C.ink2} style={{ left: PHONE.left, top: PHONE.top }}>
        <div style={{ position: "absolute", inset: 0, padding: "44px 28px", display: "grid", gap: 22, alignContent: "start", opacity: 1 - real }}>
          <div style={{ height: 22, width: "42%", borderRadius: 11, ...block(0, C.paper) }} />
          <div style={{ height: 260, borderRadius: 24, ...block(1, C.red) }} />
          <div style={{ height: 18, width: "88%", borderRadius: 9, ...block(2, C.paper) }} />
          <div style={{ height: 18, width: "66%", borderRadius: 9, ...block(3, C.paper) }} />
          <div style={{ height: 18, width: "76%", borderRadius: 9, ...block(4, C.paper) }} />
          <div style={{ marginTop: 18, height: 76, borderRadius: 38, ...block(5, C.red) }} />
        </div>
        <div style={{ position: "absolute", inset: 0, opacity: real }}>
          <Capture
            src={staticFile(`work/${slug}-phone.avif`)}
            progress={glide(frame, [118, END - 12], [0, 0.3])}
            pageHeight={(6400 / 780) * SCREEN_W}
            screenHeight={PHONE.height - 30}
          />
        </div>
      </Phone>

      {frame >= 120 && (
        <FadeUp at={124} style={{ position: "absolute", left: 0, right: 0, bottom: 34, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              padding: "16px 28px",
              borderRadius: 999,
              background: C.paper,
              color: C.ink,
              fontSize: 32,
              fontWeight: 650,
            }}
          >
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: C.ok }} />
            {domain}
            <span style={{ color: C.muted, fontWeight: 500 }}>· {live}</span>
          </div>
        </FadeUp>
      )}
    </AbsoluteFill>
  );
}

export function SitePlayer(props: FilmControls & { inputProps: SiteFilmProps }) {
  return <FilmPlayer spec={SITE_FILM} component={SiteFilm} {...props} />;
}
