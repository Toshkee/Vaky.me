/**
 * One icon system for the landing pages, in two densities:
 *
 *  - 16-grid glyphs (check, arrow, plus, dash) — inline marks that sit in
 *    running text and lists. Render at 16px: one unit per CSS pixel.
 *  - 12-grid pixel art, authored as character grids below — section markers,
 *    card illustrations and the VibeLab OS furniture. Render at multiples of
 *    12 (24px headers, 48px card art) so every cell lands on whole pixels.
 *
 * The grids are the source of truth: `#` is ink (currentColor), `R` is the
 * brand red, `W` is paper, `G` is the status green, `.` is transparent. Edit
 * the picture, not path data.
 *
 * Semantics are the caller's: everything is presentational unless it is given
 * a label, which is how the pricing checks stay readable to a screen reader
 * while the decorative ones stay silent.
 */

type IconProps = {
  className?: string;
  /** Supplying a label makes the glyph an image with an accessible name. */
  label?: string;
};

function PixelGlyph({ className, label, d }: IconProps & { d: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      shapeRendering="crispEdges"
      fill="currentColor"
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path d={d} />
    </svg>
  );
}

/* ── 16-grid inline glyphs ─────────────────────────────────────────────── */

/**
 * A staircase tick. Each step is a 2-wide, 4-tall column rather than a 2x2
 * block, so consecutive steps overlap by half and the diagonal reads as one
 * stroke — square blocks meeting only at their corners look like a dotted
 * line at 16px, which is how the first pass failed.
 */
export function CheckIcon(props: IconProps) {
  return (
    <PixelGlyph
      {...props}
      d="M2 5h2v4H2zM4 7h2v4H4zM6 9h2v4H6zM8 7h2v4H8zM10 5h2v4h-2zM12 3h2v4h-2zM14 1h2v4h-2z"
    />
  );
}

/** A shaft and a stepped chevron head, cut to the same stroke weight as the tick. */
export function ArrowIcon(props: IconProps) {
  return <PixelGlyph {...props} d="M1 7h9v2H1zM6 2h2v4H6zM8 4h2v4H8zM10 6h2v4h-2zM8 8h2v4H8zM6 10h2v4H6z" />;
}

/** The FAQ toggle — CSS rotates it 45° into a cross when the row opens. */
export function PlusIcon(props: IconProps) {
  return <PixelGlyph {...props} d="M7 3h2v10H7zM3 7h10v2H3z" />;
}

/* ── 12-grid pixel art ─────────────────────────────────────────────────── */

const PALETTE: Record<string, string> = {
  "#": "currentColor",
  R: "var(--color-red)",
  W: "var(--color-paper)",
  G: "var(--color-ok)",
  K: "var(--color-ink)",
};

function cellsToPath(rows: readonly string[], ch: string): string {
  let d = "";
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === ch) d += `M${x} ${y}h1v1H${x}z`;
    }
  });
  return d;
}

function PixelArt({
  rows,
  className,
  label,
}: IconProps & { rows: readonly string[] }) {
  const used = [...new Set(rows.join("").replace(/\./g, ""))];
  return (
    <svg
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      className={className}
      shapeRendering="crispEdges"
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {used.map((ch) => (
        <path key={ch} d={cellsToPath(rows, ch)} fill={PALETTE[ch]} />
      ))}
    </svg>
  );
}

/** Four-point sparkle — section marker and hero decoration. */
export function SparkleIcon(props: IconProps) {
  return (
    <PixelArt
      {...props}
      rows={[
        ".....##.....",
        ".....##.....",
        ".....##.....",
        "....####....",
        "...######...",
        ".##########.",
        ".##########.",
        "...######...",
        "....####....",
        ".....##.....",
        ".....##.....",
        ".....##.....",
      ]}
    />
  );
}

/** Folder — the Radovi section marker. */
export function FolderIcon(props: IconProps) {
  return (
    <PixelArt
      {...props}
      rows={[
        "............",
        ".#####......",
        ".#####......",
        ".##########.",
        ".##########.",
        ".##......##.",
        ".##......##.",
        ".##......##.",
        ".##......##.",
        ".##########.",
        ".##########.",
        "............",
      ]}
    />
  );
}

