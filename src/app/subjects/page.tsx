import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SubjectCard } from "@/components/cards/SubjectCard";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/page/PageHero";
import { FaqSection } from "@/components/ui/FaqSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Faq } from "@/data/faqs";
import { subjects } from "@/data/subjects";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Home Tuition Subjects in Delhi NCR",
  description:
    "Subject-wise home tuition in Delhi NCR for maths, science, English, Hindi, languages, commerce, humanities, computer science and AI. Classes 1-12.",
  path: "/subjects",
  keywords: [
    "maths home tutor Delhi NCR",
    "science tuition at home",
    "English home tuition",
    "subject wise tutor",
  ],
});

const examLinks = [
  { label: "JEE preparation", href: "/courses/jee" },
  { label: "NEET preparation", href: "/courses/neet" },
  { label: "CUET preparation", href: "/courses/cuet" },
];

const faqs: Faq[] = [
  {
    question: "Which subjects do you cover?",
    answer:
      "We arrange tutors for school subjects from EVS and languages to maths, science, commerce, humanities, computer science and AI. Share the class, board and subject so we can match a specialist.",
  },
  {
    question: "Can one tutor teach multiple subjects?",
    answer:
      "For primary and middle school, one tutor can usually cover all subjects. From Class 9 onwards, subject specialists are recommended for accuracy in each paper.",
  },
  {
    question: "Are subject tutors available online?",
    answer:
      "Yes. Every subject is available as live one-to-one online tuition with the same tutor screening and study planning used for home classes.",
  },
  {
    question: "Do you support CBSE, ICSE and IB?",
    answer:
      "Yes. Tell us the board and school when you enquire, and we will match a tutor familiar with that syllabus and marking pattern.",
  },
];

export default function SubjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Subjects"
        title="Subject tutors who know the syllabus, not just the textbook"
        description="Choose a subject to see how tutors teach it, which classes are covered and how exam preparation is planned."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Subjects" }]}
        highlights={[
          `${subjects.length} subjects`,
          "Classes 1-12",
          "CBSE, ICSE & IB",
          "Home and online",
        ]}
      />

      <section className="section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="Subject-wise tuition"
            title="Find support for the paper that needs it"
            description="Subject specialists for senior classes, all-subject tutors for younger students."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <SubjectCard key={subject.slug} subject={subject} />
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-navy-100 bg-cream/70 p-6 sm:p-8">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Preparing for an entrance exam?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              Subject tuition can run alongside focused entrance preparation.
              Explore our exam programmes:
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {examLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-4 py-2 text-xs font-bold text-navy-900 transition hover:border-gold-300 hover:bg-cream"
                >
                  {link.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={faqs} />
      <FinalCta />
    </>
  );
}
