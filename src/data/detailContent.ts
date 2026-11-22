export type CourseDetail = {
  intro: string;
  covers: string[];
};

export type ServiceDetail = {
  intro: string;
  includes: string[];
};

export type SubjectDetail = {
  intro: string;
  topics: string[];
};

export const courseDetails: Record<string, CourseDetail> = {
  "class-1-5": {
    intro:
      "Primary school is where learning habits form. Our Class 1–5 home tutors keep lessons short, visual and encouraging, so children build reading, writing and numeracy confidence without fear of getting things wrong.",
    covers: [
      "Reading fluency and comprehension",
      "English grammar and creative writing",
      "Maths concepts with daily practice",
      "EVS and general awareness",
      "Hindi and second-language support",
      "Homework and school exam preparation",
    ],
  },
  "class-6-8": {
    intro:
      "Middle school introduces abstract concepts and longer syllabi. Our tutors break each chapter into small, checkable steps, so students understand the why before moving on to practice.",
    covers: [
      "Maths, science and English foundations",
      "Concept notes and chapter-wise practice",
      "Answer-writing and presentation skills",
      "School exams and periodic test preparation",
      "Homework supervision without spoon-feeding",
      "Study habits and time management",
    ],
  },
  "class-9-10": {
    intro:
      "Class 9 and 10 set the pattern for board exams. Tutors work through the syllabus chapter by chapter, then move to sample papers and timed practice with honest feedback.",
    covers: [
      "Complete CBSE and ICSE syllabus coverage",
      "NCERT and reference-book problem practice",
      "Sample papers and previous-year questions",
      "Chapter tests with detailed feedback",
      "Doubt-clearing before school exams",
      "Practical and project guidance where needed",
    ],
  },
  "class-11-12-science": {
    intro:
      "Science stream students juggle boards and entrance preparation. Our tutors align school chapters with JEE and NEET-level problem solving, so the same study time works harder.",
    covers: [
      "Physics, chemistry, maths and biology",
      "NCERT-first concept building",
      "Numericals and reaction mechanisms",
      "Board answer-writing practice",
      "JEE and NEET-level problem sets",
      "Regular tests and performance reviews",
    ],
  },
  "class-11-12-commerce": {
    intro:
      "Accountancy and economics reward clarity and practice. Tutors work through numericals step by step, then move to exam-style questions, case studies and revision.",
    covers: [
      "Accountancy from journal to final accounts",
      "Micro and macro economics concepts",
      "Business studies case-based answers",
      "Numerical practice with common-error review",
      "Board sample papers and revision",
      "CUET commerce domain preparation",
    ],
  },
  "class-11-12-humanities": {
    intro:
      "Humanities subjects need strong reading, structure and recall. Tutors teach students how to build answers, use examples and revise consistently instead of cramming at the end.",
    covers: [
      "History, political science and geography",
      "English literature and writing skills",
      "Answer structure and keyword practice",
      "Map work and source-based questions",
      "Revision notes and mind maps",
      "Board and CUET preparation",
    ],
  },
  jee: {
    intro:
      "JEE rewards deep concepts and disciplined problem solving. Our home tutors build a chapter-wise plan, assign graded problem sets and review mistakes instead of only checking answers.",
    covers: [
      "JEE Main and Advanced syllabus planning",
      "Physics, chemistry and maths problem sets",
      "Previous-year and mock paper practice",
      "Error logs and revision cycles",
      "Weekly tests with analysis",
      "Doubt sessions between classes",
    ],
  },
  neet: {
    intro:
      "NEET preparation needs accuracy under time pressure. Tutors combine NCERT line-by-line revision with biology diagrams, chemistry practice and physics numericals.",
    covers: [
      "NCERT biology revision",
      "Physics numericals and concepts",
      "Organic, inorganic and physical chemistry",
      "NEET-pattern mock tests",
      "Time management and accuracy drills",
      "Doubt clearing and revision notes",
    ],
  },
  cuet: {
    intro:
      "CUET is part syllabus and part exam strategy. We prepare domain subjects, the general test and English with section-wise practice and mock timing.",
    covers: [
      "Domain subject preparation",
      "General test reasoning and quantitative aptitude",
      "English comprehension and vocabulary",
      "Section-wise mock tests",
      "Time management for the online exam",
      "College and course guidance",
    ],
  },
  foundation: {
    intro:
      "The foundation years are for curiosity, not pressure. Tutors introduce olympiad-style thinking and early JEE/NEET concepts while keeping school work the priority.",
    covers: [
      "Strong maths and science fundamentals",
      "Olympiad-style reasoning",
      "Early JEE and NEET concept exposure",
      "School syllabus support",
      "Weekly practice and feedback",
      "Confidence building",
    ],
  },
  "board-exam-preparation": {
    intro:
      "Board exams are won in revision, not just coverage. We plan backwards from the exam date, with sample papers, marking-scheme practice and targeted revision.",
    covers: [
      "Syllabus completion and revision planning",
      "Sample papers under timed conditions",
      "Marking-scheme based answer writing",
      "Chapter-wise quick revision notes",
      "Doubt sessions before exams",
      "Score improvement tracking",
    ],
  },
  "crash-course": {
    intro:
      "A focused crash course for students who need structure close to exams. Daily targets, concise notes and repeated practice replace last-minute panic.",
    covers: [
      "Short, prioritised revision plans",
      "High-weightage chapter focus",
      "Daily practice and quick tests",
      "Answer-writing drills",
      "Doubt clearing in every session",
      "Exam-day strategy",
    ],
  },
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "home-tuition": {
    intro:
      "One-to-one tuition at your home, with a tutor chosen for your child's syllabus, board and pace. No batch pressure and no commute.",
    includes: [
      "Tutor matched to class, subject and locality",
      "Free demo class before you commit",
      "Personalised weekly study plan",
      "Regular tests and progress feedback",
      "Free tutor replacement if needed",
    ],
  },
  "online-tuition": {
    intro:
      "Live one-to-one online classes for families who travel, relocate or prefer learning from home. Same tutor, same plan, no commute.",
    includes: [
      "Live one-to-one video classes",
      "Digital notes and shared whiteboard",
      "Recorded doubt sessions on request",
      "Flexible timings across time zones",
      "Monthly progress updates",
    ],
  },
  "group-classes": {
    intro:
      "Small groups of two to four students — siblings, friends or neighbours — sharing a tutor while keeping individual attention.",
    includes: [
      "Two to four students per group",
      "Shared schedule and fee advantage",
      "Level-matched groupings",
      "Individual homework review",
      "Monthly assessments",
    ],
  },
  "one-to-one-tuition": {
    intro:
      "A single tutor dedicated to one student's targets. Ideal for students who need to close specific gaps or move faster than a classroom.",
    includes: [
      "Personalised lesson plans",
      "Flexible pace and revision",
      "Focused doubt solving",
      "Weekly goals and tracking",
      "Parent feedback after tests",
    ],
  },
  "exam-preparation": {
    intro:
      "Structured preparation for JEE, NEET, CUET and board exams, with a plan built backwards from your exam date.",
    includes: [
      "Exam-specific syllabus planning",
      "Previous-year paper practice",
      "Mock tests with analysis",
      "Error logs and revision cycles",
      "Doubt-solving sessions",
    ],
  },
  "doubt-solving": {
    intro:
      "Dedicated sessions for the chapters and questions a student is stuck on, without redoing the whole syllabus.",
    includes: [
      "Chapter-specific doubt sessions",
      "Concept re-explanation with examples",
      "Question-solving practice",
      "Notes for quick revision",
      "Optional follow-up test",
    ],
  },
  "test-series": {
    intro:
      "Regular assessments that mirror school and entrance exam patterns, with feedback that tells you what to fix next.",
    includes: [
      "Chapter-wise tests",
      "Full-length sample papers",
      "Timed exam practice",
      "Marking-scheme feedback",
      "Performance discussion with parents",
    ],
  },
  "homework-assistance": {
    intro:
      "Daily homework support that teaches the student to work independently, not just finish the notebook.",
    includes: [
      "Daily or alternate-day support",
      "Homework review and corrections",
      "Concept help when stuck",
      "Project and assignment guidance",
      "Study routine building",
    ],
  },
};

