"use client";

import { useTranslations } from "next-intl";
import {
  LightBulbIcon,
  ArrowPathRoundedSquareIcon,
  HandThumbUpIcon,
  ShareIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

const icons = [
  LightBulbIcon,
  ArrowPathRoundedSquareIcon,
  HandThumbUpIcon,
  ShareIcon,
  ArrowTrendingUpIcon,
];

const colors = [
  { bg: "bg-sam-red-light", text: "text-sam-red" },
  { bg: "bg-sam-green-light", text: "text-sam-green" },
  { bg: "bg-sam-gold-light", text: "text-sam-gold" },
  { bg: "bg-sam-red-light", text: "text-sam-red" },
  { bg: "bg-sam-green-light", text: "text-sam-green" },
];

export default function AwardValues() {
  const t = useTranslations("awardValues");

  const values = [
    t("innovation"),
    t("flexibility"),
    t("prideInWork"),
    t("knowledgeSharing"),
    t("continuousAdaptation"),
  ];

  return (
    <section id="values" className="py-16 sm:py-24 bg-sam-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-sam-gray-900 text-center mb-12">
          {t("sectionTitle")}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {values.map((value, i) => {
            const Icon = icons[i];
            const color = colors[i];
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center bg-white rounded-2xl p-6 border border-sam-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${color.bg} mb-4`}
                >
                  <Icon className={`w-7 h-7 ${color.text}`} />
                </div>
                <h3 className="text-sm font-semibold text-sam-gray-900">
                  {value}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
