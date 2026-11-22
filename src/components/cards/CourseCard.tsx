import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getCourseImage, type Course } from "@/data/courses";
import { DataIcon } from "@/components/ui/DataIcon";

export function CourseCard({ course }: { course: Course }) {
  const image = getCourseImage(course);

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-soft"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          quality={55}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
            <DataIcon name={course.icon} className="h-5 w-5" />
          </span>
          <span className="rounded-full bg-cream px-3 py-1 text-[10px] font-extrabold tracking-[0.12em] text-navy-700 uppercase">
            {course.label}
          </span>
        </div>
        <h3 className="mt-5 text-xl leading-snug font-semibold">
          {course.shortName}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {course.blurb}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 transition group-hover:text-gold-600">
          Explore course
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
