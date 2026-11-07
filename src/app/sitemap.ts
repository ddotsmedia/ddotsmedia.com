import type { MetadataRoute } from "next";
import { getPayloadClient, safeQuery } from "@/lib/payload";
import { SERVICES } from "@/lib/data/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ddotsmedia.com";

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
    { path: "", priority: 1.0 },
    { path: "/services", priority: 0.9 },
    { path: "/portfolio", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/blog", priority: 0.7 },
    { path: "/careers", priority: 0.6 },
  ].map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.docs
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${siteUrl}/portfolio/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const postRoutes: MetadataRoute.Sitemap = posts.docs
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...postRoutes];
}
