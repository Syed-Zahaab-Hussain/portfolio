import { notFound } from "next/navigation";
import { ProjectDetails } from "@/components/server/ProjectDetails";
import { projects } from "@/data/projects";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <ProjectDetails project={{ ...project, demoUrl: project.demoLink ?? null, sourceUrl: project.repoLink ?? null }} />;
}
