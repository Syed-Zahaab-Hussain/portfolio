import Link from "next/link";
import { Workspace } from "@/app/admin/workspace";
import { notFound } from "next/navigation";
import { requireOwner } from "@/lib/owner";
import { getDb } from "@/lib/db";
import { ProjectDetails } from "@/components/server/ProjectDetails";
export const dynamic = "force-dynamic";
export default async function Preview({ params }: { params: Promise<{ id: string }> }) { await requireOwner(); const { id } = await params; const project = await getDb().project.findUnique({ where: { id } }); if (!project) notFound(); return <Workspace><div className="rounded-xl border border-violet-400/20 bg-violet-400/5 p-4"><p className="font-semibold">Private preview</p><p className="mt-1 text-sm text-slate-400">Showing the last saved version.</p><Link className="mt-2 inline-block text-sm text-violet-300" href={`/admin/projects/${id}`}>Back to editor</Link></div><ProjectDetails project={project} preview /></Workspace>; }
