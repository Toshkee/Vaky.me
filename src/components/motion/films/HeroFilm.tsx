import type { ReactNode } from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { HERO_FILM } from "../specs";
import { C, FONT, FadeUp, LineReveal, Capture, glide } from "../kit";
import { FilmPlayer, type FilmControls } from "../FilmPlayer";

/**
 * The hero: the work itself, on a loop.
 *
 * The sun comes up out of the sea, turns into a phone, and the phone shows
 * what was actually built — the two client sites live on their own domains,
 * then the client app in three of its screens. Then the phone becomes the sun
 * again and sets, which is the frame the loop starts from, so it never cuts.
 *
 * Nothing in it is invented: every screen is a capture of the real thing
 * (the app's from its demo build, where every member is made up), and every
 * caption is the project's own line from the portfolio below.
 */
export type HeroFilmProject = { slug: string; label: string; name: string; tag: string };
export type HeroFilmProps = {
  sites: [HeroFilmProject, HeroFilmProject];
  app: { label: string; name: string; tag: string; screens: [string, string, string] };
};

/* The phone, and the disc it is made from. */
const DISC = 460;
const PHONE_W = 470;
const PHONE_H = 960;
const BEZEL = 16;
const SCREEN_W = PHONE_W - BEZEL * 2;
const SCREEN_H = PHONE_H - BEZEL * 2;
/* Site captures are 780 × 6400; the app's screens 720 × 1558. */
const SITE_PAGE_H = (6400 / 780) * SCREEN_W;
const HORIZON = 905;
const CX = HERO_FILM.width / 2;
const CY = 600;

/* The timeline, in frames at 30 fps. */
const RISE = [0, 40] as const;
const MORPH = [40, 64] as const;
const SITE_A = { in: 64, out: 160 };
const SWAP = [160, 190] as const;
const SITE_B = { in: 190, out: 280 };
const APP = { in: 300, out: 368 };
const UNMORPH = [385, 402] as const;
const SET = [398, 420] as const;

export function HeroFilm({ sites, app }: HeroFilmProps) {
  const frame = useCurrentFrame();

  /* The sea leaves when the phone arrives and comes back for the sunset. */
  const seaDrop =
    frame < 200
      ? glide(frame, [MORPH[0], MORPH[1] + 6], [0, 340])
      : glide(frame, [372, 396], [340, 0]);

  /* Phone A: the sun that rises, then the first client site, then away left. */
  const morphIn = glide(frame, [MORPH[0], MORPH[1]], [0, 1]);
  const riseY = glide(frame, [RISE[0], RISE[1]], [HORIZON + DISC * 0.62, CY]);
  const aOut = glide(frame, [SWAP[0], SWAP[0] + 22], [0, 1]);

  /* Phone B: in from the right, the second site, then the app, then the sun
     again, setting. */
  const bIn = glide(frame, [SWAP[0] + 6, SWAP[1]], [1, 0]);
  const morphOut = glide(frame, [UNMORPH[0], UNMORPH[1]], [1, 0]);
  const setY = glide(frame, [SET[0], SET[1]], [CY, HORIZON + DISC * 0.62]);
  const toApp = glide(frame, [SITE_B.out, SITE_B.out + 18], [0, 1]);

  /* The app's other two screens fan out from behind the middle one. */
  const fan = frame < 360 ? glide(frame, [296, 326], [0, 1]) : glide(frame, [368, 386], [1, 0]);

  return (
    <AbsoluteFill style={{ background: C.paper2, overflow: "hidden", fontFamily: FONT }}>
      <Backdrop frame={frame} />

      {frame < SWAP[0] + 24 && (
        <Body
          morph={morphIn}
          x={CX - aOut * 760}
          y={frame < MORPH[0] ? riseY : CY}
          rotate={-aOut * 10}
        >
          <Capture
            src={staticFile(`work/${sites[0].slug}-phone.avif`)}
            progress={glide(frame, [SITE_A.in + 6, SWAP[0] + 10], [0, 0.42])}
            pageHeight={SITE_PAGE_H}
            screenHeight={SCREEN_H}
          />
        </Body>
      )}

      {frame >= SWAP[0] && (
        <>
          {fan > 0 && (
            <>
              <SidePhone fan={fan} side={-1} src={staticFile(`work/${app.screens[1]}.avif`)} />
              <SidePhone fan={fan} side={1} src={staticFile(`work/${app.screens[2]}.avif`)} />
            </>
          )}
          <Body
            morph={frame < UNMORPH[0] ? 1 : morphOut}
            x={CX + bIn * 760}
            y={frame < SET[0] ? CY : setY}
            rotate={bIn * 10}
          >
            <Capture
              src={staticFile(`work/${sites[1].slug}-phone.avif`)}
              progress={glide(frame, [SITE_B.in - 10, SITE_B.out + 10], [0, 0.4])}
              pageHeight={SITE_PAGE_H}
              screenHeight={SCREEN_H}
            />
            <Img
              src={staticFile(`work/${app.screens[0]}.avif`)}
              style={{ position: "absolute", inset: 0, width: "100%", opacity: toApp }}
            />
          </Body>
        </>
      )}

      <Sea drop={seaDrop} frame={frame} />

      {frame >= SITE_A.in && frame < SITE_A.out + 20 && (
        <Caption at={SITE_A.in + 10} out={SITE_A.out} {...sites[0]} />
      )}
      {frame >= SITE_B.in - 10 && frame < SITE_B.out + 20 && (
        <Caption at={SITE_B.in} out={SITE_B.out} {...sites[1]} />
      )}
      {frame >= APP.in && frame < APP.out + 20 && (
        <Caption at={APP.in + 8} out={APP.out} label={app.label} name={app.name} tag={app.tag} />
      )}
    </AbsoluteFill>
  );
}

