/**
 * Server-side client for the ISTE event backend (`/api/v1`).
 *
 * Call these from Server Components only: the backend has no CORS policy, and
 * fetching on the server keeps its address out of the browser bundle.
 * Every call fails soft — it returns `null` instead of throwing — so a page can
 * fall back to static content when the backend is unreachable.
 */

const DEFAULT_TIMEOUT_MS = 4000;

/** Backend origin, e.g. `http://localhost:3000`. Unset means "no backend". */
function apiBase(): string | null {
  const raw = process.env.API_BASE_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** IDs are interpolated into URL paths, so only well-formed UUIDs are allowed. */
export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_RE.test(value);
}

export async function apiGet(
  path: string,
  { revalidate = 30 }: { revalidate?: number } = {},
): Promise<unknown | null> {
  const base = apiBase();
  if (!base) return null;

  try {
    const res = await fetch(`${base}/api/v1${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate },
      signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return (await res.json()) as unknown;
  } catch {
    return null;
  }
}
