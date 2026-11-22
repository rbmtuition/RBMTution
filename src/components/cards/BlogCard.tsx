import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getBlogImage, type BlogPost } from "@/data/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  const image = getBlogImage(post.slug);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-gold-300"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          quality={55}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-gold-100 px-2.5 py-1 text-[10px] font-extrabold tracking-[0.08em] text-navy-900 uppercase">
            {post.category}
          </span>
          <span className="text-[11px] font-semibold text-muted">
            {post.readingTime}
          </span>
        </div>

        <h2 className="mt-4 text-xl leading-snug font-semibold transition group-hover:text-gold-700">
          {post.title}
        </h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-navy-100 pt-4">
          <time
            dateTime={post.date}
            className="text-[11px] font-semibold text-muted"
          >
            {post.displayDate}
          </time>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-navy-900">
            Read article
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-600" />
          </span>
        </div>
      </div>
    </Link>
  );
}
