import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  interpolateColors,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { HEIGHT, SAFE, WIDTH } from "../format";
import { FadeUp, LineReveal, SlowZoom, useEntrance } from "../motion";
import { color, font } from "./brand";

/**
 * "Konoba Skadar has a new site": the launch video a client gets with the
 * motion design add-on, made for the Konoba Skadar concept so the price list
 * can show one instead of describing it.
 *
 * Five scenes, each a thing the new site does: the place, the site itself on
 * a phone, a dish off the menu, a table booked, and the sign-off that sends
 * people to the link. Every word and photo comes from the concept's own page.
 */
const SCENE = { lake: 135, site: 240, dish: 120, booking: 120, signOff: 96 };

/** Frames each transition overlaps the scenes on either side of it. */
const CUT = 22;
const cut = linearTiming({ durationInFrames: CUT, easing: Easing.inOut(Easing.cubic) });

const scenes = Object.values(SCENE);
export const KONOBA_SKADAR_FRAMES =
  scenes.reduce((sum, frames) => sum + frames, 0) - CUT * (scenes.length - 1);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export function KonobaSkadarLaunch() {
  return (
    <AbsoluteFill style={{ background: color.lake, fontFamily: font.sans }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE.lake}>
          <Lake />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={SCENE.site}>
          <Site />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={SCENE.dish}>
          <Dish />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={SCENE.booking}>
          <Booking />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={SCENE.signOff}>
          <SignOff />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
}

/* ── Type ── */

const headline: CSSProperties = {
  fontFamily: font.serif,
  fontWeight: 400,
  fontSize: 116,
  lineHeight: 1.02,
  letterSpacing: "-0.02em",
};

function Eyebrow({ tone, children }: { tone: string; children: ReactNode }) {
  return (
    <p
      style={{
        margin: 0,
        fontWeight: 700,
        fontSize: 28,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: tone,
      }}
    >
      {children}
    </p>
  );
}

/** Copy anchored to the lowest line the platform UI leaves readable. */
function Bottom({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, bottom: SAFE.bottom }}>
      {children}
    </div>
  );
}

/* ── 1. The place ── */

function Lake() {
  return (
    <AbsoluteFill>
      <SlowZoom
        src="konoba-skadar-hero.webp"
        duration={SCENE.lake}
        from={1.16}
        to={1.02}
        position="54% 50%"
      />
      {/* Darkens the valley where the copy sits, so cream type keeps its
          contrast over the green. */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(16,29,36,.5) 0%, rgba(16,29,36,0) 26%, rgba(16,29,36,0) 40%, rgba(16,29,36,.93) 72%)",
        }}
      />
      <Bottom>
        <FadeUp at={6}>
          <Eyebrow tone={color.amber}>Virpazar · Skadarsko jezero</Eyebrow>
        </FadeUp>
        <div style={{ ...headline, color: color.cream, marginTop: 36 }}>
          <LineReveal at={14}>Sto uz jezero.</LineReveal>
          <LineReveal at={24}>
            <em style={{ color: color.amber }}>Ukusi koji</em>
          </LineReveal>
          <LineReveal at={32}>
            <em style={{ color: color.amber }}>ostaju.</em>
          </LineReveal>
        </div>
      </Bottom>
    </AbsoluteFill>
  );
}

/* ── 2. The site, on a phone ── */

const PHONE = { width: 640, top: 640, bezel: 18 };

/** The capture is 780px wide (public/work/konoba-skadar-phone.webp). */
const CAPTURE_WIDTH = 780;
const SCREEN_WIDTH = PHONE.width - PHONE.bezel * 2;

/* Where the scroll stops, in capture pixels: the menu's heading, then the
   fish dishes. */
const MENU_AT = 1420;
const FISH_AT = 3110;

