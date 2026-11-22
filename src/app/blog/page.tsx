import type { Metadata } from "next";
import { BlogCard } from "@/components/cards/BlogCard";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/page/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/data/blog";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Tuition Guides for Delhi NCR Parents",
  description:
    "Practical articles on home tuition, tutor fees, CBSE vs ICSE vs IB, JEE vs NEET and helping your child learn — written for parents in Delhi NCR.",
  path: "/blog",
  keywords: [
    "home tuition guide",
    "home tutor cost Delhi",
    "CBSE vs ICSE vs IB",
    "JEE vs NEET",
  ],
});

export default function BlogPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "RBM Tuition Blog",
    url: absoluteUrl("/blog"),
    publisher: { "@id": absoluteUrl("/#organization") },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.date,
      description: post.excerpt,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            itemList,
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="Blog"
        title="Practical guides for parents, not search-engine filler"
        description="Straight answers on choosing a tutor, understanding fees, comparing boards and deciding between JEE and NEET."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
        highlights={[
          "Parent guides",
          "Fees & planning",
          "Boards & exams",
          "Learning support",
        ]}
      />

      <section className="section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="Latest articles"
            title="Read before you book a tutor"
            description="Short, practical reads based on the questions families ask us most often."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
