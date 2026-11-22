import type { Course } from "@/data/courses";
import type { Faq } from "@/data/faqs";
import type { Area, City } from "@/data/locations";
import type { Service } from "@/data/services";
import type { Subject } from "@/data/subjects";
import { cities } from "@/data/locations";
import { areaGuides, areaNotes, cityIntros } from "@/data/locationDetails";
import { siteConfig } from "@/data/site";

const cityList =
  "Delhi, Noida, Greater Noida, Gurgaon, Ghaziabad and Faridabad";

export function courseFaqs(course: Course): Faq[] {
  return [
    {
      question: `Which classes and boards are covered in ${course.shortName}?`,
      answer: `${course.name} is available for students in ${course.label} across CBSE, ICSE, IB, NIOS and state boards. Tuition can be taken at home or online anywhere in Delhi NCR.`,
    },
    {
      question: "How do you choose the tutor for my child?",
      answer:
        "We shortlist tutors by subject, class, board and locality, then check qualification, experience and a subject demo. You meet the tutor in a free demo class before deciding.",
    },
    {
      question: "How much does this programme cost?",
      answer:
        "Fees depend on the class, subjects, tutor experience, number of sessions per week and your location. After the free demo we share a clear monthly quote with no hidden charges.",
    },
    {
      question: "Can we change the tutor later?",
      answer:
        "Yes. If the teaching style does not suit your child, tell us and we will arrange another tutor at no extra cost.",
    },
  ];
}

export function serviceFaqs(service: Service): Faq[] {
  return [
    {
      question: `What is included in ${service.name}?`,
      answer: `${service.name} includes a matched tutor, a study plan based on your child's syllabus, regular practice and progress feedback. Specific inclusions are confirmed before the first class.`,
    },
    {
      question: `Is ${service.name} available across Delhi NCR?`,
      answer: `We offer ${service.name.toLowerCase()} in ${cityList}. Online sessions are available across India with the same tutor quality standards.`,
    },
    {
      question: "How are the fees calculated?",
      answer:
        "Fees are based on the class, subject, number of sessions, tutor experience and mode. You get a transparent monthly quote after the free demo class.",
    },
    {
      question: "How quickly can we start?",
      answer:
        "In most localities we arrange a demo within 24 to 48 hours. Most enquiries receive a callback within 30 minutes, any day of the week.",
    },
  ];
}

export function subjectFaqs(subject: Subject): Faq[] {
  return [
    {
      question: `Which classes do you teach for ${subject.name}?`,
      answer: `We arrange ${subject.name} tuition for ${subject.classes}, including CBSE, ICSE, IB and state boards. The tutor is matched to the student's class and syllabus.`,
    },
    {
      question: `Do you offer ${subject.name} tuition online?`,
      answer:
        "Yes. Live one-to-one online classes are available with the same tutor matching, study plan and test support as home tuition.",
    },
    {
      question: `How do you choose a ${subject.name} tutor?`,
      answer:
        "Tutors are screened for subject knowledge, teaching experience and a demo lesson before being recommended. We also collect feedback after the first classes.",
    },
    {
      question: "Can we book a free demo?",
      answer:
        "Yes. Share your class, board and locality and we will arrange a free demo class with a suitable tutor. There is no obligation to continue.",
    },
  ];
}

export function getCityIntro(city: City) {
  return (
    cityIntros[city.slug] ??
    `RBM Tuition provides verified home and online tutors in ${city.name} for students from Nursery to Class 12, including board and entrance exam preparation.`
  );
}

export function getAreaNote(city: City, area: Area) {
  return areaNotes[`${city.slug}/${area.slug}`] ?? "";
}

export function getAreaGuide(city: City, area: Area) {
  return areaGuides[`${city.slug}/${area.slug}`];
}

export function getAreaIntro(city: City, area: Area) {
  const note = getAreaNote(city, area);
  return `Looking for a home tutor in ${area.name}, ${city.name}? RBM Tuition matches verified teachers for Nursery to Class 12, all major boards and entrance exams. ${
    note ? `${note} ` : ""
  }You can start with a free demo class at home or online.`;
}

export function cityFaqs(city: City): Faq[] {
  const listedAreas = city.areas
    .slice(0, 8)
    .map((area) => area.name)
    .join(", ");
  const hasMoreAreas = city.areas.length > 8;

  return [
    {
      question: `Which areas of ${city.name} do you cover?`,
      answer: city.areas.length
        ? `We arrange home tutors across ${city.name}, including ${listedAreas}${
            hasMoreAreas ? " and more areas" : ""
          }. Share your locality and we will confirm tutor availability nearby.`
        : `We cover ${city.name} city-wide, including Greater Noida West and the Alpha, Beta and Gamma sectors. Share your society or sector and we will confirm availability.`,
    },
    {
      question: `Which classes and boards do you teach in ${city.name}?`,
      answer:
        "We cover Nursery to Class 12 across CBSE, ICSE, IB, NIOS and state boards, plus JEE, NEET, CUET and foundation programmes.",
    },
    {
      question: `Is online tuition available in ${city.name}?`,
      answer:
        "Yes. If a home tutor is not available at your preferred time, or you travel often, we can arrange live one-to-one online tuition with a matched tutor.",
    },
    {
      question: "How soon can a tutor start?",
      answer:
        "Most demos are arranged within 24 to 48 hours. Most enquiries receive a callback within 30 minutes, any day of the week.",
    },
  ];
}

export function areaFaqs(city: City, area: Area): Faq[] {
  return [
    {
      question: `Are home tutors available in ${area.name}?`,
      answer: `Yes. We arrange home tuition in ${area.name}, ${city.name}, for Nursery to Class 12. Availability depends on the subject and class, so share your requirement and we will confirm a tutor nearby.`,
    },
    {
      question: `Which subjects are most requested in ${area.name}?`,
      answer:
        "Maths, science, English and physics are the most requested subjects locally, along with JEE, NEET and board exam preparation for senior classes.",
    },
    {
      question: "How are tuition fees decided?",
      answer:
        "Fees depend on the class, subjects, number of days per week, tutor experience and location. After a free demo you receive a monthly quote with no hidden charges.",
    },
    {
      question: "Can we try an online class instead?",
      answer:
        "Yes. If home scheduling becomes difficult, the same curriculum plan and tutor matching are available through live one-to-one online classes.",
    },
  ];
}

export const serviceCityCoverage = cities.map((city) => city.name);
export const supportPhone = siteConfig.phone;
