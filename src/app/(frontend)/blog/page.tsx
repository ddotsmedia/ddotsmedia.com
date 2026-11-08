
import type { Metadata } from "next";
import { getPayloadClient, safeQuery } from "@/lib/payload";
import { getPageContent } from "@/lib/content";
import type { Post } from "@/payload-types";
import { PostCard } from "@/components/blog/PostCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Reveal } from "@/components/shared/Reveal";

export const revalidate = 60; // ISR

export const metadata: Metadata = {
  title: "Blog — UAE Software Development Insights",
  description:
    "Engineering notes, UAE business-tech guides, web and mobile development tutorials, and product insights from the Ddotsmedia team in Sharjah, UAE.",
  openGraph: {
    title: "Ddotsmedia Blog — UAE Tech & Software Insights",
    description: "Engineering notes, UAE business-tech guides, and product insights from our team.",
    images: [{ url: "/og-image", width: 1200, height: 630 }],
  },
};

export default async function BlogPage() {
  const [posts, pc] = await Promise.all([
  safeQuery(async () => {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "posts",
      sort: "-publishedDate",
      limit: 50,
      depth: 1,
    });
    return res.docs;
  }, [] as Post[]),
  getPageContent(),
  ]);

  return (
    <main className="min-h-screen bg-navy pt-28">
      <section className="border-b border-white/10 pb-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[var(--brand-teal)]">
            {pc.blog.overline || "Insights"}
          </span>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">{pc.blog.heading || "Blog"}</h1>
          <p className="mx-auto max-w-xl text-lg text-white/60">
            {pc.blog.subtext || "Notes on building software for the UAE and the web."}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <EmptyState
              title="No posts yet"
              message="We're writing our first articles. Check back soon."
              cta={{ href: "/", label: "Back home" }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={(i % 3) * 0.08}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
