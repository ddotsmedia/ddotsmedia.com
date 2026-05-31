import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/payload-types";
import { mediaAlt, mediaUrl } from "@/lib/media";
import { formatDate } from "@/lib/format";

export function PostCard({ post }: { post: Post }) {
  const cover = mediaUrl(post.coverImage, "card");
  const tags = (post.tags ?? []).map((t) => t.tag).filter(Boolean).slice(0, 2);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.04]">
        {cover ? (
          <Image
            src={cover}
            alt={mediaAlt(post.coverImage) || post.title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl font-bold text-white/15">
            {post.title.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2 text-xs text-white/40">
          {formatDate(post.publishedDate)}
          {tags.length > 0 && <span aria-hidden>•</span>}
          {tags.map((t) => (
            <span key={t} className="text-[var(--brand-teal)]">
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-[var(--brand-teal)]">
          {post.title}
        </h3>
        {post.excerpt && <p className="line-clamp-3 text-sm text-white/60">{post.excerpt}</p>}
        <span className="mt-auto pt-3 text-sm font-semibold text-[var(--brand-teal)]">
          Read more →
        </span>
      </div>
    </Link>
  );
}
