"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  RotateCcw,
} from "lucide-react";
import { classOptions } from "@/data/courses";
import { cities, cityOptions } from "@/data/locations";
import { siteConfig } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { submitForm } from "@/lib/formApi";
import {
  tutorAvailabilityOptions,
  tutorBoardOptions,
  tutorExperienceOptions,
  tutorFeeOptions,
  tutorLanguageOptions,
  tutorModeOptions,
  tutorQualifications,
  tutorSubjectChoices,
} from "@/lib/formOptions";
import {
  FIELD_LIMITS,
  validateEmail,
  validateName,
  validateOptionalResume,
  validatePhone,
} from "@/lib/validation";
import { cn } from "@/lib/utils";
import { ConsentCheckbox } from "@/components/forms/ConsentCheckbox";
import { RequiredMark } from "@/components/forms/RequiredMark";
import { SearchableSelect } from "@/components/forms/SearchableSelect";

const STORAGE_KEY = "rbm-tutor-application-v1";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  area: string;
  qualification: string;
  experience: string;
  mode: string;
  classes: string[];
  subjects: string[];
  boards: string[];
  languages: string[];
  feeRange: string;
  availability: string[];
  resumeUrl: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  area: "",
  qualification: "",
  experience: "",
  mode: "",
  classes: [],
  subjects: [],
  boards: [],
  languages: [],
  feeRange: "",
  availability: [],
  resumeUrl: "",
  consent: false,
};

const stepLabels = ["Personal", "Teaching", "Review"];

function isOption<T extends string>(
  options: readonly T[],
  value: string,
): value is T {
  return options.some((option) => option === value);
}

function allOptions<T extends string>(
  options: readonly T[],
  values: string[],
) {
  return values.every((value) => isOption(options, value));
}

function validateStep(step: number, values: FormState): FormErrors {
  const errors: FormErrors = {};
  const selectedCity = cities.find((city) => city.name === values.city);

  if (step === 1) {
    const nameError = validateName(values.fullName);
    if (nameError) errors.fullName = nameError;

    const phoneError = validatePhone(values.phone);
    if (phoneError) errors.phone = phoneError;

    const emailError = validateEmail(values.email, true);
    if (emailError) errors.email = emailError;

    if (!isOption(cityOptions, values.city)) {
      errors.city = "Select your city.";
    } else if (!values.area) {
      errors.area = "Select your area or locality.";
    } else if (!selectedCity?.areas.some((area) => area.name === values.area)) {
      errors.area = "Select a valid area for your city.";
    }

    if (!isOption(tutorQualifications, values.qualification)) {
      errors.qualification = "Select your highest qualification.";
    }
    if (!isOption(tutorExperienceOptions, values.experience)) {
      errors.experience = "Select your teaching experience.";
    }
    if (!isOption(tutorModeOptions, values.mode)) {
      errors.mode = "Select your preferred teaching mode.";
    }
  }

  if (step === 2) {
    if (
      values.classes.length === 0 ||
      !allOptions(classOptions, values.classes)
    ) {
      errors.classes = "Select at least one valid class.";
    }
    if (
      values.subjects.length === 0 ||
      !allOptions(tutorSubjectChoices, values.subjects)
    ) {
      errors.subjects = "Select at least one valid subject.";
    }
    if (
      values.boards.length === 0 ||
      !allOptions(tutorBoardOptions, values.boards)
    ) {
      errors.boards = "Select at least one valid board.";
    }
    if (
      values.languages.length === 0 ||
      !allOptions(tutorLanguageOptions, values.languages)
    ) {
      errors.languages = "Select at least one valid language.";
    }
    if (!isOption(tutorFeeOptions, values.feeRange)) {
      errors.feeRange = "Select your expected fee range.";
    }
    if (
      values.availability.length === 0 ||
      !allOptions(tutorAvailabilityOptions, values.availability)
    ) {
      errors.availability = "Select at least one availability slot.";
    }
  }

  if (step === 3) {
    if (!values.consent) {
      errors.consent = "Please confirm before submitting your application.";
    }
    const resumeError = validateOptionalResume(values.resumeUrl);
    if (resumeError) errors.resumeUrl = resumeError;
  }

  return errors;
}

