import { classOptions } from "@/data/courses";
import { cities } from "@/data/locations";
import { subjectOptions } from "@/data/subjects";
import { webPackageOptions, webProjectTypes } from "@/data/webSolutions";
import {
  enquiryBoardOptions,
  enquiryBoardRequiredFor,
  enquiryModeOptions,
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
  normalizeHttpUrl,
  normalizeName,
  normalizePhone,
  validateBusiness,
  validateEmail,
  validateMessage,
  validateName,
  validateOptionalResume,
  validatePhone,
  validateWebsite,
} from "@/lib/validation";

export type FormType = "enquiry" | "tutor" | "web";

type Body = Record<string, unknown>;

export type PayloadBuild = {
  errors: Record<string, string>;
  payload: Record<string, string> | null;
};

const attributionKeys = [
  "UTM source",
  "UTM medium",
  "UTM campaign",
  "UTM content",
  "UTM term",
  "Google click ID",
  "Meta click ID",
  "Referrer",
  "Landing page",
] as const;

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

function list(value: unknown) {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Set(
      value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

function boolean(value: unknown) {
  return value === true || value === "true";
}

function isOption<T extends string>(
  options: readonly T[],
  value: string,
): value is T {
  return options.some((option) => option === value);
}

function areOptions<T extends string>(
  options: readonly T[],
  values: string[],
) {
  return values.every((value) => isOption(options, value));
}

function pagePath(value: unknown, fallback: string) {
  const page = text(value).trim();
  if (!page.startsWith("/") || page.length > FIELD_LIMITS.page) {
    return fallback;
  }
  return page;
}

function sourceLabel(value: unknown, fallback: string) {
  const source = text(value)
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, FIELD_LIMITS.source);
  return source || fallback;
}

function addAttribution(payload: Record<string, string>, value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return;
  const attribution = value as Record<string, unknown>;

  for (const key of attributionKeys) {
    const entry = attribution[key];
    if (typeof entry === "string" && entry.trim()) {
      payload[key] = entry.trim().slice(0, FIELD_LIMITS.url);
    }
  }
}

export function buildEnquiryPayload(body: Body): PayloadBuild {
  const errors: Record<string, string> = {};
  const variant = text(body.variant) === "full" ? "full" : "compact";
  const name = normalizeName(text(body.name));
  const phone = text(body.phone).trim();
  const email = variant === "full" ? text(body.email).trim() : "";
  const classLevel = text(body.classLevel).trim();
  const board = text(body.board).trim();
  const selectedCity = cities.find(
    (city) => city.name === text(body.city).trim(),
  );
  const city = selectedCity?.name ?? "";
  const area = text(body.area).trim();
  const subjects = list(body.subjects);
  const legacyRequirement = text(body.requirement).trim();
  if (subjects.length === 0 && legacyRequirement) {
    subjects.push(legacyRequirement);
  }
  const mode = text(body.mode).trim() || "Home tuition";
  const message = variant === "full" ? text(body.message).trim() : "";

  const nameError = validateName(name);
  if (nameError) errors.name = nameError;

  const phoneError = validatePhone(phone);
  if (phoneError) errors.phone = phoneError;

  if (email) {
    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;
  }

  if (!isOption(classOptions, classLevel)) {
    errors.classLevel = "Select the class or exam.";
  }

  if (!selectedCity) {
    errors.city = "Select your city.";
  } else if (selectedCity.areas.length > 0 && !area) {
    errors.area = "Select your area or locality.";
  } else if (
    area &&
    !selectedCity.areas.some((entry) => entry.name === area)
  ) {
    errors.area = "Select a valid area for your city.";
  }

  if (enquiryBoardRequiredFor(classLevel) && !board) {
    errors.board = "Select your board.";
  } else if (board && !isOption(enquiryBoardOptions, board)) {
    errors.board = "Select a valid board.";
  }

  if (!isOption(enquiryModeOptions, mode)) {
    errors.mode = "Select a tuition mode.";
  }

  if (subjects.length === 0) {
    errors.subjects = "Select at least one subject or requirement.";
  } else if (!areOptions(subjectOptions, subjects)) {
    errors.subjects = "Select valid subjects from the list.";
  }

  if (message) {
    const messageError = validateMessage(message);
    if (messageError) errors.message = messageError;
  }

  if (!boolean(body.consent)) {
    errors.consent = "Please confirm before submitting your enquiry.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, payload: null };
  }

  const source = sourceLabel(body.source, "Home");
  const payload: Record<string, string> = {
    subject: `New tuition enquiry — ${classLevel} — ${city}`,
    from_name: "RBM Tuition Website",
    name,
    phone: normalizePhone(phone),
    "Phone as entered": phone,
    "Student class": classLevel,
    Board: board || "Not specified",
    City: city,
    Area: area || "Not specified",
    Subject: subjects.join(", "),
    "Subject count": String(subjects.length),
    Mode: mode,
    Consent: "Yes",
    Source: `Website — ${source} form`,
    Page: pagePath(body.page, "/"),
  };

  if (email) {
    payload["Contact email"] = email;
    payload.replyto = email;
  }
  if (message) {
    payload.message = message;
  }

  return { errors, payload };
}

export function buildTutorPayload(body: Body): PayloadBuild {
  const errors: Record<string, string> = {};
  const fullName = normalizeName(text(body.fullName));
  const phone = text(body.phone).trim();
  const email = text(body.email).trim();
  const selectedCity = cities.find(
    (city) => city.name === text(body.city).trim(),
  );
  const city = selectedCity?.name ?? "";
  const area = text(body.area).trim();
  const qualification = text(body.qualification).trim();
  const experience = text(body.experience).trim();
  const mode = text(body.mode).trim();
  const classes = list(body.classes);
  const subjects = list(body.subjects);
  const boards = list(body.boards);
  const languages = list(body.languages);
  const feeRange = text(body.feeRange).trim();
  const availability = list(body.availability);
  const resumeUrl = text(body.resumeUrl).trim();

  const nameError = validateName(fullName);
  if (nameError) errors.fullName = nameError;

  const phoneError = validatePhone(phone);
  if (phoneError) errors.phone = phoneError;

  const emailError = validateEmail(email, true);
  if (emailError) errors.email = emailError;

  if (!selectedCity) {
    errors.city = "Select your city.";
  } else if (!area) {
    errors.area = "Select your area or locality.";
  } else if (!selectedCity.areas.some((entry) => entry.name === area)) {
    errors.area = "Select a valid area for your city.";
  }

  if (!isOption(tutorQualifications, qualification)) {
    errors.qualification = "Select your highest qualification.";
  }
  if (!isOption(tutorExperienceOptions, experience)) {
    errors.experience = "Select your teaching experience.";
  }
  if (!isOption(tutorModeOptions, mode)) {
    errors.mode = "Select your preferred teaching mode.";
  }
  if (classes.length === 0 || !areOptions(classOptions, classes)) {
    errors.classes = "Select at least one valid class.";
  }
  if (subjects.length === 0 || !areOptions(tutorSubjectChoices, subjects)) {
    errors.subjects = "Select at least one valid subject.";
  }
  if (boards.length === 0 || !areOptions(tutorBoardOptions, boards)) {
    errors.boards = "Select at least one valid board.";
  }
  if (
    languages.length === 0 ||
    !areOptions(tutorLanguageOptions, languages)
  ) {
    errors.languages = "Select at least one valid language.";
  }
  if (!isOption(tutorFeeOptions, feeRange)) {
    errors.feeRange = "Select your expected fee range.";
  }
  if (
    availability.length === 0 ||
    !areOptions(tutorAvailabilityOptions, availability)
  ) {
    errors.availability = "Select at least one availability slot.";
  }

  const resumeError = validateOptionalResume(resumeUrl);
  if (resumeError) errors.resumeUrl = resumeError;

  if (!boolean(body.consent)) {
    errors.consent = "Please confirm before submitting your application.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, payload: null };
  }

  const normalizedResume = resumeUrl
    ? normalizeHttpUrl(resumeUrl, false) ?? ""
    : "";

  return {
    errors,
    payload: {
      subject: `New Tutor Application — ${fullName} — ${city}`,
      from_name: "RBM Tuition Website",
      name: fullName,
      email,
      replyto: email,
      phone: normalizePhone(phone),
      "Phone as entered": phone,
      City: city,
      "Area / locality": area,
      "Highest qualification": qualification,
      "Teaching experience": experience,
      "Preferred mode": mode,
      "Classes taught": classes.join(", "),
      "Subjects taught": subjects.join(", "),
      Boards: boards.join(", "),
      Languages: languages.join(", "),
      "Expected fee range": feeRange,
      Availability: availability.join(", "),
      "Resume link": normalizedResume || "Not provided",
      Consent: "Yes",
      Source: "Website — Tutor registration",
      Page: pagePath(body.page, "/tutor-registration"),
    },
  };
}

export function buildWebPayload(body: Body): PayloadBuild {
  const errors: Record<string, string> = {};
  const name = normalizeName(text(body.name));
  const phone = text(body.phone).trim();
  const email = text(body.email).trim();
  const business = text(body.business).trim();
  const website = text(body.website).trim();
  const projectType = text(body.projectType).trim();
  const packageInterest =
    text(body.packageInterest).trim() || "Not sure yet";
  const details = text(body.details).trim();

  const nameError = validateName(name);
  if (nameError) errors.name = nameError;

  const phoneError = validatePhone(phone);
  if (phoneError) errors.phone = phoneError;

  const emailError = validateEmail(email, true);
  if (emailError) errors.email = emailError;

  const businessError = validateBusiness(business);
  if (businessError) errors.business = businessError;

  if (!isOption(webProjectTypes, projectType)) {
    errors.projectType = "Select the type of project.";
  }

  if (!isOption(webPackageOptions, packageInterest)) {
    errors.packageInterest = "Select a valid package interest.";
  }

  if (details.length < 20) {
    errors.details = "Add at least 20 characters about your project.";
  } else if (details.length > FIELD_LIMITS.message) {
    errors.details = `Keep the details under ${FIELD_LIMITS.message} characters.`;
  }

  const websiteRequired =
    projectType === "Website redesign" ||
    projectType === "Maintenance / care plan";
  const websiteError = validateWebsite(website, websiteRequired);
  if (websiteError) errors.website = websiteError;

  if (!boolean(body.consent)) {
    errors.consent = "Please confirm before submitting your request.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, payload: null };
  }

  const normalizedWebsite = website
    ? normalizeHttpUrl(website) ?? ""
    : "";
  const payload: Record<string, string> = {
    subject: `New web solutions enquiry — ${projectType} — ${name}`,
    from_name: "RBM Web Solutions website",
    name,
    phone: normalizePhone(phone),
    "Phone as entered": phone,
    "Contact email": email,
    replyto: email,
    "Business name": business,
    "Current website": normalizedWebsite || "Not provided",
    "Project type": projectType,
    "Package interest": packageInterest,
    "Project details": details,
    "Free website review": boolean(body.reviewRequested)
      ? "Requested — 20-minute review"
      : "Not requested",
    Consent: "Yes",
    Source: "Website — RBM Web Solutions form",
    Page: pagePath(body.page, "/web-solutions"),
  };

  addAttribution(payload, body.attribution);

  return { errors, payload };
}

export function buildFormPayload(
  type: FormType,
  body: Body,
): PayloadBuild {
  if (type === "enquiry") return buildEnquiryPayload(body);
  if (type === "tutor") return buildTutorPayload(body);
  return buildWebPayload(body);
}
