
"use client";

import { useTranslations, useLocale } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { categoryContent } from "@/data/categoryContent";
import {
    ShieldCheck,
    CheckCircle,
    XCircle,
    Clock,
    User,
    Mail,
    Tag,
    ArrowLeft,
    ArrowRight,
    Loader2,
} from "lucide-react";

interface PendingRegistration {
    userId: number;
    email: string;
    categorySlug: string;
    registrationData: Record<string, any>;
    submittedAt: string | null;
}

const API_BASE_URL = "/api/v1";

export default function DashboardPage() {
    const locale = useLocale();
    const { user } = useAuth();
    const isAr = locale === "ar";
    const Arrow = isAr ? ArrowLeft : ArrowRight;

    const [pending, setPending] = useState<PendingRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
            const baseTitle = categoryContent[base]?.[locale as "ar" | "en"]?.title || base;
            const subcatTitle = subcatMap[subKey]?.[locale] || subKey;
            return `${baseTitle} - ${subcatTitle}`;
        }
        if (slug.startsWith("employee-supervisory-")) {
            const base = "employee-supervisory";
            const subKey = slug.replace(base + "-", "");
            const baseTitle = categoryContent[base]?.[locale as "ar" | "en"]?.title || base;
            const subcatTitle = subcatMap[subKey]?.[locale] || subKey;
            return `${baseTitle} - ${subcatTitle}`;
        }
        if (slug.startsWith("employee-nonsupervisory")) {
            return categoryContent["employee-nonsupervisory"]?.[locale as "ar" | "en"]?.title || slug;
        }
        if (slug.startsWith("employee-supervisory")) {
            return categoryContent["employee-supervisory"]?.[locale as "ar" | "en"]?.title || slug;
        }
        return slug;
    };

    const fetchPending = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/admin/pending-registrations`);
            if (res.ok) {
                const data = await res.json();
                setPending(data.pending || []);
            }
        } catch (err) {
            console.error("Error fetching pending registrations:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user?.isAdmin) {
            fetchPending();
        } else {
            setLoading(false);
        }
    }, [user, fetchPending]);

    const handleAction = async (userId: number, categorySlug: string, action: "approve" | "reject") => {
        const key = `${userId}-${categorySlug}`;
        setActionLoading(key);
        setSuccessMessage(null);

        try {
            const res = await fetch(`${API_BASE_URL}/auth/admin/review-registration`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, categorySlug, action }),
            });

            if (res.ok) {
                // Remove from pending list
                setPending((prev) => prev.filter((p) => !(p.userId === userId && p.categorySlug === categorySlug)));
                setSuccessMessage(
                    action === "approve"
                        ? (isAr ? "تمت الموافقة بنجاح" : "Approved successfully")
                        : (isAr ? "تم الرفض بنجاح" : "Rejected successfully")
                );
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                const err = await res.json();
                alert(err.detail || "Action failed");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("An error occurred");
        } finally {
            setActionLoading(null);
        }
    };

    // Not admin → access denied
    if (!user?.isAdmin) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <ShieldCheck className="w-12 h-12 text-sam-gray-300 mx-auto mb-4" />
                    <h1 className="text-xl font-bold text-sam-gray-900 mb-2">
                        {isAr ? "الوصول مقيّد" : "Access Restricted"}
                    </h1>
                    <p className="text-sm text-sam-gray-500 mb-6">
                        {isAr ? "هذه الصفحة مخصصة للمسؤولين فقط." : "This page is restricted to administrators only."}
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-sam-red text-white rounded-lg text-sm font-semibold hover:bg-sam-red-dark transition-all"
                    >
                        {isAr ? "العودة للرئيسية" : "Back to Home"}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sam-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-sam-red flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-sam-gray-900">
                            {isAr ? "لوحة تحكم المسؤول" : "Admin Dashboard"}
                        </h1>
                        <p className="text-sm text-sam-gray-500">
                            {isAr ? "مراجعة طلبات التسجيل المعلّقة والموافقة عليها أو رفضها" : "Review pending registration forms and approve or reject them"}
                        </p>
                    </div>
                </div>

                {/* Success Toast */}
                {successMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-sam-green-light border border-sam-green/20 text-sam-green text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        {successMessage}
                    </div>
                )}

                {/* Pending Registrations */}
                <div className="bg-white rounded-2xl shadow-sm border border-sam-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-sam-gold" />
                            <h2 className="text-lg font-bold text-sam-gray-900">
                                {isAr ? "طلبات التسجيل المعلّقة" : "Pending Registration Forms"}
                            </h2>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-sam-gold-light text-sam-gold text-xs font-bold">
                            {pending.length}
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 text-sam-gray-300 animate-spin" />
                        </div>
                    ) : pending.length === 0 ? (
                        <div className="py-12 text-center">
                            <CheckCircle className="w-12 h-12 text-sam-green mx-auto mb-3" />
                            <p className="text-sam-gray-500 text-sm">
                                {isAr ? "لا توجد طلبات معلّقة حالياً" : "No pending registrations at the moment"}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pending.map((item, i) => {
                                const key = `${item.userId}-${item.categorySlug}`;
                                const isActioning = actionLoading === key;
                                const regData = item.registrationData || {};

                                return (
                                    <div
                                        key={key}
                                        className="p-5 rounded-xl bg-sam-gray-50 border border-sam-gray-200 hover:border-sam-gray-300 transition-colors"
                                    >
                                        {/* Top row: category + badge */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="font-bold text-sam-gray-900 text-base">
                                                    {getCategoryTitle(item.categorySlug)}
                                                </h3>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-sam-gray-500">
                                                    <span className="flex items-center gap-1.5">
                                                        <Mail className="w-3.5 h-3.5" />
                                                        {item.email}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Tag className="w-3.5 h-3.5" />
                                                        {item.categorySlug}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-sam-gold-light text-sam-gold whitespace-nowrap">
                                                {isAr ? "بانتظار الموافقة" : "Pending"}
                                            </span>
                                        </div>

                                        {/* Registration details */}
                                        {(regData.firstName || regData.lastName || regData.nominationReason) && (
                                            <div className="mb-4 p-4 rounded-lg bg-white border border-sam-gray-100">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                                    {regData.firstName && (
                                                        <div>
                                                            <span className="text-sam-gray-400 text-xs">{isAr ? "الاسم الأول" : "First Name"}</span>
                                                            <p className="font-medium text-sam-gray-800">{regData.firstName}</p>
                                                        </div>
                                                    )}
                                                    {regData.lastName && (
                                                        <div>
                                                            <span className="text-sam-gray-400 text-xs">{isAr ? "اسم العائلة" : "Last Name"}</span>
                                                            <p className="font-medium text-sam-gray-800">{regData.lastName}</p>
                                                        </div>
                                                    )}
                                                    {regData.idNumber && (
                                                        <div>
                                                            <span className="text-sam-gray-400 text-xs">{isAr ? "الرقم الوظيفي" : "Employee ID"}</span>
                                                            <p className="font-medium text-sam-gray-800">{regData.idNumber}</p>
                                                        </div>
                                                    )}
                                                    {regData.email && (
                                                        <div>
                                                            <span className="text-sam-gray-400 text-xs">{isAr ? "البريد الإلكتروني" : "Email"}</span>
                                                            <p className="font-medium text-sam-gray-800">{regData.email}</p>
                                                        </div>
                                                    )}
                                                    {regData.mobile && (
                                                        <div>
                                                            <span className="text-sam-gray-400 text-xs">{isAr ? "الهاتف" : "Mobile"}</span>
                                                            <p className="font-medium text-sam-gray-800">{regData.mobile}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                {regData.nominationReason && (
                                                    <div className="mt-3 pt-3 border-t border-sam-gray-100">
                                                        <span className="text-sam-gray-400 text-xs">{isAr ? "سبب الترشيح" : "Nomination Reason"}</span>
                                                        <p className="text-sm text-sam-gray-700 mt-1 leading-relaxed">{regData.nominationReason}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Action buttons */}
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                disabled={isActioning}
                                                onClick={() => handleAction(item.userId, item.categorySlug, "approve")}
                                                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-sam-green text-white rounded-lg text-sm font-semibold hover:bg-sam-green/90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                            >
                                                {isActioning ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <CheckCircle className="w-4 h-4" />
                                                )}
                                                {isAr ? "موافقة" : "Approve"}
                                            </button>
                                            <button
                                                type="button"
                                                disabled={isActioning}
                                                onClick={() => handleAction(item.userId, item.categorySlug, "reject")}
                                                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-red-600 rounded-lg text-sm font-semibold border-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                            >
                                                {isActioning ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <XCircle className="w-4 h-4" />
                                                )}
                                                {isAr ? "رفض" : "Reject"}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
