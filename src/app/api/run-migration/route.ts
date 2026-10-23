import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

// One-shot migration: add missing FK columns to payload_locked_documents_rels
// Run once, then delete this file.
export async function GET() {
  let payload: Awaited<ReturnType<typeof getPayload>>;
  try {
    payload = await getPayload({ config });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = (payload.db as any);
  const results: Record<string, string> = {};

  // Columns missing from payload_locked_documents_rels
  const missing = [
    { col: "blog_categories_id",          ref: "blog_categories" },
    { col: "newsletter_subscribers_id",   ref: "newsletter_subscribers" },
    { col: "contact_submissions_id",      ref: "contact_submissions" },
    { col: "awards_id",                   ref: "awards" },
    { col: "partners_id",                 ref: "partners" },
    { col: "job_listings_id",             ref: "job_listings" },
  ];

  for (const { col, ref } of missing) {
    try {
      await db.pool?.query(
        `ALTER TABLE "payload_locked_documents_rels"
           ADD COLUMN IF NOT EXISTS "${col}" integer
           REFERENCES "${ref}"("id") ON DELETE CASCADE`
      );
      results[col] = "OK";
    } catch (err) {
      results[col] = `ERROR: ${(err as Error).message}`;
    }
  }

  for (const { col } of missing) {
    const idxName = col.replace(/_id$/, "");
    try {
      await db.pool?.query(
        `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_${idxName}_id"
           ON "payload_locked_documents_rels"("${col}")`
      );
      results[`idx_${col}`] = "OK";
    } catch (err) {
      results[`idx_${col}`] = `ERROR: ${(err as Error).message}`;
    }
  }

  return NextResponse.json({ ok: true, results });
}
