"use client";

import Link from "next/link";
import { api } from "../_lib/api";
import { formatDateTime, shortId } from "../_lib/format";
import { useEvents, useMegaEvents, useSigs, useTeams } from "../_lib/queries";
import { useSession } from "../_lib/session";
import type { AuditLog } from "../_lib/types";
import { useResource } from "../_lib/use-resource";
import PageHeader from "../_ui/PageHeader";
import { ErrorState } from "../_ui/States";

function registrationStatus(open: string | null, close: string | null) {
  const now = Date.now();
  if (!open && !close) return "Registration dates not set";
  if (open && now < new Date(open).getTime()) return `Registration opens ${formatDateTime(open)}`;
  if (close && now > new Date(close).getTime()) return `Registration closed ${formatDateTime(close)}`;
  return close ? `Registration open until ${formatDateTime(close)}` : "Registration open";
}

export default function OverviewView() {
  const { user } = useSession();
  const megaEvents = useMegaEvents();
  const sigs = useSigs();
  const events = useEvents();
  const teams = useTeams();
  const recent = useResource("audit:recent", () =>
    api<{ data: AuditLog[] }>("/admin/audit-logs", { query: { limit: 6 } }).then((r) => r.data));

  const stats = [
    { label: "Mega events", value: megaEvents.data?.length, href: "/admin/mega-events" },
    { label: "SIGs", value: sigs.data?.length, href: "/admin/sigs" },
    { label: "Events", value: events.data?.length, href: "/admin/events" },
    { label: "Teams", value: teams.data?.length, href: "/admin/teams" },
  ];

  const setup = [
    { done: !!megaEvents.data?.length, label: "Create a mega event", href: "/admin/mega-events" },
    { done: !!sigs.data?.length, label: "Add the SIGs", href: "/admin/sigs" },
    { done: !!events.data?.length, label: "Create events and assign them to SIGs", href: "/admin/events" },
    { done: !!events.data?.length, label: "Add rounds to each event", href: "/admin/rounds" },
    { done: !!teams.data?.length, label: "Create teams and add participants", href: "/admin/teams" },
  ];
  const setupDone = setup.every((s) => s.done);
  const loadError = megaEvents.error ?? sigs.error ?? events.error ?? teams.error;

  return (
    <>
      <PageHeader title={`Hello, ${user.username}`} description="Everything about the mega event, managed from one place." />

      {loadError && <div className="mb-6"><ErrorState message={loadError} onRetry={() => { megaEvents.reload(); sigs.reload(); events.reload(); teams.reload(); }} /></div>}

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-zinc-200 bg-zinc-200 lg:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white px-5 py-4 transition-colors hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800/60">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{s.label}</p>
            <p className="mt-1 font-mono text-3xl font-semibold tabular-nums">
              {s.value ?? <span className="inline-block h-7 w-10 animate-pulse rounded bg-zinc-200 align-middle motion-reduce:animate-none dark:bg-zinc-800" aria-label="Loading" />}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <section>
          <h2 className="mb-3 text-sm font-semibold">{setupDone ? "Mega events" : "Setup checklist"}</h2>
          {setupDone ? (
            <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
              {megaEvents.data?.map((m) => (
                <li key={m.id} className="px-4 py-3">
                  <p className="font-medium">{m.name}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{registrationStatus(m.registrationOpenAt, m.registrationCloseAt)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <ol className="flex flex-col gap-2">
              {setup.map((s, i) => (
                <li key={s.label}>
                  <Link href={s.href} className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
                    <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${s.done ? "bg-emerald-600 text-white" : "border border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"}`}>
                      {s.done ? "✓" : i + 1}
                    </span>
                    <span className={s.done ? "text-zinc-500 line-through dark:text-zinc-500" : ""}>{s.label}</span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </section>

        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-sm font-semibold">Recent activity</h2>
            <Link href="/admin/audit-logs" className="text-sm text-blue-800 hover:underline dark:text-blue-400">All audit logs</Link>
          </div>
          {recent.error ? (
            <ErrorState message={recent.error} onRetry={recent.reload} />
          ) : !recent.data ? (
            <div className="h-48 animate-pulse rounded-lg border border-zinc-200 bg-white motion-reduce:animate-none dark:border-zinc-800 dark:bg-zinc-900" aria-label="Loading" />
          ) : !recent.data.length ? (
            <p className="rounded-lg border border-dashed border-zinc-300 px-4 py-8 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">No changes recorded yet.</p>
          ) : (
            <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
              {recent.data.map((log) => (
                <li key={log.id} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                  <span>
                    <span className="font-medium">{log.action}</span> {log.entityType}
                    {log.entityId && <span className="ml-1 font-mono text-xs text-zinc-600 dark:text-zinc-400">{shortId(log.entityId)}</span>}
                  </span>
                  <span className="shrink-0 text-zinc-600 dark:text-zinc-400">{formatDateTime(log.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
