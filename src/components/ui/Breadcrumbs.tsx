import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-navy-200">
        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            className="flex items-center gap-1.5"
          >
            {index > 0 ? (
              <ChevronRight
                aria-hidden="true"
                className="h-3 w-3 text-navy-400"
              />
            ) : null}
            {item.href ? (
              <Link
                href={item.href}
                className="transition hover:text-gold-300"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-gold-200">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
