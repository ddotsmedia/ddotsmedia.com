# Phase 1 Website Audit
**Date:** 2026-11-06  
**Branch:** phase-1-marketing  
**Auditor:** Claude (Cowork) — read-only audit, no files modified  
**Status:** Awaiting owner review and approval before implementation begins

---

## 1. Architecture Summary

| Item | Detail |
|------|--------|
| Framework | Next.js ~15.4.11 (App Router) |
| React | 19.1.0 |
| CMS | Payload CMS 3.85 (Postgres adapter) |
| Styling | Tailwind CSS v4 + custom design tokens |
| Package manager | pnpm |
| Fonts | Geist Sans, Geist Mono, Space Grotesk (Google Fonts) |
| Email | Resend (via `RESEND_API_KEY`) |
| Hosting | Docker on Hostinger VPS (187.127.185.239) |
| CI/CD | GitHub Actions → ghcr.io → SSH deploy → `docker compose up` |
| DB | PostgreSQL (via Docker on VPS) |

The codebase uses a parallel route structure:
- `src/app/(frontend)/` — public-facing Next.js pages
- `src/app/(payload)/` — Payload CMS admin at `/admin`
- `src/app/api/` — custom API routes (contact form, health, seed, metrics)

---

## 2. Existing Route Inventory

| Route | File | Status | Notes |
|-------|------|--------|-------|
| `/` | `(frontend)/page.tsx` | ✅ Active | Homepage with dynamic CMS sections |
| `/services` | `(frontend)/services/page.tsx` | ✅ Active | Full-page services with bento grid |
| `/about` | `(frontend)/about/page.tsx` | ✅ Active | Story, values, team, timeline |
| `/contact` | `(frontend)/contact/page.tsx` | ✅ Active | Form + CMS-driven contact info |
| `/portfolio` | `(frontend)/portfolio/page.tsx` | ✅ Active | CMS projects with static fallback |
| `/portfolio/[slug]` | `(frontend)/portfolio/[slug]/page.tsx` | ✅ Active | Individual project pages |
| `/blog` | `(frontend)/blog/page.tsx` | ✅ Active | Blog listing |
| `/blog/[slug]` | `(frontend)/blog/[slug]/page.tsx` | ✅ Active | Individual blog posts |
| `/careers` | `(frontend)/careers/page.tsx` | ✅ Active | Careers/jobs page |
| `/monitor` | `(frontend)/monitor/page.tsx` | 🔍 Internal | Internal monitoring page |
| `/portfolio/compare` | `portfolio/compare/page.tsx` | 🔍 Internal | Portfolio comparison tool |
| `/portfolio/tools` | `portfolio/tools/page.tsx` | 🔍 Internal | Portfolio tools page |
| `/not-found` | `(frontend)/not-found.tsx` | ✅ Active | 404 page |
| `/sitemap.xml` | `app/sitemap.ts` | ✅ Active | Dynamic sitemap |
| `/robots.txt` | `app/robots.ts` | ✅ Active | Robots file |
| `/admin/**` | `(payload)/admin/` | ✅ Active | Payload CMS admin |
| `/api/contact` | `app/api/contact/route.ts` | ✅ Active | Contact form API |
| `/api/health` | `app/api/health/route.ts` | ✅ Active | Health check |

**Missing per Phase-1 report (P0):**
- No dedicated individual service pages (e.g. `/services/web-development`, `/services/mobile-apps`)
- No `/services/erp`, `/services/ui-ux` etc.
- No industry-specific pages (e.g. `/industries/restaurants`, `/industries/retail`)
- Careers page exists but no `/careers/[slug]` for individual job listings

---

## 3. Current SEO Status

### Title & Meta Tags
- **Root layout title:** `"Ddotsmedia IT Solutions — Software, Web & Mobile Development in the UAE"` ✅
- **Root description:** Generic but functional. Missing primary keyword "UAE" in some page descriptions.
- **Template:** `"%s — Ddotsmedia"` ✅

