export interface EligibilityQuestion {
  id: string;
  textAr: string;
  textEn: string;
  /** Question type: "boolean" (default yes/no) or "number" (numeric input) */
  type?: "boolean" | "number";
  /** "yes" means the acceptable answer is yes; "no" means acceptable is no (only for boolean type) */
  acceptableAnswer?: "yes" | "no";
  errorAr: string;
  errorEn: string;
  /** If set, this question is only shown when the parent question has the specified answer */
  parentId?: string;
  parentAnswer?: "yes" | "no";
  /** Additional acceptable answer options beyond yes/no (e.g. "nominated by CEO") */
  extraOptions?: {
    value: string;
    labelAr: string;
    labelEn: string;
    acceptable: boolean;
  }[];
  /** Placeholder text for number inputs */
  placeholderAr?: string;
  placeholderEn?: string;
  /** If true, answering "no" will show a toast and redirect to the specified path */
  redirectOnNo?: {
    toastAr: string;
    toastEn: string;
    redirectSlug: string;
    durationMs: number;
  };
}

export interface EligibilityCategory {
  slugs: string[];
  /** If provided, this is a sub-category within the slug. Key = subcategory index or identifier */
  subcategoryLabel?: { ar: string; en: string };
  questions: EligibilityQuestion[];
}

/**
 * Eligibility rules per (sub)category.
 * Only employee subcategories and project have eligibility checks.
 */
