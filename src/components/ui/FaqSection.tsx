import type { Faq } from "@/data/faqs";
import { FaqList } from "@/components/ui/FaqList";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FaqSectionProps = {
  items: Faq[];
  eyebrow?: string;
  title?: string;
  description?: string;
  id?: string;
  className?: string;
};

export function FaqSection({
  items,
  eyebrow = "FAQs",
  title = "Questions parents ask before starting",
  description = "Still unsure about something? Call us and speak to a real person — no call centre scripts.",
  id,
  className,
}: FaqSectionProps) {
  return (
    <section id={id} className={className ?? "section-pad bg-cream"}>
      <div className="container-site grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </div>
        <FaqList items={items} />
      </div>
    </section>
  );
}
