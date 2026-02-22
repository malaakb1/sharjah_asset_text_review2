"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
    ArrowLeft,
    ArrowRight,
    AlertTriangle,
    CheckCircle,
    Eye,
} from "lucide-react";
import {
    getSubmissionConfig,
    getCriteriaForEmployee,
    initialFormData,
    type SubmissionFormData,
    type CriterionDefinition,
} from "@/data/submissionCriteria";
import { useAuth } from "@/context/AuthContext";

import StepIndicator from "@/components/submission/StepIndicator";
import IntroStep from "@/components/submission/IntroStep";
import CriteriaStep from "@/components/submission/CriteriaStep";
import ReviewStep from "@/components/submission/ReviewStep";
import ConfirmationStep from "@/components/submission/ConfirmationStep";

export interface CriterionError {
    criterionId: string;
    errors: string[];
}

const validSlugs = [
    "department",
    "project",
    "green",
    "knowledge",
    "employee-nonsupervisory",
    "employee-supervisory",
];

function getSubmittedCategories(userId: number): string[] {
    if (typeof window === "undefined") return [];
    try {
        return JSON.parse(localStorage.getItem(`sam-submitted-${userId}`) || "[]");
    } catch { return []; }
}

function markCategorySubmitted(userId: number, fullSlug: string, referenceNumber?: string) {
    try {
        const list = getSubmittedCategories(userId);
        if (!list.includes(fullSlug)) { list.push(fullSlug); }
        localStorage.setItem(`sam-submitted-${userId}`, JSON.stringify(list));
        if (referenceNumber) {
            localStorage.setItem(`sam-ref-${userId}-${fullSlug}`, referenceNumber);
        }
    } catch { /* ignore */ }
}

function getReferenceNumber(userId: number, fullSlug: string): string | null {
    if (typeof window === "undefined") return null;
    try {
        return localStorage.getItem(`sam-ref-${userId}-${fullSlug}`);
    } catch { return null; }
}

