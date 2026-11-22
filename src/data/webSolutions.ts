import type { LucideIcon } from "lucide-react";
import {
  Code2,
  GraduationCap,
  LayoutTemplate,
  MousePointerClick,
  RefreshCw,
  Rocket,
  SearchCheck,
  Send,
  ShoppingBag,
  Smartphone,
  Store,
  Wrench,
} from "lucide-react";
import type { Faq } from "@/data/faqs";
import { siteConfig } from "@/data/site";

const whatsappNumber = siteConfig.phonePlain.replace(/\D/g, "");

export const webContact = {
  phone: siteConfig.phone,
  phoneHref: siteConfig.phoneHref,
  email: siteConfig.email,
  emailHref: siteConfig.emailHref,
  whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi RBM Web Solutions, I would like a website for my business. Please share the next steps.",
  )}`,
};

export type WebAudience = {
  icon: LucideIcon;
  title: string;
  description: string;
  examples: string[];
};

export const webAudiences: WebAudience[] = [
  {
    icon: GraduationCap,
    title: "Schools, coaching centres and tutors",
    description:
      "Show courses, faculty and results clearly, then make it easy for parents to request a demo or admission callback.",
    examples: ["Course and batch pages", "Admission enquiries", "Faculty and results"],
  },
  {
    icon: Store,
    title: "Local businesses and shops",
    description:
      "Put your services, menu, gallery and location online with call, WhatsApp and map actions that work on every phone.",
    examples: ["Services and menus", "Gallery and reviews", "Calls, WhatsApp and maps"],
  },
  {
    icon: Rocket,
    title: "Startups and independent professionals",
    description:
      "Launch a credible site quickly, test your offer with a focused landing page and look established from day one.",
    examples: ["Launch websites", "Campaign landing pages", "Portfolios and personal brands"],
  },
];

export type WebService = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const webServices: WebService[] = [
  {
    icon: LayoutTemplate,
    title: "Business websites",
    description:
      "A clear 3–8 page website that explains what you do, builds trust and gives visitors one obvious next step.",
  },
  {
    icon: MousePointerClick,
    title: "Landing pages",
    description:
      "Focused pages for admissions, ads or a single offer — built to capture enquiries without distracting menus.",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    description:
      "Small catalogues with product pages, payments, delivery basics and an admin flow you can manage.",
  },
  {
    icon: RefreshCw,
    title: "Website redesigns",
    description:
      "Rebuild a slow, dated or hard-to-edit site with cleaner navigation, better mobile layouts and faster pages.",
  },
  {
    icon: SearchCheck,
    title: "SEO foundations",
    description:
      "Page structure, titles, metadata, schema, sitemap, speed and analytics — the technical base search engines need.",
  },
  {
    icon: Wrench,
    title: "Maintenance and care",
    description:
      "Updates, backups, security checks and small content changes, so the site keeps working after launch.",
  },
];

export type WebProofPoint = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const webProofPoints: WebProofPoint[] = [
  {
    icon: Code2,
    title: "Custom Next.js builds",
    description:
      "Fast, modern code with no bloated page builder — chosen to fit the project and easy to extend later.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first by default",
    description:
      "Layouts are designed for a phone first, then expanded for tablet and desktop rather than squeezed down.",
  },
  {
    icon: SearchCheck,
    title: "SEO foundations built in",
    description:
      "Clean page structure, metadata, schema, sitemaps and speed basics so search engines can understand the site.",
  },
  {
    icon: Send,
    title: "Forms that reach you",
    description:
      "Enquiry, WhatsApp and call actions are wired, tested and labelled so you know where every lead came from.",
  },
];

export type WebProcessStep = {
  title: string;
  description: string;
};

export const webProcess: WebProcessStep[] = [
  {
    title: "Free 20-minute call",
    description:
      "We discuss your business, who the site is for, the pages you need and what a successful enquiry looks like.",
  },
  {
    title: "Fixed scope and quote",
    description:
      "You receive a written page list, features, timeline and one fixed price. No hourly surprises later.",
  },
  {
    title: "Content and sitemap",
    description:
      "You share the text, photos and logo. We organise everything into a clear page structure and flag gaps early.",
  },
  {
    title: "Design preview",
    description:
      "We design the key pages first so you can approve the direction before the rest of the site is built.",
  },
  {
    title: "Build and test",
    description:
      "Pages are built mobile-first, then tested for speed, forms, links, accessibility and the important screen sizes.",
  },
  {
    title: "Launch and support",
    description:
      "We connect your domain, launch the site and stay available for 30 days to fix any post-launch issues.",
  },
];

export type WebPlan = {
  name: string;
  price: string;
  meta: string;
  summary: string;
  features: string[];
  featured?: boolean;
  ctaLabel: string;
  packageOption: string;
};

export const webPlans: WebPlan[] = [
  {
    name: "Starter",
    price: "₹9,999",
    meta: "3–5 pages · 1–2 weeks",
    summary: "A focused website for a new or small business that needs to look credible and collect enquiries.",
    features: [
      "Mobile-first custom design",
      "Up to 5 pages",
      "Enquiry form and WhatsApp button",
      "Basic on-page SEO",
      "2 revision rounds",
      "30 days of post-launch support",
    ],
    ctaLabel: "Start with Starter",
    packageOption: "Starter — ₹9,999",
  },
  {
    name: "Business",
    price: "₹19,999",
    meta: "Up to 8 pages · 2–4 weeks",
    summary: "A fuller site for schools, coaching centres and established local businesses with more content.",
    features: [
      "Everything in Starter",
      "Up to 8 pages",
      "Blog and photo gallery",
      "Google Maps and analytics",
      "2 revision rounds",
      "30 days of post-launch support",
    ],
    featured: true,
    ctaLabel: "Choose Business",
    packageOption: "Business — ₹19,999",
  },
  {
    name: "E-commerce / Custom",
    price: "From ₹39,999",
    meta: "Scope-based · 4–6 weeks",
    summary: "For stores, bookings or custom features that need a scope built around how your business works.",
    features: [
      "Everything in Business",
      "Product catalogue or custom features",
      "Payments, bookings or integrations",
      "Custom page design",
      "2 revision rounds",
      "30 days of post-launch support",
    ],
    ctaLabel: "Discuss a custom build",
    packageOption: "E-commerce / Custom — from ₹39,999",
  },
];

export const webPlanColumns = [
  { name: "Starter", price: "₹9,999" },
  { name: "Business", price: "₹19,999" },
  { name: "E-commerce / Custom", price: "From ₹39,999" },
];

export const webPlanComparison = [
  {
    label: "Best for",
    values: [
      "A focused site that needs to look credible and collect enquiries.",
      "Schools, coaching centres and established local businesses with more content.",
      "Stores, bookings or custom features built around how you work.",
    ],
  },
  {
    label: "Pages",
    values: ["Up to 5", "Up to 8", "Scope-based"],
  },
  {
    label: "Timeline",
    values: ["1–2 weeks", "2–4 weeks", "4–6 weeks"],
  },
  {
    label: "Design",
    values: [
      "Custom, mobile-first",
      "Custom, mobile-first",
      "Custom page design",
    ],
  },
  {
    label: "Enquiry form + WhatsApp",
    values: ["Included", "Included", "Included"],
  },
  {
    label: "Blog + photo gallery",
    values: ["—", "Included", "Included"],
  },
  {
    label: "Payments, bookings or integrations",
    values: ["—", "—", "Scope-based"],
  },
  {
    label: "On-page SEO foundations",
    values: ["Included", "Included", "Included"],
  },
  {
    label: "Revision rounds",
    values: ["2", "2", "2"],
  },
  {
    label: "Support after launch",
    values: ["30 days", "30 days", "30 days"],
  },
  {
    label: "Domain + hosting",
    values: [
      "Billed at actuals, in your name",
      "Billed at actuals, in your name",
      "Billed at actuals, in your name",
    ],
  },
  {
    label: "Ownership",
    values: [
      "After final payment",
      "After final payment",
      "After final payment",
    ],
  },
];

export const webFaqs: Faq[] = [
  {
    question: "How long will my website take?",
    answer:
      "Starter sites usually launch in 1–2 weeks, Business sites in 2–4 weeks and e-commerce or custom projects in 4–6 weeks. The timeline starts once your content, logo and approvals are ready.",
  },
  {
    question: "What do you need from me to start?",
    answer:
      "Your logo, any brand colours, the text and photos you want to use, and examples of websites you like. If something is missing, we will tell you before the build starts rather than after.",
  },
  {
    question: "Do you handle domain and hosting?",
    answer:
      "You buy the domain and hosting in your own name so you keep control. We set both up, connect the site and help with the DNS and email records. Renewal costs are paid directly to your provider.",
  },
  {
    question: "Who writes the website content?",
    answer:
      "You provide the raw content and we organise it into pages, improve headings and flag anything unclear. We do not invent credentials, reviews or claims about your business.",
  },
  {
    question: "Will my website rank on Google?",
    answer:
      "We include the technical SEO foundations: clear page structure, metadata, schema, sitemap, fast pages and analytics. Rankings also depend on your competition, content and ongoing work, so we do not promise a position.",
  },
  {
    question: "How many changes are included?",
    answer:
      "Two consolidated revision rounds are included — one after the design preview and one before launch. Anything beyond that is quoted separately so the scope stays clear.",
  },
  {
    question: "How do payments work?",
    answer:
      "A 50% advance starts the project and the remaining 50% is due before the site goes live. You receive a written scope and invoice before work begins. The invoice confirms any applicable taxes, and on final payment you own the website, domain, hosting account and content.",
  },
  {
    question: "What is not included in the package price?",
    answer:
      "Full copywriting, photography, paid ads or media spend, third-party subscriptions, payment processing fees, domain and hosting renewals are not included unless the written quote says otherwise. Domain and hosting are billed at actuals in your name, and applicable taxes are shown separately.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every package includes 30 days of support for launch issues. After that, care plans start at ₹999 per month for updates, backups, security checks and small content changes.",
  },
  {
    question: "Do you offer a free website review?",
    answer:
      "Yes. Tick the free 20-minute website review box in the quote form. We will look at your current site or plan and share practical priorities on a short call. It is optional and does not commit you to a project.",
  },
  {
    question: "Do you work with clients outside Delhi NCR?",
    answer:
      "Yes. We are based in Delhi NCR and work with clients worldwide over calls, email and WhatsApp. Meetings in person can be arranged locally when needed.",
  },
];

export const webProjectTypes = [
  "New business website",
  "Landing page",
  "E-commerce store",
  "Website redesign",
  "SEO foundations",
  "Maintenance / care plan",
  "Not sure yet",
];

export const webPackageOptions = [
  "Starter — ₹9,999",
  "Business — ₹19,999",
  "E-commerce / Custom — from ₹39,999",
  "Not sure yet",
];