export const eligibilityData: EligibilityCategory[] = [
  // ── Distinguished Administrative Employee ──
  {
    slugs: ["employee-nonsupervisory-administrative"],
    subcategoryLabel: {
      ar: "الموظف الإداري المتميز",
      en: "The Distinguished Administrative Employee",
    },
    questions: [
      {
        id: "admin-years",
        textAr: "هل أكملت 3 سنوات أو أكثر من الخدمة؟",
        textEn: "Have you completed 3 or more years of service?",
        acceptableAnswer: "yes",
        errorAr: "يجب أن تكون قد أكملت 3 سنوات من الخدمة أو أن يتم ترشيحك من قبل الرئيس التنفيذي.",
        errorEn: "You must have completed 3 years of service or be nominated by the CEO.",
        extraOptions: [
          {
            value: "ceo-nominated",
            labelAr: "تم ترشيحي من قبل الرئيس التنفيذي",
            labelEn: "Nominated by CEO",
            acceptable: true,
          },
        ],
      },
    ],
  },

  // ── Distinguished Specialized Employee ──
  {
    slugs: ["employee-nonsupervisory-specialist"],
    subcategoryLabel: {
      ar: "الموظف التخصصي المتميز",
      en: "The Distinguished Specialized Employee",
    },
    questions: [
      {
        id: "spec-years",
        textAr: "هل أكملت 3 سنوات أو أكثر من الخدمة؟",
        textEn: "Have you completed 3 or more years of service?",
        acceptableAnswer: "yes",
        errorAr: "يجب أن تكون قد أكملت 3 سنوات أو أكثر من الخدمة.",
        errorEn: "You must have completed 3 or more years of service.",
      },
    ],
  },

  // ── Distinguished Technical Field Employee ──
  {
    slugs: ["employee-nonsupervisory-technical"],
    subcategoryLabel: {
      ar: "الموظف الفني الميداني المتميز",
      en: "The Distinguished Technical Field Employee",
    },
    questions: [
      {
        id: "tech-years",
        textAr: "هل أكملت 3 سنوات أو أكثر من الخدمة؟",
        textEn: "Have you completed 3 or more years of service?",
        acceptableAnswer: "yes",
        errorAr: "يجب أن تكون قد أكملت 3 سنوات أو أكثر من الخدمة.",
        errorEn: "You must have completed 3 or more years of service.",
      },
      {
        id: "tech-field",
        textAr: "هل يشمل دورك العمل الميداني المباشر والتنفيذ على أرض الواقع؟",
        textEn: "Does your role involve direct fieldwork and hands-on project execution?",
        acceptableAnswer: "yes",
        errorAr: "يجب أن يشمل دورك العمل الميداني المباشر والتنفيذ على أرض الواقع.",
        errorEn: "Your role must involve direct fieldwork and hands-on project execution.",
      },
    ],
  },

  // ── Distinguished Customer Service Employee ──
  {
    slugs: ["employee-nonsupervisory-customerservice"],
    subcategoryLabel: {
      ar: "موظف خدمة المتعاملين المتميز",
      en: "The Distinguished Customer Service Employee",
    },
    questions: [
      {
        id: "cs-external",
        textAr: "هل تعمل مباشرة في خدمة العملاء الخارجيين (مثل: موظف استقبال، تنفيذي خط أمامي، تنفيذي خدمة عملاء)؟",
        textEn: "Are you directly engaged with serving external customers (e.g., Receptionist, Front-line Executive, Customer Service Executive)?",
        acceptableAnswer: "yes",
        errorAr: "يجب أن تكون مشاركاً مباشرة في خدمة العملاء الخارجيين.",
        errorEn: "You must be directly engaged with serving external customers.",
      },
    ],
  },

  // ── The Distinguished Leader ──
  {
    slugs: ["employee-supervisory-leader"],
    subcategoryLabel: {
      ar: "القائد المتميز",
      en: "The Distinguished Leader",
    },
    questions: [
      {
        id: "leader-position",
        textAr: "هل تشغل منصباً تنفيذياً عالياً (مدير تنفيذي فما فوق)؟",
        textEn: "Are you in a senior executive position (Executive Director and above)?",
        acceptableAnswer: "yes",
        errorAr: "يجب أن تكون في منصب تنفيذي عالٍ (مدير تنفيذي فما فوق).",
        errorEn: "You must be in a senior executive position (Executive Director and above).",
      },
      {
        id: "leader-24months",
        textAr: "هل أكملت 24 شهراً على الأقل من الخدمة (باستثناء فترة الاختبار) في نفس المنصب في الشارقة لإدارة الأصول؟",
        textEn: "Have you completed at least 24 months of service (excluding the probation period) in the same position in SAM?",
        acceptableAnswer: "yes",
        errorAr: "يجب أن تكون قد أكملت 24 شهراً على الأقل من الخدمة في نفس المنصب في الشارقة لإدارة الأصول.",
        errorEn: "You must have completed at least 24 months of service (excluding probation) in the same position in SAM.",
      },
      {
        id: "leader-emp-count",
        type: "number",
        textAr: "كم عدد الموظفين المسؤول عنهم؟",
        textEn: "How many employees are you responsible for?",
        placeholderAr: "أدخل عدد الموظفين",
        placeholderEn: "Enter number of employees",
        errorAr: "يرجى إدخال عدد الموظفين المسؤول عنهم.",
        errorEn: "Please enter the number of employees you are responsible for.",
      },
      {
        id: "leader-dept",
        textAr: "هل قسمك مشارك في فئة الادارة المتميزة؟",
        textEn: "Is your department participating in the Distinguished Management category?",
        acceptableAnswer: "yes",
        errorAr: "يجب ان يكون قسمك مشارك في فئة الإدارة المتميزة.",
        errorEn: "Your department must be participating in the Distinguished Management category.",
        redirectOnNo: {
          toastAr: "يجب ان يكون قسمك مشارك في فئة الإدارة المتميزة، سيتم تحويلك لصفحة التسجيل",
          toastEn: "Your department must be participating. Redirecting to department registration...",
          redirectSlug: "department",
          durationMs: 3000,
        },
      },
    ],
  },

  // ── The Distinguished Future Leader ──
  {
    slugs: ["employee-supervisory-futureleader"],
    subcategoryLabel: {
      ar: "قائد المستقبل المتميز",
      en: "The Distinguished Future Leader",
    },
    questions: [
      {
        id: "fl-position",
        textAr: "هل تشغل منصباً قيادياً (مشرف فما فوق) ولديك مرؤوسون مباشرون؟",
        textEn: "Are you in a leadership position (Supervisor level and above) with direct subordinates?",
        acceptableAnswer: "yes",
        errorAr: "يجب أن تكون في منصب قيادي مع مرؤوسين مباشرين.",
        errorEn: "You must be in a leadership position with direct subordinates.",
      },
      {
        id: "fl-years",
        textAr: "هل أكملت 3 سنوات أو أكثر من الخدمة في نفس المنصب في الشارقة لإدارة الأصول؟",
        textEn: "Have you completed 3 or more years of service in the same position in SAM?",
        acceptableAnswer: "yes",
        errorAr: "يجب أن تكون قد أكملت 3 سنوات أو أكثر من الخدمة في نفس المنصب في الشارقة لإدارة الأصول.",
        errorEn: "You must have completed 3 or more years of service in the same position in SAM.",
      },
      {
        id: "fl-emp-count",
        type: "number",
        textAr: "كم عدد الموظفين المسؤول عنهم؟",
        textEn: "How many employees are you responsible for?",
        placeholderAr: "أدخل عدد الموظفين",
        placeholderEn: "Enter number of employees",
        errorAr: "يرجى إدخال عدد الموظفين المسؤول عنهم.",
        errorEn: "Please enter the number of employees you are responsible for.",
      },
      {
        id: "leader-dept",
        textAr: "هل قسمك مشارك في فئة الادارة المتميزة؟",
        textEn: "Is your department participating in the Distinguished Management category?",
        acceptableAnswer: "yes",
        errorAr: "يجب ان يكون قسمك مشارك في فئة الإدارة المتميزة.",
        errorEn: "Your department must be participating in the Distinguished Management category.",
        redirectOnNo: {
          toastAr: "يجب ان يكون قسمك مشارك في فئة الإدارة المتميزة، سيتم تحويلك لصفحة التسجيل",
          toastEn: "Your department must be participating. Redirecting to department registration...",
          redirectSlug: "department",
          durationMs: 3000,
        },
      },
    ],
  },

  // ── Distinguished Project / Initiative (no subcategory) ──
  {
    slugs: ["project"],
    questions: [
      {
        id: "proj-completed",
        textAr: "هل تم إنجاز المشروع/المبادرة بالكامل؟",
        textEn: "Has the project/initiative been fully completed?",
        acceptableAnswer: "yes",
        errorAr: "يجب أن يكون المشروع/المبادرة قد تم إنجازه بالكامل للتأهل.",
        errorEn: "The project/initiative must be fully completed to be eligible.",
      },
      {
        id: "proj-duration",
        textAr: "هل تم إنجاز المشروع/المبادرة خلال اخر سنتين؟",
        textEn: "Was the project/initiative completed in the last 2 years?",
        acceptableAnswer: "yes",
        errorAr: "يجب أن يكون المشروع/المبادرة قد أُنجز خلال آخر سنتين.",
        errorEn: "The project/initiative must have been completed in the last 2 years.",
        parentId: "proj-completed",
        parentAnswer: "yes",
      },
      {
        id: "proj-kpi",
        textAr: "هل لديك تقارير حالة ونتائج مؤشرات أداء رئيسية مدعومة بأدلة موضوعية؟",
        textEn: "Do you have status reports and KPI results backed by objective evidence?",
        acceptableAnswer: "yes",
        errorAr: "يجب أن يكون لديك تقارير حالة ونتائج مؤشرات أداء رئيسية مدعومة بأدلة.",
        errorEn: "You must have status reports and KPI results backed by objective evidence.",
      },
    ],
  },
];

/**
 * Lookup eligibility questions by a combined slug (category + optional subcategory).
 * For employee categories, the slug format is:
 *   "employee-nonsupervisory-administrative", "employee-supervisory-leader", etc.
 * For project: "project"
 */
export function getEligibilityBySlug(slug: string): EligibilityCategory | null {
  return eligibilityData.find((e) => e.slugs.includes(slug)) ?? null;
}

/**
 * Categories that have eligibility checks.
 * Used to show/hide the "Check Eligibility" button on category detail pages.
 */
export const categoriesWithEligibility = [
  "employee-nonsupervisory",
  "employee-supervisory",
  "project",
];

/**
 * Categories that go directly to apply (no eligibility check needed).
 */
export const categoriesWithDirectApply = [
  "department",
  "green",
  "knowledge",
];
