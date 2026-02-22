"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  Building2,
  User,
  Rocket,
  Globe2,
  BookOpen,
  Users,
  Briefcase,
  Send,
  Lock,
  FileText,
  Plus,
  Trash2,
  Eye,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/auth/LoginModal";
import {
  getEligibilityBySlug,
  type EligibilityCategory,
  type EligibilityQuestion,
} from "@/data/eligibilityData";

/* ───── Category definitions ───── */
type MainCategory = "department" | "employee" | "project" | "green" | "knowledge";

const mainCategories: { key: MainCategory; icon: typeof User }[] = [
  { key: "department", icon: Building2 },
  { key: "employee", icon: User },
  { key: "project", icon: Rocket },
  { key: "knowledge", icon: BookOpen },
  { key: "green", icon: Globe2 },
];

type EmployeeGroup = "nonsupervisory" | "supervisory";

const nonSupervisorySubcats = [
  { key: "administrative", ar: "الموظف الإداري المتميز", en: "The Distinguished Administrative Employee" },
  { key: "specialist", ar: "الموظف التخصصي المتميز", en: "The Distinguished Specialized Employee" },
  { key: "technical", ar: "الموظف الفني الميداني المتميز", en: "The Distinguished Technical Field Employee" },
  { key: "customerservice", ar: "موظف خدمة المتعاملين المتميز", en: "The Distinguished Customer Service Employee" },
  { key: "unsung", ar: "الجندي المجهول المتميز", en: "The Distinguished Unknown Soldier" },
];

const supervisorySubcats = [
  { key: "leader", ar: "القائد المتميز", en: "The Distinguished Leader" },
  { key: "futureleader", ar: "قائد المستقبل المتميز", en: "The Distinguished Future Leader" },
];

/* ───── Slug → pre-selection mapping ───── */
function resolveSlugToPreSelection(slug: string) {
  if (slug === "department") return { category: "department" as MainCategory };
  if (slug === "project") return { category: "project" as MainCategory };
  if (slug === "green") return { category: "green" as MainCategory };
  if (slug === "knowledge") return { category: "knowledge" as MainCategory };
  if (slug === "employee-nonsupervisory")
    return { category: "employee" as MainCategory, group: "nonsupervisory" as EmployeeGroup };
  if (slug === "employee-supervisory")
    return { category: "employee" as MainCategory, group: "supervisory" as EmployeeGroup };
  return { category: null as MainCategory | null };
}

/* ───── Result type ───── */
type SubmissionStatus = "qualified" | "unqualified" | "waiting-approval";

interface SubmissionResult {
  status: SubmissionStatus;
  reasons: string[];
}

