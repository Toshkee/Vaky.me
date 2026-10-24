import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SAFE, WIDTH } from "../format";
import { useEntrance } from "../motion";
import { color, font, handle } from "./brand";
import { CUT, EndCard, Eyebrow, Phone, Stripes, caps, clamp } from "./parts";

/**
 * Booking without a phone call, the way the concept's site does it: pick the
 * service, the site writes the message, one tap opens the shop's DM with it.
 * The message is the site's own template, word for word; the conversation
 * stops at "sent" — nothing is put in the shop's mouth.
 */
const SCENE = 300;
export const BARBER_DRINA_BOOKING_FRAMES = 375;

const OPTIONS = ["Klasično šišanje — 10,00 €", "Fade šišanje — 12,00 €", "Šišanje i sređivanje brade — 15,00 €"];
const MESSAGE = "Zdravo, želio bih da zakažem termin za: Fade šišanje. Koji termini su slobodni?";
/** When each step begins: pick, write, sent. */
const STEP = { pick: 0, write: 110, sent: 228 };

export function BarberDrinaBooking() {
  return (
    <AbsoluteFill style={{ background: color.black, fontFamily: font, color: color.white }}>
      <Sequence durationInFrames={SCENE}>
        <Booking />
      </Sequence>
      <Sequence from={SCENE}>
        <EndCard cta="Zakaži u DM-u" />
      </Sequence>
      <Stripes at={SCENE - CUT / 2} />
    </AbsoluteFill>
  );
}

/** "Izaberi. Pošalji. Gotovo." — the step on screen lit, the others dim. */
function Steps() {
  const frame = useCurrentFrame();
  const words = ["Izaberi.", "Pošalji.", "Gotovo."];
  const starts = [STEP.pick, STEP.write, STEP.sent];
  return (
    <div style={{ position: "absolute", left: SAFE.left, right: SAFE.right, top: SAFE.top - 80 }}>
      <Eyebrow>Termin bez poziva</Eyebrow>
      <div style={{ ...caps, fontSize: 108, marginTop: 22 }}>
        {words.map((word, i) => {
          const on = interpolate(frame, [starts[i], starts[i] + 10], [0, 1], clamp) *
            (i < 2 ? interpolate(frame, [starts[i + 1], starts[i + 1] + 10], [1, 0], clamp) : 1);
          return (
            <div key={word} style={{ color: `rgba(255,255,255,${0.28 + on * 0.72})` }}>
              {word}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const PHONE = { width: 660, height: 1150 };

function Booking() {
  const frame = useCurrentFrame();
  const rise = useEntrance(2, 30);
  /* The booking screen slides out to the left as the DM slides in. */
  const swap = interpolate(frame, [STEP.sent, STEP.sent + 22], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const inner = PHONE.width - 28;
  return (
    <AbsoluteFill>
      <Steps />
      <Phone
        width={PHONE.width}
        height={PHONE.height}
        style={{ left: (WIDTH - PHONE.width) / 2, top: 700 + (1 - rise) * 420 }}
      >
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${-swap * inner}px)` }}>
          <Planner />
        </div>
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${(1 - swap) * inner}px)` }}>
          <Chat />
        </div>
      </Phone>
    </AbsoluteFill>
  );
}

/** The site's booking helper: the service picker and the message it writes. */
function Planner() {
  const frame = useCurrentFrame();
  const open = interpolate(frame, [30, 38, 62, 68], [0, 1, 1, 0], clamp);
  const picked = frame >= 52 ? 1 : 0;
  const value = frame >= 64 ? OPTIONS[1] : OPTIONS[0];
  const typed = Math.round(interpolate(frame, [STEP.write, STEP.write + 80], [0, MESSAGE.length], clamp));
  const press = interpolate(frame, [204, 210, 218], [1, 0.95, 1], clamp);
  const ring = interpolate(frame, [206, 226], [0, 1], clamp);
  const label = { fontSize: 22, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: color.dim };
  return (
    <div style={{ padding: "64px 40px", fontSize: 30 }}>
      <div style={label}>Izaberi uslugu</div>
      <div style={{ position: "relative", marginTop: 18 }}>
        <div style={{ border: `2px solid ${color.dim}`, padding: "26px 24px", fontSize: 30 }}>{value}</div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "100%",
            background: "#111",
            border: `2px solid ${color.dim}`,
            borderTop: "none",
            opacity: open,
            transform: `translateY(${(1 - open) * -12}px)`,
          }}
        >
          {OPTIONS.map((option, i) => (
            <div
              key={option}
              style={{
                padding: "22px 24px",
                fontSize: 28,
                background: i === picked ? color.white : "transparent",
                color: i === picked ? color.black : color.white,
              }}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 20, fontSize: 24, color: color.dim }}>
        Cijena po zvaničnom cjenovniku: <span style={{ color: color.white }}>{frame >= 64 ? "12,00 €" : "10,00 €"}</span>
      </div>

      <div style={{ marginTop: 56, paddingTop: 40, borderTop: `2px solid ${color.line}` }}>
        <div style={label}>Pošalji poruku</div>
        <div style={{ marginTop: 18, minHeight: 210, fontSize: 34, lineHeight: 1.4 }}>
          {typed > 0 ? `“${MESSAGE.slice(0, typed)}${typed < MESSAGE.length ? "" : "”"}` : ""}
        </div>
        <div
          style={{
            position: "relative",
            marginTop: 30,
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: color.white,
            color: color.black,
            fontSize: 30,
            fontWeight: 800,
            transform: `scale(${press})`,
            opacity: interpolate(frame, [STEP.write + 70, STEP.write + 84], [0.35, 1], clamp),
          }}
        >
          Otvori Instagram DM
          <span
            style={{
              position: "absolute",
              width: 900,
              height: 900,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.12)",
              transform: `scale(${ring})`,
              opacity: 1 - ring,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/** The DM the button opens, with the message sent. */
function Chat() {
  const frame = useCurrentFrame();
  const bubble = useEntrance(STEP.sent + 18, 22);
  const sent = interpolate(frame, [STEP.sent + 34, STEP.sent + 44], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "56px 36px 28px", borderBottom: `2px solid ${color.line}` }}>
        <div style={{ width: 76, height: 76, borderRadius: "50%", overflow: "hidden", border: `2px solid ${color.line}` }}>
          <Img src={staticFile("barber-drina-logo.jpg")} style={{ width: "220%", marginLeft: "-15%", marginTop: "-60%" }} />
        </div>
        <div style={{ fontSize: 32, fontWeight: 800 }}>{handle.slice(1)}</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 32px 120px" }}>
        <div
          style={{
            alignSelf: "flex-end",
            maxWidth: "82%",
            padding: "26px 30px",
            borderRadius: 40,
            borderBottomRightRadius: 10,
            background: color.white,
            color: color.black,
            fontSize: 30,
            lineHeight: 1.35,
            opacity: bubble,
            transform: `translateY(${(1 - bubble) * 60}px)`,
          }}
        >
          {MESSAGE}
        </div>
        <div style={{ alignSelf: "flex-end", marginTop: 14, fontSize: 22, color: color.dim, opacity: sent }}>Poslato</div>
      </div>
    </div>
  );
}
