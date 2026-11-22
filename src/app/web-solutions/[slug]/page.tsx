import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { EnquireLink } from "@/components/ui/EnquireLink";
import { FaqList } from "@/components/ui/FaqList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import { webContact, webPlans } from "@/data/webSolutions";
import { getWebNiche, webNiches } from "@/data/webNiches";
import {
  absoluteUrl,
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return webNiches.map((niche) => ({ slug: niche.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const niche = getWebNiche(slug);
  if (!niche) return { title: "Page not found" };

  const base = buildPageMetadata({
    title: niche.metaTitle,
    description: niche.metaDescription,
    path: `/web-solutions/${niche.slug}`,
    keywords: niche.keywords,
  });
  const ogImage = absoluteUrl("/web-solutions/opengraph-image");

  return {
    ...base,
    title: { absolute: niche.metaTitle },
    openGraph: {
      ...base.openGraph,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "RBM Web Solutions — websites that turn visitors into enquiries",
        },
      ],
    },
    twitter: {
      ...base.twitter,
      images: [ogImage],
    },
  };
}

const buildSteps = [
  {
    title: "Send the brief",
    description:
      "Share the business, the pages you need and any deadline. We reply with the next step and a fixed written quote.",
  },
  {
    title: "Review and build",
    description:
      "You approve the structure and content. We build the mobile-first site and include two revision rounds.",
  },
  {
    title: "Launch and handover",
    description:
      "We connect the domain, check the forms and links, then hand over the accounts and 30 days of support.",
  },
];

export default async function WebNichePage({ params }: Props) {
  const { slug } = await params;
  const niche = getWebNiche(slug);
  if (!niche) notFound();

  const plan = webPlans.find((item) => item.name === niche.packageName) ?? webPlans[0];
  const related = webNiches.filter((item) => item.slug !== niche.slug);
  const offerPrice = plan.price.replace(/[^\d]/g, "");

  const nicheSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: niche.metaTitle.replace(" | RBM Web Solutions", ""),
    description: niche.metaDescription,
    url: absoluteUrl(`/web-solutions/${niche.slug}`),
    serviceType: niche.shortName,
    provider: {
      "@type": "Organization",
      name: "RBM Web Solutions",
      url: absoluteUrl("/web-solutions"),
      telephone: siteConfig.phonePlain,
      email: siteConfig.email,
      parentOrganization: { "@id": absoluteUrl("/#organization") },
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: offerPrice,
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/web-solutions#pricing"),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            nicheSchema,
            faqSchema(niche.faqs),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "RBM Web Solutions", path: "/web-solutions" },
              { name: niche.shortName, path: `/web-solutions/${niche.slug}` },
            ]),
          ]),
        }}
      />

      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_34rem_at_92%_-10%,rgba(20,184,166,0.2),transparent_62%),radial-gradient(38rem_28rem_at_-8%_112%,rgba(43,83,195,0.3),transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:48px_48px]"
        />

        <div className="container-site relative py-12 sm:py-16 lg:py-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-navy-300">
              <li>
                <Link href="/" className="transition hover:text-teal-300">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="h-3 w-3 text-navy-500" />
              </li>
              <li>
                <Link
                  href="/web-solutions"
                  className="transition hover:text-teal-300"
                >
                  RBM Web Solutions
                </Link>
              </li>
              <li>
                <ChevronRight className="h-3 w-3 text-navy-500" />
              </li>
              <li>
                <span aria-current="page" className="text-teal-200">
                  {niche.shortName}
                </span>
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3.5 py-1.5 text-[10px] font-extrabold tracking-[0.18em] text-teal-200 uppercase">
                {niche.eyebrow}
              </p>
              <h1 className="mt-5 text-4xl leading-[1.08] font-semibold text-white sm:text-5xl">
                {niche.h1}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-navy-100 sm:text-base">
                {niche.intro}
              </p>
              <p className="mt-3 text-xs font-semibold text-teal-200">
                {niche.audience}
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <EnquireLink
                  href="/web-solutions#web-enquiry"
                  prefillPackage={plan.packageOption}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-bold text-navy-950 shadow-[0_12px_30px_-14px_rgba(20,184,166,0.9)] transition hover:bg-teal-400"
                >
                  Get a fixed quote
                  <ArrowRight className="h-4 w-4" />
                </EnquireLink>
                <a
                  href={webContact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp us
                </a>
              </div>

              <ul className="mt-6 grid gap-x-5 gap-y-2 text-xs font-semibold text-navy-200 sm:grid-cols-2">
                {[
                  `Fixed ${plan.name} package`,
                  plan.meta,
                  "Mobile-first build",
                  "30 days of support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-teal-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-[10px] font-extrabold tracking-[0.18em] text-teal-300 uppercase">
                What the site includes
              </p>
              <ul className="mt-4 space-y-3">
                {niche.included.slice(0, 5).map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-[13px] leading-relaxed text-navy-100"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-[11px] font-semibold text-navy-300">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-300" />
                  Fixed written quote
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-teal-300" />
                  Reply in 1 business day
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <SectionHeading
            accent="teal"
            eyebrow="The problem"
            title="What is costing you enquiries"
            description="These are the three gaps we see most often. A good website closes them before the first phone call."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {niche.painPoints.map((point, index) => (
              <div
                key={point.title}
                className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
              >
                <span className="font-display text-2xl font-semibold text-teal-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-base font-bold">{point.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-site grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          <div>
            <SectionHeading
              accent="teal"
              eyebrow="What you get"
              title="The pages your customers actually need"
              description="No filler pages and no unused template sections. The site is built around the questions people ask before they contact you."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {niche.included.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 rounded-xl border border-navy-100 bg-cream/50 p-3.5 text-sm leading-relaxed text-navy-800"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-teal-100 bg-teal-50/60 p-5">
              <p className="text-[10px] font-extrabold tracking-[0.16em] text-teal-800 uppercase">
                What changes
              </p>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-teal-900">
                {niche.outcomes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="rounded-3xl bg-navy-950 p-6 text-white sm:p-7 lg:sticky lg:top-24">
            <p className="text-[10px] font-extrabold tracking-[0.18em] text-teal-300 uppercase">
              Suggested package
            </p>
            <h2 className="mt-2 text-2xl font-semibold">{plan.name}</h2>
            <p className="mt-3 font-display text-3xl font-semibold">
              {plan.price}
            </p>
            <p className="mt-1 text-[10px] font-extrabold tracking-[0.14em] text-teal-300 uppercase">
              {plan.meta}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-navy-200">
              {plan.summary}
            </p>
            <ul className="mt-5 space-y-2.5">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-2 text-sm leading-relaxed text-navy-100"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                  {feature}
                </li>
              ))}
            </ul>
            <EnquireLink
              href="/web-solutions#web-enquiry"
              prefillPackage={plan.packageOption}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-500 px-5 py-3 text-sm font-bold text-navy-950 transition hover:bg-teal-400"
            >
              Start with {plan.name}
              <ArrowRight className="h-4 w-4" />
            </EnquireLink>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-navy-300">
              Not sure? We will recommend the smallest package that fits the
              scope.
            </p>
          </aside>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="container-site">
          <SectionHeading
            accent="teal"
            eyebrow="Process"
            title="From brief to launch"
            description="Three clear stages. You know what is needed, what it costs and what happens next."
          />
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {buildSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-navy-100 bg-white p-6"
              >
                <span className="font-display text-3xl font-semibold text-teal-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-base font-bold">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              accent="teal"
              eyebrow="FAQs"
              title="Questions about this build"
              description="If your question is not here, call or WhatsApp and ask directly. We answer before you commit."
            />
            <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-4">
              <p className="text-[10px] font-extrabold tracking-[0.16em] text-navy-500 uppercase">
                Other starting points
              </p>
              <div className="mt-2 space-y-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/web-solutions/${item.slug}`}
                    className="flex items-center justify-between gap-3 text-sm font-bold text-navy-900 transition hover:text-teal-700"
                  >
                    {item.shortName}
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-teal-600" />
                  </Link>
                ))}
                <Link
                  href="/web-solutions"
                  className="flex items-center justify-between gap-3 border-t border-slate-100 pt-2 text-sm font-bold text-teal-700 transition hover:text-teal-800"
                >
                  All web solutions
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
          <FaqList items={niche.faqs} />
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-site rounded-3xl border border-teal-100 bg-teal-50 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.18em] text-teal-800 uppercase">
                Next step
              </p>
              <h2 className="mt-2 text-2xl leading-tight font-semibold sm:text-3xl">
                {niche.ctaTitle}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                Send the brief and we will reply within one business day with
                the next step and a fixed quote.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <EnquireLink
                href="/web-solutions#web-enquiry"
                prefillPackage={plan.packageOption}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-800"
              >
                Get a quote
                <ArrowRight className="h-4 w-4" />
              </EnquireLink>
              <a
                href={webContact.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-200 bg-white px-5 py-3 text-sm font-bold text-navy-900 transition hover:border-navy-900 hover:bg-navy-50"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
