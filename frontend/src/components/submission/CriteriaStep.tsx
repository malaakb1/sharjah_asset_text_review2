"use client";

import { useTranslations, useLocale } from "next-intl";
import CriterionForm from "./CriterionForm";
import DosAndDontsPanel from "./DosAndDontsPanel";
import type { CriterionDefinition, SubmissionFormData, SimulatedFile } from "@/data/submissionCriteria";

interface CriteriaStepProps {
    criteria: CriterionDefinition[];
    maxWords: number;
    maxFiles: number;
    totalPoints: number;
    formData: SubmissionFormData;
    onUpdate: (updates: Partial<SubmissionFormData>) => void;
    errors?: Record<string, string[]>;
}

export default function CriteriaStep({
    criteria,
    maxWords,
    maxFiles,
    totalPoints,
    formData,
    onUpdate,
    errors = {},
}: CriteriaStepProps) {
    const t = useTranslations("submission");
    const locale = useLocale();

    const handleCriterionChange = (
        criterionId: string,
        val: { text: string; files: SimulatedFile[]; rating?: number }
    ) => {
        onUpdate({
            criteriaResponses: {
                ...formData.criteriaResponses,
                [criterionId]: val,
            },
        });
    };

    const enablers = criteria.filter((c) => c.group === "enablers");
    const results = criteria.filter((c) => c.group === "results");
    const hasGroups = enablers.length > 0 && results.length > 0;

    const renderCriteria = (items: CriterionDefinition[], startIndex: number) =>
        items.map((criterion, i) => (
            <CriterionForm
                key={criterion.id}
                criterion={criterion}
                index={startIndex + i}
                maxWords={maxWords}
                maxFiles={maxFiles}
                value={formData.criteriaResponses[criterion.id] ?? { text: "", files: [] }}
                onChange={(val) => handleCriterionChange(criterion.id, val)}
                errors={errors[criterion.id]}
            />
        ));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-sam-gray-900">{t("criteriaTitle")}</h2>
                {totalPoints > 0 && (
                    <span className="text-sm font-semibold text-sam-gray-500">
                        {totalPoints} {t("criteria.totalPoints")}
                    </span>
                )}
            </div>

            <DosAndDontsPanel />

            {hasGroups ? (
                <>
                    <div>
                        <h3 className="text-base font-bold text-sam-green mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 rounded-full bg-sam-green" />
                            {t("criteria.enablersGroup")}
                        </h3>
                        <div className="space-y-6">{renderCriteria(enablers, 0)}</div>
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-sam-gold mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 rounded-full bg-sam-gold" />
                            {t("criteria.resultsGroup")}
                        </h3>
                        <div className="space-y-6">{renderCriteria(results, enablers.length)}</div>
                    </div>
                </>
            ) : (
                <div className="space-y-6">{renderCriteria(criteria, 0)}</div>
            )}
        </div>
    );
}
