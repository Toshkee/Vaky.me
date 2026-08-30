/* Widths written by `node scripts/demo-photos.mjs`. A variant is only written
   when the source is at least that wide, so the srcset is filtered the same
   way here — asking for a file the script skipped would be a 404 per card. */
const WIDTHS = [480, 768, 1200];

/**
 * One photograph on an outreach concept page.
 *
 * A plain `<picture>` rather than `next/image`: the site exports with
 * `images.unoptimized`, so next/image would hand a phone the same full-width
 * JPG a desktop gets. This picks the AVIF/WebP variant that fits the box and
 * falls back to the committed JPG.
 *
 * `src` is the path without an extension — "/demo/kraftart/orah".
 * `width`/`height` are the JPG's real pixels, so the browser reserves the
 * right box before the file lands and the page never shifts.
 */
export function DemoPhoto({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Rendered width per breakpoint — wrong values here cost bytes, not layout. */
  sizes: string;
  /** Only the one image above the fold on each page. */
  priority?: boolean;
  className?: string;
}) {
  const srcSet = (format: "avif" | "webp") =>
    WIDTHS.filter((candidate) => candidate <= width)
      .map((candidate) => `${src}-${candidate}.${format} ${candidate}w`)
      .join(", ");

  return (
    // `display: block` — a <picture> defaults to inline like its <img>, so
    // without this every consumer keeps a descender-tall gap under the frame
    // (visible whenever the wrapper's height comes from content rather than a
    // route's own `position: absolute` override on this element).
    <picture className="block">
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`${src}.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        className={className}
      />
    </picture>
  );
}
