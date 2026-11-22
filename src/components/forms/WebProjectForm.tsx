"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  webContact,
  webPackageOptions,
  webProjectTypes,
} from "@/data/webSolutions";
import { getAttribution, getAttributionFields } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";
import { submitForm } from "@/lib/formApi";
import { currentWebsiteRequiredFor } from "@/lib/formOptions";
import {
  FIELD_LIMITS,
  validateBusiness,
  validateEmail,
  validateName,
  validatePhone,
  validateWebsite,
} from "@/lib/validation";
import { cn } from "@/lib/utils";
import { ConsentCheckbox } from "@/components/forms/ConsentCheckbox";
import { RequiredMark } from "@/components/forms/RequiredMark";
import { SearchableSelect } from "@/components/forms/SearchableSelect";

type FormState = {
  name: string;
  phone: string;
  email: string;
  business: string;
  website: string;
  projectType: string;
  packageInterest: string;
  details: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type FormStep = "project" | "contact";

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  business: "",
  website: "",
  projectType: "",
  packageInterest: "Not sure yet",
  details: "",
  consent: false,
};

const fieldClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-ink transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none";

const projectFields = [
  "projectType",
  "packageInterest",
  "details",
] as const;
const contactFields = [
  "name",
  "phone",
  "email",
  "business",
  "website",
  "consent",
] as const;

function validate(step: FormStep, values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (step === "project") {
    if (!webProjectTypes.some((option) => option === values.projectType)) {
      errors.projectType = "Select the type of project.";
    }
    if (
      !webPackageOptions.some((option) => option === values.packageInterest)
    ) {
      errors.packageInterest = "Select a valid package interest.";
    }

    const details = values.details.trim();
    if (details.length < 20) {
      errors.details = "Add at least 20 characters about your project.";
    } else if (details.length > FIELD_LIMITS.message) {
      errors.details = `Keep the details under ${FIELD_LIMITS.message} characters.`;
    }
  } else {
    const nameError = validateName(values.name);
    if (nameError) errors.name = nameError;

    const phoneError = validatePhone(values.phone);
    if (phoneError) errors.phone = phoneError;

    const emailError = validateEmail(values.email, true);
    if (emailError) errors.email = emailError;

    const businessError = validateBusiness(values.business);
    if (businessError) errors.business = businessError;

    const websiteError = validateWebsite(
      values.website,
      currentWebsiteRequiredFor(values.projectType),
    );
    if (websiteError) errors.website = websiteError;

    if (!values.consent) {
      errors.consent = "Please confirm before submitting your request.";
    }
  }

  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-[11px] font-semibold text-red-600">
      {message}
    </p>
  );
}

