"use client";

import { createContext, useContext } from "react";
import type { User } from "./types";

export const SessionContext = createContext<{ user: User; logout: () => Promise<void> } | null>(null);

export function useSession() {
  const s = useContext(SessionContext);
  if (!s) throw new Error("useSession must be used inside the admin panel");
  return s;
}
