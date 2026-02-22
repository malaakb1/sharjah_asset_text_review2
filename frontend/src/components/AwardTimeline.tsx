"use client";

import { useTranslations } from "next-intl";
import {
  Rocket,
  Clock,
  ClipboardCheck,
  Trophy,
} from "lucide-react";

const icons = [Rocket, Clock, ClipboardCheck, Trophy];

const colors = [
  { bg: "bg-sam-red-light", text: "text-sam-red", border: "border-sam-red" },
  { bg: "bg-sam-gold-light", text: "text-sam-gold", border: "border-sam-gold" },
  { bg: "bg-sam-green-light", text: "text-sam-green", border: "border-sam-green" },
  { bg: "bg-sam-red-light", text: "text-sam-red", border: "border-sam-red" },
];

export default function AwardTimeline() {
  const t = useTranslations("timeline");

  const steps = [
    t("step1"),
    t("step2"),
    t("step3"),
    t("step4"),
  ];

  return (
    <section id="timeline" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-sam-gray-900 text-center mb-14">
          {t("sectionTitle")}
        </h2>

        {/* Desktop horizontal */}
        <div className="hidden md:flex items-start justify-between relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-sam-gray-200 z-0" />

          {steps.map((step, i) => {
            const Icon = icons[i];
            const color = colors[i];
            return (
              <div key={i} className="relative z-10 flex flex-col items-center text-center flex-1">
                <div
                  className={`w-20 h-20 rounded-full ${color.bg} border-2 ${color.border} flex items-center justify-center mb-4 shadow-sm bg-white z-10`}
                >
                  <Icon className={`w-8 h-8 ${color.text}`} />
                </div>
                <span className="text-xs font-bold text-sam-gray-400 mb-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-semibold text-sam-gray-900">
                  {step}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden relative space-y-8 pl-4">
          {/* Vertical Line */}
          <div className="absolute left-[2.25rem] top-4 bottom-4 w-0.5 bg-sam-gray-200 -z-10" />

          {steps.map((step, i) => {
            const Icon = icons[i];
            const color = colors[i];
            return (
              <div key={i} className="flex items-center gap-6 relative z-10">
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-full ${color.bg} border-2 ${color.border} flex items-center justify-center shadow-sm bg-white`}
                >
                  <Icon className={`w-6 h-6 ${color.text}`} />
                </div>
                <div>
                  <span className="text-xs font-bold text-sam-gray-400 block mb-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-semibold text-sam-gray-900">
                    {step}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
