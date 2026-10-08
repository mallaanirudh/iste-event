"use client";

import { useMemo, useState } from "react";
import { api } from "../../_lib/api";
import { formatDateTime } from "../../_lib/format";
import type { TallyPage, TallyQuestion, TallySubmission } from "../../_lib/types";
import { useResource } from "../../_lib/use-resource";
import Button from "../../_ui/Button";
import { Input } from "../../_ui/Field";
import Modal from "../../_ui/Modal";
import PageHeader from "../../_ui/PageHeader";
import { EmptyState, ErrorState, TableSkeleton } from "../../_ui/States";
import { Table, Td, Th } from "../../_ui/Table";

const LIMIT = 50;

/** Tally answers can be strings, numbers, arrays (choices, files) or objects. */
function formatAnswer(a: unknown): string {
  if (a == null || a === "") return "";
  if (Array.isArray(a)) return a.map(formatAnswer).filter(Boolean).join(", ");
  if (typeof a === "object") {
    const o = a as Record<string, unknown>;
    if (typeof o.name === "string") return o.name;
    if (typeof o.url === "string") return o.url;
    return JSON.stringify(a);
  }
  return String(a);
}

const answersFor = (s: TallySubmission) => new Map((s.responses ?? []).map((r) => [r.questionId, formatAnswer(r.answer)]));
const questionTitle = (q: TallyQuestion, i: number) => q.title?.trim() || `Question ${i + 1}`;

export default function RegistrationsView() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<TallySubmission | null>(null);
  const res = useResource(`tally:${page}`, () =>
    api<TallyPage>("/admin/tally/registrations", { query: { page, limit: LIMIT } }));

  const questions = useMemo(() => res.data?.questions ?? [], [res.data]);
  const submissions = useMemo(() => res.data?.submissions ?? [], [res.data]);
  const shown = questions.slice(0, 4);
  const total = res.data?.totalNumberOfSubmissionsPerFilter?.all;

  const q = search.trim().toLowerCase();
  const rows = q
    ? submissions.filter((s) => [...answersFor(s).values()].some((v) => v.toLowerCase().includes(q)))
    : submissions;

  return (
    <>
      <PageHeader
        title="Registrations"
        description="Submissions from the Tally registration form. They're read live from Tally and can only be edited there."
        actions={<Button variant="secondary" onClick={res.reload} loading={res.loading && !!res.data}>Refresh</Button>}
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          type="search"
          aria-label="Search registrations on this page"
          placeholder="Search names, emails, answers…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-sm"
        />
        {total !== undefined && <p className="text-sm text-zinc-600 dark:text-zinc-400">{total} submission{total === 1 ? "" : "s"} in total</p>}
      </div>

      {res.error ? (
        <ErrorState message={`${res.error} Check TALLY_API_KEY and TALLY_FORM_ID in the backend .env.`} onRetry={res.reload} />
      ) : res.loading && !res.data ? (
        <TableSkeleton cols={4} />
      ) : !submissions.length ? (
        <EmptyState title="No registrations yet">Submissions to the Tally form will appear here.</EmptyState>
      ) : !rows.length ? (
        <EmptyState title="Nothing on this page matches">Search only covers the {submissions.length} submissions on this page.</EmptyState>
      ) : (
        <Table caption="Tally registrations">
          <thead>
            <tr>
              <Th>Submitted</Th>
              {shown.map((qq, i) => <Th key={qq.id}>{questionTitle(qq, i)}</Th>)}
              <Th><span className="sr-only">Details</span></Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => {
              const a = answersFor(s);
              return (
                <tr key={s.id}>
                  <Td className="whitespace-nowrap">
                    {formatDateTime(s.submittedAt)}
                    {s.isCompleted === false && <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-900 dark:bg-amber-950 dark:text-amber-200">Partial</span>}
                  </Td>
                  {shown.map((qq) => <Td key={qq.id} className="max-w-[16rem] truncate">{a.get(qq.id) || <span className="text-zinc-500">No answer</span>}</Td>)}
                  <Td className="text-right"><Button size="sm" variant="ghost" onClick={() => setOpen(s)}>View</Button></Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {(page > 1 || res.data?.hasMore) && (
        <div className="mt-4 flex items-center justify-end gap-2">
          <Button variant="secondary" size="sm" disabled={page === 1 || res.loading} onClick={() => setPage((p) => p - 1)}>Previous</Button>
          <span className="text-sm text-zinc-600 tabular-nums dark:text-zinc-400">Page {page}</span>
          <Button variant="secondary" size="sm" disabled={!res.data?.hasMore || res.loading} onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      )}

      <Modal open={open !== null} onClose={() => setOpen(null)} title="Registration details" description={open ? `Submitted ${formatDateTime(open.submittedAt)}` : undefined} size="lg">
        {open && (
          <dl className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {questions.map((qq, i) => (
              <div key={qq.id} className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{questionTitle(qq, i)}</dt>
                <dd className="text-sm break-words sm:col-span-2">{answersFor(open).get(qq.id) || <span className="text-zinc-500">No answer</span>}</dd>
              </div>
            ))}
            <div className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Submission ID</dt>
              <dd className="font-mono text-sm break-all sm:col-span-2">{open.id}</dd>
            </div>
          </dl>
        )}
      </Modal>
    </>
  );
}
