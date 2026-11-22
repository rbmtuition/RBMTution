import type { ReactNode } from "react";

export function DetailShell({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <section className="section-pad">
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1fr)_22.5rem] lg:items-start lg:gap-12">
        <div className="min-w-0 space-y-10">{children}</div>
        <aside
          id="enquire"
          className="scroll-mt-24 space-y-4 lg:sticky lg:top-24"
        >
          {sidebar}
        </aside>
      </div>
    </section>
  );
}
