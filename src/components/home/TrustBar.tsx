import { Award, BadgeCheck, GraduationCap, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/site";

const icons = [ShieldCheck, BadgeCheck, Award];

export function TrustBar() {
  return (
    <section className="border-b border-navy-100 bg-cream">
      <div className="container-site grid gap-x-6 gap-y-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {siteConfig.certifications.map((certification, index) => {
          const Icon = icons[index] ?? ShieldCheck;
          return (
            <div key={certification.label} className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-gold-600 ring-1 ring-navy-100">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-[13px] font-bold text-navy-900">
                  {certification.label}
                </p>
                <p className="text-[11px] font-medium text-muted">
                  {certification.detail}
                </p>
              </div>
            </div>
          );
        })}
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-gold-600 ring-1 ring-navy-100">
            <GraduationCap className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-[13px] font-bold text-navy-900">
              23,000+ registered tutors
            </p>
            <p className="text-[11px] font-medium text-muted">
              Screened for experience and subject knowledge
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
