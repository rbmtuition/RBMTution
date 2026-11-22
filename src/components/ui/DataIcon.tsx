import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Blocks,
  BookOpen,
  Briefcase,
  Calculator,
  ClipboardCheck,
  ClipboardList,
  Cpu,
  Dna,
  FileText,
  FlaskConical,
  Globe2,
  GraduationCap,
  Home,
  Landmark,
  Languages,
  MessagesSquare,
  Monitor,
  NotebookPen,
  PenLine,
  ReceiptText,
  Sparkles,
  Stethoscope,
  Target,
  TestTubes,
  Timer,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  atom: Atom,
  blocks: Blocks,
  book: BookOpen,
  briefcase: Briefcase,
  calculator: Calculator,
  clipboard: ClipboardCheck,
  "clipboard-list": ClipboardList,
  cpu: Cpu,
  dna: Dna,
  file: FileText,
  flask: FlaskConical,
  globe: Globe2,
  graduation: GraduationCap,
  home: Home,
  landmark: Landmark,
  languages: Languages,
  messages: MessagesSquare,
  monitor: Monitor,
  notebook: NotebookPen,
  pen: PenLine,
  receipt: ReceiptText,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  target: Target,
  "test-tubes": TestTubes,
  timer: Timer,
  trending: TrendingUp,
  user: UserRound,
  users: Users,
  tubes: TestTubes,
};

export function DataIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name] ?? GraduationCap;
  return <Icon aria-hidden="true" className={className} />;
}
