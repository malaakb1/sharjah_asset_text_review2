# Submission System — Documentation & Changelog

**Date:** 2026-02-11
**Author:** Development Team
**Status:** UI Complete (Frontend Only — No Backend Integration)

---

## Overview

A multi-step submission portal was added to the SAM Nojoom Excellence Award frontend. Each award category now has a **"Submission"** button on its detail page that navigates to a dynamic, multi-step form tailored to that category's criteria.

The system is **UI-only** — forms store state in React `useState` and simulate submission locally. No API calls are made. Backend integration is planned for a future phase.

---

## Sitemap

```
/[locale]/award-selection/
│
├── /department                          ← Category detail page
│   └── /department/submission           ← Submission flow (4 steps)
│
├── /project
│   └── /project/submission              ← Submission flow (4 steps)
│
├── /knowledge
│   └── /knowledge/submission            ← Submission flow (4 steps)
│
├── /green
│   └── /green/submission                ← Submission flow (4 steps)
│
├── /employee-nonsupervisory
│   └── /employee-nonsupervisory/submission  ← Submission flow (4 steps)
│
└── /employee-supervisory
    └── /employee-supervisory/submission     ← Submission flow (4 steps)
```

**Total:** 6 submission routes (1 per category slug), each rendered as a single page with internal step navigation.

---

## Step Flow Per Category

