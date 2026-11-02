import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const start = Date.now();
    await payload.count({ collection: "projects" });
    return Response.json({ status: "ready", dbLatencyMs: Date.now() - start });
  } catch (err) {
    return Response.json(
      { status: "not_ready", error: err instanceof Error ? err.message : String(err) },
      { status: 503 }
    );
  }
}
