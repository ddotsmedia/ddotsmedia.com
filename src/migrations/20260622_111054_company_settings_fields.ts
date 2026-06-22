import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "company_settings" ADD COLUMN "office_location" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "office_visit_note" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "office_hours_weekday" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "office_hours_fri_sat" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "office_hours_note" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "cta_button_text" varchar;
  ALTER TABLE "company_settings" ADD COLUMN "cta_button_link" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "company_settings" DROP COLUMN "office_location";
  ALTER TABLE "company_settings" DROP COLUMN "office_visit_note";
  ALTER TABLE "company_settings" DROP COLUMN "office_hours_weekday";
  ALTER TABLE "company_settings" DROP COLUMN "office_hours_fri_sat";
  ALTER TABLE "company_settings" DROP COLUMN "office_hours_note";
  ALTER TABLE "company_settings" DROP COLUMN "cta_button_text";
  ALTER TABLE "company_settings" DROP COLUMN "cta_button_link";`)
}