/* ───── Component ───── */
export default function RegistrationFormPage() {
  const t = useTranslations("registrationForm");
  const td = useTranslations("categoryDetails");
  const ta = useTranslations("awardSelection");
  const locale = useLocale();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = params.category as string;
  const initialSubcat = searchParams.get("subcat") || "";
  const isPreview = searchParams.get("preview") === "1";
  const isAr = locale === "ar";
  const BackArrow = isAr ? ArrowRight : ArrowLeft;
  const { user, isAuthenticated, refreshUser } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Pre-selection from URL
  const preSelection = useMemo(() => resolveSlugToPreSelection(slug), [slug]);
  // If the URL already encodes the group (employee-supervisory / employee-nonsupervisory), lock it
  const groupLockedByUrl = !!preSelection.group;

  // ── Form state ──
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | null>(
    preSelection.category ?? null
  );
  const [employeeGroup, setEmployeeGroup] = useState<EmployeeGroup | null>(
    preSelection.group ?? null
  );
  const [employeeSubcat, setEmployeeSubcat] = useState<string>(initialSubcat);
  const [answers, setAnswers] = useState<Record<string, string | null>>({});

  // Sync form state when the URL slug changes (e.g. redirect from leader → department)
  useEffect(() => {
    setSelectedCategory(preSelection.category ?? null);
    setEmployeeGroup(preSelection.group ?? null);
    setEmployeeSubcat("");
    setAnswers({});
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps
  const [nominationReason, setNominationReason] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  // Department category extra fields
  const [deptNameCompany, setDeptNameCompany] = useState("");
  const [deptLeaderName, setDeptLeaderName] = useState("");
  const [deptManagerPhone, setDeptManagerPhone] = useState("");
  const [deptManagerEmail, setDeptManagerEmail] = useState("");

  // Project category extra fields
  const [projectCompany, setProjectCompany] = useState("");
  const [projectTeamMembers, setProjectTeamMembers] = useState<Array<{ name: string; title: string }>>([{ name: "", title: "" }]);
  const [projectManagerName, setProjectManagerName] = useState("");
  const [projectManagerTitle, setProjectManagerTitle] = useState("");
  const [projectManagerPhone, setProjectManagerPhone] = useState("");
  const [projectManagerEmail, setProjectManagerEmail] = useState("");

  // Unsung Hero extra fields
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorId, setSupervisorId] = useState("");
  const [yearsAtSAM, setYearsAtSAM] = useState("");
  const [supervisorEmail, setSupervisorEmail] = useState("");
  const [unsungJobCategory, setUnsungJobCategory] = useState("");
  const [hrRepName, setHrRepName] = useState("");
  const [hrRepSignature, setHrRepSignature] = useState("");
  const [directSupervisorSignature, setDirectSupervisorSignature] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Toast state for redirect-on-no eligibility questions
  const [redirectToast, setRedirectToast] = useState<string | null>(null);

  // Build a draft key based on current category/subcategory selection
  const draftKey = useMemo(() => {
    if (selectedCategory === "employee" && employeeGroup && employeeSubcat)
      return `employee-${employeeGroup}-${employeeSubcat}`;
    if (selectedCategory) return selectedCategory;
    return slug; // fallback to URL slug
  }, [selectedCategory, employeeGroup, employeeSubcat, slug]);

  // Auto-save draft functionality (per-category)
  useEffect(() => {
    if (!user) return;

    // Load draft on mount
    const loadDraft = async () => {
      try {
        const API_BASE_URL = "/api/v1";
        const response = await fetch(`${API_BASE_URL}/auth/draft/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          // drafts is an object keyed by category slug
          const drafts = data.draft || {};
          const draft = drafts[draftKey];
          if (draft) {
            setSelectedCategory(draft.selectedCategory || null);
            // Don't override URL-locked group
            if (!groupLockedByUrl) {
              setEmployeeGroup(draft.employeeGroup || null);
            }
            setEmployeeSubcat(draft.employeeSubcat || "");
            setAnswers(draft.answers || {});
            setNominationReason(draft.nominationReason || "");
            setFirstName(draft.firstName || "");
            setLastName(draft.lastName || "");
            setJobTitle(draft.jobTitle || "");
            setIdNumber(draft.idNumber || "");
            setYearsExperience(draft.yearsExperience || "");
            setCompany(draft.company || "");
            setDepartment(draft.department || "");
            setMobile(draft.mobile || "");
            setEmail(draft.email || "");
            // Department extras
            setDeptNameCompany(draft.deptNameCompany || "");
            setDeptLeaderName(draft.deptLeaderName || "");
            setDeptManagerPhone(draft.deptManagerPhone || "");
            setDeptManagerEmail(draft.deptManagerEmail || "");
            // Project extras
            setProjectCompany(draft.projectCompany || "");
            setProjectTeamMembers(draft.projectTeamMembers || [{ name: "", title: "" }]);
            setProjectManagerName(draft.projectManagerName || "");
            setProjectManagerTitle(draft.projectManagerTitle || "");
            setProjectManagerPhone(draft.projectManagerPhone || "");
            setProjectManagerEmail(draft.projectManagerEmail || "");
            // Unsung extras
            setSupervisorName(draft.supervisorName || "");
            setSupervisorId(draft.supervisorId || "");
            setYearsAtSAM(draft.yearsAtSAM || "");
            setSupervisorEmail(draft.supervisorEmail || "");
            setUnsungJobCategory(draft.unsungJobCategory || "");
            setHrRepName(draft.hrRepName || "");
            setHrRepSignature(draft.hrRepSignature || "");
            setDirectSupervisorSignature(draft.directSupervisorSignature || "");
          }
        }
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    };

    loadDraft();
  }, [user, draftKey]);

  // Auto-save draft when form data changes (per-category)
  useEffect(() => {
    if (!user) return;

    const saveDraft = async () => {
      const draftData = {
        selectedCategory,
        employeeGroup,
        employeeSubcat,
        answers,
        nominationReason,
        firstName,
        lastName,
        jobTitle,
        idNumber,
        yearsExperience,
        company,
        department,
        mobile,
        email,
        // Department extras
        deptNameCompany,
        deptLeaderName,
        deptManagerPhone,
        deptManagerEmail,
        // Project extras
        projectCompany,
        projectTeamMembers,
        projectManagerName,
        projectManagerTitle,
        projectManagerPhone,
        projectManagerEmail,
        // Unsung extras
        supervisorName,
        supervisorId,
        yearsAtSAM,
        supervisorEmail,
        unsungJobCategory,
        hrRepName,
        hrRepSignature,
        directSupervisorSignature,
      };

      try {
        const API_BASE_URL = "/api/v1";
        // First get existing drafts, then update only this category's draft
        const getRes = await fetch(`${API_BASE_URL}/auth/draft/${user.id}`);
        let allDrafts: Record<string, any> = {};
        if (getRes.ok) {
          const existing = await getRes.json();
          allDrafts = existing.draft || {};
        }
        allDrafts[draftKey] = draftData;
        await fetch(`${API_BASE_URL}/auth/draft/${user.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: allDrafts }),
        });
      } catch (error) {
        console.error("Error saving draft:", error);
      }
    };

    // Debounce: save after 1 second of inactivity
    const timeoutId = setTimeout(saveDraft, 1000);
    return () => clearTimeout(timeoutId);
  }, [
    user,
    selectedCategory,
    employeeGroup,
    employeeSubcat,
    answers,
    nominationReason,
    firstName,
    lastName,
    jobTitle,
    idNumber,
    yearsExperience,
    company,
    department,
    mobile,
    email,
    deptNameCompany,
    deptLeaderName,
    deptManagerPhone,
    deptManagerEmail,
    projectCompany,
    projectTeamMembers,
    projectManagerName,
    projectManagerTitle,
    projectManagerPhone,
    projectManagerEmail,
    supervisorName,
    supervisorId,
    yearsAtSAM,
    supervisorEmail,
  ]);

  // ── Derived state ──
  const subcatOptions = useMemo(() => {
    if (selectedCategory !== "employee") return [];
    if (employeeGroup === "nonsupervisory") {
      // Hide الجندي المجهول for non-directors
      return user?.isDirector
        ? nonSupervisorySubcats
        : nonSupervisorySubcats.filter((s) => s.key !== "unsung");
    }
    return employeeGroup === "supervisory" ? supervisorySubcats : [];
  }, [selectedCategory, employeeGroup, user?.isDirector]);

  // Build full eligibility slug and category slug for tracking
  const eligibilitySlug = useMemo(() => {
    if (selectedCategory === "project") return "project";
    if (selectedCategory === "employee" && employeeGroup && employeeSubcat)
      return `employee-${employeeGroup}-${employeeSubcat}`;
    return null;
  }, [selectedCategory, employeeGroup, employeeSubcat]);

  // Build category slug for this application
  const categorySlug = useMemo(() => {
    if (selectedCategory === "department") return "department";
    if (selectedCategory === "project") return "project";
    if (selectedCategory === "green") return "green";
    if (selectedCategory === "knowledge") return "knowledge";
    if (selectedCategory === "employee" && employeeGroup && employeeSubcat)
      return `employee-${employeeGroup}-${employeeSubcat}`;
    return null;
  }, [selectedCategory, employeeGroup, employeeSubcat]);

  // Check if user has already applied to this category
  const hasAppliedToCategory = useMemo(() => {
    if (!user || !categorySlug) return false;
    // Check if fully submitted first
    if (user.submissions?.[categorySlug]) return true;
    return user.appliedCategories?.includes(categorySlug) || false;
  }, [user, categorySlug]);

  // Redirect qualified/submitted users to submission page (via useEffect to avoid setState during render)
  useEffect(() => {
    if (!isAuthenticated || !user || !categorySlug || !hasAppliedToCategory) return;
    const categoryStatus = user?.categoryStatuses?.[categorySlug] || "qualified";
    if (categoryStatus === "unqualified" || categoryStatus === "waiting-approval") return;
    // qualified or already submitted → redirect to submission page
    setIsRedirecting(true);
    router.push(`/${locale}/award-selection/${slug}/submission`);
  }, [isAuthenticated, user, categorySlug, hasAppliedToCategory, locale, slug, router]);

  const eligibility: EligibilityCategory | null = useMemo(() => {
    if (!eligibilitySlug) return null;
    return getEligibilityBySlug(eligibilitySlug);
  }, [eligibilitySlug]);

  // Does the current selection have eligibility questions?
  const hasEligibilityQuestions = eligibility !== null && eligibility.questions.length > 0;

  // Visible questions (handle parent/child)
  const visibleQuestions = useMemo(() => {
    if (!eligibility) return [];
    return eligibility.questions.filter((q) => {
      if (!q.parentId) return true;
      return answers[q.parentId] === q.parentAnswer;
    });
  }, [eligibility, answers]);

  // ── Handlers ──
  const handleCategoryChange = useCallback((cat: MainCategory) => {
    setIsNavigating(true);
    // Simulate a short loading delay for better UX
    setTimeout(() => {
      setSelectedCategory(cat);
      setEmployeeGroup(null);
      setEmployeeSubcat("");
      setAnswers({});
      setIsNavigating(false);
    }, 500);
  }, []);

  const handleGroupChange = useCallback((group: EmployeeGroup) => {
    setIsNavigating(true);
    setTimeout(() => {
      setEmployeeGroup(group);
      setEmployeeSubcat("");
      setAnswers({});
      setIsNavigating(false);
    }, 500);
  }, []);

  const handleSubcatChange = useCallback((val: string) => {
    setEmployeeSubcat(val);
    setAnswers({});
  }, []);

  const handleAnswer = useCallback(
    (questionId: string, value: string) => {
      setAnswers((prev) => {
        const next = { ...prev, [questionId]: value };
        // Clear child answers when parent changes
        if (eligibility) {
          for (const q of eligibility.questions) {
            if (q.parentId === questionId) {
              next[q.id] = null;
            }
          }
        }
        return next;
      });

      // Handle redirectOnNo: show toast and redirect after duration
      if (value === "no" && eligibility) {
        const question = eligibility.questions.find((q) => q.id === questionId);
        if (question?.redirectOnNo) {
          const redirect = question.redirectOnNo;
          const toastMsg = isAr ? redirect.toastAr : redirect.toastEn;
          setRedirectToast(toastMsg);
          setTimeout(() => {
            setRedirectToast(null);
            router.push(`/${locale}/award-selection/${redirect.redirectSlug}/apply`);
          }, redirect.durationMs);
        }
      }
    },
    [eligibility, isAr, locale, router]
  );

  // Check if a question's answer is acceptable
  const isAcceptable = (q: EligibilityQuestion, answer: string | null): boolean | null => {
    if (answer == null) return null;
    // Number-type questions: any non-empty value is acceptable
    if (q.type === "number") return answer.trim() !== "";
    if (answer === q.acceptableAnswer) return true;
    if (q.extraOptions) {
      const opt = q.extraOptions.find((o) => o.value === answer);
      if (opt?.acceptable) return true;
    }
    return false;
  };

  // ── Validation ──
  const isCategoryComplete = useMemo(() => {
    if (!selectedCategory) return false;
    if (selectedCategory === "employee") {
      return !!employeeGroup && !!employeeSubcat;
    }
    return true;
  }, [selectedCategory, employeeGroup, employeeSubcat]);

  const allQuestionsAnswered = useMemo(() => {
    if (!hasEligibilityQuestions) return true;
    return (
      visibleQuestions.length > 0 &&
      visibleQuestions.every((q) => {
        if (q.type === "number") return answers[q.id] != null && answers[q.id]!.trim() !== "";
        return answers[q.id] != null;
      })
    );
  }, [hasEligibilityQuestions, visibleQuestions, answers]);

  const isPersonalInfoComplete =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    jobTitle.trim() !== "" &&
    idNumber.trim() !== "" &&
    yearsExperience.trim() !== "" &&
    company.trim() !== "" &&
    department.trim() !== "" &&
    mobile.trim() !== "" &&
    email.trim() !== "";

  // Check category-specific extra fields
  const isCategoryExtraComplete = useMemo(() => {
    if (selectedCategory === "department") {
      return (
        deptNameCompany.trim() !== "" &&
        deptLeaderName.trim() !== "" &&
        deptManagerPhone.trim() !== "" &&
        deptManagerEmail.trim() !== ""
      );
    }
    if (selectedCategory === "project") {
      return (
        projectCompany.trim() !== "" &&
        projectTeamMembers.every((m) => m.name.trim() !== "" && m.title.trim() !== "") &&
        projectManagerName.trim() !== "" &&
        projectManagerTitle.trim() !== "" &&
        projectManagerPhone.trim() !== "" &&
        projectManagerEmail.trim() !== ""
      );
    }
    if (
      selectedCategory === "employee" &&
      employeeGroup === "nonsupervisory" &&
      employeeSubcat === "unsung"
    ) {
      return (
        supervisorName.trim() !== "" &&
        supervisorId.trim() !== "" &&
        yearsAtSAM.trim() !== "" &&
        supervisorEmail.trim() !== "" &&
        unsungJobCategory.trim() !== "" &&
        hrRepName.trim() !== "" &&
        hrRepSignature.trim() !== "" &&
        directSupervisorSignature.trim() !== ""
      );
    }
    return true; // No extra fields for other categories
  }, [
    selectedCategory,
    employeeGroup,
    employeeSubcat,
    deptNameCompany,
    deptLeaderName,
    deptManagerPhone,
    deptManagerEmail,
    projectCompany,
    projectTeamMembers,
    projectManagerName,
    projectManagerTitle,
    projectManagerPhone,
    projectManagerEmail,
    supervisorName,
    supervisorId,
    yearsAtSAM,
    supervisorEmail,
    unsungJobCategory,
    hrRepName,
    hrRepSignature,
    directSupervisorSignature,
  ]);

  // Word count for nomination reason
  const nominationWordCount = useMemo(() => {
    const text = nominationReason.trim();
    if (text === "") return 0;
    return text.split(/\s+/).length;
  }, [nominationReason]);

  const MAX_NOMINATION_WORDS = 400;

  const canSubmit =
    isCategoryComplete &&
    allQuestionsAnswered &&
    nominationReason.trim() !== "" &&
    nominationWordCount <= MAX_NOMINATION_WORDS &&
    isPersonalInfoComplete &&
    isCategoryExtraComplete;

  // ── Submission ──
  const handleSubmit = async () => {
    if (!canSubmit || !selectedCategory || !user || !categorySlug) return;
    setIsSubmitting(true);

    const registrationData = {
      category: selectedCategory,
      employeeGroup,
      employeeSubcat,
      firstName,
      lastName,
      jobTitle,
      idNumber,
      yearsExperience,
      company,
      department,
      mobile,
      email,
      nominationReason,
      answers,
      // Category-specific extras
      ...(selectedCategory === "department" && {
        deptNameCompany,
        deptLeaderName,
        deptManagerPhone,
        deptManagerEmail,
      }),
      ...(selectedCategory === "project" && {
        projectCompany,
        projectTeamMembers,
        projectManagerName,
        projectManagerTitle,
        projectManagerPhone,
        projectManagerEmail,
      }),
      ...(selectedCategory === "employee" &&
        employeeGroup === "nonsupervisory" &&
        employeeSubcat === "unsung" && {
          supervisorName,
          supervisorId,
          yearsAtSAM,
          supervisorEmail,
          unsungJobCategory,
          hrRepName,
          hrRepSignature,
          directSupervisorSignature,
        }),
    };

    // Determine status
    let resultStatus: "qualified" | "unqualified" | "waiting-approval" = "qualified";
    let reasons: string[] = [];

    if (hasEligibilityQuestions) {
      const failedQuestions = visibleQuestions.filter(
        (q) => !isAcceptable(q, answers[q.id])
      );
      if (failedQuestions.length > 0) {
        resultStatus = "unqualified";
        reasons = failedQuestions.map((q) => (isAr ? q.errorAr : q.errorEn));
      } else {
        // Employee and Project pass eligibility but still require admin approval
        resultStatus = "waiting-approval";
      }
    } else {
      // Department, Green, Knowledge → Waiting Approval
      resultStatus = "waiting-approval";
    }

    // Save ALL results to backend (qualified, unqualified, waiting-approval)
    try {
      const API_BASE_URL = "/api/v1";
      const response = await fetch(`${API_BASE_URL}/auth/complete-registration/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categorySlug: categorySlug,
          data: registrationData,
          status: resultStatus,
        }),
      });

      if (response.ok) {
        setResult({
          status: resultStatus,
          reasons,
        });
        // Persist employee subcategory so the submission page can auto-detect it
        if (selectedCategory === "employee" && employeeGroup && employeeSubcat) {
          try {
            localStorage.setItem(`sam-subcat-${user.id}-${employeeGroup}`, employeeSubcat);
          } catch { /* ignore */ }
        }
        // Refresh user data to update appliedCategories & categoryStatuses
        await refreshUser();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to save registration");
      }
    } catch (error: any) {
      console.error("Error saving registration:", error);
      alert(error.message || "حدث خطأ أثناء حفظ التسجيل. يرجى المحاولة مرة أخرى.");
      setIsSubmitting(false);
      return;
    }

    setSubmitted(true);
    setIsSubmitting(false);
  };

  // ── Auth check: show login prompt if not authenticated (skip in preview mode) ──
  if (!isAuthenticated && !isPreview) {
    return (
      <>
        <div className="min-h-[calc(100vh-5rem)] bg-sam-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-lg border border-sam-gray-100 p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sam-red-light mb-5">
                <Lock className="w-8 h-8 text-sam-red" />
              </div>
              <h1 className="text-xl font-bold text-sam-gray-900 mb-2">
                يجب تسجيل الدخول أولاً
              </h1>
              <p className="text-sm text-sam-gray-500 leading-relaxed mb-6">
                للمتابعة في عملية التقديم، يرجى تسجيل الدخول إلى حسابك أو إنشاء حساب جديد.
              </p>
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full py-3 rounded-lg bg-sam-red text-white font-semibold hover:bg-sam-red-dark transition-all shadow-lg shadow-sam-red/25"
              >
                تسجيل الدخول / إنشاء حساب
              </button>
              <Link
                href={`/award-selection/${slug}` as any}
                className="inline-flex items-center gap-2 mt-4 text-sm text-sam-gray-500 hover:text-sam-red transition-colors"
              >
                <BackArrow className="w-4 h-4" />
                العودة للفئة
              </Link>
            </div>
          </div>
        </div>
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => setShowLoginModal(false)}
        />
      </>
    );
  }

  // ── Check if user already applied to this specific category (skip in preview mode) ──
  if (!isPreview && (hasAppliedToCategory || isRedirecting)) {
    const categoryStatus = user?.categoryStatuses?.[categorySlug!] || "qualified";

    // Show status-specific screens
    if (categoryStatus === "unqualified") {
      return (
        <div className="min-h-[calc(100vh-5rem)] bg-sam-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-lg border border-sam-gray-100 p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-5">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
              <h1 className="text-xl font-bold text-sam-gray-900 mb-2">
                {isAr ? "غير مؤهل لهذه الفئة" : "Not Qualified"}
              </h1>
              <p className="text-sm text-sam-gray-500 leading-relaxed mb-6">
                {isAr
                  ? "لقد تقدمت لهذه الفئة مسبقاً وتبيّن أنك غير مؤهل بناءً على إجاباتك. يمكنك التقديم لفئات أخرى."
                  : "You have already applied for this category and were found not qualified based on your answers. You can apply for other categories."}
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/award-selection"
                  className="w-full py-3 rounded-lg bg-sam-red text-white font-semibold hover:bg-sam-red-dark transition-all shadow-lg shadow-sam-red/25"
                >
                  {isAr ? "اختر فئة أخرى" : "Choose Another Category"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (categoryStatus === "waiting-approval") {
      return (
        <div className="min-h-[calc(100vh-5rem)] bg-sam-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-lg border border-sam-gray-100 p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sam-gold-light mb-5">
                <Clock className="w-8 h-8 text-sam-gold" />
              </div>
              <h1 className="text-xl font-bold text-sam-gray-900 mb-2">
                {isAr ? "بانتظار الموافقة" : "Waiting for Approval"}
              </h1>
              <p className="text-sm text-sam-gray-500 leading-relaxed mb-6">
                {isAr
                  ? "لقد تم تسجيلك لهذه الفئة وطلبك قيد المراجعة. سيتم إشعارك عند الموافقة."
                  : "You have registered for this category and your application is under review. You will be notified upon approval."}
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/award-selection"
                  className="w-full py-3 rounded-lg bg-sam-red text-white font-semibold hover:bg-sam-red-dark transition-all shadow-lg shadow-sam-red/25"
                >
                  {isAr ? "اختر فئة أخرى" : "Choose Another Category"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Qualified or submitted → show spinner while useEffect handles the redirect
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-sam-gray-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ── Result screen ──
  if (submitted && result) {
    const statusConfig = {
      qualified: {
        icon: CheckCircle,
        iconBg: "bg-sam-green-light",
        iconColor: "text-sam-green",
        badgeBg: "bg-sam-green-light",
        badgeColor: "text-sam-green",
      },
      unqualified: {
        icon: XCircle,
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
        badgeBg: "bg-red-50",
        badgeColor: "text-red-600",
      },
      "waiting-approval": {
        icon: Clock,
        iconBg: "bg-sam-gold-light",
        iconColor: "text-sam-gold",
        badgeBg: "bg-sam-gold-light",
        badgeColor: "text-sam-gold",
      },
    };
    const cfg = statusConfig[result.status];
    const StatusIcon = cfg.icon;
    const statusKey = result.status === "qualified" ? "Qualified" : result.status === "unqualified" ? "Unqualified" : "Waiting";
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-sam-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg border border-sam-gray-100 p-8 text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${cfg.iconBg} mb-5`}>
              <StatusIcon className={`w-8 h-8 ${cfg.iconColor}`} />
            </div>
            <h1 className="text-xl font-bold text-sam-gray-900 mb-2">
              {t(`${statusKey.toLowerCase()}Title`)}
            </h1>
            <p className="text-sm text-sam-gray-500 leading-relaxed mb-6">
              {t(`${statusKey.toLowerCase()}Message`)}
            </p>

            {result.status === "unqualified" && result.reasons.length > 0 && (
              <div className="text-start bg-red-50/50 rounded-xl p-4 border border-red-100 mb-6">
                <h3 className="text-xs font-bold text-red-600 mb-2.5 uppercase tracking-wide">{t("reasons")}</h3>
                <ul className="space-y-2">
                  {result.reasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-sam-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {result.status === "qualified" && (
                <Link
                  href={`/award-selection/${slug}/submission` as any}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-sam-green text-white rounded-lg hover:bg-sam-green/90 transition-all shadow-lg shadow-sam-green/25"
                >
                  <FileText className="w-4 h-4" />
                  {isAr ? "متابعة التقديم" : "Continue to Submission"}
                </Link>
              )}
              <Link
                href="/award-selection"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-white text-sam-gray-700 rounded-lg border border-sam-gray-200 hover:bg-sam-gray-50 transition-all"
              >
                <BackArrow className="w-4 h-4" />
                {t("backToCategory")}
              </Link>
            </div>
          </div>{/* End card */}
        </div>
      </div>
    );
  }

  // ── Main form ──
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-sam-gray-50 relative">
      {/* Loading Overlay — also shown during redirect toast */}
      {(isSubmitting || isNavigating || redirectToast) && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-sam-red border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-sam-gray-600 animate-pulse">
              {isSubmitting ? (isAr ? "جاري المعالجة..." : "Processing...") : (isAr ? "جاري التحميل..." : "Loading...")}
            </p>
          </div>
        </div>
      )}

      {/* Redirect Toast */}
      {redirectToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-2xl shadow-red-600/30 flex items-center gap-3 text-sm font-semibold">
            <XCircle className="w-5 h-5 flex-shrink-0" />
            <span>{redirectToast}</span>
          </div>
        </div>
      )}
      {/* Preview Mode Banner */}
      {isPreview && (
        <div className="bg-sam-gold/10 border-b-2 border-sam-gold/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-sam-gold flex-shrink-0" />
              <p className="text-sm font-medium text-sam-gray-700">
                {isAr
                  ? "وضع الاستعراض — لن يتم إرسال أي بيانات"
                  : "Preview Mode — No data will be submitted"}
              </p>
            </div>
            <Link
              href="/preview"
              className="text-xs font-semibold text-sam-gold hover:underline flex-shrink-0"
            >
              {isAr ? "← العودة لقائمة الفئات" : "← Back to categories"}
            </Link>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Back */}
        <Link
          href={isPreview ? ("/preview" as any) : (`/award-selection/${slug}` as any)}
          className="inline-flex items-center gap-2 text-sm font-medium text-sam-gray-600 hover:text-sam-red transition-colors mb-8"
        >
          <BackArrow className="w-4 h-4" />
          {td("backButton")}
        </Link>

        {/* Form Card Wrapper */}
        <div className="bg-white rounded-2xl shadow-sm border border-sam-gray-100 p-6 sm:p-8 lg:p-10">

          {/* Header */}
          <div className="text-center mb-10 pb-6 border-b border-sam-gray-100">
            <h1 className="text-2xl sm:text-3xl font-bold text-sam-gray-900 mb-3">
              {t("pageTitle")}
            </h1>
            <p className="text-sam-gray-500 max-w-xl mx-auto text-sm">
              {t("pageSubtitle")}
            </p>
          </div>

          {/* ═══ STEP 1: Choose the Award ═══ */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sam-red text-white text-sm font-bold">
                1
              </span>
              <h2 className="text-lg font-bold text-sam-gray-900">{t("step1Title")}</h2>
            </div>

            {/* Category cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {mainCategories.map(({ key, icon: Icon }) => {
                const isSelected = selectedCategory === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleCategoryChange(key)}
                    className={`relative group text-start p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${isSelected
                      ? "border-sam-red bg-sam-red-light/30 shadow-sm"
                      : "border-sam-gray-200 bg-sam-gray-50 hover:border-sam-red/30 hover:shadow-sm"
                      }`}
                  >
                    {isSelected && (
                      <CheckCircle className="absolute top-3 end-3 w-5 h-5 text-sam-red" />
                    )}
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 transition-colors ${isSelected
                        ? "bg-sam-red text-white"
                        : "bg-sam-gray-100 text-sam-gray-500 group-hover:bg-sam-red-light group-hover:text-sam-red"
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-semibold text-sam-gray-900">
                      {t(`categories.${key}`)}
                    </h3>
                  </button>
                );
              })}
            </div>

            {/* Employee Group Selection — hidden when pre-set from URL */}
            {
              selectedCategory === "employee" && !groupLockedByUrl && (
                <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-medium text-sam-gray-700 mb-3">
                    {ta("selectGroup")}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleGroupChange("nonsupervisory")}
                      className={`relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer text-start ${employeeGroup === "nonsupervisory"
                        ? "border-sam-red bg-sam-red-light/30 shadow-sm"
                        : "border-sam-gray-200 bg-sam-gray-50 hover:border-sam-red/30 hover:shadow-sm"
                        }`}
                    >
                      {employeeGroup === "nonsupervisory" && (
                        <CheckCircle className="absolute top-3 end-3 w-4 h-4 text-sam-red" />
                      )}
                      <div
                        className={`inline-flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0 ${employeeGroup === "nonsupervisory"
                          ? "bg-sam-red text-white"
                          : "bg-sam-gray-100 text-sam-gray-500"
                          }`}
                      >
                        <Users className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sam-gray-900 text-sm">
                        {ta("nonSupervisory")}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleGroupChange("supervisory")}
                      className={`relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer text-start ${employeeGroup === "supervisory"
                        ? "border-sam-red bg-sam-red-light/30 shadow-sm"
                        : "border-sam-gray-200 bg-sam-gray-50 hover:border-sam-red/30 hover:shadow-sm"
                        }`}
                    >
                      {employeeGroup === "supervisory" && (
                        <CheckCircle className="absolute top-3 end-3 w-4 h-4 text-sam-red" />
                      )}
                      <div
                        className={`inline-flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0 ${employeeGroup === "supervisory"
                          ? "bg-sam-red text-white"
                          : "bg-sam-gray-100 text-sam-gray-500"
                          }`}
                      >
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sam-gray-900 text-sm">
                        {ta("supervisory")}
                      </span>
                    </button>
                  </div>
                </div>
              )
            }


            {/* Employee Subcategory Selection */}
            {
              selectedCategory === "employee" && employeeGroup && (
                <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-medium text-sam-gray-700 mb-2">
                    {t("selectSubcategory")}
                  </label>
                  <div className="relative">
                    <select
                      value={employeeSubcat}
                      onChange={(e) => handleSubcatChange(e.target.value)}
                      className="w-full appearance-none bg-sam-gray-50 border-2 border-sam-gray-200 rounded-xl px-4 py-3.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all cursor-pointer"
                    >
                      <option value="">{t("selectSubcategory")}</option>
                      {subcatOptions.map((opt) => (
                        <option key={opt.key} value={opt.key}>
                          {isAr ? opt.ar : opt.en}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute top-1/2 -translate-y-1/2 end-4 w-5 h-5 text-sam-gray-400 pointer-events-none" />
                  </div>
                </div>
              )
            }
          </section >

          {/* ═══ STEP 2: Reason for Nomination ═══ */}
          {
            isCategoryComplete && (
              <section className="mb-10 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sam-red text-white text-sm font-bold">
                    2
                  </span>
                  <h2 className="text-lg font-bold text-sam-gray-900">{t("step2Title")}</h2>
                </div>
                <div className="relative">
                  <textarea
                    value={nominationReason}
                    onChange={(e) => setNominationReason(e.target.value)}
                    placeholder={t("reasonPlaceholder")}
                    rows={4}
                    className={`w-full bg-sam-gray-50 border-2 rounded-xl px-4 py-3.5 text-sm text-sam-gray-900 focus:ring-2 outline-none transition-all resize-none placeholder:text-sam-gray-400 ${
                      nominationWordCount > MAX_NOMINATION_WORDS
                        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                        : "border-sam-gray-200 focus:border-sam-red focus:ring-sam-red/20"
                    }`}
                  />
                  <div className={`flex items-center justify-end mt-1.5 text-xs ${
                    nominationWordCount > MAX_NOMINATION_WORDS ? "text-red-500 font-semibold" : "text-sam-gray-400"
                  }`}>
                    {nominationWordCount > MAX_NOMINATION_WORDS && (
                      <span className="me-2">{t("wordLimitExceeded")}</span>
                    )}
                    <span>{t("wordCount", { count: nominationWordCount, max: MAX_NOMINATION_WORDS })}</span>
                  </div>
                </div>
              </section>
            )
          }

          {/* ═══ Eligibility Q&A (shown after nomination reason, if applicable) ═══ */}
          {
            isCategoryComplete && hasEligibilityQuestions && (
              <section className="mb-10 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 rounded-full bg-sam-gold" />
                  <h2 className="text-lg font-bold text-sam-gray-900">{t("eligibilityTitle")}</h2>
                </div>
                <p className="text-sm text-sam-gray-500 mb-6">{t("eligibilitySubtitle")}</p>

                {eligibility?.subcategoryLabel && (
                  <div className="text-center mb-5">
                    <span className="inline-block bg-sam-red-light text-sam-red text-sm font-semibold px-4 py-1.5 rounded-full">
                      {isAr ? eligibility.subcategoryLabel.ar : eligibility.subcategoryLabel.en}
                    </span>
                  </div>
                )}

                <div className="space-y-5">
                  {visibleQuestions.map((q) => {
                    const answer = answers[q.id];
                    const isSubQ = !!q.parentId;
                    const isNumberType = q.type === "number";

                    return (
                      <div
                        key={q.id}
                        className={`bg-sam-gray-50 rounded-xl p-5 border-2 transition-colors ${isSubQ ? "ms-6 border-s-4 border-s-sam-gold/40" : ""
                          } ${answer != null ? "border-sam-gray-200" : "border-sam-gray-100"}`}
                      >
                        <p className="text-sm font-medium text-sam-gray-900 mb-4">
                          {isSubQ && (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-sam-gold-light text-xs font-bold text-sam-gold me-2">
                              ↳
                            </span>
                          )}
                          {isAr ? q.textAr : q.textEn}
                        </p>
                        {isNumberType ? (
                          <input
                            type="number"
                            min="0"
                            value={answer || ""}
                            onChange={(e) => handleAnswer(q.id, e.target.value)}
                            placeholder={isAr ? q.placeholderAr : q.placeholderEn}
                            className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                          />
                        ) : (
                        <div className="flex gap-3 flex-wrap">
                          <button
                            type="button"
                            onClick={() => handleAnswer(q.id, "yes")}
                            className={`flex-1 min-w-[80px] py-2.5 rounded-lg text-sm font-medium border-2 transition-all cursor-pointer ${answer === "yes"
                              ? "border-sam-green bg-sam-green-light text-sam-green"
                              : "border-sam-gray-200 text-sam-gray-600 hover:border-sam-green/40"
                              }`}
                          >
                            {t("yes")}
                          </button>
                          {q.extraOptions?.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => handleAnswer(q.id, opt.value)}
                              className={`flex-1 min-w-[80px] py-2.5 rounded-lg text-sm font-medium border-2 transition-all cursor-pointer ${answer === opt.value
                                ? "border-sam-green bg-sam-green-light text-sam-green"
                                : "border-sam-gray-200 text-sam-gray-600 hover:border-sam-green/40"
                                }`}
                            >
                              {isAr ? opt.labelAr : opt.labelEn}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => handleAnswer(q.id, "no")}
                            className={`flex-1 min-w-[80px] py-2.5 rounded-lg text-sm font-medium border-2 transition-all cursor-pointer ${answer === "no"
                              ? "border-sam-red bg-red-50 text-red-600"
                              : "border-sam-gray-200 text-sam-gray-600 hover:border-red-300"
                              }`}
                          >
                            {t("no")}
                          </button>
                        </div>
                        )}
                        {/* No inline error messages — errors only shown on final submission */}
                      </div>
                    );
                  })}
                </div>
              </section>
            )
          }


          {/* ═══ STEP 3: Nominee Information ═══ */}
          {
            isCategoryComplete && (
              <section className="mb-10 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sam-red text-white text-sm font-bold">
                    3
                  </span>
                  <h2 className="text-lg font-bold text-sam-gray-900">{t("step3Title")}</h2>
                </div>
                <p className="text-sm text-sam-gray-500 mb-6">{t("nomineeSubtitle")}</p>

                <div className="bg-sam-gray-50 rounded-2xl border-2 border-sam-gray-100 p-6 space-y-5">
                  {/* Row 1: First Name, Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                        {t("firstName")}
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                        {t("lastName")}
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Job Title, Employee ID, Years of Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                        {t("jobTitle")}
                      </label>
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                        {t("idNumber")}
                      </label>
                      <input
                        type="text"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                        {t("yearsExperience")}
                      </label>
                      <input
                        type="text"
                        value={yearsExperience}
                        onChange={(e) => setYearsExperience(e.target.value)}
                        className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3: Company, Department */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                        {t("nomineeCompany")}
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                        {t("nomineeDepartment")}
                      </label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 4: Mobile, Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                        {t("mobileNumber")}
                      </label>
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                        {t("emailAddress")}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* ── Department Category Extra Fields ── */}
                {selectedCategory === "department" && (
                  <div className="mt-6 bg-sam-gray-50 rounded-2xl border-2 border-sam-gray-100 p-6 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h3 className="text-sm font-bold text-sam-gray-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-sam-red" />
                      {t("deptFieldsTitle")}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                          {t("deptNameCompany")}
                        </label>
                        <input
                          type="text"
                          value={deptNameCompany}
                          onChange={(e) => setDeptNameCompany(e.target.value)}
                          className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                          {t("deptLeaderName")}
                        </label>
                        <input
                          type="text"
                          value={deptLeaderName}
                          onChange={(e) => setDeptLeaderName(e.target.value)}
                          className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                          {t("deptManagerPhone")}
                        </label>
                        <input
                          type="tel"
                          value={deptManagerPhone}
                          onChange={(e) => setDeptManagerPhone(e.target.value)}
                          className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                          {t("deptManagerEmail")}
                        </label>
                        <input
                          type="email"
                          value={deptManagerEmail}
                          onChange={(e) => setDeptManagerEmail(e.target.value)}
                          className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Project Category Extra Fields ── */}
                {selectedCategory === "project" && (
                  <div className="mt-6 bg-sam-gray-50 rounded-2xl border-2 border-sam-gray-100 p-6 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h3 className="text-sm font-bold text-sam-gray-900 flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-sam-red" />
                      {t("projectFieldsTitle")}
                    </h3>
                    <div>
                      <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                        {t("projectCompany")}
                      </label>
                      <input
                        type="text"
                        value={projectCompany}
                        onChange={(e) => setProjectCompany(e.target.value)}
                        className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                      />
                    </div>

                    {/* Team Members */}
                    <div>
                      <label className="block text-xs font-semibold text-sam-gray-600 mb-2">
                        {t("projectTeamMembers")}
                      </label>
                      <div className="space-y-3">
                        {projectTeamMembers.map((member, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder={t("teamMemberName")}
                                value={member.name}
                                onChange={(e) => {
                                  const updated = [...projectTeamMembers];
                                  updated[idx] = { ...updated[idx], name: e.target.value };
                                  setProjectTeamMembers(updated);
                                }}
                                className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all placeholder:text-sam-gray-400"
                              />
                              <input
                                type="text"
                                placeholder={t("teamMemberTitle")}
                                value={member.title}
                                onChange={(e) => {
                                  const updated = [...projectTeamMembers];
                                  updated[idx] = { ...updated[idx], title: e.target.value };
                                  setProjectTeamMembers(updated);
                                }}
                                className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all placeholder:text-sam-gray-400"
                              />
                            </div>
                            {projectTeamMembers.length > 1 && (
                              <button
                                type="button"
                                onClick={() => setProjectTeamMembers(projectTeamMembers.filter((_, i) => i !== idx))}
                                className="flex-shrink-0 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title={t("removeTeamMember")}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setProjectTeamMembers([...projectTeamMembers, { name: "", title: "" }])}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-sam-red hover:text-sam-red-dark transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        {t("addTeamMember")}
                      </button>
                    </div>

                    {/* Project Manager Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                          {t("projectManagerName")}
                        </label>
                        <input
                          type="text"
                          value={projectManagerName}
                          onChange={(e) => setProjectManagerName(e.target.value)}
                          className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                          {t("projectManagerTitle")}
                        </label>
                        <input
                          type="text"
                          value={projectManagerTitle}
                          onChange={(e) => setProjectManagerTitle(e.target.value)}
                          className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                          {t("projectManagerPhone")}
                        </label>
                        <input
                          type="tel"
                          value={projectManagerPhone}
                          onChange={(e) => setProjectManagerPhone(e.target.value)}
                          className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                          {t("projectManagerEmail")}
                        </label>
                        <input
                          type="email"
                          value={projectManagerEmail}
                          onChange={(e) => setProjectManagerEmail(e.target.value)}
                          className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Unsung Hero Extra Fields ── */}
                {selectedCategory === "employee" && employeeGroup === "nonsupervisory" && employeeSubcat === "unsung" && (
                  <div className="mt-6 bg-sam-gray-50 rounded-2xl border-2 border-sam-gray-100 p-6 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h3 className="text-sm font-bold text-sam-gray-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-sam-red" />
                      {t("unsungFieldsTitle")}
                    </h3>

                    {/* Job Category Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold text-sam-gray-600 mb-1">
                        {t("unsungJobCategory")}
                      </label>
                      <p className="text-[11px] text-sam-gray-400 mb-1.5">{t("unsungJobCategoryHint")}</p>
                      <div className="relative">
                        <select
                          value={unsungJobCategory}
                          onChange={(e) => setUnsungJobCategory(e.target.value)}
                          className="w-full appearance-none bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all pe-9"
                        >
                          <option value="">{t("unsungJobCategoryPlaceholder")}</option>
                          <option value="team-leader">Team Leader</option>
                          <option value="technician">Technician</option>
                          <option value="frontline">Frontline</option>
                          <option value="support">Support</option>
                          <option value="manual">Manual</option>
                        </select>
                        <ChevronDown className="absolute top-1/2 -translate-y-1/2 end-3 w-4 h-4 text-sam-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                          {t("supervisorName")}
                        </label>
                        <input
                          type="text"
                          value={supervisorName}
                          onChange={(e) => setSupervisorName(e.target.value)}
                          className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                          {t("supervisorId")}
                        </label>
                        <input
                          type="text"
                          value={supervisorId}
                          onChange={(e) => setSupervisorId(e.target.value)}
                          className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                          {t("yearsAtSAM")}
                        </label>
                        <input
                          type="text"
                          value={yearsAtSAM}
                          onChange={(e) => setYearsAtSAM(e.target.value)}
                          className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                          {t("supervisorEmail")}
                        </label>
                        <input
                          type="email"
                          value={supervisorEmail}
                          onChange={(e) => setSupervisorEmail(e.target.value)}
                          className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* HR Representative Name */}
                    <div>
                      <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                        {t("hrRepName")}
                      </label>
                      <input
                        type="text"
                        value={hrRepName}
                        onChange={(e) => setHrRepName(e.target.value)}
                        className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2.5 text-sm text-sam-gray-900 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                      />
                    </div>

                    {/* HR Representative Signature */}
                    <div>
                      <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                        {t("hrRepSignature")}
                      </label>
                      <p className="text-[11px] text-sam-gray-400 mb-1.5">{t("signatureUploadHint")}</p>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setHrRepSignature(file.name);
                        }}
                        className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2 text-sm text-sam-gray-900 file:me-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-sam-red-light file:text-sam-red hover:file:bg-sam-red/10 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                      />
                      {hrRepSignature && (
                        <p className="text-xs text-sam-green mt-1 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> {hrRepSignature}
                        </p>
                      )}
                    </div>

                    {/* Direct Supervisor Signature */}
                    <div>
                      <label className="block text-xs font-semibold text-sam-gray-600 mb-1.5">
                        {t("directSupervisorSignature")}
                      </label>
                      <p className="text-[11px] text-sam-gray-400 mb-1.5">{t("signatureUploadHint")}</p>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setDirectSupervisorSignature(file.name);
                        }}
                        className="w-full bg-white border-2 border-sam-gray-200 rounded-lg px-3 py-2 text-sm text-sam-gray-900 file:me-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-sam-red-light file:text-sam-red hover:file:bg-sam-red/10 focus:border-sam-red focus:ring-2 focus:ring-sam-red/20 outline-none transition-all"
                      />
                      {directSupervisorSignature && (
                        <p className="text-xs text-sam-green mt-1 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> {directSupervisorSignature}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </section>
            )
          }

          {/* ═══ Submit Button ═══ */}
          <div className="pt-4 mt-4 border-t border-sam-gray-100">
            {isPreview ? (
              <div className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold bg-sam-gold/10 text-sam-gold border-2 border-sam-gold/30">
                <Eye className="w-5 h-5" />
                {isAr ? "وضع الاستعراض فقط — الإرسال معطّل" : "Preview Mode Only — Submission Disabled"}
              </div>
            ) : (
            <button
              type="button"
              disabled={!canSubmit || isSubmitting}
              onClick={handleSubmit}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all ${canSubmit && !isSubmitting
                ? "bg-sam-red text-white hover:bg-sam-red-dark shadow-lg shadow-sam-red/25 cursor-pointer"
                : "bg-sam-gray-200 text-sam-gray-400 cursor-not-allowed"
                }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isAr ? "جارٍ الإرسال..." : "Submitting..."}
                </>
              ) : (
                <>
                  {t("submitButton")}
                  <Send className="w-5 h-5 rtl:-scale-x-100" />
                </>
              )}
            </button>
            )}
          </div>

        </div > {/* End Form Card Wrapper */}
      </div >
    </div >
  );
}
