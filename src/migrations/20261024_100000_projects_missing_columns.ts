import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Adds columns that the Projects schema declares but no migration created.
// Additive and nullable: existing rows are untouched.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "tags" varchar;
    ALTER TABLE "projects_gallery" ADD COLUMN IF NOT EXISTS "caption" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "projects_gallery" DROP COLUMN IF EXISTS "caption";
    ALTER TABLE "projects" DROP COLUMN IF EXISTS "tags";
  `)
}
