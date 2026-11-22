"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Coffee,
  GraduationCap,
  Info,
  Lock,
  MapPin,
  Rocket,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ConceptId = "coaching" | "shop" | "startup";

const concepts: Array<{
  id: ConceptId;
  label: string;
  shortLabel: string;
  icon: typeof GraduationCap;
  url: string;
}> = [
  {
    id: "coaching",
    label: "Coaching centre",
    shortLabel: "Coaching",
    icon: GraduationCap,
    url: "northstar-academy.example",
  },
  {
    id: "shop",
    label: "Local shop",
    shortLabel: "Shop",
    icon: Store,
    url: "kettle-and-crumb.example",
  },
  {
    id: "startup",
    label: "Startup",
    shortLabel: "Startup",
    icon: Rocket,
    url: "loopwork.example",
  },
];

export function ConceptShowcase() {
  const [active, setActive] = useState<ConceptId>("coaching");
  const activeConcept = concepts.find((concept) => concept.id === active)!;

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        className="mb-3 flex flex-wrap gap-1.5"
        role="group"
        aria-label="Choose a concept website preview"
      >
        {concepts.map((concept) => {
          const Icon = concept.icon;
          const selected = active === concept.id;
          return (
            <button
              key={concept.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(concept.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold transition",
                selected
                  ? "border-white bg-white text-navy-950"
                  : "border-white/20 bg-white/5 text-navy-100 hover:border-white/40 hover:bg-white/10",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="sm:hidden">{concept.shortLabel}</span>
              <span className="hidden sm:inline">{concept.label}</span>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_40px_100px_-45px_rgba(0,0,0,0.85)]">
        <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <div className="ml-2 flex h-6 flex-1 items-center gap-1.5 rounded-md bg-white px-2 text-[9px] font-semibold text-slate-500 ring-1 ring-slate-200">
            <Lock className="h-2.5 w-2.5 text-teal-600" />
            {activeConcept.url}
          </div>
        </div>

        <div
          className="h-[20.5rem] overflow-hidden bg-white sm:h-[21.5rem]"
          aria-live="polite"
        >
          {active === "coaching" ? <CoachingConcept /> : null}
          {active === "shop" ? <ShopConcept /> : null}
          {active === "startup" ? <StartupConcept /> : null}
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed text-navy-200">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-300" />
        <p>
          <span className="font-bold text-white">Concept preview.</span> Not a
          client project — these show the direction we can build for your
          business.
        </p>
      </div>
    </div>
  );
}

function CoachingConcept() {
  return (
    <div className="h-full bg-[#f5faf7] text-slate-900">
      <div className="flex items-center justify-between border-b border-emerald-100 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-700 text-[10px] font-bold text-white">
            N
          </span>
          <div className="leading-tight">
            <p className="text-[9px] font-bold text-slate-900">
              Northstar Academy
            </p>
            <p className="text-[6px] font-semibold tracking-wide text-emerald-700 uppercase">
              Class 6–12 · CBSE &amp; ICSE
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[7px] font-semibold text-slate-500">
            Courses
          </span>
          <span className="text-[7px] font-semibold text-slate-500">
            Results
          </span>
          <span className="rounded-full bg-emerald-700 px-2 py-1 text-[7px] font-bold text-white">
            Book a demo
          </span>
        </div>
      </div>

      <div className="px-4 pt-4">
        <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[6px] font-extrabold tracking-wide text-emerald-800 uppercase">
          Admissions open
        </span>
        <p className="mt-2 max-w-[17rem] font-display text-[18px] leading-[1.08] font-semibold text-slate-900">
          Class 6–12 coaching that keeps parents informed.
        </p>
        <p className="mt-1.5 max-w-[17rem] text-[8px] leading-relaxed text-slate-500">
          Small batches, weekly tests and a clear update after every parent
          meeting. Know what improved, not just what was taught.
        </p>
        <div className="mt-2.5 flex gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-700 px-2.5 py-1 text-[7px] font-bold text-white">
            Book a free demo
            <ArrowRight className="h-2.5 w-2.5" />
          </span>
          <span className="rounded-full border border-emerald-200 bg-white px-2.5 py-1 text-[7px] font-bold text-emerald-900">
            See the programme
          </span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {["Physics", "Chemistry", "Maths"].map((subject) => (
            <div
              key={subject}
              className="rounded-lg border border-emerald-100 bg-white p-2"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-50">
                <GraduationCap className="h-3 w-3 text-emerald-700" />
              </span>
              <p className="mt-1.5 text-[7px] font-bold text-slate-900">
                {subject}
              </p>
              <p className="mt-0.5 text-[6px] text-slate-500">Class 9–12</p>
            </div>
          ))}
        </div>

        <div className="mt-2.5 flex items-center gap-3 rounded-lg bg-emerald-50 px-2.5 py-2">
          {["Small batches", "Weekly tests", "Parent updates"].map((item) => (
            <span
              key={item}
              className="flex items-center gap-1 text-[6px] font-bold text-emerald-900"
            >
              <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShopConcept() {
  return (
    <div className="h-full bg-[#fff9f0] text-stone-900">
      <div className="flex items-center justify-between border-b border-amber-100 px-4 py-3">
        <div>
          <p className="font-display text-[11px] font-semibold text-stone-900">
            Kettle &amp; Crumb
          </p>
          <p className="text-[6px] font-semibold tracking-[0.16em] text-amber-700 uppercase">
            Bakery · Coffee
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[7px] font-semibold text-stone-500">Menu</span>
          <span className="text-[7px] font-semibold text-stone-500">Visit</span>
          <span className="rounded-full bg-amber-600 px-2 py-1 text-[7px] font-bold text-white">
            Order now
          </span>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
          <div>
            <span className="inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-[6px] font-extrabold tracking-wide text-amber-800 uppercase">
              Baked this morning
            </span>
            <p className="mt-2 font-display text-[18px] leading-[1.08] font-semibold text-stone-900">
              Fresh bakes, made for your morning.
            </p>
            <p className="mt-1.5 text-[8px] leading-relaxed text-stone-500">
              Small-batch bread, cinnamon rolls and proper coffee. Order on
              WhatsApp or drop by before the good stuff disappears.
            </p>
            <div className="mt-2.5 flex gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-600 px-2.5 py-1 text-[7px] font-bold text-white">
                Order on WhatsApp
                <ArrowRight className="h-2.5 w-2.5" />
              </span>
              <span className="rounded-full border border-amber-200 bg-white px-2.5 py-1 text-[7px] font-bold text-stone-800">
                See menu
              </span>
            </div>
          </div>

          <div className="relative flex min-h-[7rem] items-center justify-center rounded-xl bg-gradient-to-br from-amber-200 via-orange-100 to-amber-50">
            <span className="absolute top-2 right-2 rounded-full bg-white/80 px-1.5 py-0.5 text-[6px] font-bold text-amber-800">
              Today
            </span>
            <Coffee className="h-8 w-8 text-amber-700/80" />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {[
            { name: "Sourdough", price: "₹180" },
            { name: "Cinnamon roll", price: "₹90" },
            { name: "Filter coffee", price: "₹70" },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-lg border border-amber-100 bg-white p-2"
            >
              <span className="block h-6 rounded-md bg-gradient-to-br from-amber-100 to-orange-50" />
              <p className="mt-1.5 text-[7px] font-bold text-stone-900">
                {item.name}
              </p>
              <p className="text-[6px] font-semibold text-amber-700">
                {item.price}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-2.5 flex items-center gap-3 rounded-lg bg-white/80 px-2.5 py-2">
          <span className="flex items-center gap-1 text-[6px] font-bold text-stone-700">
            <MapPin className="h-2.5 w-2.5 text-amber-600" />
            Your neighbourhood
          </span>
          <span className="text-[6px] font-semibold text-stone-500">
            Open today · 8–6
          </span>
          <span className="ml-auto text-[6px] font-bold text-amber-700">
            Directions
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between rounded-lg border border-dashed border-amber-200 px-2.5 py-1.5">
          <p className="text-[6px] font-extrabold tracking-wide text-amber-800 uppercase">
            Fresh from the oven
          </p>
          <div className="flex gap-1">
            {["Sourdough", "Croissants", "Cookies"].map((item) => (
              <span
                key={item}
                className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[6px] font-semibold text-amber-800"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StartupConcept() {
  return (
    <div className="h-full bg-[#07111f] text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-lime-300 text-[9px] font-black text-[#07111f]">
            L
          </span>
          <p className="text-[9px] font-bold">Loopwork</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[7px] font-semibold text-slate-400">
            Product
          </span>
          <span className="text-[7px] font-semibold text-slate-400">Pricing</span>
          <span className="rounded-full bg-lime-300 px-2 py-1 text-[7px] font-extrabold text-[#07111f]">
            Start free
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[1.1fr_0.9fr] gap-3 px-4 pt-4">
        <div>
          <span className="inline-flex rounded-full border border-lime-300/30 bg-lime-300/10 px-2 py-0.5 text-[6px] font-extrabold tracking-wide text-lime-200 uppercase">
            For small studios
          </span>
          <p className="mt-2 font-display text-[18px] leading-[1.08] font-semibold text-white">
            Client work without the email chase.
          </p>
          <p className="mt-1.5 text-[8px] leading-relaxed text-slate-400">
            One shared place for approvals, files and updates. Give every client
            a clear next step without another status meeting.
          </p>
          <div className="mt-2.5 flex gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-lime-300 px-2.5 py-1 text-[7px] font-extrabold text-[#07111f]">
              Start free
              <ArrowRight className="h-2.5 w-2.5" />
            </span>
            <span className="rounded-full border border-white/20 px-2.5 py-1 text-[7px] font-bold text-white">
              See how it works
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            {["Client portals", "Approvals", "Weekly digests"].map((item) => (
              <span
                key={item}
                className="flex items-center gap-1 text-[6px] font-semibold text-slate-300"
              >
                <CheckCircle2 className="h-2.5 w-2.5 text-lime-300" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.06] p-2.5">
          <div className="flex items-center justify-between">
            <p className="text-[7px] font-bold text-white">Project board</p>
            <span className="text-[6px] font-semibold text-lime-300">
              This week
            </span>
          </div>
          <div className="mt-2 space-y-1.5">
            {[
              ["Homepage review", "In review", "bg-lime-300"],
              ["Content sign-off", "Waiting", "bg-amber-300"],
              ["Launch checklist", "Done", "bg-teal-300"],
            ].map(([label, status, color]) => (
              <div
                key={label}
                className="rounded-md bg-white/[0.06] px-2 py-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[6px] font-semibold text-slate-200">
                    {label}
                  </p>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[5px] font-extrabold text-[#07111f]",
                      color,
                    )}
                  >
                    {status}
                  </span>
                </div>
                <span className="mt-1 block h-0.5 w-full rounded-full bg-white/10">
                  <span
                    className={cn("block h-full w-2/3 rounded-full", color)}
                  />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-md border border-white/10 px-2 py-1.5">
            <p className="text-[6px] text-slate-400">Client activity</p>
            <p className="mt-0.5 text-[7px] font-semibold text-white">
              2 approvals today
            </p>
          </div>
        </div>
      </div>

      <div className="mx-4 mt-2.5 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
        <div>
          <p className="text-[7px] font-bold text-white">
            One link for every client
          </p>
          <p className="text-[6px] text-slate-400">
            Projects, files and approvals in one place.
          </p>
        </div>
        <div className="flex gap-1">
          {["Portal", "Files", "Updates"].map((item) => (
            <span
              key={item}
              className="rounded-full bg-white/[0.07] px-1.5 py-0.5 text-[5.5px] font-semibold text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-white/10 px-4 py-1.5">
        <span className="text-[5.5px] font-bold tracking-[0.14em] text-slate-500 uppercase">
          Built for independent teams
        </span>
        <div className="flex gap-2">
          {["Studio", "Agency", "Freelance"].map((item) => (
            <span
              key={item}
              className="flex items-center gap-1 text-[5.5px] font-semibold text-slate-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-lime-300/70" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
