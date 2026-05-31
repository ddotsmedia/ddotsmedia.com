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
    // Single-VPS self-hosted: sync schema on init (build + runtime) instead of a
    // separate migration step. Switch to migrations if you scale to >1 instance.
    push: true,
  }),
  sharp,
});
