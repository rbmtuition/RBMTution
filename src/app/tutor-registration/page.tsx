import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Phone } from "lucide-react";
import { TutorRegistrationForm } from "@/components/forms/TutorRegistrationForm";
import { PageHero } from "@/components/page/PageHero";
import { siteConfig } from "@/data/site";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Tutor Registration — Home & Online Tuition Jobs",
  description:
    "Apply to teach with RBM Tuition. Share your qualifications, subjects, classes and availability for home and online tuition assignments across Delhi NCR.",
  path: "/tutor-registration",
  keywords: [
    "tuition jobs Delhi NCR",
    "home tutor jobs Noida",
    "online tuition jobs India",
    "apply as a tutor RBM Tuition",
  ],
});

const reasons = [
  {
    title: "Verified families",
    description:
      "We confirm the class, subjects and locality before sharing any assignment.",
  },
  {
    title: "Home and online work",
    description:
      "Take assignments in the mode that fits your schedule and travel range.",
  },
  {
    title: "Flexible timings",
    description:
      "Teach on weekday mornings, evenings or weekends based on your availability.",
  },
  {
    title: "One point of contact",
    description:
      "Our tutor team coordinates demo classes, fee discussions and feedback.",
  },
];

const nextSteps = [
  {
    title: "Apply online",
    description:
      "Share your qualifications, subjects, classes and availability.",
  },
  {
    title: "Screening call",
    description:
      "We verify your details and understand your teaching strengths.",
  },
  {
    title: "Demo and onboarding",
    description:
      "Meet the family for a demo class and start once both sides agree.",
  },
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Tutor Registration",
  url: absoluteUrl("/tutor-registration"),
  description:
    "Apply to teach with RBM Tuition for home and online tuition assignments across Delhi NCR.",
  isPartOf: { "@id": absoluteUrl("/#website") },
  about: { "@id": absoluteUrl("/#organization") },
};

export default function TutorRegistrationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageSchema,
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Tutor registration", path: "/tutor-registration" },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="For teachers"
        title="Teach with RBM Tuition"
        description="Join a network of 23,000+ tutors and take up home or online tuition assignments across Delhi NCR. Tell us what you teach and where you can travel — we handle the family conversations, matching and coordination."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tutor registration" },
        ]}
        highlights={[
          "Home and online assignments",
          "Delhi NCR localities",
          "Flexible timings",
          "Review in 24–48 hours",
        ]}
        showCta={false}
      />

      <section className="section-pad bg-cream">
        <div className="container-site grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-12">
          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="flex items-center gap-4 overflow-hidden rounded-2xl border border-navy-100 bg-white">
              <div className="relative aspect-[4/5] w-28 shrink-0 sm:w-32">
                <Image
                  src="/photos/tutor-portrait.avif"
                  alt="Friendly tutor standing in front of a chalkboard"
                  fill
                  quality={55}
                  sizes="128px"
                  className="object-cover object-top"
                />
              </div>
              <div className="py-4 pr-4">
                <p className="text-[10px] font-extrabold tracking-[0.2em] text-gold-600 uppercase">
                  Tutor network
                </p>
                <h2 className="mt-1.5 text-lg font-semibold">
                  23,000+ teachers
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Verified tutors taking home and online assignments across
                  Delhi NCR.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-white p-6">
              <h2 className="text-xl font-semibold">Why tutors choose us</h2>
              <ul className="mt-4 space-y-3.5">
                {reasons.map((reason) => (
                  <li key={reason.title} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                    <span>
                      <span className="block text-[13px] font-bold text-navy-900">
                        {reason.title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                        {reason.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-white p-6">
              <h2 className="text-xl font-semibold">What happens next</h2>
              <ol className="mt-4 space-y-3.5">
                {nextSteps.map((item, index) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[11px] font-extrabold text-gold-400">
                      {index + 1}
                    </span>
                    <span>
                      <span className="block text-[13px] font-bold text-navy-900">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                        {item.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-navy-900 p-6 text-white">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 -right-8 h-36 w-36 rounded-full border border-gold-400/20"
              />
              <p className="text-[10px] font-extrabold tracking-[0.2em] text-gold-400 uppercase">
                Tutor helpline
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">
                Talk to the tutor team
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-navy-100">
                Call if you have a question about the application or the kind
                of assignments available.
              </p>
              <a
                href={siteConfig.tutorPhoneHref}
                className="mt-4 inline-flex items-center gap-2 text-base font-bold text-gold-300 hover:text-gold-200"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.tutorPhone}
              </a>
              <p className="mt-2 text-[11px] font-semibold text-navy-300">
                {siteConfig.hours}
              </p>
            </div>
          </aside>

          <TutorRegistrationForm />
        </div>
      </section>
    </>
  );
}
