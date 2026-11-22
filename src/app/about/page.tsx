import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/page/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cities, totalAreas } from "@/data/locations";
import { siteConfig } from "@/data/site";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us — Verified Home Tutors in Delhi NCR",
  description:
    "RBM Tuition connects families across Delhi NCR with verified home and online tutors. Learn how we screen, match and support tutors for Nursery to Class 12.",
  path: "/about",
  keywords: [
    "about RBM Tuition",
    "verified home tutors Delhi NCR",
    "home tuition agency Noida",
  ],
});

const stats = [
  { value: "23,000+", label: "Registered tutors" },
  { value: "10+", label: "Years of tutoring" },
  { value: "6", label: "Cities covered" },
  { value: `${totalAreas}+`, label: "Localities served" },
];

const vetting = [
  {
    icon: ClipboardCheck,
    title: "Application and subject review",
    description:
      "We look at the subjects a tutor can actually teach, their class-level comfort and their track record before anything else.",
  },
  {
    icon: BadgeCheck,
    title: "Qualification and ID checks",
    description:
      "Educational documents and identity are verified before a tutor is offered to a family.",
  },
  {
    icon: GraduationCap,
    title: "Demo lesson",
    description:
      "A tutor's explanation has to land with a real student. The demo is where teaching quality gets tested, not just described.",
  },
  {
    icon: HeartHandshake,
    title: "Feedback after starting",
    description:
      "We ask how the first weeks went. If the fit is wrong, we arrange a replacement instead of pushing through.",
  },
];

const standards = [
  {
    title: "The demo is always free",
    description:
      "No payment is needed to meet a tutor. Families should choose with evidence, not a sales call.",
  },
  {
    title: "Fees are agreed upfront",
    description:
      "The monthly quote depends on class, subjects, sessions and experience. There are no surprise add-ons later.",
  },
  {
    title: "One student at a time",
    description:
      "Home and online tuition are one-to-one by default, so lessons can slow down or speed up with the student.",
  },
  {
    title: "Parents stay informed",
    description:
      "Tests and progress updates tell you what improved and what still needs work, in plain language.",
  },
];

