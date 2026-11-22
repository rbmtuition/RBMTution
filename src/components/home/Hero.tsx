import Image from "next/image";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { EnquireLink } from "@/components/ui/EnquireLink";
import { siteConfig } from "@/data/site";

const highlights = [
  "Verified, experienced tutors",
  "All boards & subjects",
  "Home and online learning",
  "Transparent monthly fees",
];

export function Hero() {
  return (
    <section className="hero-surface relative overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src="/photos/hero-home-tuition.avif"
          alt="A tutor guiding a student through notes at a home study table"
          fill
          priority
          quality={55}
          sizes="100vw"
          className="object-cover object-[68%_45%]"
        />
        <div className="absolute inset-0 bg-navy-950/55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,21,48,0.97)_0%,rgba(6,21,48,0.9)_38%,rgba(6,21,48,0.5)_72%,rgba(6,21,48,0.3)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,21,48,0.8)_0%,transparent_45%)]" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-[26rem] w-[26rem] translate-x-1/3 -translate-y-1/3 rounded-full border border-gold-400/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 bottom-0 h-64 w-64 translate-y-1/3 rounded-full border border-white/10"
      />

      <div className="container-site relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-12 lg:py-20">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-gold-200">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            Delhi NCR&rsquo;s trusted home tuition service
          </p>

          <h1 className="mt-5 text-4xl leading-[1.05] font-semibold tracking-tight text-white sm:text-5xl xl:text-[3.55rem]">
            Home Tuition in Delhi NCR,{" "}
            <span className="text-gold-400 italic">
              built around your child.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-100 sm:text-[17px]">
            Verified home and online tutors for Nursery to Class 12 — CBSE,
            ICSE, IB and NIOS — plus JEE, NEET and CUET preparation.
            Personalised teaching, flexible timings and a free demo class.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <EnquireLink href="#enquire" className="btn-gold">
              Book a free demo
              <ArrowRight className="h-4 w-4" />
            </EnquireLink>
            <a href={siteConfig.phoneHref} className="btn-ghost-light">
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </a>
          </div>

          <ul className="mt-7 grid gap-2.5 text-sm text-navy-100 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-400" />
                {item}
              </li>
            ))}
          </ul>

          <dl className="mt-8 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-4">
            {siteConfig.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-lg font-semibold whitespace-nowrap text-white sm:text-xl">
                  {stat.value}
                </dd>
                <p className="mt-1 text-[10px] font-bold tracking-[0.14em] text-navy-300 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </div>

        <div
          id="enquire"
          className="animate-fade-up scroll-mt-24 [animation-delay:120ms]"
        >
          <EnquiryForm variant="compact" source="Home hero" />
        </div>
      </div>
    </section>
  );
}
