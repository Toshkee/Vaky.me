"use client";

import { useSyncExternalStore } from "react";
import { onboardingCopy } from "@/i18n/onboarding";
import type { Language, PackageId } from "@/lib/onboarding/schema";
import { Checking } from "./Checking";
import { Onboarding } from "./Onboarding";
import { Shell } from "./Shell";

/**
 * Reads the token out of the address bar.
 *
 * The site is a static export, so `/start/{token}/` has no page of its own —
 * `functions/start/[token].ts` answers it with this shell, and the URL the
 * browser is sitting on is the only place the token exists. It cannot be read
 * during the server build (there is no request) and it must not be read during
 * the first render either, or the markup React hydrates would not match the
 * markup it built. So there is always one paint before the form.
 *
 * That paint used to be nothing at all — a white screen for as long as the
 * bundle took to arrive, on the one route a client is sent to by name after
 * the work has already been agreed. It is now the same "checking your link"
 * frame the form shows a moment later while it calls the API, so the wait
 * looks like a wait rather than like a broken link. Montenegrin, because the
 * language has not been chosen yet and this route leads in Montenegrin.
 *
 * A path with no token — somebody who found `/start/form/` directly — yields
 * an empty string, which `Onboarding` treats as a link that does not work.
 */

function tokenFromPath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  const candidate = parts[1] ?? "";
  return candidate === "form" ? "" : candidate;
}

/* The address bar is an external store that never changes while this page is
   open: one client, one link, no client-side navigation. Subscribing is
   therefore a no-op, and the only thing that matters is that the build has a
   different answer (`null`) from the browser. */
const subscribe = () => () => {};
const readPath = () => window.location.pathname;
const noPath = () => null;

export function OnboardingRoute({
  packageNames,
}: {
  packageNames: Record<Language, Record<PackageId, string>>;
}) {
  const pathname = useSyncExternalStore(subscribe, readPath, noPath);

  if (pathname === null) {
    const copy = onboardingCopy.me;
    return (
      <Shell copy={copy} onLanguage={() => {}} showDraftNote={false}>
        <Checking copy={copy} message={copy.privateLink.checking} />
      </Shell>
    );
  }

  return <Onboarding token={tokenFromPath(pathname)} packageNames={packageNames} />;
}
