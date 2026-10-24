import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

// TEMPORARY diagnostic route — remove after the homepage crash is fixed.
export const dynamic = "force-dynamic";
const TOKEN = "dbg-7f3a9c21e5b84d06";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("t") !== TOKEN) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "projects",
      where: { featured: { equals: true } },
      sort: ["order", "-createdAt"],
      limit: 12,
      depth: 1,
    });
    const docs = res.docs.map((d) => ({
      id: d.id,
      title: d.title,
      slug: d.slug,
      category: d.category,
      status: d.status,
      featured: d.featured,
      order: d.order,
      createdAt: d.createdAt,
      techStack: d.techStack,
      gallery: d.gallery,
      coverImage: d.coverImage && typeof d.coverImage !== "number"
        ? { url: d.coverImage.url, filename: d.coverImage.filename, mimeType: d.coverImage.mimeType, width: d.coverImage.width, height: d.coverImage.height, alt: d.coverImage.alt, sizes: d.coverImage.sizes }
        : d.coverImage,
    }));
    return NextResponse.json({ ok: true, count: docs.length, docs });
  } catch (err) {
    const e = err as Error;
    return NextResponse.json({ ok: false, name: e.name, message: e.message }, { status: 500 });
  }
}
