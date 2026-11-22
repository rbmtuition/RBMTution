import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CourseCard } from "@/components/cards/CourseCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredCourses } from "@/data/courses";

export function CoursesSection() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Courses"
            title="Tuition for every class and milestone"
            description="From primary school foundations to board exams and competitive entrances — choose a programme and we will match a tutor who teaches it well."
          />
          <Link href="/courses" className="btn-outline self-start lg:self-auto">
            View all courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
