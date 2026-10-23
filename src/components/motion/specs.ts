/**
 * The size, speed and length of every film, apart from the films themselves.
 *
 * The page needs these before Remotion has loaded — to reserve the film's box
 * so nothing shifts when it arrives — and this module imports nothing, so
 * reading it costs the first paint nothing. `still` is the frame a film rests
 * on when the visitor has asked for less motion: the moment that tells the
 * story on its own.
 */
export type FilmSpec = {
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  still: number;
};

/** Four shots of real work, 120 frames each. */
export const SHOWREEL_FILM: FilmSpec = { width: 1920, height: 1080, fps: 30, durationInFrames: 480, still: 70 };

/** The expertise cards: a site being built, the app being used. */
export const SITE_FILM: FilmSpec = { width: 1000, height: 1000, fps: 30, durationInFrames: 240, still: 170 };
export const APP_FILM: FilmSpec = { width: 1000, height: 1000, fps: 30, durationInFrames: 270, still: 40 };

/** Vertical, the format the motion design videos are sold in. */
export const REEL_FILM: FilmSpec = { width: 1080, height: 1920, fps: 30, durationInFrames: 240, still: 150 };

export const PORTFOLIO_FILM: FilmSpec = { width: 1280, height: 880, fps: 30, durationInFrames: 270, still: 160 };
