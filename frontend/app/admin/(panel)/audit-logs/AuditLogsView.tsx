"use client";

import { Fragment, useState, type FormEvent } from "react";
import { api } from "../../_lib/api";
import { formatDateTime, shortId } from "../../_lib/format";
import type { AuditLog } from "../../_lib/types";
import { useResource } from "../../_lib/use-resource";
import Button from "../../_ui/Button";
import { Field, Input } from "../../_ui/Field";
import PageHeader from "../../_ui/PageHeader";
import { EmptyState, ErrorState, TableSkeleton } from "../../_ui/States";
import { Table, Td, Th } from "../../_ui/Table";

const LIMIT = 50;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
type Filters = { action: string; entityType: string; entityId: string; actorId: string };
const EMPTY: Filters = { action: "", entityType: "", entityId: "", actorId: "" };

const ACTION_TONE: Record<string, string> = {
  CREATE: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  UPDATE: "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  DELETE: "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200",
};

function changedKeys(oldData: unknown, newData: unknown) {
  const o = (oldData && typeof oldData === "object" ? oldData : {}) as Record<string, unknown>;
  const n = (newData && typeof newData === "object" ? newData : {}) as Record<string, unknown>;
  return new Set([...Object.keys(o), ...Object.keys(n)].filter((k) => JSON.stringify(o[k]) !== JSON.stringify(n[k])));
}

