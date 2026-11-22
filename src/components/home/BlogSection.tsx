import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/data/blog";

export function BlogSection() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Guides for parents"
            title="Clear advice before you hire a tutor"
            description="Practical reads on fees, boards, exam choices and how to tell whether tuition is helping."
          />
          <Link href="/blog" className="btn-outline self-start lg:self-auto">
            Visit the blog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-card"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-gold-50 px-3 py-1 text-[10px] font-extrabold tracking-[0.12em] text-gold-700 uppercase">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-muted">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {post.displayDate}
                </span>
              </div>
              <h3 className="mt-4 text-xl leading-snug font-semibold group-hover:text-gold-700">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {post.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 group-hover:text-gold-600">
                Read guide
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
