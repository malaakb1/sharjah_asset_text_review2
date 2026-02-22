# Backend

Python backend service for Sharjah Assets.

## Structure

- `app/api/` — REST endpoints
- `app/rag/` — RAG pipeline code
- `app/services/` — LLM clients, embedding, rerank, etc.
- `app/db/` — Models and migrations
- `app/core/` — Config and logging

## Getting Started

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```
