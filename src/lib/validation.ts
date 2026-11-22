import {
  currentWebsiteRequiredFor,
  enquiryBoardRequiredFor,
} from "@/lib/formOptions";

export const FIELD_LIMITS = {
  name: 80,
  business: 120,
  message: 500,
  url: 300,
  email: 254,
  page: 300,
  source: 140,
} as const;

const NAME_PATTERN = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function validateName(value: string) {
  const name = normalizeName(value);

  if (name.length < 3) {
    return "Enter at least 3 characters.";
  }
  if (name.length > FIELD_LIMITS.name) {
    return `Keep the name under ${FIELD_LIMITS.name} characters.`;
  }
  if (!NAME_PATTERN.test(name)) {
    return "Use English letters, spaces, hyphens or apostrophes only.";
  }
  return undefined;
}

export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }
  return digits;
}

export function validatePhone(value: string) {
  if (!/^[6-9]\d{9}$/.test(normalizePhone(value))) {
    return "Enter a valid 10-digit Indian mobile number.";
  }
  return undefined;
}

export function validateEmail(value: string, required = false) {
  const email = value.trim();

  if (!email) {
    return required ? "Enter your email address." : undefined;
  }
  if (email.length > FIELD_LIMITS.email || !EMAIL_PATTERN.test(email)) {
    return "Enter a valid email address.";
  }
  return undefined;
}

export function normalizeHttpUrl(value: string, addProtocol = true) {
  const input = value.trim();
  if (!input) return null;

  if (!/^https?:\/\//i.test(input) && !addProtocol) {
    return null;
  }

  const candidate = /^https?:\/\//i.test(input)
    ? input
    : `https://${input}`;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }
    if (!url.hostname.includes(".")) {
      return null;
    }
    return url.href;
  } catch {
    return null;
  }
}

export function validateWebsite(value: string, required = false) {
  const website = value.trim();

  if (!website) {
    return required
      ? "Enter your current website for redesign or maintenance."
      : undefined;
  }
  if (website.length > FIELD_LIMITS.url || !normalizeHttpUrl(website)) {
    return "Enter a valid website such as example.com.";
  }
  return undefined;
}

export function validateOptionalResume(value: string) {
  const url = value.trim();

  if (!url) return undefined;
  if (url.length > FIELD_LIMITS.url || !normalizeHttpUrl(url, false)) {
    return "Enter a valid link starting with https://.";
  }
  return undefined;
}

export function validateMessage(value: string) {
  if (value.length > FIELD_LIMITS.message) {
    return `Keep the message under ${FIELD_LIMITS.message} characters.`;
  }
  return undefined;
}

export function validateBusiness(value: string) {
  const business = value.trim();

  if (!business) {
    return "Enter your business or institute name.";
  }
  if (business.length > FIELD_LIMITS.business) {
    return `Keep the name under ${FIELD_LIMITS.business} characters.`;
  }
  return undefined;
}

export function websiteIsRequired(projectType: string) {
  return currentWebsiteRequiredFor(projectType);
}

export function boardIsRequired(classLevel: string) {
  return enquiryBoardRequiredFor(classLevel);
}
