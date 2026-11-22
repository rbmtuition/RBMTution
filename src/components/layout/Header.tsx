"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EnquireLink } from "@/components/ui/EnquireLink";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { courses } from "@/data/courses";
import { cities, popularAreas } from "@/data/locations";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { subjects } from "@/data/subjects";
import { webContact } from "@/data/webSolutions";
import { cn } from "@/lib/utils";

type MenuKey = "courses" | "services" | "locations" | "subjects";

const megaMenus: Record<
  MenuKey,
  {
    title: string;
    links: Array<{ label: string; href: string; hint?: string }>;
    allLabel: string;
    allHref: string;
  }
> = {
  courses: {
    title: "Courses",
    links: courses.map((course) => ({
      label: course.name,
      href: `/courses/${course.slug}`,
      hint: course.label,
    })),
    allLabel: "View all courses",
    allHref: "/courses",
  },
  services: {
    title: "Services",
    links: services.map((service) => ({
      label: service.name,
      href: `/services/${service.slug}`,
      hint: service.keyword,
    })),
    allLabel: "View all services",
    allHref: "/services",
  },
  locations: {
    title: "Locations",
    links: cities.map((city) => ({
      label: city.name,
      href: `/locations/${city.slug}`,
      hint: city.areas.length ? `${city.areas.length} areas` : "City-wide",
    })),
    allLabel: "View all locations",
    allHref: "/locations",
  },
  subjects: {
    title: "Subjects",
    links: subjects.map((subject) => ({
      label: subject.name,
      href: `/subjects/${subject.slug}`,
    })),
    allLabel: "View all subjects",
    allHref: "/subjects",
  },
};

const navOrder: Array<{ label: string; href: string; menu?: MenuKey }> = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses", menu: "courses" },
  { label: "Services", href: "/services", menu: "services" },
  { label: "Locations", href: "/locations", menu: "locations" },
  { label: "Subjects", href: "/subjects", menu: "subjects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Join as Tutor", href: "/tutor-registration" },
];

const webNav = [
  { label: "Services", href: "/web-solutions#services" },
  { label: "Process", href: "/web-solutions#process" },
  { label: "Packages", href: "/web-solutions#pricing" },
  { label: "FAQs", href: "/web-solutions#faqs" },
  { label: "RBM Tuition", href: "/" },
];

