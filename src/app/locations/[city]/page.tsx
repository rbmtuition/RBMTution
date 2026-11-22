import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FinalCta } from "@/components/home/FinalCta";
import { DetailShell } from "@/components/page/DetailShell";
import { PageHero } from "@/components/page/PageHero";
import { QuickFactsCard } from "@/components/page/QuickFactsCard";
import { FaqList } from "@/components/ui/FaqList";
import { EnquireLink } from "@/components/ui/EnquireLink";
import { courses } from "@/data/courses";
import { cities, getCity, locationImage } from "@/data/locations";
import { subjects } from "@/data/subjects";
import { cityFaqs, getCityIntro } from "@/lib/content";
import {
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
  serviceSchema,
} from "@/lib/seo";


type Props = { params: Promise<{ city: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) return { title: "Location not found" };

  return buildPageMetadata({
    title: `Home Tuition in ${city.name} | Verified Tutors`,
    description: `Home tuition in ${city.name} for Nursery to Class 12 - CBSE, ICSE, IB, JEE, NEET and CUET. Verified local tutors, free demo, home or online.`,
    path: `/locations/${city.slug}`,
    keywords: [
      `home tuition ${city.name}`,
      `home tutor in ${city.name}`,
      `private tutor ${city.name}`,
    ],
  });
}

const reasons = [
  {
    title: "Tutors who live nearby",
    description:
      "Local tutors reduce travel time and make rescheduling for school events easier.",
  },
  {
    title: "Verified before they arrive",
    description:
      "Qualifications, subject knowledge and a demo lesson are checked before a tutor is recommended.",
  },
  {
    title: "A plan tied to the school",
    description:
      "Syllabus coverage follows your child's school calendar and board requirements, not a generic batch.",
  },
  {
    title: "Replacement without friction",
    description:
      "If the match is not right, we arrange another tutor at no extra cost.",
  },
];

const featuredCourses = courses.filter((course) => course.featured);

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);

  if (!city) notFound();

  const path = `/locations/${city.slug}`;
  const intro = getCityIntro(city);
  const faqs = cityFaqs(city);
  const nearby = cities
    .filter((item) => item.slug !== city.slug)
    .slice(0, 3);
  const courseLinks = featuredCourses.slice(0, 6);
  const subjectLinks = subjects.slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceSchema({
              name: `Home Tuition in ${city.name}`,
              description: intro,
              path,
              serviceType: "Home tuition",
              areaServed: [city.name],
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Locations", path: "/locations" },
              { name: city.name, path },
            ]),
            faqSchema(faqs),
          ]),
        }}
      />

      <PageHero
        eyebrow="Location"
        title={`Home Tuition in ${city.name}`}
        description={intro}
        enquireHref="#enquire"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: city.name },
        ]}
        image={locationImage}
        highlights={[
          city.areas.length > 0
            ? `${city.areas.length} key areas covered`
            : "City-wide coverage",
          "Nursery to Class 12",
          "All major boards",
          "Free demo class",
        ]}
      />

      <DetailShell
        sidebar={
          <>
            <QuickFactsCard
              items={[
                { label: "City", value: city.name },
                {
                  label: "Coverage",
                  value:
                    city.areas.length > 0
                      ? `${city.areas.length} key areas`
                      : "City-wide",
                },
                { label: "Classes", value: "Nursery–12" },
                { label: "Boards", value: "CBSE · ICSE · IB" },
                { label: "Demo class", value: "Free" },
              ]}
            />
            <EnquiryForm
              variant="compact"
              source={`Location — ${city.name}`}
            />
          </>
        }
      >
        <section>
          <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
            Local tutors, matched to your child
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{intro}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {city.tagline} Tuition is available at home or online, for a single
            subject or a full class programme. Every engagement starts with a
            free demo, so you meet the tutor before committing to a schedule.
          </p>
        </section>

        {city.areas.length > 0 ? (
          <section>
            <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
              Areas we cover in {city.name}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Select your locality for local coverage details, popular subjects
              and tutor availability.
            </p>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {city.areas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/locations/${city.slug}/${area.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-navy-100 bg-white px-4 py-3.5 transition hover:border-gold-300 hover:bg-cream/60"
                >
                  <span className="flex items-center gap-2.5 text-sm font-bold text-navy-900">
                    <MapPin className="h-4 w-4 text-gold-600" />
                    {area.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-navy-300 transition group-hover:translate-x-0.5 group-hover:text-gold-600" />
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section>
            <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
              Coverage across {city.name}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We arrange tutors city-wide, including Greater Noida West and the
              Alpha, Beta and Gamma sectors. Share your society or sector and we
              will confirm the nearest available tutor.
            </p>
            <EnquireLink
              href="#enquire"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 underline decoration-gold-400 underline-offset-4 hover:text-gold-700"
            >
              Check tutor availability
              <ArrowRight className="h-4 w-4" />
            </EnquireLink>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
            Popular classes and subjects in {city.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Most requests in {city.name} are for Class 9–12 maths and science,
            followed by primary all-subject tuition and entrance preparation.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
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
          <div className="mt-3 flex flex-wrap gap-2">
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
        </section>

        <section>
          <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
            Why families in {city.name} choose RBM Tuition
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {reasons.map((reason) => (
              <li
                key={reason.title}
                className="rounded-xl border border-navy-100 bg-white p-4"
              >
                <p className="flex items-center gap-2 text-sm font-bold text-navy-900">
                  <CheckCircle2 className="h-4 w-4 text-gold-600" />
                  {reason.title}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                  {reason.description}
                </p>
              </li>
            ))}
          </ul>
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
          <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
            Nearby cities
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {nearby.map((item) => (
              <Link
                key={item.slug}
                href={`/locations/${item.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-navy-100 bg-cream px-4 py-2 text-xs font-bold text-navy-800 transition hover:border-gold-300 hover:bg-gold-50"
              >
                Home tuition in {item.name}
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </section>
      </DetailShell>

      <FinalCta />
    </>
  );
}
