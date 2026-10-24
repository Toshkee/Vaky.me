import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SAFE, WIDTH } from "../format";
import { FadeUp, LineReveal, useEntrance } from "../motion";
import { color, font } from "./brand";
import { CUT, EndCard, Eyebrow, Phone, Stripes, caps, clamp } from "./parts";

/**
 * "Barber Drina has a new site": the launch video of the motion design
 * add-on, made for the Barber Drina concept. The shop's own three lines slam
 * in, the site scrolls by on a phone, and the logo signs off. Every word and
 * picture comes from the concept's page.
 */
const WORDS = 95;
const SITE = 150;
export const BARBER_DRINA_LAUNCH_FRAMES = 350;

export function BarberDrinaLaunch() {
  return (
    <AbsoluteFill style={{ background: color.black, fontFamily: font, color: color.white }}>
      <Sequence durationInFrames={WORDS}>
        <Words />
      </Sequence>
      <Sequence from={WORDS} durationInFrames={SITE}>
        <Site />
      </Sequence>
      <Sequence from={WORDS + SITE}>
        <EndCard cta="Link u bio" />
      </Sequence>
      <Stripes at={WORDS - CUT / 2} />
      <Stripes at={WORDS + SITE - CUT / 2} />
    </AbsoluteFill>
  );
}

function Words() {
  return (
    <AbsoluteFill style={{ padding: `${SAFE.top}px ${SAFE.right}px ${SAFE.bottom}px ${SAFE.left}px`, justifyContent: "center" }}>
      <FadeUp at={2}>
        <Eyebrow>Stari Aerodrom · Podgorica</Eyebrow>
      </FadeUp>
      <div style={{ ...caps, fontSize: 136, marginTop: 36 }}>
        <LineReveal at={8}>Šišanje.</LineReveal>
        <LineReveal at={18}>Brijanje.</LineReveal>
        <LineReveal at={28}>
          <span style={{ color: color.dim }}>Termin</span>
        </LineReveal>
        <LineReveal at={34}>
          <span style={{ color: color.dim }}>u DM-u.</span>
        </LineReveal>
      </div>
    </AbsoluteFill>
  );
}

/* The capture is 780 px wide and 6400 tall; this is its height at the
   phone's screen width. */
const PHONE = { width: 600, height: 1180 };
const SCREEN_W = PHONE.width - 28;
const PAGE_H = (6400 / 780) * SCREEN_W;

function Site() {
  const frame = useCurrentFrame();
  const rise = useEntrance(4, 34);
  const scroll = interpolate(frame, [34, SITE], [0, 0.4], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: SAFE.top - 70 }}>
        <FadeUp at={2}>
          <Eyebrow>Novi sajt</Eyebrow>
        </FadeUp>
        <div style={{ ...caps, fontSize: 92, marginTop: 24 }}>
          <LineReveal at={6}>Sve na</LineReveal>
          <LineReveal at={12}>jednom mjestu.</LineReveal>
        </div>
        <FadeUp at={22} style={{ marginTop: 28 }}>
          <Eyebrow style={{ color: color.white }}>Cjenovnik · Termin · Mapa</Eyebrow>
        </FadeUp>
      </div>
      <Phone
        width={PHONE.width}
        height={PHONE.height}
        style={{ left: (WIDTH - PHONE.width) / 2, top: 700 + (1 - rise) * 420, transform: `rotate(${(1 - rise) * 6}deg)` }}
      >
        <Img
          src={staticFile("work/barber-drina-phone.avif")}
          style={{ width: "100%", transform: `translateY(${-scroll * (PAGE_H - (PHONE.height - 28))}px)` }}
        />
      </Phone>
    </AbsoluteFill>
  );
}
