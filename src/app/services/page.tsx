import type { Metadata } from "next";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/page/PageHero";
import { StepsGrid } from "@/components/page/StepsGrid";
import { FaqSection } from "@/components/ui/FaqSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Faq } from "@/data/faqs";
import { services } from "@/data/services";
import { buildPageMetadata } from "@/lib/seo";
import { tuitionSteps } from "@/lib/steps";

export const metadata: Metadata = buildPageMetadata({
  title: "Home Tuition Services in Delhi NCR",
  description:
    "Explore RBM Tuition services: home tuition, live online classes, one-to-one coaching, small groups, exam prep, doubt solving, test series and homework help.",
  path: "/services",
  keywords: [
    "home tuition service Delhi NCR",
    "online tuition India",
    "one to one tuition",
    "home tutor service",
  ],
});

const faqs: Faq[] = [
  {
    question: "Which service is right for my child?",
    answer:
      "Most families start with home or online one-to-one tuition. Group classes suit siblings or friends at a similar level, while doubt solving and test series work well alongside an existing coaching programme.",
  },
  {
    question: "Can I book a tutor for just one subject?",
    answer:
      "Yes. Subject-specific tutors are available for maths, science, English, languages, commerce subjects and computer science, from primary classes to Class 12.",
  },
  {
    question: "Are female tutors available?",
    answer:
      "Yes, we arrange female tutors for families who prefer them, subject to availability in your locality. Tell us your preference when you enquire.",
  },
  {
    question: "What if the tutor is not the right fit?",
    answer:
      "You can request a replacement at no extra cost. We would rather find the right match than have a student lose interest in a subject.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Tuition services built around how your child learns"
        description="From one-to-one home tuition to exam-focused test series, choose the format that fits your family's routine."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
        highlights={[
          "Home & online",
          "One-to-one or small groups",
          "Exam preparation",
          "Free demo class",
        ]}
      />

      <section className="section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="What we offer"
            title="Pick a format, not a package"
            description="Mix services as your child's needs change. Every option starts with a free demo and a clear study plan."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
              How starting tuition works
            </h2>
            <div className="mt-6">
              <StepsGrid steps={tuitionSteps} />
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={faqs} />
      <FinalCta />
    </>
  );
}
