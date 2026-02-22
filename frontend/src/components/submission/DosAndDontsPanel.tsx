"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
    CheckCircle,
    XCircle,
    ChevronDown,
    ClipboardList,
    FileText,
} from "lucide-react";

export default function DosAndDontsPanel() {
    const t = useTranslations("submission");
    const [isOpen, setIsOpen] = useState(true);

    const dos = [
        t("dosAndDonts.do1"),
        t("dosAndDonts.do2"),
        t("dosAndDonts.do3"),
    ];

    const donts = [
        t("dosAndDonts.dont1"),
        t("dosAndDonts.dont2"),
        t("dosAndDonts.dont3"),
        t("dosAndDonts.dont4"),
    ];

    const reportReqs = [
        t("dosAndDonts.req1"),
        t("dosAndDonts.req2"),
        t("dosAndDonts.req3"),
        t("dosAndDonts.req4"),
        t("dosAndDonts.req5"),
        t("dosAndDonts.req6"),
        t("dosAndDonts.req7"),
    ];

    const additionalReqs = [
        t("dosAndDonts.add1"),
        t("dosAndDonts.add2"),
        t("dosAndDonts.add3"),
    ];

    return (
        <div className="bg-white rounded-2xl border border-sam-gray-100 shadow-sm overflow-hidden mb-8">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-sam-gray-50 to-white hover:from-sam-gray-100 transition-all cursor-pointer"
            >
                <h3 className="text-sm font-bold text-sam-gray-900">{t("dosAndDonts.title")}</h3>
                <ChevronDown
                    className={`w-5 h-5 text-sam-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <div className="px-6 pb-5 space-y-6">
                    {/* Do's and Don'ts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-sam-green mb-3">
                                {t("dosAndDonts.dosTitle")}
                            </h4>
                            <ul className="space-y-2">
                                {dos.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-sam-gray-600">
                                        <CheckCircle className="w-4 h-4 text-sam-green mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-sam-red mb-3">
                                {t("dosAndDonts.dontsTitle")}
                            </h4>
                            <ul className="space-y-2">
                                {donts.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-sam-gray-600">
                                        <XCircle className="w-4 h-4 text-sam-red mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Technical Requirements */}
                    <div className="border-t border-sam-gray-100 pt-5">
                        <div className="flex items-center gap-2 mb-4">
                            <ClipboardList className="w-5 h-5 text-sam-red" />
                            <h4 className="text-sm font-bold text-sam-gray-900">
                                {t("dosAndDonts.technicalReqTitle")}
                            </h4>
                        </div>

                        {/* Report Requirements */}
                        <div className="mb-4">
                            <div className="flex items-start gap-2 mb-3">
                                <FileText className="w-4 h-4 text-sam-gray-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm font-medium text-sam-gray-700">
                                    {t("dosAndDonts.reportIntro")}
                                </p>
                            </div>
                            <ul className="space-y-2 ps-6">
                                {reportReqs.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-sam-gray-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-sam-red mt-1.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Additional Requirements */}
                        <div>
                            <p className="text-sm font-medium text-sam-gray-700 mb-3 ps-6">
                                {t("dosAndDonts.additionalIntro")}
                            </p>
                            <ul className="space-y-2 ps-6">
                                {additionalReqs.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-sam-gray-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-sam-gray-400 mt-1.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
