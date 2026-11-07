import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// The original migration created slug as NOT NULL, but the collection config
// does not mark it required — it auto-generates in the beforeChange hook.
// Drop the NOT NULL constraint so Payload validation is the source of truth.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "projects" ALTER COLUMN "slug" DROP NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "projects" ALTER COLUMN "slug" SET NOT NULL;
  `)
}
