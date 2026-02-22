"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const stepIcons = [
  // Each step gets a number-badge style
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
];

export default function StepsTimeline() {
  const t = useTranslations("steps");

  const steps = [
    { title: t("step1Title"), desc: t("step1Desc") },
    { title: t("step2Title"), desc: t("step2Desc") },
    { title: t("step3Title"), desc: t("step3Desc") },
    { title: t("step4Title"), desc: t("step4Desc") },
    { title: t("step5Title"), desc: t("step5Desc") },
    { title: t("step6Title"), desc: t("step6Desc") },
  ];

  return (
    <section id="steps" className="py-16 sm:py-24 bg-sam-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-sam-gray-900 text-center mb-14">
          {t("sectionTitle")}
        </h2>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:grid grid-cols-6 gap-4 relative">
          {/* Connecting line */}
          <div className="absolute top-7 left-[8.33%] right-[8.33%] h-0.5 bg-sam-gray-200" />

          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              {/* Step number circle */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-sam-red flex items-center justify-center mb-4 shadow-sm">
                <span className="text-sm font-bold text-sam-red">
                  {stepIcons[i]}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-sam-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-sam-gray-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-sam-red flex items-center justify-center shadow-sm">
                <span className="text-sm font-bold text-sam-red">
                  {stepIcons[i]}
                </span>
              </div>
              <div className="pt-1">
                <h3 className="text-sm font-semibold text-sam-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-sam-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link
            href="/award-selection"
            className="inline-flex items-center justify-center px-10 py-3.5 text-sm font-semibold bg-sam-red text-white rounded-lg hover:bg-sam-red-dark transition-all duration-200 shadow-lg shadow-sam-red/25"
          >
            {t("ctaStart")}
          </Link>
        </div>
      </div>
    </section>
  );
}
