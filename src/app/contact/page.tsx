import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  CreditCard,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/page/PageHero";
import { FaqSection } from "@/components/ui/FaqSection";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/ui/SocialIcons";
import type { Faq } from "@/data/faqs";
import { siteConfig } from "@/data/site";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us — Home Tutors in Delhi NCR",
  description:
    "Call, WhatsApp or send an enquiry to RBM Tuition. Verified home and online tutors across Delhi, Noida, Greater Noida, Gurgaon, Ghaziabad and Faridabad.",
  path: "/contact",
  keywords: [
    "contact RBM Tuition",
    "home tutor enquiry Delhi NCR",
    "book home tutor Noida",
  ],
});

const faqs: Faq[] = [
  {
    question: "How quickly will I get a callback?",
    answer:
      "Our team is available 24 hours a day, 7 days a week. Most enquiries receive a callback within 30 minutes.",
  },
  {
    question: "Do I need to pay before the demo class?",
    answer:
      "No. The demo class is free and there is no obligation to continue. Fees are discussed only after you decide to start regular tuition.",
  },
  {
    question: "Can I request a female tutor?",
    answer:
      "Yes. Mention the preference in your enquiry and we will check availability in your locality before suggesting a tutor.",
  },
  {
    question: "I am a teacher. How do I join?",
    answer: `Apply through the tutor registration form on this website, or call the tutor line on ${siteConfig.tutorPhone} with your subjects, classes taught and preferred localities. Our team will explain the onboarding and demo process.`,
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: siteConfig.socials.instagram,
    Icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: siteConfig.socials.facebook,
    Icon: FacebookIcon,
  },
  {
    label: "YouTube",
    href: siteConfig.socials.youtube,
    Icon: YouTubeIcon,
  },
  {
    label: "LinkedIn",
    href: siteConfig.socials.linkedin,
    Icon: LinkedInIcon,
  },
];

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact RBM Tuition",
    url: absoluteUrl("/contact"),
    description:
      "Contact details and enquiry form for home and online tuition across Delhi NCR.",
    about: { "@id": absoluteUrl("/#organization") },
    mainEntity: { "@id": absoluteUrl("/#organization") },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            contactSchema,
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="Contact"
        title="Tell us what your child needs"
        description="Share the class, subjects and locality. We will confirm tutor availability and arrange a free demo class."
        enquireHref="#contact-form"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        highlights={[
          "Callback within 30 minutes",
          "Free demo class",
          "Open 24 hours, 7 days a week",
          "Home or online",
        ]}
      />

      <section className="section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold sm:text-[1.7rem]">
                Talk to a real person
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                No call centre scripts. Our team knows the classes, boards and
                localities we cover.
              </p>
            </div>

            <a
              href={siteConfig.phoneHref}
              className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-4 transition hover:border-gold-300 hover:bg-cream/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-gold-400">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold tracking-[0.16em] text-muted uppercase">
                  Student enquiries
                </span>
                <span className="mt-0.5 block text-base font-bold text-navy-900">
                  {siteConfig.phone}
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  Call or WhatsApp
                </span>
              </span>
            </a>

            <a
              href={siteConfig.tutorPhoneHref}
              className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-4 transition hover:border-gold-300 hover:bg-cream/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-100 text-navy-900">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold tracking-[0.16em] text-muted uppercase">
                  Tutor applications
                </span>
                <span className="mt-0.5 block text-base font-bold text-navy-900">
                  {siteConfig.tutorPhone}
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  Teachers joining the network
                </span>
              </span>
            </a>

            <a
              href={siteConfig.emailHref}
              className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-4 transition hover:border-gold-300 hover:bg-cream/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-800">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold tracking-[0.16em] text-muted uppercase">
                  Email
                </span>
                <span className="mt-0.5 block text-base font-bold text-navy-900">
                  {siteConfig.email}
                </span>
              </span>
            </a>

            <Link
              href="/payment"
              className="flex items-start gap-3 rounded-xl border border-gold-200 bg-gold-50 p-4 transition hover:border-gold-400 hover:bg-gold-100"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-400 text-navy-950">
                <CreditCard className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold tracking-[0.16em] text-gold-800 uppercase">
                  Fees
                </span>
                <span className="mt-0.5 block text-base font-bold text-navy-900">
                  Pay Fees
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  Bank transfer details and payment confirmation
                </span>
              </span>
            </Link>

            <div className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-800">
                <MapPin className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold tracking-[0.16em] text-muted uppercase">
                  Office
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-navy-900">
                  {siteConfig.address.full}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  Visits by appointment only.
                </span>
              </span>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-800">
                <Clock className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold tracking-[0.16em] text-muted uppercase">
                  Hours
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-navy-900">
                  {siteConfig.hours}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`RBM Tuition on ${label}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-navy-200 text-navy-700 transition hover:border-gold-400 hover:text-gold-700"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div id="contact-form" className="scroll-mt-24">
            <EnquiryForm variant="full" source="Contact page" />
          </div>
        </div>
      </section>

      <section className="pb-4">
        <div className="container-site">
          <div className="mb-4 overflow-hidden rounded-2xl border border-navy-100">
            <Image
              src="/photos/office-centre.avif"
              alt="RBM Tuition office desk and consultation space with natural light"
              width={1600}
              height={1067}
              quality={55}
              sizes="(min-width: 1024px) 1216px, 100vw"
              className="h-[240px] w-full object-cover object-[center_60%] sm:h-[320px] lg:h-[400px]"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-navy-100">
            <iframe
              title="RBM Tuition office location in Sector 132, Noida"
              src="https://www.google.com/maps?q=Urbtech%20Trade%20Center%2C%20Sector%20132%2C%20Noida%2C%20Uttar%20Pradesh%20201304&output=embed"
              width="100%"
              height="360"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block w-full border-0"
            />
          </div>
        </div>
      </section>

      <FaqSection items={faqs} />
    </>
  );
}