function DataBlock({ label, data, highlight }: { label: string; data: unknown; highlight: Set<string> }) {
  if (data == null) return (
    <div><p className="mb-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">{label}</p><p className="text-sm text-zinc-500">None</p></div>
  );
  const entries = typeof data === "object" && !Array.isArray(data) ? Object.entries(data as Record<string, unknown>) : null;
  return (
    <div className="min-w-0">
      <p className="mb-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">{label}</p>
      {entries ? (
        <dl className="rounded-md border border-zinc-200 bg-white text-xs dark:border-zinc-800 dark:bg-zinc-950">
          {entries.map(([k, v]) => (
            <div key={k} className={`grid grid-cols-[9rem_1fr] gap-2 px-3 py-1.5 ${highlight.has(k) ? "bg-amber-50 dark:bg-amber-950/40" : ""}`}>
              <dt className="truncate font-mono text-zinc-600 dark:text-zinc-400">{k}</dt>
              <dd className="font-mono break-all">{typeof v === "string" ? v : JSON.stringify(v)}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-white p-3 text-xs dark:border-zinc-800 dark:bg-zinc-950">{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

export default function AuditLogsView() {
  const [draft, setDraft] = useState<Filters>(EMPTY);
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [errors, setErrors] = useState<Partial<Filters>>({});
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);

  const logs = useResource(`audit:${page}:${JSON.stringify(filters)}`, () =>
    api<{ page: number; limit: number; data: AuditLog[] }>("/admin/audit-logs", {
      query: { page, limit: LIMIT, action: filters.action.toUpperCase(), entityType: filters.entityType, entityId: filters.entityId, actorId: filters.actorId },
    }));

  const apply = (e: FormEvent) => {
    e.preventDefault();
    const errs: Partial<Filters> = {};
    if (draft.entityId && !UUID.test(draft.entityId.trim())) errs.entityId = "Must be a full UUID.";
    if (draft.actorId && !UUID.test(draft.actorId.trim())) errs.actorId = "Must be a full UUID.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setFilters({ action: draft.action.trim(), entityType: draft.entityType.trim(), entityId: draft.entityId.trim(), actorId: draft.actorId.trim() });
    setPage(1);
  };
  const filtered = Object.values(filters).some(Boolean);
  const data = logs.data?.data ?? [];

  const filterInput = (key: keyof Filters, label: string, props: { placeholder?: string; list?: string; mono?: boolean } = {}) => (
    <Field id={`flt-${key}`} label={label} error={errors[key]}>
      <Input
        id={`flt-${key}`}
        value={draft[key]}
        list={props.list}
        placeholder={props.placeholder}
        className={props.mono ? "font-mono" : ""}
        aria-invalid={errors[key] ? true : undefined}
        aria-describedby={errors[key] ? `flt-${key}-error` : undefined}
        onChange={(e) => { setDraft((d) => ({ ...d, [key]: e.target.value })); setErrors((x) => ({ ...x, [key]: undefined })); }}
      />
    </Field>
  );

  return (
    <>
      <PageHeader title="Audit Logs" description="Every admin change the backend records: who did it, to what, and the data before and after." />

      <form onSubmit={apply} noValidate className="mb-6 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filterInput("action", "Action", { placeholder: "CREATE, UPDATE…", list: "audit-actions" })}
          {filterInput("entityType", "Entity type", { placeholder: "event, team…", list: "audit-entities" })}
          {filterInput("entityId", "Entity ID", { mono: true })}
          {filterInput("actorId", "Actor (user) ID", { mono: true })}
        </div>
        <datalist id="audit-actions"><option value="CREATE" /><option value="UPDATE" /><option value="DELETE" /></datalist>
        <datalist id="audit-entities">
          {["mega_event", "sig", "event", "round", "team", "team_member", "leaderboard"].map((v) => <option key={v} value={v} />)}
        </datalist>
        <div className="mt-4 flex gap-2">
          <Button type="submit">Apply filters</Button>
          {filtered && <Button variant="ghost" onClick={() => { setDraft(EMPTY); setFilters(EMPTY); setErrors({}); setPage(1); }}>Clear</Button>}
        </div>
      </form>

      {logs.error ? (
        <ErrorState message={logs.error} onRetry={logs.reload} />
      ) : logs.loading && !logs.data ? (
        <TableSkeleton cols={5} />
      ) : !data.length ? (
        <EmptyState title={filtered ? "No log entries match these filters" : page > 1 ? "No more entries" : "No audit entries yet"}>
          {filtered ? "Try removing a filter." : "Changes made in this dashboard will be recorded here."}
        </EmptyState>
      ) : (
        <Table caption="Audit log entries">
          <thead><tr><Th>When</Th><Th>Action</Th><Th>Entity</Th><Th>Actor</Th><Th><span className="sr-only">Details</span></Th></tr></thead>
          <tbody>
            {data.map((log) => {
              const isOpen = expanded === log.id;
              const changed = changedKeys(log.oldData, log.newData);
              return (
                <Fragment key={log.id}>
                  <tr>
                    <Td className="whitespace-nowrap">{formatDateTime(log.createdAt)}</Td>
                    <Td><span className={`rounded px-1.5 py-0.5 text-xs font-medium ${ACTION_TONE[log.action] ?? "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"}`}>{log.action}</span></Td>
                    <Td>
                      <span className="font-medium">{log.entityType}</span>
                      {log.entityId && <span className="ml-2 font-mono text-xs text-zinc-600 dark:text-zinc-400" title={log.entityId}>{shortId(log.entityId)}</span>}
                    </Td>
                    <Td><span className="font-mono text-xs" title={log.actorId}>{shortId(log.actorId)}</span></Td>
                    <Td className="text-right">
                      <Button size="sm" variant="ghost" aria-expanded={isOpen} onClick={() => setExpanded(isOpen ? null : log.id)}>
                        {isOpen ? "Hide" : "Details"}
                      </Button>
                    </Td>
                  </tr>
                  {isOpen && (
                    <tr>
                      <td colSpan={5} className="border-b border-zinc-100 bg-zinc-50 px-4 py-4 dark:border-zinc-800/70 dark:bg-zinc-900/60">
                        <div className="mb-3 grid gap-1 text-xs text-zinc-600 dark:text-zinc-400">
                          <p>Entity ID: <span className="font-mono">{log.entityId ?? "None"}</span></p>
                          <p>Actor ID: <span className="font-mono">{log.actorId}</span></p>
                          {changed.size > 0 && log.oldData != null && log.newData != null && <p>Changed fields are highlighted.</p>}
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <DataBlock label="Before" data={log.oldData} highlight={changed} />
                          <DataBlock label="After" data={log.newData} highlight={changed} />
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      )}

      {(page > 1 || data.length === LIMIT) && (
        <div className="mt-4 flex items-center justify-end gap-2">
          <Button variant="secondary" size="sm" disabled={page === 1 || logs.loading} onClick={() => setPage((p) => p - 1)}>Newer</Button>
          <span className="text-sm text-zinc-600 tabular-nums dark:text-zinc-400">Page {page}</span>
          <Button variant="secondary" size="sm" disabled={data.length < LIMIT || logs.loading} onClick={() => setPage((p) => p + 1)}>Older</Button>
        </div>
      )}
    </>
  );
}
