import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  accent?: "gold" | "teal";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  accent = "gold",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-[11px] font-extrabold tracking-[0.24em] uppercase",
            tone === "dark"
              ? accent === "teal"
                ? "text-teal-300"
                : "text-gold-400"
              : accent === "teal"
                ? "text-teal-700"
                : "text-gold-600",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-3 text-3xl leading-[1.12] font-semibold tracking-tight sm:text-4xl lg:text-[2.7rem]",
          tone === "dark" && "text-white",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-[17px]",
            tone === "dark" ? "text-navy-100" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
