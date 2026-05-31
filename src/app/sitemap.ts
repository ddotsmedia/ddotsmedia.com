import type { MetadataRoute } from "next";
import { getPayloadClient, safeQuery } from "@/lib/payload";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const empty = { docs: [] as { slug?: string | null; updatedAt: string }[] };
  const [projects, posts] = await safeQuery(async () => {
    const payload = await getPayloadClient();
    return Promise.all([
      payload.find({ collection: "projects", limit: 500, depth: 0, select: { slug: true, updatedAt: true } }),
      payload.find({ collection: "posts", limit: 500, depth: 0, select: { slug: true, updatedAt: true } }),
    ]);
  }, [empty, empty]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/portfolio",
    "/services",
    "/about",
    "/contact",
    "/blog",
  ].map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: "monthly", priority: path === "" ? 1 : 0.7 }));

  const projectRoutes: MetadataRoute.Sitemap = projects.docs
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${siteUrl}/portfolio/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const postRoutes: MetadataRoute.Sitemap = posts.docs
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
