"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  eligibilityData,
  getEligibilityBySlug,
  type EligibilityCategory,
  type EligibilityQuestion,
} from "@/data/eligibilityData";
import { useAuth } from "@/context/AuthContext";

/* Subcategory options for employee categories */
const nonSupervisorySubcats = [
  { key: "administrative", ar: "الموظف الإداري المتميز", en: "Distinguished Administrative Employee" },
  { key: "specialist", ar: "الموظف التخصصي المتميز", en: "Distinguished Specialized Employee" },
  { key: "technical", ar: "الموظف الفني الميداني المتميز", en: "Distinguished Technical Field Employee" },
  { key: "customerservice", ar: "موظف خدمة المتعاملين المتميز", en: "Distinguished Customer Service Employee" },
  { key: "unsung", ar: "الجندي المجهول المتميز", en: "Distinguished Unknown Soldier" },
];

const supervisorySubcats = [
  { key: "leader", ar: "القائد المتميز", en: "Distinguished Leader" },
  { key: "futureleader", ar: "قائد المستقبل المتميز", en: "Distinguished Future Leader" },
];

export default function EligibilityPage() {
  const t = useTranslations("eligibilityCheck");
  const td = useTranslations("categoryDetails");
  const locale = useLocale();
  const params = useParams();
  const slug = params.category as string;
  const { user } = useAuth();

  const isAr = locale === "ar";
  const BackArrow = isAr ? ArrowRightIcon : ArrowLeftIcon;

  // Determine if we need a subcategory selector
  const isEmployeeNonSup = slug === "employee-nonsupervisory";
  const isEmployeeSup = slug === "employee-supervisory";
  const isEmployee = isEmployeeNonSup || isEmployeeSup;
  const subcatOptions = isEmployeeNonSup
    ? (user?.isDirector
      ? nonSupervisorySubcats
      : nonSupervisorySubcats.filter((s) => s.key !== "unsung"))
    : isEmployeeSup
    ? supervisorySubcats
    : [];

  const [selectedSubcat, setSelectedSubcat] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const [submitted, setSubmitted] = useState(false);

  // Resolve the full eligibility slug
  const eligibilitySlug = useMemo(() => {
    if (!isEmployee) return slug; // e.g. "project"
    if (!selectedSubcat) return null;
    return `${slug}-${selectedSubcat}`; // e.g. "employee-nonsupervisory-administrative"
  }, [slug, isEmployee, selectedSubcat]);

  const eligibility: EligibilityCategory | null = useMemo(() => {
    if (!eligibilitySlug) return null;
    return getEligibilityBySlug(eligibilitySlug);
  }, [eligibilitySlug]);

  // Reset answers when subcategory changes
  const handleSubcatChange = (val: string) => {
    setSelectedSubcat(val);
    setAnswers({});
    setSubmitted(false);
  };

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: value };
      // Clear child sub-question answers when parent changes
      if (eligibility) {
        for (const q of eligibility.questions) {
          if (q.parentId === questionId) {
            next[q.id] = null;
          }
        }
      }
      return next;
    });
  };

  // Determine which questions are visible (sub-questions only when parent answered correctly)
  const visibleQuestions = useMemo(() => {
    if (!eligibility) return [];
    return eligibility.questions.filter((q) => {
      if (!q.parentId) return true;
      return answers[q.parentId] === q.parentAnswer;
    });
  }, [eligibility, answers]);

  // Helper: check if a question's answer is acceptable
  const isAcceptable = (q: EligibilityQuestion, answer: string | null) => {
    if (answer == null) return null; // not answered
    if (answer === q.acceptableAnswer) return true;
    if (q.extraOptions) {
      const opt = q.extraOptions.find((o) => o.value === answer);
      if (opt?.acceptable) return true;
    }
    return false;
  };

  // Validate: check all visible questions answered and no violations
  const allAnswered =
    visibleQuestions.length > 0 &&
    visibleQuestions.every((q) => answers[q.id] != null);

  const violations = useMemo(() => {
    return visibleQuestions.filter(
      (q) => answers[q.id] != null && !isAcceptable(q, answers[q.id])
    );
  }, [visibleQuestions, answers]);

  const canSubmit = allAnswered && violations.length === 0;

  const handleSubmit = () => {
    if (canSubmit) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-sam-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sam-green-light mb-6">
            <CheckCircleIcon className="w-10 h-10 text-sam-green" />
          </div>
          <h1 className="text-2xl font-bold text-sam-gray-900 mb-3">
            {t("successTitle")}
          </h1>
          <p className="text-sam-gray-500 mb-8 leading-relaxed">
            {t("successMessage")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/award-selection/${slug}/apply` as any}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-sam-red text-white rounded-lg hover:bg-sam-red-dark transition-all shadow-lg shadow-sam-red/25"
            >
              ابدأ التقديم
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium bg-white text-sam-gray-700 border-2 border-sam-gray-200 rounded-lg hover:border-sam-red hover:text-sam-red transition-all"
            >
              العودة للموقع
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-sam-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Back */}
        <Link
          href={`/award-selection/${slug}` as any}
          className="inline-flex items-center gap-2 text-sm font-medium text-sam-gray-600 hover:text-sam-red transition-colors mb-8"
        >
          <BackArrow className="w-4 h-4" />
          {td("backButton")}
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-sam-gray-900 mb-3">
            {t("pageTitle")}
          </h1>
          <p className="text-sam-gray-500 max-w-xl mx-auto">
            {t("pageSubtitle")}
          </p>
        </div>

        {/* Subcategory selector for employee categories */}
        {isEmployee && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-sam-gray-700 mb-2">
              {t("selectSubcategory")}
            </label>
            <div className="relative">
              <select
                value={selectedSubcat}
                onChange={(e) => handleSubcatChange(e.target.value)}
                className="w-full appearance-none bg-white border-2 border-sam-gray-200 rounded-xl px-4 py-3.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all cursor-pointer"
              >
                <option value="">{t("selectSubcategory")}</option>
                {subcatOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {isAr ? opt.ar : opt.en}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute top-1/2 -translate-y-1/2 end-4 w-5 h-5 text-sam-gray-400 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Questions */}
        {eligibility && (
          <div className="space-y-6">
            {eligibility.subcategoryLabel && (
              <div className="text-center mb-4">
                <span className="inline-block bg-sam-red-light text-sam-red text-sm font-semibold px-4 py-1.5 rounded-full">
                  {isAr
                    ? eligibility.subcategoryLabel.ar
                    : eligibility.subcategoryLabel.en}
                </span>
              </div>
            )}

            {visibleQuestions.map((q, i) => {
              const answer = answers[q.id];
              const hasViolation =
                answer != null && !isAcceptable(q, answer);
              const isSubQuestion = !!q.parentId;

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-xl p-6 border-2 transition-colors ${
                    isSubQuestion ? "ms-8 border-s-4 border-s-sam-gold/40" : ""
                  } ${
                    hasViolation
                      ? "border-red-400 shadow-red-50 shadow-md"
                      : answer != null
                      ? "border-sam-green/30"
                      : "border-sam-gray-100"
                  }`}
                >
                  <p className="text-sm font-medium text-sam-gray-900 mb-4">
                    {!isSubQuestion && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sam-gray-100 text-xs font-bold text-sam-gray-600 me-2">
                        {eligibility!.questions.filter((eq, idx) => !eq.parentId && eligibility!.questions.indexOf(eq) <= eligibility!.questions.indexOf(q)).length}
                      </span>
                    )}
                    {isSubQuestion && (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-sam-gold-light text-xs font-bold text-sam-gold me-2">
                        ↳
                      </span>
                    )}
                    {isAr ? q.textAr : q.textEn}
                  </p>

                  <div className="flex gap-3 flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleAnswer(q.id, "yes")}
                      className={`flex-1 min-w-[80px] py-2.5 rounded-lg text-sm font-medium border-2 transition-all cursor-pointer ${
                        answer === "yes"
                          ? "border-sam-green bg-sam-green-light text-sam-green"
                          : "border-sam-gray-200 text-sam-gray-600 hover:border-sam-green/40"
                      }`}
                    >
                      {t("yes")}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAnswer(q.id, "no")}
                      className={`flex-1 min-w-[80px] py-2.5 rounded-lg text-sm font-medium border-2 transition-all cursor-pointer ${
                        answer === "no"
                          ? "border-red-500 bg-red-50 text-red-600"
                          : "border-sam-gray-200 text-sam-gray-600 hover:border-red-300"
                      }`}
                    >
                      {t("no")}
                    </button>
                    {q.extraOptions?.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleAnswer(q.id, opt.value)}
                        className={`flex-1 min-w-[80px] py-2.5 rounded-lg text-sm font-medium border-2 transition-all cursor-pointer ${
                          answer === opt.value
                            ? "border-sam-green bg-sam-green-light text-sam-green"
                            : "border-sam-gray-200 text-sam-gray-600 hover:border-sam-green/40"
                        }`}
                      >
                        {isAr ? opt.labelAr : opt.labelEn}
                      </button>
                    ))}
                  </div>

                  {/* Red error message */}
                  {hasViolation && (
                    <div className="mt-3 flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600 leading-relaxed">
                        {isAr ? q.errorAr : q.errorEn}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Submit */}
            <div className="pt-4">
              <button
                type="button"
                disabled={!canSubmit}
                onClick={handleSubmit}
                className={`w-full py-3.5 rounded-lg text-sm font-semibold transition-all ${
                  canSubmit
                    ? "bg-sam-red text-white hover:bg-sam-red-dark shadow-lg shadow-sam-red/25 cursor-pointer"
                    : "bg-sam-gray-200 text-sam-gray-400 cursor-not-allowed"
                }`}
              >
                {t("submit")}
              </button>
            </div>
          </div>
        )}

        {/* Show prompt if employee but no subcategory selected yet */}
        {isEmployee && !selectedSubcat && (
          <div className="text-center py-12 text-sam-gray-400">
            <ExclamationTriangleIcon className="w-10 h-10 mx-auto mb-3 text-sam-gray-300" />
            <p className="text-sm">{t("selectSubcategory")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
