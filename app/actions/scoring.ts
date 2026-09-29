"use server";

import { db } from "@/db";
import { roundScoresAndAttendance, leaderboardCache, teams } from "@/db/schema";
import { createClient } from "@/utils/supabase/server";
import { eq, sql, desc, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type LogScoreInput = {
  teamId: number;
  eventId: number;
  attendanceMode: "full_3" | "duo_2_bonus" | "absent";
  syPoints: number; // Max 20
  sqPoints: number; // Max 60
  bonusPoints: number; // Max 10
  penalties: number;
  completionTimeSeconds?: number;
  isMisconductFlagged: boolean;
};

/**
  * Objective 4.3: Scoring & Rule Engine Server Action
  * Logs round score with auto duo-player bonus (+2 points), Scotland Yard (max 20),
  * Square One (max 60), bonus (max 10), and misconduct zeroing logic.
  */
export async function logRoundScoreAction(input: LogScoreInput) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: "Unauthorized. Please log in as a POC." };
    }

    // Input bounds validation
    let syPoints = Math.min(Math.max(0, input.syPoints), 20);
    let sqPoints = Math.min(Math.max(0, input.sqPoints), 60);
    let bonusPoints = Math.min(Math.max(0, input.bonusPoints), 10);
    let penalties = Math.max(0, input.penalties);

    // Apply Duo-Player Bonus rule (+2 points) if attendanceMode == duo_2_bonus
    if (input.attendanceMode === "duo_2_bonus") {
      bonusPoints = Math.min(10, bonusPoints + 2);
    }

    // Apply Misconduct Zeroing rule
    if (input.isMisconductFlagged) {
      syPoints = 0;
      sqPoints = 0;
      bonusPoints = 0;
    }

    // Save to DB
    const [scoreRecord] = await db
      .insert(roundScoresAndAttendance)
      .values({
        teamId: input.teamId,
        eventId: input.eventId,
        attendanceMode: input.attendanceMode,
        syPoints,
        sqPoints,
        bonusPoints,
        penalties,
        completionTimeSeconds: input.completionTimeSeconds || null,
        isMisconductFlagged: input.isMisconductFlagged,
        loggedBy: user.id,
      })
      .returning();

    revalidatePath("/poc/scoring");
    revalidatePath("/admin");
    return {
      success: true,
      data: scoreRecord,
      message: input.isMisconductFlagged
        ? "Score logged with Misconduct Flagged (Round score set to 0)."
        : "Round score successfully recorded!",
    };
  } catch (err: any) {
    console.error("logRoundScoreAction error:", err);
    return { success: false, error: err.message || "Failed to log score." };
  }
}

/**
  * Objective 4.4: Leaderboard & Tiebreaker Server Action
  * Top-3 tiebreaker logic:
  * Total Score = (Square One Points + Bonus Points - Penalties) + (Scotland Yard Points * Multiplier)
  * Scotland Yard scores act as a tiebreaker multiplier.
  * Secondary tiebreaker = completionTimeSeconds (lower is better).
  * Manual snapshot trigger pushes current rankings to `leaderboard_cache`.
  */
export async function publishLeaderboardSnapshotAction() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: "Unauthorized." };
    }

    // Get all active teams
    const allTeams = await db
      .select()
      .from(teams)
      .where(eq(teams.isDisqualified, false));

    // Get all round scores
    const allScores = await db.select().from(roundScoresAndAttendance);

    // Compute aggregated score for each team
    const teamStats = allTeams.map((team) => {
      const teamRoundScores = allScores.filter((s) => s.teamId === team.id);

      let totalSq = 0;
      let totalSy = 0;
      let totalBonus = 0;
      let totalPenalties = 0;
      let totalCompletionTime = 0;
      let isMisconducted = false;

      for (const score of teamRoundScores) {
        if (score.isMisconductFlagged) {
          isMisconducted = true;
        }
        totalSq += score.sqPoints;
        totalSy += score.syPoints;
        totalBonus += score.bonusPoints;
        totalPenalties += score.penalties;
        totalCompletionTime += score.completionTimeSeconds || 99999;
      }

      // Master Score Formula (Section 4.1 in further.md):
      // Total Score = Square One Points + Scotland Yard Points + Bonus Points - Penalties
      const totalScoreSum = totalSq + totalSy + totalBonus - totalPenalties;
      const finalCalculatedScore = Math.min(100, Math.max(0, totalScoreSum));

      return {
        teamId: team.id,
        teamCode: team.teamCode,
        totalScore: finalCalculatedScore,
        syScore: totalSy,
        completionTime: totalCompletionTime,
        isMisconducted,
      };
    });

    // Tiebreaker Algorithm (Section 5.2 in further.md):
    // 1. Primary Tiebreaker: Higher Scotland Yard score ranks higher.
    // 2. Secondary Tiebreaker: Lower completion time (seconds) ranks higher.
    teamStats.sort((a, b) => {
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      if (b.syScore !== a.syScore) return b.syScore - a.syScore;
      return a.completionTime - b.completionTime;
    });

    // Clear old leaderboard cache snapshot
    await db.delete(leaderboardCache);

    // Insert new snapshot entries with ranks
    for (let index = 0; index < teamStats.length; index++) {
      const item = teamStats[index];
      await db.insert(leaderboardCache).values({
        teamId: item.teamId,
        totalScore: item.totalScore,
        syScore: item.syScore,
        rank: index + 1,
      });
    }

    revalidatePath("/");
    revalidatePath("/admin");
    return {
      success: true,
      totalRanked: teamStats.length,
      message: `Published snapshot with ${teamStats.length} teams ranked!`,
    };
  } catch (err: any) {
    console.error("publishLeaderboardSnapshotAction error:", err);
    return { success: false, error: err.message || "Failed to publish snapshot." };
  }
}

/**
  * Objective 4.4: Get Published Leaderboard
  */
export async function getPublishedLeaderboard() {
  try {
    const list = await db
      .select({
        id: leaderboardCache.id,
        rank: leaderboardCache.rank,
        teamId: leaderboardCache.teamId,
        teamCode: teams.teamCode,
        totalScore: leaderboardCache.totalScore,
        syScore: leaderboardCache.syScore,
        publishedAt: leaderboardCache.publishedAt,
      })
      .from(leaderboardCache)
      .innerJoin(teams, eq(leaderboardCache.teamId, teams.id))
      .orderBy(asc(leaderboardCache.rank));

    return { success: true, data: list };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to fetch leaderboard." };
  }
}
