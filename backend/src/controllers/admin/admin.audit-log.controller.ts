import type { FastifyReply, FastifyRequest } from "fastify";
import { and, desc, eq } from "drizzle-orm";

import { db } from "../../db/client.js";
import { auditLogs } from "../../db/schema/audit-logs.js";

interface AuditLogQuery {
  page?: string;
  limit?: string;
  action?: string;
  entityType?: string;
  entityId?: string;
  actorId?: string;
}

export async function getAuditLogs(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const query = request.query as AuditLogQuery;

  const page = Math.max(Number(query.page ?? "1"), 1);
  const limit = Math.min(
    Math.max(Number(query.limit ?? "50"), 1),
    100,
  );

  const offset = (page - 1) * limit;

  const conditions = [];

  if (query.action) {
    conditions.push(eq(auditLogs.action, query.action));
  }

  if (query.entityType) {
    conditions.push(eq(auditLogs.entityType, query.entityType));
  }

  if (query.entityId) {
    conditions.push(eq(auditLogs.entityId, query.entityId));
  }

  if (query.actorId) {
    conditions.push(eq(auditLogs.actorId, query.actorId));
  }

  const logs = await db
    .select()
    .from(auditLogs)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(auditLogs.createdAt))
    .limit(limit)
    .offset(offset);

  return reply.send({
    page,
    limit,
    data: logs,
  });
}