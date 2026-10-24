import type { ReactNode } from "react";
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SHOWREEL_FILM } from "../specs";
import { C, Capture, FONT, FadeUp, LineReveal, POSTER, Phone, Still, glide, typed } from "../kit";
import { FilmPlayer, type FilmControls } from "../FilmPlayer";

/**
 * The showreel: five pieces of real work, one after another, cut together
 * with a red wipe, in whatever order the page hands them over — the client
 * app in three of its screens, sites live on their own domains in a phone,
 * and the AI portfolio in a browser window.
 *
 * Nothing in it is invented. Every screen is a capture of the real thing
 * (the app's from its demo build, where every member is made up) and every
 * caption is the project's own line from the portfolio. The loop starts
 * under the wipe it ends on, so it never visibly restarts.
 */
type Caption = { label: string; name: string; tag: string };
type Site = Caption & { slug: string };
type App = Caption & { screens: [string, string, string] };
type Web = Caption & { url: string };
export type ReelShot = (App & { kind: "app" }) | (Site & { kind: "site" }) | (Web & { kind: "web" });
export type ShowreelFilmProps = { shots: ReelShot[] };

const W = SHOWREEL_FILM.width;
const H = SHOWREEL_FILM.height;
const SHOT = 120;
const SHOTS = SHOWREEL_FILM.durationInFrames / SHOT;
const CUTS = Array.from({ length: SHOTS + 1 }, (_, i) => i * SHOT);
/* The wipe covers the frame for its middle: in over 12 frames, out over 12. */
const HALF = 12;

const PHONE = { width: 430, height: 880 };
const PAGE_H = (6400 / 780) * (PHONE.width - 30);

export function ShowreelFilm({ shots }: ShowreelFilmProps) {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: "hidden", fontFamily: FONT, color: C.paper }}>
      {/* Each shot in its own Sequence, so its clock — and the clock every
          caption animation inside it reads — starts at its own cut. */}
      {shots.slice(0, SHOTS).map((shot, i) => (
        <Sequence key={shot.name} from={i * SHOT} durationInFrames={SHOT}>
          <Shot shot={shot} />
        </Sequence>
      ))}
      <Wipe frame={frame} />
    </AbsoluteFill>
  );
}

function Shot({ shot }: { shot: ReelShot }) {
  const local = useCurrentFrame();
  switch (shot.kind) {
    case "app":
      return <AppShot local={local} app={shot} />;
    case "site":
      return <SiteShot local={local} site={shot} />;
    case "web":
      return <WebShot local={local} portfolio={shot} />;
  }
}

/** The cut: a red panel crossing the frame left to right. */
function Wipe({ frame }: { frame: number }) {
  const cut = CUTS.find((c) => Math.abs(frame - c) <= HALF);
  if (cut === undefined) return null;
  const x = frame < cut ? interpolate(frame, [cut - HALF, cut], [-W, 0]) : interpolate(frame, [cut, cut + HALF], [0, W]);
  return <div style={{ position: "absolute", inset: 0, background: C.red, transform: `translateX(${x}px)` }} />;
}

/** The left half of every shot: what it is, the name, where. */
function Credits({ caption, at, size = 150 }: { caption: Caption; at: number; size?: number }) {
  const out = SHOT - 14;
  return (
    <div style={{ position: "absolute", left: 130, top: 0, bottom: 0, width: 860, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <FadeUp at={at} out={out}>
        <span
          style={{
            display: "inline-block",
            padding: "10px 22px",
            borderRadius: 999,
            background: C.red,
            color: C.white,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {caption.label}
        </span>
      </FadeUp>
      <div style={{ ...POSTER, marginTop: 34, fontSize: size, maxWidth: 860 }}>
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

function SiteShot({ local, site }: { local: number; site: Site }) {
  const { y, rotate } = useEnter(local);
  return (
    <>
      <Credits caption={site} at={HALF + 2} />
      <Phone
        width={PHONE.width}
        height={PHONE.height}
        body={C.paper}
        style={{ left: 1300, top: (H - PHONE.height) / 2 + y, transform: `rotate(${rotate}deg)` }}
      >
        <Capture
          src={staticFile(`work/${site.slug}-phone.avif`)}
          progress={glide(local, [HALF + 20, SHOT], [0, 0.32])}
          pageHeight={PAGE_H}
          screenHeight={PHONE.height - 30}
        />
      </Phone>
    </>
  );
}

function AppShot({ local, app }: { local: number; app: App }) {
  const { y } = useEnter(local);
  const fan = glide(local, [HALF + 18, HALF + 46], [0, 1]) * (1 - glide(local, [SHOT - 20, SHOT - 4], [0, 1]));
  const screen = (slug: string): ReactNode => <Still src={staticFile(`work/${slug}.avif`)} style={{ width: "100%" }} />;
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
      <Credits caption={app} at={HALF + 2} />
      {side(-1, app.screens[1])}
      {side(1, app.screens[2])}
      <Phone width={PHONE.width} height={PHONE.height} body={C.paper} style={{ left: 1300, top: (H - PHONE.height) / 2 + y }}>
        {screen(app.screens[0])}
      </Phone>
    </>
  );
}

function WebShot({ local, portfolio }: { local: number; portfolio: Web }) {
  const { y } = useEnter(local);
  const win = { width: 900, height: 600, bar: 56 };
  return (
    <>
      <Credits caption={portfolio} at={HALF + 2} size={104} />
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
        <Still src={staticFile("work/pavletosic-com.avif")} style={{ width: "100%", display: "block" }} />
      </div>
    </>
  );
}

export function ShowreelPlayer(props: FilmControls & { inputProps: ShowreelFilmProps }) {
  return <FilmPlayer spec={SHOWREEL_FILM} component={ShowreelFilm} {...props} />;
}
