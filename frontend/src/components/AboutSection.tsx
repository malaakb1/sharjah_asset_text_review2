"use client";

import { useTranslations } from "next-intl";
import {
  Star,
  Eye,
  Heart,
} from "lucide-react";

export default function AboutSection() {
  const t = useTranslations("about");

  const cards = [
    {
      icon: Star,
      title: t("mission"),
      text: t("missionText"),
      color: "text-sam-red",
      bg: "bg-sam-red-light",
    },
    {
      icon: Eye,
      title: t("vision"),
      text: t("visionText"),
      color: "text-sam-green",
      bg: "bg-sam-green-light",
    },
    {
      icon: Heart,
      title: t("values"),
      text: t("valuesText"),
      color: "text-sam-gold",
      bg: "bg-sam-gold-light",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-sam-gray-900 text-center mb-12">
          {t("sectionTitle")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-sam-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 border-2 border-sam-gray-200 hover:border-sam-red/20"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${card.bg} mb-5`}
              >
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-sam-gray-900 mb-3">
                {card.title}
              </h3>
              <p className="text-sam-gray-500 leading-relaxed text-sm">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
