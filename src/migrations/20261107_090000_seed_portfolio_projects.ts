import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Direct SQL seed for the 6 missing portfolio projects.
// Uses ON CONFLICT (slug) DO NOTHING — fully idempotent, safe to re-run.
// Bypasses the enrichProjectFromUrl hook (no URL fetches, no timeouts).
// Tech stack tags inserted separately via a subquery join on slug.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Insert missing projects
  await db.execute(sql`
    INSERT INTO "projects" (
      "title", "slug", "category", "short_description",
      "live_url", "status", "featured", "order", "published",
      "updated_at", "created_at"
    ) VALUES
      (
        'AyurConnect', 'ayurconnect', 'Web',
        'Ayurveda wellness platform linking practitioners and patients with online booking, video consultations, and health records.',
        'https://ayurconnect.com', 'Live', false, 2, true,
        NOW(), NOW()
      ),
      (
        'Ddotshop', 'ddotshop', 'Web',
        'Modern e-commerce storefront with full product catalogue, cart, wishlist, and secure Stripe checkout.',
        'https://ddotshop.com', 'Live', false, 3, true,
        NOW(), NOW()
      ),
      (
        'Abu Dhabi Malayalees', 'abudhabimalayalees', 'Web',
        'Community social network for Kerala expatriates in Abu Dhabi — events, news, jobs board, and member directory for 120K+ members.',
        'https://abudhabimalayalees.com', 'Live', false, 4, true,
        NOW(), NOW()
      ),
      (
        'Bayrotna — Little Smarties', 'bayrotna', 'Web',
        'Modern nursery website with facility gallery, program listings, parent portal, and online enrollment for UAE parents.',
        'https://bayrotna.ae', 'Live', false, 5, true,
        NOW(), NOW()
      ),
      (
        'Kayakalpam Vaidya Sala', 'kayakalpam', 'Web',
        'Traditional Kerala Ayurvedic clinic site with treatment listings, doctor profiles, and online appointment booking in Malayalam and English.',
        'https://kayakalpamvaidyasala.com', 'Live', false, 6, true,
        NOW(), NOW()
      ),
      (
        'Synergy Typing', 'synergytyping', 'Desktop',
        'Professional typing training platform with speed tests, progress tracking, and certification for UAE typing institutes.',
        'https://milestonm.ae', 'Live', false, 7, true,
        NOW(), NOW()
      )
    ON CONFLICT (slug) DO NOTHING;
  `)

  // Insert tech stack tags for each project (skip if project wasn't inserted)
  const techData: Record<string, string[]> = {
    ayurconnect: ['Next.js','TypeScript','Stripe','Twilio','PostgreSQL','Prisma','Booking','Video Calls','Healthcare','Multilingual'],
    ddotshop: ['Next.js','Stripe','PostgreSQL','TypeScript','E-commerce','Cart','Wishlist','Payments','Inventory'],
    abudhabimalayalees: ['Next.js','Node.js','PostgreSQL','Redis','Social Network','Events','Jobs Board','Community','WhatsApp Integration'],
    bayrotna: ['Next.js','TypeScript','Payload CMS','Docker','GitHub Actions','Enrollment','Gallery','Parent Portal'],
    kayakalpam: ['Next.js','Tailwind CSS','Booking','Ayurveda','Healthcare','Multilingual','Malayalam','SEO'],
    synergytyping: ['React','Electron','TypeScript','Desktop App','Typing Tests','Certificates','Progress Tracking','Leaderboard'],
  }

  for (const [slug, techs] of Object.entries(techData)) {
    for (let i = 0; i < techs.length; i++) {
      await db.execute(sql`
        INSERT INTO "projects_tech_stack" ("_order", "_parent_id", "id", "tech")
        SELECT
          ${i + 1},
          p.id,
          gen_random_uuid()::text,
          ${techs[i]}
        FROM "projects" p
        WHERE p.slug = ${slug}
        ON CONFLICT DO NOTHING;
      `)
    }
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "projects"
    WHERE slug IN ('ayurconnect','ddotshop','abudhabimalayalees','bayrotna','kayakalpam','synergytyping');
  `)
}
