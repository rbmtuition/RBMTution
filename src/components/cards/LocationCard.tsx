import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { City } from "@/data/locations";

export function LocationCard({ city }: { city: City }) {
  const shownAreas = city.areas.slice(0, 4);
  const remaining = city.areas.length - shownAreas.length;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900 text-gold-400">
            <MapPin className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-semibold">{city.name}</h3>
            <p className="text-xs font-semibold text-muted">
              {city.areas.length > 0
                ? `${city.areas.length} key areas covered`
                : "City-wide coverage"}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{city.tagline}</p>

      {shownAreas.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {shownAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/locations/${city.slug}/${area.slug}`}
              className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold text-navy-800 transition hover:bg-gold-100 hover:text-navy-900"
            >
              {area.name}
            </Link>
          ))}
          {remaining > 0 ? (
            <span className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold text-muted">
              +{remaining} more
            </span>
          ) : null}
        </div>
      ) : null}

      <Link
        href={`/locations/${city.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 transition hover:text-gold-600"
      >
        Home tuition in {city.name}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
