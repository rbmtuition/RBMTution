export type Subject = {
  slug: string;
  name: string;
  blurb: string;
  classes: string;
  icon: string;
};

export const subjects: Subject[] = [
  {
    slug: "mathematics",
    name: "Mathematics",
    blurb: "From primary arithmetic to calculus and competitive problem solving.",
    classes: "Nursery to Class 12",
    icon: "calculator",
  },
  {
    slug: "science",
    name: "Science",
    blurb: "Physics, chemistry and biology fundamentals for classes 6 to 10.",
    classes: "Classes 6-10",
    icon: "flask",
  },
  {
    slug: "english",
    name: "English",
    blurb: "Reading, writing, grammar and literature for every board.",
    classes: "Nursery to Class 12",
    icon: "book",
  },
  {
    slug: "hindi",
    name: "Hindi",
    blurb: "Hindi literature, grammar and writing skills with exam-focused practice.",
    classes: "Nursery to Class 12",
    icon: "languages",
  },
  {
    slug: "physics",
    name: "Physics",
    blurb: "Concept clarity and numerical problem solving for boards and JEE/NEET.",
    classes: "Classes 9-12",
    icon: "atom",
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    blurb: "Physical, organic and inorganic chemistry with reaction practice.",
    classes: "Classes 9-12",
    icon: "tubes",
  },
  {
    slug: "biology",
    name: "Biology",
    blurb: "Diagram-led NEET and board preparation for Class 9-12.",
    classes: "Classes 9-12",
    icon: "dna",
  },
  {
    slug: "accountancy",
    name: "Accountancy",
    blurb: "Journal entries, balance sheets and numericals made systematic.",
    classes: "Classes 11-12",
    icon: "receipt",
  },
  {
    slug: "economics",
    name: "Economics",
    blurb: "Micro, macro and statistics with graph and answer-writing practice.",
    classes: "Classes 11-12",
    icon: "trending",
  },
  {
    slug: "business-studies",
    name: "Business Studies",
    blurb: "Case-based answers and concept notes for commerce students.",
    classes: "Classes 11-12",
    icon: "briefcase",
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    blurb: "Python, SQL and board theory for CBSE and ICSE students.",
    classes: "Classes 9-12",
    icon: "cpu",
  },
  {
    slug: "social-science",
    name: "Social Science",
    blurb: "History, geography, civics and economics for classes 6 to 10.",
    classes: "Classes 6-10",
    icon: "globe",
  },
  {
    slug: "evs",
    name: "EVS",
    blurb: "Science and social awareness for young learners through everyday examples.",
    classes: "Classes 1-5",
    icon: "blocks",
  },
  {
    slug: "history",
    name: "History",
    blurb: "Sources, causes and structured answers across Indian and world history.",
    classes: "Classes 11-12",
    icon: "landmark",
  },
  {
    slug: "geography",
    name: "Geography",
    blurb: "Physical and human geography with maps, data and case studies.",
    classes: "Classes 11-12",
    icon: "globe",
  },
  {
    slug: "political-science",
    name: "Political Science",
    blurb: "Constitution, political theory and current affairs with answer practice.",
    classes: "Classes 11-12",
    icon: "users",
  },
  {
    slug: "psychology",
    name: "Psychology",
    blurb: "Concepts, research studies and application for senior students.",
    classes: "Classes 11-12",
    icon: "user",
  },
  {
    slug: "sanskrit",
    name: "Sanskrit",
    blurb: "Grammar, translation and literature with step-by-step practice.",
    classes: "Classes 6-12",
    icon: "book",
  },
  {
    slug: "french",
    name: "French",
    blurb: "Grammar, vocabulary and confident reading, writing and speaking.",
    classes: "Classes 5-12",
    icon: "languages",
  },
  {
    slug: "german",
    name: "German",
    blurb: "Cases, verbs and sentence building for school and language exams.",
    classes: "Classes 6-12",
    icon: "languages",
  },
  {
    slug: "entrepreneurship",
    name: "Entrepreneurship",
    blurb: "Business ideas, planning and finance with case-based answers.",
    classes: "Classes 11-12",
    icon: "briefcase",
  },
  {
    slug: "informatics-practices",
    name: "Informatics Practices",
    blurb: "Python, Pandas, SQL and practical work for CBSE classes 11-12.",
    classes: "Classes 11-12",
    icon: "monitor",
  },
  {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    blurb: "AI concepts, data literacy and projects for classes 9-12.",
    classes: "Classes 9-12",
    icon: "cpu",
  },
  {
    slug: "legal-studies",
    name: "Legal Studies",
    blurb: "Legal reasoning, constitutional principles and case-based answers.",
    classes: "Classes 11-12",
    icon: "file",
  },
];

export function getSubject(slug: string) {
  return subjects.find((subject) => subject.slug === slug);
}

export const subjectOptions = [
  "All subjects",
  ...subjects.map((subject) => subject.name),
  "JEE preparation",
  "NEET preparation",
  "CUET preparation",
] as const;
