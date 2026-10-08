"use client";

import { useState } from "react";
import { api } from "../../_lib/api";
import { formatDateTime, fromLocalInput, toLocalInput } from "../../_lib/format";
import { useMegaEvents } from "../../_lib/queries";
import type { MegaEvent } from "../../_lib/types";
import Button from "../../_ui/Button";
import ConfirmDialog from "../../_ui/ConfirmDialog";
import FormModal, { type FieldDef, type Values } from "../../_ui/FormModal";
import PageHeader from "../../_ui/PageHeader";
import { EmptyState, ErrorState, TableSkeleton } from "../../_ui/States";
import { ActionsTd, Table, Td, Th } from "../../_ui/Table";
import { useToast } from "../../_ui/Toaster";

const fields = (editing: boolean): FieldDef[] => [
  { name: "name", label: "Name", type: "text", required: true, maxLength: 150 },
  { name: "description", label: "Description", type: "textarea", maxLength: 10000 },
  {
    name: "registrationOpenAt", label: "Registration opens", type: "datetime",
    hint: editing ? "Once set, a date can be changed but not cleared." : "Optional. Uses your local time zone.",
  },
  { name: "registrationCloseAt", label: "Registration closes", type: "datetime" },
];

const validate = (v: Values) =>
  v.registrationOpenAt && v.registrationCloseAt && new Date(v.registrationCloseAt) <= new Date(v.registrationOpenAt)
    ? { registrationCloseAt: "Must be after the opening time." }
    : {};

function toBody(values: Values) {
  const body: Record<string, string> = {};
  for (const [k, raw] of Object.entries(values)) {
    const v = raw.trim();
    if (k === "registrationOpenAt" || k === "registrationCloseAt") {
      if (v) body[k] = fromLocalInput(v);
    } else if (k === "description" || v) {
      body[k] = v;
    }
  }
  return body;
}

export default function MegaEventsView() {
  const { data, error, loading, reload } = useMegaEvents();
  const toast = useToast();
  const [editing, setEditing] = useState<MegaEvent | "new" | null>(null);
  const [deleting, setDeleting] = useState<MegaEvent | null>(null);

  const current = editing && editing !== "new" ? editing : null;
  const initial: Values = {
    name: current?.name ?? "",
    description: current?.description ?? "",
    registrationOpenAt: toLocalInput(current?.registrationOpenAt),
    registrationCloseAt: toLocalInput(current?.registrationCloseAt),
  };

  return (
    <>
      <PageHeader
        title="Mega Events"
        description="The top level of the event. SIGs' events, teams and the overall leaderboard all belong to a mega event."
        actions={<Button onClick={() => setEditing("new")}>New mega event</Button>}
      />

      {error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : loading && !data ? (
        <TableSkeleton cols={4} />
      ) : !data?.length ? (
        <EmptyState title="No mega events yet" action={<Button onClick={() => setEditing("new")}>Create the first one</Button>}>
          Create a mega event first. Events and teams are attached to it.
        </EmptyState>
      ) : (
        <Table caption="Mega events">
          <thead>
            <tr><Th>Name</Th><Th>Registration opens</Th><Th>Registration closes</Th><Th>Description</Th><Th><span className="sr-only">Actions</span></Th></tr>
          </thead>
          <tbody>
            {data.map((m) => (
              <tr key={m.id}>
                <Td className="font-medium">{m.name}</Td>
                <Td className="whitespace-nowrap">{formatDateTime(m.registrationOpenAt)}</Td>
                <Td className="whitespace-nowrap">{formatDateTime(m.registrationCloseAt)}</Td>
                <Td className="max-w-xs"><p className="line-clamp-2 text-zinc-600 dark:text-zinc-400">{m.description || "No description"}</p></Td>
                <ActionsTd>
                  <Button size="sm" variant="ghost" onClick={() => setEditing(m)}>Edit</Button>
                  <Button size="sm" variant="ghost" className="text-red-700 dark:text-red-400" onClick={() => setDeleting(m)}>Delete</Button>
                </ActionsTd>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <FormModal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={current ? `Edit ${current.name}` : "New mega event"}
        fields={fields(!!current)}
        initial={initial}
        editing={!!current}
        validate={validate}
        submitLabel={current ? "Save changes" : "Create mega event"}
        onSubmit={async (values, changed) => {
          if (current) {
            await api(`/admin/mega-events/${current.id}`, { method: "PATCH", body: toBody(changed) });
            toast("success", "Mega event updated.");
          } else {
            await api("/admin/mega-events", { method: "POST", body: toBody(values) });
            toast("success", "Mega event created.");
          }
          setEditing(null);
          reload();
        }}
      />

      <ConfirmDialog
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        title={`Delete ${deleting?.name ?? "mega event"}?`}
        message="This removes the mega event. Events, teams and leaderboards attached to it may be removed too. This can't be undone."
        onConfirm={async () => {
          await api(`/admin/mega-events/${deleting!.id}`, { method: "DELETE" });
          toast("success", "Mega event deleted.");
          reload();
        }}
      />
    </>
  );
}
