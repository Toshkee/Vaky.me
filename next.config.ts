import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  /* Lets src/app/global-not-found.tsx own the whole 404 document. Without it
     a root not-found.tsx is wrapped in Next's own bare <html>, and the one
     the page renders nests inside it — which hydrates with a mismatch. */
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
