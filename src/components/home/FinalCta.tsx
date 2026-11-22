import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquireLink } from "@/components/ui/EnquireLink";
import { siteConfig } from "@/data/site";

export function FinalCta() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="grid gap-8 rounded-3xl border border-navy-100 bg-cream p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-[11px] font-extrabold tracking-[0.22em] text-gold-600 uppercase">
              Start today
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Ready to find the right tutor?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Book a free demo class at home or online. Tell us the class,
              subject and locality, and we will call back with a suitable tutor
              within 30 minutes, any time of day.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <EnquireLink href="/#enquire" className="btn-gold">
                Book a free demo
                <ArrowRight className="h-4 w-4" />
              </EnquireLink>
              <a href={siteConfig.phoneHref} className="btn-outline">
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-card">
            <p className="flex items-start gap-3 text-sm text-ink">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
              <span>{siteConfig.address.full}</span>
            </p>
            <p className="mt-4 flex items-center gap-3 text-sm text-ink">
              <Clock className="h-4 w-4 shrink-0 text-gold-600" />
              <span>{siteConfig.hours}</span>
            </p>
            <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-relaxed text-muted">
              Home tuition across Delhi, Noida, Greater Noida, Gurgaon,
              Ghaziabad and Faridabad. Online tuition available across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
