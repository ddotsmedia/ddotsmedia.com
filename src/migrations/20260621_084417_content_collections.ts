import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_icon" AS ENUM('Globe', 'Smartphone', 'Code', 'Palette', 'Cloud', 'LayoutDashboard');
  CREATE TYPE "public"."enum_services_category" AS ENUM('web', 'mobile', 'software', 'design', 'devops', 'erp');
  CREATE TYPE "public"."enum_faq_items_page" AS ENUM('services', 'about', 'general');
  CREATE TYPE "public"."enum_industries_icon" AS ENUM('HeartPulse', 'Building2', 'ShoppingCart', 'Landmark', 'GraduationCap', 'Truck');
  CREATE TYPE "public"."enum_process_steps_items_icon" AS ENUM('Search', 'Palette', 'Code', 'Rocket');
  CREATE TABLE "services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "services_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"slug" varchar,
  	"icon" "enum_services_icon",
  	"category" "enum_services_category",
  	"color" varchar,
  	"short_description" varchar,
  	"long_description" jsonb,
  	"screenshot_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"role" varchar,
  	"linkedin" varchar,
  	"avatar_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faq_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"page" "enum_faq_items_page" DEFAULT 'general',
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "industries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"icon" "enum_industries_icon",
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pricing_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pricing_tiers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"price" varchar,
  	"price_label" varchar DEFAULT 'Starting from',
  	"highlighted" boolean,
  	"cta_text" varchar DEFAULT 'Contact for Details',
  	"cta_link" varchar DEFAULT '/contact',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "company_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar,
  	"tagline" varchar,
  	"hero_heading" varchar,
  	"hero_subtext" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"whatsapp_number" varchar,
  	"address" varchar,
  	"social_links_linkedin" varchar,
  	"social_links_twitter" varchar,
  	"social_links_instagram" varchar,
  	"social_links_github" varchar,
  	"office_hours" varchar,
  	"response_time" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" numeric,
  	"suffix" varchar
  );
  
  CREATE TABLE "stats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "trust_bar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "trust_bar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "process_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_process_steps_items_icon"
  );
  
  CREATE TABLE "process_steps" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "projects" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "category" DROP NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faq_items_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "industries_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pricing_tiers_id" integer;
  ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_tech_stack" ADD CONSTRAINT "services_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_screenshot_id_media_id_fk" FOREIGN KEY ("screenshot_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pricing_tiers_features" ADD CONSTRAINT "pricing_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stats_items" ADD CONSTRAINT "stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trust_bar_items" ADD CONSTRAINT "trust_bar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trust_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "process_steps_items" ADD CONSTRAINT "process_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."process_steps"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_features_order_idx" ON "services_features" USING btree ("_order");
  CREATE INDEX "services_features_parent_id_idx" ON "services_features" USING btree ("_parent_id");
  CREATE INDEX "services_tech_stack_order_idx" ON "services_tech_stack" USING btree ("_order");
  CREATE INDEX "services_tech_stack_parent_id_idx" ON "services_tech_stack" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_screenshot_idx" ON "services" USING btree ("screenshot_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "team_members_avatar_idx" ON "team_members" USING btree ("avatar_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "faq_items_updated_at_idx" ON "faq_items" USING btree ("updated_at");
  CREATE INDEX "faq_items_created_at_idx" ON "faq_items" USING btree ("created_at");
  CREATE INDEX "industries_updated_at_idx" ON "industries" USING btree ("updated_at");
  CREATE INDEX "industries_created_at_idx" ON "industries" USING btree ("created_at");
  CREATE INDEX "pricing_tiers_features_order_idx" ON "pricing_tiers_features" USING btree ("_order");
  CREATE INDEX "pricing_tiers_features_parent_id_idx" ON "pricing_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "pricing_tiers_updated_at_idx" ON "pricing_tiers" USING btree ("updated_at");
  CREATE INDEX "pricing_tiers_created_at_idx" ON "pricing_tiers" USING btree ("created_at");
  CREATE INDEX "stats_items_order_idx" ON "stats_items" USING btree ("_order");
  CREATE INDEX "stats_items_parent_id_idx" ON "stats_items" USING btree ("_parent_id");
  CREATE INDEX "trust_bar_items_order_idx" ON "trust_bar_items" USING btree ("_order");
  CREATE INDEX "trust_bar_items_parent_id_idx" ON "trust_bar_items" USING btree ("_parent_id");
  CREATE INDEX "process_steps_items_order_idx" ON "process_steps_items" USING btree ("_order");
  CREATE INDEX "process_steps_items_parent_id_idx" ON "process_steps_items" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_items_fk" FOREIGN KEY ("faq_items_id") REFERENCES "public"."faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pricing_tiers_fk" FOREIGN KEY ("pricing_tiers_id") REFERENCES "public"."pricing_tiers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_faq_items_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_items_id");
  CREATE INDEX "payload_locked_documents_rels_industries_id_idx" ON "payload_locked_documents_rels" USING btree ("industries_id");
  CREATE INDEX "payload_locked_documents_rels_pricing_tiers_id_idx" ON "payload_locked_documents_rels" USING btree ("pricing_tiers_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_tech_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "industries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_tiers_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_tiers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "company_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "trust_bar_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "trust_bar" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "process_steps_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "process_steps" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services_features" CASCADE;
  DROP TABLE "services_tech_stack" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "faq_items" CASCADE;
  DROP TABLE "industries" CASCADE;
  DROP TABLE "pricing_tiers_features" CASCADE;
  DROP TABLE "pricing_tiers" CASCADE;
  DROP TABLE "company_settings" CASCADE;
  DROP TABLE "stats_items" CASCADE;
  DROP TABLE "stats" CASCADE;
  DROP TABLE "trust_bar_items" CASCADE;
  DROP TABLE "trust_bar" CASCADE;
  DROP TABLE "process_steps_items" CASCADE;
  DROP TABLE "process_steps" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_services_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_members_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faq_items_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_industries_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pricing_tiers_fk";
  
  DROP INDEX "payload_locked_documents_rels_services_id_idx";
  DROP INDEX "payload_locked_documents_rels_team_members_id_idx";
  DROP INDEX "payload_locked_documents_rels_faq_items_id_idx";
  DROP INDEX "payload_locked_documents_rels_industries_id_idx";
  DROP INDEX "payload_locked_documents_rels_pricing_tiers_id_idx";
  ALTER TABLE "projects" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "category" SET NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "services_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_members_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faq_items_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "industries_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pricing_tiers_id";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_services_category";
  DROP TYPE "public"."enum_faq_items_page";
  DROP TYPE "public"."enum_industries_icon";
  DROP TYPE "public"."enum_process_steps_items_icon";`)
}
