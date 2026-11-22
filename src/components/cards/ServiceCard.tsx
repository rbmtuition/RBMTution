import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";
import { DataIcon } from "@/components/ui/DataIcon";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-5 transition duration-300 hover:border-gold-300 hover:bg-cream/60"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-100 text-navy-900">
          <DataIcon name={service.icon} className="h-5 w-5" />
        </span>
        <ArrowUpRight className="h-4 w-4 text-navy-300 transition group-hover:text-gold-600" />
      </div>
      <h3 className="mt-4 text-[17px] font-semibold">{service.shortName}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        {service.blurb}
      </p>
    </Link>
  );
}
