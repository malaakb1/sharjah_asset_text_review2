"use client";

import { useTranslations, useLocale } from "next-intl";
import { Sparkles, BadgeCheck } from "lucide-react";
import { categoryContent } from "@/data/categoryContent";
import { employeeSubcategories, type SubmissionFormData } from "@/data/submissionCriteria";

interface IntroStepProps {
    slug: string;
    formData: SubmissionFormData;
    onUpdate: (updates: Partial<SubmissionFormData>) => void;
    resolvedSubcategory?: string;
}

export default function IntroStep({ slug, resolvedSubcategory }: IntroStepProps) {
    const t = useTranslations("submission");
    const locale = useLocale();
    const isAr = locale === "ar";

    const content = categoryContent[slug]?.[isAr ? "ar" : "en"];

    // Show the auto-detected subcategory label for employee categories
    let detectedSubLabel: string | null = null;
    if (slug.startsWith("employee-") && resolvedSubcategory) {
        const group = slug === "employee-supervisory" ? "supervisory" : "nonsupervisory";
        const match = employeeSubcategories[group]?.find((s) => s.value === resolvedSubcategory);
        if (match) detectedSubLabel = isAr ? match.labelAr : match.labelEn;
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-sam-gray-100 shadow-sm text-center">
                <div className="w-16 h-16 rounded-2xl bg-sam-red-light flex items-center justify-center mx-auto mb-5">
                    <Sparkles className="w-8 h-8 text-sam-red" />
                </div>
                <h2 className="text-xl font-bold text-sam-gray-900 mb-3">
                    {content?.title ?? t("introTitle")}
                </h2>
                {content?.overview && (
                    <p className="text-sm text-sam-gray-600 leading-relaxed max-w-2xl mx-auto mb-4">
                        {content.overview}
                    </p>
                )}
                {detectedSubLabel && (
                    <div className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-full bg-sam-green-light text-sam-green text-sm font-semibold">
                        <BadgeCheck className="w-5 h-5" />
                        {detectedSubLabel}
                    </div>
                )}
                <p className="text-sm text-sam-gray-500 mt-3">
                    {t("introDescription")}
                </p>
            </div>
        </div>
    );
}
