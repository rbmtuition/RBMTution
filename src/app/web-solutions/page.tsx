import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  FileCheck2,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { WebProjectForm } from "@/components/forms/WebProjectForm";
import { ConceptShowcase } from "@/components/web/ConceptShowcase";
import { EnquireLink } from "@/components/ui/EnquireLink";
import { FaqList } from "@/components/ui/FaqList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import {
  webAudiences,
  webContact,
  webFaqs,
  webPlanColumns,
  webPlanComparison,
  webPlans,
  webProcess,
  webProofPoints,
  webServices,
} from "@/data/webSolutions";
import { webNiches } from "@/data/webNiches";
import {
  absoluteUrl,
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
} from "@/lib/seo";
import { cn } from "@/lib/utils";

const baseMetadata = buildPageMetadata({
  title: "Website Design & Development | RBM Web Solutions",
  description:
    "Fast, mobile-first websites for schools, coaching centres, local businesses and startups. Custom Next.js builds, fixed packages from ₹9,999 and support after launch.",
  path: "/web-solutions",
  keywords: [
    "website design India",
    "website development Delhi NCR",
    "custom website Next.js",
    "coaching centre website design",
    "small business website",
    "landing page design",
    "e-commerce website development",
  ],
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: { absolute: "Website Design & Development | RBM Web Solutions" },
};

const serviceWebSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "RBM Web Solutions — Website Design & Development",
  description:
    "Custom website design and development for schools, coaching centres, local businesses and startups. Fixed packages, mobile-first builds, SEO foundations and post-launch support.",
  url: absoluteUrl("/web-solutions"),
  serviceType: "Website design and development",
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Fixed website packages",
    itemListElement: webPlans.map((plan) => ({
      "@type": "Offer",
      name: `${plan.name} website package`,
      description: plan.summary,
      priceCurrency: "INR",
      price: plan.price.replace(/[^\d]/g, ""),
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/web-solutions#pricing"),
    })),
  },
};

const trustPoints = [
  { icon: Clock, text: "Reply within 1 business day" },
  { icon: FileCheck2, text: "Fixed written quotes" },
  { icon: ShieldCheck, text: "You own domain and hosting" },
  { icon: Globe2, text: "Based in Delhi NCR · worldwide clients" },
];

const contactLinks = [
  {
    href: webContact.phoneHref,
    icon: Phone,
    label: "Call",
    value: webContact.phone,
    external: false,
  },
  {
    href: webContact.emailHref,
    icon: Mail,
    label: "Email",
    value: webContact.email,
    external: false,
  },
  {
    href: webContact.whatsapp,
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Send a project message",
    external: true,
  },
];

const teamFacts = [
  {
    icon: MapPin,
    label: "Office",
    value: "Noida, Delhi NCR",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Open 24 hours · 7 days a week",
  },
  {
    icon: MessageCircle,
    label: "Direct contact",
    value: "Phone, email and WhatsApp",
  },
];

const caseStudyPoints = [
  {
    label: "Scope",
    value:
      "Tuition marketing site, course and local landing pages, blog, this web-solutions page and the enquiry flows.",
  },
  {
    label: "Stack",
    value:
      "Next.js 16 App Router, React 19, Tailwind CSS 4, reusable components, custom form validation and Web3Forms.",
  },
  {
    label: "Customer journey",
    value:
      "A parent finds a local or subject page, checks the proof, then calls, WhatsApps or submits an enquiry.",
  },
  {
    label: "Quality checks",
    value:
      "390–1440px layouts, keyboard navigation, labelled fields and errors, responsive images, metadata and structured data.",
  },
  {
    label: "What it demonstrates",
    value:
      "One reusable design system can carry tuition pages and a second service offer without building a separate website.",
  },
];

