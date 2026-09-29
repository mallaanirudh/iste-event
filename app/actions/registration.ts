"use server";

import { db } from "@/db";
import { teams, participants, userRoles } from "@/db/schema";
import { createClient } from "@/utils/supabase/server";
import { eq, inArray, isNull, count, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type RegistrationMember = {
  name: string;
  email: string;
};

export type RegisterTeamInput = {
  isIndividual: boolean;
  members: RegistrationMember[];
};

/**
  * Helper to generate custom Team Code like #TEAM001, #TEAM002
  */
async function generateNextTeamCode(): Promise<string> {
  const result = await db.select({ value: count() }).from(teams);
  const total = result[0]?.value || 0;
  const nextNum = (total + 1).toString().padStart(3, "0");
  return `#TEAM${nextNum}`;
}

/**
  * Objective 4.1: Registration Server Action
  * Handles both 3-member team registrations & individual/solo registrations.
  */
export async function registerAction(input: RegisterTeamInput) {
  try {
    const supabase = await createClient();

    if (input.isIndividual) {
      if (!input.members[0] || !input.members[0].name || !input.members[0].email) {
        return { success: false, error: "Name and Email are required for solo registration." };
      }
      const solo = input.members[0];
      const password = (input.members[0] as any).password;

      if (!password) {
        return { success: false, error: "Password is required." };
      }

      // Password policy validation: min 8 chars, uppercase, lowercase, number, special char
      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passRegex.test(password)) {
        return {
          success: false,
          error: "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.",
        };
      }

      // Check if participant with same email already exists in Database
      const existing = await db
        .select()
        .from(participants)
        .where(eq(participants.email, solo.email.toLowerCase()));

      if (existing.length > 0) {
        return {
          success: false,
          error: `An account with email "${solo.email}" is already registered. Please log in instead.`,
        };
      }

      // Sign up user in Supabase Auth using the user-provided password
      const { data: authUser, error: authError } = await supabase.auth.signUp({
        email: solo.email.toLowerCase(),
        password: password,
        options: {
          data: { name: solo.name },
        },
      });

      if (authError) {
        return { success: false, error: authError.message };
      }

      const userId = authUser?.user?.id;
      if (!userId) {
        return { success: false, error: "Failed to create user account in Supabase Auth." };
      }

      // Record participant entry
      await db.insert(participants).values({
        id: userId,
        name: solo.name,
        email: solo.email,
        isIndividualRegistration: true,
        status: "unassigned",
      }).onConflictDoNothing();

      // Ensure user_roles has participant role
      await db.insert(userRoles).values({
        userId: userId,
        role: "participant",
      }).onConflictDoNothing();

      revalidatePath("/admin");
      revalidatePath("/dashboard");
      return { success: true, message: "Individual registration successful! You are in the unassigned pool." };
    }

    // 3-member team registration
    if (input.members.length !== 3) {
      return { success: false, error: "Team registration requires exactly 3 members." };
    }

    // Check if all 3 members are already registered solo players in the system
    const memberEmails = input.members.map((m) => m.email.toLowerCase());
    const existingParticipants = await db
      .select()
      .from(participants)
      .where(inArray(participants.email, memberEmails));

    if (existingParticipants.length < 3) {
      const existingEmails = new Set(existingParticipants.map((p) => p.email.toLowerCase()));
      const missingEmails = memberEmails.filter((e) => !existingEmails.has(e));
      return {
        success: false,
        error: `All team members must first register as solo players. The following email(s) are not registered yet: ${missingEmails.join(", ")}`,
      };
    }

    // Create Team record
    const teamCode = await generateNextTeamCode();
    const [insertedTeam] = await db.insert(teams).values({
      teamCode,
      isAutoGrouped: false,
      isDisqualified: false,
    }).returning();

    for (const member of existingParticipants) {
      await db
        .update(participants)
        .set({ teamId: insertedTeam.id, status: "assigned" })
        .where(eq(participants.id, member.id));
    }

    revalidatePath("/admin");
    revalidatePath("/dashboard");
    return {
      success: true,
      teamCode: insertedTeam.teamCode,
      message: `Team registered successfully with code ${insertedTeam.teamCode}!`,
    };
  } catch (err: any) {
    console.error("registerAction error:", err);
    return { success: false, error: err.message || "Registration failed due to server error." };
  }
}

/**
  * Objective 4.2: Team Management Server Actions
  * Auto-grouping algorithm to combine 3 unassigned solo registrants into a team with custom #TEAM code.
  */
export async function autoGroupSolosAction() {
  try {
    // Fetch unassigned solo participants
    const unassigned = await db
      .select()
      .from(participants)
      .where(and(eq(participants.isIndividualRegistration, true), isNull(participants.teamId)));

    if (unassigned.length < 3) {
      return {
        success: false,
        error: `Not enough unassigned solo registrants to form a 3-member team (found ${unassigned.length}, need at least 3).`,
      };
    }

    let teamsCreatedCount = 0;
    const numTeamsToForm = Math.floor(unassigned.length / 3);

    for (let i = 0; i < numTeamsToForm; i++) {
      const trio = unassigned.slice(i * 3, (i + 1) * 3);
      const teamCode = await generateNextTeamCode();

      // Insert new auto-grouped team
      const [newTeam] = await db.insert(teams).values({
        teamCode,
        isAutoGrouped: true,
        isDisqualified: false,
      }).returning();

      // Update teamId and status for all 3 members
      const trioIds = trio.map((m: any) => m.id);
      await db
        .update(participants)
        .set({ teamId: newTeam.id, status: "assigned" })
        .where(inArray(participants.id, trioIds));

      teamsCreatedCount++;
    }

    revalidatePath("/admin");
    revalidatePath("/dashboard");
    return {
      success: true,
      teamsCreated: teamsCreatedCount,
      message: `Successfully auto-grouped ${teamsCreatedCount * 3} solo registrants into ${teamsCreatedCount} team(s)!`,
    };
  } catch (err: any) {
    console.error("autoGroupSolosAction error:", err);
    return { success: false, error: err.message || "Auto-grouping failed." };
  }
}

/**
  * Objective 4.2: Member Substitution & Withdrawal Workflow
  */
export async function updateTeamMemberAction(participantId: string, newName: string, newEmail: string) {
  try {
    await db
      .update(participants)
      .set({ name: newName, email: newEmail })
      .where(eq(participants.id, participantId));

    revalidatePath("/dashboard");
    revalidatePath("/admin");
    return { success: true, message: "Participant details updated successfully." };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update participant." };
  }
}

export async function withdrawParticipantAction(participantId: string) {
  try {
    await db
      .update(participants)
      .set({ teamId: null, status: "withdrawn" })
      .where(eq(participants.id, participantId));

    revalidatePath("/dashboard");
    revalidatePath("/admin");
    return { success: true, message: "Participant withdrawn from team." };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to withdraw participant." };
  }
}
