import { getPayloadClient } from "@/lib/payload";
import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Ddotsmedia blog post";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    select: { title: true },
  });
  const post = docs[0];
  return renderOg({ eyebrow: "Blog", title: post?.title ?? "Article" });
}
