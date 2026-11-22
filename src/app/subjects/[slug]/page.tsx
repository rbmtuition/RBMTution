import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SubjectCard } from "@/components/cards/SubjectCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FinalCta } from "@/components/home/FinalCta";
import { DetailShell } from "@/components/page/DetailShell";
import { PageHero } from "@/components/page/PageHero";
import { QuickFactsCard } from "@/components/page/QuickFactsCard";
import { FaqList } from "@/components/ui/FaqList";
import { getCourse } from "@/data/courses";
import { subjectDetails } from "@/data/detailContent";
import { cities } from "@/data/locations";
import { getSubject, subjects } from "@/data/subjects";
import { subjectFaqs } from "@/lib/content";
import {
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
  serviceSchema,
} from "@/lib/seo";
import { truncate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return subjects.map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject) return { title: "Subject not found" };

  const detail = subjectDetails[subject.slug];

  return buildPageMetadata({
    title: `${subject.name} Home Tuition in Delhi NCR`,
    description: truncate(
      detail?.intro ??
        `${subject.name} home tuition in Delhi NCR. ${subject.blurb}`,
    ),
    path: `/subjects/${subject.slug}`,
    keywords: [
      `${subject.name} home tuition`,
      `${subject.name} tutor Delhi NCR`,
      `${subject.name} tuition at home`,
    ],
  });
}

const examMap: Record<string, string[]> = {
  mathematics: ["jee", "cuet", "foundation"],
  physics: ["jee", "neet", "foundation"],
  chemistry: ["jee", "neet", "foundation"],
  biology: ["neet", "foundation"],
  science: ["foundation", "board-exam-preparation"],
  accountancy: ["cuet", "board-exam-preparation"],
  economics: ["cuet", "board-exam-preparation"],
  "business-studies": ["cuet", "board-exam-preparation"],
  "computer-science": ["board-exam-preparation", "cuet"],
  english: ["cuet", "board-exam-preparation"],
  hindi: ["board-exam-preparation", "crash-course"],
  "social-science": ["board-exam-preparation", "crash-course"],
  evs: ["foundation"],
  history: ["cuet", "board-exam-preparation"],
  geography: ["cuet", "board-exam-preparation"],
  "political-science": ["cuet", "board-exam-preparation"],
  psychology: ["cuet", "board-exam-preparation"],
  sanskrit: ["board-exam-preparation", "crash-course"],
  french: ["cuet", "board-exam-preparation"],
  german: ["cuet", "board-exam-preparation"],
  entrepreneurship: ["cuet", "board-exam-preparation"],
  "informatics-practices": ["board-exam-preparation", "cuet"],
  "artificial-intelligence": ["board-exam-preparation", "foundation"],
  "legal-studies": ["cuet", "board-exam-preparation"],
};

export default async function SubjectPage({ params }: Props) {
  const { slug } = await params;
  const subject = getSubject(slug);
  const detail = subjectDetails[slug];

  if (!subject || !detail) notFound();

  const path = `/subjects/${subject.slug}`;
  const faqs = subjectFaqs(subject);
  const index = subjects.findIndex((item) => item.slug === subject.slug);
  const related = [1, 2, 3, 4].map(
    (offset) => subjects[(index + offset) % subjects.length],
  );
  const examCourses = (examMap[subject.slug] ?? [])
    .map((courseSlug) => getCourse(courseSlug))
    .filter((course) => course !== undefined);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceSchema({
              name: `${subject.name} Home Tuition in Delhi NCR`,
              description: detail.intro,
              path,
              serviceType: `${subject.name} tuition`,
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Subjects", path: "/subjects" },
              { name: subject.name, path },
            ]),
            faqSchema(faqs),
          ]),
        }}
      />

      <PageHero
        eyebrow="Subject"
        title={`${subject.name} Home Tuition in Delhi NCR`}
        description={detail.intro}
        enquireHref="#enquire"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Subjects", href: "/subjects" },
          { label: subject.name },
        ]}
        highlights={[
          subject.classes,
          "CBSE · ICSE · IB",
          "Home or online",
          "Free demo class",
        ]}
      />

      <DetailShell
        sidebar={
          <>
            <QuickFactsCard
              items={[
                { label: "Subject", value: subject.name },
                { label: "Classes", value: subject.classes },
                { label: "Boards", value: "CBSE · ICSE · IB" },
                { label: "Mode", value: "Home & online" },
                { label: "Demo class", value: "Free" },
              ]}
            />
            <EnquiryForm
              variant="compact"
              source={`Subject — ${subject.name}`}
            />
          </>
        }
      >
        <section>
          <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
            Topics covered
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {subject.blurb} The tutor builds a chapter plan around your
            child&rsquo;s school syllabus and adjusts it as exams approach.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {detail.topics.map((topic) => (
              <li
                key={topic}
                className="flex items-start gap-2.5 rounded-xl border border-navy-100 bg-white px-4 py-3.5 text-sm font-semibold text-navy-900"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                {topic}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
            Classes, boards and exam support
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {subject.name} tuition is available for primary, middle and senior
            classes across CBSE, ICSE, IB, NIOS and state boards. For senior
            students, tutors align school work with entrance exam requirements.
          </p>
          {examCourses.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {examCourses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy-100 bg-cream px-3.5 py-1.5 text-xs font-bold text-navy-800 transition hover:border-gold-300 hover:bg-gold-50"
                >
                  {course.name}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
          ) : null}
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Explore{" "}
            <Link
              href="/courses"
              className="font-bold text-navy-900 underline decoration-gold-400 underline-offset-4 hover:text-gold-700"
            >
              all courses
            </Link>{" "}
            to combine subject tuition with a full programme.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
            Where we teach
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Home tutors are available in localities across Delhi NCR, and online
            classes are available anywhere in India.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${city.slug}`}
                className="rounded-full border border-navy-100 bg-white px-3.5 py-1.5 text-xs font-bold text-navy-800 transition hover:border-gold-300 hover:bg-cream"
              >
                {subject.name} tutor in {city.name}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
            Frequently asked questions
          </h2>
          <div className="mt-5">
            <FaqList items={faqs} />
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
              Other subjects
            </h2>
            <Link
              href="/subjects"
              className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-navy-900 hover:text-gold-700"
            >
              All subjects
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <SubjectCard key={item.slug} subject={item} />
            ))}
          </div>
        </section>
      </DetailShell>

      <FinalCta />
    </>
  );
}
