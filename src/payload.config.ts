import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { Testimonials } from "./collections/Testimonials";
import { Clients } from "./collections/Clients";
import { Posts } from "./collections/Posts";
import { Services } from "./collections/Services";
import { TeamMembers } from "./collections/TeamMembers";
import { FaqItems } from "./collections/FaqItems";
import { Industries } from "./collections/Industries";
import { PricingTiers } from "./collections/PricingTiers";
import { ContactSubmissions } from "./collections/ContactSubmissions";
import { NewsletterSubscribers } from "./collections/NewsletterSubscribers";
import { BlogCategories } from "./collections/BlogCategories";
import { Awards } from "./collections/Awards";
import { Partners } from "./collections/Partners";
import { JobListings } from "./collections/JobListings";
import { CompanySettings } from "./globals/CompanySettings";
import { Stats } from "./globals/Stats";
import { TrustBar } from "./globals/TrustBar";
import { ProcessSteps } from "./globals/ProcessSteps";
import { HomepageHero } from "./globals/HomepageHero";
import { Navigation } from "./globals/Navigation";
import { FooterSettings } from "./globals/FooterSettings";
import { SeoDefaults } from "./globals/SeoDefaults";
import { migrations } from "./migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    components: {
      Nav: "@/components/admin/AdminNav#AdminNav",
      views: {
        dashboard: {
          Component: "@/components/admin/Dashboard#DashboardView",
        },
      },
    },
  },
  collections: [
    {
      slug: "users",
      // Lock an account for 15 minutes after 5 failed logins (brute-force guard).
      auth: { maxLoginAttempts: 5, lockTime: 15 * 60 * 1000 },
      admin: { useAsTitle: "email" },
      fields: [],
    },
    Projects,
    Posts,
    Testimonials,
    Clients,
    Media,
    Services,
    TeamMembers,
    FaqItems,
    Industries,
    PricingTiers,
    ContactSubmissions,
    NewsletterSubscribers,
    BlogCategories,
    Awards,
    Partners,
    JobListings,
  ],
  globals: [CompanySettings, Stats, TrustBar, ProcessSteps, HomepageHero, Navigation, FooterSettings, SeoDefaults],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
    // Production: never auto-push schema (dev-only, and a no-op in the standalone
    // build). Schema is owned by committed migrations instead.
    push: false,
    // Run committed migrations automatically on Payload init in production, so a
    // fresh DB rebuilds its schema at container start without a CLI step (the
    // standalone runner image has no Payload CLI). Already-applied migrations
    // (tracked in payload_migrations) are skipped -- no-op on the live DB.
    prodMigrations: migrations,
  }),
  sharp,
});
