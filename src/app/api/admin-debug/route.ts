import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

// TODO: Remove this endpoint once root cause is identified
export async function GET() {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = (payload.db as any);

  // Step 2: Check columns in payload_locked_documents_rels
  try {
    const colsResult = await db.pool?.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'payload_locked_documents_rels'
      ORDER BY column_name
    `);
    results["locked_docs_rels_columns"] = colsResult?.rows?.map((r: {column_name: string}) => r.column_name) ?? "no result";
  } catch (err) {
    errors["locked_docs_rels_columns"] = (err as Error).message;
  }

  // Step 3: Run the EXACT failing query (simplified) to get the real PG error
  try {
    await db.pool?.query(`
      SELECT "payload_locked_documents_rels"."job_listings_id",
             "payload_locked_documents_rels"."partners_id",
             "payload_locked_documents_rels"."awards_id",
             "payload_locked_documents_rels"."blog_categories_id"
      FROM "payload_locked_documents_rels" LIMIT 1
    `);
    results["locked_docs_rels_new_cols"] = "OK - all new columns exist";
  } catch (err) {
    errors["locked_docs_rels_new_cols"] = (err as Error).message;
  }

  // Step 4: Count locked docs
  try {
    const r = await db.pool?.query(`SELECT count(*) FROM payload_locked_documents`);
    results["locked_docs_count"] = r?.rows?.[0]?.count ?? "unknown";
  } catch (err) {
    errors["locked_docs_count"] = (err as Error).message;
  }

  return NextResponse.json({
    ok: Object.keys(errors).length === 0,
    results,
    errors,
  });
}
