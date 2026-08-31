import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vercel build output — generated, never ours to lint.
    ".vercel/**",
    // Wrangler's local state and its bundled copies of the Functions: build
    // output and a local D1/R2 store, none of it written by hand.
    ".wrangler/**",
    // Scratch: screenshots and one-off probes, not part of the site.
    ".tmp/**",
  ]),
]);

export default eslintConfig;
