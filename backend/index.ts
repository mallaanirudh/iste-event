import Fastify from "fastify";
import cookie from "@fastify/cookie";
import { adminEventRoutes } from "./src/routes/admin/events.routes.js";
import { authRoutes } from "./src/routes/auth.routes.js";
import {adminRoundRoutes} from "./src/routes/admin/rounds.routes.js"
import { adminTeamRoutes } from "./src/routes/admin/teams.routes.js";
import { adminLeaderboardRoutes } from "./src/routes/admin/leaderboard.routes.js";
import { leaderboardRoutes } from "./src/routes/leaderboards.routes.js";
import { adminTallyRoutes } from "./src/routes/admin/admin.tally.routes.js";
import { adminAuditLogRoutes } from "./src/routes/admin/audit-logs.js";
import { adminMegaEventRoutes } from "./src/routes/admin/mega-events.routes.js";
import { adminSigRoutes } from "./src/routes/admin/sigs.routes.js";
import { publicRoutes } from "./src/routes/public.routes.js";
const app = Fastify({
  logger: true,
});

await app.register(cookie);

await app.register(authRoutes, {
  prefix: "/api/v1/auth",
});
await app.register(adminEventRoutes, {
  prefix: "/api/v1/admin/events",
});
await app.register(adminRoundRoutes, {
  prefix: "/api/v1/admin",
});
await app.register(adminTeamRoutes, {
  prefix: "/api/v1/admin",
});
await app.register(
  adminLeaderboardRoutes,
  { prefix: "/api/v1/admin" },
);
await app.register(
  leaderboardRoutes,
  { prefix: "/api/v1" },
);
app.register(adminTallyRoutes, {
  prefix: "/api/v1/admin/tally",
});
app.register(adminAuditLogRoutes, {
  prefix: "/api/v1/admin/audit-logs",
});
app.register(adminMegaEventRoutes, {
  prefix: "/api/v1/admin/mega-events",
});
app.register(adminSigRoutes, {
  prefix: "/api/v1/admin/sigs",
});
app.register(publicRoutes, {
  prefix: "/api/v1",
});
app.get("/health", async () => {
  return {
    status: "ok",
  };
});

const start = async () => {
  try {
    await app.listen({
      port: 3000,
      host: "0.0.0.0",
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();