import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayloadClient, safeQuery } from "@/lib/payload";
import { RichText } from "@/components/shared/RichText";
import { mediaAlt, mediaUrl, mediaDims } from "@/lib/media";
import { formatDate } from "@/lib/format";

export const revalidate = 60; // ISR

type Params = { params: Promise<{ slug: string }> };

async function getPost(slug: string) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
}

export async function generateStaticParams() {
  return safeQuery(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      limit: 100,
      depth: 0,
      select: { slug: true },
    });
    return docs.filter((d) => d.slug).map((d) => ({ slug: d.slug as string }));
  }, [] as { slug: string }[]);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  const ogImage = mediaUrl(post.coverImage, "feature");
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const cover = mediaUrl(post.coverImage, "feature");
  const dims = mediaDims(post.coverImage);
  const tags = (post.tags ?? []).map((t) => t.tag).filter(Boolean);

  return (
    <main className="min-h-screen bg-navy pt-28">
      <article className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <Link href="/blog" className="text-sm text-white/50 hover:text-white">
          ← All posts
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/40">
            {formatDate(post.publishedDate)}
            {post.author && (
              <>
                <span aria-hidden>•</span>
                <span>{post.author}</span>
              </>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && <p className="mt-4 text-lg text-white/60">{post.excerpt}</p>}
        </header>

        {cover && (
          <Image
            src={cover}
            alt={mediaAlt(post.coverImage) || post.title}
            width={dims.width}
            height={dims.height}
            priority
            className="mt-8 w-full rounded-2xl border border-white/10 object-cover"
          />
        )}

        <RichText
          data={post.content}
          className="prose prose-invert mt-10 max-w-none prose-headings:text-white prose-a:text-[var(--brand-teal)] prose-strong:text-white"
        />

        {tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-white/50"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt ?? undefined,
            datePublished: post.publishedDate ?? undefined,
            author: post.author ? { "@type": "Person", name: post.author } : undefined,
            image: cover ?? undefined,
          }),
        }}
      />
    </main>
  );
}
