"use client";

import { useTranslations, useLocale } from "next-intl";
import { Check } from "lucide-react";

interface StepIndicatorProps {
    steps: string[];
    currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
    const t = useTranslations("submission");
    const locale = useLocale();

    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;

                    return (
                        <div key={step} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${isCompleted
                                        ? "bg-sam-green text-white"
                                        : isCurrent
                                            ? "bg-sam-red text-white shadow-lg shadow-sam-red/30"
                                            : "bg-sam-gray-200 text-sam-gray-500"
                                        }`}
                                >
                                    {isCompleted ? (
                                        <Check className="w-5 h-5" />
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                                <span
                                    className={`text-xs font-medium text-center whitespace-nowrap hidden sm:block ${isCurrent
                                        ? "text-sam-red font-semibold"
                                        : isCompleted
                                            ? "text-sam-green"
                                            : "text-sam-gray-400"
                                        }`}
                                >
                                    {t(`steps.${step}`)}
                                </span>
                            </div>

                            {index < steps.length - 1 && (
                                <div
                                    className={`flex-1 h-0.5 mx-2 sm:mx-3 transition-all duration-300 ${index < currentStep ? "bg-sam-green" : "bg-sam-gray-200"
                                        }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
