"""
Aggregated v1 API router.
Each domain gets its own file under endpoints/ and is included here.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import health, auth
from app.api.content import router as content_router
from app.api.categories import router as categories_router

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(content_router, tags=["content"])
api_router.include_router(categories_router, tags=["categories"])

# Wire up new endpoint modules here:
# from app.api.v1.endpoints import evaluations
# api_router.include_router(evaluations.router, prefix="/evaluations", tags=["evaluations"])
