import Link from "next/link";
import { getDb } from "@/lib/db";
import { requireOwner } from "@/lib/owner";
export const dynamic = "force-dynamic";
export default async function ProjectsPage() {
  await requireOwner();
  const projects = await getDb().project.findMany({ orderBy: { updatedAt: "desc" } });
  return <main className="mx-auto min-h-screen max-w-4xl space-y-6 bg-slate-950 p-8 text-white"><Link href="/admin" className="text-violet-300">← Dashboard</Link><div className="flex items-center justify-between"><h1 className="text-3xl font-bold">Projects</h1><Link href="/admin/projects/new" className="rounded bg-violet-600 px-4 py-2">New project</Link></div>{projects.length === 0 ? <p>No projects yet.</p> : <ul className="space-y-3">{projects.map((project) => <li key={project.id} className="rounded border border-white/10 p-4"><Link className="font-semibold text-violet-300" href={`/admin/projects/${project.id}`}>{project.title}</Link><p className="text-sm text-slate-400">{project.status} · Updated {project.updatedAt.toISOString().slice(0, 10)}</p></li>)}</ul>}</main>;
}
