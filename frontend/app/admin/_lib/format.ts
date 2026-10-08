const dateTime = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" });

export function formatDateTime(iso: string | null | undefined) {
  if (!iso) return "Not set";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : dateTime.format(d);
}

/** ISO string → value for <input type="datetime-local"> in the viewer's timezone. */
export function toLocalInput(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** <input type="datetime-local"> value → ISO string for the API. */
export const fromLocalInput = (v: string) => new Date(v).toISOString();

export const shortId = (id: string | null | undefined) => (id ? id.slice(0, 8) : "");
