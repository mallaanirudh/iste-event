import { and, eq, isNull } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";

import { db } from "../../db/index.js";
import {
  megaEvents,
  participants,
  teamMembers,
  teams,
} from "../../db/schema/index.js";

type TeamParams = {
  teamId: string;
};

type CreateTeamBody = {
  megaEventId: string;
  teamCode: string;
};

type UpdateTeamBody = {
  teamCode?: string;
};

type AddMemberBody = {
  participantId: string;
};

type MemberParams = {
  teamId: string;
  participantId: string;
};

export async function getAdminTeams(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const result = await db
    .select({
      id: teams.id,
      teamCode: teams.teamCode,
      megaEventId: megaEvents.id,
      megaEventName: megaEvents.name,
      createdAt: teams.createdAt,
      updatedAt: teams.updatedAt,
    })
    .from(teams)
    .innerJoin(
      megaEvents,
      eq(teams.megaEventId, megaEvents.id),
    );

  return reply.send({
    teams: result,
  });
}

export async function createTeam(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    megaEventId,
    teamCode,
  } = request.body as CreateTeamBody;

  const megaEvent = await db.query.megaEvents.findFirst({
    where: eq(megaEvents.id, megaEventId),
  });

  if (!megaEvent) {
    return reply.code(404).send({
      message: "Mega event not found",
    });
  }

  const normalizedTeamCode = teamCode.trim().toUpperCase();

  const existingTeam = await db.query.teams.findFirst({
    where: eq(teams.teamCode, normalizedTeamCode),
  });

  if (existingTeam) {
    return reply.code(409).send({
      message: "Team code already exists",
    });
  }

  const [team] = await db
    .insert(teams)
    .values({
      megaEventId,
      teamCode: normalizedTeamCode,
    })
    .returning();

  return reply.code(201).send({
    team,
  });
}

export async function updateTeam(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { teamId } = request.params as TeamParams;
  const body = request.body as UpdateTeamBody;

  const existingTeam = await db.query.teams.findFirst({
    where: eq(teams.id, teamId),
  });

  if (!existingTeam) {
    return reply.code(404).send({
      message: "Team not found",
    });
  }

  let normalizedTeamCode: string | undefined;

  if (body.teamCode !== undefined) {
    normalizedTeamCode = body.teamCode.trim().toUpperCase();

    const duplicate = await db.query.teams.findFirst({
      where: eq(teams.teamCode, normalizedTeamCode),
    });

    if (duplicate && duplicate.id !== teamId) {
      return reply.code(409).send({
        message: "Team code already exists",
      });
    }
  }

  const [team] = await db
    .update(teams)
    .set({
      ...(normalizedTeamCode !== undefined && {
        teamCode: normalizedTeamCode,
      }),
      updatedAt: new Date(),
    })
    .where(eq(teams.id, teamId))
    .returning();

  return reply.send({
    team,
  });
}

export async function deleteTeam(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { teamId } = request.params as TeamParams;

  const existingTeam = await db.query.teams.findFirst({
    where: eq(teams.id, teamId),
  });

  if (!existingTeam) {
    return reply.code(404).send({
      message: "Team not found",
    });
  }

  await db
    .delete(teams)
    .where(eq(teams.id, teamId));

  return reply.send({
    message: "Team deleted successfully",
  });
}

export async function getTeamMembers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { teamId } = request.params as TeamParams;

  const team = await db.query.teams.findFirst({
    where: eq(teams.id, teamId),
  });

  if (!team) {
    return reply.code(404).send({
      message: "Team not found",
    });
  }

  const members = await db
    .select({
      teamMemberId: teamMembers.id,
      participantId: participants.id,
      joinedAt: teamMembers.joinedAt,
      leftAt: teamMembers.leftAt,
    })
    .from(teamMembers)
    .innerJoin(
      participants,
      eq(teamMembers.participantId, participants.id),
    )
    .where(
      and(
        eq(teamMembers.teamId, teamId),
        isNull(teamMembers.leftAt),
      ),
    );

  return reply.send({
    members,
  });
}

export async function addTeamMember(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { teamId } = request.params as TeamParams;
  const { participantId } = request.body as AddMemberBody;

  const team = await db.query.teams.findFirst({
    where: eq(teams.id, teamId),
  });

  if (!team) {
    return reply.code(404).send({
      message: "Team not found",
    });
  }

  const participant = await db.query.participants.findFirst({
    where: eq(participants.id, participantId),
  });

  if (!participant) {
    return reply.code(404).send({
      message: "Participant not found",
    });
  }

  const existingMembership = await db.query.teamMembers.findFirst({
    where: and(
      eq(teamMembers.teamId, teamId),
      eq(teamMembers.participantId, participantId),
    ),
  });

  if (existingMembership && existingMembership.leftAt === null) {
    return reply.code(409).send({
      message: "Participant is already a member of this team",
    });
  }

  const [member] = await db
    .insert(teamMembers)
    .values({
      teamId,
      participantId,
    })
    .returning();

  return reply.code(201).send({
    member,
  });
}

export async function removeTeamMember(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    teamId,
    participantId,
  } = request.params as MemberParams;

  const membership = await db.query.teamMembers.findFirst({
    where: and(
      eq(teamMembers.teamId, teamId),
      eq(teamMembers.participantId, participantId),
      isNull(teamMembers.leftAt),
    ),
  });

  if (!membership) {
    return reply.code(404).send({
      message: "Active team membership not found",
    });
  }

  await db
    .update(teamMembers)
    .set({
      leftAt: new Date(),
    })
    .where(eq(teamMembers.id, membership.id));

  return reply.send({
    message: "Participant removed from team",
  });
}