import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          aria-hidden="true"
          className={cn(
            "h-4 w-4",
            star <= Math.floor(rating)
              ? "fill-gold-500 text-gold-500"
              : "text-gold-300",
          )}
        />
      ))}
      <span className="ml-1.5 text-xs font-bold text-navy-900">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-site">
        <SectionHeading
          align="center"
          eyebrow="Parent & student feedback"
          title="Trusted by families across Delhi NCR"
          description="Real feedback from students who studied with RBM tutors at home."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
            >
              <div className="flex items-start justify-between">
                <Quote className="h-7 w-7 text-gold-300" />
                <Stars rating={testimonial.rating} />
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-gold-400">
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div>
                  <p className="text-sm font-bold text-navy-900">
                    {testimonial.name}
                  </p>
                  <p className="text-xs font-medium text-muted">
                    {testimonial.detail}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
