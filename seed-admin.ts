import { db } from "@/db";
import { userRoles } from "@/db/schema";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function createAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "rambojambo123";

  try {
    // If SERVICE_ROLE_KEY is provided, bypass rate limit via admin API
    if (serviceRoleKey) {
      const adminClient = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const { data, error } = await adminClient.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
        user_metadata: { name: "Anirudh" },
      });

      let userId = data?.user?.id;
      if (!userId && error) {
        // Find existing user list
        const { data: usersData } = await adminClient.auth.admin.listUsers();
        const found = usersData?.users?.find((u) => u.email === adminEmail);
        if (found) {
          userId = found.id;
          await adminClient.auth.admin.updateUserById(userId, { password: adminPassword });
        }
      }

      if (userId) {
        await db
          .insert(userRoles)
          .values({ userId, role: "events_coordinator" })
          .onConflictDoUpdate({
            target: userRoles.userId,
            set: { role: "events_coordinator" },
          });
        console.log(`[SERVICE_ROLE] Successfully created/updated Admin user ${adminEmail} (Role: events_coordinator)!`);
        return;
      }
    }

    // Standard client attempt
    const supabase = createClient(supabaseUrl, anonKey);
    const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });

    let userId = signInData?.user?.id;
    if (!userId) {
      const { data: authData, error: signUpErr } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
        options: { data: { name: "Anirudh" } },
      });
      userId = authData?.user?.id;
      if (!userId) {
        console.log("SignUp error:", signUpErr?.message);
        console.log("SignIn error:", signInErr?.message);
      }
    }

    if (userId) {
      await db
        .insert(userRoles)
        .values({ userId, role: "events_coordinator" })
        .onConflictDoUpdate({
          target: userRoles.userId,
          set: { role: "events_coordinator" },
        });
      console.log(`Successfully assigned events_coordinator role to ${adminEmail}!`);
    } else {
      console.log("Could not obtain user ID for admin.");
    }
  } catch (e) {
    console.error("Failed to seed admin user:", e);
  }
}

createAdminUser();
