import type { Metadata } from "next";
import AuditLogsView from "./AuditLogsView";

export const metadata: Metadata = { title: "Audit Logs" };

export default function Page() {
  return <AuditLogsView />;
}
