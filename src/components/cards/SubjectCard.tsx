import Link from "next/link";
import type { Subject } from "@/data/subjects";
import { DataIcon } from "@/components/ui/DataIcon";

export function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <Link
      href={`/subjects/${subject.slug}`}
      className="group flex items-center gap-3 rounded-xl border border-navy-100 bg-white px-4 py-3.5 transition duration-200 hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-card"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-800 transition group-hover:bg-navy-900 group-hover:text-gold-400">
        <DataIcon name={subject.icon} className="h-4 w-4" />
      </span>
      <span className="text-sm font-bold text-navy-900">{subject.name}</span>
    </Link>
  );
}
