import {
  integer,
  pgTable,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import { rounds } from "./rounds.js";
import { teams } from "./teams.js";
import { megaEvents } from "./mega-events.js";
import { users } from "./users.js";

export const roundLeaderboardEntries = pgTable(
  "round_leaderboard_entries",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    roundId: uuid("round_id")
      .notNull()
      .references(() => rounds.id, {
        onDelete: "cascade",
      }),

    teamId: uuid("team_id")
      .notNull()
      .references(() => teams.id, {
        onDelete: "cascade",
      }),

    rank: integer("rank"),

    points: integer("points")
      .notNull()
      .default(0),

    updatedBy: uuid("updated_by")
      .references(() => users.id),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },

  (table) => [
    unique("round_team_unique").on(
      table.roundId,
      table.teamId,
    ),
  ],
);

export const overallLeaderboardEntries = pgTable(
  "overall_leaderboard_entries",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    megaEventId: uuid("mega_event_id")
      .notNull()
      .references(() => megaEvents.id, {
        onDelete: "cascade",
      }),

    teamId: uuid("team_id")
      .notNull()
      .references(() => teams.id, {
        onDelete: "cascade",
      }),

    rank: integer("rank"),

    points: integer("points")
      .notNull()
      .default(0),

    updatedBy: uuid("updated_by")
      .references(() => users.id),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },

  (table) => [
    unique("mega_event_team_leaderboard_unique").on(
      table.megaEventId,
      table.teamId,
    ),
  ],
);