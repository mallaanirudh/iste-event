"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { api } from "../../_lib/api";
import { useEvents, useRounds } from "../../_lib/queries";
import type { Round } from "../../_lib/types";
import Button, { buttonClass } from "../../_ui/Button";
import ConfirmDialog from "../../_ui/ConfirmDialog";
import EventPicker from "../../_ui/EventPicker";
import FormModal, { type FieldDef, type Values } from "../../_ui/FormModal";
import PageHeader from "../../_ui/PageHeader";
import { EmptyState, ErrorState, TableSkeleton } from "../../_ui/States";
import { ActionsTd, Table, Td, Th } from "../../_ui/Table";
import { useToast } from "../../_ui/Toaster";

const fields: FieldDef[] = [
  { name: "roundNumber", label: "Round number", type: "number", required: true, integer: true, min: 1 },
  { name: "name", label: "Name", type: "text", required: true, maxLength: 150, placeholder: "e.g. Preliminary" },
  { name: "maxPoints", label: "Maximum points", type: "number", integer: true, min: 0, hint: "Optional. The most a team can score in this round." },
  { name: "description", label: "Description", type: "textarea", maxLength: 5000 },
];

function toBody(v: Values) {
  const body: Record<string, string | number> = {};
  for (const [k, raw] of Object.entries(v)) {
    const val = raw.trim();
    if (k === "roundNumber" || k === "maxPoints") { if (val) body[k] = Number(val); }
    else if (k === "description" || val) body[k] = val;
  }
  return body;
}

export default function RoundsView() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const eventId = params.get("event") || null;

  const events = useEvents();
  const rounds = useRounds(eventId);
  const toast = useToast();
  const [editing, setEditing] = useState<Round | "new" | null>(null);
  const [deleting, setDeleting] = useState<Round | null>(null);
  const current = editing && editing !== "new" ? editing : null;
  const event = events.data?.find((e) => e.id === eventId);
  const nextNumber = Math.max(0, ...(rounds.data ?? []).map((r) => r.roundNumber)) + 1;

  const selectEvent = (id: string) => router.replace(id ? `${pathname}?event=${id}` : pathname);

  return (
    <>
      <PageHeader
        title="Rounds"
        description="Rounds belong to an event. Pick an event to see and manage its rounds."
        actions={eventId && <Button onClick={() => setEditing("new")}>New round</Button>}
      />

      <div className="mb-6 max-w-md">
        {events.error ? (
          <ErrorState message={events.error} onRetry={events.reload} />
        ) : events.data && !events.data.length ? (
          <EmptyState title="No events yet" action={<Link href="/admin/events" className={buttonClass()}>Go to events</Link>}>
            Rounds live inside events, so create an event first.
          </EmptyState>
        ) : (
          <EventPicker events={events.data ?? []} value={eventId ?? ""} onChange={selectEvent} />
        )}
      </div>

      {!eventId ? null : rounds.error ? (
        <ErrorState message={rounds.error} onRetry={rounds.reload} />
      ) : rounds.loading && !rounds.data ? (
        <TableSkeleton cols={4} />
      ) : !rounds.data?.length ? (
        <EmptyState title={`No rounds in ${event?.name ?? "this event"} yet`} action={<Button onClick={() => setEditing("new")}>Add round 1</Button>} />
      ) : (
        <Table caption={`Rounds in ${event?.name ?? "event"}`}>
          <thead><tr><Th className="w-20">No.</Th><Th>Name</Th><Th>Max points</Th><Th>Description</Th><Th><span className="sr-only">Actions</span></Th></tr></thead>
          <tbody>
            {rounds.data.map((r) => (
              <tr key={r.id}>
                <Td className="font-mono tabular-nums">{r.roundNumber}</Td>
                <Td className="font-medium">{r.name}</Td>
                <Td className="tabular-nums">{r.maxPoints ?? "Not set"}</Td>
                <Td className="max-w-sm"><p className="line-clamp-2 text-zinc-600 dark:text-zinc-400">{r.description || "No description"}</p></Td>
                <ActionsTd>
                  <Link className={buttonClass("ghost", "sm")} href={`/admin/leaderboards?event=${eventId}&round=${r.id}`}>Leaderboard</Link>
                  <Button size="sm" variant="ghost" onClick={() => setEditing(r)}>Edit</Button>
                  <Button size="sm" variant="ghost" className="text-red-700 dark:text-red-400" onClick={() => setDeleting(r)}>Delete</Button>
                </ActionsTd>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <FormModal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={current ? `Edit round ${current.roundNumber}` : `New round in ${event?.name ?? "event"}`}
        fields={fields}
        initial={{
          roundNumber: String(current?.roundNumber ?? nextNumber),
          name: current?.name ?? "",
          maxPoints: current?.maxPoints != null ? String(current.maxPoints) : "",
          description: current?.description ?? "",
        }}
        editing={!!current}
        submitLabel={current ? "Save changes" : "Create round"}
        onSubmit={async (values, changed) => {
          if (current) {
            await api(`/admin/rounds/${current.id}`, { method: "PATCH", body: toBody(changed) });
            toast("success", "Round updated.");
          } else {
            await api(`/admin/events/${eventId}/rounds`, { method: "POST", body: toBody(values) });
            toast("success", "Round created.");
          }
          setEditing(null);
          rounds.reload();
        }}
      />

      <ConfirmDialog
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        title={`Delete round ${deleting?.roundNumber ?? ""}?`}
        message="The round and its leaderboard will be deleted. This can't be undone."
        onConfirm={async () => {
          await api(`/admin/rounds/${deleting!.id}`, { method: "DELETE" });
          toast("success", "Round deleted.");
          rounds.reload();
        }}
      />
    </>
  );
}
