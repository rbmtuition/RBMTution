import type { Metadata } from "next";
import { BlogSection } from "@/components/home/BlogSection";
import { CoursesSection } from "@/components/home/CoursesSection";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { LocationsSection } from "@/components/home/LocationsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SubjectsSection } from "@/components/home/SubjectsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TrustBar } from "@/components/home/TrustBar";
import { TutorBand } from "@/components/home/TutorBand";
import { WhyUs } from "@/components/home/WhyUs";
import { FaqSection } from "@/components/ui/FaqSection";
import { homeFaqs } from "@/data/faqs";
import { faqSchema } from "@/lib/seo";

const homeDescription =
  "Find verified home and online tutors across Delhi NCR for Nursery to Class 12, all boards, JEE, NEET and CUET. Book a free demo with a local tutor.";

export const metadata: Metadata = {
  title: {
    absolute:
      "Home Tuition in Delhi NCR | Verified Home Tutors | RBM Tuition",
  },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Home Tuition in Delhi NCR | Verified Home Tutors | RBM Tuition",
    description: homeDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Tuition in Delhi NCR | Verified Home Tutors | RBM Tuition",
    description: homeDescription,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(homeFaqs)),
        }}
      />
      <Hero />
      <TrustBar />
      <CoursesSection />
      <ServicesSection />
      <WhyUs />
      <ProcessSection />
      <SubjectsSection />
      <LocationsSection />
      <TestimonialsSection />
      <TutorBand />
      <BlogSection />
      <FaqSection items={homeFaqs} />
      <FinalCta />
    </>
  );
}
