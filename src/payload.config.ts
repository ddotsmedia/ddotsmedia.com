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
import { migrations } from "./migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: { user: "users" },
  collections: [
    {
      slug: "users",
      auth: true,
      admin: { useAsTitle: "email" },
      fields: [],
    },
    Projects,
    Posts,
    Testimonials,
    Clients,
    Media,
  ],
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
    // (tracked in payload_migrations) are skipped — no-op on the live DB.
    prodMigrations: migrations,
  }),
  sharp,
});
