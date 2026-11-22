import type { Metadata } from "next";
import Link from "next/link";
import { LocationCard } from "@/components/cards/LocationCard";
import { FinalCta } from "@/components/home/FinalCta";
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

          <div className="mt-16">
            <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
              Browse all localities
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((city) => (
                <div
                  key={city.slug}
                  className="rounded-2xl border border-navy-100 bg-cream/60 p-5"
                >
                  <Link
                    href={`/locations/${city.slug}`}
                    className="text-sm font-extrabold text-navy-900 hover:text-gold-700"
                  >
                    {city.name}
                  </Link>
                  {city.areas.length > 0 ? (
                    <ul className="mt-3 space-y-2">
                      {city.areas.map((area) => (
                        <li key={area.slug}>
                          <Link
                            href={`/locations/${city.slug}/${area.slug}`}
                            className="text-[13px] font-semibold text-navy-700 transition hover:text-gold-700"
                          >
                            Home tuition in {area.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">
                      City-wide coverage, including Greater Noida West. Contact
                      us with your sector or society.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={faqs} />
      <FinalCta />
    </>
  );
}
