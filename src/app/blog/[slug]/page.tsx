import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, Phone } from "lucide-react";
import { BlogCard } from "@/components/cards/BlogCard";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/page/PageHero";
import { EnquireLink } from "@/components/ui/EnquireLink";
import { blogPosts, getBlogImage, getPost } from "@/data/blog";
import { blogContent } from "@/data/blogContent";
import { siteConfig } from "@/data/site";
import {
  absoluteUrl,
  breadcrumbSchema,
  buildPageMetadata,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };

  const path = `/blog/${post.slug}`;
  const base = buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path,
    keywords: [post.category.toLowerCase(), "home tuition Delhi NCR"],
  });

  return {
    ...base,
    openGraph: {
      type: "article",
      url: path,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [siteConfig.name],
      section: post.category,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  const article = blogContent[slug];

  if (!post || !article) notFound();

  const path = `/blog/${post.slug}`;
  const image = getBlogImage(post.slug);
  const related = blogPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(path),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    inLanguage: "en-IN",
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: { "@id": absoluteUrl("/#organization") },
    image: [absoluteUrl("/opengraph-image")],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            articleSchema,
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        meta={`${post.displayDate} · ${post.readingTime} · By RBM Tuition`}
        showCta={false}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <section className="section-pad">
        <div className="container-site max-w-3xl">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-navy-100">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              quality={55}
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>

          <article className="mt-8">
            <div className="space-y-5 text-[15px] leading-relaxed text-navy-700 sm:text-base">
              {article.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            {article.sections.map((section) => (
              <section key={section.heading} className="mt-10">
                <h2 className="font-display text-xl font-semibold text-navy-900 sm:text-2xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="mt-4 space-y-2.5">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <div className="mt-12 rounded-2xl border border-navy-100 bg-cream p-6 sm:p-7">
              <p className="text-[10px] font-extrabold tracking-[0.18em] text-gold-700 uppercase">
                Key takeaways
              </p>
              <ul className="mt-4 space-y-2.5">
                {article.takeaways.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-navy-800"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-navy-100 pt-6">
              <div>
                <p className="text-sm font-bold text-navy-900">
                  Written by the RBM Tuition team
                </p>
                <p className="mt-1 text-xs text-muted">
                  Based on questions families ask us across Delhi NCR.
                </p>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold text-navy-900 hover:text-gold-700"
              >
                Back to all articles
              </Link>
            </div>

            <div className="mt-10 rounded-2xl bg-navy-950 p-6 text-white sm:p-8">
              <p className="text-[10px] font-extrabold tracking-[0.2em] text-gold-400 uppercase">
                Next step
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Want help applying this to your child?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-navy-200">
                Share the class, subject and locality. We will suggest a tutor
                and arrange a free demo class at home or online.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <EnquireLink
                  href="/#enquire"
                  className="btn-gold px-5 py-2.5 text-[13px]"
                >
                  Book a free demo
                </EnquireLink>
                <a
                  href={siteConfig.phoneHref}
                  className="btn-ghost-light px-5 py-2.5 text-[13px]"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section-pad bg-cream pt-0">
        <div className="container-site">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
              Keep reading
            </h2>
            <Link
              href="/blog"
              className="text-xs font-bold text-navy-900 hover:text-gold-700"
            >
              All articles
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <BlogCard key={item.slug} post={item} />
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
