import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth, OWNER_ID } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { canAccessAdmin } from "@/lib/owner-policy";
import { Frame } from "../frame";
import { Login } from "./login-form";
export const dynamic = "force-dynamic";
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const { mode } = await searchParams;
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (session?.user.id === OWNER_ID) {
    const stored = await getDb().session.findUnique({ where: { id: session.session.id }, include: { user: true } });
    if (stored && canAccessAdmin(stored, stored.user)) redirect("/admin");
  }
  return (
    <Frame>
      <Login initialForgot={mode === "reset"} />
    </Frame>
  );
}
