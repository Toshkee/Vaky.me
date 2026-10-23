import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { PORTFOLIO_FILM } from "../specs";
import { C, FONT, FadeUp, glide, typed } from "../kit";
import { FilmPlayer, type FilmControls } from "../FilmPlayer";

/**
 * pavletosic.com, the portfolio behind the person behind Vaky: a browser
 * opens it, a pointer goes to its "Ask me anything" field and types a
 * question, and stops at the send button.
 *
 * It never shows an answer. The portfolio is an AI chat, and an answer drawn
 * here would be words put in its mouth; what the film shows is only what any
 * visitor sees before they press send. The screen underneath is a capture of
 * the live site (scripts/capture-portfolio.mjs).
 */
export type PortfolioFilmProps = {
  url: string;
  question: string;
  label: string;
};

const BAR = 80;
const SCREEN = { width: 1280, height: 800 };
/* The "Ask me anything" field on the capture, as measured by the capture
   script, in CSS pixels of the 1280 × 800 screen. */
const PORTFOLIO_INPUT = { x: 0.3 * 1280, y: 0.6188 * 800, width: 0.4 * 1280, height: 0.0725 * 800 };
const FIELD = {
  textX: PORTFOLIO_INPUT.x + 26,
  midY: BAR + PORTFOLIO_INPUT.y + PORTFOLIO_INPUT.height / 2,
  sendX: PORTFOLIO_INPUT.x + PORTFOLIO_INPUT.width - 31,
};
const END = PORTFOLIO_FILM.durationInFrames;

export function PortfolioFilm({ url, question, label }: PortfolioFilmProps) {
  const frame = useCurrentFrame();
  const open = glide(frame, [0, 16], [0, 1]);
  const page = glide(frame, [30, 50], [0, 1]);
  const close = glide(frame, [END - 18, END], [0, 1]);

  /* The pointer: in from the lower right, to the field, then to send. */
  const toField = glide(frame, [58, 82], [0, 1]);
  const toSend = glide(frame, [142, 166], [0, 1]);
  const px = interpolate(toField, [0, 1], [1100, FIELD.textX + 40]) + toSend * (FIELD.sendX - FIELD.textX - 40);
  const py = interpolate(toField, [0, 1], [860, FIELD.midY + 6]);
  const click = frame >= 82 && frame < 100 ? (frame - 82) / 18 : null;
  const asking = typed(question, frame, 88, 2.4);

  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: open * (1 - close),
          transform: `scale(${0.97 + open * 0.03})`,
          background: C.white,
        }}
      >
        <div
          style={{
            height: BAR,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: C.paper2,
            borderBottom: `2px solid ${C.line}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              width: 560,
              height: 48,
              padding: "0 22px",
              borderRadius: 999,
              background: C.paper,
              color: C.ink,
              fontSize: 24,
              fontWeight: 500,
            }}
          >
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: C.ok, flex: "none" }} />
            {typed(url, frame, 8, 1.4)}
          </div>
        </div>

        <div style={{ position: "absolute", top: BAR, left: 0, width: SCREEN.width, height: SCREEN.height, opacity: page, transform: `translateY(${(1 - page) * 24}px)` }}>
          <Img src={staticFile("work/pavletosic-com.avif")} style={{ width: "100%", display: "block" }} />
        </div>

        {/* The question, typed over the placeholder */}
        {frame >= 86 && (
          <div
            style={{
              position: "absolute",
              left: PORTFOLIO_INPUT.x + 14,
              top: BAR + PORTFOLIO_INPUT.y + 12,
              width: PORTFOLIO_INPUT.width - 80,
              height: PORTFOLIO_INPUT.height - 24,
              display: "flex",
              alignItems: "center",
              paddingLeft: 12,
              background: C.white,
              color: "#111111",
              fontFamily: "Inter, -apple-system, system-ui, sans-serif",
              fontSize: 19,
            }}
          >
            {asking}
            <span style={{ width: 2, height: 22, marginLeft: 1, background: "#111111", opacity: frame % 20 < 11 ? 1 : 0 }} />
          </div>
        )}
      </div>

      {click !== null && (
        <div
          style={{
            position: "absolute",
            left: px - 28,
            top: py - 34,
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: `4px solid ${C.sun}`,
            opacity: 1 - click,
            transform: `scale(${0.4 + click})`,
          }}
        />
      )}
      {frame >= 58 && frame < END - 16 && <Pointer x={px} y={py} />}

      {frame >= 176 && (
        <FadeUp at={178} out={END - 22} style={{ position: "absolute", left: 40, bottom: 40 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              padding: "16px 26px",
              borderRadius: 999,
              background: C.ink,
              color: C.paper,
              fontSize: 30,
              fontWeight: 600,
            }}
          >
            <span style={{ width: 16, height: 16, borderRadius: "50%", background: C.sun }} />
            {label}
          </div>
        </FadeUp>
      )}
    </AbsoluteFill>
  );
}

function Pointer({ x, y }: { x: number; y: number }) {
  return (
    <svg width={34} height={44} viewBox="0 0 17 22" style={{ position: "absolute", left: x - 4, top: y - 4 }}>
      <path d="M1 1v16.5l4.2-4.1 2.9 6.6 2.8-1.2-2.9-6.5H14Z" fill={C.ink} stroke={C.white} strokeWidth={1.4} strokeLinejoin="round" />
    </svg>
  );
}

export function PortfolioPlayer(props: FilmControls & { inputProps: PortfolioFilmProps }) {
  return <FilmPlayer spec={PORTFOLIO_FILM} component={PortfolioFilm} {...props} />;
}
