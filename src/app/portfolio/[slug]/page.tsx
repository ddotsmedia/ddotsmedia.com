import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import { RichText } from "@/components/shared/RichText";
import { ProjectPreview } from "@/components/preview/ProjectPreview";
import { Gallery, type GalleryImage } from "@/components/preview/Gallery";
import { Reveal } from "@/components/shared/Reveal";
import { mediaUrl, mediaAlt, mediaDims } from "@/lib/media";

export const revalidate = 60; // ISR

type Params = { params: Promise<{ slug: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function getProject(slug: string) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "projects",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });
  return docs[0] ?? null;
}

export async function generateStaticParams() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "projects",
    limit: 200,
    depth: 0,
    select: { slug: true },
  });
  return docs.filter((d) => d.slug).map((d) => ({ slug: d.slug as string }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };
  const desc = project.shortDescription ?? undefined;
  return {
    title: project.title,
    description: desc,
    openGraph: {
      title: project.title,
      description: desc,
      type: "article",
      images: [{ url: `/portfolio/${slug}/opengraph-image` }],
    },
  };
}

const ext = (s: string) => (s.startsWith("http") ? s : `${siteUrl}${s}`);

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const payload = await getPayloadClient();
  const { docs: all } = await payload.find({
    collection: "projects",
    sort: ["order", "-createdAt"],
    limit: 200,
    depth: 0,
    select: { slug: true, title: true },
  });
  const idx = all.findIndex((p) => p.slug === slug);
  const next = idx >= 0 ? all[(idx + 1) % all.length] : null;

  const tech = (project.techStack ?? []).map((t) => t.tech).filter(Boolean);
  const metrics = (project.metrics ?? []).filter((m) => m.label || m.value);
  const galleryImages: GalleryImage[] = (project.gallery ?? [])
    .map((g) => {
      const url = mediaUrl(g.image, "card");
      if (!url) return null;
      const dims = mediaDims(g.image);
      return { url, alt: mediaAlt(g.image), width: dims.width, height: dims.height };
    })
    .filter((x): x is GalleryImage => x !== null);

  const cover = mediaUrl(project.coverImage, "feature");

  return (
    <main className="min-h-screen bg-navy pt-28">
      {/* 1. Hero */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link href="/portfolio" className="text-sm text-white/50 hover:text-white">
          ← All projects
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/50">
          <span className="rounded-full bg-[var(--brand-teal)]/15 px-3 py-1 font-medium text-[var(--brand-teal)]">
            {project.category}
          </span>
          {project.client && <span>{project.client}</span>}
          {project.year && <span>· {project.year}</span>}
          {project.status && <span>· {project.status}</span>}
        </div>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">
          {project.title}
        </h1>
        {project.shortDescription && (
          <p className="mt-4 max-w-2xl text-lg text-white/60">{project.shortDescription}</p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[var(--brand-teal)] px-5 py-2 text-sm font-semibold text-white">
              Visit Site ↗
            </a>
          )}
          {project.appStoreUrl && (
            <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white/90">
              App Store ↗
            </a>
          )}
          {project.playStoreUrl && (
            <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white/90">
              Play Store ↗
            </a>
          )}
        </div>
      </section>

      {/* 2. Live preview */}
      <section className="mx-auto mt-12 max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <ProjectPreview project={project} />
        </Reveal>
      </section>

      {/* 3. Challenge / Solution / Results + metrics */}
      {(project.problem || project.solution || project.results || metrics.length > 0) && (
        <section className="mx-auto mt-20 max-w-3xl px-4 sm:px-6 lg:px-8">
          {project.problem && (
            <div className="mb-12">
              <h2 className="mb-3 text-2xl font-bold text-white">The Challenge</h2>
              <RichText data={project.problem} className="text-white/70 [&_p]:mb-3" />
            </div>
          )}
          {project.solution && (
            <div className="mb-12">
              <h2 className="mb-3 text-2xl font-bold text-white">Our Solution</h2>
              <RichText data={project.solution} className="text-white/70 [&_p]:mb-3" />
            </div>
          )}
          {project.results && (
            <div className="mb-12">
              <h2 className="mb-3 text-2xl font-bold text-white">The Results</h2>
              <RichText data={project.results} className="text-white/70 [&_p]:mb-3" />
            </div>
          )}
          {metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:grid-cols-4">
              {metrics.map((m, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-[var(--brand-teal)]">{m.value}</div>
                  <div className="mt-1 text-xs text-white/50">{m.label}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 4. Tech stack */}
      {tech.length > 0 && (
        <section className="mx-auto mt-16 max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold text-white">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70">
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 5. Gallery */}
      {galleryImages.length > 0 && (
        <section className="mx-auto mt-20 max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-white">Screenshots</h2>
          <Gallery images={galleryImages} />
        </section>
      )}

      {/* 6. Testimonial */}
      {project.testimonialQuote && (
        <section className="mx-auto mt-20 max-w-3xl px-4 sm:px-6 lg:px-8">
          <blockquote className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
            <p className="text-xl font-medium leading-relaxed text-white/90">
              “{project.testimonialQuote}”
            </p>
            {(project.testimonialAuthor || project.testimonialRole) && (
              <footer className="mt-4 text-sm text-white/50">
                {project.testimonialAuthor}
                {project.testimonialRole && `, ${project.testimonialRole}`}
              </footer>
            )}
          </blockquote>
        </section>
      )}

      {/* 7. Next project + CTA */}
      <section className="mx-auto mt-24 max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-10 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Have a project in mind?</h2>
          <p className="max-w-md text-white/60">
            Let&apos;s build something that moves your business forward.
          </p>
          <Link href="/contact" className="rounded-full bg-[var(--brand-teal)] px-7 py-3 font-semibold text-white">
            Get a Free Quote
          </Link>
          {next && next.slug && (
            <Link href={`/portfolio/${next.slug}`} className="text-sm text-white/50 hover:text-white">
              Next project: {next.title} →
            </Link>
          )}
        </div>
      </section>

      {/* JSON-LD: CreativeWork */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.shortDescription ?? undefined,
            url: `${siteUrl}/portfolio/${slug}`,
            image: cover ? ext(cover) : undefined,
            dateCreated: project.year ?? undefined,
            creator: { "@type": "Organization", name: "Ddotsmedia IT Solutions" },
            keywords: tech.join(", ") || undefined,
          }),
        }}
      />
    </main>
  );
}
