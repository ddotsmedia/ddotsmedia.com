// Liveness probe for CI deploy + Docker healthcheck. No DB access on purpose.
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok", ts: Date.now() });
}