export default function WebSolutionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceWebSchema,
            faqSchema(webFaqs),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "RBM Web Solutions", path: "/web-solutions" },
            ]),
          ]),
        }}
      />

      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55rem_38rem_at_88%_-12%,rgba(20,184,166,0.22),transparent_62%),radial-gradient(42rem_28rem_at_-8%_112%,rgba(43,83,195,0.35),transparent_60%)]"
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
                <span aria-current="page" className="text-teal-200">
                  RBM Web Solutions
                </span>
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3.5 py-1.5 text-[10px] font-extrabold tracking-[0.18em] text-teal-200 uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                RBM Web Solutions
              </p>
              <h1 className="mt-5 text-4xl leading-[1.08] font-semibold text-white sm:text-5xl lg:text-[3.6rem]">
                Websites that turn visitors into enquiries
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-navy-100 sm:text-base">
                We plan, design and build fast, mobile-first websites for
                schools, coaching centres, local businesses and startups.
                Custom Next.js builds, fixed packages and support after launch.
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <EnquireLink
                  href="#web-enquiry"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-bold text-navy-950 shadow-[0_12px_30px_-14px_rgba(20,184,166,0.9)] transition hover:bg-teal-400"
                >
                  Get a free quote
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

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-semibold text-teal-200">
                <p>Introductory pricing for early clients · No obligation</p>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-1 text-white underline decoration-teal-400 underline-offset-4 hover:text-teal-200"
                >
                  See packages
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>

              <ul className="mt-6 grid gap-x-5 gap-y-2 text-xs font-semibold text-navy-200 sm:grid-cols-2">
                {[
                  "Fixed packages from ₹9,999",
                  "Starter builds in 1–2 weeks",
                  "Custom Next.js / React",
                  "30 days of support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-teal-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <ConceptShowcase />
          </div>
        </div>
      </section>

      <section className="border-b border-navy-100 bg-white">
        <div className="container-site grid gap-4 py-5 text-[11px] font-semibold text-navy-800 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map(({ icon: Icon, text }) => (
            <p key={text} className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <Icon className="h-3.5 w-3.5" />
              </span>
              {text}
            </p>
          ))}
        </div>
      </section>

      <section id="who-its-for" className="section-pad scroll-mt-24">
        <div className="container-site">
          <SectionHeading
            accent="teal"
            eyebrow="Who it's for"
            title="Built around the decision your customer is making"
            description="A school wants admission enquiries. A shop wants calls and directions. A startup needs to look credible. The page structure follows the decision, not a template."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {webAudiences.map(({ icon: Icon, title, description, examples }) => (
              <div
                key={title}
                className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {description}
                </p>
                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  {examples.map((example) => (
                    <li
                      key={example}
                      className="flex items-center gap-2 text-xs font-semibold text-navy-800"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-teal-600" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-navy-100 bg-cream/50 px-4 py-3 text-xs">
            <span className="font-extrabold tracking-[0.12em] text-navy-500 uppercase">
              Popular starting points
            </span>
            {webNiches.map((niche) => (
              <Link
                key={niche.slug}
                href={`/web-solutions/${niche.slug}`}
                className="inline-flex items-center gap-1 font-bold text-teal-700 underline decoration-teal-300 underline-offset-4 hover:text-teal-800"
              >
                {niche.shortName}
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section-pad scroll-mt-24 bg-cream">
        <div className="container-site">
          <SectionHeading
            accent="teal"
            eyebrow="What we build"
            title="One team from plan to launch"
            description="Choose the format that fits the job. Every project includes a clear scope, mobile-first layouts, two revision rounds and 30 days of post-launch support."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {webServices.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group rounded-2xl border border-navy-100 bg-white p-6 transition hover:border-teal-300 hover:shadow-card"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition group-hover:bg-teal-500 group-hover:text-navy-950">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            Need something outside these six?{" "}
            <EnquireLink
              href="#web-enquiry"
              className="font-bold text-teal-700 underline decoration-teal-300 underline-offset-4 hover:text-teal-800"
            >
              Describe the project
            </EnquireLink>{" "}
            and we will tell you honestly whether we can build it.
          </p>
        </div>
      </section>

      <section id="proof" className="scroll-mt-24 bg-navy-950 py-16 text-white sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <SectionHeading
            tone="dark"
            accent="teal"
            eyebrow="Real proof, not a stock portfolio"
            title="We use what we sell"
            description="There are no borrowed screenshots here. The website you are reading is our working reference: custom Next.js, mobile-first pages, structured content, fast images and lead forms that actually reach the team."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {webProofPoints.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-400/15 text-teal-300">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <h3 className="mt-3 text-sm font-bold text-white">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-navy-200">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              accent="teal"
              eyebrow="Case study"
              title="The site you are reading is the work"
              description="No unused template and no borrowed screenshots. We built this website with the same process we sell: a clear scope, mobile-first layouts, structured content and a lead flow that reaches the team."
            />
            <div className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/60 p-4 text-xs leading-relaxed text-teal-900">
              <p className="font-bold">Our own site, not a client engagement.</p>
              <p className="mt-1 text-teal-800">
                It shows how we structure pages, write copy and test the build.
                Your site starts from your business, not this layout.
              </p>
            </div>
            <EnquireLink
              href="#web-enquiry"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-800"
            >
              Talk through your project
              <ArrowRight className="h-4 w-4" />
            </EnquireLink>
          </div>

          <div className="rounded-3xl border border-navy-100 bg-cream/50 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-100 pb-5">
              <p className="text-[10px] font-extrabold tracking-[0.18em] text-navy-600 uppercase">
                Project snapshot
              </p>
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold text-teal-800 ring-1 ring-teal-100">
                RBM Tuition + Web Solutions
              </span>
            </div>
            <dl className="mt-5 space-y-5">
              {caseStudyPoints.map((point) => (
                <div
                  key={point.label}
                  className="border-b border-navy-100 pb-5 last:border-0 last:pb-0"
                >
                  <dt className="text-[10px] font-extrabold tracking-[0.16em] text-teal-700 uppercase">
                    {point.label}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-navy-800">
                    {point.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="team" className="section-pad scroll-mt-24 bg-white">
        <div className="container-site grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div className="relative overflow-hidden rounded-3xl border border-navy-100 bg-navy-50">
            <Image
              src="/photos/team-illustration.svg"
              alt="Cartoon illustration of three RBM team members working together at a desk in the Noida studio"
              width={1200}
              height={800}
              unoptimized
              sizes="(min-width: 1024px) 620px, 100vw"
              className="h-[280px] w-full object-cover object-center sm:h-[380px]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent p-5 pt-16">
              <p className="text-[10px] font-extrabold tracking-[0.18em] text-teal-300 uppercase">
                Illustration · Noida studio
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                The team behind RBM Tuition and RBM Web Solutions.
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              accent="teal"
              eyebrow="The people behind the work"
              title="A real team you can call"
              description="RBM Web Solutions is the web studio of RBM Tuition. The same Noida team that has run RBM Tuition for over a decade now builds websites for schools, coaching centres and local businesses. No anonymous marketplace, no handoff to a stranger."
            />

            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              {teamFacts.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-navy-100 bg-cream/50 p-4"
                >
                  <dt className="flex items-center gap-1.5 text-[10px] font-extrabold tracking-[0.14em] text-navy-500 uppercase">
                    <Icon className="h-3.5 w-3.5 text-teal-700" />
                    {label}
                  </dt>
                  <dd className="mt-1.5 text-xs font-bold leading-snug text-navy-900">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={webContact.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-800"
              >
                <Phone className="h-4 w-4" />
                Call the team
              </a>
              <a
                href={webContact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-200 bg-white px-5 py-2.5 text-sm font-bold text-navy-900 transition hover:border-navy-900 hover:bg-navy-50"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-muted">
              Prefer email? Write to{" "}
              <a
                href={webContact.emailHref}
                className="font-bold text-teal-700 underline decoration-teal-300 underline-offset-4 hover:text-teal-800"
              >
                {webContact.email}
              </a>
              . We reply within one business day.
            </p>
          </div>
        </div>
      </section>

      <section id="process" className="section-pad scroll-mt-24">
        <div className="container-site">
          <SectionHeading
            accent="teal"
            eyebrow="Process"
            title="A clear process, no surprises"
            description="You always know what is happening, what we need from you and what comes next."
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {webProcess.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-navy-100 bg-cream/60 p-6"
              >
                <span className="font-display text-3xl font-semibold text-teal-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="pricing" className="section-pad scroll-mt-24 bg-navy-950 text-white">
        <div className="container-site">
          <SectionHeading
            tone="dark"
            accent="teal"
            eyebrow="Fixed packages"
            title="Clear scope. Clear price."
            description="No hourly guesswork. Pick the closest package, then we confirm the page list and quote in writing before anything starts. Prices exclude applicable taxes; domain and hosting are billed at actuals in your name."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {webPlans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-6 sm:p-7",
                  plan.featured
                    ? "border-teal-400 bg-white text-navy-900 shadow-[0_30px_80px_-40px_rgba(20,184,166,0.55)]"
                    : "border-white/15 bg-white/5 text-white",
                )}
              >
                {plan.featured ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-teal-500 px-3 py-1 text-[10px] font-extrabold tracking-wide text-navy-950 uppercase">
                    Most popular
                  </span>
                ) : null}
                <h3
                  className={cn(
                    "text-xl font-semibold",
                    plan.featured ? "text-navy-900" : "text-white",
                  )}
                >
                  {plan.name}
                </h3>
                <p
                  className={cn(
                    "mt-3 font-display text-3xl font-semibold",
                    plan.featured ? "text-navy-900" : "text-white",
                  )}
                >
                  {plan.price}
                </p>
                <p
                  className={cn(
                    "mt-1 text-[10px] font-extrabold tracking-[0.14em] uppercase",
                    plan.featured ? "text-teal-700" : "text-teal-300",
                  )}
                >
                  {plan.meta}
                </p>
                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed",
                    plan.featured ? "text-muted" : "text-navy-200",
                  )}
                >
                  {plan.summary}
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={cn(
                        "flex gap-2 text-sm",
                        plan.featured ? "text-navy-800" : "text-navy-100",
                      )}
                    >
                      <CheckCircle2
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          plan.featured ? "text-teal-600" : "text-teal-300",
                        )}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <EnquireLink
                  href="#web-enquiry"
                  prefillPackage={plan.packageOption}
                  className={cn(
                    "mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition",
                    plan.featured
                      ? "bg-teal-500 text-navy-950 hover:bg-teal-400"
                      : "border border-white/25 text-white hover:border-white/50 hover:bg-white/10",
                  )}
                >
                  {plan.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </EnquireLink>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-xs leading-relaxed text-navy-300 sm:grid-cols-2 lg:grid-cols-4">
            <p>
              <span className="font-bold text-white">50/50 payments.</span> Half
              to start, half before launch.
            </p>
            <p>
              <span className="font-bold text-white">Domain and hosting.</span>{" "}
              Billed at actuals, bought in your name.
            </p>
            <p>
              <span className="font-bold text-white">2 revisions.</span> Design
              preview and pre-launch round.
            </p>
            <p>
              <span className="font-bold text-white">Fixed written quote.</span>{" "}
              Confirmed before any work starts.
            </p>
          </div>

          <div className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-xs leading-relaxed text-navy-200 sm:grid-cols-2">
            <p>
              <span className="font-bold text-white">Taxes.</span> Prices
              exclude applicable taxes. The written quote and invoice confirm
              the final payable amount.
            </p>
            <p>
              <span className="font-bold text-white">Not included.</span> Full
              copywriting, photography, paid ads or media spend, third-party
              subscriptions and payment processing fees.
            </p>
            <p>
              <span className="font-bold text-white">Ownership.</span> On final
              payment, you own the domain, hosting account, content and finished
              website.
            </p>
            <p>
              <span className="font-bold text-white">Care plans optional.</span>{" "}
              From ₹999/month after the included 30 days for updates, backups,
              security checks and small content changes.
            </p>
          </div>

          <details className="group mt-5 rounded-2xl border border-white/10 bg-white/[0.03]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-bold text-white [&::-webkit-details-marker]:hidden">
              Compare the packages in detail
              <ChevronDown className="h-4 w-4 text-teal-300 transition group-open:rotate-180" />
            </summary>
            <div className="overflow-x-auto border-t border-white/10 px-5 py-4">
              <table className="w-full min-w-[42rem] text-left text-xs">
                <caption className="sr-only">
                  Comparison of the Starter, Business and E-commerce or Custom
                  website packages
                </caption>
                <thead>
                  <tr className="border-b border-white/15">
                    <th scope="col" className="pb-3 pr-4 font-bold text-navy-300">
                      Feature
                    </th>
                    {webPlanColumns.map((plan) => (
                      <th
                        key={plan.name}
                        scope="col"
                        className="px-3 pb-3 font-bold text-white last:pr-0"
                      >
                        <span className="block">{plan.name}</span>
                        <span className="mt-0.5 block text-[11px] font-semibold text-teal-300">
                          {plan.price}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {webPlanComparison.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-white/5 last:border-0"
                    >
                      <th
                        scope="row"
                        className="py-2.5 pr-4 font-semibold text-navy-300"
                      >
                        {row.label}
                      </th>
                      {row.values.map((value, index) => (
                        <td
                          key={`${row.label}-${index}`}
                          className="px-3 py-2.5 text-navy-100 last:pr-0"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </section>

      <section id="faqs" className="section-pad scroll-mt-24 bg-cream">
        <div className="container-site grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              accent="teal"
              eyebrow="FAQs"
              title="Questions before you brief us"
              description="If something is not covered here, call or WhatsApp and ask directly. We answer before you commit to anything."
            />
            <div className="mt-6 rounded-2xl border border-teal-100 bg-white p-5">
              <p className="text-sm font-bold text-navy-900">
                Question not answered?
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Send the brief or message us directly. We will tell you honestly
                whether we are the right fit for the project.
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <EnquireLink
                  href="#web-enquiry"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-navy-800"
                >
                  Ask us directly
                  <ArrowRight className="h-3.5 w-3.5" />
                </EnquireLink>
                <a
                  href={webContact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-200 bg-white px-4 py-2 text-xs font-bold text-navy-900 transition hover:border-navy-900 hover:bg-navy-50"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          <FaqList items={webFaqs} />
        </div>
      </section>

      <section
        id="web-enquiry"
        className="section-pad scroll-mt-24"
      >
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-12">
          <div>
            <SectionHeading
              accent="teal"
              eyebrow="Get a quote"
              title="Tell us what you want to build"
              description="Share the business, the pages you have in mind and any deadline. We reply within one business day with the next step and a fixed quote. You can also request a free 20-minute website review."
            />

            <div className="mt-6 space-y-3">
              {contactLinks.map(
                ({ href, icon: Icon, label, value, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center gap-3 rounded-2xl border border-navy-100 bg-white p-4 transition hover:border-teal-300"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span>
                      <span className="block text-[10px] font-extrabold tracking-[0.16em] text-muted uppercase">
                        {label}
                      </span>
                      <span className="text-sm font-bold text-navy-900">
                        {value}
                      </span>
                    </span>
                  </a>
                ),
              )}
            </div>

            <div className="mt-5 rounded-2xl bg-cream p-4 text-[12px] leading-relaxed text-muted">
              <p className="font-bold text-navy-900">
                Not sure which package fits?
              </p>
              <p className="mt-1">
                Send the project details anyway. We will recommend the smallest
                package that can do the job, not the most expensive one.
              </p>
            </div>
          </div>

          <WebProjectForm />
        </div>
      </section>
    </>
  );
}
