"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { requireOwner } from "@/lib/owner";

export type ProjectActionState = { errors?: Record<string, string>; message?: string };

export async function saveProject(_state: ProjectActionState, form: FormData): Promise<ProjectActionState> {
  await requireOwner();
  const read = (key: string) => String(form.get(key) ?? "").trim();
  const id = read("id");
  const intent = read("intent");
  const db = getDb();
  let destination = "";
  try {
    const existing = id ? await db.project.findUnique({ where: { id } }) : null;
    if (id && !existing) return { message: "This project no longer exists." };
    if (!id && intent !== "save") return { message: "Save the draft before publishing." };
    if (existing && existing.updatedAt.toISOString() !== read("updatedAt")) return { message: "This project changed in another session. Copy your edits, then reload the page before saving." };
    if (intent === "unpublish") {
      if (!existing || existing.status !== "PUBLISHED") return { message: "This project is already a draft. Reload the page." };
      const result = await db.project.updateMany({ where: { id, updatedAt: existing.updatedAt, status: "PUBLISHED" }, data: { status: "DRAFT" } });
      if (!result.count) return { message: "This project changed in another session. Reload the page." };
      revalidatePath("/");
      revalidatePath(`/projects/${existing.slug}`);
      destination = `/admin/projects/${id}?saved=unpublished`;
    } else {
      if (intent !== "save" && intent !== "publish") return { message: "Invalid action. Reload the page and try again." };
      const title = read("title");
      const requestedSlug = read("slug").toLowerCase();
      let slug = requestedSlug || title.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const summary = read("summary");
      const description = read("description");
      const tech = read("tech").split(",").map(item => item.trim()).filter(Boolean);
      const demoUrl = read("demoUrl") || null;
      const sourceUrl = read("sourceUrl") || null;
      const status: "PUBLISHED" | "DRAFT" = intent === "publish" || existing?.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
      const errors: Record<string, string> = {};
      if (!title || title.length > 120) errors.title = "Enter a title of up to 120 characters.";
      if (!slug || slug.length > 140 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) errors.slug = "Use lowercase letters, numbers, and hyphens for the URL.";
      if (existing?.publishedAt && existing.slug !== slug) errors.slug = "The URL cannot be changed after publication.";
      if (summary.length > 500 || (status === "PUBLISHED" && !summary)) errors.summary = "Add a summary of up to 500 characters before publishing.";
      if (description.length > 20000) errors.description = "Description must be at most 20,000 characters.";
      if (tech.length > 30 || tech.some(item => item.length > 50)) errors.tech = "Enter up to 30 technologies, each at most 50 characters.";
      for (const [key, url] of [["demoUrl", demoUrl], ["sourceUrl", sourceUrl]] as const) {
        if (url) { try { if (!["http:", "https:"].includes(new URL(url).protocol)) throw new Error(); } catch { errors[key] = "Enter a valid HTTP or HTTPS URL."; } }
      }
      if (Object.keys(errors).length) return { errors, message: "Check the highlighted fields." };
      if (!id && !requestedSlug) {
        const base = slug.slice(0, 130);
        let suffix = 2;
        while (await db.project.findUnique({ where: { slug } })) slug = `${base}-${suffix++}`;
      }
      const data = { title, slug, summary, description, tech: [...new Set(tech)], demoUrl, sourceUrl, status, publishedAt: existing?.publishedAt ?? (status === "PUBLISHED" ? new Date() : null) };
      if (existing) {
        const result = await db.project.updateMany({ where: { id, updatedAt: existing.updatedAt, status: existing.status, publishedAt: existing.publishedAt }, data });
        if (!result.count) return { message: "This project changed in another session. Copy your edits, then reload the page before saving." };
        if (existing.slug !== slug) revalidatePath(`/projects/${existing.slug}`);
        destination = `/admin/projects/${id}?saved=1`;
      } else {
        let project;
        for (let attempt = 0; attempt < 5; attempt++) {
          try {
            project = await db.project.create({ data: { ...data, slug } });
            break;
          } catch (error) {
            if (requestedSlug || typeof error !== "object" || error === null || !("code" in error) || error.code !== "P2002") throw error;
            const base = data.slug.slice(0, 130);
            let suffix = 2;
            while (await db.project.findUnique({ where: { slug } })) slug = `${base}-${suffix++}`;
          }
        }
        if (!project) return { message: "Unable to reserve a URL. Please try again." };
        destination = `/admin/projects/${project.id}?saved=1`;
      }
      revalidatePath("/");
      revalidatePath(`/projects/${slug}`);
    }
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    if (id) { revalidatePath(`/admin/projects/${id}`); revalidatePath(`/admin/projects/${id}/preview`); }
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") return { errors: { slug: "This URL is already in use. Choose another." }, message: "Check the highlighted fields." };
    console.error("Unable to save project", error);
    return { message: "Unable to save the project. Your edits are still here, so you can try again." };
  }
  redirect(destination);
}
