"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { requireOwner } from "@/lib/owner";

export async function saveProject(form: FormData) {
  await requireOwner();
  const read = (key: string) => String(form.get(key) ?? "").trim();
  const id = read("id");
  const title = read("title");
  const requestedSlug = read("slug").toLowerCase();
  let slug = requestedSlug || title.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const summary = read("summary");
  const description = read("description");
  const status: "PUBLISHED" | "DRAFT" = read("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
  const tech = read("tech").split(",").map((item) => item.trim()).filter(Boolean);
  const demoUrl = read("demoUrl") || null;
  const sourceUrl = read("sourceUrl") || null;
  if (!title || title.length > 120 || !slug || slug.length > 140 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || summary.length > 500 || description.length > 20000 || tech.length > 30 || tech.some((item) => item.length > 50) || (status === "PUBLISHED" && !summary)) throw new Error("Please check the project title, slug, summary, and field lengths.");
  for (const url of [demoUrl, sourceUrl]) {
    if (url) {
      try { const parsed = new URL(url); if (!["http:", "https:"].includes(parsed.protocol)) throw new Error(); }
      catch { throw new Error("Project links must be valid HTTP or HTTPS URLs."); }
    }
  }
  const db = getDb();
  const existing = id ? await db.project.findUnique({ where: { id } }) : null;
  if (id && !existing) throw new Error("Project not found.");
  if (!id && !requestedSlug) {
    const base = slug.slice(0, 130);
    let suffix = 2;
    while (await db.project.findUnique({ where: { slug } })) slug = `${base}-${suffix++}`;
  }
  if (existing?.publishedAt && existing.slug !== slug) throw new Error("A published project's slug cannot be changed.");
  const data = { title, slug, summary, description, tech: [...new Set(tech)], demoUrl, sourceUrl, status, publishedAt: existing?.publishedAt ?? (status === "PUBLISHED" ? new Date() : null) };
  const project = id ? await db.project.update({ where: { id }, data }) : await db.project.create({ data });
  revalidatePath("/");
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/admin/projects");
  redirect(`/admin/projects/${project.id}?saved=1`);
}
