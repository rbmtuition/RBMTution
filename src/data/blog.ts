export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  displayDate: string;
  readingTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "home-tuition-delhi-ncr-parents-guide",
    title: "Home Tuition in Delhi NCR: A Complete Parent's Guide",
    excerpt:
      "What to ask before hiring a home tutor, how much to budget, and how to tell whether tuition is actually helping your child.",
    category: "Parent Guides",
    date: "2026-11-10",
    displayDate: "10 Nov 2026",
    readingTime: "8 min read",
  },
  {
    slug: "home-tutor-cost-delhi-noida-gurgaon",
    title: "How Much Does a Home Tutor Cost in Delhi, Noida & Gurgaon?",
    excerpt:
      "A transparent look at what drives tuition fees — class, subject, experience, locality and frequency — and how to budget sensibly.",
    category: "Fees & Planning",
    date: "2026-11-04",
    displayDate: "4 Nov 2026",
    readingTime: "6 min read",
  },
  {
    slug: "cbse-vs-icse-vs-ib",
    title: "CBSE vs ICSE vs IB: Which Board Suits Your Child?",
    excerpt:
      "Assessment styles, subject depth and workload compared, with practical advice for parents choosing a board in Delhi NCR.",
    category: "Boards",
    date: "2026-10-27",
    displayDate: "27 Oct 2026",
    readingTime: "7 min read",
  },
  {
    slug: "jee-vs-neet-after-class-10",
    title: "JEE vs NEET: How to Choose the Right Path After Class 10",
    excerpt:
      "Interest, aptitude and career reality — a structured way to decide between engineering and medical preparation.",
    category: "Entrance Exams",
    date: "2026-10-18",
    displayDate: "18 Oct 2026",
    readingTime: "7 min read",
  },
  {
    slug: "signs-your-child-needs-a-tutor",
    title: "7 Signs Your Child Needs a Personal Tutor",
    excerpt:
      "From silent grade drops to homework battles, these early signals suggest a tutor could help — and when it may be something else.",
    category: "Learning Support",
    date: "2026-10-09",
    displayDate: "9 Oct 2026",
    readingTime: "5 min read",
  },
];

const blogImages: Record<string, { src: string; alt: string }> = {
  "home-tuition-delhi-ncr-parents-guide": {
    src: "/photos/home-tuition-session.avif",
    alt: "A tutor guiding a child's hand through writing practice during a home tuition session",
  },
  "home-tutor-cost-delhi-noida-gurgaon": {
    src: "/photos/blog-tutor-fees.avif",
    alt: "A calculator, notebook and handwritten working used to plan a tuition budget",
  },
  "cbse-vs-icse-vs-ib": {
    src: "/photos/blog-board-choice.avif",
    alt: "Open textbooks and notebooks laid out on a classroom desk",
  },
  "jee-vs-neet-after-class-10": {
    src: "/photos/blog-jee-vs-neet.avif",
    alt: "A student solving physics and maths equations with a pen",
  },
  "signs-your-child-needs-a-tutor": {
    src: "/photos/gallery-doubt-solving.avif",
    alt: "A tutor pointing out a step in a student's workbook during a doubt-clearing session",
  },
};

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogImage(slug: string) {
  return blogImages[slug];
}
