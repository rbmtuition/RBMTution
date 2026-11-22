"use client";

import { cn } from "@/lib/utils";

export function ConsentCheckbox({
  id,
  checked,
  onChange,
  onBlur,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-start gap-2.5 text-xs leading-relaxed text-muted"
      >
        <input
          id={id}
          name="consent"
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          required
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-gold-600",
            error && "outline-2 outline-offset-2 outline-red-400",
          )}
        />
        <span>{children}</span>
      </label>
      {error ? (
        <p id={errorId} className="mt-1 text-[11px] font-semibold text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
