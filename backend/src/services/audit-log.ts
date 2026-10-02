import { db } from "../db/client.js";
import { auditLogs } from "../db/schema/audit-logs.js";

interface CreateAuditLogParams {
  actorId: string;
  action: string;
  entityType: string;
  entityId?: string;
  oldData?: unknown;
  newData?: unknown;
}

export async function createAuditLog({
  actorId,
  action,
  entityType,
  entityId,
  oldData,
  newData,
}: CreateAuditLogParams) {
  await db.insert(auditLogs).values({
    actorId,
    action,
    entityType,
    entityId,
    oldData,
    newData,
  });
}