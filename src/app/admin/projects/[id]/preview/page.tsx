import { notFound } from "next/navigation";
import { requireOwner } from "@/lib/owner";
import { getDb } from "@/lib/db";
import { ProjectDetails } from "@/components/server/ProjectDetails";
export const dynamic = "force-dynamic";
export default async function Preview({ params }: { params: Promise<{ id: string }> }) { await requireOwner(); const { id } = await params; const project = await getDb().project.findUnique({ where: { id } }); if (!project) notFound(); return <ProjectDetails project={project} preview />; }
