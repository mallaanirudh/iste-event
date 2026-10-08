"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { api } from "../../_lib/api";
import { byName, useEvents, useMegaEvents, useSigs } from "../../_lib/queries";
import type { AdminEvent } from "../../_lib/types";
import Button, { buttonClass } from "../../_ui/Button";
import ConfirmDialog from "../../_ui/ConfirmDialog";
import { Select } from "../../_ui/Field";
import FormModal, { type FieldDef, type Values } from "../../_ui/FormModal";
import PageHeader from "../../_ui/PageHeader";
import { EmptyState, ErrorState, TableSkeleton } from "../../_ui/States";
import { ActionsTd, Table, Td, Th } from "../../_ui/Table";
import { useToast } from "../../_ui/Toaster";

const toBody = (v: Values) =>
  Object.fromEntries(Object.entries(v).map(([k, val]) => [k, val.trim()]).filter(([k, val]) => k === "description" || val));

export default function EventsView() {
  const events = useEvents();
  const megaEvents = useMegaEvents();
  const sigs = useSigs();
  const toast = useToast();
  const [editing, setEditing] = useState<AdminEvent | "new" | null>(null);
  const [deleting, setDeleting] = useState<AdminEvent | null>(null);
  const [megaFilter, setMegaFilter] = useState("");
  const [sigFilter, setSigFilter] = useState("");
  const current = editing && editing !== "new" ? editing : null;

  const fields: FieldDef[] = useMemo(() => [
    { name: "name", label: "Name", type: "text", required: true, maxLength: 150 },
    {
      name: "megaEventId", label: "Mega event", type: "select", required: true,
      options: [...(megaEvents.data ?? [])].sort(byName).map((m) => ({ value: m.id, label: m.name })),
    },
    {
      name: "sigId", label: "SIG", type: "select", required: true,
      options: [...(sigs.data ?? [])].sort(byName).map((s) => ({ value: s.id, label: s.name })),
    },
    { name: "description", label: "Description", type: "textarea", maxLength: 5000 },
  ], [megaEvents.data, sigs.data]);

  const rows = (events.data ?? [])
    .filter((e) => (!megaFilter || e.megaEventId === megaFilter) && (!sigFilter || e.sigId === sigFilter))
    .sort((a, b) => a.megaEventName.localeCompare(b.megaEventName) || a.name.localeCompare(b.name));

  const missingParents = megaEvents.data && sigs.data && (!megaEvents.data.length || !sigs.data.length);
  const error = events.error ?? megaEvents.error ?? sigs.error;
  const reloadAll = () => { events.reload(); megaEvents.reload(); sigs.reload(); };

  return (
    <>
      <PageHeader
        title="Events"
        description="Each event belongs to one mega event and is run by one SIG. Rounds live inside events."
        actions={<Button onClick={() => setEditing("new")} disabled={!!missingParents}>New event</Button>}
      />

      {missingParents && (
        <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-100">
          Create at least one <Link className="font-medium underline" href="/admin/mega-events">mega event</Link> and one{" "}
          <Link className="font-medium underline" href="/admin/sigs">SIG</Link> before adding events.
        </p>
      )}

      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:max-w-xl">
        <Select aria-label="Filter by mega event" value={megaFilter} onChange={(e) => setMegaFilter(e.target.value)}>
          <option value="">All mega events</option>
          {megaEvents.data?.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
        </Select>
        <Select aria-label="Filter by SIG" value={sigFilter} onChange={(e) => setSigFilter(e.target.value)}>
          <option value="">All SIGs</option>
          {sigs.data?.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </Select>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={reloadAll} />
      ) : events.loading && !events.data ? (
        <TableSkeleton cols={4} />
      ) : !rows.length ? (
        <EmptyState title={events.data?.length ? "No events match these filters" : "No events yet"}>
          {events.data?.length ? "Try a different mega event or SIG." : "Create an event, then add its rounds."}
        </EmptyState>
      ) : (
        <Table caption="Events">
          <thead><tr><Th>Event</Th><Th>Mega event</Th><Th>SIG</Th><Th>Rounds</Th><Th><span className="sr-only">Actions</span></Th></tr></thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id}>
                <Td>
                  <p className="font-medium">{e.name}</p>
                  {e.description && <p className="mt-0.5 line-clamp-1 max-w-sm text-zinc-600 dark:text-zinc-400">{e.description}</p>}
                </Td>
                <Td>{e.megaEventName}</Td>
                <Td>{e.sigName}</Td>
                <Td><Link className={buttonClass("secondary", "sm")} href={`/admin/rounds?event=${e.id}`}>Manage rounds</Link></Td>
                <ActionsTd>
                  <Button size="sm" variant="ghost" onClick={() => setEditing(e)}>Edit</Button>
                  <Button size="sm" variant="ghost" className="text-red-700 dark:text-red-400" onClick={() => setDeleting(e)}>Delete</Button>
                </ActionsTd>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <FormModal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={current ? `Edit ${current.name}` : "New event"}
        fields={fields}
        initial={{
          name: current?.name ?? "",
          megaEventId: current?.megaEventId ?? megaFilter,
          sigId: current?.sigId ?? sigFilter,
          description: current?.description ?? "",
        }}
        editing={!!current}
        submitLabel={current ? "Save changes" : "Create event"}
        onSubmit={async (values, changed) => {
          if (current) {
            await api(`/admin/events/${current.id}`, { method: "PATCH", body: toBody(changed) });
            toast("success", "Event updated.");
          } else {
            await api("/admin/events", { method: "POST", body: toBody(values) });
            toast("success", "Event created.");
          }
          setEditing(null);
          events.reload();
        }}
      />

      <ConfirmDialog
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        title={`Delete ${deleting?.name ?? "event"}?`}
        message="All rounds in this event and their leaderboards will be deleted too. This can't be undone."
        onConfirm={async () => {
          await api(`/admin/events/${deleting!.id}`, { method: "DELETE" });
          toast("success", "Event deleted.");
          events.reload();
        }}
      />
    </>
  );
}
