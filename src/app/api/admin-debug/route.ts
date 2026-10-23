import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

// Protect with a simple key derived from PAYLOAD_SECRET
const DEBUG_KEY = process.env.ADMIN_DEBUG_KEY ?? "disabled";

export async function GET(req: NextRequest) {
  // Auth check
  const key = req.nextUrl.searchParams.get("key");
  if (key !== DEBUG_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, unknown> = {};
  const errors: Record<string, string> = {};

  // Step 1: Initialize Payload
  let payload: Awaited<ReturnType<typeof getPayload>>;
  try {
    payload = await getPayload({ config });
    results.payloadInit = "OK";
  } catch (err) {
    const e = err as Error;
    return NextResponse.json({
      step: "payloadInit",
      error: e.message,
      stack: e.stack,
      name: e.name,
    }, { status: 500 });
  }

  // Step 2: Probe every collection (find, limit 0 = just checks table exists)
  const collections = [
    "users", "media", "projects", "testimonials", "clients",
    "posts", "services", "team-members", "faq-items", "industries",
    "pricing-tiers", "contact-submissions", "newsletter-subscribers",
    "blog-categories", "awards", "partners", "job-listings",
  ];

  for (const slug of collections) {
    try {
      // @ts-expect-error dynamic slug
      const r = await payload.find({ collection: slug, limit: 0, depth: 0 });
      results[`collection:${slug}`] = `OK (totalDocs=${r.totalDocs})`;
    } catch (err) {
      errors[`collection:${slug}`] = (err as Error).message;
    }
  }

  // Step 3: Probe every global
  const globals = [
    "company-settings", "stats", "trust-bar", "process-steps",
    "homepage-hero", "navigation", "footer-settings", "seo-settings",
  ];

  for (const slug of globals) {
    try {
      // @ts-expect-error dynamic slug
      const g = await payload.findGlobal({ slug, depth: 0 });
      results[`global:${slug}`] = g ? "OK" : "null";
    } catch (err) {
      errors[`global:${slug}`] = (err as Error).message;
    }
  }

  // Step 4: DB raw ping
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (payload.db as any).pool?.query("SELECT 1");
    results.dbPing = "OK";
  } catch (err) {
    errors.dbPing = (err as Error).message;
  }

  return NextResponse.json({
    ok: Object.keys(errors).length === 0,
    results,
    errors,
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PAYLOAD_SECRET_SET: !!process.env.PAYLOAD_SECRET,
      DATABASE_URI_SET: !!process.env.DATABASE_URI,
      NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    },
  });
}
