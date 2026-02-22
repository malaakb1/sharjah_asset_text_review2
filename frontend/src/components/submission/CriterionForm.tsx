"use client";

import { useTranslations, useLocale } from "next-intl";
import { FileText, AlertCircle } from "lucide-react";
import FileUploadArea from "./FileUploadArea";
import type { CriterionDefinition, SimulatedFile } from "@/data/submissionCriteria";

interface CriterionFormProps {
    criterion: CriterionDefinition;
    index: number;
    maxWords: number;
    maxFiles: number;
    value: { text: string; files: SimulatedFile[]; rating?: number };
    onChange: (value: { text: string; files: SimulatedFile[]; rating?: number }) => void;
    errors?: string[];
}

export default function CriterionForm({
    criterion,
    index,
    maxWords,
    maxFiles,
    value,
    onChange,
    errors,
}: CriterionFormProps) {
    const t = useTranslations("submission");
    const locale = useLocale();
    const isAr = locale === "ar";

    const wordCount = value.text.trim() ? value.text.trim().split(/\s+/).length : 0;
    const charCount = value.text.trim().length;
    const isOverLimit = maxWords > 0 && wordCount > maxWords;

    const title = isAr ? criterion.titleAr : criterion.titleEn;
    const description = isAr ? criterion.descriptionAr : criterion.descriptionEn;
    const evidenceList = isAr ? criterion.evidenceListAr : criterion.evidenceListEn;
    const examplesList = isAr ? criterion.examplesListAr : criterion.examplesListEn;
    const subCriteria = criterion.subCriteria;
    const hasErrors = errors && errors.length > 0;

    return (
        <div className={`bg-white rounded-2xl p-6 border shadow-sm transition-all ${hasErrors ? "border-red-300 ring-2 ring-red-100" : "border-sam-gray-100"
            }`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-white text-sm font-bold ${hasErrors ? "bg-red-500" : "bg-sam-red"
                        }`}>
                        {hasErrors ? <AlertCircle className="w-5 h-5" /> : index + 1}
                    </span>
                    <h3 className="font-bold text-sam-gray-900 text-base">{title}</h3>
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-sam-red-light text-sam-red whitespace-nowrap">
                    {criterion.points} {t("criteria.points")}
                </span>
            </div>

            {/* Description */}
            {description && (
                <div className="mb-4 p-4 rounded-xl bg-sam-gray-50 border border-sam-gray-100">
                    <p className="text-sm text-sam-gray-600 leading-relaxed">{description}</p>
                </div>
            )}

            {/* Sub-criteria (for project category) */}
            {subCriteria && subCriteria.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-sam-gray-500 mb-3">
                        {t("criteria.subCriteria")}
                    </h4>
                    <div className="space-y-2">
                        {subCriteria.map((sub, i) => (
                            <div key={sub.id} className="flex items-start gap-3 p-3 rounded-lg bg-sam-gray-50 border border-sam-gray-100">
                                <span className="w-5 h-5 rounded-full bg-sam-red flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5">
                                    {i + 1}
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-sam-gray-700">
                                        {isAr ? sub.titleAr : sub.titleEn}
                                    </p>
                                    {(isAr ? sub.evidenceAr : sub.evidenceEn) && (
                                        <p className="text-xs text-sam-gray-500 mt-1">
                                            <FileText className="w-3 h-3 inline-block me-1" />
                                            {isAr ? sub.evidenceAr : sub.evidenceEn}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Evidence list / Indicators — with optional Examples two-column */}
            {examplesList && examplesList.length > 0 ? (
                <div className="mb-5">
                    <div className="rounded-xl border border-gray-200 overflow-hidden">
                        {/* Two-column grid: Evidence | Arrow | Examples */}
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
                            {/* Evidence Column */}
                            <div>
                                <div className="bg-[#2E5F8A] text-white text-center font-bold py-2.5 text-sm tracking-wide">
                                    {t("criteria.evidenceHeader")}
                                </div>
                                <ul className="p-4 space-y-3">
                                    {evidenceList.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-sam-gray-700">
                                            <span className="text-[#2E5F8A] mt-0.5 flex-shrink-0 font-bold">➢</span>
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Arrow Column */}
                            <div className="hidden md:flex items-center justify-center px-1 bg-gradient-to-b from-gray-50 to-gray-100">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={`text-[#2E5F8A] ${isAr ? 'rotate-180' : ''}`}>
                                    <path d="M8 20H30M30 20L22 12M30 20L22 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            {/* Arrow for mobile (horizontal separator) */}
                            <div className="flex md:hidden items-center justify-center py-2 bg-gray-50">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={`text-[#2E5F8A] ${isAr ? '-rotate-90' : 'rotate-90'}`}>
                                    <path d="M6 16H26M26 16L18 8M26 16L18 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            {/* Examples Column */}
                            <div>
                                <div className="bg-[#2E5F8A] text-white text-center font-bold py-2.5 text-sm tracking-wide">
                                    {t("criteria.examplesHeader")}
                                </div>
                                <ul className="p-4 space-y-3">
                                    {examplesList.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-sam-gray-700">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#2E5F8A] mt-2 flex-shrink-0" />
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ) : evidenceList.length > 0 ? (
                <div className="mb-5">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-sam-gray-500 mb-3">
                        {criterion.ratingScale
                            ? (isAr ? "المؤشرات" : "Indicators")
                            : t("criteria.evidence")}
                    </h4>
                    <ul className="space-y-1.5">
                        {evidenceList.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-sam-gray-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-sam-red mt-2 flex-shrink-0" />
                                <span className="leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {/* Rating Scale (for unsung hero) */}
            {criterion.ratingScale && (
                <div className="mb-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-sam-gray-500">
                            {isAr ? criterion.ratingScale.minLabelAr : criterion.ratingScale.minLabelEn}
                        </span>
                        <span className="text-xs font-semibold text-sam-gray-500">
                            {isAr ? criterion.ratingScale.maxLabelAr : criterion.ratingScale.maxLabelEn}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        {Array.from({ length: criterion.ratingScale.max - criterion.ratingScale.min + 1 }, (_, i) => {
                            const rVal = criterion.ratingScale!.min + i;
                            const isSelected = value.rating === rVal;
                            return (
                                <button
                                    key={rVal}
                                    type="button"
                                    onClick={() => onChange({ ...value, rating: rVal })}
                                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold border-2 transition-all cursor-pointer ${
                                        isSelected
                                            ? rVal <= 3
                                                ? "border-red-400 bg-red-50 text-red-600"
                                                : rVal <= 6
                                                    ? "border-sam-gold bg-sam-gold-light text-sam-gold"
                                                    : "border-sam-green bg-sam-green-light text-sam-green"
                                            : "border-sam-gray-200 text-sam-gray-500 hover:border-sam-gray-300"
                                    }`}
                                >
                                    {rVal}
                                </button>
                            );
                        })}
                    </div>
                    {value.rating != null && (
                        <p className="text-center mt-2 text-sm font-medium text-sam-gray-600">
                            {isAr ? "التقييم:" : "Rating:"} {value.rating} / {criterion.ratingScale.max}
                        </p>
                    )}
                </div>
            )}

            {/* Textarea */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-sam-gray-700 mb-2">
                    {criterion.justificationLabelAr
                        ? (isAr ? criterion.justificationLabelAr : criterion.justificationLabelEn)
                        : t("criteria.responseLabel")}
                </label>
                <textarea
                    value={value.text}
                    onChange={(e) => onChange({ ...value, text: e.target.value })}
                    rows={6}
                    className={`w-full bg-sam-gray-50 border-2 rounded-xl px-4 py-3.5 text-sm text-sam-gray-900 outline-none transition-all resize-y ${isOverLimit
                        ? "border-sam-red focus:border-sam-red focus:ring-2 focus:ring-sam-red/20"
                        : "border-sam-gray-200 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20"
                        }`}
                    placeholder={t("criteria.responsePlaceholder")}
                />
                <div className="flex justify-between mt-1">
                    <span className="text-xs font-medium text-sam-gray-400">
                        {charCount} {t("criteria.characters")}
                    </span>
                    <span className={`text-xs font-medium ${isOverLimit ? "text-sam-red" : "text-sam-gray-400"}`}>
                        {maxWords > 0
                            ? `${wordCount} / ${maxWords} ${t("criteria.words")}`
                            : `${wordCount} ${t("criteria.words")}`}
                    </span>
                </div>
            </div>

            {/* File Upload */}
            <div>
                <label className="block text-sm font-medium text-sam-gray-700 mb-2">
                    {t("criteria.attachments")}
                    {maxFiles > 0 && (
                        <span className="text-xs text-sam-gray-400 font-normal ms-2">
                            ({t("criteria.maxFilesLabel", { max: maxFiles })})
                        </span>
                    )}
                </label>
                <FileUploadArea
                    files={value.files}
                    onChange={(files) => onChange({ ...value, files })}
                    maxFiles={maxFiles}
                />
            </div>

            {/* Inline validation errors */}
            {hasErrors && (
                <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200">
                    <ul className="space-y-1">
                        {errors!.map((err, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-red-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                                {err}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