function Site() {
  const frame = useCurrentFrame();
  const rise = useEntrance(12, 40);
  const scroll = interpolate(frame, [70, 112, 150, 205], [0, MENU_AT, MENU_AT, FISH_AT], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

  const type = { ...headline, fontSize: 104, color: color.ink };

  return (
    <AbsoluteFill style={{ background: color.cream }}>
      <div style={{ position: "absolute", top: SAFE.top, left: SAFE.left, right: SAFE.right }}>
        <FadeUp at={10}>
          <Eyebrow tone={color.rust}>Konoba Skadar</Eyebrow>
        </FadeUp>
        {/* Two headlines in one place: the first leaves as the phone reaches
            the menu, and the second takes its lines. */}
        <div style={{ position: "relative", marginTop: 32 }}>
          <div style={type}>
            <LineReveal at={16} out={124}>
              Novi sajt
            </LineReveal>
            <LineReveal at={24} out={128}>
              je <em style={{ color: color.rust }}>online.</em>
            </LineReveal>
          </div>
          <div style={{ ...type, position: "absolute", inset: 0 }}>
            <LineReveal at={136}>Jelovnik,</LineReveal>
            <LineReveal at={144}>
              <em style={{ color: color.rust }}>uvijek pri ruci.</em>
            </LineReveal>
          </div>
        </div>
      </div>

      {/* The phone runs off the bottom edge: it is the site that matters, not
          the handset, and a whole phone would leave the screen half as wide. */}
      <div
        style={{
          position: "absolute",
          left: (WIDTH - PHONE.width) / 2,
          top: PHONE.top,
          width: PHONE.width,
          height: HEIGHT - PHONE.top + 120,
          padding: PHONE.bezel,
          borderRadius: 76,
          background: color.deep,
          boxShadow: "0 40px 90px rgba(16, 29, 36, 0.28)",
          transform: `translateY(${(1 - rise) * (HEIGHT - PHONE.top + 160)}px)`,
        }}
      >
        <div
          style={{
            position: "relative",
            height: "100%",
            overflow: "hidden",
            borderRadius: 58,
            background: color.lake,
          }}
        >
          <Img
            src={staticFile("work/konoba-skadar-phone.webp")}
            style={{
              display: "block",
              width: "100%",
              /* The status bar: the page starts under the island, and only
                 scrolls up behind it. */
              marginTop: 72,
              transform: `translateY(${(-scroll * SCREEN_WIDTH) / CAPTURE_WIDTH}px)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 20,
              left: "50%",
              width: 132,
              height: 38,
              marginLeft: -66,
              borderRadius: 19,
              background: "#000",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
}

/* ── 3. A dish off the menu ── */

/* The photo is nearly square, so filling the frame with it would put the
   copy over the fish. It takes the top of the frame instead, about its own
   height, and fades into the lake colour the copy sits on. */
const DISH_PHOTO_HEIGHT = 1180;

function Dish() {
  const leader = useEntrance(48, 30);

  return (
    <AbsoluteFill style={{ background: color.lake }}>
      <div style={{ position: "absolute", inset: 0, bottom: "auto", height: DISH_PHOTO_HEIGHT, overflow: "hidden" }}>
        <SlowZoom src="konoba-skadar-fish.webp" duration={SCENE.dish} from={1.02} to={1.1} />
        <AbsoluteFill
          style={{
            background: `linear-gradient(180deg, rgba(16,29,36,.45) 0%, rgba(16,29,36,0) 22%, rgba(16,29,36,0) 62%, ${color.lake} 100%)`,
          }}
        />
      </div>
      <Bottom>
        <FadeUp at={14}>
          <Eyebrow tone={color.amber}>Sa jelovnika</Eyebrow>
        </FadeUp>
        <div style={{ ...headline, color: color.cream, marginTop: 36 }}>
          <LineReveal at={20}>Sa žara,</LineReveal>
          <LineReveal at={28}>
            <em style={{ color: color.amber }}>iz jezera.</em>
          </LineReveal>
        </div>

        {/* A line of the menu as the site sets it: name, dotted leader,
            price. The leader draws itself across to the price. */}
        <FadeUp
          at={40}
          style={{
            marginTop: 52,
            paddingTop: 36,
            borderTop: "2px solid rgba(242, 233, 216, 0.25)",
            color: color.cream,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, fontSize: 40, fontWeight: 700 }}>
            <span>Pastrmka na žaru</span>
            <span
              style={{
                flex: 1,
                borderBottom: "4px dotted rgba(242, 233, 216, 0.45)",
                transform: `scaleX(${leader})`,
                transformOrigin: "left",
              }}
            />
            <span style={{ opacity: leader, fontVariantNumeric: "tabular-nums" }}>11,00 €</span>
          </div>
          <p style={{ margin: "14px 0 0", fontSize: 30, lineHeight: 1.4, color: "rgba(242, 233, 216, 0.72)" }}>
            Riječna pastrmka, blitva s krtolom i limun.
          </p>
        </FadeUp>
      </Bottom>
    </AbsoluteFill>
  );
}

/* ── 4. A table booked ── */

/** The frame the button is pressed on. */
const TAP = 76;

function Booking() {
  const frame = useCurrentFrame();
  const press = interpolate(frame, [TAP, TAP + 4, TAP + 12], [1, 0.95, 1], clamp);
  const ripple = interpolate(frame, [TAP, TAP + 20], [0, 1], clamp);
  /* The site's own hover: amber lifts to cream for a moment. */
  const fill = interpolateColors(frame, [TAP, TAP + 4, TAP + 22], [color.amber, color.cream, color.amber]);

  return (
    <AbsoluteFill style={{ background: color.wine }}>
      {/* No photo here, so the copy is centred in the readable area rather
          than parked at its foot under an empty wall of colour. */}
      <div
        style={{
          position: "absolute",
          inset: `${SAFE.top}px ${SAFE.right}px ${SAFE.bottom}px ${SAFE.left}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <FadeUp at={14}>
          <Eyebrow tone={color.amber}>Rezervacije</Eyebrow>
        </FadeUp>
        <div style={{ ...headline, color: color.cream, marginTop: 36 }}>
          <LineReveal at={20}>Sačuvaj sebi</LineReveal>
          <LineReveal at={28}>
            <em style={{ color: color.amber }}>dobar sto.</em>
          </LineReveal>
        </div>
        <FadeUp at={38}>
          <p
            style={{
              margin: "40px 0 0",
              maxWidth: 760,
              fontSize: 36,
              lineHeight: 1.4,
              color: "rgba(242, 233, 216, 0.8)",
            }}
          >
            Za terasu, ručak za više ljudi ili poseban datum — pozovite nas malo ranije.
          </p>
        </FadeUp>
        <FadeUp at={48} style={{ marginTop: 60 }}>
          <div
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              height: 124,
              padding: "0 68px",
              overflow: "hidden",
              background: fill,
              color: "#1b2a33",
              fontSize: 40,
              fontWeight: 700,
              transform: `scale(${press})`,
            }}
          >
            Rezerviši sto
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 640,
                height: 640,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.4)",
                opacity: ripple > 0 ? 1 - ripple : 0,
                transform: `translate(-50%, -50%) scale(${ripple})`,
              }}
            />
          </div>
        </FadeUp>
      </div>
    </AbsoluteFill>
  );
}

/* ── 5. Sign-off ── */

function SignOff() {
  const rule = useEntrance(30, 30);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: color.lake,
        /* Centred on the readable area rather than the frame, which the
           platform UI pushes down. */
        paddingBottom: SAFE.bottom - SAFE.top,
      }}
    >
      <FadeUp at={10}>
        <Eyebrow tone={color.amber}>Novi sajt je online</Eyebrow>
      </FadeUp>
      <div style={{ ...headline, fontSize: 120, color: color.cream, marginTop: 40 }}>
        <LineReveal at={16}>Konoba Skadar</LineReveal>
      </div>
      <div
        style={{
          width: 160,
          height: 3,
          marginTop: 52,
          background: color.amber,
          transform: `scaleX(${rule})`,
        }}
      />
      <FadeUp at={36}>
        <p style={{ margin: "52px 0 0", fontSize: 42, color: color.cream }}>Link je u opisu profila.</p>
      </FadeUp>
      <FadeUp at={44} style={{ marginTop: 28 }}>
        <Eyebrow tone="rgba(242, 233, 216, 0.6)">Virpazar · Svaki dan 10:00 – 23:00</Eyebrow>
      </FadeUp>
    </AbsoluteFill>
  );
}