/**
 * The shape that is both the sun and the phone. `morph` 0 is the disc,
 * 1 the phone; everything in between is the one turning into the other.
 */
function Body({
  morph,
  x,
  y,
  rotate,
  children,
}: {
  morph: number;
  x: number;
  y: number;
  rotate: number;
  children: ReactNode;
}) {
  const w = interpolate(morph, [0, 1], [DISC, PHONE_W]);
  const h = interpolate(morph, [0, 1], [DISC, PHONE_H]);
  const radius = interpolate(morph, [0, 1], [DISC / 2, 66]);
  const screen = interpolate(morph, [0.55, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  /* The ink rises through the sun like the sea coming up, instead of the
     two colours mixing into brown on the way. */
  const tide = interpolate(morph, [0.15, 0.75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: x - w / 2,
        top: y - h / 2,
        width: w,
        height: h,
        borderRadius: radius,
        background: C.sun,
        overflow: "hidden",
        transform: `rotate(${rotate}deg)`,
        padding: BEZEL * morph,
      }}
    >
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${tide * 100}%`, background: C.ink }} />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: Math.max(0, radius - BEZEL),
          overflow: "hidden",
          background: C.paper2,
          opacity: screen,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function SidePhone({ fan, side, src }: { fan: number; side: -1 | 1; src: string }) {
  const scale = 0.76;
  return (
    <div
      style={{
        position: "absolute",
        left: CX - PHONE_W / 2,
        top: CY - PHONE_H / 2,
        width: PHONE_W,
        height: PHONE_H,
        padding: BEZEL,
        borderRadius: 66,
        background: C.ink,
        transform: `translate(${side * fan * 300}px, ${fan * 46}px) rotate(${side * fan * 8}deg) scale(${scale})`,
      }}
    >
      <div style={{ width: "100%", height: "100%", borderRadius: 50, overflow: "hidden", background: C.paper2 }}>
        <Img src={src} style={{ width: "100%" }} />
      </div>
    </div>
  );
}

/**
 * One large disc behind the phone that travels and changes colour with each
 * project, so a cut between two screenshots reads as one continuous move.
 */
function Backdrop({ frame }: { frame: number }) {
  /* It shrinks away between projects and comes back somewhere else in a new
     colour, rather than sliding through the muddy middle of two colours. */
  const keys = [64, 92, 150, 168, 178, 198, 278, 296, 304, 326, 368, 394];
  const at = (values: number[]) =>
    interpolate(frame, keys, values, { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const r = at([0, 380, 380, 0, 0, 360, 360, 0, 0, 470, 470, 0]);
  const cx = frame < 173 ? 300 : frame < 300 ? 800 : CX;
  const cy = frame < 173 ? 400 : frame < 300 ? 780 : 620;
  const color = frame < 173 ? C.foam : frame < 300 ? C.sun : C.foam;

  if (r <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: cx - r,
        top: cy - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        background: color,
      }}
    />
  );
}

/** The sea: ink below a slow wave, with a line of foam riding it. */
function Sea({ drop, frame }: { drop: number; frame: number }) {
  const W = HERO_FILM.width;
  const phase = frame * 0.045;
  const wave = (offset: number, amp: number) => {
    const points: string[] = [];
    for (let x = 0; x <= W; x += 40) {
      const y = offset + Math.sin(x / 150 + phase) * amp;
      points.push(`${x},${y.toFixed(1)}`);
    }
    return points;
  };
  const top = wave(0, 14);
  const foam = wave(46, 10);

  return (
    <svg
      width={W}
      height={420}
      viewBox={`0 -30 ${W} 420`}
      style={{ position: "absolute", left: 0, top: HORIZON + drop - 0 }}
    >
      <polygon points={`0,420 ${top.join(" ")} ${W},420`} fill={C.ink} />
      <polyline points={foam.join(" ")} fill="none" stroke={C.foam} strokeWidth={8} strokeLinecap="round" />
    </svg>
  );
}

/** The project's eyebrow, name and line, set over the lower left corner. */
function Caption({
  at,
  out,
  label,
  name,
  tag,
}: {
  at: number;
  out: number;
  label: string;
  name: string;
  tag: string;
}) {
  const frame = useCurrentFrame();
  const plate = interpolate(frame, [at - 2, at, out + 6, out + 12], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ position: "absolute", left: 56, bottom: 64, display: "grid", justifyItems: "start", gap: 14 }}>
      <FadeUp at={at} out={out}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            padding: "12px 22px",
            borderRadius: 999,
            background: C.paper,
            color: C.ink,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ width: 14, height: 14, borderRadius: "50%", background: C.sun }} />
          {label}
        </div>
      </FadeUp>
      <div
        style={{
          padding: "10px 28px 16px",
          borderRadius: 28,
          background: C.ink,
          color: C.paper,
          fontSize: 92,
          fontWeight: 850,
          fontStretch: "115%",
          letterSpacing: "-0.045em",
          lineHeight: 1,
          opacity: plate,
        }}
      >
        <LineReveal at={at + 2} out={out}>
          {name}
        </LineReveal>
      </div>
      <FadeUp at={at + 8} out={out - 2}>
        <div
          style={{
            padding: "12px 22px",
            borderRadius: 999,
            background: C.paper,
            color: C.ink,
            fontSize: 34,
            fontWeight: 500,
          }}
        >
          {tag}
        </div>
      </FadeUp>
    </div>
  );
}

export function HeroPlayer(props: FilmControls & { inputProps: HeroFilmProps }) {
  return <FilmPlayer spec={HERO_FILM} component={HeroFilm} {...props} />;
}