export const subjectDetails: Record<string, SubjectDetail> = {
  mathematics: {
    intro:
      "Maths improves with explanation, practice and correction — in that order. Tutors rebuild weak fundamentals before moving to exam-level questions.",
    topics: [
      "Number systems and arithmetic",
      "Algebra and geometry",
      "Trigonometry and calculus",
      "Statistics and probability",
      "Board and competitive problem sets",
    ],
  },
  science: {
    intro:
      "Science for classes 6 to 10 is about connecting concepts, not memorising chapters. Tutors use examples, diagrams and simple experiments to explain ideas.",
    topics: [
      "Physics fundamentals",
      "Chemistry basics",
      "Biology concepts",
      "Practical and diagram work",
      "NCERT and board questions",
    ],
  },
  english: {
    intro:
      "English scores come from reading, structure and regular writing practice. Tutors work on comprehension, grammar and literature together.",
    topics: [
      "Reading comprehension",
      "Grammar and vocabulary",
      "Creative and formal writing",
      "Literature analysis",
      "Board answer practice",
    ],
  },
  hindi: {
    intro:
      "Hindi tuition focuses on grammar, literature and answer presentation, with practice that matches the board's marking pattern.",
    topics: [
      "Hindi grammar (vyakaran)",
      "Literature and poetry",
      "Essay and letter writing",
      "Comprehension practice",
      "Board answer structure",
    ],
  },
  physics: {
    intro:
      "Physics needs concept clarity before formula practice. Tutors explain the idea, derive the relationship, then solve graded numericals with the student.",
    topics: [
      "Mechanics and motion",
      "Electricity and magnetism",
      "Optics and waves",
      "Modern physics",
      "JEE and NEET numericals",
    ],
  },
  chemistry: {
    intro:
      "Chemistry is three subjects in one. Tutors balance physical chemistry numericals, organic reaction logic and inorganic recall in a weekly plan.",
    topics: [
      "Physical chemistry",
      "Organic reactions",
      "Inorganic chemistry",
      "Chemical equations and calculations",
      "Board and entrance practice",
    ],
  },
  biology: {
    intro:
      "Biology rewards diagram practice and precise recall. Tutors combine NCERT reading with labelled diagrams, mnemonics and NEET-pattern questions.",
    topics: [
      "Cell biology and genetics",
      "Human physiology",
      "Plant physiology",
      "Ecology and environment",
      "NEET diagram practice",
    ],
  },
  accountancy: {
    intro:
      "Accountancy becomes manageable when every entry has a reason. Tutors build the logic first, then increase speed with exam-style numericals.",
    topics: [
      "Journal and ledger",
      "Trial balance and final accounts",
      "Partnership accounts",
      "Company accounts",
      "Exam numericals",
    ],
  },
  economics: {
    intro:
      "Economics needs clear definitions, graphs and structured answers. Tutors teach concepts with current examples and board-style answer writing.",
    topics: [
      "Microeconomics",
      "Macroeconomics",
      "Statistics",
      "Indian economic development",
      "Graph and case-based answers",
    ],
  },
  "business-studies": {
    intro:
      "Business studies is scored through keywords, examples and case-based answers. Tutors teach the framework and then practise real question patterns.",
    topics: [
      "Nature and purpose of business",
      "Management principles",
      "Marketing and consumer protection",
      "Finance and trade",
      "Case-based answer writing",
    ],
  },
  "computer-science": {
    intro:
      "Computer science tuition covers programming logic, SQL and board theory. Students practise code on paper and on the computer.",
    topics: [
      "Python programming",
      "Data structures basics",
      "SQL and databases",
      "Computer networks",
      "Board theory and practicals",
    ],
  },
  "social-science": {
    intro:
      "Social science is more than memorising dates. Tutors connect history, geography and civics, and teach students to write structured, evidence-based answers.",
    topics: [
      "History and civics",
      "Geography and map work",
      "Economics basics",
      "Source-based questions",
      "Board answer writing",
    ],
  },
  evs: {
    intro:
      "EVS connects science, social studies and everyday observation for young learners. Tutors use pictures, local examples and simple activities so children understand rather than memorise.",
    topics: [
      "Family and community",
      "Plants, animals and food",
      "Water, air and weather",
      "Neighbourhood and maps",
      "Activity-based school questions",
    ],
  },
  history: {
    intro:
      "History tuition teaches students to connect events, use sources and write evidence-based answers instead of memorising isolated dates.",
    topics: [
      "Ancient, medieval and modern India",
      "World history themes",
      "Source and map work",
      "Cause and consequence",
      "Essay and board answers",
    ],
  },
  geography: {
    intro:
      "Geography combines physical processes, maps and human patterns. Tutors build diagram and map confidence alongside case-study answers.",
    topics: [
      "Physical geography",
      "Human and economic geography",
      "India: resources and regions",
      "Maps, graphs and data",
      "Case-study answers",
    ],
  },
  "political-science": {
    intro:
      "Political science tuition connects constitutional principles, political theory and current events, with structured answer writing.",
    topics: [
      "Indian Constitution",
      "Political theory",
      "Contemporary world politics",
      "Indian politics since independence",
      "Source and essay answers",
    ],
  },
  psychology: {
    intro:
      "Psychology tuition balances concepts, research studies and application. Tutors help students use examples and write precise, structured answers.",
    topics: [
      "Human development",
      "Learning, memory and motivation",
      "Personality and intelligence",
      "Psychological disorders and therapy",
      "Research methods and answers",
    ],
  },
  sanskrit: {
    intro:
      "Sanskrit tuition builds grammar accuracy and translation confidence. Tutors work through shabd roop, dhatu roop and sentence formation before moving to literature.",
    topics: [
      "Sandhi and grammar",
      "Shabd roop and dhatu roop",
      "Translation and comprehension",
      "Literature and poetry",
      "Board answer practice",
    ],
  },
  french: {
    intro:
      "French tuition builds grammar, vocabulary and confidence in reading, writing and speaking. Tutors match the pace to the school, IB or IGCSE syllabus.",
    topics: [
      "Grammar and sentence structure",
      "Vocabulary and pronunciation",
      "Reading and comprehension",
      "Writing and oral practice",
      "Board and language exam prep",
    ],
  },
  german: {
    intro:
      "German tuition focuses on cases, verb forms and structured sentence building, with reading, writing and oral practice.",
    topics: [
      "Cases and articles",
      "Verb conjugation and tenses",
      "Vocabulary and sentence building",
      "Reading and writing",
      "Listening and speaking practice",
    ],
  },
  entrepreneurship: {
    intro:
      "Entrepreneurship tuition turns business ideas into structured plans, with market assessment, finance and case-based answers.",
    topics: [
      "Entrepreneurial mindset",
      "Business planning",
      "Market assessment",
      "Finance and resource mobilisation",
      "Case studies and board answers",
    ],
  },
  "informatics-practices": {
    intro:
      "Informatics Practices tuition covers Python, data handling, SQL and board practicals, with code practice on paper and computer.",
    topics: [
      "Python and Pandas",
      "Data visualisation",
      "SQL and databases",
      "Computer networks",
      "Practical file and viva",
    ],
  },
  "artificial-intelligence": {
    intro:
      "Artificial Intelligence tuition explains how AI systems use data, with age-appropriate Python, data literacy and project work.",
    topics: [
      "AI concepts and applications",
      "Data literacy and visualisation",
      "Python basics",
      "Machine learning ideas",
      "Projects, ethics and board work",
    ],
  },
  "legal-studies": {
    intro:
      "Legal Studies tuition builds legal reasoning through the Indian legal system, constitutional principles and case-based application.",
    topics: [
      "Indian legal system",
      "Constitution and rights",
      "Civil and criminal law",
      "Legal reasoning",
      "Case studies and answer writing",
    ],
  },
};
