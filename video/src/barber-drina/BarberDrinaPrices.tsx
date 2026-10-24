import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { SAFE } from "../format";
import { FadeUp, LineReveal, useEntrance } from "../motion";
import { color, font, prices } from "./brand";
import { CUT, EndCard, Eyebrow, Stripes, caps, clamp } from "./parts";

/**
 * The price list, as a post: the shop's own prices written up one row at a
 * time, each joined to its price by a dotted leader that draws itself while
 * the figure counts up to what the shop charges.
 */
const LIST = 255;
export const BARBER_DRINA_PRICES_FRAMES = 330;

export function BarberDrinaPrices() {
  return (
    <AbsoluteFill style={{ background: color.black, fontFamily: font, color: color.white }}>
      <Sequence durationInFrames={LIST}>
        <PriceList />
      </Sequence>
      <Sequence from={LIST}>
        <EndCard cta="Termin u DM-u" />
      </Sequence>
      <Stripes at={LIST - CUT / 2} />
    </AbsoluteFill>
  );
}

function PriceList() {
  return (
    <AbsoluteFill style={{ padding: `${SAFE.top}px ${SAFE.right}px 0 ${SAFE.left}px` }}>
      <FadeUp at={2}>
        <Eyebrow>Barber Drina · Stari Aerodrom</Eyebrow>
      </FadeUp>
      <div style={{ ...caps, fontSize: 140, marginTop: 28 }}>
        <LineReveal at={6}>Cjenovnik</LineReveal>
      </div>
      <div style={{ marginTop: 90, borderTop: `3px solid ${color.white}` }}>
        {prices.map((row, i) => (
          <Row key={row.name} at={30 + i * 14} name={row.name} euros={row.euros} />
        ))}
      </div>
      <FadeUp at={130} style={{ marginTop: 56 }}>
        <Eyebrow style={{ color: color.white }}>Zakaži porukom na Instagramu →</Eyebrow>
      </FadeUp>
    </AbsoluteFill>
  );
}

function Row({ at, name, euros }: { at: number; name: string; euros: number }) {
  const frame = useCurrentFrame();
  const show = useEntrance(at, 20);
  const leader = useEntrance(at + 4, 30);
  const figure = Math.round(interpolate(frame, [at + 6, at + 34], [0, euros], clamp));
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 22,
        padding: "34px 0",
        borderBottom: `2px solid ${color.line}`,
        opacity: show,
        transform: `translateY(${(1 - show) * 30}px)`,
      }}
    >
      <span style={{ fontSize: 46, fontWeight: 600, whiteSpace: "nowrap" }}>{name}</span>
      <span
        style={{
          flex: 1,
          borderBottom: `4px dotted ${color.dim}`,
          transform: `scaleX(${leader})`,
          transformOrigin: "left center",
        }}
      />
      <span style={{ ...caps, fontSize: 76, fontVariantNumeric: "tabular-nums" }}>{figure} €</span>
    </div>
  );
}
