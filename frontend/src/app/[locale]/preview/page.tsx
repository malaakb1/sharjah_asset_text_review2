"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Building2,
  Rocket,
  Globe2,
  BookOpen,
  Users,
  Briefcase,
  Eye,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ── Non-employee categories ── */
const mainCategories = [
  {
    slug: "department",
    icon: Building2,
    titleAr: "فئة الإدارة المتميزة",
    titleEn: "Distinguished Department",
    descAr: "تكريم الوحدات التنظيمية التي تُظهر تميّزاً في الأداء وفق نموذج EFQM 2025.",
    descEn: "Recognizes organizational units demonstrating excellence in performance (EFQM 2025 Model).",
  },
  {
    slug: "project",
    icon: Rocket,
    titleAr: "فئة المشروع / المبادرة المتميزة",
    titleEn: "Distinguished Project / Initiative",
    descAr: "تكريم الإنجازات المهمة في مشاريع أو مبادرات محددة بأدلة موضوعية.",
    descEn: "Recognizes significant achievements in specific projects or initiatives backed by evidence.",
  },
  {
    slug: "green",
    icon: Globe2,
    titleAr: "فئة الممارسات الخضراء",
    titleEn: "Green Practices",
    descAr: "تكريم الأقسام التي تطبق ممارسات صديقة للبيئة وتعزز الاستدامة.",
    descEn: "Recognizes departments implementing environmentally friendly practices and promoting sustainability.",
  },
  {
    slug: "knowledge",
    icon: BookOpen,
    titleAr: "فئة إدارة المعرفة",
    titleEn: "Knowledge Management",
    descAr: "تشجيع أفضل الممارسات في إدارة المعرفة وتعزيز ثقافة التعلم المستمر.",
    descEn: "Encourages best practices in Knowledge Management and fostering a culture of continuous learning.",
  },
];

/* ── Employee groups and their subcategories ── */
const employeeGroups = [
  {
    slug: "employee-nonsupervisory",
    icon: Users,
    titleAr: "الموظف المتميز — الفئات غير الإشرافية",
    titleEn: "Distinguished Employee — Non-Supervisory",
    subcategories: [
      { key: "administrative", ar: "الموظف الإداري المتميز", en: "The Distinguished Administrative Employee" },
      { key: "specialist", ar: "الموظف التخصصي المتميز", en: "The Distinguished Specialized Employee" },
      { key: "technical", ar: "الموظف الفني الميداني المتميز", en: "The Distinguished Technical Field Employee" },
      { key: "customerservice", ar: "موظف خدمة المتعاملين المتميز", en: "The Distinguished Customer Service Employee" },
      { key: "unsung", ar: "الجندي المجهول المتميز", en: "The Distinguished Unknown Soldier" },
    ],
  },
  {
    slug: "employee-supervisory",
    icon: Briefcase,
    titleAr: "الموظف المتميز — الفئات الإشرافية",
    titleEn: "Distinguished Employee — Supervisory",
    subcategories: [
      { key: "leader", ar: "القائد المتميز", en: "The Distinguished Leader" },
      { key: "futureleader", ar: "قائد المستقبل المتميز", en: "The Distinguished Future Leader" },
    ],
  },
];

