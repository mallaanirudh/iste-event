import { pgTable, serial, text, timestamp, boolean, integer, uuid, primaryKey, pgEnum } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Enums
export const roleEnum = pgEnum('user_role', ['participant', 'poc', 'sig_head', 'events_coordinator']);
export const attendanceModeEnum = pgEnum('attendance_mode', ['full_3', 'duo_2_bonus', 'absent']);

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  teamCode: text("team_code").notNull().unique(), // Custom #TEAM001 ID
  isAutoGrouped: boolean("is_auto_grouped").default(false).notNull(),
  isDisqualified: boolean("is_disqualified").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const participants = pgTable("participants", {
  id: uuid("id").primaryKey(), // maps to auth.users id
  teamId: integer("team_id").references(() => teams.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  isIndividualRegistration: boolean("is_individual_registration").default(false).notNull(),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userRoles = pgTable("user_roles", {
  userId: uuid("user_id").primaryKey(), // maps to auth.users id
  role: roleEnum("role").default('participant').notNull(),
});

export const eventsSig = pgTable("events_sig", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  venue: text("venue"),
  timing: timestamp("timing"),
});

export const sigPocs = pgTable("sig_pocs", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").notNull(), // maps to auth.users id
  eventId: integer("event_id").references(() => eventsSig.id).notNull(),
});

export const roundScoresAndAttendance = pgTable("round_scores_and_attendance", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id).notNull(),
  eventId: integer("event_id").references(() => eventsSig.id).notNull(),
  attendanceMode: attendanceModeEnum("attendance_mode").notNull(),
  syPoints: integer("sy_points").default(0).notNull(),
  sqPoints: integer("sq_points").default(0).notNull(),
  bonusPoints: integer("bonus_points").default(0).notNull(),
  penalties: integer("penalties").default(0).notNull(),
  completionTimeSeconds: integer("completion_time_seconds"),
  isMisconductFlagged: boolean("is_misconduct_flagged").default(false).notNull(),
  loggedBy: uuid("logged_by").notNull(), // poc who logged it
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const leaderboardCache = pgTable("leaderboard_cache", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id).notNull(),
  totalScore: integer("total_score").notNull(),
  syScore: integer("sy_score").notNull(),
  rank: integer("rank").notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
});
