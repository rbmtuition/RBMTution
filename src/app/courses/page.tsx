import type { Metadata } from "next";
import { CourseCard } from "@/components/cards/CourseCard";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/page/PageHero";
import { FaqSection } from "@/components/ui/FaqSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { courses } from "@/data/courses";
import type { Faq } from "@/data/faqs";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const description =
  "Explore home tuition courses in Delhi NCR for Nursery to Class 12 — CBSE, ICSE, IB, JEE, NEET, CUET, board exams and crash courses. Book a free demo.";

export const metadata: Metadata = buildPageMetadata({
  title: "Home Tuition Courses in Delhi NCR",
  description,
  path: "/courses",
  keywords: [
    "home tuition courses Delhi NCR",
    "class 10 home tuition",
    "JEE home tuition",
    "NEET home tuition",
    "CBSE home tutor",
  ],
});

const faqs: Faq[] = [
  {
    question: "Which courses do you offer?",
    answer:
      "We cover primary (Class 1–5), middle school (Class 6–8), Class 9–10 board preparation, Class 11–12 science, commerce and humanities, plus JEE, NEET, CUET, foundation, board exam and crash courses.",
  },
  {
    question: "Can we combine home and online classes?",
    answer:
      "Yes. Many families use home tuition during the week and online classes when travelling. The same tutor and study plan can continue across both modes.",
  },
  {
    question: "How are tutors matched to a course?",
    answer:
      "We match by class, subject, board and locality, then confirm the tutor's subject knowledge with a demo. You meet the tutor in a free demo class before committing.",
  },
  {
    question: "What does the free demo include?",
    answer:
      "The demo includes a short level assessment, an explanation of the study plan and a sample lesson. There is no payment or obligation to continue.",
  },
];

export default function CoursesPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: course.name,
      url: absoluteUrl(`/courses/${course.slug}`),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      <PageHero
        eyebrow="Courses"
        title="Home tuition courses for every class and exam"
        description="Structured programmes for Nursery to Class 12, all major boards, and competitive exams — taught at home or online by verified tutors."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Courses" },
        ]}
        highlights={[
          "Nursery to Class 12",
          "CBSE, ICSE, IB & NIOS",
          "JEE, NEET & CUET",
          "Home and online",
        ]}
      />

      <section className="section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="Programmes"
            title="Pick the right starting point"
            description="Every programme includes a free demo, a personalised study plan and regular progress feedback."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs} />
      <FinalCta />
    </>
  );
}
