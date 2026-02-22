"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation"; // or next/navigation, but project uses i18n
import { Eye } from "lucide-react";


export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isAr = locale === "ar";
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStart = () => {
    setIsLoading(true);
    router.push("/award-selection" as any);
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-sam-gray-50 min-h-[520px] sm:min-h-[600px] flex items-center">
      {/* ── Bubbles Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Top Right large */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-sam-red-light/30 rounded-full blur-3xl animate-float delay-100" />
        {/* Bottom Left large */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sam-green-light/30 rounded-full blur-3xl animate-float delay-500" />
        {/* Middle small floating */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-sam-gold-light/40 rounded-full blur-xl animate-float delay-200" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-sam-red-light/40 rounded-full blur-xl animate-float delay-700" />
        <div className="absolute top-1/3 right-10 w-12 h-12 bg-sam-green-light/40 rounded-full blur-lg animate-float delay-300" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-start">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sam-green/30 shadow-sm mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-sam-green animate-pulse" />
            <span className="text-sm font-medium text-sam-green">
              {t("badge")}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-sam-red leading-tight mb-6">
            {t("title")}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-sam-gray-500 max-w-2xl mb-10 leading-relaxed">
            {t("subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium border-2 border-sam-red text-sam-red rounded-lg hover:bg-sam-red hover:text-white transition-all duration-200 min-w-[160px]"
            >
              {t("ctaLearnMore")}
            </a>
            <button
              onClick={handleStart}
              disabled={isLoading}
              className={`inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium bg-sam-red text-white rounded-lg transition-all duration-200 shadow-lg shadow-sam-red/25 min-w-[160px] ${isLoading ? "opacity-80 cursor-wait" : "hover:bg-sam-red-dark"}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                t("ctaStart")
              )}
            </button>
          </div>

          {/* Preview Link */}
          <div className="mt-6">
            <Link
              href="/preview"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-sam-gold bg-sam-gold/10 border-2 border-sam-gold/40 rounded-xl hover:bg-sam-gold hover:text-white hover:border-sam-gold hover:shadow-lg hover:shadow-sam-gold/25 transition-all duration-200"
            >
              <Eye className="w-4 h-4" />
              <span>{isAr ? "استعراض نماذج التقديم" : "Preview Application Forms"}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
