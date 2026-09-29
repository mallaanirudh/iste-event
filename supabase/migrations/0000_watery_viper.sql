CREATE TYPE "public"."attendance_mode" AS ENUM('full_3', 'duo_2_bonus', 'absent');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('participant', 'poc', 'sig_head', 'events_coordinator');--> statement-breakpoint
CREATE TABLE "events_sig" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"venue" text,
	"timing" timestamp
);
--> statement-breakpoint
CREATE TABLE "leaderboard_cache" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer NOT NULL,
	"total_score" integer NOT NULL,
	"sy_score" integer NOT NULL,
	"rank" integer NOT NULL,
	"published_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "participants" (
	"id" uuid PRIMARY KEY NOT NULL,
	"team_id" integer,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"is_individual_registration" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "round_scores_and_attendance" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" integer NOT NULL,
	"event_id" integer NOT NULL,
	"attendance_mode" "attendance_mode" NOT NULL,
	"sy_points" integer DEFAULT 0 NOT NULL,
	"sq_points" integer DEFAULT 0 NOT NULL,
	"bonus_points" integer DEFAULT 0 NOT NULL,
	"penalties" integer DEFAULT 0 NOT NULL,
	"completion_time_seconds" integer,
	"is_misconduct_flagged" boolean DEFAULT false NOT NULL,
	"logged_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sig_pocs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"event_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_code" text NOT NULL,
	"is_auto_grouped" boolean DEFAULT false NOT NULL,
	"is_disqualified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "teams_team_code_unique" UNIQUE("team_code")
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"role" "user_role" DEFAULT 'participant' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "leaderboard_cache" ADD CONSTRAINT "leaderboard_cache_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "participants" ADD CONSTRAINT "participants_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "round_scores_and_attendance" ADD CONSTRAINT "round_scores_and_attendance_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "round_scores_and_attendance" ADD CONSTRAINT "round_scores_and_attendance_event_id_events_sig_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events_sig"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sig_pocs" ADD CONSTRAINT "sig_pocs_event_id_events_sig_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events_sig"("id") ON DELETE no action ON UPDATE no action;