import { ClipboardList, LineChart, UserRound } from "lucide-react";
import type { Step } from "@/components/page/StepsGrid";

export const tuitionSteps: Step[] = [
  {
    icon: UserRound,
    title: "Free demo and level check",
    description:
      "The tutor reviews the student's current level, school syllabus and exam timeline before starting.",
  },
  {
    icon: ClipboardList,
    title: "A plan for the term",
    description:
      "Chapters are sequenced, weekly targets are set, and homework is sized to fit around school.",
  },
  {
    icon: LineChart,
    title: "Tests and feedback",
    description:
      "Regular tests show what improved and what needs revision, with honest feedback for parents.",
  },
];