export default function SubmissionPage() {
    const t = useTranslations("submission");
    const locale = useLocale();
    const params = useParams();
    const searchParams = useSearchParams();
    const slug = params.category as string;
    const isPreview = searchParams.get("preview") === "1";
    const isAr = locale === "ar";
    const { user, refreshUser } = useAuth();
    const userId = user?.id ?? 0;

    // Resolve employee subcategory early so it can be part of the draft key
    const resolvedSubcategory = useMemo(() => {
        if (!slug.startsWith("employee-")) return undefined;
        // In preview mode, use subcat from URL if provided
        if (isPreview) {
            const urlSubcat = searchParams.get("subcat");
            if (urlSubcat) return urlSubcat;
        }
        if (typeof window !== "undefined") {
            try {
                const group = slug === "employee-supervisory" ? "supervisory" : "nonsupervisory";
                const saved = localStorage.getItem(`sam-subcat-${userId}-${group}`);
                if (saved) return saved;
            } catch { /* ignore */ }
        }
        return slug === "employee-supervisory" ? "leader" : "administrative";
    }, [slug, userId, isPreview, searchParams]);

    // Build a fully-qualified draft key: user + slug + subcategory
    const draftKey = useMemo(() => {
        const parts = [`sam-draft`, String(userId), slug];
        if (resolvedSubcategory) parts.push(resolvedSubcategory);
        return parts.join("-");
    }, [userId, slug, resolvedSubcategory]);

    // Full slug for submitted-categories tracking (includes subcat)
    const fullSlug = resolvedSubcategory ? `${slug}-${resolvedSubcategory}` : slug;

    // Check if already submitted for this category
    const [alreadySubmitted, setAlreadySubmitted] = useState(() => {
        return getSubmittedCategories(userId).includes(fullSlug);
    });

    const [savedRefNumber, setSavedRefNumber] = useState<string | null>(() => {
        return getReferenceNumber(userId, fullSlug);
    });

    // Check if user has submitted this category on backend
    useEffect(() => {
        if (user?.submissions?.[fullSlug]) {
            setAlreadySubmitted(true);
            setSavedRefNumber(user.submissions[fullSlug].referenceNumber);
        }
    }, [user, fullSlug]);

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<SubmissionFormData>(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem(draftKey);
                if (saved) return JSON.parse(saved);
            } catch { /* ignore */ }
        }
        return { ...initialFormData };
    });
    const [confirmed, setConfirmed] = useState(false);
    const [referenceNumber, setReferenceNumber] = useState("");
    const [showValidationErrors, setShowValidationErrors] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    const config = getSubmissionConfig(slug);

    // ── Auto-save draft on every change (debounced) ──
    useEffect(() => {
        const timeout = setTimeout(() => {
            try {
                localStorage.setItem(draftKey, JSON.stringify(formData));
                setLastSaved(new Date());
            } catch { /* quota exceeded, ignore */ }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [draftKey, formData]);

    const criteria: CriterionDefinition[] = useMemo(() => {
        if (!config) return [];
        if (slug.startsWith("employee-") && resolvedSubcategory) {
            return getCriteriaForEmployee(slug, resolvedSubcategory);
        }
        return config.criteria;
    }, [slug, config, resolvedSubcategory]);

    const getCriteriaErrors = useCallback((): CriterionError[] => {
        if (!config) return [];
        const errors: CriterionError[] = [];
        for (const c of criteria) {
            const ce: string[] = [];
            const resp = formData.criteriaResponses[c.id];
            if (!resp || !resp.text.trim()) {
                ce.push(t("validation.responseRequired"));
            } else {
                if (resp.text.trim().length < 10) {
                    ce.push(t("validation.responseTooShort"));
                }
                const wordCount = resp.text.trim().split(/\s+/).length;
                if (config.maxWordsPerCriterion > 0 && wordCount > config.maxWordsPerCriterion) {
                    ce.push(t("validation.wordLimitExceeded", { max: config.maxWordsPerCriterion, current: wordCount }));
                }
            }
            if (resp && config.maxFilesPerCriterion > 0 && resp.files.length > config.maxFilesPerCriterion) {
                ce.push(t("validation.fileLimitExceeded", { max: config.maxFilesPerCriterion }));
            }
            if (ce.length > 0) {
                errors.push({ criterionId: c.id, errors: ce });
            }
        }
        return errors;
    }, [config, criteria, formData.criteriaResponses, t]);

    const criteriaErrors = useMemo(() => getCriteriaErrors(), [getCriteriaErrors]);
    const criteriaErrorMap = useMemo(() => {
        const map: Record<string, string[]> = {};
        for (const e of criteriaErrors) {
            map[e.criterionId] = e.errors;
        }
        return map;
    }, [criteriaErrors]);

    if (!validSlugs.includes(slug) || !config) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-sam-gray-900 mb-4">404</h1>
                    <Link href="/award-selection" className="text-sam-red hover:underline">
                        {t("backToCategories")}
                    </Link>
                </div>
            </div>
        );
    }

    // ── Already submitted screen ──
    if (alreadySubmitted) {
        if (savedRefNumber) {
            return (
                <div className="min-h-[calc(100vh-5rem)] bg-sam-gray-50 flex items-center justify-center px-4">
                    <div className="max-w-4xl w-full">
                        <ConfirmationStep slug={slug} referenceNumber={savedRefNumber} />
                    </div>
                </div>
            )
        }
        return (
            <div className="min-h-[calc(100vh-5rem)] bg-sam-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-2xl shadow-lg border border-sam-gray-100 p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sam-green-light mb-5">
                            <CheckCircle className="w-8 h-8 text-sam-green" />
                        </div>
                        <h2 className="text-xl font-bold text-sam-gray-900 mb-2">
                            {t("alreadySubmitted.title")}
                        </h2>
                        <p className="text-sm text-sam-gray-500 leading-relaxed mb-6">
                            {t("alreadySubmitted.message")}
                        </p>
                        <Link
                            href="/award-selection"
                            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-sam-red text-white rounded-xl hover:bg-sam-red-dark transition-all shadow-lg shadow-sam-red/30"
                        >
                            {t("backToCategories")}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const steps = config.steps;
    const totalSteps = steps.length;
    const isFirstStep = currentStep === 0;
    const isLastContentStep = currentStep === totalSteps - 2;
    const isConfirmationStep = currentStep === totalSteps - 1;

    const updateFormData = (updates: Partial<SubmissionFormData>) => {
        setFormData((prev) => ({ ...prev, ...updates }));
    };

    const canProceed = (): boolean => {
        const currentStepName = steps[currentStep];

        switch (currentStepName) {
            case "intro":
                return true;
            case "criteria":
                return criteriaErrors.length === 0;
            case "review":
                return confirmed;
            default:
                return true;
        }
    };

    const handleNext = () => {
        const currentStepName = steps[currentStep];
        if (currentStepName === "criteria" && criteriaErrors.length > 0) {
            setShowValidationErrors(true);
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            return;
        }
        if (currentStepName === "review" && !confirmed) {
            return;
        }
        setShowValidationErrors(false);
        if (isLastContentStep) {
            const ref = `SAM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

            if (!isPreview) {
                // Submit to Backend (only in real mode)
                const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
                fetch(`${API_BASE_URL}/auth/submit-application/${userId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        categorySlug: fullSlug,
                        referenceNumber: ref,
                        submittedAt: new Date().toISOString()
                    })
                }).then(async (res) => {
                    if (res.ok) {
                        await refreshUser();
                    }
                }).catch(console.error);

                // Clear draft and mark category as submitted locally too
                try { localStorage.removeItem(draftKey); } catch { /* ignore */ }
                markCategorySubmitted(userId, fullSlug, ref);
                setAlreadySubmitted(false); // Keep showing confirmation this time
            }

            setReferenceNumber(ref);
        }
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const BackArrow = locale === "ar" ? ArrowRight : ArrowLeft;
    const ForwardArrow = locale === "ar" ? ArrowLeft : ArrowRight;

    const renderStep = () => {
        const currentStepName = steps[currentStep];

        switch (currentStepName) {
            case "intro":
                return (
                    <IntroStep
                        slug={slug}
                        formData={formData}
                        onUpdate={updateFormData}
                        resolvedSubcategory={resolvedSubcategory}
                    />
                );
            case "criteria":
                return (
                    <CriteriaStep
                        criteria={criteria}
                        maxWords={config.maxWordsPerCriterion}
                        maxFiles={config.maxFilesPerCriterion}
                        totalPoints={config.totalPoints}
                        formData={formData}
                        onUpdate={updateFormData}
                        errors={showValidationErrors ? criteriaErrorMap : {}}
                    />
                );
            case "review":
                return (
                    <ReviewStep
                        criteria={criteria}
                        formData={formData}
                        confirmed={confirmed}
                        onConfirmedChange={setConfirmed}
                        onEditCriteria={() => {
                            const criteriaIndex = steps.indexOf("criteria");
                            if (criteriaIndex !== -1) setCurrentStep(criteriaIndex);
                        }}
                    />
                );
            case "confirmation":
                return (
                    <ConfirmationStep slug={slug} referenceNumber={referenceNumber} />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-sam-gray-50">
            {/* Preview Mode Banner */}
            {isPreview && (
                <div className="bg-sam-gold/10 border-b-2 border-sam-gold/40">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-sam-gold shrink-0" />
                            <p className="text-sm font-medium text-sam-gray-700">
                                {isAr
                                    ? "وضع الاستعراض — يمكنك تصفح النموذج بالكامل دون إرسال فعلي"
                                    : "Preview Mode — You can browse the full form without actual submission"}
                            </p>
                        </div>
                        <Link
                            href="/preview"
                            className="text-xs font-semibold text-sam-gold hover:underline shrink-0"
                        >
                            {isAr ? "← قائمة الفئات" : "← Categories list"}
                        </Link>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="bg-white border-b border-sam-gray-100 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href={isPreview ? ("/preview" as any) : (`/award-selection/${slug}` as any)}
                            className="inline-flex items-center gap-2 text-sm font-medium text-sam-gray-500 hover:text-sam-gray-900 transition-colors"
                        >
                            <BackArrow className="w-4 h-4" />
                            {isPreview ? (isAr ? "قائمة الفئات" : "Categories list") : t("backToCategory")}
                        </Link>
                        <h1 className="text-sm font-bold text-sam-gray-900">{t("pageTitle")}</h1>
                    </div>
                </div>
            </div>

            {/* Step Indicator */}
            {!isConfirmationStep && (
                <div className="bg-white border-b border-sam-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <StepIndicator steps={steps} currentStep={currentStep} />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderStep()}

                {/* Validation Error Summary */}
                {steps[currentStep] === "criteria" && showValidationErrors && criteriaErrors.length > 0 && (
                    <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-sm font-bold text-red-800 mb-2">
                                    {t("validation.summaryTitle")}
                                </h3>
                                <ul className="space-y-1.5">
                                    {criteriaErrors.map((ce) => {
                                        const criterion = criteria.find((c) => c.id === ce.criterionId);
                                        const title = locale === "ar" ? criterion?.titleAr : criterion?.titleEn;
                                        return ce.errors.map((err, ei) => (
                                            <li key={`${ce.criterionId}-${ei}`} className="flex items-start gap-2 text-sm text-red-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                                                <span>
                                                    <span className="font-semibold">{title}:</span> {err}
                                                </span>
                                            </li>
                                        ));
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                {!isConfirmationStep && (
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-sam-gray-200">
                        {!isFirstStep ? (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-sam-gray-700 bg-white rounded-xl border border-sam-gray-200 hover:bg-sam-gray-50 transition-all cursor-pointer"
                            >
                                <BackArrow className="w-4 h-4" />
                                {t("back")}
                            </button>
                        ) : (
                            <div />
                        )}

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handleNext}
                                className={`inline-flex items-center gap-2 px-7 py-2.5 text-sm font-semibold rounded-xl transition-all cursor-pointer ${canProceed()
                                    ? isLastContentStep
                                        ? "bg-sam-green text-white hover:bg-sam-green/90 shadow-lg shadow-sam-green/30"
                                        : "bg-sam-red text-white hover:bg-sam-red-dark shadow-lg shadow-sam-red/30"
                                    : "bg-sam-red/60 text-white hover:bg-sam-red/80"
                                    }`}
                            >
                                {isLastContentStep ? t("submit") : t("next")}
                                {!isLastContentStep && <ForwardArrow className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                )}

                {/* Last saved indicator */}
                {lastSaved && (
                    <p className="text-xs text-sam-gray-400 text-center mt-3">
                        {t("draft.lastSaved", {
                            time: lastSaved.toLocaleTimeString(locale === "ar" ? "ar-AE" : "en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                            }),
                        })}
                    </p>
                )}
            </div>
        </div>
    );
}
