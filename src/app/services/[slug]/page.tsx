import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FinalCta } from "@/components/home/FinalCta";
import { DetailShell } from "@/components/page/DetailShell";
import { PageHero } from "@/components/page/PageHero";
import { QuickFactsCard } from "@/components/page/QuickFactsCard";
import { StepsGrid } from "@/components/page/StepsGrid";
import { FaqList } from "@/components/ui/FaqList";
import { courses, featuredCourses } from "@/data/courses";
import { serviceDetails } from "@/data/detailContent";
import { getService, services } from "@/data/services";
import { subjects } from "@/data/subjects";
import { serviceFaqs } from "@/lib/content";
import {
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
  serviceSchema,
} from "@/lib/seo";
import { tuitionSteps } from "@/lib/steps";
import { truncate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

const servicePhotos: Record<string, { src: string; alt: string }> = {
  "home-tuition": {
    src: "/photos/home-tuition-session.avif",
    alt: "A tutor guiding a student's hand while writing in a notebook at home",
  },
  "online-tuition": {
    src: "/photos/online-tuition-session.avif",
    alt: "A student taking notes during an online tuition lesson on a laptop",
  },
  "group-classes": {
    src: "/photos/group-classes-session.avif",
    alt: "Three students studying together around a table with notes and a laptop",
  },
  "exam-preparation": {
    src: "/photos/exam-preparation-session.avif",
    alt: "A student revising with open textbooks, notes and a calculator",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };

  const detail = serviceDetails[service.slug];

  return buildPageMetadata({
    title: `${service.name} in Delhi NCR`,
    description: truncate(
      detail?.intro ?? `${service.name} across Delhi NCR — ${service.blurb}`,
    ),
    path: `/services/${service.slug}`,
    keywords: [
      `${service.keyword} Delhi NCR`,
      `${service.keyword} at home`,
      service.name.toLowerCase(),
    ],
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  const detail = serviceDetails[slug];

  if (!service || !detail) notFound();

  const path = `/services/${service.slug}`;
  const photo = servicePhotos[service.slug];
  const faqs = serviceFaqs(service);
  const index = services.findIndex((item) => item.slug === service.slug);
  const related = [1, 2, 3].map(
    (offset) => services[(index + offset) % services.length],
  );
  const subjectLinks = subjects.slice(0, 6);
  const courseLinks =
    featuredCourses.length >= 4 ? featuredCourses.slice(0, 6) : courses.slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceSchema({
              name: `${service.name} in Delhi NCR`,
              description: detail.intro,
              path,
              serviceType: service.name,
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.shortName, path },
            ]),
            faqSchema(faqs),
          ]),
        }}
      />

      <PageHero
        eyebrow="Service"
        title={`${service.name} in Delhi NCR`}
        description={detail.intro}
        enquireHref="#enquire"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.shortName },
        ]}
        highlights={[
          "Nursery to Class 12",
          "All major boards",
          "Free demo class",
          "Delhi NCR",
        ]}
      />

      <DetailShell
        sidebar={
          <>
            <QuickFactsCard
              items={[
                { label: "Format", value: service.shortName },
                { label: "Mode", value: "Home & online" },
                { label: "Classes", value: "Nursery–12" },
                { label: "Demo class", value: "Free" },
                { label: "Start", value: "24–48 hours" },
              ]}
            />
            <EnquiryForm
              variant="compact"
              source={`Service — ${service.shortName}`}
            />
          </>
        }
      >
        {photo ? (
          <section className="overflow-hidden rounded-2xl border border-navy-100">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={1600}
              height={1200}
              quality={55}
              sizes="(min-width: 1024px) 780px, 100vw"
              className="h-auto w-full object-cover"
            />
          </section>
        ) : null}

        <section>
          <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
            What&rsquo;s included
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Every {service.name.toLowerCase()} engagement follows the same
            basics: a matched tutor, a plan tied to the school syllabus, and
            feedback you can act on.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {detail.includes.map((item) => (
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
            How it works
          </h2>
          <div className="mt-5">
            <StepsGrid steps={tuitionSteps} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
            Popular classes and subjects
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Use this service alongside a class programme, or add subject-specific
            tutors where your child needs more support.
          </p>
          <p className="mt-5 text-[10px] font-extrabold tracking-[0.18em] text-navy-500 uppercase">
            Classes
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {courseLinks.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="rounded-full border border-navy-100 bg-white px-3.5 py-1.5 text-xs font-bold text-navy-800 transition hover:border-gold-300 hover:bg-cream"
              >
                {course.shortName}
              </Link>
            ))}
          </div>
          <p className="mt-5 text-[10px] font-extrabold tracking-[0.18em] text-navy-500 uppercase">
            Subjects
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
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
          <p className="mt-5 text-sm leading-relaxed text-muted">
            Find local availability on the{" "}
            <Link
              href="/locations"
              className="font-bold text-navy-900 underline decoration-gold-400 underline-offset-4 hover:text-gold-700"
            >
              locations page
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
              Other services
            </h2>
            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-navy-900 hover:text-gold-700"
            >
              All services
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ServiceCard key={item.slug} service={item} />
            ))}
          </div>
        </section>
      </DetailShell>

      <FinalCta />
    </>
  );
}
