import { Plus } from "lucide-react";
import type { Faq } from "@/data/faqs";

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-navy-100 border-y border-navy-100">
      {items.map((faq) => (
        <details key={faq.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
            <span className="text-[15px] font-bold text-navy-900 group-open:text-gold-700">
              {faq.question}
            </span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-navy-200 text-navy-700 transition group-open:rotate-45 group-open:border-gold-400 group-open:text-gold-600">
              <Plus className="h-4 w-4" />
            </span>
          </summary>
          <p className="pb-5 text-sm leading-relaxed text-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
