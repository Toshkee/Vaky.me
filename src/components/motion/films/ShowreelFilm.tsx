import type { ReactNode } from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SHOWREEL_FILM } from "../specs";
import { C, Capture, FONT, FadeUp, LineReveal, POSTER, Phone, glide, typed } from "../kit";
import { FilmPlayer, type FilmControls } from "../FilmPlayer";

/**
 * The showreel: four pieces of real work, one after another, cut together
 * with a red wipe — the two client sites live on their own domains, the
 * client app in three of its screens, and the AI portfolio.
 *
 * Nothing in it is invented. Every screen is a capture of the real thing
 * (the app's from its demo build, where every member is made up) and every
 * caption is the project's own line from the portfolio. The loop starts
 * under the wipe it ends on, so it never visibly restarts.
 */
type Caption = { label: string; name: string; tag: string };
export type ShowreelFilmProps = {
  sites: [Caption & { slug: string }, Caption & { slug: string }];
  app: Caption & { screens: [string, string, string] };
  portfolio: Caption & { url: string };
};

const W = SHOWREEL_FILM.width;
const H = SHOWREEL_FILM.height;
const SHOT = 120;
const CUTS = [0, SHOT, SHOT * 2, SHOT * 3, SHOT * 4];
/* The wipe covers the frame for its middle: in over 12 frames, out over 12. */
const HALF = 12;

const PHONE = { width: 430, height: 880 };
const PAGE_H = (6400 / 780) * (PHONE.width - 30);

export function ShowreelFilm({ sites, app, portfolio }: ShowreelFilmProps) {
  const frame = useCurrentFrame();
  const shot = Math.min(3, Math.floor(frame / SHOT));
  const local = frame - shot * SHOT;

  return (
    <AbsoluteFill style={{ background: C.ink, overflow: "hidden", fontFamily: FONT, color: C.paper }}>
      <FilmGrain frame={frame} />
      {shot === 0 && <SiteShot local={local} caption={sites[0]} index={1} />}
      {shot === 1 && <SiteShot local={local} caption={sites[1]} index={2} />}
      {shot === 2 && <AppShot local={local} app={app} />}
      {shot === 3 && <WebShot local={local} portfolio={portfolio} />}
      <Wipe frame={frame} />
    </AbsoluteFill>
  );
}

/** The cut: a red panel crossing the frame left to right. */
function Wipe({ frame }: { frame: number }) {
  const cut = CUTS.find((c) => Math.abs(frame - c) <= HALF);
  if (cut === undefined) return null;
  const x = frame < cut ? interpolate(frame, [cut - HALF, cut], [-W, 0]) : interpolate(frame, [cut, cut + HALF], [0, W]);
  return <div style={{ position: "absolute", inset: 0, background: C.red, transform: `translateX(${x}px)` }} />;
}

/** A slow drift of light lines, so the black reads as a screen, not a hole. */
function FilmGrain({ frame }: { frame: number }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.08,
        backgroundImage: `repeating-linear-gradient(90deg, ${C.paper} 0 1px, transparent 1px 160px)`,
        transform: `translateX(${-(frame % 160)}px)`,
      }}
    />
  );
}

