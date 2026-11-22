import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="Choose how your child learns"
            description="Home tuition, live online classes, doubt sessions and test series — mix the support your child actually needs."
          />
          <Link href="/services" className="btn-outline self-start lg:self-auto">
            Explore services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