export function WebProjectForm({ className }: { className?: string }) {
  const uid = useId();
  const pathname = usePathname();
  const startedRef = useRef(false);
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [reviewRequested, setReviewRequested] = useState(false);
  const [step, setStep] = useState<FormStep>("project");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  useEffect(() => {
    try {
      const storedPackage = window.sessionStorage.getItem(
        "rbm-web-package-prefill",
      );
      if (storedPackage) {
        window.sessionStorage.removeItem("rbm-web-package-prefill");
        if (webPackageOptions.includes(storedPackage)) {
          window.requestAnimationFrame(() => {
            setValues((current) => ({
              ...current,
              packageInterest: storedPackage,
            }));
          });
        }
      }
    } catch {}

    function handlePackagePrefill(event: Event) {
      const packageOption = (event as CustomEvent<string>).detail;
      if (!webPackageOptions.includes(packageOption)) return;
      setValues((current) => ({
        ...current,
        packageInterest: packageOption,
      }));
      setErrors((current) => ({
        ...current,
        packageInterest: undefined,
      }));
      setStep("project");
    }

    window.addEventListener("rbm:package-prefill", handlePackagePrefill);
    return () => {
      window.removeEventListener("rbm:package-prefill", handlePackagePrefill);
    };
  }, []);

  function focusField(field: keyof FormState, targetStep?: FormStep) {
    if (targetStep) setStep(targetStep);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const element = document.getElementById(`${uid}-${field}`);
        element?.focus();
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }

  function focusFirstError(nextErrors: FormErrors) {
    const projectKey = projectFields.find((field) => nextErrors[field]);
    if (projectKey) {
      focusField(projectKey, "project");
      return;
    }
    const contactKey = contactFields.find((field) => nextErrors[field]);
    if (contactKey) {
      focusField(contactKey, "contact");
    }
  }

  function trackFormStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("web_form_start", {
      form: "web-project",
      page_path: pathname,
    });
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    trackFormStart();
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  function handleBlur(key: keyof FormState) {
    const nextErrors = validate(step, values);
    setErrors((current) => ({ ...current, [key]: nextErrors[key] }));
  }

  function goToContact() {
    trackFormStart();
    const nextErrors = validate("project", values);
    setErrors(nextErrors);
    setServerMessage("");

    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }

    trackEvent("web_form_step_complete", {
      form: "web-project",
      step: 1,
      project_type: values.projectType,
      package: values.packageInterest,
      page_path: pathname,
    });
    setStep("contact");
    focusField("name");
  }

  function goBack() {
    setServerMessage("");
    setStep("project");
    focusField("projectType");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step === "project") {
      goToContact();
      return;
    }

    const projectErrors = validate("project", values);
    const contactErrors = validate("contact", values);
    const nextErrors = { ...projectErrors, ...contactErrors };
    setErrors(nextErrors);
    setServerMessage("");

    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }

    setStatus("submitting");

    const attribution = getAttribution();
    const botcheck = String(
      new FormData(event.currentTarget).get("botcheck") ?? "",
    );
    const result = await submitForm("web", {
      ...values,
      reviewRequested,
      attribution: getAttributionFields(),
      botcheck,
      page: pathname,
    });

    if (result.success) {
      setSubmittedName(values.name.trim().split(" ")[0]);
      setStatus("success");
      setValues(initialState);
      setStep("project");
      trackEvent("generate_lead", {
        form: "web-project",
        source: pathname.startsWith("/web-solutions/")
          ? "Web Solutions niche page"
          : "Web Solutions page",
        package: values.packageInterest,
        project_type: values.projectType,
        review_requested: reviewRequested,
        utm_source: attribution?.utmSource ?? "",
        utm_medium: attribution?.utmMedium ?? "",
        utm_campaign: attribution?.utmCampaign ?? "",
        landing_page: attribution?.landingPath ?? pathname,
      });
    } else {
      const serverErrors = (result.errors ?? {}) as FormErrors;
      setErrors({ ...nextErrors, ...serverErrors });
      setServerMessage(result.message);
      setStatus("error");
      focusFirstError(serverErrors);
      trackEvent("web_form_error", {
        form: "web-project",
        page_path: pathname,
      });
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-3xl bg-white p-7 text-left shadow-[0_30px_80px_-45px_rgba(6,21,48,0.55)] ring-1 ring-teal-100 sm:p-8",
          className,
        )}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold">
          {submittedName ? `Thank you, ${submittedName}.` : "Thank you."}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {reviewRequested
            ? "We have your project details and the free website review request. We reply within 24 hours, any day of the week, with the next step."
            : "We have your project details. We reply within 24 hours, any day of the week. For anything urgent, call or WhatsApp us."}
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <a
            href={webContact.phoneHref}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-navy-200 bg-white px-5 py-2.5 text-sm font-bold text-navy-900 transition hover:border-navy-900 hover:bg-navy-50"
          >
            <Phone className="h-4 w-4" />
            Call now
          </a>
          <a
            href={webContact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-bold text-navy-950 transition hover:bg-teal-400"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setReviewRequested(false);
          }}
          className="mt-4 text-xs font-bold text-navy-700 underline decoration-teal-400 underline-offset-4 hover:text-teal-700"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const errorId = (key: keyof FormState) => `${uid}-${key}-error`;
  const describedBy = (key: keyof FormState) =>
    errors[key] ? errorId(key) : undefined;
  const websiteRequired = currentWebsiteRequiredFor(values.projectType);

  return (
    <div
      className={cn(
        "rounded-3xl bg-white p-6 text-left shadow-[0_30px_80px_-45px_rgba(6,21,48,0.55)] ring-1 ring-teal-100 sm:p-7",
        className,
      )}
    >
      <p className="text-[10px] font-extrabold tracking-[0.22em] text-teal-700 uppercase">
        Free quote
      </p>
      <h3 className="mt-2 text-2xl leading-tight font-semibold sm:text-[1.7rem]">
        Tell us about your project
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
        Two quick steps. We reply within one business day with the next step and
        a fixed quote.
      </p>

      <p className="sr-only" aria-live="polite">
        Step {step === "project" ? 1 : 2} of 2:{" "}
        {step === "project" ? "project details" : "your contact details"}.
      </p>
      <div className="mt-5 flex items-center gap-2" aria-hidden="true">
        <div
          className={cn(
            "flex items-center gap-2",
            step === "project" ? "text-navy-900" : "text-slate-500",
          )}
        >
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-extrabold",
              step === "project"
                ? "bg-teal-500 text-navy-950"
                : "bg-teal-100 text-teal-700",
            )}
          >
            1
          </span>
          <span className="text-[10px] font-extrabold tracking-[0.14em] uppercase">
            Project
          </span>
        </div>
        <span
          className={cn(
            "h-px flex-1",
            step === "contact" ? "bg-teal-300" : "bg-slate-200",
          )}
        />
        <div
          className={cn(
            "flex items-center gap-2",
            step === "contact" ? "text-navy-900" : "text-slate-500",
          )}
        >
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-extrabold",
              step === "contact"
                ? "bg-teal-500 text-navy-950"
                : "bg-slate-100 text-slate-500",
            )}
          >
            2
          </span>
          <span className="text-[10px] font-extrabold tracking-[0.14em] uppercase">
            Contact
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3.5">
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        {step === "project" ? (
          <>
            <div>
              <label htmlFor={`${uid}-projectType`} className="field-label">
                Project type
                <RequiredMark />
              </label>
              <SearchableSelect
                id={`${uid}-projectType`}
                value={values.projectType}
                onChange={(projectType) => update("projectType", projectType)}
                options={webProjectTypes}
                placeholder="Select project type"
                searchLabel="Search project types"
                error={errors.projectType}
                describedBy={describedBy("projectType")}
                onBlur={() => handleBlur("projectType")}
                theme="teal"
                required
              />
              <FieldError
                id={errorId("projectType")}
                message={errors.projectType}
              />
            </div>

            <div>
              <label
                htmlFor={`${uid}-packageInterest`}
                className="field-label"
              >
                Package interest{" "}
                <span className="font-semibold normal-case">(optional)</span>
              </label>
              <SearchableSelect
                id={`${uid}-packageInterest`}
                value={values.packageInterest}
                onChange={(packageInterest) =>
                  update("packageInterest", packageInterest)
                }
                options={webPackageOptions}
                placeholder="Select package"
                searchLabel="Search packages"
                error={errors.packageInterest}
                describedBy={describedBy("packageInterest")}
                onBlur={() => handleBlur("packageInterest")}
                theme="teal"
              />
              <FieldError
                id={errorId("packageInterest")}
                message={errors.packageInterest}
              />
            </div>

            <div>
              <label htmlFor={`${uid}-details`} className="field-label">
                Project details
                <RequiredMark />
              </label>
              <textarea
                id={`${uid}-details`}
                name="details"
                rows={4}
                placeholder="What should the site do? Any pages, features or deadline in mind?"
                value={values.details}
                onChange={(event) => update("details", event.target.value)}
                onBlur={() => handleBlur("details")}
                aria-invalid={Boolean(errors.details)}
                aria-describedby={describedBy("details")}
                aria-required="true"
                required
                minLength={20}
                maxLength={FIELD_LIMITS.message}
                className={cn(
                  "field-input h-auto py-2.5 focus:border-teal-500 focus:ring-teal-500/20",
                  errors.details && "border-red-400",
                )}
              />
              <FieldError id={errorId("details")} message={errors.details} />
            </div>

            <label
              htmlFor={`${uid}-review`}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-teal-100 bg-teal-50/60 p-3.5"
            >
              <input
                id={`${uid}-review`}
                name="reviewRequested"
                type="checkbox"
                checked={reviewRequested}
                onChange={(event) => {
                  trackFormStart();
                  setReviewRequested(event.target.checked);
                }}
                aria-describedby={`${uid}-review-help`}
                className="mt-0.5 h-4 w-4 shrink-0 accent-teal-600"
              />
              <span>
                <span className="block text-xs font-bold text-navy-900">
                  Add a free 20-minute website review
                </span>
                <span
                  id={`${uid}-review-help`}
                  className="mt-0.5 block text-[11px] leading-relaxed text-muted"
                >
                  We will look at your current site or plan and share practical
                  fixes. No obligation.
                </span>
              </span>
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-bold text-navy-950 transition hover:bg-teal-400"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-center text-[11px] leading-relaxed text-muted">
              Next: your name and contact details. It takes less than a minute.
            </p>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-3 rounded-xl border border-teal-100 bg-teal-50/60 px-3.5 py-3">
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold tracking-[0.16em] text-teal-700 uppercase">
                  Your project
                </p>
                <p className="mt-1 text-sm font-bold break-words text-navy-900">
                  {values.projectType}
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                  {values.packageInterest}
                </p>
              </div>
              <button
                type="button"
                onClick={goBack}
                disabled={status === "submitting"}
                className="shrink-0 text-xs font-bold text-teal-700 underline decoration-teal-400 underline-offset-4 hover:text-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Edit
              </button>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-name`} className="field-label">
                  Your name
                  <RequiredMark />
                </label>
                <input
                  id={`${uid}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={values.name}
                  onChange={(event) => update("name", event.target.value)}
                  onBlur={() => handleBlur("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={describedBy("name")}
                  aria-required="true"
                  required
                  maxLength={FIELD_LIMITS.name}
                  className={cn(fieldClass, errors.name && "border-red-400")}
                />
                <FieldError id={errorId("name")} message={errors.name} />
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
                  className={cn(fieldClass, errors.phone && "border-red-400")}
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
                  className={cn(fieldClass, errors.email && "border-red-400")}
                />
                <FieldError id={errorId("email")} message={errors.email} />
              </div>

              <div>
                <label htmlFor={`${uid}-business`} className="field-label">
                  Business / institute
                  <RequiredMark />
                </label>
                <input
                  id={`${uid}-business`}
                  name="business"
                  type="text"
                  autoComplete="organization"
                  placeholder="Business or coaching centre name"
                  value={values.business}
                  onChange={(event) => update("business", event.target.value)}
                  onBlur={() => handleBlur("business")}
                  aria-invalid={Boolean(errors.business)}
                  aria-describedby={describedBy("business")}
                  aria-required="true"
                  required
                  maxLength={FIELD_LIMITS.business}
                  className={cn(
                    fieldClass,
                    errors.business && "border-red-400",
                  )}
                />
                <FieldError id={errorId("business")} message={errors.business} />
              </div>
            </div>

            <div>
              <label htmlFor={`${uid}-website`} className="field-label">
                Current website
                {websiteRequired ? <RequiredMark /> : null}
                <span className="font-semibold normal-case">
                  {websiteRequired ? "" : " (optional)"}
                </span>
              </label>
              <input
                id={`${uid}-website`}
                name="website"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="yourwebsite.com"
                value={values.website}
                onChange={(event) => update("website", event.target.value)}
                onBlur={() => handleBlur("website")}
                aria-invalid={Boolean(errors.website)}
                aria-describedby={describedBy("website")}
                aria-required={websiteRequired}
                required={websiteRequired}
                maxLength={FIELD_LIMITS.url}
                className={cn(fieldClass, errors.website && "border-red-400")}
              />
              <FieldError id={errorId("website")} message={errors.website} />
            </div>

            <ConsentCheckbox
              id={`${uid}-consent`}
              checked={values.consent}
              onChange={(consent) => update("consent", consent)}
              onBlur={() => handleBlur("consent")}
              error={errors.consent}
            >
              I agree to be contacted about this project and accept the{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-navy-900 underline decoration-teal-400 underline-offset-4"
              >
                privacy policy
              </Link>
              .
            </ConsentCheckbox>

            {status === "error" && serverMessage ? (
              <p
                role="alert"
                className="rounded-xl bg-red-50 px-3.5 py-3 text-xs font-semibold text-red-700"
              >
                {serverMessage}{" "}
                <a href={webContact.phoneHref} className="underline">
                  Call {webContact.phone}
                </a>{" "}
                or{" "}
                <a
                  href={webContact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  message us on WhatsApp
                </a>
                .
              </p>
            ) : null}

            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <button
                type="button"
                onClick={goBack}
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-navy-900 transition hover:border-navy-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-bold text-navy-950 transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending request
                  </>
                ) : (
                  <>
                    Request my quote
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </>
        )}

        {step === "contact" ? (
          <p className="text-center text-[11px] leading-relaxed text-muted">
            We reply within 24 hours, any day of the week. Your details are only
            used to discuss this project.
          </p>
        ) : null}

        <div className="border-t border-slate-100 pt-3.5 text-center">
          <p className="text-[11px] leading-relaxed text-muted">
            Prefer to talk it through? Call or WhatsApp for a free 20-minute
            intro.
          </p>
          <div className="mt-2 flex items-center justify-center gap-4 text-xs font-bold">
            <a
              href={webContact.phoneHref}
              className="inline-flex items-center gap-1.5 text-navy-900 hover:text-teal-700"
            >
              <Phone className="h-3.5 w-3.5" />
              {webContact.phone}
            </a>
            <a
              href={webContact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-navy-900 hover:text-teal-700"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
