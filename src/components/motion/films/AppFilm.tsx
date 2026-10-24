import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { APP_FILM } from "../specs";
import { C, FONT, Phone, Still, glide } from "../kit";
import { FilmPlayer, type FilmControls } from "../FilmPlayer";

/**
 * The apps genre in one loop: the client app, used. A tap, and the next of
 * its three screens slides in — home, timetable, the owner's panel — each
 * named under the phone in the portfolio's own caption. The screens are from
 * the app's demo build, where every member is made up.
 */
export type AppFilmProps = { screens: { slug: string; caption: string }[] };

const SCREEN = 90;
const PHONE = { left: 300, top: 50, width: 400, height: 820 };

export function AppFilm({ screens }: AppFilmProps) {
  const frame = useCurrentFrame();
  const index = Math.min(screens.length - 1, Math.floor(frame / SCREEN));
  const local = frame % SCREEN;
  /* the slide into the next screen, over the last 14 frames of this one */
  const slide = glide(local, [SCREEN - 14, SCREEN], [0, 1]);
  const next = (index + 1) % screens.length;
  const tap = local >= SCREEN - 26 && local < SCREEN - 12 ? (local - (SCREEN - 26)) / 14 : null;
  const label = interpolate(local, [0, 10, SCREEN - 12, SCREEN], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: C.red, fontFamily: FONT }}>
      <Phone width={PHONE.width} height={PHONE.height} body={C.ink} screen={C.paper} style={{ left: PHONE.left, top: PHONE.top }}>
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${-slide * 100}%)` }}>
          <Still src={staticFile(`work/${screens[index].slug}.avif`)} style={{ width: "100%" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${(1 - slide) * 100}%)` }}>
          <Still src={staticFile(`work/${screens[next].slug}.avif`)} style={{ width: "100%" }} />
        </div>
        {tap !== null && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "62%",
              width: 90,
              height: 90,
              marginLeft: -45,
              marginTop: -45,
              borderRadius: "50%",
              border: `6px solid ${C.red}`,
              opacity: 1 - tap,
              transform: `scale(${0.4 + tap})`,
            }}
          />
        )}
      </Phone>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 40, display: "flex", justifyContent: "center", opacity: label }}>
        <div
          style={{
            padding: "14px 30px",
            borderRadius: 999,
            background: C.white,
            color: C.ink,
            fontSize: 34,
            fontWeight: 650,
          }}
        >
          {screens[index].caption}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export function AppPlayer(props: FilmControls & { inputProps: AppFilmProps }) {
  return <FilmPlayer spec={APP_FILM} component={AppFilm} {...props} />;
}