/** The left half of every shot: shot number, label, name, line. */
function Credits({ index, caption, at, size = 210 }: { index: number; caption: Caption; at: number; size?: number }) {
  const out = SHOT - 14;
  return (
    <div style={{ position: "absolute", left: 130, top: 0, bottom: 0, width: 860, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <FadeUp at={at} out={out}>
        <div style={{ display: "flex", alignItems: "center", gap: 26, fontSize: 30, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>
          <span style={{ color: C.mutedDark }}>{String(index).padStart(2, "0")} / 04</span>
          <span style={{ padding: "10px 22px", borderRadius: 999, background: C.red, color: C.white }}>{caption.label}</span>
        </div>
      </FadeUp>
      <div style={{ ...POSTER, marginTop: 34, fontSize: size }}>
        <LineReveal at={at + 4} out={out}>
          {caption.name}
        </LineReveal>
      </div>
      <FadeUp at={at + 12} out={out - 2}>
        <div style={{ marginTop: 28, fontSize: 40, color: C.mutedDark }}>{caption.tag}</div>
      </FadeUp>
    </div>
  );
}

/** A device sliding up into its place on the right, and away at the end. */
function useEnter(local: number) {
  const enter = glide(local, [HALF - 2, HALF + 26], [1, 0]);
  const leave = glide(local, [SHOT - 18, SHOT], [0, 1]);
  return { y: enter * 220 - leave * 120, opacity: 1 - enter * 0.4, rotate: enter * 6 };
}

function SiteShot({ local, caption, index }: { local: number; caption: Caption & { slug: string }; index: number }) {
  const { y, rotate } = useEnter(local);
  return (
    <>
      <Credits index={index} caption={caption} at={HALF + 2} />
      <Phone
        width={PHONE.width}
        height={PHONE.height}
        body={C.paper}
        style={{ left: 1300, top: (H - PHONE.height) / 2 + y, transform: `rotate(${rotate}deg)` }}
      >
        <Capture
          src={staticFile(`work/${caption.slug}-phone.avif`)}
          progress={glide(local, [HALF + 20, SHOT], [0, 0.32])}
          pageHeight={PAGE_H}
          screenHeight={PHONE.height - 30}
        />
      </Phone>
    </>
  );
}

function AppShot({ local, app }: { local: number; app: ShowreelFilmProps["app"] }) {
  const { y } = useEnter(local);
  const fan = glide(local, [HALF + 18, HALF + 46], [0, 1]) * (1 - glide(local, [SHOT - 20, SHOT - 4], [0, 1]));
  const screen = (slug: string): ReactNode => <Img src={staticFile(`work/${slug}.avif`)} style={{ width: "100%" }} />;
  const side = (dir: -1 | 1, slug: string) => (
    <Phone
      width={PHONE.width}
      height={PHONE.height}
      body={C.paper}
      style={{
        left: 1300,
        top: (H - PHONE.height) / 2 + y,
        transform: `translateX(${dir * fan * 250}px) translateY(${fan * 40}px) rotate(${dir * fan * 9}deg) scale(0.82)`,
      }}
    >
      {screen(slug)}
    </Phone>
  );
  return (
    <>
      <Credits index={3} caption={app} at={HALF + 2} />
      {side(-1, app.screens[1])}
      {side(1, app.screens[2])}
      <Phone width={PHONE.width} height={PHONE.height} body={C.paper} style={{ left: 1300, top: (H - PHONE.height) / 2 + y }}>
        {screen(app.screens[0])}
      </Phone>
    </>
  );
}

function WebShot({ local, portfolio }: { local: number; portfolio: ShowreelFilmProps["portfolio"] }) {
  const { y } = useEnter(local);
  const win = { width: 900, height: 600, bar: 56 };
  return (
    <>
      <Credits index={4} caption={portfolio} at={HALF + 2} size={128} />
      <div
        style={{
          position: "absolute",
          left: 960,
          top: (H - win.height) / 2 + y,
          width: win.width,
          height: win.height,
          borderRadius: 26,
          overflow: "hidden",
          background: C.white,
          border: `6px solid ${C.paper}`,
        }}
      >
        <div style={{ height: win.bar, display: "flex", alignItems: "center", justifyContent: "center", background: C.paper2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, width: 420, height: 34, padding: "0 18px", borderRadius: 999, background: C.paper, color: C.ink, fontSize: 18, fontWeight: 500 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: C.ok }} />
            {typed(portfolio.url, local, HALF + 12, 1.5)}
          </div>
        </div>
        <Img src={staticFile("work/pavletosic-com.avif")} style={{ width: "100%", display: "block" }} />
      </div>
    </>
  );
}

export function ShowreelPlayer(props: FilmControls & { inputProps: ShowreelFilmProps }) {
  return <FilmPlayer spec={SHOWREEL_FILM} component={ShowreelFilm} {...props} />;
}
