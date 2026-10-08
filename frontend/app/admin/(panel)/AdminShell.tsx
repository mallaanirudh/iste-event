"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ApiError, api, errorMessage, UNAUTHORIZED_EVENT } from "../_lib/api";
import { SessionContext } from "../_lib/session";
import type { User } from "../_lib/types";
import Button from "../_ui/Button";

const NAV = [
  { href: "/admin", label: "Overview" },
  { section: "Structure" },
  { href: "/admin/mega-events", label: "Mega Events" },
  { href: "/admin/sigs", label: "SIGs" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/rounds", label: "Rounds" },
  { section: "Competition" },
  { href: "/admin/teams", label: "Teams" },
  { href: "/admin/leaderboards", label: "Leaderboards" },
  { section: "Records" },
  { href: "/admin/registrations", label: "Registrations" },
  { href: "/admin/audit-logs", label: "Audit Logs" },
] as const;

type Gate = { state: "checking" } | { state: "ok"; user: User } | { state: "denied"; user: User } | { state: "error"; message: string };

export default function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [gate, setGate] = useState<Gate>({ state: "checking" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const toLogin = useCallback(() => {
    router.replace(`/admin/login?next=${encodeURIComponent(window.location.pathname + window.location.search)}`);
  }, [router]);

  useEffect(() => {
    let cancelled = false;
    api<{ user: User }>("/auth/me").then(
      ({ user }) => { if (!cancelled) setGate(user.role === "admin" ? { state: "ok", user } : { state: "denied", user }); },
      (e) => {
        if (cancelled) return;
        if (e instanceof ApiError && e.status === 401) toLogin();
        else setGate({ state: "error", message: errorMessage(e) });
      },
    );
    return () => { cancelled = true; };
  }, [toLogin, attempt]);

  useEffect(() => {
    window.addEventListener(UNAUTHORIZED_EVENT, toLogin);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, toLogin);
  }, [toLogin]);

  const logout = useCallback(async () => {
    await api("/auth/logout", { method: "POST" }).catch(() => {});
    router.replace("/admin/login");
  }, [router]);

  if (gate.state === "checking") {
    return (
      <div className="flex flex-1 items-center justify-center" aria-busy="true">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Checking your session…</p>
      </div>
    );
  }
  if (gate.state === "error") {
    return (
      <div className="mx-auto mt-24 max-w-md px-4 text-center">
        <h1 className="text-lg font-semibold">Can&apos;t reach the server</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{gate.message}</p>
        <Button className="mt-5" onClick={() => { setGate({ state: "checking" }); setAttempt((n) => n + 1); }}>Try again</Button>
      </div>
    );
  }
  if (gate.state === "denied") {
    return (
      <div className="mx-auto mt-24 max-w-md px-4 text-center">
        <h1 className="text-lg font-semibold">Admin access required</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          You&apos;re signed in as <strong>{gate.user.username}</strong>, which is a participant account.
        </p>
        <Button className="mt-5" variant="secondary" onClick={logout}>Sign out</Button>
      </div>
    );
  }

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  const nav = (
    <nav aria-label="Admin" className="flex flex-col gap-0.5">
      {NAV.map((item) =>
        "section" in item ? (
          <p key={item.section} className="mt-5 mb-1 px-3 text-xs font-medium text-zinc-500 first:mt-0 dark:text-zinc-500">{item.section}</p>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={`rounded-md px-3 py-2 text-sm transition-colors ${
              isActive(item.href)
                ? "bg-blue-50 font-medium text-blue-900 dark:bg-blue-950/60 dark:text-blue-200"
                : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            }`}
          >
            {item.label}
          </Link>
        ),
      )}
    </nav>
  );

  return (
    <SessionContext.Provider value={{ user: gate.user, logout }}>
      <div className="flex flex-1">
        <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-zinc-200 bg-white px-3 py-5 lg:flex dark:border-zinc-800 dark:bg-zinc-900">
          <Link href="/admin" className="mb-6 px-3">
            <span className="block text-xs font-medium text-blue-800 dark:text-blue-400">ISTE Mega Event</span>
            <span className="block text-base font-semibold">Admin</span>
          </Link>
          <div className="flex-1 overflow-y-auto">{nav}</div>
          <div className="mt-4 border-t border-zinc-200 px-3 pt-4 dark:border-zinc-800">
            <p className="truncate text-sm font-medium">{gate.user.username}</p>
            <button type="button" onClick={logout} className="mt-1 text-sm text-zinc-600 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100">
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-4 lg:hidden dark:border-zinc-800 dark:bg-zinc-900">
            <Link href="/admin" className="text-sm font-semibold">ISTE Admin</Link>
            <Button variant="secondary" size="sm" onClick={() => setMenuOpen((o) => !o)} aria-expanded={menuOpen} aria-controls="mobile-nav">
              {menuOpen ? "Close" : "Menu"}
            </Button>
          </header>
          {menuOpen && (
            <div id="mobile-nav" className="border-b border-zinc-200 bg-white px-3 py-4 lg:hidden dark:border-zinc-800 dark:bg-zinc-900">
              {nav}
              <div className="mt-4 flex items-center justify-between border-t border-zinc-200 px-3 pt-4 dark:border-zinc-800">
                <span className="truncate text-sm font-medium">{gate.user.username}</span>
                <Button variant="ghost" size="sm" onClick={logout}>Sign out</Button>
              </div>
            </div>
          )}
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-10">{children}</main>
        </div>
      </div>
    </SessionContext.Provider>
  );
}
