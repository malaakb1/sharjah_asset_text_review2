"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight, CheckCircle, Home } from "lucide-react";

interface ConfirmationStepProps {
    slug: string;
    referenceNumber: string;
}

export default function ConfirmationStep({ slug, referenceNumber }: ConfirmationStepProps) {
    const t = useTranslations("submission");
    const locale = useLocale();
    const BackArrow = locale === "ar" ? ArrowRight : ArrowLeft;

    return (
        <div className="flex flex-col items-center text-center py-8">
            <div className="w-20 h-20 rounded-full bg-sam-green-light flex items-center justify-center mb-6 animate-bounce">
                <CheckCircle className="w-12 h-12 text-sam-green" />
            </div>

            <h2 className="text-2xl font-bold text-sam-gray-900 mb-2">{t("confirmation.title")}</h2>
            <p className="text-sam-gray-600 mb-6 max-w-md">{t("confirmation.message")}</p>

            <div className="bg-sam-gray-50 rounded-xl px-6 py-4 border border-sam-gray-200 mb-8">
                <p className="text-xs text-sam-gray-500 uppercase tracking-wide font-semibold mb-1">
                    {t("confirmation.referenceLabel")}
                </p>
                <p className="text-xl font-mono font-bold text-sam-gray-900 tracking-widest">
                    {referenceNumber}
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                    href="/award-selection"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-sam-gray-700 bg-white rounded-xl border border-sam-gray-200 hover:bg-sam-gray-50 transition-all"
                >
                    <BackArrow className="w-4 h-4" />
                    {t("confirmation.backToCategory")}
                </Link>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-sam-red rounded-xl hover:bg-sam-red-dark transition-all shadow-sm"
                >
                    <Home className="w-4 h-4" />
                    {t("confirmation.goHome")}
                </Link>
            </div>
        </div>
    );
}
