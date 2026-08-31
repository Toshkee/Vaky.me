import type { Metadata } from "next";
import { AdminApp } from "@/components/admin/AdminApp";

/**
 * VibeLab's own screen: leads, projects, onboarding links and build briefs.
 *
 * The page ships no data. Everything on it arrives from /api/admin against the
 * session cookie, so a stranger who loads this route gets a password field and
 * nothing else. `noindex` because there is no reason for a login screen to be
 * in a search result, and one more reason not to advertise where it is.
 */
export const metadata: Metadata = {
  title: "VibeLab Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <>
      <noscript>
        <div className="shell py-10">
          <div className="border-2 border-ink bg-paper-2 p-5">
            <p className="leading-relaxed">
              Dashboard je aplikacija i bez JavaScripta ne može da se učita. Uključi JavaScript pa
              osvježi stranicu.
            </p>
          </div>
        </div>
      </noscript>

      <AdminApp />
    </>
  );
}
