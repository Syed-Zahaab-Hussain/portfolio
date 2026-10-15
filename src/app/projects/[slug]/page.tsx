import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { ProjectDetails } from "@/components/server/ProjectDetails";
export const dynamic = "force-dynamic";
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = await getDb().project.findFirst({ where: { slug, status: "PUBLISHED" } }); if (!project) notFound(); return <ProjectDetails project={project} />; }
