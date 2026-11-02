import { getPayloadClient } from "@/lib/payload";
import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Ddotsmedia project";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "projects",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    select: { title: true, category: true },
  });
  const project = docs[0];
  return renderOg({
    eyebrow: project?.category ?? "Portfolio",
    title: project?.title ?? "Project",
  });
}
