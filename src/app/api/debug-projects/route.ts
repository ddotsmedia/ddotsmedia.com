import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

// TEMPORARY diagnostic route — remove after the projects list is fixed.
export const dynamic = "force-dynamic";
const TOKEN = "dbg-7f3a9c21e5b84d06";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("t") !== TOKEN) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({ collection: "projects", limit: 50, depth: 0 });
    return NextResponse.json({ ok: true, totalDocs: res.totalDocs, ids: res.docs.map((d) => d.id) });
  } catch (err) {
    const e = err as Error & { data?: unknown; cause?: unknown };
    return NextResponse.json({
      ok: false,
      name: e.name,
      message: e.message,
      cause: e.cause ? String((e.cause as Error).message ?? e.cause) : null,
      data: e.data ?? null,
      stack: (e.stack ?? "").split("\n").slice(0, 8),
    }, { status: 500 });
  }
}
