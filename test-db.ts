import dotenv from "dotenv";
import postgres from "postgres";

dotenv.config({ path: ".env.local" });

async function test() {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);

    const sql = postgres(process.env.DATABASE_URL!);

    try {
        const result = await sql`SELECT NOW()`;
        console.log("✅ DB CONNECTION SUCCESS:", result);
    } catch (error) {
        console.error("❌ DB CONNECTION FAILED:", error);
    } finally {
        await sql.end();
    }
}

test();