export type Course = {
  slug: string;
  name: string;
  shortName: string;
  label: string;
  blurb: string;
  icon: string;
  featured: boolean;
  keywords: string[];
};

export const courses: Course[] = [
  {
    slug: "class-1-5",
    name: "Class 1–5 Home Tuition",
    shortName: "Primary School",
    label: "Class 1–5",
    blurb:
      "Foundation building in maths, English and EVS with patient, child-friendly tutors.",
    icon: "blocks",
    featured: true,
    keywords: [
      "primary home tuition",
      "class 1 to 5 tuition Delhi NCR",
      "home tutor for primary school",
    ],
  },
  {
    slug: "class-6-8",
    name: "Class 6–8 Home Tuition",
    shortName: "Middle School",
    label: "Class 6–8",
    blurb:
      "Concept-first coaching across all subjects as school syllabi get tougher.",
    icon: "notebook",
    featured: true,
    keywords: [
      "middle school tuition",
      "class 6 to 8 home tutor",
      "tuition for class 7",
    ],
  },
  {
    slug: "class-9-10",
    name: "Class 9–10 Home Tuition",
    shortName: "Board Preparation",
    label: "Class 9–10",
    blurb:
      "CBSE and ICSE board preparation with chapter tests and regular doubt-clearing.",
    icon: "clipboard",
    featured: true,
    keywords: [
      "class 10 home tuition",
      "class 9 tuition Delhi NCR",
      "CBSE board tutor at home",
    ],
  },
  {
    slug: "class-11-12-science",
    name: "Class 11–12 Science Tuition",
    shortName: "Science Stream",
    label: "Class 11–12",
    blurb:
      "Physics, chemistry, maths and biology for science students, boards plus entrances.",
    icon: "atom",
    featured: true,
    keywords: [
      "class 12 science tuition",
      "physics chemistry tutor at home",
      "science stream home tuition",
    ],
  },
  {
    slug: "class-11-12-commerce",
    name: "Class 11–12 Commerce Tuition",
    shortName: "Commerce Stream",
    label: "Class 11–12",
    blurb:
      "Accountancy, economics and business studies with numericals made simple.",
    icon: "briefcase",
    featured: false,
    keywords: [
      "commerce home tuition",
      "accountancy tutor Delhi NCR",
      "class 12 commerce tuition",
    ],
  },
  {
    slug: "class-11-12-humanities",
    name: "Class 11–12 Humanities Tuition",
    shortName: "Humanities Stream",
    label: "Class 11–12",
    blurb:
      "History, political science, geography and English with answer-writing practice.",
    icon: "landmark",
    featured: false,
    keywords: [
      "humanities home tuition",
      "arts stream tutor",
      "class 12 humanities tuition",
    ],
  },
  {
    slug: "jee",
    name: "JEE Main & Advanced Coaching",
    shortName: "JEE Main & Advanced",
    label: "JEE",
    blurb:
      "Concept-led JEE preparation at home with problem sets, mock tests and mentorship.",
    icon: "target",
    featured: true,
    keywords: [
      "JEE home tuition",
      "JEE Main tutor Delhi NCR",
      "IIT JEE coaching at home",
    ],
  },
  {
    slug: "neet",
    name: "NEET UG Coaching",
    shortName: "NEET UG",
    label: "NEET",
    blurb:
      "Biology, physics and chemistry coaching for NEET with regular test series.",
    icon: "stethoscope",
    featured: true,
    keywords: [
      "NEET home tuition",
      "NEET biology tutor",
      "medical entrance coaching at home",
    ],
  },
  {
    slug: "cuet",
    name: "CUET Preparation",
    shortName: "CUET UG",
    label: "CUET",
    blurb:
      "Domain subjects, general test and English preparation for CUET UG.",
    icon: "graduation",
    featured: false,
    keywords: [
      "CUET coaching Delhi NCR",
      "CUET home tuition",
      "CUET UG preparation",
    ],
  },
  {
    slug: "foundation",
    name: "Foundation Programme",
    shortName: "Foundation",
    label: "Class 8–10",
    blurb:
      "Early preparation for JEE, NEET and olympiads without exam pressure.",
    icon: "sparkles",
    featured: false,
    keywords: [
      "foundation course class 8 9 10",
      "olympiad coaching at home",
      "early JEE NEET preparation",
    ],
  },
  {
    slug: "board-exam-preparation",
    name: "Board Exam Preparation",
    shortName: "Board Exams",
    label: "Class 9–12",
    blurb:
      "Focused revision, sample papers and writing practice for CBSE and ICSE boards.",
    icon: "file",
    featured: false,
    keywords: [
      "board exam preparation",
      "CBSE sample paper practice",
      "board revision tutor",
    ],
  },
  {
    slug: "crash-course",
    name: "Crash Course",
    shortName: "Crash Course",
    label: "Exam season",
    blurb:
      "Short, high-intensity revision programmes before boards and entrance exams.",
    icon: "timer",
    featured: false,
    keywords: [
      "tuition crash course",
      "board exam crash course",
      "last minute exam preparation",
    ],
  },
];

const courseImages: Record<string, { src: string; alt: string }> = {
  "class-1-5": {
    src: "/photos/home-tuition-session.avif",
    alt: "A tutor guiding a young student's hand through a writing exercise at a study table",
  },
  "class-6-8": {
    src: "/photos/gallery-doubt-solving.avif",
    alt: "A tutor pointing out a step in a student's workbook during a doubt-clearing session",
  },
  "class-9-10": {
    src: "/photos/exam-preparation-session.avif",
    alt: "A revision desk with textbooks, notes, a calculator and a hand writing an answer",
  },
  "class-11-12-science": {
    src: "/photos/course-jee-neet.avif",
    alt: "A student working through physics, chemistry and maths equations on a chalkboard",
  },
  "class-11-12-commerce": {
    src: "/photos/course-commerce.avif",
    alt: "A calculator, pen and printed financial report with charts on a wooden desk",
  },
  "class-11-12-humanities": {
    src: "/photos/course-humanities.avif",
    alt: "An open history textbook with a map and archival photographs",
  },
  jee: {
    src: "/photos/course-jee.avif",
    alt: "Engineering blueprints, a scale ruler and drafting tools on a study desk",
  },
  neet: {
    src: "/photos/course-neet.avif",
    alt: "A stethoscope resting on handwritten medical study notes",
  },
  cuet: {
    src: "/photos/course-cuet.avif",
    alt: "An exam answer sheet and pencil on a desk in a classroom",
  },
  foundation: {
    src: "/photos/group-classes-session.avif",
    alt: "Three students working together on a shared study task at a table",
  },
  "board-exam-preparation": {
    src: "/photos/gallery-test-correction.avif",
    alt: "A teacher marking a test paper with a red pen",
  },
  "crash-course": {
    src: "/photos/online-tuition-session.avif",
    alt: "An online tuition lesson in progress on a laptop while a student takes notes",
  },
};

export function getCourseImage(course: Course) {
  return courseImages[course.slug];
}

export const featuredCourses = courses.filter((course) => course.featured);

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export const classOptions = [
  "Nursery",
  "LKG",
  "UKG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "JEE",
  "NEET",
  "CUET",
  "Other",
] as const;
