import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LocationCard } from "@/components/cards/LocationCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cities, totalAreas } from "@/data/locations";

export function LocationsSection() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Locations"
            title="Local tutors, close to home"
            description={`Home tuition across ${totalAreas}+ neighbourhoods in Delhi NCR. Pick your city to see the areas we cover and the subjects in demand nearby.`}
          />
          <Link
            href="/locations"
            className="btn-outline self-start lg:self-auto"
          >
            All locations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <LocationCard key={city.slug} city={city} />
          ))}
        </div>
      </div>
    </section>
  );
}
