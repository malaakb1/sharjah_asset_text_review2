# Architecture

## Overview

```
frontend/   → Next.js (App Router) / React / TypeScript
backend/    → FastAPI
docs/       → Documentation
```

---

## Backend  (`backend/`)

```
backend/
├── app/
│   ├── main.py                 # FastAPI entry point
│   ├── api/
│   │   ├── deps.py             # Shared FastAPI dependencies
│   │   └── v1/
│   │       ├── router.py       # Aggregated v1 router
│   │       └── endpoints/      # One file per domain (health, evaluations …)
│   ├── core/
│   │   ├── config.py           # Pydantic Settings (env vars)
│   │   ├── logging.py          # Logging setup
│   │   └── security.py         # Auth / JWT helpers
│   ├── schemas/                # Pydantic request / response models
│   │   └── common.py
│   ├── db/
│   │   ├── session.py          # Engine / session factory
│   │   ├── models/             # ORM model files
│   │   └── migrations/         # Alembic migrations
│   ├── rag/                    # RAG pipeline code (add files as needed)
│   ├── services/               # Service wrappers (add files as needed)
│   └── middleware/
│       └── logging.py          # Request / response logging
├── tests/
│   └── conftest.py
├── requirements.txt
└── .env.example
```

---

## Frontend  (`frontend/`)

```
frontend/
├── public/                     # Static assets (favicon, images)
├── src/
│   ├── app/                    # Next.js App Router (layouts, pages)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                 # Reusable primitives (Button, Input …)
│   │   ├── layout/             # Shell components (Header, Sidebar …)
│   │   └── common/             # Cross-feature shared components
│   ├── hooks/                  # Custom React hooks
│   ├── context/                # React Context providers
│   ├── lib/
│   │   ├── api.ts              # Centralized API client
│   │   └── utils.ts            # General utilities
│   ├── types/                  # Shared TypeScript interfaces
│   │   └── index.ts
│   ├── config/
│   │   └── index.ts            # App-wide constants
│   └── styles/
│       └── globals.css
├── package.json
├── tsconfig.json
├── next.config.js
└── .env.example
```

---

## Team Convention

- **One file per feature / endpoint** — avoids merge conflicts.
- **Add new endpoints** under `backend/app/api/v1/endpoints/` and register in `router.py`.
- **Add new pages** under `frontend/src/app/<route>/page.tsx` (App Router).
- **Add new components** in the matching `components/` sub-folder.
- Schemas, types, and services each live in their own folder so multiple devs can work in parallel.
