import Link from "next/link";
import { ArrowRight, GraduationCap, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

export function TutorBand() {
  return (
    <section className="pb-4">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-10 text-white sm:px-10 sm:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full border border-gold-400/20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -bottom-24 h-64 w-64 rounded-full bg-gold-500/10 blur-2xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.22em] text-gold-400 uppercase">
                <GraduationCap className="h-4 w-4" />
                For teachers
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Are you a teacher?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy-100 sm:text-base">
                Join our tutor network for home and online tuition assignments
                across Delhi NCR. Share your subjects, classes and preferred
                localities — our team reviews applications within 24–48 hours.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
              <Link href="/tutor-registration" className="btn-gold">
                Apply as a tutor
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-light"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp us
              </a>
            </div>
          </div>

          <p className="relative mt-6 border-t border-white/10 pt-4 text-[11px] font-semibold text-navy-300">
            Teachers only, please apply here. Tutor helpline:{" "}
            <a
              href={siteConfig.tutorPhoneHref}
              className="text-gold-300 hover:text-gold-200"
            >
              {siteConfig.tutorPhone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
