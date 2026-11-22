import type { Metadata } from "next";
import { cities } from "@/data/locations";
import type { Faq } from "@/data/faqs";
import { siteConfig } from "@/data/site";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function courseSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: absoluteUrl(path),
    provider: {
      "@type": "EducationalOrganization",
      "@id": absoluteUrl("/#organization"),
      name: siteConfig.name,
      url: siteConfig.url,
    },
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: ["Onsite", "Online"],
        courseWorkload: "PT2H",
        location: {
          "@type": "Place",
          name: "Delhi NCR, India",
        },
      },
    ],
  };
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
  areaServed,
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: serviceType ?? name,
    url: absoluteUrl(path),
    provider: {
      "@type": "EducationalOrganization",
      "@id": absoluteUrl("/#organization"),
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: (areaServed ?? cities.map((city) => city.name)).map((area) => ({
      "@type": "Place",
      name: area,
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/rbm-mark.png"),
    description: siteConfig.description,
    telephone: siteConfig.phonePlain,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    areaServed: cities.map((city) => ({
      "@type": "City",
      name: city.name,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: Object.values(siteConfig.socials),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phonePlain,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en-IN",
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