export default function PreviewPage() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  // Track which employee group is expanded
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const toggleGroup = (slug: string) => {
    setExpandedGroup((prev) => (prev === slug ? null : slug));
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-sam-gray-50">
      {/* Preview Banner */}
      <div className="bg-sam-gold/10 border-b-2 border-sam-gold/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-2">
            <Eye className="w-4 h-4 text-sam-gold shrink-0" />
            <p className="text-sm font-medium text-sam-gray-700 text-center">
              {isAr
                ? "وضع الاستعراض — هذه الصفحة لعرض محتوى نماذج التقديم للمراجعة فقط، لا يتم إرسال أي بيانات"
                : "Preview Mode — This page is for reviewing application form content only. No data will be submitted."}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sam-red-light mb-5">
            <Eye className="w-7 h-7 text-sam-red" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sam-gray-900 mb-4">
            {isAr ? "استعراض نماذج التقديم" : "Application Forms Preview"}
          </h1>
          <p className="text-sam-gray-500 max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? "اختر الفئة التي تريد الاطلاع على نموذج التقديم الخاص بها. يمكنك التنقل بحرية دون الحاجة للتسجيل."
              : "Select a category to view its application form. You can navigate freely without registration."}
          </p>
        </div>

        {/* ── Main (non-employee) Categories ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
          {mainCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/award-selection/${cat.slug}/submission?preview=1` as any}
                className="group relative bg-white rounded-2xl border-2 border-sam-gray-200 p-6 hover:border-sam-red/50 hover:shadow-xl hover:shadow-sam-red/5 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sam-gray-100 text-sam-gray-500 group-hover:bg-sam-red-light group-hover:text-sam-red shrink-0 transition-colors duration-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-sam-gray-900 mb-1 leading-snug">
                      {isAr ? cat.titleAr : cat.titleEn}
                    </h3>
                    <p className="text-sm text-sam-gray-500 leading-relaxed">
                      {isAr ? cat.descAr : cat.descEn}
                    </p>
                  </div>
                  <div className="shrink-0 self-center text-sam-red group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                    {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── Employee Categories (expandable) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {employeeGroups.map((group) => {
            const Icon = group.icon;
            const isExpanded = expandedGroup === group.slug;

            return (
              <div
                key={group.slug}
                className={`bg-white rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? "border-sam-red shadow-lg shadow-sam-red/10"
                    : "border-sam-gray-200 hover:border-sam-red/40 hover:shadow-md"
                }`}
              >
                {/* Group Header — clickable toggle */}
                <button
                  type="button"
                  onClick={() => toggleGroup(group.slug)}
                  className="w-full text-start p-6 flex items-center gap-4 cursor-pointer"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl shrink-0 transition-colors duration-200 ${
                      isExpanded
                        ? "bg-sam-red text-white"
                        : "bg-sam-gray-100 text-sam-gray-500"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-sam-gray-900 leading-snug">
                      {isAr ? group.titleAr : group.titleEn}
                    </h3>
                    <p className="text-xs text-sam-gray-400 mt-0.5">
                      {isAr
                        ? `${group.subcategories.length} فئات فرعية — اضغط للاختيار`
                        : `${group.subcategories.length} subcategories — click to select`}
                    </p>
                  </div>
                  <div className={`shrink-0 transition-colors ${isExpanded ? "text-sam-red" : "text-sam-gray-400"}`}>
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Subcategories — shown when expanded */}
                {isExpanded && (
                  <div className="px-6 pb-5 border-t border-sam-gray-100">
                    <p className="text-xs font-semibold text-sam-gray-400 uppercase tracking-wide mt-4 mb-3">
                      {isAr ? "اختر الفئة الفرعية" : "Select Subcategory"}
                    </p>
                    <div className="flex flex-col gap-2">
                      {group.subcategories.map((sub) => (
                        <Link
                          key={sub.key}
                          href={`/award-selection/${group.slug}/submission?preview=1&subcat=${sub.key}` as any}
                          className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-sam-gray-200 bg-sam-gray-50 hover:border-sam-red hover:bg-sam-red-light/30 hover:text-sam-red transition-all duration-150"
                        >
                          <span className="text-sm font-medium text-sam-gray-800 group-hover:text-sam-red">
                            {isAr ? sub.ar : sub.en}
                          </span>
                          {isAr ? <ArrowLeft className="w-4 h-4 text-sam-gray-400 group-hover:text-sam-red shrink-0" /> : <ArrowRight className="w-4 h-4 text-sam-gray-400 group-hover:text-sam-red shrink-0" />}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-sam-gray-500 hover:text-sam-red transition-colors"
          >
            <BackArrow className="w-4 h-4" />
            {isAr ? "العودة للصفحة الرئيسية" : "Back to Home"}
          </Link>
        </div>
      </div>
    </div>
  );
}
