import { notFound } from "next/navigation";
import { requireOwner } from "@/lib/owner";
import { getDb } from "@/lib/db";
import { Editor } from "../editor";
export const dynamic = "force-dynamic";
export default async function EditProject({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  await requireOwner();
  const { id } = await params;
  const project = await getDb().project.findUnique({ where: { id } });
  if (!project) notFound();
  const { saved } = await searchParams;
  return <>{saved && <p role="status" className="bg-violet-900 p-3 text-center text-white">Project saved.</p>}<Editor project={project} /></>;
}
