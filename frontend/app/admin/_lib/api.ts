export class ApiError extends Error {
  constructor(message: string, readonly status: number, readonly details?: unknown) {
    super(message);
  }
}

type Query = Record<string, string | number | undefined | null>;

/** Fired when the backend says the session is missing or expired. */
export const UNAUTHORIZED_EVENT = "admin:unauthorized";

/**
 * Calls the backend through the /api/v1 rewrite (same origin, so the session cookie
 * is sent automatically). Throws ApiError with the backend's message on failure.
 */
export async function api<T>(
  path: string,
  { method = "GET", body, query }: { method?: string; body?: unknown; query?: Query } = {},
): Promise<T> {
  const url = new URL(`/api/v1${path}`, window.location.origin);
  for (const [k, v] of Object.entries(query ?? {})) {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
  }

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      // Fastify rejects an empty body when content-type is JSON, so only set it with a body.
      headers: body === undefined ? undefined : { "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: "same-origin",
      cache: "no-store",
    });
  } catch {
    throw new ApiError("Can't reach the server. Check that the backend is running.", 0);
  }

  const text = await res.text();
  let data: unknown = null;
  if (text) {
    try { data = JSON.parse(text); } catch { data = text; }
  }

  if (!res.ok) {
    const d = data as { message?: string; error?: string } | null;
    const message = d?.message ?? d?.error ?? `Request failed (${res.status})`;
    if (res.status === 401) window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    throw new ApiError(message, res.status, data);
  }
  return data as T;
}

export const errorMessage = (e: unknown) =>
  e instanceof Error ? e.message : "Something went wrong.";