function loadSavedApplication() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as {
      values?: Partial<FormState>;
      step?: number;
    };
  } catch {
    return null;
  }
}

function saveApplication(values: FormState, step: number) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ values, step }));
  } catch {
    return;
  }
}

function clearSavedApplication() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-[11px] font-semibold text-red-600">
      {message}
    </p>
  );
}

function ChipGroup({
  id,
  legend,
  options,
  selected,
  onToggle,
  error,
  required = false,
}: {
  id: string;
  legend: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <fieldset
      id={id}
      tabIndex={-1}
      aria-describedby={error ? `${id}-error` : undefined}
      aria-required={required}
      className="scroll-mt-24"
    >
      <legend className="field-label">
        {legend}
        {required ? <RequiredMark /> : null}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <label
              key={option}
              className={cn(
                "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-within:ring-2 focus-within:ring-gold-500/30",
                active
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-slate-200 bg-white text-navy-800 hover:border-gold-400 hover:bg-cream/60",
              )}
            >
              <input
                type="checkbox"
                checked={active}
                onChange={() => onToggle(option)}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </fieldset>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-extrabold tracking-[0.14em] text-muted uppercase">
        {label}
      </dt>
      <dd className="mt-0.5 text-[13px] font-semibold break-words text-navy-900">
        {value || "—"}
      </dd>
    </div>
  );
}

