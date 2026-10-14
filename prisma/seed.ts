import { createSeedAuth } from "../src/lib/auth";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

class SeedError extends Error {}
let stage = "configuration validation";

async function main() {
  const email = process.env.OWNER_EMAIL?.trim().toLowerCase();
  const password = process.env.OWNER_PASSWORD;
  const name = process.env.OWNER_NAME?.trim() || "Portfolio owner";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || password.length < 12 || password.length > 128) {
    throw new SeedError("Configure a valid OWNER_EMAIL and OWNER_PASSWORD (12–128 characters).");
  }
  if (!process.env.DIRECT_URL?.trim()) throw new SeedError("DIRECT_URL is required for seeding.");
  try {
    const url = new URL(process.env.DIRECT_URL);
    if (!["postgres:", "postgresql:"].includes(url.protocol)) throw new Error();
  } catch { throw new SeedError("DIRECT_URL must be a valid PostgreSQL connection URL."); }
  if (!process.env.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET.length < 32) {
    throw new SeedError("BETTER_AUTH_SECRET must contain at least 32 characters.");
  }
  try {
    const url = new URL(process.env.BETTER_AUTH_URL ?? "");
    if (!["http:", "https:"].includes(url.protocol)) throw new Error();
  } catch { throw new SeedError("BETTER_AUTH_URL must be a valid HTTP(S) application URL."); }
  stage = "database client initialization";
  const db = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DIRECT_URL, connectionTimeoutMillis: 10000 }),
  });
  try {
    stage = "database connection (check DIRECT_URL, Neon availability, and TLS settings)";
    await db.$connect();
    stage = "owner lookup (check that Prisma migrations were applied to this database)";
    const owner = await db.user.findUnique({ where: { id: "portfolio-owner" } });
    if (owner) {
      if (owner.email.toLowerCase() !== email) throw new SeedError("The configured email differs from the existing owner.");
      console.log("Owner already exists; no changes made.");
      return;
    }
    if (await db.user.count()) throw new SeedError("An account already exists; owner creation refused.");
    stage = "Better Auth signup (check auth configuration, account conflicts, and authentication tables)";
    await createSeedAuth(db).api.signUpEmail({ body: { email, password, name } });
    console.log("Owner created. Sign in to the dashboard.");
  } finally { await db.$disconnect().catch(() => {}); }
}
main().catch((error: unknown) => {
  // Never print raw provider/Prisma errors: they can include connection details.
  console.error(error instanceof SeedError ? `Owner seed failed: ${error.message}` : `Owner seed failed during ${stage}.`);
  process.exitCode = 1;
});
