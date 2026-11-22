import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "Share your requirement",
    description:
      "Tell us the class, subject, board and locality. We call back within 30 minutes, any time of day.",
  },
  {
    title: "Meet a matched tutor",
    description:
      "We shortlist a tutor for your syllabus and arrange a free demo class at your preferred time.",
  },
  {
    title: "Start a personal plan",
    description:
      "The tutor maps the syllabus, sets weekly targets and builds a schedule around school work.",
  },
  {
    title: "Track progress",
    description:
      "Regular tests and honest feedback keep you informed, with a free tutor replacement if needed.",
  },
];

export function ProcessSection() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="From enquiry to first class in 24–48 hours"
          description="A simple, human process — no endless forms and no payment before you meet the tutor."
        />

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-navy-100 bg-white p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 font-display text-lg font-semibold text-gold-400">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-11 -right-3 hidden h-px w-6 bg-gold-300 lg:block"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
