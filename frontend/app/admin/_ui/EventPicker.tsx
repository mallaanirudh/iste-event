"use client";

import type { AdminEvent } from "../_lib/types";
import { Select } from "./Field";

/** Event dropdown grouped by mega event. */
export default function EventPicker({
  events, value, onChange, id = "event-picker", label = "Event",
}: {
  events: AdminEvent[];
  value: string;
  onChange: (id: string) => void;
  id?: string;
  label?: string;
}) {
  const groups = new Map<string, AdminEvent[]>();
  for (const e of [...events].sort((a, b) => a.name.localeCompare(b.name))) {
    groups.set(e.megaEventName, [...(groups.get(e.megaEventName) ?? []), e]);
  }
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{label}</label>
      <Select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Choose an event…</option>
        {[...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([mega, list]) => (
          <optgroup key={mega} label={mega}>
            {list.map((e) => <option key={e.id} value={e.id}>{e.name} ({e.sigName})</option>)}
          </optgroup>
        ))}
      </Select>
    </div>
  );
}
