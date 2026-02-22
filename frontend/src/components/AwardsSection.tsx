"use client";

import { useTranslations } from "next-intl";
import {
  DocumentTextIcon,
  TrophyIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

export default function AwardsSection() {
  const t = useTranslations("awards");

  const items = [
    {
      icon: DocumentTextIcon,
      label: t("certificate"),
      color: "text-sam-red",
      bg: "bg-sam-red-light",
    },
    {
      icon: TrophyIcon,
      label: t("trophy"),
      color: "text-sam-gold",
      bg: "bg-sam-gold-light",
    },
    {
      icon: BanknotesIcon,
      label: t("financialReward"),
      color: "text-sam-green",
      bg: "bg-sam-green-light",
    },
  ];

  return (
    <section id="awards" className="py-16 sm:py-24 bg-sam-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-sam-gray-900 text-center mb-12">
          {t("sectionTitle")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center bg-white rounded-2xl p-8 border border-sam-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${item.bg} mb-5`}
              >
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-sam-gray-900">
                {item.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
