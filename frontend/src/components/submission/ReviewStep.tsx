"use client";

import { useTranslations, useLocale } from "next-intl";
import { Pencil, FileText } from "lucide-react";
import type { CriterionDefinition, SubmissionFormData } from "@/data/submissionCriteria";

interface ReviewStepProps {
    criteria: CriterionDefinition[];
    formData: SubmissionFormData;
    confirmed: boolean;
    onConfirmedChange: (v: boolean) => void;
    onEditCriteria: () => void;
}

export default function ReviewStep({
    criteria,
    formData,
    confirmed,
    onConfirmedChange,
    onEditCriteria,
}: ReviewStepProps) {
    const t = useTranslations("submission");
    const locale = useLocale();
    const isAr = locale === "ar";

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-bold text-sam-gray-900">{t("reviewTitle")}</h2>
                    <p className="text-sm text-sam-gray-500 mt-1">{t("reviewSubtitle")}</p>
                </div>
                <button
                    type="button"
                    onClick={onEditCriteria}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-sam-red hover:underline cursor-pointer"
                >
                    <Pencil className="w-4 h-4" />
                    {t("reviewEdit")}
                </button>
            </div>

            <div className="space-y-4">
                {criteria.map((criterion, index) => {
                    const response = formData.criteriaResponses[criterion.id];
                    const text = response?.text ?? "";
                    const files = response?.files ?? [];
                    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

                    return (
                        <div
                            key={criterion.id}
                            className="bg-white rounded-2xl p-5 border border-sam-gray-100 shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-sam-red text-xs font-bold text-white">
                                    {index + 1}
                                </span>
                                <h3 className="font-semibold text-sam-gray-900 text-sm">
                                    {isAr ? criterion.titleAr : criterion.titleEn}
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-4 text-xs text-sam-gray-500">
                                <span className="flex items-center gap-1.5">
                                    <FileText className="w-4 h-4" />
                                    {wordCount} {t("criteria.words")}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    📎 {files.length} {t("review.files")}
                                </span>
                            </div>
                            {text && (
                                <p className="mt-3 text-sm text-sam-gray-600 leading-relaxed line-clamp-3">
                                    {text}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Confirmation checkbox */}
            <div className="bg-white rounded-2xl p-5 border border-sam-gray-100 shadow-sm">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={confirmed}
                        onChange={(e) => onConfirmedChange(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-sam-red cursor-pointer"
                    />
                    <span className="text-sm text-sam-gray-700 leading-relaxed">
                        {t("review.confirmationText")}
                    </span>
                </label>
            </div>
        </div>
    );
}
