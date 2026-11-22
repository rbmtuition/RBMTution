import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Home, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const links = [
  {
    href: "/courses",
    label: "Home tuition courses",
    description: "Nursery to Class 12 and entrance exams.",
    icon: BookOpen,
  },
  {
    href: "/subjects",
    label: "Subject tutors",
    description: "Maths, science, English, commerce and more.",
    icon: BookOpen,
  },
  {
    href: "/locations",
    label: "Areas we cover",
    description: "Delhi, Noida, Gurgaon, Ghaziabad and Faridabad.",
    icon: MapPin,
  },
  {
    href: "/contact",
    label: "Talk to us",
    description: "Call, WhatsApp or send an enquiry.",
    icon: Phone,
  },
];

export default function NotFound() {
  return (
    <section className="hero-surface relative overflow-hidden text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full border border-gold-400/15"
      />
      <div className="container-site relative py-16 text-center sm:py-20">
        <p className="text-[11px] font-extrabold tracking-[0.24em] text-gold-400 uppercase">
          404
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl text-3xl leading-[1.15] font-semibold text-white sm:text-4xl lg:text-[3rem]">
          This page isn&rsquo;t on the timetable.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-navy-100 sm:text-base">
          The link may be old or the page may have moved. Start from one of
          these instead, or call us and we will point you the right way.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          <Link href="/" className="btn-gold px-5 py-2.5 text-[13px]">
            <Home className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/courses"
            className="btn-ghost-light px-5 py-2.5 text-[13px]"
          >
            Browse courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
          {links.map(({ href, label, description, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-gold-400/40 hover:bg-white/10"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-400/15 text-gold-300">
                <Icon className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-bold text-white">
                  {label}
                </span>
                <span className="mt-0.5 block text-xs text-navy-200">
                  {description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
