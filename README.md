# Sharjah Assets — AI-Powered Evaluator (TPC-22-2025) 🤖📊

Welcome to the repository for the **AI-powered Evaluator Development Project** for **Sharjah Asset Management** (الشارقة لإدارة الأصول). 
This work is based on the technical & financial proposal submitted by **AI BRAINS**. 

---

## 🔎 Overview
This project focuses on building an **AI evaluator** to support assessment processes with an emphasis on **neutrality, accuracy, and speed**.   
Proposal reference: **TPC-22-2025** | Date: **25.11.2025** ]

---

## 🎯 Project Purpose
- Enable consistent, criteria-based evaluation powered by AI.
- Improve efficiency and reduce manual overhead while keeping outcomes auditable and professional. 

---

## ✨ Solution Highlights
- **Virtual Assistant + RAG** (Retrieval Augmented Generation) with **Embeddings**, plus **Guardrails** and **Monitoring** for safer, controlled responses. 
- A unified intake approach with **Schema Validation** to improve data quality at submission time. 
- Operational components mentioned in the proposal such as **Storage**, **WAF**, a **Rules Engine**, **Queues**, and **SLA**-oriented follow-up. 

---

## 🧩 Scope & Phases
### 1) 🧠 Build the Virtual Assistant
Foundation setup including RAG/embeddings and governance controls. 

### 2) 📨 Intake & Request Reception
Structured request capture with validation and tracking-ready storage. 

### 3) 🧾 Initial Screening (Procedural / Standard)
Early filtering to support structured evaluation flows and consistent decisions. 

---

## 🗓️ Timeline
The proposal outlines an **8-week** delivery window (W1 → W8) across key build tracks (RAG/Guardrails/Monitoring, intake processing, and rules/queues). 

---

## 📁 Repository Structure

```
sharjah-assets/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI pipeline (backend tests + frontend build)
├── frontend/                   # Next.js / React app
│   └── README.md
├── backend/                    # Python backend service
│   ├── README.md
│   ├── app/
│   │   ├── api/                # REST endpoints
│   │   ├── rag/                # RAG pipeline code
│   │   ├── services/           # LLM clients, embedding, rerank, etc.
│   │   ├── db/                 # Models & migrations
│   │   └── core/               # Config & logging
│   └── tests/
├── docs/
│   └── architecture.md         # Architecture overview
├── .gitignore
└── README.md
```

---

## 🤝 Collaboration Notes
- Keep communication clear and respectful ✅  
- Use pull requests for review and traceability 🔍  
- Prefer short, descriptive commits ✍️  

---

## 📬 Contact
**AI BRAINS**  
✉️ training@aibrains.com  
📞 +971-50 710 1638 

---

## 🔒 Confidentiality & Usage
This repository may include implementation details derived from a proposal submitted to Sharjah Asset Management. Handle content appropriately and avoid sharing outside approved stakeholders. 
