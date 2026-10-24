import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- ENUMs
    CREATE TYPE "public"."enum_contact_submissions_service_interest" AS ENUM(
      'web-development', 'mobile-apps', 'custom-software', 'ui-ux-design',
      'cloud-devops', 'erp-systems', 'other'
    );
    CREATE TYPE "public"."enum_contact_submissions_status" AS ENUM('new', 'read', 'replied', 'archived');
    CREATE TYPE "public"."enum_newsletter_subscribers_status" AS ENUM('active', 'unsubscribed');
    CREATE TYPE "public"."enum_partners_type" AS ENUM('technology', 'business', 'media', 'community');
    CREATE TYPE "public"."enum_job_listings_department" AS ENUM(
      'engineering', 'design', 'project-management', 'sales', 'marketing', 'operations'
    );
    CREATE TYPE "public"."enum_job_listings_location_type" AS ENUM('onsite', 'remote', 'hybrid');
    CREATE TYPE "public"."enum_job_listings_employment_type" AS ENUM('full-time', 'part-time', 'freelance', 'internship');

    -- contact_submissions
    CREATE TABLE "contact_submissions" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "email" varchar NOT NULL,
      "phone" varchar,
      "company" varchar,
      "service_interest" "enum_contact_submissions_service_interest",
      "message" text NOT NULL,
      "status" "enum_contact_submissions_status" DEFAULT 'new',
      "notes" text,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    -- newsletter_subscribers
    CREATE TABLE "newsletter_subscribers" (
      "id" serial PRIMARY KEY NOT NULL,
      "email" varchar NOT NULL,
      "name" varchar,
      "status" "enum_newsletter_subscribers_status" DEFAULT 'active',
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE UNIQUE INDEX "newsletter_subscribers_email_idx" ON "newsletter_subscribers" USING btree ("email");

    -- blog_categories
    CREATE TABLE "blog_categories" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "description" varchar,
      "color" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE UNIQUE INDEX "blog_categories_slug_idx" ON "blog_categories" USING btree ("slug");

    -- awards
    CREATE TABLE "awards" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "organization" varchar,
      "year" numeric,
      "description" varchar,
      "image_id" integer,
      "order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    -- partners
    CREATE TABLE "partners" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "logo_id" integer,
      "website" varchar,
      "type" "enum_partners_type" DEFAULT 'technology',
      "active" boolean DEFAULT true,
      "order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    -- job_listings
    CREATE TABLE "job_listings" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar,
      "department" "enum_job_listings_department",
      "location" varchar,
      "location_type" "enum_job_listings_location_type" DEFAULT 'hybrid',
      "employment_type" "enum_job_listings_employment_type" DEFAULT 'full-time',
      "salary_range" varchar,
      "short_description" varchar,
      "description" jsonb,
      "requirements" jsonb,
      "active" boolean DEFAULT true,
      "order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    -- homepage_hero (global)
    CREATE TABLE "homepage_hero" (
      "id" serial PRIMARY KEY NOT NULL,
      "badge_text" varchar,
      "headline" varchar,
      "headline_highlight" varchar,
      "subheading" text,
      "cta_primary_text" varchar,
      "cta_primary_link" varchar,
      "cta_secondary_text" varchar,
      "cta_secondary_link" varchar,
      "video_bg_url" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    -- navigation (global)
    CREATE TABLE "navigation" (
      "id" serial PRIMARY KEY NOT NULL,
      "cta_text" varchar,
      "cta_link" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE TABLE "navigation_menu_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "link" varchar NOT NULL,
      "open_in_new_tab" boolean DEFAULT false
    );

    -- footer_settings (global)
    CREATE TABLE "footer_settings" (
      "id" serial PRIMARY KEY NOT NULL,
      "tagline" varchar,
      "copyright_text" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE TABLE "footer_settings_quick_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "link" varchar NOT NULL
    );
    CREATE TABLE "footer_settings_service_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "link" varchar NOT NULL
    );
    CREATE TABLE "footer_settings_legal_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "link" varchar NOT NULL
    );

    -- seo_defaults (global)
    CREATE TABLE "seo_defaults" (
      "id" serial PRIMARY KEY NOT NULL,
      "meta_title_suffix" varchar,
      "default_description" text,
      "default_og_image_id" integer,
      "twitter_handle" varchar,
      "google_verification" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    -- Foreign keys
    ALTER TABLE "awards"
      ADD CONSTRAINT "awards_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    ALTER TABLE "partners"
      ADD CONSTRAINT "partners_logo_id_media_id_fk"
      FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    ALTER TABLE "navigation_menu_items"
      ADD CONSTRAINT "navigation_menu_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "footer_settings_quick_links"
      ADD CONSTRAINT "footer_settings_quick_links_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "footer_settings_service_links"
      ADD CONSTRAINT "footer_settings_service_links_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "footer_settings_legal_links"
      ADD CONSTRAINT "footer_settings_legal_links_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_settings"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "seo_defaults"
      ADD CONSTRAINT "seo_defaults_default_og_image_id_media_id_fk"
      FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "awards" DROP CONSTRAINT IF EXISTS "awards_image_id_media_id_fk";
    ALTER TABLE "partners" DROP CONSTRAINT IF EXISTS "partners_logo_id_media_id_fk";
    ALTER TABLE "navigation_menu_items" DROP CONSTRAINT IF EXISTS "navigation_menu_items_parent_id_fk";
    ALTER TABLE "footer_settings_quick_links" DROP CONSTRAINT IF EXISTS "footer_settings_quick_links_parent_id_fk";
    ALTER TABLE "footer_settings_service_links" DROP CONSTRAINT IF EXISTS "footer_settings_service_links_parent_id_fk";
    ALTER TABLE "footer_settings_legal_links" DROP CONSTRAINT IF EXISTS "footer_settings_legal_links_parent_id_fk";
    ALTER TABLE "seo_defaults" DROP CONSTRAINT IF EXISTS "seo_defaults_default_og_image_id_media_id_fk";

    DROP TABLE IF EXISTS "seo_defaults";
    DROP TABLE IF EXISTS "footer_settings_legal_links";
    DROP TABLE IF EXISTS "footer_settings_service_links";
    DROP TABLE IF EXISTS "footer_settings_quick_links";
    DROP TABLE IF EXISTS "footer_settings";
    DROP TABLE IF EXISTS "navigation_menu_items";
    DROP TABLE IF EXISTS "navigation";
    DROP TABLE IF EXISTS "homepage_hero";
    DROP TABLE IF EXISTS "job_listings";
    DROP TABLE IF EXISTS "partners";
    DROP TABLE IF EXISTS "awards";
    DROP TABLE IF EXISTS "blog_categories";
    DROP TABLE IF EXISTS "newsletter_subscribers";
    DROP TABLE IF EXISTS "contact_submissions";

    DROP TYPE IF EXISTS "public"."enum_job_listings_employment_type";
    DROP TYPE IF EXISTS "public"."enum_job_listings_location_type";
    DROP TYPE IF EXISTS "public"."enum_job_listings_department";
    DROP TYPE IF EXISTS "public"."enum_partners_type";
    DROP TYPE IF EXISTS "public"."enum_newsletter_subscribers_status";
    DROP TYPE IF EXISTS "public"."enum_contact_submissions_status";
    DROP TYPE IF EXISTS "public"."enum_contact_submissions_service_interest";
  `)
}
