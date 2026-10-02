import type { FastifyInstance } from "fastify";

import {
  addTeamMember,
  createTeam,
  deleteTeam,
  getAdminTeams,
  getTeamMembers,
  removeTeamMember,
  updateTeam,
} from "../../controllers/admin/admin.team.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireAdmin } from "../../middleware/admin.middleware.js";

import {
  addTeamMemberSchema,
  createTeamSchema,
  updateTeamSchema,
} from "../../schemas/admin/team.schema.js";

export async function adminTeamRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authenticate);
  app.addHook("preHandler", requireAdmin);

  // Teams
  app.get(
    "/teams",
    getAdminTeams,
  );

  app.post(
    "/teams",
    {
      schema: createTeamSchema,
    },
    createTeam,
  );

  app.patch(
    "/teams/:teamId",
    {
      schema: updateTeamSchema,
    },
    updateTeam,
  );

  app.delete(
    "/teams/:teamId",
    deleteTeam,
  );

  // Team members
  app.get(
    "/teams/:teamId/members",
    getTeamMembers,
  );

  app.post(
    "/teams/:teamId/members",
    {
      schema: addTeamMemberSchema,
    },
    addTeamMember,
  );

  app.delete(
    "/teams/:teamId/members/:participantId",
    removeTeamMember,
  );
}