### Non-Employee Categories (Department, Project, Knowledge, Green)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│  1. مقدمة    │ ──▶ │  2. المعايير  │ ──▶ │  3. المراجعة │ ──▶ │  4. التأكيد      │
│  Introduction│     │  Criteria    │     │  Review      │     │  Confirmation    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────────┘
```

### Employee Categories (Non-Supervisory & Supervisory)

```
┌──────────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│  1. الفئة الفرعية │ ──▶ │  2. المعايير  │ ──▶ │  3. المراجعة │ ──▶ │  4. التأكيد      │
│  Sub-Category     │     │  Criteria    │     │  Review      │     │  Confirmation    │
└──────────────────┘     └─────────────┘     └─────────────┘     └─────────────────┘
```

---

## Criteria Per Category

| Category | Slug | Criteria Count | Total Points | Word Limit | File Limit |
|---|---|---|---|---|---|
| Distinguished Department | `department` | 4 (EFQM: Plan, Resources, People, Results) | 1000 | Unlimited | Unlimited |
| Distinguished Project | `project` | 3 (Design, Execution, Results) — with sub-criteria | 100 | Unlimited | Unlimited |
| Knowledge Management | `knowledge` | 10 (6 Enablers + 4 Results) | 1000 | Unlimited | Unlimited |
| Green Practices | `green` | 8 (5 Enablers + 3 Results) | 1000 | Unlimited | Unlimited |
| Employee Non-Supervisory | `employee-nonsupervisory` | 5 (Pattern A: 40/15/15/15/15) | 100 | 400 words | 15 files |
| Employee Supervisory — Future Leader | `employee-supervisory` + `future-leader` | 6 (Pattern B: 20/15/15/15/15/20) | 100 | 400 words | 15 files |
| Employee Supervisory — Leader | `employee-supervisory` + `leader` | 6 (Pattern C: completely different criteria) | 100 | 400 words | 15 files |

---

## Files Added

### Data Layer

| File | Purpose |
|---|---|
| `src/data/submissionCriteria.ts` | All criteria definitions for all categories in Arabic & English. Type definitions, category configs, helper functions `getSubmissionConfig()` and `getCriteriaForEmployee()`. |

### Shared Components (`src/components/submission/`)

| File | Purpose |
|---|---|
| `StepIndicator.tsx` | Horizontal progress bar showing numbered step circles with connector lines. Green = completed, Red = current, Gray = future. |
| `FileUploadArea.tsx` | Simulated drag-and-drop file upload zone. Stores file metadata (name, size, type) in local state. Accepts PDF, PPTX, DOCX, XLSX, JPG, PNG. Max 10MB per file. |
| `DosAndDontsPanel.tsx` | Collapsible panel displaying submission guidelines (Do's with green checkmarks, Don'ts with red X marks). Shown on the criteria step. |
| `CriterionForm.tsx` | Renders a single criterion card: title + points badge, description, evidence list, textarea with live word counter, file upload area. Supports sub-criteria display (used by Project category). |

### Step Components (`src/components/submission/`)

| File | Purpose |
|---|---|
| `IntroStep.tsx` | **Employee categories:** Sub-category selector grid. **Other categories:** Welcome/overview screen with category description. |
| `InfoStep.tsx` | _(Created but not used — info step was removed from the flow)_. Contains shared fields (name, ID, email, phone, reason) + category-specific extra fields. Available for future use if needed. |
| `CriteriaStep.tsx` | Orchestrates all `CriterionForm` instances. Handles grouped criteria (Knowledge/Green show "Enablers" and "Results" group headers). Includes `DosAndDontsPanel`. |
| `ReviewStep.tsx` | Read-only summary of all criteria responses (word count + file count per criterion). Includes "Edit" buttons to jump back to criteria step. Confirmation checkbox required before submission. |
| `ConfirmationStep.tsx` | Success screen with green checkmark, auto-generated reference number (SAM-2026-XXXXXX), and navigation links back to category or home. |

### Main Page

| File | Purpose |
|---|---|
| `src/app/[locale]/award-selection/[category]/submission/page.tsx` | The single route that renders the entire multi-step flow. Manages `currentStep` state, form data, step validation, and navigation. Dynamically resolves criteria based on category/subcategory. |

### Modified Files

| File | Change |
|---|---|
| `src/messages/en.json` | Added `"submission"` namespace with ~80 translation keys |
| `src/messages/ar.json` | Added `"submission"` namespace with ~80 Arabic translation keys |
| `src/app/[locale]/award-selection/[category]/page.tsx` | Added "Submission" button (green, `DocumentTextIcon`) in Hero section and Bottom CTA section, linking to `/submission` |

---

## Architecture Decisions

### Single Page with Step State (not separate routes)
Each category's submission flow lives in **one page component** (`submission/page.tsx`) that uses `useState<number>` for `currentStep`. This approach was chosen because:
- Keeps all form state in a single component (no need for context or URL state)
- Avoids creating 27+ separate page files
- Simplifies navigation (back/next just changes step index)
- Form data persists naturally across steps

### Dynamic Criteria Resolution
Employee supervisory category has **two completely different criteria sets** depending on subcategory:
- `future-leader` → Pattern B (6 criteria, shared base + supervisory skills)
- `leader` → Pattern C (6 completely different strategic criteria)

This is handled by `getCriteriaForEmployee(slug, subcategory)` in `submissionCriteria.ts`.

### Criteria Grouping
Knowledge Management and Green Practices categories have criteria grouped into **Enablers** and **Results** sections, indicated by the `group` field on each criterion definition. `CriteriaStep.tsx` detects grouping and renders section headers.

---

## Validation Rules

| Rule | Scope |
|---|---|
| Employee sub-category must be selected | Employee categories only |
| Each criterion must have ≥10 characters of text | All categories |
| Word count ≤ 400 per criterion | Employee categories only |
| Confirmation checkbox must be checked | All categories (review step) |
| File size ≤ 10MB per file | All categories |
| File count ≤ 15 per criterion | Employee categories only |

---

## What's NOT Implemented (Future Work)

- **Backend API integration** — No `apiFetch()` calls are made. Form data lives only in React state.
- **Auto-save** — Spec mentions auto-save every 30 seconds. Not implemented (requires backend).
- **File upload to server** — Files are simulated (metadata only stored in state).
- **My Applications dashboard** — `/my-applications` route from the spec is not built.
- **Email/SMS notifications** — Mentioned in spec for confirmation step.
- **Draft persistence** — Form data is lost on page refresh (no `sessionStorage` or backend drafts).
- **InfoStep** — The component exists at `src/components/submission/InfoStep.tsx` but is not wired into the flow. It was intentionally removed from the step sequence. Can be re-enabled by adding `"info"` back to the `steps` arrays in `submissionCriteria.ts`.

---

## How to Re-enable the Info Step

If needed in the future, add `"info"` back to the steps array in `src/data/submissionCriteria.ts`:

```typescript
// Change this:
steps: ["intro", "criteria", "review", "confirmation"],
// To this:
steps: ["intro", "info", "criteria", "review", "confirmation"],
```

Then in `submission/page.tsx`, re-add the `case "info"` in both the validation switch and the render switch, and import `InfoStep`.

---

## Tech Stack Used

- **Next.js 15** (App Router, file-based routing)
- **React 19** (`useState`, `useMemo` for state management)
- **TypeScript 5.6** (strict types for all data and props)
- **Tailwind CSS 4.1** with SAM design tokens (`sam-red`, `sam-green`, `sam-gold`, `sam-gray-*`)
- **next-intl 4.8** (Arabic/English bilingual support, RTL/LTR)
- **Heroicons React 2.2** (outline icons)

---

## Reference

Full specification: [`docs/SAM_Awards_Submission_Spec.md`](./SAM_Awards_Submission_Spec.md)
