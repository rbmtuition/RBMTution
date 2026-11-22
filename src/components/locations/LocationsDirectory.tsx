"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import type { City } from "@/data/locations";
import { cityAliases, locationAliases } from "@/data/locationAliases";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const PREVIEW_COUNT = 8;

function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\bsec\b/g, "sector")
    .replace(/\s+/g, " ")
    .trim();
}

function initials(value: string) {
  const words = value.split(/\s+/).filter(Boolean);
  if (words.length < 2) return "";
  return words.map((word) => word[0]).join("");
}

function matchesSearch(haystack: string, tokens: string[], compactQuery: string) {
  if (tokens.length === 0) return true;
  const compactHaystack = haystack.replace(/\s+/g, "");
  return (
    tokens.every((token) => haystack.includes(token)) ||
    compactHaystack.includes(compactQuery)
  );
}

export function LocationsDirectory({
  cities,
  totalAreas,
}: {
  cities: City[];
  totalAreas: number;
}) {
  const searchId = useId();
  const hintId = useId();
  const [query, setQuery] = useState("");
  const [activeCity, setActiveCity] = useState("all");
  const [expandedCities, setExpandedCities] = useState<Set<string>>(
    () => new Set(),
  );

  const indexedCities = useMemo(
    () =>
      cities.map((city) => {
        const citySearch = normalizeSearch(
          [city.name, ...(cityAliases[city.slug] ?? [])].join(" "),
        );

        return {
          ...city,
          areas: city.areas.map((area) => ({
            ...area,
            searchText: normalizeSearch(
              [
                citySearch,
                area.name,
                area.name.replace(/\bSector\b/g, "Sec"),
                initials(area.name),
                ...(locationAliases[`${city.slug}/${area.slug}`] ?? []),
              ].join(" "),
            ),
          })),
        };
      }),
    [cities],
  );

  const visibleCities = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);
    const tokens = normalizedQuery.split(" ").filter(Boolean);
    const compactQuery = normalizedQuery.replace(/\s+/g, "");

    return indexedCities
      .filter((city) => activeCity === "all" || city.slug === activeCity)
      .map((city) => ({
        ...city,
        areas: city.areas.filter((area) =>
          matchesSearch(area.searchText, tokens, compactQuery),
        ),
      }))
      .filter((city) => tokens.length === 0 || city.areas.length > 0);
  }, [activeCity, indexedCities, query]);

  const trimmedQuery = query.trim();
  const isSearching = trimmedQuery.length > 0;
  const hasFilters = isSearching || activeCity !== "all";
  const selectedCity = cities.find((city) => city.slug === activeCity);
  const resultCount = visibleCities.reduce(
    (count, city) => count + city.areas.length,
    0,
  );

  const resultLabel = isSearching
    ? visibleCities.length === 0
      ? `No localities match “${trimmedQuery}”`
      : `${resultCount} ${
          resultCount === 1 ? "locality" : "localities"
        } match “${trimmedQuery}”${
          selectedCity ? ` in ${selectedCity.name}` : ""
        }`
    : selectedCity
      ? `${resultCount} localities in ${selectedCity.name}`
      : `${totalAreas} localities across ${cities.length} cities`;

  function toggleCity(slug: string) {
    setExpandedCities((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  function clearFilters() {
    setQuery("");
    setActiveCity("all");
  }

  return (
    <div className="mt-16">
      <div>
        <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
          Browse all localities
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Search by locality, sector or abbreviation, or filter by city.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-4 shadow-card sm:p-5">
        <label htmlFor={searchId} className="sr-only">
          Search localities
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search locality, sector or e.g. GK"
            autoComplete="off"
            spellCheck={false}
            aria-describedby={hintId}
            className="h-12 w-full rounded-xl border border-navy-100 bg-cream/40 pl-11 pr-12 text-sm font-semibold text-navy-900 outline-none transition [&::-webkit-search-cancel-button]:hidden placeholder:font-normal placeholder:text-muted focus:border-gold-500 focus:bg-white focus:ring-4 focus:ring-gold-500/10"
          />
          {query.length > 0 ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-cream hover:text-navy-900"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>
        <p id={hintId} className="mt-2 text-xs leading-relaxed text-muted">
          Try “GK”, “Sector 62”, “Indirapuram”, “Gurugram” or “Noida
          Extension”.
        </p>

        <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
          <button
            type="button"
            onClick={() => setActiveCity("all")}
            aria-pressed={activeCity === "all"}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition",
              activeCity === "all"
                ? "border-navy-900 bg-navy-900 text-white"
                : "border-navy-100 bg-white text-navy-700 hover:border-navy-300 hover:bg-cream",
            )}
          >
            All
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px]",
                activeCity === "all"
                  ? "bg-white/15 text-white"
                  : "bg-cream text-muted",
              )}
            >
              {totalAreas}
            </span>
          </button>
          {cities.map((city) => (
            <button
              key={city.slug}
              type="button"
              onClick={() => setActiveCity(city.slug)}
              aria-pressed={activeCity === city.slug}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition",
                activeCity === city.slug
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-navy-100 bg-white text-navy-700 hover:border-navy-300 hover:bg-cream",
              )}
            >
              {city.name}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px]",
                  activeCity === city.slug
                    ? "bg-white/15 text-white"
                    : "bg-cream text-muted",
                )}
              >
                {city.areas.length}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p
            role="status"
            aria-live="polite"
            className="text-xs font-bold text-muted"
          >
            {resultLabel}
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-bold text-navy-900 underline decoration-navy-200 underline-offset-2 transition hover:text-gold-700"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {visibleCities.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-navy-200 bg-cream/50 p-8 text-center">
          <p className="font-display text-xl font-semibold text-navy-900">
            No locality found for “{trimmedQuery}”
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            We may still have a tutor nearby. Tell us your sector, society or
            nearest landmark.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link href="/contact" className="btn btn-navy">
              Ask about your area
            </Link>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              WhatsApp us
            </a>
          </div>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-3 text-xs font-bold text-muted underline underline-offset-2 transition hover:text-navy-900"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleCities.map((city) => {
              const expanded = expandedCities.has(city.slug);

              return (
                <section
                  key={city.slug}
                  className="rounded-2xl border border-navy-100 bg-cream/60 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold leading-tight text-navy-900">
                      <Link
                        href={`/locations/${city.slug}`}
                        className="transition hover:text-gold-700"
                      >
                        {city.name}
                      </Link>
                    </h3>
                    <span
                      className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold text-navy-700 ring-1 ring-navy-100"
                      aria-label={`${city.areas.length} localities`}
                    >
                      {city.areas.length}
                    </span>
                  </div>

                  {city.areas.length > 0 ? (
                    <ul
                      id={`areas-${city.slug}`}
                      className="mt-4 grid gap-x-4 gap-y-1 sm:grid-cols-2"
                    >
                      {city.areas.map((area, index) => {
                        const hidden =
                          !isSearching &&
                          !expanded &&
                          index >= PREVIEW_COUNT;

                        return (
                          <li
                            key={area.slug}
                            className={cn(hidden && "hidden")}
                          >
                            <Link
                              href={`/locations/${city.slug}/${area.slug}`}
                              title={`Home tuition in ${area.name}`}
                              className="block rounded-md px-1.5 py-1 text-[13px] font-semibold leading-snug break-words text-navy-700 transition hover:bg-white hover:text-gold-700"
                            >
                              {area.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="mt-3 text-[13px] leading-relaxed text-muted">
                      City-wide coverage. Contact us with your sector or
                      society.
                    </p>
                  )}

                  {city.areas.length > PREVIEW_COUNT && !isSearching ? (
                    <button
                      type="button"
                      onClick={() => toggleCity(city.slug)}
                      aria-expanded={expanded}
                      aria-controls={`areas-${city.slug}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-navy-900 transition hover:text-gold-700"
                    >
                      {expanded
                        ? "Show fewer"
                        : `View all ${city.areas.length} localities`}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          expanded && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  ) : null}
                </section>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-navy-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="font-display text-lg font-semibold">
                Can&apos;t find your locality?
              </p>
              <p className="mt-1 text-sm leading-relaxed text-navy-200">
                Tell us your sector, society or nearest landmark and we will
                check tutor availability.
              </p>
            </div>
            <Link href="/contact" className="btn btn-gold shrink-0">
              Ask about your area
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
