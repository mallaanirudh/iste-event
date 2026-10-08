"use client";

import { useState, type FormEvent } from "react";
import { api, errorMessage } from "../../_lib/api";
import { formatDateTime } from "../../_lib/format";
import type { Team, TeamMember } from "../../_lib/types";
import { useResource } from "../../_lib/use-resource";
import Button from "../../_ui/Button";
import { Field, Input } from "../../_ui/Field";
import Modal from "../../_ui/Modal";
import { ErrorState } from "../../_ui/States";
import { useToast } from "../../_ui/Toaster";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function MembersBody({ team }: { team: Team }) {
  const toast = useToast();
  const members = useResource(`members:${team.id}`, () =>
    api<{ members: TeamMember[] }>(`/admin/teams/${team.id}/members`).then((r) => r.members));
  const [participantId, setParticipantId] = useState("");
  const [inputError, setInputError] = useState<string>();
  const [busy, setBusy] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);

  const add = async (e: FormEvent) => {
    e.preventDefault();
    const id = participantId.trim();
    if (!UUID.test(id)) { setInputError("Enter a participant ID (a UUID, e.g. 3f2b…-…)."); return; }
    setBusy(true);
    setInputError(undefined);
    try {
      await api(`/admin/teams/${team.id}/members`, { method: "POST", body: { participantId: id } });
      toast("success", "Participant added to the team.");
      setParticipantId("");
      members.reload();
    } catch (err) {
      setInputError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const remove = async (pid: string) => {
    setRemoving(pid);
    try {
      await api(`/admin/teams/${team.id}/members/${pid}`, { method: "DELETE" });
      toast("success", "Participant removed from the team.");
      members.reload();
    } catch (err) {
      toast("error", errorMessage(err));
    } finally {
      setRemoving(null);
    }
  };

  const active = (members.data ?? []).filter((m) => !m.leftAt);
  const past = (members.data ?? []).filter((m) => m.leftAt);

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={add} noValidate className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <Field id="participant-id" label="Add participant by ID" error={inputError} hint="Participant IDs are in the registration records. The backend has no participant search yet.">
            <Input
              id="participant-id"
              value={participantId}
              onChange={(e) => { setParticipantId(e.target.value); setInputError(undefined); }}
              placeholder="00000000-0000-0000-0000-000000000000"
              className="font-mono"
              aria-invalid={inputError ? true : undefined}
              aria-describedby={inputError ? "participant-id-error" : "participant-id-hint"}
            />
          </Field>
        </div>
        <Button type="submit" loading={busy} className="sm:mt-7">Add</Button>
      </form>

      <section>
        <h3 className="mb-2 text-sm font-medium">Current members</h3>
        {members.error ? (
          <ErrorState message={members.error} onRetry={members.reload} />
        ) : members.loading && !members.data ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading members…</p>
        ) : !active.length ? (
          <p className="rounded-md border border-dashed border-zinc-300 px-4 py-6 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
            No one is on this team yet.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-100 rounded-md border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            {active.map((m) => (
              <li key={m.teamMemberId} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate font-mono text-sm">{m.participantId}</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Joined {formatDateTime(m.joinedAt)}</p>
                </div>
                <Button size="sm" variant="ghost" className="text-red-700 dark:text-red-400" loading={removing === m.participantId} onClick={() => remove(m.participantId)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
        {past.length > 0 && (
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">{past.length} former member{past.length === 1 ? "" : "s"} not shown.</p>
        )}
      </section>
    </div>
  );
}

export default function MembersModal({ team, onClose }: { team: Team | null; onClose: () => void }) {
  return (
    <Modal open={team !== null} onClose={onClose} title={team ? `Team ${team.teamCode}` : "Team"} description={team?.megaEventName} size="lg">
      {team && <MembersBody team={team} />}
    </Modal>
  );
}
