"use client";

import { useTranslations, useLocale } from "next-intl";
import type { ExtraInfoField, SubmissionFormData } from "@/data/submissionCriteria";

interface InfoStepProps {
    extraFields: ExtraInfoField[];
    formData: SubmissionFormData;
    onUpdate: (updates: Partial<SubmissionFormData>) => void;
}

const inputClassName =
    "w-full bg-sam-gray-50 border-2 border-sam-gray-200 rounded-xl px-4 py-3 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all";

export default function InfoStep({ extraFields, formData, onUpdate }: InfoStepProps) {
    const t = useTranslations("submission");
    const locale = useLocale();
    const isAr = locale === "ar";

    const updateField = (field: string, value: string) => {
        onUpdate({ [field]: value } as Partial<SubmissionFormData>);
    };

    const updateExtra = (id: string, value: string) => {
        onUpdate({ extraFields: { ...formData.extraFields, [id]: value } });
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-sam-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-sam-gray-900 mb-1">{t("info.personalTitle")}</h2>
                <p className="text-sm text-sam-gray-500 mb-6">{t("info.personalSubtitle")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-sam-gray-700 mb-1.5">
                            {t("info.fullName")} <span className="text-sam-red">*</span>
                        </label>
                        <input type="text" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} className={inputClassName} placeholder={t("info.fullNamePlaceholder")} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sam-gray-700 mb-1.5">
                            {t("info.employeeId")} <span className="text-sam-red">*</span>
                        </label>
                        <input type="text" value={formData.employeeId} onChange={(e) => updateField("employeeId", e.target.value)} className={inputClassName} placeholder={t("info.employeeIdPlaceholder")} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sam-gray-700 mb-1.5">
                            {t("info.email")} <span className="text-sam-red">*</span>
                        </label>
                        <input type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} className={inputClassName} placeholder={t("info.emailPlaceholder")} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sam-gray-700 mb-1.5">
                            {t("info.phone")} <span className="text-sam-red">*</span>
                        </label>
                        <input type="tel" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} className={inputClassName} placeholder={t("info.phonePlaceholder")} />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-sam-gray-700 mb-1.5">
                        {t("info.nominationReason")} <span className="text-sam-red">*</span>
                    </label>
                    <textarea value={formData.nominationReason} onChange={(e) => updateField("nominationReason", e.target.value)} rows={4} className={inputClassName + " resize-y"} placeholder={t("info.nominationReasonPlaceholder")} />
                </div>
            </div>

            {extraFields.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-sam-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-sam-gray-900 mb-1">{t("info.additionalTitle")}</h2>
                    <p className="text-sm text-sam-gray-500 mb-6">{t("info.additionalSubtitle")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {extraFields.map((field) => (
                            <div key={field.id} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                                <label className="block text-sm font-medium text-sam-gray-700 mb-1.5">
                                    {isAr ? field.labelAr : field.labelEn}
                                    {field.required && <span className="text-sam-red"> *</span>}
                                </label>
                                {field.type === "select" && field.options ? (
                                    <select value={formData.extraFields[field.id] ?? ""} onChange={(e) => updateExtra(field.id, e.target.value)} className={inputClassName}>
                                        <option value="">{t("info.selectPlaceholder")}</option>
                                        {field.options.map((opt) => (
                                            <option key={opt.value} value={opt.value}>{isAr ? opt.labelAr : opt.labelEn}</option>
                                        ))}
                                    </select>
                                ) : field.type === "textarea" ? (
                                    <textarea value={formData.extraFields[field.id] ?? ""} onChange={(e) => updateExtra(field.id, e.target.value)} rows={3} className={inputClassName + " resize-y"} />
                                ) : (
                                    <input type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"} value={formData.extraFields[field.id] ?? ""} onChange={(e) => updateExtra(field.id, e.target.value)} className={inputClassName} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
