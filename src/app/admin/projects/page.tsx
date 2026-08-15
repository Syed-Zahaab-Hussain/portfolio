import Link from "next/link";
import { Plus } from "lucide-react";
import { getDb } from "@/lib/db";
import { requireOwner } from "@/lib/owner";
import { Workspace } from "../workspace";
export const dynamic = "force-dynamic";
export default async function ProjectsPage() {
  await requireOwner();
  const projects = await getDb().project.findMany({ orderBy: { updatedAt: "desc" } });
  return <Workspace><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-semibold">Projects</h1><p className="mt-2 text-slate-400">Manage drafts and published work.</p></div><Link href="/admin/projects/new" className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold hover:bg-violet-400"><Plus size={18} /> New project</Link></div><div className="mt-8 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">{projects.length ? projects.map(project => <div key={project.id} className="flex flex-wrap items-center justify-between gap-4 p-5"><div className="min-w-0"><Link href={`/admin/projects/${project.id}`} className="break-words font-medium hover:text-violet-300">{project.title}</Link><p className="mt-1 text-sm text-slate-400">Updated {project.updatedAt.toISOString().slice(0,10)}</p></div><div className="flex items-center gap-5"><span className={`rounded-full px-3 py-1 text-xs font-medium ${project.status === 'DRAFT' ? 'bg-amber-400/10 text-amber-300' : 'bg-teal-400/10 text-teal-300'}`}>{project.status === 'DRAFT' ? 'Draft' : 'Published'}</span><Link className="text-sm text-violet-300" href={`/admin/projects/${project.id}`}>Edit</Link></div></div>) : <div className="p-8"><h2 className="font-medium">No projects yet</h2><p className="mt-2 text-sm text-slate-400">Create a draft to start showcasing your work.</p><Link href="/admin/projects/new" className="mt-4 inline-block text-sm text-violet-300">Create project →</Link></div>}</div></Workspace>;
}
