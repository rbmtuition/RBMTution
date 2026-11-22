"use client";

import { usePathname } from "next/navigation";
import { FileText, MessageCircle, Phone, Search } from "lucide-react";
import { siteConfig } from "@/data/site";
import { webContact } from "@/data/webSolutions";
import { EnquireLink } from "@/components/ui/EnquireLink";

export function StickyMobileBar() {
  const pathname = usePathname();
  const isWebSolutions = pathname.startsWith("/web-solutions");
  const whatsapp = isWebSolutions ? webContact.whatsapp : siteConfig.whatsapp;

  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_-18px_rgba(6,21,48,0.35)] backdrop-blur md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-1.5">
        <a
          href={siteConfig.phoneHref}
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-navy-900"
        >
          <Phone className="h-5 w-5" />
          <span className="text-[10px] font-bold">Call</span>
        </a>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-green-700"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>
        {isWebSolutions ? (
          <EnquireLink
            href="#web-enquiry"
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-teal-500 py-1.5 text-navy-950"
          >
            <FileText className="h-5 w-5" />
            <span className="text-[10px] font-bold">Get a quote</span>
          </EnquireLink>
        ) : (
          <EnquireLink
            href="/#enquire"
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-gold-500 py-1.5 text-navy-950"
          >
            <Search className="h-5 w-5" />
            <span className="text-[10px] font-bold">Find a tutor</span>
          </EnquireLink>
        )}
      </div>
    </nav>
  );
}
