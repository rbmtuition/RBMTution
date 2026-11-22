import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SubjectCard } from "@/components/cards/SubjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { subjects } from "@/data/subjects";

export function SubjectsSection() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Subjects"
            title="Subject specialists, not all-rounders"
            description="Every subject is taught by a tutor who has studied it deeply and knows the board's paper pattern."
          />
          <Link href="/subjects" className="btn-outline self-start lg:self-auto">
            All subjects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <SubjectCard key={subject.slug} subject={subject} />
          ))}
        </div>
      </div>
    </section>
  );
}
