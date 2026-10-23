import { getPayloadClient } from "@/lib/payload";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const MONITOR_KEY =
  process.env.MONITOR_KEY ?? process.env.PAYLOAD_SECRET?.slice(0, 16) ?? "";

const COLLECTIONS = [
  "awards", "blog-categories", "clients", "contact-submissions",
  "faq-items", "industries", "job-listings", "media",
  "newsletter-subscribers", "partners", "posts", "pricing-tiers",
  "projects", "services", "team-members", "testimonials",
] as const;

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (!MONITOR_KEY || key !== MONITOR_KEY) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const start = Date.now();
  const mem = process.memoryUsage();

  let dbStatus = "unknown";
  let dbLatencyMs = 0;
  const collections: Record<string, number> = {};

  try {
    const payload = await getPayloadClient();
    const dbStart = Date.now();

    const counts = await Promise.all(
      COLLECTIONS.map((c) => payload.count({ collection: c as any }))
    );

    dbLatencyMs = Date.now() - dbStart;
    dbStatus = "connected";
    COLLECTIONS.forEach((c, i) => {
      collections[c] = counts[i].totalDocs;
    });
  } catch (err) {
    dbStatus = `error: ${err instanceof Error ? err.message : String(err)}`;
  }

  const heapUsedMB = Math.round(mem.heapUsed / 1024 / 1024);
  const heapTotalMB = Math.round(mem.heapTotal / 1024 / 1024);
  const rssMB = Math.round(mem.rss / 1024 / 1024);

  return Response.json({
    status: dbStatus === "connected" ? "healthy" : "degraded",
    ts: Date.now(),
    responseMs: Date.now() - start,
    system: {
      uptimeSeconds: Math.floor(process.uptime()),
      nodeVersion: process.version,
      memory: {
        heapUsedMB,
        heapTotalMB,
        heapUsedPct: Math.round((heapUsedMB / heapTotalMB) * 100),
        rssMB,
        externalMB: Math.round(mem.external / 1024 / 1024),
      },
    },
    database: {
      status: dbStatus,
      latencyMs: dbLatencyMs,
      collections,
      totals: {
        content: (collections["posts"] ?? 0) + (collections["projects"] ?? 0) + (collections["services"] ?? 0),
        crm: (collections["contact-submissions"] ?? 0) + (collections["newsletter-subscribers"] ?? 0),
        team: (collections["team-members"] ?? 0) + (collections["clients"] ?? 0) + (collections["partners"] ?? 0),
      },
    },
    queues: {
      activeJobListings: collections["job-listings"] ?? null,
      pendingContactSubmissions: collections["contact-submissions"] ?? null,
      newsletterSubscribers: collections["newsletter-subscribers"] ?? null,
      mediaAssets: collections["media"] ?? null,
    },
  });
}
