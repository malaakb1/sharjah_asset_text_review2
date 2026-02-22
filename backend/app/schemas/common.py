"""
Shared Pydantic response / request schemas.
Each domain can add its own file (e.g. schemas/evaluation.py).
"""

from pydantic import BaseModel


class MessageResponse(BaseModel):
    message: str


class HealthResponse(BaseModel):
    status: str
