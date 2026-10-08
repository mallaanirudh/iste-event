"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { errorMessage } from "./api";

type State<T> = { key: string | null; nonce: number; data?: T; error?: string };

/**
 * Loads data for `key` (pass null to skip). Keeps the previous data visible while a
 * reload is in flight, and ignores responses for a key that is no longer current.
 */
export function useResource<T>(key: string | null, fetcher: () => Promise<T>) {
  const [nonce, setNonce] = useState(0);
  const [state, setState] = useState<State<T>>({ key: null, nonce: -1 });
  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  useEffect(() => {
    if (key === null) return;
    let cancelled = false;
    fetcherRef.current().then(
      (data) => { if (!cancelled) setState({ key, nonce, data }); },
      (e) => { if (!cancelled) setState({ key, nonce, error: errorMessage(e) }); },
    );
    return () => { cancelled = true; };
  }, [key, nonce]);

  const current = state.key === key ? state : undefined;
  const reload = useCallback(() => setNonce((n) => n + 1), []);

  return {
    data: current?.data,
    error: current?.error,
    loading: key !== null && (state.key !== key || state.nonce !== nonce),
    reload,
  };
}