const galleryShots = [
  {
    src: "/photos/home-tuition-session.avif",
    alt: "A tutor guiding a student's hand while writing in a notebook at home",
    label: "Guided practice",
    caption: "The tutor starts the first step, then hands over the pen.",
  },
  {
    src: "/photos/gallery-doubt-solving.avif",
    alt: "A tutor pointing at a student's workbook during a home lesson",
    label: "Doubt clearing",
    caption: "Questions are answered at the point they come up.",
  },
  {
    src: "/photos/exam-preparation-session.avif",
    alt: "Open textbooks, notes and a calculator laid out for revision",
    label: "Structured revision",
    caption: "A plan tied to the syllabus and the next test.",
  },
  {
    src: "/photos/gallery-test-correction.avif",
    alt: "A teacher marking a test paper with a red pen",
    label: "Marked work",
    caption: "Every paper comes back with corrections and next steps.",
  },
];

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About RBM Tuition",
    url: absoluteUrl("/about"),
    description:
      "How RBM Tuition screens, matches and supports home and online tutors across Delhi NCR.",
    about: { "@id": absoluteUrl("/#organization") },
    mainEntity: { "@id": absoluteUrl("/#organization") },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            aboutSchema,
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="About us"
        title="Right teacher. Bright future. That is the whole idea."
        description="RBM Tuition exists to make one decision less stressful for parents: finding a tutor who fits the student, not just the vacancy."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
        highlights={[
          "23,000+ tutors",
          "ISO 9001:2015 certified",
          "6 cities",
          "10+ years",
        ]}
      />

      <section className="section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Why we exist"
              title="A matching problem, not a tuition problem"
            />
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted sm:text-[15px]">
              <p>
                Most families do not struggle to find a tutor. They struggle to
                find the right one. A teacher who is excellent for a Class 12
                physics student may be the wrong fit for a Class 4 child who
                needs patience and routine. A tutor who lives ten minutes away
                may still not understand the school&rsquo;s internal assessment
                pattern.
              </p>
              <p>
                RBM Tuition was built around that gap. We start with the
                student&rsquo;s class, board, subject and locality. Then we look
                for a tutor whose teaching style and syllabus experience match
                the requirement. The free demo is the final check, and the
                family makes the decision.
              </p>
              <p>
                Over the years, that approach has grown into a network of more
                than 23,000 registered tutors across Delhi, Noida, Greater Noida,
                Gurgaon, Ghaziabad and Faridabad, plus live online tuition for
                families outside NCR.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-navy-100 bg-cream/70 p-6 sm:p-7">
            <p className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.18em] text-navy-900 uppercase">
              <ShieldCheck className="h-4 w-4 text-gold-600" />
              Our quality commitments
            </p>
            <ul className="mt-4 space-y-3.5">
              {siteConfig.certifications.map((cert) => (
                <li
                  key={cert.label}
                  className="rounded-xl border border-navy-100 bg-white px-4 py-3"
                >
                  <p className="text-sm font-bold text-navy-900">
                    {cert.label}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-muted">
                    {cert.detail}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Certification and registration details are published as listed on
              our official records. You can ask for documentation during
              onboarding.
            </p>
          </div>
        </div>

        <div className="container-site mt-14">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-navy-100 bg-white px-5 py-6 text-center"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-semibold text-navy-900">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[11px] font-bold tracking-[0.08em] text-muted uppercase">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our process"
            title="How we vet and match tutors"
            description="A shortlist is not a match. Every tutor goes through these checks before a family sees the recommendation."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {vetting.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-navy-100 bg-white p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Standards"
            title="What every family should expect"
            description="These are not extras. They are the baseline we hold ourselves to, whether the class happens at home or online."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {standards.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-navy-100 bg-white p-4"
              >
                <p className="text-sm font-bold text-navy-900">{item.title}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.2em] text-gold-700 uppercase">
              <MapPin className="h-4 w-4" />
              Where we work
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-[1.9rem]">
              Local in Delhi NCR, available online across India
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Home tutors are available across {totalAreas}+ localities in six
              cities. If a home tutor is not available at your preferred time,
              or your family travels often, the same tutor-matching process is
              available online.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}`}
                  className="rounded-full border border-navy-100 bg-white px-4 py-1.5 text-xs font-bold text-navy-800 transition hover:border-gold-300 hover:bg-gold-50"
                >
                  {city.name}
                </Link>
              ))}
            </div>
            <Link
              href="/locations"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 hover:text-gold-700"
            >
              Browse all locations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-100 text-navy-900">
              <Users className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-xl font-semibold sm:text-2xl">
              Are you a teacher?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              We are always looking for subject specialists who can explain
              clearly and work patiently with school students. Tell us your
              subjects, classes and preferred localities.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href={siteConfig.tutorPhoneHref}
                className="btn-gold px-5 py-2.5 text-[13px]"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.tutorPhone}
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-navy-200 px-5 py-2.5 text-[13px] font-bold text-navy-900 transition hover:border-gold-300 hover:bg-cream"
              >
                Contact the tutor team
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted">
              Tutor line hours: {siteConfig.hours}.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="In the classroom"
            title="What lessons actually look like"
            description="Close-ups from home and online sessions: guided practice, doubt clearing, structured revision and feedback on every test."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {galleryShots.map((shot) => (
              <figure
                key={shot.src}
                className="overflow-hidden rounded-2xl border border-navy-100 bg-cream/60"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    quality={55}
                    sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-4">
                  <p className="text-[10px] font-extrabold tracking-[0.18em] text-gold-700 uppercase">
                    {shot.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-navy-900">
                    {shot.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-6 py-8 text-white sm:px-10 sm:py-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-teal-400/15 blur-3xl"
            />
            <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.22em] text-teal-300 uppercase">
                  RBM Web Solutions
                </p>
                <h2 className="mt-2 text-2xl leading-tight font-semibold text-white sm:text-3xl">
                  Need a website for your school, coaching centre or business?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy-200">
                  We also design and build fast, mobile-first websites, with
                  fixed packages, clear timelines and support after launch.
                </p>
              </div>
              <Link
                href="/web-solutions"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-bold text-navy-950 transition hover:bg-teal-400"
              >
                Explore web solutions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
