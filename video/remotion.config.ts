import { Config } from "@remotion/cli/config";

/* The videos are made from the site's own photos and captures, so they read
   them straight out of the site's public folder instead of keeping copies
   that would drift. The rendered files go back into it too (public/video). */
Config.setPublicDir("../public");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
