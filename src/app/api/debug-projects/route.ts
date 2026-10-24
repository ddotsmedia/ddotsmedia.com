import { NextRequest, NextResponse } from "next/server";
import { createElement } from "react";
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
    stage.push(`docs=${res.docs.length}`);
    const { renderToStaticMarkup } = await import("react-dom/server");
    stage.push("renderer loaded");
    for (const d of res.docs) {
      const html = renderToStaticMarkup(createElement(ProjectCard, { project: d }));
      stage.push(`card ok id=${d.id} len=${html.length}`);
    }
    return NextResponse.json({ ok: true, stage });
  } catch (err) {
    const e = err as Error;
    return NextResponse.json({
      ok: false, stage, name: e.name, message: e.message,
      stack: (e.stack ?? "").split("\n").slice(0, 8),
    }, { status: 500 });
  }
}
