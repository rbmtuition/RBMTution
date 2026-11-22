import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  LineChart,
  Repeat2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Screened, verified tutors",
    description:
      "Qualification checks, subject demos and ID verification before a tutor is recommended to your family.",
  },
  {
    icon: CalendarCheck,
    title: "Flexible scheduling",
    description:
      "Morning, after-school or weekend slots — in your home or online, around your family's routine.",
  },
  {
    icon: LineChart,
    title: "Progress you can see",
    description:
      "Chapter tests, sample papers and regular feedback so you know whether tuition is working.",
  },
  {
    icon: Repeat2,
    title: "Free tutor replacement",
    description:
      "If the teaching style is not the right fit, we arrange another tutor at no additional cost.",
  },
];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
      />
      <div className="container-site relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading
            tone="dark"
            eyebrow="Why RBM Tuition"
            title="A tuition service that actually follows up"
            description="Finding a tutor is easy. Finding one who understands your child's level, school and exam timeline is the hard part. That is the part we manage."
          />

          <ul className="mt-8 space-y-5">
            {reasons.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-400">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy-200">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Link href="/about" className="btn-gold mt-8">
            More about RBM
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <Users className="h-6 w-6 text-gold-400" />
            <p className="mt-4 font-display text-4xl font-semibold text-white">
              23,000+
            </p>
            <p className="mt-1 text-sm font-semibold text-navy-100">
              Registered tutors
            </p>
            <p className="mt-2 text-xs leading-relaxed text-navy-300">
              Across Delhi NCR and online, covering every major subject and
              board.
            </p>
          </div>

          <div className="rounded-2xl border border-gold-400/30 bg-gold-500 p-6 text-navy-950">
            <BadgeCheck className="h-6 w-6" />
            <p className="mt-4 font-display text-4xl font-semibold">Free</p>
            <p className="mt-1 text-sm font-bold">Demo class</p>
            <p className="mt-2 text-xs leading-relaxed text-navy-900/80">
              Meet the tutor, judge the teaching, then decide. No advance
              payment and no obligation.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <span className="font-display text-3xl font-semibold text-gold-400">
              30 min
            </span>
            <p className="mt-2 text-sm font-bold text-white">
              Average callback time
            </p>
            <p className="mt-3 text-xs leading-relaxed text-navy-300">
              Share your requirement and our team calls back with a tutor
              recommendation, any day of the week.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <span className="font-display text-3xl font-semibold text-gold-400">
              6 cities
            </span>
            <p className="mt-2 text-sm font-bold text-white">
              Across Delhi NCR
            </p>
            <p className="mt-3 text-xs leading-relaxed text-navy-300">
              Delhi, Noida, Greater Noida, Gurgaon, Ghaziabad and Faridabad.
            </p>
            <p className="mt-4 text-[11px] font-semibold text-gold-200">
              {siteConfig.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