export function TutorRegistrationForm() {
  const uid = useId();
  const cardRef = useRef<HTMLDivElement>(null);
  const [restored, setRestored] = useState(false);
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const saved = loadSavedApplication();
      if (saved) {
        if (saved.values) {
          setValues((current) => ({ ...current, ...saved.values }));
        }
        if (saved.step === 2 || saved.step === 3) {
          setStep(saved.step);
        }
      }
      setRestored(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (restored && status !== "success") {
      saveApplication(values, step);
    }
  }, [values, step, status, restored]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  function toggle(
    key: "classes" | "subjects" | "boards" | "languages" | "availability",
    value: string,
  ) {
    setValues((current) => {
      const list = current[key];
      return {
        ...current,
        [key]: list.includes(value)
          ? list.filter((item) => item !== value)
          : [...list, value],
      };
    });
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  function updateCity(city: string) {
    setValues((current) => ({ ...current, city, area: "" }));
    setErrors((current) => ({
      ...current,
      city: undefined,
      area: undefined,
    }));
  }

  function handleBlur(key: keyof FormState) {
    const nextErrors = validateStep(step, values);
    setErrors((current) => ({ ...current, [key]: nextErrors[key] }));
  }

  function fieldElementId(key: keyof FormState) {
    if (key === "feeRange") return `${uid}-fee`;
    if (key === "resumeUrl") return `${uid}-resume`;
    return `${uid}-${key}`;
  }

  function focusField(key: keyof FormState) {
    const element = document.getElementById(fieldElementId(key));
    element?.focus();
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function focusErrors(nextErrors: FormErrors) {
    const steps: { step: number; keys: (keyof FormState)[] }[] = [
      {
        step: 1,
        keys: [
          "fullName",
          "phone",
          "email",
          "city",
          "area",
          "qualification",
          "experience",
          "mode",
        ],
      },
      {
        step: 2,
        keys: [
          "classes",
          "subjects",
          "boards",
          "languages",
          "feeRange",
          "availability",
        ],
      },
      { step: 3, keys: ["resumeUrl", "consent"] },
    ];
    const target = steps.find((entry) =>
      entry.keys.some((key) => nextErrors[key]),
    );
    if (!target) return;
    const key = target.keys.find((entry) => nextErrors[entry]);
    if (!key) return;

    setStep(target.step);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => focusField(key));
    });
  }

  function goToStep(next: number) {
    setErrors({});
    setStep(next);
    requestAnimationFrame(() => {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function handleNext() {
    const nextErrors = validateStep(step, values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      focusErrors(nextErrors);
      return;
    }
    trackEvent("form_step_complete", {
      form: "tutor_registration",
      step,
    });
    goToStep(Math.min(3, step + 1));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const step1Errors = validateStep(1, values);
    const step2Errors = validateStep(2, values);
    const step3Errors = validateStep(3, values);
    const nextErrors = { ...step1Errors, ...step2Errors, ...step3Errors };

    setErrors(nextErrors);
    setServerMessage("");

    if (Object.keys(nextErrors).length > 0) {
      focusErrors(nextErrors);
      return;
    }

    setStatus("submitting");
    const botcheck = String(
      new FormData(event.currentTarget).get("botcheck") ?? "",
    );
    const result = await submitForm("tutor", {
      ...values,
      botcheck,
      page: window.location.pathname,
    });

    if (result.success) {
      setSubmittedName(values.fullName.trim().split(" ")[0]);
      setStatus("success");
      clearSavedApplication();
      trackEvent("tutor_application", { city: values.city });
      requestAnimationFrame(() => {
        cardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } else {
      const serverErrors = (result.errors ?? {}) as FormErrors;
      const mergedErrors = { ...nextErrors, ...serverErrors };
      setErrors(mergedErrors);
      setServerMessage(result.message);
      setStatus("error");
      focusErrors(mergedErrors);
    }
  }

  function resetForm() {
    setValues(initialState);
    setErrors({});
    setStep(1);
    setStatus("idle");
    setServerMessage("");
    clearSavedApplication();
  }

  if (status === "success") {
    return (
      <div
        ref={cardRef}
        className="scroll-mt-24 rounded-3xl bg-white p-6 text-left shadow-[0_30px_80px_-40px_rgba(6,21,48,0.35)] ring-1 ring-navy-100 sm:p-8"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h2 className="mt-5 text-2xl font-semibold">Application received</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {submittedName ? `Thank you, ${submittedName}. ` : "Thank you. "}
          Our team reviews tutor applications within 24–48 hours. If your
          profile matches a requirement in your area, we will call you for a
          short screening conversation.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <a href={siteConfig.tutorPhoneHref} className="btn-navy flex-1">
            <Phone className="h-4 w-4" />
            Call tutor team
          </a>
          <a
            href={`${siteConfig.emailHref}?subject=Tutor%20application`}
            className="btn-outline flex-1"
          >
            <Mail className="h-4 w-4" />
            Email your resume
          </a>
        </div>
        <button
          type="button"
          onClick={resetForm}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-navy-700 underline decoration-gold-400 underline-offset-4 hover:text-gold-600"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Submit another application
        </button>
      </div>
    );
  }

  const errorId = (key: keyof FormState) => `${uid}-${key}-error`;
  const describedBy = (key: keyof FormState) =>
    errors[key] ? errorId(key) : undefined;
  const selectedCity = cities.find((city) => city.name === values.city);

  return (
    <div
      ref={cardRef}
      className="scroll-mt-24 rounded-3xl bg-white p-5 text-left shadow-[0_30px_80px_-40px_rgba(6,21,48,0.35)] ring-1 ring-navy-100 sm:p-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[10px] font-extrabold tracking-[0.22em] text-gold-600 uppercase">
            Tutor application
          </p>
          <h2 className="mt-2 text-2xl leading-tight font-semibold sm:text-[1.7rem]">
            {step === 1
              ? "Tell us about yourself"
              : step === 2
                ? "Your teaching profile"
                : "Review and submit"}
          </h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
            {step === 1
              ? "We use these details only to contact you about tuition assignments."
              : step === 2
                ? "Select everything you are comfortable teaching."
                : "Check your details, add a resume link if you have one, and submit."}
          </p>
        </div>
        <span className="rounded-full bg-cream px-3 py-1 text-[11px] font-extrabold text-navy-800">
          Step {step} of 3
        </span>
      </div>

      <ol
        className="mt-5 grid grid-cols-3 gap-2"
        aria-label="Application progress"
      >
        {stepLabels.map((label, index) => {
          const number = index + 1;
          const complete = step > number;
          const active = step === number;
          return (
            <li
              key={label}
              className="min-w-0"
              aria-current={active ? "step" : undefined}
            >
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold",
                    complete
                      ? "bg-green-600 text-white"
                      : active
                        ? "bg-navy-900 text-gold-400"
                        : "bg-slate-100 text-slate-400",
                  )}
                >
                  {complete ? <Check className="h-3.5 w-3.5" /> : number}
                </span>
                <span
                  className={cn(
                    "truncate text-[11px] font-bold",
                    active
                      ? "text-navy-900"
                      : complete
                        ? "text-green-700"
                        : "text-slate-400",
                  )}
                >
                  {label}
                </span>
              </div>
              <div
                aria-hidden="true"
                className={cn(
                  "mt-2 h-1 rounded-full",
                  complete
                    ? "bg-green-600"
                    : active
                      ? "bg-gold-500"
                      : "bg-slate-100",
                )}
              />
            </li>
          );
        })}
      </ol>

      <form onSubmit={handleSubmit} noValidate className="mt-6">
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        {step === 1 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor={`${uid}-fullName`} className="field-label">
                Full name
                <RequiredMark />
              </label>
              <input
                id={`${uid}-fullName`}
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="As per your documents"
                value={values.fullName}
                onChange={(event) => update("fullName", event.target.value)}
                onBlur={() => handleBlur("fullName")}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={describedBy("fullName")}
                aria-required="true"
                required
                maxLength={FIELD_LIMITS.name}
                className={cn(
                  "field-input",
                  errors.fullName &&
                    "border-red-400 focus:border-red-500 focus:ring-red-500/20",
                )}
              />
              <FieldError
                id={errorId("fullName")}
                message={errors.fullName}
              />
            </div>

            <div>
              <label htmlFor={`${uid}-phone`} className="field-label">
                Mobile number
                <RequiredMark />
              </label>
              <input
                id={`${uid}-phone`}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="10-digit mobile"
                value={values.phone}
                onChange={(event) => update("phone", event.target.value)}
                onBlur={() => handleBlur("phone")}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={describedBy("phone")}
                aria-required="true"
                required
                className={cn(
                  "field-input",
                  errors.phone &&
                    "border-red-400 focus:border-red-500 focus:ring-red-500/20",
                )}
              />
              <FieldError id={errorId("phone")} message={errors.phone} />
            </div>

            <div>
              <label htmlFor={`${uid}-email`} className="field-label">
                Email
                <RequiredMark />
              </label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
                onBlur={() => handleBlur("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={describedBy("email")}
                aria-required="true"
                required
                maxLength={FIELD_LIMITS.email}
                className={cn(
                  "field-input",
                  errors.email &&
                    "border-red-400 focus:border-red-500 focus:ring-red-500/20",
                )}
              />
              <FieldError id={errorId("email")} message={errors.email} />
            </div>

            <div>
              <label htmlFor={`${uid}-city`} className="field-label">
                City
                <RequiredMark />
              </label>
              <SearchableSelect
                id={`${uid}-city`}
                value={values.city}
                onChange={updateCity}
                options={cityOptions}
                placeholder="Select city"
                searchLabel="Search cities"
                error={errors.city}
                describedBy={describedBy("city")}
                onBlur={() => handleBlur("city")}
                required
              />
              <FieldError id={errorId("city")} message={errors.city} />
            </div>

            <div>
              <label htmlFor={`${uid}-area`} className="field-label">
                Area / locality
                <RequiredMark />
              </label>
              <SearchableSelect
                id={`${uid}-area`}
                value={values.area}
                onChange={(area) => update("area", area)}
                options={selectedCity?.areas.map((area) => area.name) ?? []}
                placeholder={
                  selectedCity ? "Select area" : "Select city first"
                }
                searchLabel="Search areas"
                disabled={!selectedCity}
                error={errors.area}
                describedBy={describedBy("area")}
                onBlur={() => handleBlur("area")}
                required
              />
              <FieldError id={errorId("area")} message={errors.area} />
            </div>

            <div>
              <label htmlFor={`${uid}-qualification`} className="field-label">
                Highest qualification
                <RequiredMark />
              </label>
              <SearchableSelect
                id={`${uid}-qualification`}
                value={values.qualification}
                onChange={(qualification) =>
                  update("qualification", qualification)
                }
                options={tutorQualifications}
                placeholder="Select qualification"
                searchLabel="Search qualifications"
                error={errors.qualification}
                describedBy={describedBy("qualification")}
                onBlur={() => handleBlur("qualification")}
                required
              />
              <FieldError
                id={errorId("qualification")}
                message={errors.qualification}
              />
            </div>

            <div>
              <label htmlFor={`${uid}-experience`} className="field-label">
                Teaching experience
                <RequiredMark />
              </label>
              <SearchableSelect
                id={`${uid}-experience`}
                value={values.experience}
                onChange={(experience) => update("experience", experience)}
                options={tutorExperienceOptions}
                placeholder="Select experience"
                searchLabel="Search experience ranges"
                error={errors.experience}
                describedBy={describedBy("experience")}
                onBlur={() => handleBlur("experience")}
                required
              />
              <FieldError
                id={errorId("experience")}
                message={errors.experience}
              />
            </div>

            <div>
              <label htmlFor={`${uid}-mode`} className="field-label">
                Preferred teaching mode
                <RequiredMark />
              </label>
              <SearchableSelect
                id={`${uid}-mode`}
                value={values.mode}
                onChange={(mode) => update("mode", mode)}
                options={tutorModeOptions}
                placeholder="Select mode"
                searchLabel="Search teaching modes"
                error={errors.mode}
                describedBy={describedBy("mode")}
                onBlur={() => handleBlur("mode")}
                required
              />
              <FieldError id={errorId("mode")} message={errors.mode} />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-5">
            <ChipGroup
              id={`${uid}-classes`}
              legend="Classes you teach"
              options={classOptions}
              selected={values.classes}
              onToggle={(value) => toggle("classes", value)}
              error={errors.classes}
              required
            />

            <ChipGroup
              id={`${uid}-subjects`}
              legend="Subjects you teach"
              options={tutorSubjectChoices}
              selected={values.subjects}
              onToggle={(value) => toggle("subjects", value)}
              error={errors.subjects}
              required
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <ChipGroup
                id={`${uid}-boards`}
                legend="Boards you know"
                options={tutorBoardOptions}
                selected={values.boards}
                onToggle={(value) => toggle("boards", value)}
                error={errors.boards}
                required
              />

              <ChipGroup
                id={`${uid}-languages`}
                legend="Teaching languages"
                options={tutorLanguageOptions}
                selected={values.languages}
                onToggle={(value) => toggle("languages", value)}
                error={errors.languages}
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-fee`} className="field-label">
                  Expected fee range
                  <RequiredMark />
                </label>
                <SearchableSelect
                  id={`${uid}-fee`}
                  value={values.feeRange}
                  onChange={(feeRange) => update("feeRange", feeRange)}
                  options={tutorFeeOptions}
                  placeholder="Select fee range"
                  searchLabel="Search fee ranges"
                  error={errors.feeRange}
                  describedBy={describedBy("feeRange")}
                  onBlur={() => handleBlur("feeRange")}
                  required
                />
                <FieldError
                  id={errorId("feeRange")}
                  message={errors.feeRange}
                />
              </div>

              <ChipGroup
                id={`${uid}-availability`}
                legend="Availability"
                options={tutorAvailabilityOptions}
                selected={values.availability}
                onToggle={(value) => toggle("availability", value)}
                error={errors.availability}
                required
              />
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-cream/40 p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[11px] font-extrabold tracking-[0.14em] text-navy-800 uppercase">
                  Personal details
                </h3>
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="text-[11px] font-bold text-navy-700 underline decoration-gold-400 underline-offset-4 hover:text-gold-600"
                >
                  Edit
                </button>
              </div>
              <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                <SummaryRow label="Name" value={values.fullName} />
                <SummaryRow label="Mobile" value={values.phone} />
                <SummaryRow label="Email" value={values.email} />
                <SummaryRow
                  label="City and area"
                  value={`${values.city}${values.area ? ` — ${values.area}` : ""}`}
                />
                <SummaryRow
                  label="Qualification"
                  value={values.qualification}
                />
                <SummaryRow
                  label="Experience"
                  value={values.experience}
                />
                <SummaryRow label="Preferred mode" value={values.mode} />
              </dl>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-cream/40 p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[11px] font-extrabold tracking-[0.14em] text-navy-800 uppercase">
                  Teaching profile
                </h3>
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="text-[11px] font-bold text-navy-700 underline decoration-gold-400 underline-offset-4 hover:text-gold-600"
                >
                  Edit
                </button>
              </div>
              <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                <SummaryRow
                  label="Classes"
                  value={values.classes.join(", ")}
                />
                <SummaryRow
                  label="Subjects"
                  value={values.subjects.join(", ")}
                />
                <SummaryRow label="Boards" value={values.boards.join(", ")} />
                <SummaryRow
                  label="Languages"
                  value={values.languages.join(", ")}
                />
                <SummaryRow label="Fee range" value={values.feeRange} />
                <SummaryRow
                  label="Availability"
                  value={values.availability.join(", ")}
                />
              </dl>
            </div>

            <div>
              <label htmlFor={`${uid}-resume`} className="field-label">
                Resume or profile link{" "}
                <span className="font-semibold normal-case">(optional)</span>
              </label>
              <input
                id={`${uid}-resume`}
                name="resumeUrl"
                type="url"
                inputMode="url"
                placeholder="https://drive.google.com/..."
                value={values.resumeUrl}
                onChange={(event) =>
                  update("resumeUrl", event.target.value)
                }
                onBlur={() => handleBlur("resumeUrl")}
                aria-invalid={Boolean(errors.resumeUrl)}
                aria-describedby={describedBy("resumeUrl")}
                maxLength={FIELD_LIMITS.url}
                className={cn(
                  "field-input",
                  errors.resumeUrl && "border-red-400",
                )}
              />
              <FieldError
                id={errorId("resumeUrl")}
                message={errors.resumeUrl}
              />
              <p className="mt-1 text-[11px] leading-relaxed text-muted">
                Paste a Google Drive, LinkedIn or portfolio link. File uploads
                are not enabled yet.
              </p>
            </div>

            <ConsentCheckbox
              id={`${uid}-consent`}
              checked={values.consent}
              onChange={(checked) => update("consent", checked)}
              onBlur={() => handleBlur("consent")}
              error={errors.consent}
            >
              I confirm these details are accurate, agree to RBM Tuition
              contacting me about tuition assignments, and accept the{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-navy-800 underline decoration-gold-400 underline-offset-4"
              >
                privacy policy
              </Link>
              .
            </ConsentCheckbox>
          </div>
        ) : null}

        {status === "error" && serverMessage ? (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700"
          >
            {serverMessage} You can also call our tutor helpline on{" "}
            <a href={siteConfig.tutorPhoneHref} className="underline">
              {siteConfig.tutorPhone}
            </a>
            .
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => goToStep(step - 1)}
              className="btn-outline w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          ) : (
            <p className="text-[11px] leading-relaxed text-muted sm:max-w-[55%]">
              Takes about 3 minutes. Your progress is saved in this browser
              tab.
            </p>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-gold w-full sm:w-auto"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting application
                </>
              ) : (
                <>
                  Submit application
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
