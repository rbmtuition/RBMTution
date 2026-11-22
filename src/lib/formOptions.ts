import { subjects } from "@/data/subjects";

export const enquiryBoardOptions = [
  "CBSE",
  "ICSE",
  "IB",
  "NIOS",
  "State board",
  "Other",
] as const;

export const enquiryModeOptions = [
  "Home tuition",
  "Online tuition",
  "Either is fine",
] as const;

export const tutorQualifications = [
  "B.A. / B.Sc. / B.Com",
  "B.Tech / B.E.",
  "M.A. / M.Sc. / M.Com",
  "M.Tech / M.E.",
  "B.Ed.",
  "M.Ed.",
  "MBBS / BDS",
  "CA / CS / CMA",
  "PhD",
  "Pursuing graduation",
  "Other",
] as const;

export const tutorExperienceOptions = [
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "10+ years",
] as const;

export const tutorModeOptions = [
  "Home tuition",
  "Online tuition",
  "Home or online",
] as const;

export const tutorBoardOptions = [
  "CBSE",
  "ICSE",
  "IB",
  "NIOS",
  "State board",
  "Other",
] as const;

export const tutorLanguageOptions = ["English", "Hindi", "Other"] as const;

export const tutorFeeOptions = [
  "₹300–500 per hour",
  "₹500–800 per hour",
  "₹800–1,200 per hour",
  "₹1,200+ per hour",
  "Negotiable",
] as const;

export const tutorAvailabilityOptions = [
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Weekends",
  "Flexible",
] as const;

export const tutorSubjectChoices = [
  ...subjects.map((subject) => subject.name),
  "JEE preparation",
  "NEET preparation",
  "CUET preparation",
];

const boardRequiredClasses = [
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "JEE",
  "NEET",
  "CUET",
];

export function enquiryBoardRequiredFor(classLevel: string) {
  return boardRequiredClasses.includes(classLevel);
}

export function currentWebsiteRequiredFor(projectType: string) {
  return (
    projectType === "Website redesign" ||
    projectType === "Maintenance / care plan"
  );
}
