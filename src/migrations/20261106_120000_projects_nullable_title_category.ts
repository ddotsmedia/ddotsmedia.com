import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// The original migration created title/category as NOT NULL, but the Projects
// collection only requires liveUrl. When category is omitted or the URL metadata
// fetch fails (leaving title empty), the DB throws a NOT NULL violation → 500.
// This migration drops those constraints so the collection config is the source
// of truth for validation.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "projects" ALTER COLUMN "title" DROP NOT NULL;
    ALTER TABLE "projects" ALTER COLUMN "category" DROP NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "projects" ALTER COLUMN "title" SET NOT NULL;
    ALTER TABLE "projects" ALTER COLUMN "category" SET NOT NULL;
  `)
}
