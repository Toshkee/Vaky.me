/**
 * One icon system for the landing pages: 16×16, everything on a 2-unit grid,
 * `shape-rendering: crispEdges` so nothing anti-aliases the corners back into
 * curves. They replace a mix of unicode marks (✓ → + —) that never belonged
 * to the same family.
 *
 * Semantics are the caller's: every one of these is presentational unless it
 * is given a label, which is how the pricing table's checks stay readable to a
 * screen reader while the decorative ones on the cards stay silent.
 *
 * Render them at 16px. On a 16-unit grid that puts one unit on one CSS pixel;
 * at 14px each unit lands on 0.875px and crispEdges rounds the blocks
 * unevenly, which is what made the first pass look like a squiggle.
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

/** The "not included" mark in the comparison table. */
export function DashIcon(props: IconProps) {
  return <PixelGlyph {...props} d="M3 7h10v2H3z" />;
}

/** Instagram glyph — used by the mobile contact shortcut. */
export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
