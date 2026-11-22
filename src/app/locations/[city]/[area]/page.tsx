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
import { courses } from "@/data/courses";
import { cities, getArea, getCity, locationImage } from "@/data/locations";
import { subjects } from "@/data/subjects";
import { areaFaqs, getAreaGuide, getAreaIntro, getAreaNote } from "@/lib/content";
import {
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
  serviceSchema,
} from "@/lib/seo";



type Props = { params: Promise<{ city: string; area: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.flatMap((city) =>
    city.areas.map((area) => ({ city: city.slug, area: area.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, area: areaSlug } = await params;
  const city = getCity(citySlug);
  const area = getArea(citySlug, areaSlug);

  if (!city || !area) return { title: "Location not found" };

  const noteLead =
    getAreaNote(city, area)
      .split(/[,;]/)[0]
      ?.trim() || `Local home tuition in ${area.name}`;
  const descriptionSuffix = ` Home tuition in ${area.name}, ${city.name} for Nursery-Class 12 and all boards. Free demo.`;
  const maxLead = 158 - descriptionSuffix.length - 2;
  const shortNote =
    noteLead.length > maxLead
      ? noteLead
          .slice(0, Math.max(0, maxLead))
          .replace(/\s+\S*$/, "")
          .trimEnd()
      : noteLead;
  const description = `${shortNote}.${descriptionSuffix}`.replace(/\.\./g, ".");

  return buildPageMetadata({
    title: `Home Tuition in ${area.name}, ${city.name}`,
    description,
    path: `/locations/${city.slug}/${area.slug}`,
    keywords: [
      `home tuition ${area.name}`,
      `home tutor ${area.name} ${city.name}`,
      `tuition teacher near ${area.name}`,
    ],
  });
}

const reasons = [
  {
    title: "Neighbourhood tutors",
    description:
      "We prefer tutors within a short commute, so classes survive traffic, weather and busy school weeks.",
  },
  {
    title: "Syllabus-first teaching",
    description:
      "Lessons follow the school's chapters and test schedule, with extra practice only where it helps.",
  },
  {
    title: "Transparent fees",
    description:
      "A clear monthly quote after the demo, based on class, subjects, sessions and tutor experience.",
  },
  {
    title: "Free replacement",
    description:
      "If the teaching style does not suit your child, we arrange another tutor without an extra fee.",
  },
];

const featuredCourses = courses.filter((course) => course.featured);

export default async function AreaPage({ params }: Props) {
  const { city: citySlug, area: areaSlug } = await params;
  const city = getCity(citySlug);
  const area = getArea(citySlug, areaSlug);

  if (!city || !area) notFound();

  const path = `/locations/${city.slug}/${area.slug}`;
  const intro = getAreaIntro(city, area);
  const guide = getAreaGuide(city, area);
  const faqs = [...areaFaqs(city, area), ...(guide?.faqs ?? [])];
  const fallbackNearbyPool = area.zone
    ? city.areas.filter(
        (item) => item.slug !== area.slug && item.zone === area.zone,
      )
    : city.areas.filter((item) => item.slug !== area.slug);
  const nearby = area.nearby
    ? area.nearby.flatMap((slug) => {
        const match = city.areas.find((item) => item.slug === slug);
        return match ? [match] : [];
      })
    : fallbackNearbyPool.slice(0, 6);
  const courseLinks = featuredCourses.slice(0, 4);
  const subjectLinks = subjects.slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceSchema({
              name: `Home Tuition in ${area.name}, ${city.name}`,
              description: intro,
              path,
              serviceType: "Home tuition",
              areaServed: [area.name, city.name],
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Locations", path: "/locations" },
              { name: city.name, path: `/locations/${city.slug}` },
              { name: area.name, path },
            ]),
            faqSchema(faqs),
          ]),
        }}
      />

      <PageHero
        eyebrow="Locality"
        title={`Home Tuition in ${area.name}, ${city.name}`}
        description={`Find a verified home tutor in ${area.name}, ${city.name} for Nursery to Class 12, all major boards and entrance exams.`}
        enquireHref="#enquire"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: city.name, href: `/locations/${city.slug}` },
          { label: area.name },
        ]}
        image={locationImage}
        highlights={[
          city.name,
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
                { label: "Locality", value: area.name },
                { label: "City", value: city.name },
                { label: "Classes", value: "Nursery–12" },
                { label: "Mode", value: "Home & online" },
                { label: "Demo class", value: "Free" },
              ]}
            />
            <EnquiryForm
              variant="compact"
              source={`Area — ${area.name}, ${city.name}`}
            />
          </>
        }
      >
        <section>
          <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
            Tuition that fits life in {area.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{intro}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            We arrange one-to-one home tuition for primary, middle and senior
            classes, plus entrance exam preparation for JEE, NEET and CUET. If
            home scheduling becomes difficult, the same plan can continue
            online.
          </p>
        </section>

        {guide ? (
          <>
            <section>
              <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
                Around {area.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {guide.local}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
                Schools, colleges and study support in {area.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {guide.education}
              </p>
            </section>
          </>
        ) : null}

        <section>
          <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
            Classes and boards in {area.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {guide?.classes ??
              "Local requests usually start with maths, science and English. Senior students often add board revision or entrance preparation alongside school tuition."}
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
            Why families here choose RBM Tuition
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

        {nearby.length > 0 ? (
          <section>
            <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
              Nearby areas in {city.name}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {nearby.map((item) => (
                <Link
                  key={item.slug}
                  href={`/locations/${city.slug}/${item.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy-100 bg-cream px-3.5 py-1.5 text-xs font-bold text-navy-800 transition hover:border-gold-300 hover:bg-gold-50"
                >
                  <MapPin className="h-3 w-3 text-gold-600" />
                  {item.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section>
          <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
            Frequently asked questions
          </h2>
          <div className="mt-5">
            <FaqList items={faqs} />
          </div>
        </section>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
              More in {city.name}
            </h2>
            <Link
              href={`/locations/${city.slug}`}
              className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-navy-900 hover:text-gold-700"
            >
              Home tuition in {city.name}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            See the full{" "}
            <Link
              href={`/locations/${city.slug}`}
              className="font-bold text-navy-900 underline decoration-gold-400 underline-offset-4 hover:text-gold-700"
            >
              {city.name} coverage page
            </Link>{" "}
            or browse{" "}
            <Link
              href="/locations"
              className="font-bold text-navy-900 underline decoration-gold-400 underline-offset-4 hover:text-gold-700"
            >
              all locations across Delhi NCR
            </Link>
            .
          </p>
        </section>
      </DetailShell>

      <FinalCta />
    </>
  );
}
