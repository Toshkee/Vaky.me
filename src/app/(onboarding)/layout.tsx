import type { Metadata } from "next";
import type { ReactNode } from "react";
import { onboardingCopy } from "@/i18n/onboarding";
import { RootHtml, sharedMetadata } from "../root-html";
import "../globals.css";

export { viewport } from "../root-html";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: onboardingCopy.me.meta.title,
  description: onboardingCopy.me.meta.description,
  robots: { index: false, follow: false },
};

/**
 * A root layout of its own, for one reason: no analytics.
 *
 * The form under it is served at /start/{token}/, and the token — the
 * client's only credential — sits in the address bar. Umami reports
 * `location.pathname` with every page view and every event, so the tracker
 * that is harmless on the marketing pages would hand that token to a third
 * party here. This shell simply never loads it. The `onboarding_*` events in
 * src/lib/analytics.ts no-op without the script, which is the intended
 * trade: a funnel count is not worth a credential.
 *
 * Everything else matches the (me) layout: same chrome, same language, so a
 * client sees no seam between /start/ and the form behind their link.
 */
export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <RootHtml lang="sr-ME" analytics={false}>
      {children}
    </RootHtml>
  );
}