/** Euro sign — the pricing section marker and the "clear price" card. */
export function EuroIcon(props: IconProps) {
  return (
    <PixelArt
      {...props}
      rows={[
        "............",
        "....######..",
        "...##....##.",
        "...##.......",
        ".#######....",
        ".#######....",
        "...##.......",
        ".#######....",
        ".#######....",
        "...##.......",
        "...##....##.",
        "....######..",
      ]}
    />
  );
}

/** Flag on a pole — the process section marker. */
export function FlagIcon(props: IconProps) {
  return (
    <PixelArt
      {...props}
      rows={[
        ".##.........",
        ".##RRRRRRR..",
        ".##RRRRRRR..",
        ".##RRRRRRR..",
        ".##RRRRRR...",
        ".##RRRR.....",
        ".##.........",
        ".##.........",
        ".##.........",
        ".##.........",
        ".##.........",
        ".##.........",
      ]}
    />
  );
}

/** Question mark — the FAQ section marker. */
export function QuestionIcon(props: IconProps) {
  return (
    <PixelArt
      {...props}
      rows={[
        "...######...",
        "..##....##..",
        "..##....##..",
        "........##..",
        ".......##...",
        "......##....",
        ".....##.....",
        ".....##.....",
        "............",
        ".....##.....",
        ".....##.....",
        "............",
      ]}
    />
  );
}

/** Speech bubble with typing dots — "you reach out". */
export function BubbleIcon(props: IconProps) {
  return (
    <PixelArt
      {...props}
      rows={[
        "............",
        ".##########.",
        ".##########.",
        ".##########.",
        ".##.#.#.###.",
        ".##########.",
        ".##########.",
        ".##########.",
        "...####.....",
        "...###......",
        "...#........",
        "............",
      ]}
    />
  );
}

/** A sheet with ruled lines — the concept document. */
export function DocIcon(props: IconProps) {
  return (
    <PixelArt
      {...props}
      rows={[
        "..########..",
        "..########..",
        "..#......#..",
        "..#.####.#..",
        "..#......#..",
        "..#.####.#..",
        "..#......#..",
        "..#.####.#..",
        "..#......#..",
        "..#.##...#..",
        "..########..",
        "..########..",
      ]}
    />
  );
}

/** Hammer — "everything handled". A wrench was tried first and read as a
    trident at icon sizes; nothing misreads a hammer. */
export function HammerIcon(props: IconProps) {
  return (
    <PixelArt
      {...props}
      rows={[
        "..########..",
        "..########..",
        "..########..",
        "..##########",
        ".....##.....",
        ".....##.....",
        ".....##.....",
        ".....##.....",
        ".....##.....",
        ".....##.....",
        ".....##.....",
        ".....##.....",
      ]}
    />
  );
}

/** Rocket at launch — "your site is live". */
export function RocketIcon(props: IconProps) {
  return (
    <PixelArt
      {...props}
      rows={[
        ".....##.....",
        "....####....",
        "....####....",
        "...######...",
        "...##..##...",
        "...##..##...",
        "...######...",
        "...######...",
        ".##.####.##.",
        ".##.####.##.",
        "....RRRR....",
        ".....RR.....",
      ]}
    />
  );
}

/** Mouse pointer — hero decoration. */
export function CursorIcon(props: IconProps) {
  return (
    <PixelArt
      {...props}
      rows={[
        ".#..........",
        ".##.........",
        ".###........",
        ".####.......",
        ".#####......",
        ".######.....",
        ".#######....",
        ".########...",
        ".####.......",
        ".#.###......",
        "....###.....",
        "....###.....",
      ]}
    />
  );
}

/** The mug on the workstation desk, banded in the brand red. Art sits flush
    with the bottom edge of its box so the mug touches the desk it stands on. */
export function MugIcon(props: IconProps) {
  return (
    <PixelArt
      {...props}
      rows={[
        "............",
        "............",
        "............",
        "............",
        "............",
        ".#######....",
        ".#######.##.",
        ".#RRRRR#..#.",
        ".#######..#.",
        ".#######.##.",
        ".#######....",
        "..#####.....",
      ]}
    />
  );
}
