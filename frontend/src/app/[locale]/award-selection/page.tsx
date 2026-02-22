"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import {
  Building2,
  User,
  Rocket,
  Globe2,
  BookOpen,
  CheckCircle,
  Users,
  Briefcase,
} from "lucide-react";

type CategoryKey = "department" | "employee" | "project" | "green" | "knowledge";

const categoryIcons: Record<CategoryKey, typeof User> = {
  department: Building2,
  employee: User,
  project: Rocket,
  green: Globe2,
  knowledge: BookOpen,
};

const categoryKeys: CategoryKey[] = [
  "department",
  "employee",
  "project",
  "green",
  "knowledge",
];

type EmployeeGroup = "nonsupervisory" | "supervisory";

export default function AwardSelectionPage() {
  const t = useTranslations("awardSelection");
  const locale = useLocale();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<EmployeeGroup | null>(null);

  const handleCategorySelect = (key: CategoryKey) => {
    if (selectedCategory === key) {
      setSelectedCategory(null);
      setSelectedGroup(null);
      return;
    }
    setSelectedCategory(key);
    setSelectedGroup(null);
  };

  const isSelectionComplete =
    selectedCategory !== null &&
    (selectedCategory !== "employee" || selectedGroup !== null);

  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = () => {
    if (!selectedCategory || isLoading) return;
    setIsLoading(true);

    if (selectedCategory === "employee" && selectedGroup) {
      router.push(`/award-selection/employee-${selectedGroup}` as any);
    } else if (selectedCategory !== "employee") {
      router.push(`/award-selection/${selectedCategory}` as any);
    }
    // We don't set isLoading(false) because we are navigating away.
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-sam-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sam-gray-900 mb-4">
            {t("pageTitle")}
          </h1>
          <p className="text-sam-gray-500 max-w-2xl mx-auto">
            {t("pageSubtitle")}
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {categoryKeys.map((key) => {
            const Icon = categoryIcons[key];
            const isSelected = selectedCategory === key;
            return (
              <button
                key={key}
                onClick={() => handleCategorySelect(key)}
                className={`relative group text-start p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${isSelected
                  ? "border-sam-red bg-white shadow-lg shadow-sam-red/10"
                  : "border-sam-gray-200 bg-white hover:border-sam-red/30 hover:shadow-md"
                  }`}
              >
                {/* Selected checkmark */}
                {isSelected && (
                  <CheckCircle className="absolute top-4 end-4 w-6 h-6 text-sam-red" />
                )}

                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-colors ${isSelected
                    ? "bg-sam-red text-white"
                    : "bg-sam-gray-100 text-sam-gray-500 group-hover:bg-sam-red-light group-hover:text-sam-red"
                    }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-semibold text-sam-gray-900 mb-2">
                  {t(`categories.${key}.title`)}
                </h3>
                <p className="text-sm text-sam-gray-500 leading-relaxed">
                  {t(`categories.${key}.description`)}
                </p>
              </button>
            );
          })}
        </div>

        {/* Employee Group Selection */}
        {selectedCategory === "employee" && (
          <div className="max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="block text-sm font-medium text-sam-gray-700 mb-4 text-center">
              {t("selectGroup")}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Non-Supervisory */}
              <button
                onClick={() => setSelectedGroup("nonsupervisory")}
                className={`relative flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer text-start ${selectedGroup === "nonsupervisory"
                  ? "border-sam-red bg-white shadow-lg shadow-sam-red/10"
                  : "border-sam-gray-200 bg-white hover:border-sam-red/30 hover:shadow-md"
                  }`}
              >
                {selectedGroup === "nonsupervisory" && (
                  <CheckCircle className="absolute top-3 end-3 w-5 h-5 text-sam-red" />
                )}
                <div
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0 ${selectedGroup === "nonsupervisory"
                    ? "bg-sam-red text-white"
                    : "bg-sam-gray-100 text-sam-gray-500"
                    }`}
                >
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sam-gray-900 text-sm">
                    {t("nonSupervisory")}
                  </h4>
                </div>
              </button>

              {/* Supervisory */}
              <button
                onClick={() => setSelectedGroup("supervisory")}
                className={`relative flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer text-start ${selectedGroup === "supervisory"
                  ? "border-sam-red bg-white shadow-lg shadow-sam-red/10"
                  : "border-sam-gray-200 bg-white hover:border-sam-red/30 hover:shadow-md"
                  }`}
              >
                {selectedGroup === "supervisory" && (
                  <CheckCircle className="absolute top-3 end-3 w-5 h-5 text-sam-red" />
                )}
                <div
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0 ${selectedGroup === "supervisory"
                    ? "bg-sam-red text-white"
                    : "bg-sam-gray-100 text-sam-gray-500"
                    }`}
                >
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sam-gray-900 text-sm">
                    {t("supervisory")}
                  </h4>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Select Button */}
        <div className="text-center">
          <button
            disabled={!isSelectionComplete || isLoading}
            onClick={handleNavigate}
            className={`inline-flex items-center justify-center px-10 py-3.5 text-sm font-medium rounded-lg transition-all duration-200 min-w-[200px] ${isSelectionComplete && !isLoading
              ? "bg-sam-red text-white hover:bg-sam-red-dark shadow-lg shadow-sam-red/25 cursor-pointer"
              : "bg-sam-gray-200 text-sam-gray-400 cursor-not-allowed"
              }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {t("selectCategory")}<span className="ms-2 rtl:-scale-x-100">→</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
