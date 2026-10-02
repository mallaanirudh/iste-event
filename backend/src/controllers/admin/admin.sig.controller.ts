import { eq } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";

import { db } from "../../db/index.js";
import { sigs } from "../../db/schema/index.js";

type CreateSigBody = {
  name: string;
  description?: string;
};

type UpdateSigBody = {
  name?: string;
  description?: string;
};

type SigParams = {
  sigId: string;
};

export async function getAdminSigs(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const result = await db
    .select()
    .from(sigs);

  return reply.send({
    sigs: result,
  });
}

export async function createSig(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = request.body as CreateSigBody;

  const existingSig = await db.query.sigs.findFirst({
    where: eq(sigs.name, body.name.trim()),
  });

  if (existingSig) {
    return reply.code(409).send({
      message: "SIG with this name already exists",
    });
  }

  const [sig] = await db
    .insert(sigs)
    .values({
      name: body.name.trim(),
      description: body.description?.trim() || null,
    })
    .returning();

  if (!sig) {
    return reply.code(500).send({
      message: "Failed to create SIG",
    });
  }

  return reply.code(201).send({
    sig,
  });
}

export async function updateSig(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sigId } = request.params as SigParams;
  const body = request.body as UpdateSigBody;

  const existingSig = await db.query.sigs.findFirst({
    where: eq(sigs.id, sigId),
  });

  if (!existingSig) {
    return reply.code(404).send({
      message: "SIG not found",
    });
  }

  if (body.name !== undefined) {
    const duplicateSig = await db.query.sigs.findFirst({
      where: eq(sigs.name, body.name.trim()),
    });

    if (duplicateSig && duplicateSig.id !== sigId) {
      return reply.code(409).send({
        message: "SIG with this name already exists",
      });
    }
  }

  const [sig] = await db
    .update(sigs)
    .set({
      ...(body.name !== undefined && {
        name: body.name.trim(),
      }),

      ...(body.description !== undefined && {
        description: body.description.trim() || null,
      }),
    })
    .where(eq(sigs.id, sigId))
    .returning();

  if (!sig) {
    return reply.code(500).send({
      message: "Failed to update SIG",
    });
  }

  return reply.send({
    sig,
  });
}

export async function deleteSig(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sigId } = request.params as SigParams;

  const existingSig = await db.query.sigs.findFirst({
    where: eq(sigs.id, sigId),
  });

  if (!existingSig) {
    return reply.code(404).send({
      message: "SIG not found",
    });
  }

  await db
    .delete(sigs)
    .where(eq(sigs.id, sigId));

  return reply.send({
    message: "SIG deleted successfully",
  });
}