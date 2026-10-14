import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth, OWNER_ID } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { canAccessAdmin } from "@/lib/owner-policy";

export async function requireOwner() {
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session || session.user.id !== OWNER_ID) redirect("/admin/login");
  const stored = await getDb().session.findUnique({
    where: { id: session.session.id },
    include: { user: true },
  });
  if (!stored || !canAccessAdmin(stored, stored.user)) redirect("/admin/login");
  return session;
}
