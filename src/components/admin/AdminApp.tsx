"use client";

import { useCallback, useEffect, useState } from "react";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { SESSION_LOST, getMe, logout } from "@/lib/admin/client";
import type { ApiErrorCode } from "@/lib/onboarding/schema";
import { isLeadStatus, type LeadStatus } from "@/lib/workflow";
import { LeadDetail } from "./LeadDetail";
import { Leads } from "./Leads";
import { Login } from "./Login";
import { Overview } from "./Overview";
import { ProjectDetail } from "./ProjectDetail";
import { Projects } from "./Projects";
import { DataError, GoProvider, Loading, buttonClass } from "./ui";

/**
 * The dashboard, whole.
 *
 * Two things it owns and nothing else does: whether there is a session, and
 * which screen the query string is asking for.
 *
 * The routing is `window.location.search` plus `pushState`, not the framework
 * router. This route is a static export — `useSearchParams` would force the
 * page into a Suspense dance for a query string that is already in the
 * document — and the URL shape matters outside the browser: the submission
 * email links straight to `/admin/?v=projekat&id=…`, so that has to resolve on
 * a cold load.
 */

type Route =
  | { view: "overview" }
  | { view: "leads"; status: LeadStatus | null }
  | { view: "lead"; id: string }
  | { view: "projects"; filter: string }
  | { view: "project"; id: string };

function parseRoute(search: string): Route {
  const params = new URLSearchParams(search);
  const id = params.get("id") ?? "";

  switch (params.get("v")) {
    case "upiti": {
      if (id) return { view: "lead", id };
      const status = params.get("status");
      return { view: "leads", status: isLeadStatus(status) ? status : null };
    }
    case "projekti":
      return { view: "projects", filter: params.get("f") ?? "sve" };
    case "projekat":
      return id ? { view: "project", id } : { view: "projects", filter: "sve" };
    default:
      return { view: "overview" };
  }
}

const TITLES: Record<Route["view"], string> = {
  overview: "Pregled",
  leads: "Upiti",
  lead: "Upit",
  projects: "Projekti",
  project: "Projekat",
};

const NAV: readonly { to: string; label: string; views: readonly Route["view"][] }[] = [
  { to: "?v=pregled", label: "Pregled", views: ["overview"] },
  { to: "?v=upiti", label: "Upiti", views: ["leads", "lead"] },
  { to: "?v=projekti", label: "Projekti", views: ["projects", "project"] },
];

type Session =
  | { state: "checking" }
  | { state: "in" }
  | { state: "out" }
  | { state: "error"; code: ApiErrorCode };

export function AdminApp() {
  const [session, setSession] = useState<Session>({ state: "checking" });
  const [attempt, setAttempt] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let alive = true;
    void (async () => {
      const answer = await getMe();
      if (!alive) return;
      if (answer.ok) setSession({ state: "in" });
      else if (answer.code === "session") setSession({ state: "out" });
      else setSession({ state: "error", code: answer.code });
    })();
    return () => {
      alive = false;
    };
  }, [attempt]);

  /* Read once on mount — the deep link in a notification email arrives as a
     cold load — and again whenever the back button moves the history. */
  useEffect(() => {
    const read = () => setSearch(window.location.search);
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  /* Any 401, from any view, means the cookie is gone. Dropping straight back
     to the login screen beats leaving a dead screen behind. */
  useEffect(() => {
    const lost = () => setSession({ state: "out" });
    window.addEventListener(SESSION_LOST, lost);
    return () => window.removeEventListener(SESSION_LOST, lost);
  }, []);

  const go = useCallback((query: string) => {
    window.history.pushState(null, "", `${window.location.pathname}${query}`);
    setSearch(query);
    window.scrollTo({ top: 0 });
  }, []);

  async function signOut() {
    await logout();
    setSession({ state: "out" });
    go("?v=pregled");
  }

  if (session.state === "checking") {
    return (
      <main className="shell w-full flex-1 py-10">
        <Loading label="Provjeravam sesiju…" />
      </main>
    );
  }

  if (session.state === "error") {
    return (
      <main className="shell w-full flex-1 py-10">
        <DataError code={session.code} onRetry={() => setAttempt((value) => value + 1)} />
      </main>
    );
  }

  if (session.state === "out") {
    return <Login onIn={() => setSession({ state: "in" })} />;
  }

  const route = parseRoute(search);

  return (
    <GoProvider value={go}>
      <header className="border-b-2 border-ink bg-paper">
        <div className="shell flex h-14 items-center justify-between gap-3">
          <span className="px text-[1.35rem] leading-none tracking-wide uppercase">
            VibeLab Admin
          </span>
          <button type="button" onClick={() => void signOut()} className={buttonClass}>
            Odjava
          </button>
        </div>

        <nav aria-label="Dashboard" className="border-t-2 border-ink">
          <ul className="shell flex gap-1">
            {NAV.map((item) => {
              const active = item.views.includes(route.view);
              return (
                <li key={item.to}>
                  <a
                    href={item.to}
                    aria-current={active ? "page" : undefined}
                    onClick={(event) => {
                      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                      event.preventDefault();
                      go(item.to);
                    }}
                    className={`inline-flex min-h-11 items-center px-3 text-sm font-semibold transition-colors ${
                      active
                        ? "text-red underline decoration-red decoration-2 underline-offset-8"
                        : "hover:text-red"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <main className="shell w-full flex-1 py-6 sm:py-8">
        <PixelWindow title={TITLES[route.view]}>
          <div className="p-4 sm:p-6">
            {route.view === "overview" && <Overview />}
            {route.view === "leads" && <Leads status={route.status} />}
            {/* Keyed by id so moving between two records starts the detail
                screen clean instead of showing the previous one's form. */}
            {route.view === "lead" && <LeadDetail key={route.id} id={route.id} />}
            {route.view === "projects" && <Projects filter={route.filter} />}
            {route.view === "project" && <ProjectDetail key={route.id} id={route.id} />}
          </div>
        </PixelWindow>
      </main>
    </GoProvider>
  );
}
