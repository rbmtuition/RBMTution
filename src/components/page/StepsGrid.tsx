import type { LucideIcon } from "lucide-react";

export type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function StepsGrid({ steps }: { steps: Step[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {steps.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="rounded-2xl border border-navy-100 bg-cream/60 p-5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="mt-4 text-base font-bold">{title}</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
}
