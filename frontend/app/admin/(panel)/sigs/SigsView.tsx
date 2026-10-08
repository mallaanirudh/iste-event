"use client";

import { useState } from "react";
import { api } from "../../_lib/api";
import { useSigs } from "../../_lib/queries";
import type { Sig } from "../../_lib/types";
import Button from "../../_ui/Button";
import ConfirmDialog from "../../_ui/ConfirmDialog";
import FormModal, { type FieldDef, type Values } from "../../_ui/FormModal";
import PageHeader from "../../_ui/PageHeader";
import { EmptyState, ErrorState, TableSkeleton } from "../../_ui/States";
import { ActionsTd, Table, Td, Th } from "../../_ui/Table";
import { useToast } from "../../_ui/Toaster";

const fields: FieldDef[] = [
  { name: "name", label: "Name", type: "text", required: true, maxLength: 100, placeholder: "e.g. Coding" },
  { name: "description", label: "Description", type: "textarea", maxLength: 10000 },
];

const toBody = (v: Values) => {
  const body: Record<string, string> = {};
  if (v.name !== undefined) body.name = v.name.trim();
  if (v.description !== undefined) body.description = v.description.trim();
  return body;
};

export default function SigsView() {
  const { data, error, loading, reload } = useSigs();
  const toast = useToast();
  const [editing, setEditing] = useState<Sig | "new" | null>(null);
  const [deleting, setDeleting] = useState<Sig | null>(null);
  const current = editing && editing !== "new" ? editing : null;

  return (
    <>
      <PageHeader
        title="SIGs"
        description="Special Interest Groups. Every event is run by one SIG."
        actions={<Button onClick={() => setEditing("new")}>New SIG</Button>}
      />

      {error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : loading && !data ? (
        <TableSkeleton cols={2} />
      ) : !data?.length ? (
        <EmptyState title="No SIGs yet" action={<Button onClick={() => setEditing("new")}>Create a SIG</Button>}>
          Add the SIGs that will run events.
        </EmptyState>
      ) : (
        <Table caption="SIGs">
          <thead><tr><Th>Name</Th><Th>Description</Th><Th><span className="sr-only">Actions</span></Th></tr></thead>
          <tbody>
            {data.map((s) => (
              <tr key={s.id}>
                <Td className="font-medium">{s.name}</Td>
                <Td className="max-w-md"><p className="line-clamp-2 text-zinc-600 dark:text-zinc-400">{s.description || "No description"}</p></Td>
                <ActionsTd>
                  <Button size="sm" variant="ghost" onClick={() => setEditing(s)}>Edit</Button>
                  <Button size="sm" variant="ghost" className="text-red-700 dark:text-red-400" onClick={() => setDeleting(s)}>Delete</Button>
                </ActionsTd>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <FormModal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={current ? `Edit ${current.name}` : "New SIG"}
        fields={fields}
        initial={{ name: current?.name ?? "", description: current?.description ?? "" }}
        editing={!!current}
        submitLabel={current ? "Save changes" : "Create SIG"}
        onSubmit={async (values, changed) => {
          if (current) {
            await api(`/admin/sigs/${current.id}`, { method: "PATCH", body: toBody(changed) });
            toast("success", "SIG updated.");
          } else {
            await api("/admin/sigs", { method: "POST", body: toBody(values) });
            toast("success", "SIG created.");
          }
          setEditing(null);
          reload();
        }}
      />

      <ConfirmDialog
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        title={`Delete ${deleting?.name ?? "SIG"}?`}
        message="Events run by this SIG may be removed or blocked from deleting. This can't be undone."
        onConfirm={async () => {
          await api(`/admin/sigs/${deleting!.id}`, { method: "DELETE" });
          toast("success", "SIG deleted.");
          reload();
        }}
      />
    </>
  );
}
