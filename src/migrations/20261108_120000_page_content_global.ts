import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "page_content" (
      "id" serial PRIMARY KEY,
      "about_overline" varchar,
      "about_heading" varchar,
      "about_subtext" text,
      "services_overline" varchar,
      "services_heading" varchar,
      "services_subtext" text,
      "contact_overline" varchar,
      "contact_heading" varchar,
      "contact_subtext" text,
      "portfolio_overline" varchar,
      "portfolio_heading" varchar,
      "portfolio_subtext" text,
      "blog_overline" varchar,
      "blog_heading" varchar,
      "blog_subtext" text,
      "careers_overline" varchar,
      "careers_heading" varchar,
      "careers_subtext" text,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "page_content";`)
}
