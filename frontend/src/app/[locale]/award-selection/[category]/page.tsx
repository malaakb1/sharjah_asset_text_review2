"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { categoryContent } from "@/data/categoryContent";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Award,
  Trophy,
  Info,
  Users,
  Send,
  Sparkles,
  ClipboardCheck,
  Star,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const validSlugs = [
  "department",
  "project",
  "green",
  "knowledge",
  "employee-nonsupervisory",
  "employee-supervisory",
];

export default function CategoryDetailPage() {
  const t = useTranslations("categoryDetails");
  const locale = useLocale();
  const params = useParams();
  const slug = params.category as string;

  if (!validSlugs.includes(slug)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-sam-gray-900 mb-4">404</h1>
          <Link
            href="/award-selection"
            className="text-sam-red hover:underline"
          >
            {t("backButton")}
          </Link>
        </div>
      </div>
    );
  }

  const content = categoryContent[slug]?.[locale as "ar" | "en"];
  if (!content) return null;

  const BackArrow = locale === "ar" ? ArrowRight : ArrowLeft;
  const ForwardChevron = locale === "ar" ? ChevronLeft : ChevronRight;

  // Calculate total points if applicable
  const totalPoints = content.criteriaItems.reduce((sum, item) => {
    if (item.points) {
      const num = parseInt(item.points);
      if (!isNaN(num)) return sum + num;
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-sam-gray-50 relative">
      {/* Floating Ask Nujoom button */}
      <button
        type="button"
        className="fixed bottom-6 end-6 z-40 flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-full bg-sam-red text-white hover:bg-sam-red-dark transition-all shadow-xl shadow-sam-red/30 cursor-pointer animate-bounce hover:animate-none"
      >
        <MessageCircle className="w-5 h-5" />
        {t("askNujoom")}
      </button>

      {/* ═══ Hero Section ═══ */}
      <div className="relative bg-gradient-to-br from-sam-gray-900 via-sam-gray-800 to-sam-gray-900 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 start-0 w-96 h-96 bg-sam-red/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 end-0 w-80 h-80 bg-sam-gold/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/award-selection"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              <BackArrow className="w-4 h-4" />
              {t("backButton")}
            </Link>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sam-red/20 text-sam-red-light text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                {t("awardCategory")}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              {content.title}
            </h1>
            {content.overview && (
              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
                {content.overview}
              </p>
            )}

            {/* Quick action buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href={`/award-selection/${slug}/apply` as any}
                className="inline-flex items-center gap-2 rtl:flex-row-reverse px-6 py-3 text-sm font-semibold rounded-xl bg-sam-red text-white hover:bg-sam-red-dark transition-all shadow-lg shadow-sam-red/30"
              >
                <Send className="w-5 h-5 rtl:-scale-x-100" />
                {t("applyNow")}
              </Link>
              <a
                href="#criteria"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all border border-white/10"
              >
                {t("viewCriteria")}
                <ForwardChevron className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Main Content ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Note Banner (if exists — e.g. employee categories) */}
        {content.note && (
          <div className="mb-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-sam-gold-light to-amber-50 border border-sam-gold/20 shadow-sm">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-sam-gold/20 flex items-center justify-center">
                  <Info className="w-5 h-5 text-sam-gold" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-sam-gray-900 mb-1">{t("note")}</h3>
                <p className="text-sm text-sam-gray-700 leading-relaxed">
                  {content.note}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats cards row */}
        {(content.targetAudience || totalPoints > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {content.targetAudience && (
              <div className="bg-white rounded-2xl p-6 border border-sam-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-sam-green-light flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-sam-green" />
                </div>
                <h3 className="text-xs font-semibold text-sam-gray-500 uppercase tracking-wide mb-2">
                  {t("targetAudience")}
                </h3>
                <p className="text-sm text-sam-gray-700 leading-relaxed">
                  {content.targetAudience}
                </p>
              </div>
            )}
            {totalPoints > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-sam-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-sam-red-light flex items-center justify-center mb-4">
                  <Star className="w-5 h-5 text-sam-red" />
                </div>
                <h3 className="text-xs font-semibold text-sam-gray-500 uppercase tracking-wide mb-2">
                  {t("totalPoints")}
                </h3>
                <p className="text-2xl font-bold text-sam-gray-900">
                  {totalPoints} <span className="text-sm font-medium text-sam-gray-500">{t("points")}</span>
                </p>
              </div>
            )}
            <div className="bg-white rounded-2xl p-6 border border-sam-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-sam-gold-light flex items-center justify-center mb-4">
                <Trophy className="w-5 h-5 text-sam-gold" />
              </div>
              <h3 className="text-xs font-semibold text-sam-gray-500 uppercase tracking-wide mb-2">
                {t("rewards")}
              </h3>
              <p className="text-sm text-sam-gray-700 leading-relaxed">
                {content.rewards[0]}
              </p>
            </div>
          </div>
        )}

        {/* ── Assessment Criteria Section ── */}
        <section id="criteria" className="mb-16 scroll-mt-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 rounded-full bg-sam-red" />
            <h2 className="text-xl sm:text-2xl font-bold text-sam-gray-900">
              {content.criteriaTitle}
            </h2>
          </div>

          {content.criteriaDescription && (
            <p className="text-sam-gray-500 mb-8 max-w-3xl leading-relaxed">
              {content.criteriaDescription}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {content.criteriaItems.map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-6 border border-sam-gray-100 shadow-sm hover:shadow-lg hover:border-sam-red/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-sam-gray-100 text-sm font-bold text-sam-gray-600 group-hover:bg-sam-red group-hover:text-white transition-colors">
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-sam-gray-900 text-base">
                      {item.name}
                    </h3>
                  </div>
                  {item.points && (
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-sam-red-light text-sam-red whitespace-nowrap">
                      {item.points}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-sm text-sam-gray-600 leading-relaxed mb-3">
                    {item.description}
                  </p>
                )}
                {item.subItems && item.subItems.length > 0 && (
                  <ul className="space-y-2.5 mt-4 pt-4 border-t border-sam-gray-50">
                    {item.subItems.map((sub, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-sam-gray-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sam-red mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{sub}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Subcategories (for employee categories) ── */}
        {content.subcategories && content.subcategories.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 rounded-full bg-sam-green" />
              <h2 className="text-xl sm:text-2xl font-bold text-sam-gray-900">
                {t("subcategories")}
              </h2>
            </div>

            <div className="space-y-5">
              {content.subcategories.map((sub, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-sam-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Subcategory header */}
                  <div className="bg-gradient-to-r from-sam-gray-50 to-white px-6 py-4 border-b border-sam-gray-100">
                    <h3 className="text-base font-bold text-sam-gray-900 flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-sam-red text-white text-xs font-bold">
                        {i + 1}
                      </span>
                      {sub.title}
                    </h3>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Eligibility */}
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-sam-green-light flex items-center justify-center">
                        <Award className="w-4 h-4 text-sam-green" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wide text-sam-green block mb-1">
                          {t("eligibility")}
                        </span>
                        <p className="text-sm text-sam-gray-600 leading-relaxed">
                          {sub.eligibility}
                        </p>
                      </div>
                    </div>

                    {/* Requirements */}
                    {sub.requirements && sub.requirements.length > 0 && (
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-sam-red-light flex items-center justify-center">
                          <ClipboardCheck className="w-4 h-4 text-sam-red" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wide text-sam-red block mb-1">
                            {t("requirements")}
                          </span>
                          <ul className="space-y-1.5">
                            {sub.requirements.map((req, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-2 text-sm text-sam-gray-600"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-sam-red mt-2 flex-shrink-0" />
                                <span className="leading-relaxed">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Note */}
                    {sub.note && (
                      <div className="p-4 rounded-xl bg-sam-gold-light/50 border border-sam-gold/10">
                        <p className="text-xs text-sam-gray-600 leading-relaxed">
                          <span className="font-semibold">{t("note")}: </span>
                          {sub.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Rewards Section ── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 rounded-full bg-sam-gold" />
            <h2 className="text-xl sm:text-2xl font-bold text-sam-gray-900">
              {t("rewards")}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-amber-50 via-white to-sam-gold-light rounded-2xl p-8 border border-sam-gold/20 shadow-sm">
            <div className="flex items-start gap-5">
              <div className="hidden sm:flex flex-shrink-0 w-16 h-16 rounded-2xl bg-sam-gold/10 items-center justify-center">
                <Trophy className="w-8 h-8 text-sam-gold" />
              </div>
              <ul className="space-y-3 flex-1">
                {content.rewards.map((reward, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm sm:text-base text-sam-gray-700"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sam-gold/20 flex items-center justify-center mt-0.5">
                      <Star className="w-3.5 h-3.5 text-sam-gold" />
                    </span>
                    <span className="leading-relaxed">{reward}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Bottom CTA Section ── */}
        <section className="rounded-2xl bg-gradient-to-r from-sam-gray-900 to-sam-gray-800 p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 end-0 w-64 h-64 bg-sam-red/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          </div>
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {t("readyToApply")}
              </h3>
              <p className="text-sm text-white/60 max-w-md">
                {t("ctaDescriptionDirect")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/award-selection"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white/70 hover:text-white rounded-xl border border-white/20 hover:border-white/40 transition-all"
              >
                <BackArrow className="w-4 h-4" />
                {t("backButton")}
              </Link>

              <Link
                href={`/award-selection/${slug}/apply` as any}
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-xl bg-sam-red text-white hover:bg-sam-red-dark transition-all shadow-lg shadow-sam-red/30"
              >
                {t("applyNow")}
                <Send className="w-5 h-5 rtl:-scale-x-100" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
