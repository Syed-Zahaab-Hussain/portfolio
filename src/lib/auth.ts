import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
import { getDb } from "@/lib/db";
import type { PrismaClient } from "@/generated/prisma/client";

export { OWNER_ID } from "./owner-policy";

function createAuth(seedOnly = false, database?: PrismaClient) {
  if (
    !process.env.BETTER_AUTH_SECRET ||
    process.env.BETTER_AUTH_SECRET.length < 32 ||
    !process.env.BETTER_AUTH_URL
  ) {
    throw new Error("BETTER_AUTH_SECRET and BETTER_AUTH_URL are required");
  }
  return betterAuth({
    appName: "Portfolio Admin",
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    database: prismaAdapter(database ?? getDb(), { provider: "postgresql" }),
    logger: { disabled: seedOnly },
    emailAndPassword: {
      enabled: true,
      disableSignUp: !seedOnly,
      minPasswordLength: 12,
      revokeSessionsOnPasswordReset: true,
      sendResetPassword: async ({ user, url }) => {
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD)
          throw new Error("Email is not configured");
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: user.email,
          subject: "Portfolio password reset",
          text: `Use this link to reset your portfolio admin password: ${url}`,
        });
      },
    },
    session: {
      expiresIn: 60 * 60 * 24,
      updateAge: 60 * 60,
      cookieCache: { enabled: false },
    },
    rateLimit: {
      enabled: true,
      storage: "database",
      window: 60,
      max: 30,
      customRules: {
        "/sign-in/email": { window: 60, max: 5 },
        "/request-password-reset": { window: 60, max: 3 },
      },
    },
    advanced: {
      useSecureCookies: process.env.NODE_ENV === "production",
      ipAddress: { ipAddressHeaders: ["x-real-ip"] },
      ...(seedOnly ? { database: { generateId: ({ model }: { model: string }) => model === "user" ? "portfolio-owner" : crypto.randomUUID() } } : {}),
    },
  });
}

// Only the explicitly executed local seed imports this instance; the HTTP
// handler always uses getAuth(), whose signup endpoint stays disabled.
export function createSeedAuth(database: PrismaClient) {
  return createAuth(true, database);
}

let instance: ReturnType<typeof createAuth> | undefined;
export function getAuth() {
  return (instance ??= createAuth());
}
