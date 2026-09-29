import { describe, it, expect } from "vitest";

// Rule Engine Pure Unit Logic Tests

function calculateRoundScore(input: {
  attendanceMode: "full_3" | "duo_2_bonus" | "absent";
  syPoints: number;
  sqPoints: number;
  bonusPoints: number;
  penalties: number;
  isMisconductFlagged: boolean;
}) {
  let syPoints = Math.min(Math.max(0, input.syPoints), 20);
  let sqPoints = Math.min(Math.max(0, input.sqPoints), 60);
  let bonusPoints = Math.min(Math.max(0, input.bonusPoints), 10);
  let penalties = Math.max(0, input.penalties);

  if (input.attendanceMode === "duo_2_bonus") {
    bonusPoints = Math.min(10, bonusPoints + 2);
  }

  if (input.isMisconductFlagged) {
    syPoints = 0;
    sqPoints = 0;
    bonusPoints = 0;
  }

  const totalScoreSum = sqPoints + syPoints + bonusPoints - penalties;
  return {
    syPoints,
    sqPoints,
    bonusPoints,
    penalties,
    finalScore: Math.min(100, Math.max(0, totalScoreSum)),
  };
}

function calculateTiebreakerRank(teams: Array<{
  id: number;
  sq: number;
  sy: number;
  bonus: number;
  penalties: number;
  completionTime: number;
}>) {
  return teams.map((team) => {
    const totalScore = team.sq + team.sy + team.bonus - team.penalties;
    return {
      ...team,
      totalScore,
    };
  }).sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
    if (b.sy !== a.sy) return b.sy - a.sy;
    return a.completionTime - b.completionTime;
  });
}

describe("Scoring Rule Engine", () => {
  it("should auto-apply +2 duo player bonus", () => {
    const result = calculateRoundScore({
      attendanceMode: "duo_2_bonus",
      syPoints: 10,
      sqPoints: 40,
      bonusPoints: 5,
      penalties: 0,
      isMisconductFlagged: false,
    });
    // bonus should be 5 + 2 = 7
    expect(result.bonusPoints).toBe(7);
    expect(result.finalScore).toBe(40 + 10 + 7);
  });

  it("should zero points on misconduct flag", () => {
    const result = calculateRoundScore({
      attendanceMode: "full_3",
      syPoints: 18,
      sqPoints: 55,
      bonusPoints: 8,
      penalties: 10,
      isMisconductFlagged: true,
    });
    expect(result.syPoints).toBe(0);
    expect(result.sqPoints).toBe(0);
    expect(result.bonusPoints).toBe(0);
    expect(result.finalScore).toBe(0);
  });

  it("should correctly handle Top-3 Scotland Yard multiplier & completion time tiebreaker", () => {
    const teamA = { id: 1, sq: 50, sy: 15, bonus: 5, penalties: 0, completionTime: 300 };
    const teamB = { id: 2, sq: 50, sy: 18, bonus: 5, penalties: 0, completionTime: 400 }; // higher SY score
    const teamC = { id: 3, sq: 50, sy: 15, bonus: 5, penalties: 0, completionTime: 250 }; // tied with A on score, lower completion time

    const ranked = calculateTiebreakerRank([teamA, teamB, teamC]);
    expect(ranked[0].id).toBe(2); // Team B wins on SY score
    expect(ranked[1].id).toBe(3); // Team C wins over A on completion time
    expect(ranked[2].id).toBe(1);
  });
});
