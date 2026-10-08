"use client";

import { useState } from "react";
import { api } from "../../_lib/api";
import { formatDateTime } from "../../_lib/format";
import { byName, useMegaEvents, useTeams } from "../../_lib/queries";
import type { Team } from "../../_lib/types";
import Button from "../../_ui/Button";
import ConfirmDialog from "../../_ui/ConfirmDialog";
import { Input, Select } from "../../_ui/Field";
import FormModal, { type FieldDef } from "../../_ui/FormModal";
import PageHeader from "../../_ui/PageHeader";
import { EmptyState, ErrorState, TableSkeleton } from "../../_ui/States";
import { ActionsTd, Table, Td, Th } from "../../_ui/Table";
import { useToast } from "../../_ui/Toaster";
import MembersModal from "./MembersModal";

export default function TeamsView() {
  const teams = useTeams();
  const megaEvents = useMegaEvents();
  const toast = useToast();
  const [editing, setEditing] = useState<Team | "new" | null>(null);
  const [deleting, setDeleting] = useState<Team | null>(null);
  const [members, setMembers] = useState<Team | null>(null);
  const [megaFilter, setMegaFilter] = useState("");
  const [search, setSearch] = useState("");
  const current = editing && editing !== "new" ? editing : null;

  const fields: FieldDef[] = current
    ? [{ name: "teamCode", label: "Team code", type: "text", required: true, maxLength: 30 }]
    : [
        {
          name: "megaEventId", label: "Mega event", type: "select", required: true,
          options: [...(megaEvents.data ?? [])].sort(byName).map((m) => ({ value: m.id, label: m.name })),
        },
        { name: "teamCode", label: "Team code", type: "text", required: true, maxLength: 30, hint: "Must be unique. Stored in lower case." },
      ];

  const q = search.trim().toLowerCase();
  const rows = (teams.data ?? [])
    .filter((t) => (!megaFilter || t.megaEventId === megaFilter) && (!q || t.teamCode.toLowerCase().includes(q)))
    .sort((a, b) => a.teamCode.localeCompare(b.teamCode, undefined, { numeric: true }));

  return (
    <>
      <PageHeader
        title="Teams"
        description="Teams compete in a mega event. Open a team to add or remove participants."
        actions={<Button onClick={() => setEditing("new")} disabled={megaEvents.data?.length === 0}>New team</Button>}
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:max-w-xl">
        <Select aria-label="Filter by mega event" value={megaFilter} onChange={(e) => setMegaFilter(e.target.value)}>
          <option value="">All mega events</option>
          {megaEvents.data?.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
        </Select>
        <Input type="search" aria-label="Search team codes" placeholder="Search team codes" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {teams.error ? (
        <ErrorState message={teams.error} onRetry={teams.reload} />
      ) : teams.loading && !teams.data ? (
        <TableSkeleton cols={3} />
      ) : !rows.length ? (
        <EmptyState title={teams.data?.length ? "No teams match" : "No teams yet"}>
          {teams.data?.length ? "Try a different search or mega event." : "Create teams, then add participants to them."}
        </EmptyState>
      ) : (
        <Table caption="Teams">
          <thead><tr><Th>Team code</Th><Th>Mega event</Th><Th>Created</Th><Th><span className="sr-only">Actions</span></Th></tr></thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id}>
                <Td className="font-mono font-medium">{t.teamCode}</Td>
                <Td>{t.megaEventName}</Td>
                <Td className="whitespace-nowrap">{formatDateTime(t.createdAt)}</Td>
                <ActionsTd>
                  <Button size="sm" variant="secondary" onClick={() => setMembers(t)}>Members</Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditing(t)}>Edit</Button>
                  <Button size="sm" variant="ghost" className="text-red-700 dark:text-red-400" onClick={() => setDeleting(t)}>Delete</Button>
                </ActionsTd>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {rows.length > 0 && <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{rows.length} team{rows.length === 1 ? "" : "s"}</p>}

      <FormModal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={current ? `Edit team ${current.teamCode}` : "New team"}
        fields={fields}
        initial={current ? { teamCode: current.teamCode } : { megaEventId: megaFilter, teamCode: "" }}
        editing={!!current}
        submitLabel={current ? "Save changes" : "Create team"}
        onSubmit={async (values, changed) => {
          if (current) {
            await api(`/admin/teams/${current.id}`, { method: "PATCH", body: { teamCode: changed.teamCode.trim() } });
            toast("success", "Team updated.");
          } else {
            await api("/admin/teams", { method: "POST", body: { megaEventId: values.megaEventId, teamCode: values.teamCode.trim() } });
            toast("success", "Team created.");
          }
          setEditing(null);
          teams.reload();
        }}
      />

      <MembersModal team={members} onClose={() => setMembers(null)} />

      <ConfirmDialog
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        title={`Delete team ${deleting?.teamCode ?? ""}?`}
        message="The team, its memberships and its leaderboard entries will be removed. This can't be undone."
        onConfirm={async () => {
          await api(`/admin/teams/${deleting!.id}`, { method: "DELETE" });
          toast("success", "Team deleted.");
          teams.reload();
        }}
      />
    </>
  );
}