| Page | Title | Description | Status |
|------|-------|-------------|--------|
| Homepage | default | "builds high-performance web apps, mobile apps, and custom ERP software" | ⚠️ Could include UAE city targeting |
| Services | "Services" | functional | ⚠️ Short title — missing brand/location |
| About | "About Us" | functional | ⚠️ Short title |
| Contact | "Contact" | functional | ⚠️ Short title |
| Portfolio | "Portfolio — Ddotsmedia" | functional | ✅ |
| Blog | "Blog" | functional | ⚠️ Short title |

### Technical SEO
- **sitemap.xml:** ✅ Dynamic, includes static routes + project/blog slugs. Revalidates every hour.
- **robots.txt:** ✅ Allows all, disallows `/admin` and `/api`.
- **Canonical:** ⚠️ NOT explicitly set. `metadataBase` is set from `NEXT_PUBLIC_SITE_URL` — need to verify this env var is set correctly in production.
- **Open Graph:** ✅ Partial — `siteName`, `type`, `url` set. Missing OG `image`, OG `title` per-page.
- **Twitter/X Card:** ⚠️ Not configured.
- **hreflang:** ⚠️ Not configured. Report indicates Arabic expansion is P3, but should be planned.

### Structured Data
- **OrganizationJsonLd:** ✅ Present in root layout. Contains name, address (Sharjah, AE), URL, description, areaServed, knowsAbout.
  - **⚠️ CLAIM REQUIRING VERIFICATION:** Address is hardcoded as Sharjah. No phone or email in schema.
- **FaqSchema:** ✅ Present on homepage and services (FAQ items from CMS).
- **Blog article schema:** ✅ Present on `blog/[slug]/page.tsx`.
- **Portfolio/Project schema:** Partial — OG image present on `portfolio/[slug]`, but no Article or SoftwareApplication schema.
- **LocalBusiness schema:** ⚠️ Missing — important for UAE local SEO.
- **WebPage schema:** ⚠️ Missing on main pages.

---

## 4. Analytics & Tracking Status

**Current state: NO analytics configured in source code.**

| Tool | Status | Notes |
|------|--------|-------|
| Google Analytics 4 | ❌ Not found | No `gtag.js`, no GA4 measurement ID, no data layer |
| Google Tag Manager | ❌ Not found | No GTM container script |
| Google Search Console | ❓ Unknown | Cannot verify from source — needs account access |
| Facebook Pixel | ❌ Not found | |
| Event tracking | ❌ Not configured | No custom events in source |

The report specifies GA4 + GTM + Search Console + conversion events (generate_lead, whatsapp_click, etc.). None of these are currently implemented.

**Note:** External account access (GA4, GTM, Search Console) requires owner to share credentials or add Claude as a property user. Claude will not request or handle credentials.

---

## 5. Forms & Lead Generation

| Form | Location | Status | Notes |
|------|----------|--------|-------|
| Contact form | `/contact` | ✅ Functional | Sends via Resend API |
| Quick inquiry picker | `/contact` | ✅ Functional | Pre-populates service field |

**Contact form fields:** name, email, phone (optional), service (select), message  
**Validation:** Zod schema server-side ✅  
**Rate limiting:** 5 submissions per IP per 15 minutes ✅  
**Email delivery:** Resend (`RESEND_API_KEY`). Falls back to log-only if key unset.  
**CMS storage:** Contact form submissions save to `ContactSubmissions` Payload collection ✅  

**Missing:**
- No WhatsApp click tracking (report specifies `whatsapp_click` event)
- No newsletter/lead magnet form
- No "callback request" or "book a call" flow
- No form conversion tracking (no analytics events on submit)
- RESEND_API_KEY status in production: **unknown** — needs verification

---

## 6. Performance Risks

| Risk | Severity | Notes |
|------|----------|-------|
| Hero slideshow component | Medium | `HeroSlideshow` loads multiple screenshots — verify lazy loading and image optimization |
| `logo transparent-01.png` in repo root | High | 165KB PNG sitting in repo root — not in `public/`. May be unused. |
| `Artboard 77.pdf` / `Artboard 77.png` | Medium | 62KB PDF + 22KB PNG in repo root — appear to be design assets, not web assets |
| Google Maps iframe in contact page | Low | Loads external `maps.google.com` on every contact page visit |
| `HeroBackground` component | Low | Uses multiple gradient divs — check for layout shift |
| ISR revalidation | ✅ OK | Homepage/portfolio/blog all use `revalidate = 60`, sitemap uses 3600 |
| `sharp` for images | ✅ OK | Installed as production dependency |

