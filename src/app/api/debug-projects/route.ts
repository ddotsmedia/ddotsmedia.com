import { NextRequest, NextResponse } from "next/server";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { getPayloadClient } from "@/lib/payload";
import { ProjectCard } from "@/components/portfolio/ProjectCard";

// TEMPORARY diagnostic route — remove after the homepage crash is fixed.
export const dynamic = "force-dynamic";
const TOKEN = "dbg-7f3a9c21e5b84d06";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("t") !== TOKEN) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const stage: string[] = [];
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "projects",
      where: { featured: { equals: true } },
      sort: ["order", "-createdAt"],
      limit: 12,
      depth: 1,
    });
    stage.push(`query ok: ${res.docs.length} docs`);
    const summary = res.docs.map((d) => ({
      id: d.id,
      slug: d.slug,
      category: d.category,
      coverImage: d.coverImage && typeof d.coverImage !== "number"
        ? { url: d.coverImage.url, sizes: Object.keys(d.coverImage.sizes ?? {}), feature: d.coverImage.sizes?.feature?.url }
        : d.coverImage,
      techStack: d.techStack,
      createdAt: d.createdAt,
    }));
    for (const d of res.docs) {
      stage.push(`render id=${d.id}`);
      renderToString(createElement(ProjectCard, { project: d }));
    }
    return NextResponse.json({ ok: true, stage, summary });
  } catch (err) {
    const e = err as Error;
    return NextResponse.json({
      ok: false,
      stage,
      name: e.name,
      message: e.message,
      stack: (e.stack ?? "").split("\n").slice(0, 10),
    }, { status: 500 });
  }
}
