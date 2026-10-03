import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce
    .number()
    .int()
    .positive()
    .default(3000),

  DATABASE_URL: z.string().min(1),

  SESSION_COOKIE_NAME: z
    .string()
    .default("mega_session"),

  SESSION_DURATION_DAYS: z.coerce
    .number()
    .int()
    .positive()
    .default(7),
    TALLY_API_KEY: z.string().min(1),
    TALLY_FORM_ID: z.string().min(1),
});

export const env = envSchema.parse(process.env);