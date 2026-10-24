/**
 * The format every launch video is sold in: vertical 1080x1920 at 30 fps,
 * the size Reels, TikTok, Shorts and Stories all take without cropping.
 */
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;

/**
 * Where the platform's own UI sits on top of the video. The caption, the
 * account name and the progress bar cover the bottom, the like/comment/share
 * column covers the right edge, and the top carries the tabs. Anything a
 * viewer has to read stays inside these margins.
 */
export const SAFE = {
  top: 250,
  right: 168,
  bottom: 420,
  left: 96,
};
