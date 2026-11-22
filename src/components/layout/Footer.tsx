import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/ui/SocialIcons";
import { courses } from "@/data/courses";
import { cities, popularAreas } from "@/data/locations";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { subjects } from "@/data/subjects";

const socialLinks = [
  { label: "Instagram", href: siteConfig.socials.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.socials.facebook, Icon: FacebookIcon },
  { label: "YouTube", href: siteConfig.socials.youtube, Icon: YouTubeIcon },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: LinkedInIcon },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
      />
      <div className="container-site relative py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative flex h-11 w-11 overflow-hidden rounded-xl ring-1 ring-white/15">
                <Image
                  src="/rbm-mark.png"
                  alt="RBM Tuition logo"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <span className="leading-none">
                <span className="block font-display text-[1.35rem] font-semibold text-white">
                  RBM{" "}
                  <span className="text-gold-400">
                    Tuition
                    <sup className="ml-0.5 align-super text-[0.45em] font-semibold">
                      ™
                    </sup>
                  </span>
                </span>
                <span className="mt-1 block text-[9px] font-extrabold tracking-[0.16em] text-navy-300 uppercase">
                  Right teacher. Bright future.
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-200">
              Verified home and online tutors for Nursery to Class 12 across
              Delhi, Noida, Greater Noida, Gurgaon, Ghaziabad and Faridabad.
              Personalised teaching, free demo class and transparent fees.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`RBM Tuition on ${label}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-navy-200 transition hover:border-gold-400 hover:text-gold-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="mt-6 space-y-1.5 text-[11px] font-semibold text-navy-300">
              {siteConfig.certifications.map((item) => (
                <p key={item.label}>
                  <span className="text-gold-400">{item.label}</span> ·{" "}
                  {item.detail}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-sans text-sm font-bold tracking-wide text-white uppercase">
              Courses
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {courses.slice(0, 6).map((course) => (
                <li key={course.slug}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="text-navy-200 transition hover:text-gold-300"
                  >
                    {course.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-1 font-bold text-gold-400 transition hover:text-gold-300"
                >
                  All courses
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-bold tracking-wide text-white uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-navy-200 transition hover:text-gold-300"
                  >
                    {service.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/subjects"
                  className="inline-flex items-center gap-1 font-bold text-gold-400 transition hover:text-gold-300"
                >
                  All subjects
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-bold tracking-wide text-white uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-start gap-2.5 text-navy-200 transition hover:text-gold-300"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  {siteConfig.phone}
                  <span className="sr-only">Student enquiries</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailHref}
                  className="flex items-start gap-2.5 text-navy-200 transition hover:text-gold-300"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-navy-200">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{siteConfig.address.full}</span>
              </li>
              <li className="flex items-start gap-2.5 text-navy-200">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                {siteConfig.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="font-sans text-sm font-bold tracking-wide text-white uppercase">
                Popular locations
              </h3>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
                {popularAreas.map((area) => (
                  <Link
                    key={area.href}
                    href={area.href}
                    className="text-navy-200 transition hover:text-gold-300"
                  >
                    {area.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-sans text-sm font-bold tracking-wide text-white uppercase">
                Cities
              </h3>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/locations/${city.slug}`}
                    className="text-navy-200 transition hover:text-gold-300"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
            {subjects.slice(0, 8).map((subject) => (
              <Link
                key={subject.slug}
                href={`/subjects/${subject.slug}`}
                className="text-navy-300 transition hover:text-gold-300"
              >
                {subject.name} tuition
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-gold-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-300">
              Terms &amp; Conditions
            </Link>
            <Link href="/tutor-registration" className="hover:text-gold-300">
              Apply as a tutor
            </Link>
            <Link
              href="/web-solutions"
              className="font-bold text-teal-300 hover:text-teal-200"
            >
              Web Solutions
            </Link>
            <Link href="/payment" className="hover:text-gold-300">
              Pay Fees
            </Link>
            <Link href="/contact" className="hover:text-gold-300">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

