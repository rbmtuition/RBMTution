import Image from "next/image";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { EnquireLink } from "@/components/ui/EnquireLink";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type HeroImage = {
  src: string;
  alt: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  meta?: string;
  breadcrumbs: Crumb[];
  highlights?: string[];
  enquireHref?: string;
  showCta?: boolean;
  className?: string;
  image?: HeroImage;
};

export function PageHero({
  eyebrow,
  title,
  description,
  meta,
  breadcrumbs,
  highlights,
  enquireHref = "/#enquire",
  showCta = true,
  className,
  image,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "hero-surface relative overflow-hidden text-white",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full border border-gold-400/15"
      />
      <div className="container-site relative py-10 sm:py-12 lg:py-14">
        <Breadcrumbs items={breadcrumbs} />

        <div
          className={cn(
            "mt-6",
            image &&
              "grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center lg:gap-10",
          )}
        >
          <div className="max-w-4xl">
            <p className="text-[10px] font-extrabold tracking-[0.24em] text-gold-400 uppercase">
              {eyebrow}
            </p>
            <h1 className="mt-2 text-3xl leading-[1.1] font-semibold text-white sm:text-4xl lg:text-[3.2rem]">
              {title}
            </h1>
            {description ? (
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-navy-100 sm:text-base">
                {description}
              </p>
            ) : null}
            {meta ? (
              <p className="mt-3 text-[11px] font-bold tracking-[0.08em] text-gold-300 uppercase">
                {meta}
              </p>
            ) : null}

            {showCta ? (
              <div className="mt-6 flex flex-wrap gap-2.5">
                <EnquireLink
                  href={enquireHref}
                  className="btn-gold px-5 py-2.5 text-[13px]"
                >
                  Book a free demo
                  <ArrowRight className="h-4 w-4" />
                </EnquireLink>
                <a
                  href={siteConfig.phoneHref}
                  className="btn-ghost-light px-5 py-2.5 text-[13px]"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.phone}
                </a>
              </div>
            ) : null}

            {highlights?.length ? (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-navy-200">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold-400" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {image ? (
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl ring-1 ring-white/15">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                quality={55}
                sizes="(min-width: 1024px) 384px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
