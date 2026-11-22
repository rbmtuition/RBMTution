import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CourseCard } from "@/components/cards/CourseCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FinalCta } from "@/components/home/FinalCta";
import { DetailShell } from "@/components/page/DetailShell";
import { PageHero } from "@/components/page/PageHero";
import { QuickFactsCard } from "@/components/page/QuickFactsCard";
import { StepsGrid } from "@/components/page/StepsGrid";
import { FaqList } from "@/components/ui/FaqList";
import { courses, getCourse, getCourseImage } from "@/data/courses";
import { courseDetails } from "@/data/detailContent";
import { subjects } from "@/data/subjects";
import { courseFaqs } from "@/lib/content";
import { tuitionSteps } from "@/lib/steps";
import {
  breadcrumbSchema,
  buildPageMetadata,
  courseSchema,
  faqSchema,
} from "@/lib/seo";
import { truncate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Course not found" };

  const detail = courseDetails[course.slug];
  const description = truncate(
    detail?.intro ??
      `${course.name} at home or online across Delhi NCR. ${course.blurb}`,
  );

  return buildPageMetadata({
    title: `${course.name} in Delhi NCR`,
    description,
    path: `/courses/${course.slug}`,
    keywords: course.keywords,
  });
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  const detail = courseDetails[slug];

  if (!course || !detail) notFound();

  const path = `/courses/${course.slug}`;
  const photo = getCourseImage(course);
  const faqs = courseFaqs(course);
  const courseIndex = courses.findIndex((item) => item.slug === course.slug);
  const related = [1, 2, 3].map(
    (offset) => courses[(courseIndex + offset) % courses.length],
  );
  const subjectLinks = subjects.slice(0, 8);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            courseSchema({
              name: `${course.name} in Delhi NCR`,
              description: detail.intro,
              path,
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Courses", path: "/courses" },
              { name: course.shortName, path },
            ]),
            faqSchema(faqs),
          ]),
        }}
      />

      <PageHero
        eyebrow="Course"
        title={`${course.name} in Delhi NCR`}
        description={detail.intro}
        enquireHref="#enquire"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
          { label: course.shortName },
        ]}
        highlights={[
          course.label,
          "Home or online",
          "All major boards",
          "Free demo class",
        ]}
        image={photo}
      />

      <DetailShell
        sidebar={
          <>
            <QuickFactsCard
              items={[
                { label: "Classes", value: course.label },
                { label: "Boards", value: "CBSE · ICSE · IB" },
                { label: "Mode", value: "Home & online" },
                { label: "Demo class", value: "Free" },
                { label: "Coverage", value: "Delhi NCR" },
              ]}
            />
            <EnquiryForm
              variant="compact"
              source={`Course — ${course.shortName}`}
            />
          </>
        }
      >
        <section>
          <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
            What this programme covers
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The syllabus is planned around your child&rsquo;s school, board and
            exam dates. Topics are revised in class, then practised with
            feedback.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {detail.covers.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-xl border border-navy-100 bg-white px-4 py-3.5 text-sm font-semibold text-navy-900"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
            How the tutoring works
          </h2>
          <div className="mt-5">
            <StepsGrid steps={tuitionSteps} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
            Subjects and support
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {course.shortName} students can add subject-specific tutors or
            combine tuition with test series and doubt sessions. Popular subject
            pages:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {subjectLinks.map((subject) => (
              <Link
                key={subject.slug}
                href={`/subjects/${subject.slug}`}
                className="rounded-full border border-navy-100 bg-white px-3.5 py-1.5 text-xs font-bold text-navy-800 transition hover:border-gold-300 hover:bg-cream"
              >
                {subject.name}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Looking for a tutor in your locality? See{" "}
            <Link
              href="/locations"
              className="font-bold text-navy-900 underline decoration-gold-400 underline-offset-4 hover:text-gold-700"
            >
              all locations across Delhi NCR
            </Link>
            .
          </p>
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
              Other courses
            </h2>
            <Link
              href="/courses"
              className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-navy-900 hover:text-gold-700"
            >
              All courses
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <CourseCard key={item.slug} course={item} />
            ))}
          </div>
        </section>
      </DetailShell>

      <FinalCta />
    </>
  );
}
