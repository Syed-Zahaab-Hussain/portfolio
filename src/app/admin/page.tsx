import { requireOwner } from "@/lib/owner";
import { Logout } from "./logout";
export const dynamic = "force-dynamic";
export default async function AdminPage() {
  await requireOwner();
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="text-3xl font-bold">Portfolio admin</h1>
      <p className="my-6">Content management will be added in a later phase.</p>
      <Logout />
    </main>
  );
}