**Baseline PageSpeed:** Cannot be measured from source audit alone. Requires running PageSpeed Insights against `ddotsmedia.com`. Owner should run this or share results.

---

## 7. Business Claims Requiring Owner Verification

The following claims appear in the codebase (hardcoded or as CMS fallbacks) and require the owner to confirm accuracy before they can be published in new optimised content:

| # | Claim | Location | Classification |
|---|-------|----------|----------------|
| 1 | "50+ businesses trust us with their mission-critical systems" | `Hero.tsx` | ⚠️ Requires owner confirmation |
| 2 | "Founded in Dubai in 2016 as a one-person freelance practice" | `about/page.tsx` (FALLBACK_STORY) | ⚠️ Requires owner confirmation |
| 3 | "Word spread... designers, mobile developers, and ERP specialists came on board" | `about/page.tsx` (FALLBACK_STORY) | ⚠️ Requires owner confirmation |
| 4 | "SHAMS Free Zone Licensed" | `about/page.tsx` (FALLBACK_TRUST) | ⚠️ Requires owner confirmation |
| 5 | "UAE Corporate Tax Compliant" | `about/page.tsx` (FALLBACK_TRUST) | ⚠️ Requires owner confirmation |
| 6 | "ISO-aligned Processes" | `about/page.tsx` (FALLBACK_TRUST) | ⚠️ Requires owner confirmation |
| 7 | "Certified Developers" | `about/page.tsx` (FALLBACK_TRUST) | ⚠️ Requires owner confirmation |
| 8 | Headquarters at SHAMS Free Zone, Sharjah | `about/page.tsx`, `OrganizationJsonLd.tsx`, `Footer.tsx` | ⚠️ Requires owner confirmation |
| 9 | "Established headquarters at SHAMS Free Zone, Sharjah" in 2022 | `about/page.tsx` (FALLBACK_TIMELINE) | ⚠️ Requires owner confirmation |
| 10 | "Dubai office" claim (Office/enterprise clients) | `about/page.tsx` (FALLBACK_CITIES) | ⚠️ Requires owner confirmation |
| 11 | "Reply within 2 hours" / "within one business day" | `services/page.tsx`, `contact/page.tsx` | ⚠️ Requires owner confirmation |
| 12 | Phone: `+971 50 937 9212` | `Footer.tsx` (fallback) | ⚠️ Requires owner confirmation — is this the correct business number? |
| 13 | Email: `hello@ddotsmedia.com` | `Footer.tsx` (fallback) | ⚠️ Requires owner confirmation |
| 14 | 6 Core Services stat on services page | `services/page.tsx` | ⚠️ Acceptable if accurate |
| 15 | "Full-Stack Coverage" stat on services page | `services/page.tsx` | ✅ Generic — acceptable |
| 16 | "UAE Market Focus" stat on services page | `services/page.tsx` | ✅ Generic — acceptable |
| 17 | "Faster than your competition" tagline | `Hero.tsx` | ✅ Marketing copy — acceptable |
| 18 | Google Maps embed coordinates (25.2978, 55.3902) | `contact/page.tsx` | ⚠️ Verify these are the correct business coordinates |
| 19 | SHAMS Free Zone link in footer Maps URL | `Footer.tsx` | ⚠️ Verify Google Maps listing is correct |
| 20 | "Free consultation, Fixed-price quotes, Reply within 2 hours" | `services/page.tsx` CTA section | ⚠️ Requires owner confirmation |

**NOTE:** Many of these are CMS fallbacks — if the owner updates the CMS (Company Settings collection in Admin), those values will override the fallbacks. Priority action: populate Company Settings in `/admin`.

---

## 8. Accessibility & Mobile

- **lang attribute:** `<html lang="en">` ✅ — Arabic expansion planned for P3
- **Responsive:** Tailwind responsive utilities used throughout ✅
- **Mobile nav:** Hamburger menu implemented in Navbar ✅
- **Sticky nav:** `sticky top-9` with backdrop blur ✅  
- **Aria labels:** Social links in Footer and Contact use `aria-label` ✅
- **Alt text:** `Image` components use descriptive alt text where visible ✅
- **Focus styles:** Not explicitly verified in audit — needs manual testing
- **Color contrast:** Not tested in read-only audit — needs manual or automated check