export function Header() {
  const pathname = usePathname();
  const isWebSolutions = pathname.startsWith("/web-solutions");
  const webCtaClass =
    "inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-5 py-2.5 text-[13px] font-bold whitespace-nowrap text-navy-950 transition hover:bg-teal-400";
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }

    function onScroll() {
      setScrolled(window.scrollY > 6);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div className="relative z-50 bg-navy-950 text-white">
        <div className="container-site flex h-9 items-center justify-between gap-3 text-[11px] font-semibold">
          <p className="flex items-center gap-1.5 text-navy-100">
            {isWebSolutions ? (
              <Sparkles className="h-3.5 w-3.5 text-teal-300" />
            ) : (
              <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
            )}
            {isWebSolutions ? (
              <>
                <span className="hidden sm:inline">
                  Fixed-price websites from ₹9,999 · by RBM Tuition
                </span>
                <span className="sm:hidden">Websites from ₹9,999</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">
                  ISO 9001:2015 certified · 23,000+ verified tutors
                </span>
                <span className="sm:hidden">23,000+ verified tutors</span>
              </>
            )}
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 text-navy-200 md:flex">
              <Clock
                className={cn(
                  "h-3.5 w-3.5",
                  isWebSolutions ? "text-teal-300" : "text-gold-400",
                )}
              />
              {isWebSolutions ? "Reply within 1 business day" : siteConfig.hours}
            </span>
            <a
              href={siteConfig.emailHref}
              className={cn(
                "hidden items-center gap-1.5 text-navy-200 transition sm:flex",
                isWebSolutions ? "hover:text-teal-300" : "hover:text-gold-300",
              )}
            >
              <Mail
                className={cn(
                  "h-3.5 w-3.5",
                  isWebSolutions ? "text-teal-300" : "text-gold-400",
                )}
              />
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.phoneHref}
              className={cn(
                "flex items-center gap-1.5",
                isWebSolutions ? "text-teal-200" : "text-gold-300",
              )}
            >
              <Phone
                className={cn(
                  "h-3.5 w-3.5",
                  isWebSolutions ? "text-teal-300" : "text-gold-400",
                )}
              />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b border-navy-100 bg-white/95 backdrop-blur transition-shadow duration-300",
          scrolled && "shadow-[0_10px_30px_-18px_rgba(6,21,48,0.35)]",
        )}
      >
        <div className="container-site flex h-[4.6rem] items-center justify-between gap-4">
          <Link
            href={isWebSolutions ? "/web-solutions" : "/"}
            className="flex items-center gap-2.5"
          >
            <span className="relative flex h-11 w-11 overflow-hidden rounded-xl ring-1 ring-navy-900/10">
              <Image
                src="/rbm-mark.png"
                alt={
                  isWebSolutions ? "RBM Web Solutions logo" : "RBM Tuition logo"
                }
                fill
                priority
                sizes="44px"
                className="object-cover"
              />
            </span>
            <span className="leading-none">
              {isWebSolutions ? (
                <>
                  <span className="block font-display text-[1.22rem] font-semibold tracking-tight text-navy-900">
                      RBM <span className="text-teal-700">Web Solutions</span>
                  </span>
                  <span className="mt-1 block text-[9px] font-extrabold tracking-[0.16em] text-muted uppercase">
                    by RBM Tuition · Delhi NCR
                  </span>
                </>
              ) : (
                <>
                  <span className="block font-display text-[1.35rem] font-semibold tracking-tight text-navy-900">
                    RBM <span className="text-gold-600">Tuition</span>
                  </span>
                  <span className="mt-1 block text-[9px] font-extrabold tracking-[0.16em] text-muted uppercase">
                    Delhi NCR · Home &amp; Online
                  </span>
                </>
              )}
            </span>
          </Link>

          <div ref={navRef} className="hidden items-center gap-1 xl:flex">
            <nav aria-label="Primary" className="flex items-center gap-1">
              {isWebSolutions ? (
                webNav.map((item) =>
                  item.href.includes("#") ? (
                    <a
                      key={item.href}
                      href={item.href}
                      className="inline-flex items-center rounded-full px-3 py-2 text-[13px] font-bold whitespace-nowrap text-navy-900 transition hover:bg-cream hover:text-teal-700"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="ml-1 inline-flex items-center rounded-full border border-navy-100 px-3 py-2 text-[13px] font-bold whitespace-nowrap text-navy-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800"
                    >
                      {item.label}
                    </Link>
                  ),
                )
              ) : (
                navOrder.map((item) => {
                const active = isActive(item.href);

                if (!item.menu) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-bold whitespace-nowrap transition",
                        active
                          ? "bg-navy-900 text-white hover:bg-navy-800"
                          : "text-navy-900 hover:bg-cream hover:text-gold-700",
                      )}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {active && (
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 rounded-full bg-gold-400"
                        />
                      )}
                      {item.label}
                    </Link>
                  );
                }

                const key = item.menu;
                const menu = megaMenus[key];
                const open = openMenu === key;

                return (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(key)}
                    onMouseLeave={() => setOpenMenu(null)}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                        setOpenMenu(null);
                      }
                    }}
                  >
                    <button
                      type="button"
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-bold whitespace-nowrap transition",
                        open || active
                          ? "bg-navy-900 text-white hover:bg-navy-800"
                          : "text-navy-900 hover:bg-cream hover:text-gold-700",
                      )}
                      aria-expanded={open}
                      aria-controls={`mega-${key}`}
                      onClick={() => setOpenMenu(open ? null : key)}
                    >
                      {active && (
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 rounded-full bg-gold-400"
                        />
                      )}
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          open && "rotate-180",
                        )}
                      />
                    </button>

                    <div
                      id={`mega-${key}`}
                      className={cn(
                        "absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3 transition duration-150",
                        open
                          ? "visible translate-y-0 opacity-100"
                          : "invisible pointer-events-none -translate-y-1 opacity-0",
                      )}
                    >
                      <div className="w-[min(92vw,700px)] rounded-2xl border border-navy-100 bg-white p-5 shadow-soft">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <p className="text-[10px] font-extrabold tracking-[0.22em] text-gold-600 uppercase">
                            {menu.title}
                          </p>
                          <Link
                            href={menu.allHref}
                            onClick={() => setOpenMenu(null)}
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition",
                              pathname === menu.allHref
                                ? "bg-navy-900 text-white"
                                : "text-navy-800 hover:text-gold-600",
                            )}
                            aria-current={
                              pathname === menu.allHref ? "page" : undefined
                            }
                          >
                            {menu.allLabel}
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>

                        <div
                          className={cn(
                            "mt-3 grid gap-1",
                            key === "courses" ? "grid-cols-2" : "grid-cols-2",
                          )}
                        >
                          {menu.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setOpenMenu(null)}
                              className={cn(
                                "group flex items-center justify-between gap-2 rounded-lg px-3 py-2 transition",
                                pathname === link.href
                                  ? "bg-gold-100 ring-1 ring-gold-300"
                                  : "hover:bg-cream",
                              )}
                              aria-current={
                                pathname === link.href ? "page" : undefined
                              }
                            >
                              <span
                                className={cn(
                                  "text-[13px] leading-snug",
                                  pathname === link.href
                                    ? "font-bold text-navy-900"
                                    : "font-semibold text-navy-900 group-hover:text-gold-700",
                                )}
                              >
                                {link.label}
                              </span>
                              {link.hint ? (
                                <span className="shrink-0 rounded-full bg-navy-50 px-2 py-0.5 text-[9px] font-extrabold tracking-wide text-navy-600 uppercase">
                                  {link.hint}
                                </span>
                              ) : null}
                            </Link>
                          ))}
                        </div>

                        {key === "locations" ? (
                          <div className="mt-3 border-t border-slate-100 pt-3">
                            <p className="text-[10px] font-extrabold tracking-[0.18em] text-muted uppercase">
                              Popular areas
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {popularAreas.map((area) => (
                                <Link
                                  key={area.href}
                                  href={area.href}
                                  onClick={() => setOpenMenu(null)}
                                  className={cn(
                                    "rounded-full px-2.5 py-1 text-[11px] font-semibold transition",
                                    pathname === area.href
                                      ? "bg-navy-900 text-white"
                                      : "bg-cream text-navy-800 hover:bg-gold-100",
                                  )}
                                  aria-current={
                                    pathname === area.href ? "page" : undefined
                                  }
                                >
                                  {area.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })
              )}
            </nav>
          </div>

          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href={siteConfig.phoneHref}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 text-navy-900 transition",
                isWebSolutions
                  ? "hover:border-teal-400 hover:text-teal-700"
                  : "hover:border-gold-400 hover:text-gold-700",
              )}
              aria-label={`Call ${siteConfig.phone}`}
            >
              <Phone className="h-4 w-4" />
            </a>
            <EnquireLink
              href={
                isWebSolutions ? "/web-solutions#web-enquiry" : "/#enquire"
              }
              className={
                isWebSolutions
                  ? webCtaClass
                  : "btn-gold px-5 py-2.5 text-[13px]"
              }
            >
                {isWebSolutions ? "Get a quote" : "Book Free Demo"}
            </EnquireLink>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-navy-100 text-navy-900 xl:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute top-0 right-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <Link
                href={isWebSolutions ? "/web-solutions" : "/"}
                className="flex items-center gap-2.5"
                onClick={() => setMobileOpen(false)}
              >
                <span className="relative flex h-10 w-10 overflow-hidden rounded-lg ring-1 ring-navy-900/10">
                  <Image
                    src="/rbm-mark.png"
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
                {isWebSolutions ? (
                  <span className="leading-tight">
                    <span className="block font-display text-xl font-semibold text-navy-900">
                    RBM <span className="text-teal-700">Web Solutions</span>
                    </span>
                    <span className="mt-0.5 block text-[8px] font-extrabold tracking-[0.16em] text-muted uppercase">
                      by RBM Tuition
                    </span>
                  </span>
                ) : (
                  <span className="font-display text-xl font-semibold text-navy-900">
                    RBM <span className="text-gold-600">Tuition</span>
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-navy-100 text-navy-900"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-3">
              {isWebSolutions ? (
                <nav aria-label="Web solutions">
                  {webNav.map((item) =>
                    item.href.includes("#") ? (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between border-b border-slate-100 py-3.5 text-sm font-bold text-navy-900"
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4 -rotate-90 text-teal-600" />
                      </a>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between border-b border-slate-100 py-3.5 text-sm font-bold text-navy-600"
                      >
                        {item.label}
                        <ArrowRight className="h-4 w-4 text-teal-600" />
                      </Link>
                    ),
                  )}
                  <a
                    href={webContact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="mt-5 flex items-center justify-center gap-2 rounded-full bg-teal-50 px-4 py-3 text-sm font-bold text-teal-800 ring-1 ring-teal-100"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Ask on WhatsApp
                  </a>
                </nav>
              ) : (
                <nav aria-label="Mobile primary">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block border-b border-slate-100 py-3 text-sm font-bold",
                    pathname === "/"
                      ? "bg-navy-900 text-white"
                      : "text-navy-900",
                  )}
                  aria-current={pathname === "/" ? "page" : undefined}
                >
                  Home
                </Link>

                {(
                  ["courses", "services", "locations", "subjects"] as MenuKey[]
                ).map((key) => {
                  const menu = megaMenus[key];
                  return (
                    <details
                      key={key}
                      open={isActive(menu.allHref)}
                      className="group border-b border-slate-100"
                    >
                      <summary
                        className={cn(
                          "flex cursor-pointer list-none items-center justify-between py-3 text-sm font-bold [&::-webkit-details-marker]:hidden",
                          isActive(menu.allHref)
                            ? "bg-gold-100 text-navy-900"
                            : "text-navy-900",
                        )}
                      >
                        {menu.title}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition group-open:rotate-180",
                            isActive(menu.allHref)
                              ? "text-gold-700"
                              : "text-muted",
                          )}
                        />
                      </summary>
                      <div className="grid grid-cols-2 gap-1 pb-3">
                        {menu.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "rounded-lg bg-cream/70 px-2.5 py-2 text-[12px] leading-snug font-semibold text-navy-900",
                              pathname === link.href &&
                                "bg-gold-100 font-bold ring-1 ring-gold-300",
                            )}
                            aria-current={
                              pathname === link.href ? "page" : undefined
                            }
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                      <Link
                        href={menu.allHref}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "mb-3 inline-flex items-center gap-1 text-[12px] font-bold",
                          pathname === menu.allHref
                            ? "rounded-full bg-navy-900 px-2.5 py-1 text-white"
                            : "text-gold-700",
                        )}
                        aria-current={
                          pathname === menu.allHref ? "page" : undefined
                        }
                      >
                        {menu.allLabel}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </details>
                  );
                })}

                {[
                  { label: "About", href: "/about" },
                  { label: "Blog", href: "/blog" },
                  { label: "Contact", href: "/contact" },
  { label: "Join as Tutor", href: "/tutor-registration" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block border-b border-slate-100 py-3 text-sm font-bold",
                      isActive(item.href)
                        ? "bg-navy-900 text-white"
                        : "text-navy-900",
                    )}
                    aria-current={
                      pathname === item.href ? "page" : undefined
                    }
                  >
                    {item.label}
                  </Link>
                ))}
                </nav>
              )}
            </div>

            <div className="space-y-2 border-t border-slate-100 px-5 py-4">
              <EnquireLink
                href={
                  isWebSolutions ? "/web-solutions#web-enquiry" : "/#enquire"
                }
                onNavigate={() => setMobileOpen(false)}
                className={cn("w-full", isWebSolutions ? webCtaClass : "btn-gold")}
              >
              {isWebSolutions ? "Get a quote" : "Book Free Demo"}
              </EnquireLink>
              <div className="grid grid-cols-2 gap-2">
                <a href={siteConfig.phoneHref} className="btn-navy">
                  <Phone className="h-4 w-4" />
                  Call
                </a>
                <a
                  href={isWebSolutions ? webContact.whatsapp : siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
              <p className="pt-1 text-center text-[11px] font-semibold text-muted">
                {siteConfig.hours}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
