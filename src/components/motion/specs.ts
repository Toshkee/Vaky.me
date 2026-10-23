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

export const HERO_FILM: FilmSpec = { width: 1080, height: 1200, fps: 30, durationInFrames: 420, still: 120 };

/** Four scenes of `PROCESS_SCENE` frames, one per step of the list beside it. */
export const PROCESS_SCENE = 90;
export const PROCESS_FILM: FilmSpec = {
  width: 1000,
  height: 1000,
  fps: 30,
  durationInFrames: PROCESS_SCENE * 4,
  still: PROCESS_SCENE * 4 - 1,
};

/** Vertical, the format the motion design videos are sold in. */
export const REEL_FILM: FilmSpec = { width: 1080, height: 1920, fps: 30, durationInFrames: 240, still: 150 };

export const PORTFOLIO_FILM: FilmSpec = { width: 1280, height: 880, fps: 30, durationInFrames: 270, still: 160 };
