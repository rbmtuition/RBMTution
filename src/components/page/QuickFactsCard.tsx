export function QuickFactsCard({
  title = "At a glance",
  items,
}: {
  title?: string;
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-cream/70 p-5">
      <p className="font-sans text-[10px] font-extrabold tracking-[0.18em] text-navy-900 uppercase">
        {title}
      </p>
      <dl className="mt-3.5 space-y-2.5">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-start justify-between gap-3 text-[13px]"
          >
            <dt className="text-muted">{item.label}</dt>
            <dd className="text-right font-bold text-navy-900">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
