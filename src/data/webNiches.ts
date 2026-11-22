import type { Faq } from "@/data/faqs";

export type WebNiche = {
  slug: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  intro: string;
  audience: string;
  ctaTitle: string;
  painPoints: { title: string; description: string }[];
  included: string[];
  outcomes: string[];
  packageName: string;
  faqs: Faq[];
};

export const webNiches: WebNiche[] = [
  {
    slug: "coaching-centre-website-design",
    shortName: "Coaching centre websites",
    metaTitle: "Coaching Centre Website Design | RBM Web Solutions",
    metaDescription:
      "Mobile-first website design for coaching centres and tuition classes. Show courses, faculty, results and timings, then make demo-class enquiries easy.",
    keywords: [
      "coaching centre website design",
      "tuition class website",
      "coaching institute website India",
      "demo class enquiry website",
    ],
    eyebrow: "Coaching centre websites",
    h1: "Coaching centre websites that turn parents into demo bookings",
    intro:
      "Parents compare the course, faculty, results and timings before they pick up the phone. We build a mobile-first website that answers those questions and makes the demo enquiry obvious.",
    audience: "For coaching centres, tuition classes and subject academies",
    ctaTitle: "Tell us what your coaching centre needs from its website.",
    painPoints: [
      {
        title: "Parents cannot tell what you teach",
        description:
          "Course names, batch timings and subjects are buried in a WhatsApp reply or an old fee sheet.",
      },
      {
        title: "The phone experience loses enquiries",
        description:
          "Most parents check on a phone. Tiny text, missing timings and broken menus send them back to the competition.",
      },
      {
        title: "Every call starts from zero",
        description:
          "Without a clear enquiry flow, the team repeats the same basic questions before a demo can be booked.",
      },
    ],
    included: [
      "Course and batch pages with subjects, classes and timings",
      "Faculty and teaching approach",
      "Results and parent-friendly proof",
      "Demo class and admission enquiry form",
      "Call, WhatsApp and Google Maps actions",
      "Basic on-page SEO and analytics",
    ],
    outcomes: [
      "Parents understand the course and batch before they call.",
      "Demo requests arrive with the class, subject and contact details.",
      "Batch and timing changes are easy to accommodate in the page structure.",
    ],
    packageName: "Business",
    faqs: [
      {
        question: "Can you work with our existing coaching centre content?",
        answer:
          "Yes. We can start from your current brochure, fee sheet or website and restructure it for the web. If the content is incomplete, we will list exactly what is needed before the build starts.",
      },
      {
        question: "Can parents pay fees on the website?",
        answer:
          "Online payments can be scoped as a custom feature. The Business package includes the course pages and enquiry capture, but not a payment gateway. We will quote payments separately if you need them.",
      },
      {
        question: "Can we show our results and toppers?",
        answer:
          "Yes, if the results are accurate and you have permission to publish the student details. We do not invent toppers, reviews or testimonials.",
      },
      {
        question: "How long does a coaching centre website take?",
        answer:
          "The Business package is typically 2–4 weeks after the content and advance payment are ready. Course count and custom features can change the timeline, so the written quote confirms it upfront.",
      },
    ],
  },
  {
    slug: "school-website-design",
    shortName: "School websites",
    metaTitle: "School Website Design | Admissions & Parent Information",
    metaDescription:
      "Clear, mobile-first school website design with admissions information, faculty, facilities, notices and enquiry forms for parents.",
    keywords: [
      "school website design",
      "school website development India",
      "admission enquiry website",
      "school website Delhi NCR",
    ],
    eyebrow: "School websites",
    h1: "School websites that make admissions easier",
    intro:
      "Parents compare schools on a phone. Give them a clear view of admissions, facilities, faculty and daily communication without making them download a prospectus first.",
    audience: "For schools, preschools and learning centres",
    ctaTitle: "Tell us what your school needs from its website.",
    painPoints: [
      {
        title: "Admission steps are unclear",
        description:
          "Parents cannot find the age criteria, documents, timelines or the right person to contact.",
      },
      {
        title: "Important information lives only in PDFs",
        description:
          "Fee sheets, circulars and forms are hard to open on a phone and impossible to scan quickly.",
      },
      {
        title: "The front office repeats itself",
        description:
          "The same questions about timings, facilities and admissions arrive by phone every day.",
      },
    ],
    included: [
      "Admission process and enquiry form",
      "About, faculty and facilities pages",
      "Notices, events and school news",
      "Gallery and campus information",
      "Contact details, map and directions",
      "Basic on-page SEO and analytics",
    ],
    outcomes: [
      "Parents can answer the basic admission questions themselves.",
      "Enquiries arrive with the child's class and the parent's contact details.",
      "Notices and events have a clear, structured place on the site.",
    ],
    packageName: "Business",
    faqs: [
      {
        question: "Can our staff update notices and events?",
        answer:
          "The site is structured so notices and events have clear content areas. Updates can be made by your team through the handover process or handled through the optional care plan. We confirm the exact editing workflow before the build.",
      },
      {
        question: "Can we keep our existing school domain?",
        answer:
          "Yes. The domain and hosting are bought in the school's name. We can work with the accounts you already own and help with the connection and launch.",
      },
      {
        question: "Do you write all the school content?",
        answer:
          "The package covers page structure and web copy editing for the agreed pages. Full copywriting, prospectus design and photography are quoted separately or supplied by the school.",
      },
      {
        question: "Do you work with schools outside Delhi NCR?",
        answer:
          "Yes. We work remotely with schools across India and can coordinate over calls, email and WhatsApp. In-person meetings can be arranged locally when needed.",
      },
    ],
  },
  {
    slug: "local-business-website-design",
    shortName: "Local business websites",
    metaTitle: "Local Business Website Design | Calls, Maps & Enquiries",
    metaDescription:
      "Website design for shops, clinics, salons and local services. Show services, hours, photos and location, then make calls and WhatsApp enquiries easy.",
    keywords: [
      "local business website design",
      "small business website India",
      "shop website design",
      "clinic website design",
      "salon website design",
    ],
    eyebrow: "Local business websites",
    h1: "Local business websites built to get calls and visits",
    intro:
      "Your customers already search on a phone. Give them one clear place for services, hours, photos, location and contact, so choosing you takes one tap instead of five.",
    audience: "For shops, clinics, salons, restaurants and local services",
    ctaTitle: "Tell us what your local business needs from its website.",
    painPoints: [
      {
        title: "Customers cannot find basic details",
        description:
          "Opening hours, services, prices and parking are scattered across social posts and old photos.",
      },
      {
        title: "A social page feels temporary",
        description:
          "A profile is useful for updates, but it does not give a customer a complete, credible place to check your business.",
      },
      {
        title: "There is no obvious next step",
        description:
          "Visitors scroll, then leave. Without a clear call, WhatsApp, directions or enquiry action, interest does not become a lead.",
      },
    ],
    included: [
      "Services, menu or product sections",
      "Photo gallery and opening hours",
      "Google Maps and directions",
      "Call and WhatsApp actions",
      "Real reviews or testimonials, only with permission",
      "Basic on-page SEO and analytics",
    ],
    outcomes: [
      "Customers find the services, hours and location without asking.",
      "Calls and WhatsApp messages arrive with a clearer intent.",
      "The business looks established on a phone, not just on social media.",
    ],
    packageName: "Starter",
    faqs: [
      {
        question: "I only have an Instagram page. Can you still build a website?",
        answer:
          "Yes. We can use your existing photos and service information as the starting point. If important details are missing, we will send a short content checklist before the build.",
      },
      {
        question: "Can I update prices and photos later?",
        answer:
          "Content updates can be handled through the optional care plan, or we can agree an editing workflow during handover. The website is built in your accounts, so you are never locked out.",
      },
      {
        question: "Will the website put me on top of Google?",
        answer:
          "The package includes basic on-page SEO: clear titles, headings, metadata, a sitemap and Google-friendly structure. Rankings also depend on competition, reviews and ongoing content, so no honest developer can guarantee a number-one position.",
      },
      {
        question: "Do you need professional photos?",
        answer:
          "Professional photos help, but they are not mandatory to start. You can supply phone photos you own, and we will use them honestly. Full photography is not included in the package.",
      },
    ],
  },
];

export function getWebNiche(slug: string) {
  return webNiches.find((niche) => niche.slug === slug);
}
