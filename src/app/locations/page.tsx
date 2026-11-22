import type { Metadata } from "next";
import { LocationCard } from "@/components/cards/LocationCard";
import { FinalCta } from "@/components/home/FinalCta";
import { LocationsDirectory } from "@/components/locations/LocationsDirectory";
import { PageHero } from "@/components/page/PageHero";
import { FaqSection } from "@/components/ui/FaqSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Faq } from "@/data/faqs";
import { cities, totalAreas } from "@/data/locations";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Home Tuition Locations in Delhi NCR",
  description:
    "Find verified home tutors by locality across Delhi, Noida, Greater Noida, Gurgaon, Ghaziabad and Faridabad. Browse areas and book a free demo class.",
  path: "/locations",
  keywords: [
    "home tutor near me Delhi NCR",
    "home tuition Delhi",
    "home tuition Noida",
    "home tuition Gurgaon",
  ],
});

const faqs: Faq[] = [
  {
    question: "How do I know if a tutor is available in my area?",
    answer:
      "Share your locality, class and subjects through the enquiry form or call us. We confirm local tutor availability before arranging the free demo.",
  },
  {
    question: "Do you cover areas not listed on this page?",
    answer:
      "The listed areas are where we receive the most requests, but coverage extends across Delhi NCR. If your locality is not listed, ask us — we may still have a tutor nearby or can offer online classes.",
  },
  {
    question: "Are tutors available in nearby cities?",
    answer:
      "We currently arrange home tuition across Delhi, Noida, Greater Noida, Gurgaon, Ghaziabad and Faridabad, with online tuition available across India.",
  },
  {
    question: "Is there a travel or locality charge?",
    answer:
      "Fees are agreed before classes begin and depend on the class, subjects, session frequency and location. There are no hidden charges added later.",
  },
];

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="Home tutors across Delhi NCR, close to where you live"
        description="Browse city and locality pages to check coverage, popular subjects and how tutor matching works in your area."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Locations" },
        ]}
        highlights={[
          "6 cities",
          `${totalAreas} localities`,
          "Nursery to Class 12",
          "Home and online",
        ]}
      />

      <section className="section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="Cities"
            title="Where we arrange home tuition"
            description="Local tutors for Delhi NCR neighbourhoods, plus live online classes anywhere in India."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <LocationCard key={city.slug} city={city} />
            ))}
          </div>

          <LocationsDirectory cities={cities} totalAreas={totalAreas} />
        </div>
      </section>

      <FaqSection items={faqs} />
      <FinalCta />
    </>
  );
}
