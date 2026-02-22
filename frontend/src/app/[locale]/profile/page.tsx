
"use client";

import { useTranslations, useLocale } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { categoryContent } from "@/data/categoryContent";
import { FileText, CheckCircle, Clock, ArrowRight, ArrowLeft, Pencil, X as XIcon } from "lucide-react";
import { getSubmissionConfig, getCriteriaForEmployee, type SimulatedFile, type CriterionDefinition } from "@/data/submissionCriteria";
import FileUploadArea from "@/components/submission/FileUploadArea";

interface SubmissionItem {
    slug: string;
    referenceNumber: string | null;
    submittedAt: Date | null;
    status: "submitted" | "waiting-approval";
}

interface DraftItem {
    slug: string;
    lastSaved: Date | null;
    type: "registration" | "submission";
}

export default function ProfilePage() {
    const t = useTranslations("profile");
    const tCommon = useTranslations("common");
    const locale = useLocale();
    const { user } = useAuth();
    const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
    const [drafts, setDrafts] = useState<DraftItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingSubmission, setEditingSubmission] = useState<SubmissionItem | null>(null);
    const [editResponses, setEditResponses] = useState<Record<string, { text: string; files: SimulatedFile[] }>>({})

    const isAr = locale === "ar";
    const Arrow = isAr ? ArrowLeft : ArrowRight;

    useEffect(() => {
        if (!user) return;

        // 1. Load Submissions (Completed Step 2)
        const loadedSubmissions: SubmissionItem[] = [];
        const processedSlugs = new Set<string>();

        if (user.submissions) {
            Object.entries(user.submissions).forEach(([slug, data]) => {
                loadedSubmissions.push({
                    slug,
                    referenceNumber: data.referenceNumber,
                    submittedAt: new Date(data.submittedAt),
                    status: "submitted"
                });
                processedSlugs.add(slug);
            });
        }

        // 2. Load Applied Categories - only waiting-approval goes to submissions
        if (user.appliedCategories) {
            user.appliedCategories.forEach(slug => {
                if (!processedSlugs.has(slug)) {
                    const status = user.categoryStatuses?.[slug];
                    if (status === "waiting-approval") {
                        loadedSubmissions.push({
                            slug,
                            referenceNumber: null,
                            submittedAt: null,
                            status: "waiting-approval"
                        });
                        processedSlugs.add(slug);
                    }
                    // qualified without submission → will go to drafts below
                }
            });
        }
        setSubmissions(loadedSubmissions);

        // 3. Load Drafts
        const draftMap = new Map<string, DraftItem>();

        // Qualified categories without submission → submission drafts
        if (user.appliedCategories) {
            user.appliedCategories.forEach(slug => {
                if (processedSlugs.has(slug)) return;
                const status = user.categoryStatuses?.[slug];
                if (status === "qualified") {
                    draftMap.set(slug, { slug, lastSaved: null, type: "submission" });
                    processedSlugs.add(slug);
                }
            });
        }

        // Backend drafts - registration drafts (NOT in appliedCategories)
        if (user.draft) {
            Object.keys(user.draft).forEach(slug => {
                if (processedSlugs.has(slug)) return;
                // Skip bare employee group slugs without subcategory
                if (slug === "employee" || slug === "employee-nonsupervisory" || slug === "employee-supervisory") return;
                // This is a registration draft (not yet completed registration)
                draftMap.set(slug, { slug, lastSaved: null, type: "registration" });
            });
        }

        // LocalStorage drafts (submission drafts)
        const bareEmployeeSlugs = new Set(["employee", "employee-nonsupervisory", "employee-supervisory"]);
        const keys = Object.keys(localStorage);
        for (const key of keys) {
            if (key.startsWith(`sam-draft-${user.id}-`)) {
                const prefix = `sam-draft-${user.id}-`;
                const slugPart = key.substring(prefix.length);

                if (processedSlugs.has(slugPart)) continue;
                if (bareEmployeeSlugs.has(slugPart)) continue;

                if (!draftMap.has(slugPart)) {
                    draftMap.set(slugPart, { slug: slugPart, lastSaved: null, type: "submission" });
                }
            }
        }

        setDrafts(Array.from(draftMap.values()));
        setLoading(false);

    }, [user]);

    const getCriteriaForSlug = (slug: string): CriterionDefinition[] => {
        if (slug.startsWith("employee-nonsupervisory-")) {
            const subcat = slug.replace("employee-nonsupervisory-", "");
            return getCriteriaForEmployee("employee-nonsupervisory", subcat);
        }
        if (slug.startsWith("employee-supervisory-")) {
            const subcat = slug.replace("employee-supervisory-", "");
            return getCriteriaForEmployee("employee-supervisory", subcat);
        }
        // For base slugs (department, project, green, knowledge, employee-nonsupervisory, employee-supervisory)
        const baseSlug = slug.startsWith("employee-") ? slug.split("-").slice(0, 2).join("-") : slug.split("-")[0];
        return getSubmissionConfig(baseSlug)?.criteria ?? [];
    };

    const openEditModal = (sub: SubmissionItem) => {
        const key = `sam-draft-${user!.id}-${sub.slug}`;
        let responses: Record<string, { text: string; files: SimulatedFile[] }> = {};
        try {
            const saved = localStorage.getItem(key);
            if (saved) {
                const parsed = JSON.parse(saved);
                responses = parsed.criteriaResponses || {};
            }
        } catch { /* ignore */ }
        setEditResponses(responses);
        setEditingSubmission(sub);
    };

    const saveEditFiles = (criterionId: string, files: SimulatedFile[]) => {
        if (!editingSubmission || !user) return;
        const updated = {
            ...editResponses,
            [criterionId]: {
                text: editResponses[criterionId]?.text || "",
                files,
            },
        };
        setEditResponses(updated);
        const key = `sam-draft-${user.id}-${editingSubmission.slug}`;
        try {
            const saved = localStorage.getItem(key);
            const parsed = saved ? JSON.parse(saved) : {};
            parsed.criteriaResponses = updated;
            localStorage.setItem(key, JSON.stringify(parsed));
        } catch { /* ignore */ }
    };

    const subcatMap: Record<string, Record<string, string>> = {
        administrative: { ar: "الإداري", en: "Administrative" },
        specialist: { ar: "التخصصي", en: "Specialized" },
        technical: { ar: "الفني الميداني", en: "Technical Field" },
        customerservice: { ar: "خدمة المتعاملين", en: "Customer Service" },
        unsung: { ar: "الجندي المجهول", en: "Unknown Soldier" },
        leader: { ar: "القائد", en: "Leader" },
        futureleader: { ar: "قائد المستقبل", en: "Future Leader" },
    };

    const getCategoryTitle = (slug: string) => {
        if (categoryContent[slug]) {
            return categoryContent[slug][locale as "ar" | "en"].title;
        }

        if (slug.startsWith("employee-nonsupervisory-")) {
            const base = "employee-nonsupervisory";
            const subKey = slug.replace(base + "-", "");
            const baseTitle = categoryContent[base][locale as "ar" | "en"].title;
            const subcatTitle = subcatMap[subKey]?.[locale] || subKey;
            return `${baseTitle} - ${subcatTitle}`;
        }
        if (slug.startsWith("employee-supervisory-")) {
            const base = "employee-supervisory";
            const subKey = slug.replace(base + "-", "");
            const baseTitle = categoryContent[base][locale as "ar" | "en"].title;
            const subcatTitle = subcatMap[subKey]?.[locale] || subKey;
            return `${baseTitle} - ${subcatTitle}`;
        }
        if (slug.startsWith("employee-nonsupervisory")) {
            return categoryContent["employee-nonsupervisory"][locale as "ar" | "en"].title;
        }
        if (slug.startsWith("employee-supervisory")) {
            return categoryContent["employee-supervisory"][locale as "ar" | "en"].title;
        }

        if (slug === "employee") {
            // Generic employee draft — show group-level title if draft data available
            if (user?.draft?.[slug]?.employeeGroup === "supervisory") {
                return categoryContent["employee-supervisory"][locale as "ar" | "en"].title;
            }
            return categoryContent["employee-nonsupervisory"][locale as "ar" | "en"].title;
        }

        return slug;
    };

    if (!user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-sam-red border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <>
        <div className="min-h-screen bg-sam-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-sam-gray-900 mb-8">{isAr ? "ملفي الشخصي" : "My Profile"}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Submissions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-sam-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle className="w-6 h-6 text-sam-green" />
                            <h2 className="text-xl font-bold text-sam-gray-900">{isAr ? "الطلبات المقدمة" : "Submitted Applications"}</h2>
                        </div>

                        {submissions.length === 0 ? (
                            <p className="text-sam-gray-500 text-sm">{isAr ? "لا توجد طلبات مقدمة" : "No submitted applications yet."}</p>
                        ) : (
                            <div className="space-y-4">
                                {submissions.map((sub, i) => {
                                    const categorySlug = sub.slug.startsWith('employee')
                                        ? sub.slug.split('-').slice(0, 2).join('-')
                                        : sub.slug.split('-')[0];

                                    return (
                                        <div key={i} className="p-4 rounded-xl bg-sam-gray-50 border border-sam-gray-200">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-sam-gray-900">{getCategoryTitle(sub.slug)}</h3>
                                                <div className="flex items-center gap-2">
                                                    {sub.status === "submitted" && (
                                                        <button
                                                            type="button"
                                                            onClick={() => openEditModal(sub)}
                                                            className="p-1.5 rounded-lg hover:bg-sam-red-light text-sam-gray-400 hover:text-sam-red transition-colors"
                                                            title={isAr ? "تعديل الملفات" : "Edit Files"}
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {sub.status === "waiting-approval" && (
                                                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-sam-gold-light text-sam-gold">
                                                            {isAr ? "بانتظار الموافقة" : "Waiting Approval"}
                                                        </span>
                                                    )}
                                                    {sub.status === "submitted" && (
                                                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-sam-green-light text-sam-green">
                                                            {isAr ? "تم التقديم" : "Submitted"}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {sub.referenceNumber && (
                                                <p className="text-sm text-sam-gray-600 font-mono mb-3 bg-white px-2 py-1 rounded border border-sam-gray-100 w-fit">
                                                    <span className="text-sam-gray-400 mr-2">Ref:</span>
                                                    {sub.referenceNumber}
                                                </p>
                                            )}
                                            {sub.submittedAt && (
                                                <p className="text-xs text-sam-gray-400 mb-3">
                                                    {sub.submittedAt.toLocaleDateString()}
                                                </p>
                                            )}

                                            {sub.status === "submitted" && (
                                                <Link
                                                    href={`/award-selection/${categorySlug}/submission` as any}
                                                    className="inline-flex items-center gap-2 text-sm font-medium text-sam-green hover:underline"
                                                >
                                                    {isAr ? "عرض التفاصيل" : "View Details"}
                                                    <Arrow className="w-4 h-4" />
                                                </Link>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Drafts */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-sam-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="w-6 h-6 text-sam-gold" />
                            <h2 className="text-xl font-bold text-sam-gray-900">{isAr ? "المسودات" : "Drafts (In Progress)"}</h2>
                        </div>

                        {drafts.length === 0 ? (
                            <p className="text-sam-gray-500 text-sm">{isAr ? "لا توجد مسودات" : "No active drafts."}</p>
                        ) : (
                            <div className="space-y-4">
                                {drafts.map((draft, i) => {
                                    // Resolve the URL-friendly category slug from draft data
                                    let categorySlug: string;
                                    if (draft.slug === "employee" && user.draft?.[draft.slug]) {
                                        // Generic "employee" draft — use employeeGroup from draft data
                                        const draftData = user.draft[draft.slug];
                                        const group = draftData.employeeGroup; // "nonsupervisory" or "supervisory"
                                        categorySlug = group ? `employee-${group}` : "employee-nonsupervisory";
                                    } else if (draft.slug.startsWith('employee')) {
                                        categorySlug = draft.slug.split('-').slice(0, 2).join('-');
                                    } else {
                                        categorySlug = draft.slug.split('-')[0];
                                    }

                                    // For employee registration drafts, pass subcat as query param
                                    let targetHref: string;
                                    if (draft.type === "submission") {
                                        targetHref = `/award-selection/${categorySlug}/submission`;
                                    } else if (draft.type === "registration" && user.draft?.[draft.slug]?.employeeSubcat) {
                                        const subcat = user.draft[draft.slug].employeeSubcat;
                                        targetHref = `/award-selection/${categorySlug}/apply?subcat=${subcat}`;
                                    } else {
                                        targetHref = `/award-selection/${categorySlug}/apply`;
                                    }

                                    const buttonText = draft.type === "submission"
                                        ? (isAr ? "متابعة التقديم" : "Continue Submission")
                                        : (isAr ? "متابعة التسجيل" : "Continue Registration");

                                    return (
                                        <div key={i} className="p-4 rounded-xl bg-sam-gray-50 border border-sam-gray-200">
                                            <h3 className="font-bold text-sam-gray-900 mb-3">{getCategoryTitle(draft.slug)}</h3>
                                            <Link
                                                href={targetHref as any}
                                                className="inline-flex items-center gap-2 text-sm font-medium text-sam-gold hover:underline"
                                            >
                                                {buttonText}
                                                <Arrow className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Edit Files Modal */}
        {editingSubmission && (
            <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-8 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-sam-gray-900">
                                {isAr ? "تعديل الملفات المرفوعة" : "Edit Uploaded Files"}
                            </h2>
                            <p className="text-sm text-sam-gray-500 mt-1">{getCategoryTitle(editingSubmission.slug)}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setEditingSubmission(null)}
                            className="p-2 rounded-lg hover:bg-sam-gray-100 text-sam-gray-500 hover:text-sam-gray-900 transition-colors"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-5">
                        {getCriteriaForSlug(editingSubmission.slug).map((criterion, idx) => {
                            const currentFiles = editResponses[criterion.id]?.files || [];
                            return (
                                <div key={criterion.id} className="p-4 rounded-xl bg-sam-gray-50 border border-sam-gray-100">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-6 h-6 rounded-md bg-sam-red text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                                            {idx + 1}
                                        </span>
                                        <h3 className="text-sm font-semibold text-sam-gray-800">
                                            {isAr ? criterion.titleAr : criterion.titleEn}
                                        </h3>
                                    </div>
                                    <FileUploadArea
                                        files={currentFiles}
                                        onChange={(files) => saveEditFiles(criterion.id, files)}
                                        maxFiles={0}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            onClick={() => setEditingSubmission(null)}
                            className="px-5 py-2.5 bg-sam-red text-white rounded-lg text-sm font-semibold hover:bg-sam-red-dark transition-all shadow-lg shadow-sam-red/25"
                        >
                            {isAr ? "تم" : "Done"}
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}
