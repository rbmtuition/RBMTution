import type { ReactNode } from "react";
import { PageHero } from "@/components/page/PageHero";

export function LegalShell({
  title,
  description,
  updated,
  children,
}: {
  title: string;
  description: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        description={description}
        showCta={false}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: title },
        ]}
      />

      <section className="section-pad">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-bold tracking-[0.08em] text-muted uppercase">
            Last updated: {updated}
          </p>
          <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted [&_a]:font-semibold [&_a]:text-navy-900 [&_a]:underline [&_a]:decoration-gold-400 [&_a]:underline-offset-4 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy-900 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-navy-900 [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
