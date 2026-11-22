"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Phone,
} from "lucide-react";
import { classOptions } from "@/data/courses";
import { cities, cityOptions } from "@/data/locations";
import { siteConfig } from "@/data/site";
import { subjectOptions } from "@/data/subjects";
import { trackEvent } from "@/lib/analytics";
import { submitForm } from "@/lib/formApi";
import {
  enquiryBoardOptions,
  enquiryBoardRequiredFor,
  enquiryModeOptions,
} from "@/lib/formOptions";
import {
  FIELD_LIMITS,
  normalizeName,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
} from "@/lib/validation";
import { cn } from "@/lib/utils";
import { ConsentCheckbox } from "@/components/forms/ConsentCheckbox";
import { RequiredMark } from "@/components/forms/RequiredMark";
import { SearchableSelect } from "@/components/forms/SearchableSelect";

type FormState = {
  name: string;
  phone: string;
  email: string;
  classLevel: string;
  board: string;
  city: string;
  area: string;
  subjects: string[];
  mode: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  classLevel: "",
  board: "",
  city: "",
  area: "",
  subjects: [],
  mode: "Home tuition",
  message: "",
  consent: false,
};

function validate(values: FormState, isFull: boolean): FormErrors {
  const errors: FormErrors = {};
  const selectedCity = cities.find((city) => city.name === values.city);

  const nameError = validateName(values.name);
  if (nameError) errors.name = nameError;

  const phoneError = validatePhone(values.phone);
  if (phoneError) errors.phone = phoneError;

  if (isFull && values.email) {
    const emailError = validateEmail(values.email);
    if (emailError) errors.email = emailError;
  }

  if (!values.classLevel) {
    errors.classLevel = "Select the class or exam.";
  }

  if (!selectedCity) {
    errors.city = "Select your city.";
  } else if (selectedCity.areas.length > 0 && !values.area) {
    errors.area = "Select your area or locality.";
  } else if (
    values.area &&
    !selectedCity.areas.some((area) => area.name === values.area)
  ) {
    errors.area = "Select a valid area for your city.";
  }

  if (enquiryBoardRequiredFor(values.classLevel) && !values.board) {
    errors.board = "Select your board.";
  } else if (
    values.board &&
    !enquiryBoardOptions.some((board) => board === values.board)
  ) {
    errors.board = "Select a valid board.";
  }

  if (!enquiryModeOptions.some((mode) => mode === values.mode)) {
    errors.mode = "Select a tuition mode.";
  }

  if (values.subjects.length === 0) {
    errors.subjects = "Select at least one subject or requirement.";
  }

  if (isFull && values.message) {
    const messageError = validateMessage(values.message);
    if (messageError) errors.message = messageError;
  }

  if (!values.consent) {
    errors.consent = "Please confirm before submitting your enquiry.";
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

export function EnquiryForm({
  variant = "compact",
  source = "Home",
  className,
}: {
  variant?: "compact" | "full";
  source?: string;
  className?: string;
}) {
  const uid = useId();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const isFull = variant === "full";
  const selectedCity = cities.find((city) => city.name === values.city);
  const areaOptions =
    selectedCity?.areas.map((area) => area.name) ?? [];
  const showBoard = isFull || enquiryBoardRequiredFor(values.classLevel);
  const boardRequired = enquiryBoardRequiredFor(values.classLevel);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function updateClass(classLevel: string) {
    const nextBoardRequired = enquiryBoardRequiredFor(classLevel);
    setValues((current) => ({
      ...current,
      classLevel,
      ...(isFull || nextBoardRequired ? {} : { board: "" }),
    }));
    setErrors((current) => ({
      ...current,
      classLevel: undefined,
      ...(nextBoardRequired ? {} : { board: undefined }),
    }));
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
    const nextErrors = validate(values, isFull);
    setErrors((current) => ({ ...current, [key]: nextErrors[key] }));
  }

  function focusFirstError(nextErrors: FormErrors) {
    const order: (keyof FormState)[] = [
      "name",
      "phone",
      "classLevel",
      "city",
    ];
    if (isFull) order.push("email");
    order.push("area");
    if (showBoard) order.push("board");
    if (isFull) order.push("mode");
    order.push("subjects");
    if (isFull) order.push("message");
    order.push("consent");

    const key = order.find((field) => nextErrors[field]);
    if (!key) return;

    window.requestAnimationFrame(() => {
      const element = document.getElementById(`${uid}-${key}`);
      element?.focus();
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values, isFull);
    setErrors(nextErrors);
    setServerMessage("");

    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }

    setStatus("submitting");
    const botcheck = String(
      new FormData(event.currentTarget).get("botcheck") ?? "",
    );
    const result = await submitForm("enquiry", {
      ...values,
      variant,
      source,
      consent: values.consent,
      botcheck,
      page: window.location.pathname,
    });

    if (result.success) {
      setSubmittedName(normalizeName(values.name).split(" ")[0]);
      setStatus("success");
      setValues(initialState);
      trackEvent("generate_lead", { form: "enquiry", source });
    } else {
      const serverErrors = (result.errors ?? {}) as FormErrors;
      const mergedErrors = { ...nextErrors, ...serverErrors };
      setErrors(mergedErrors);
      setServerMessage(result.message);
      setStatus("error");
      focusFirstError(mergedErrors);
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-3xl bg-white p-7 text-left shadow-[0_30px_80px_-40px_rgba(6,21,48,0.65)] ring-1 ring-white/50 sm:p-8",
          className,
        )}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold">
          {submittedName ? `Thank you, ${submittedName}.` : "Thank you."}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Your request has reached our team. We are available 24 hours a day,
          7 days a week and usually call back within 30 minutes. We arrange a
          free demo class within 24–48 hours.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <a href={siteConfig.phoneHref} className="btn-navy flex-1">
            <Phone className="h-4 w-4" />
            Call now
          </a>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex-1"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs font-bold text-navy-700 underline decoration-gold-400 underline-offset-4 hover:text-gold-600"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const errorId = (key: keyof FormState) => `${uid}-${key}-error`;
  const describedBy = (key: keyof FormState) =>
    errors[key] ? errorId(key) : undefined;

  const areaField = (
    <div>
      <label htmlFor={`${uid}-area`} className="field-label">
        Area / locality
        <RequiredMark />
      </label>
      <SearchableSelect
        id={`${uid}-area`}
        value={values.area}
        onChange={(area) => update("area", area)}
        options={areaOptions}
        placeholder={selectedCity ? "Select area" : "Select city first"}
        searchLabel="Search areas"
        disabled={!selectedCity || areaOptions.length === 0}
        error={errors.area}
        describedBy={describedBy("area")}
        onBlur={() => handleBlur("area")}
        required
      />
      <FieldError id={errorId("area")} message={errors.area} />
    </div>
  );

  return (
    <div
      className={cn(
        "rounded-3xl bg-white p-6 text-left shadow-[0_30px_80px_-40px_rgba(6,21,48,0.65)] ring-1 ring-white/50 sm:p-7",
        className,
      )}
    >
      <p className="text-[10px] font-extrabold tracking-[0.22em] text-gold-600 uppercase">
        Free demo class
      </p>
      <h3 className="mt-2 text-2xl leading-tight font-semibold sm:text-[1.7rem]">
        Find the right tutor for your child
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
        Tell us what you need. We are available 24 hours a day, 7 days a week
        and usually call back within 30 minutes.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-3.5">
        <p className="text-[11px] font-semibold text-muted">
          <span aria-hidden="true" className="text-red-600">
            *
          </span>{" "}
          Required fields
        </p>

        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

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
              placeholder="Parent or student name"
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              onBlur={() => handleBlur("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy("name")}
              aria-required="true"
              required
              maxLength={FIELD_LIMITS.name}
              className={cn(
                "field-input",
                errors.name &&
                  "border-red-400 focus:border-red-500 focus:ring-red-500/20",
              )}
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
              className={cn(
                "field-input",
                errors.phone &&
                  "border-red-400 focus:border-red-500 focus:ring-red-500/20",
              )}
            />
            <FieldError id={errorId("phone")} message={errors.phone} />
          </div>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${uid}-classLevel`} className="field-label">
              Class / exam
              <RequiredMark />
            </label>
            <SearchableSelect
              id={`${uid}-classLevel`}
              value={values.classLevel}
              onChange={updateClass}
              options={classOptions}
              placeholder="Select class"
              searchLabel="Search classes and exams"
              error={errors.classLevel}
              describedBy={describedBy("classLevel")}
              onBlur={() => handleBlur("classLevel")}
              required
            />
            <FieldError
              id={errorId("classLevel")}
              message={errors.classLevel}
            />
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
        </div>

        {!isFull ? areaField : null}

        {isFull ? (
          <>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-email`} className="field-label">
                  Email{" "}
                  <span className="font-semibold normal-case">(optional)</span>
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
                  maxLength={FIELD_LIMITS.email}
                  className={cn(
                    "field-input",
                    errors.email && "border-red-400",
                  )}
                />
                <FieldError id={errorId("email")} message={errors.email} />
              </div>

              {areaField}
            </div>
          </>
        ) : null}

        {showBoard ? (
          <div className={isFull ? "grid gap-3.5 sm:grid-cols-2" : ""}>
            <div>
              <label htmlFor={`${uid}-board`} className="field-label">
                Board{" "}
                {boardRequired ? (
                  <RequiredMark />
                ) : (
                  <span className="font-semibold normal-case">(optional)</span>
                )}
              </label>
              <SearchableSelect
                id={`${uid}-board`}
                value={values.board}
                onChange={(board) => update("board", board)}
                options={enquiryBoardOptions}
                placeholder="Select board"
                searchLabel="Search boards"
                error={errors.board}
                describedBy={describedBy("board")}
                onBlur={() => handleBlur("board")}
                required={boardRequired}
              />
              <FieldError id={errorId("board")} message={errors.board} />
            </div>

            {isFull ? (
              <div>
                <label htmlFor={`${uid}-mode`} className="field-label">
                  Tuition mode
                </label>
                <SearchableSelect
                  id={`${uid}-mode`}
                  value={values.mode}
                  onChange={(mode) => update("mode", mode)}
                  options={enquiryModeOptions}
                  placeholder="Select mode"
                  searchLabel="Search tuition modes"
                  error={errors.mode}
                  describedBy={describedBy("mode")}
                  onBlur={() => handleBlur("mode")}
                />
                <FieldError id={errorId("mode")} message={errors.mode} />
              </div>
            ) : null}
          </div>
        ) : null}

        <div>
          <label htmlFor={`${uid}-subjects`} className="field-label">
            Subjects / requirements
            <RequiredMark />
          </label>
          <SearchableSelect
            id={`${uid}-subjects`}
            value={values.subjects}
            onChange={(subjects) => update("subjects", subjects)}
            options={subjectOptions}
            placeholder="Select one or more subjects"
            searchLabel="Search subjects"
            error={errors.subjects}
            describedBy={describedBy("subjects")}
            onBlur={() => handleBlur("subjects")}
            multiple
            required
          />
          <FieldError id={errorId("subjects")} message={errors.subjects} />
        </div>

        {isFull ? (
          <div>
            <label htmlFor={`${uid}-message`} className="field-label">
              Message{" "}
              <span className="font-semibold normal-case">(optional)</span>
            </label>
            <textarea
              id={`${uid}-message`}
              name="message"
              rows={3}
              placeholder="Preferred timings, school, or anything we should know"
              value={values.message}
              onChange={(event) => update("message", event.target.value)}
              onBlur={() => handleBlur("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describedBy("message")}
              maxLength={FIELD_LIMITS.message}
              className={cn(
                "field-input h-auto py-2.5",
                errors.message && "border-red-400",
              )}
            />
            <FieldError id={errorId("message")} message={errors.message} />
          </div>
        ) : null}

        <ConsentCheckbox
          id={`${uid}-consent`}
          checked={values.consent}
          onChange={(consent) => update("consent", consent)}
          onBlur={() => handleBlur("consent")}
          error={errors.consent}
        >
          I agree to be contacted about my tuition requirement and accept the{" "}
          <Link
            href="/privacy-policy"
            className="font-semibold text-navy-800 underline decoration-gold-400 underline-offset-2 hover:text-gold-700"
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
            {serverMessage} You can also call{" "}
            <a href={siteConfig.phoneHref} className="underline">
              {siteConfig.phone}
            </a>
            .
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending request
            </>
          ) : (
            <>
              {isFull ? "Send enquiry" : "Request a free demo"}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        <p className="text-center text-[11px] leading-relaxed text-muted">
          100% free, no obligation.
        </p>

        <div className="flex items-center justify-center gap-4 border-t border-slate-100 pt-3.5 text-xs font-bold">
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center gap-1.5 text-navy-900 hover:text-gold-600"
          >
            <Phone className="h-3.5 w-3.5" />
            {siteConfig.phone}
          </a>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-navy-900 hover:text-gold-600"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>
      </form>
    </div>
  );
}
