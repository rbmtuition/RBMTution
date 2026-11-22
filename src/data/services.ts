export type Service = {
  slug: string;
  name: string;
  shortName: string;
  blurb: string;
  icon: string;
  keyword: string;
};

export const services: Service[] = [
  {
    slug: "home-tuition",
    name: "Home Tuition",
    shortName: "Home Tuition",
    blurb: "One-to-one tutoring at your home, matched to your child's syllabus.",
    icon: "home",
    keyword: "Home Tuition",
  },
  {
    slug: "online-tuition",
    name: "Online Tuition",
    shortName: "Online Tuition",
    blurb: "Live one-to-one online classes from verified tutors across India.",
    icon: "monitor",
    keyword: "Online Tuition",
  },
  {
    slug: "group-classes",
    name: "Group Classes",
    shortName: "Group Classes",
    blurb: "Small-batch tuition for siblings, friends and neighbourhood groups.",
    icon: "users",
    keyword: "Group Tuition",
  },
  {
    slug: "one-to-one-tuition",
    name: "One-to-One Tuition",
    shortName: "One-to-One",
    blurb: "A personalised learning plan built around one student's pace.",
    icon: "user",
    keyword: "One-to-One Tuition",
  },
  {
    slug: "exam-preparation",
    name: "Exam Preparation",
    shortName: "Exam Prep",
    blurb: "JEE, NEET, CUET and board exam preparation with mock tests.",
    icon: "target",
    keyword: "Exam Preparation",
  },
  {
    slug: "doubt-solving",
    name: "Doubt Solving",
    shortName: "Doubt Solving",
    blurb: "Dedicated doubt sessions so no concept is left half-understood.",
    icon: "messages",
    keyword: "Doubt Solving Classes",
  },
  {
    slug: "test-series",
    name: "Test Series",
    shortName: "Test Series",
    blurb: "Chapter tests, sample papers and assessments with honest feedback.",
    icon: "clipboard",
    keyword: "Test Series",
  },
  {
    slug: "homework-assistance",
    name: "Homework Help",
    shortName: "Homework Help",
    blurb: "Daily homework and assignment support without spoon-feeding.",
    icon: "pen",
    keyword: "Homework Help",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