---

## 9. Missing Documentation (per Phase-1 report spec)

The following docs files do not yet exist and need to be created:

| File | Status |
|------|--------|
| `docs/phase-1-project-report.md` | ❌ Missing |
| `docs/phase-1-website-audit.md` | ✅ This file |
| `docs/phase-1-business-facts-register.md` | ❌ Missing |
| `docs/phase-1-sitemap.md` | ❌ Missing |
| `docs/phase-1-seo-plan.md` | ❌ Missing |
| `docs/phase-1-analytics-plan.md` | ❌ Missing |
| `docs/phase-1-implementation-log.md` | ❌ Missing |
| `docs/phase-1-qa-report.md` | ❌ Missing |
| `docs/phase-1-deployment-plan.md` | ❌ Missing |

---

## 10. Prioritised Changes (Proposed — awaiting owner approval)

### P0 — Safety & Foundation (ready to implement on approval)
1. Populate Company Settings in Payload Admin with verified business facts (phone, email, address, story, values)
2. Add `NEXT_PUBLIC_SITE_URL=https://ddotsmedia.com` to production environment if not already set
3. Verify RESEND_API_KEY is configured in production (contact form email delivery)
4. Create remaining phase-1 docs files

### P1 — Technical SEO (Phase 1 implementation)
5. Add per-page OG image (`/og-image.png` or dynamic)
6. Add Twitter/X card metadata
7. Add LocalBusiness JSON-LD schema (requires verified business data first)
8. Improve page `<title>` tags to include "UAE" and service keywords
9. Add canonical URL tags (verify `metadataBase` is production URL)
10. Configure GA4 + GTM (requires owner to share GA4 property ID and GTM container ID)

### P1 — Lead Generation
11. Add WhatsApp click tracking once analytics is configured
12. Add form submission event to GA4 (generate_lead event)

### P2 — Service Pages
13. Create individual service sub-pages: `/services/web-development`, `/services/mobile-apps`, `/services/custom-software`, `/services/ui-ux-design`, `/services/cloud-devops`, `/services/erp-systems`
14. Create industry pages (after owner confirms which industries to target)

### P2 — Content
15. First blog articles from approved topic list
16. Portfolio — verify all project entries have owner permission to display

---

## 11. Files Expected to Change (by phase)

**Phase 1 (SEO foundation) — changes limited to:**
- `src/app/(frontend)/layout.tsx` — add OG image, Twitter card metadata
- `src/app/(frontend)/*/page.tsx` — improve individual page metadata
- `src/components/shared/OrganizationJsonLd.tsx` — add phone/email/LocalBusiness once verified
- `src/app/sitemap.ts` — may add service page routes when created
- New file: `public/og-image.png` — OG social share image

**Phase 2 (Service pages) — new files only:**
- `src/app/(frontend)/services/[slug]/page.tsx` — service sub-pages

**Phase 5 (Analytics):**
- `src/app/(frontend)/layout.tsx` — add GTM script tag
- New files for analytics helper/event wrappers

---

## 12. Items Requiring Owner Input Before Implementation

The following decisions must come from the owner before Claude proceeds:

1. **Verified business facts:** Confirm or correct all 20 claims listed in Section 7
2. **Google Analytics 4 property ID** (e.g. G-XXXXXXXXXX) — to configure GA4
3. **Google Tag Manager container ID** (e.g. GTM-XXXXXXX) — to configure GTM
4. **RESEND_API_KEY status** — is email delivery working in production?
5. **WhatsApp number** — confirm the correct WhatsApp business number for wa.me links
6. **Which service pages to create first** — confirm priority service page slugs
7. **Which industries to target** — confirm industry pages to create
8. **OG/social image** — provide a branded image (1200×630px) or confirm Claude should create one
9. **Portfolio permissions** — confirm Claude has permission to display all portfolio items
10. **Blog content approval** — which of the 10 article ideas from the report to start with

---

*End of Phase 0 audit. This file will be updated as implementation progresses.*
