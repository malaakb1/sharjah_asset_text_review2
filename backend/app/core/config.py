"""
Application configuration — loaded from environment variables.
"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Sharjah Assets API"
    VERSION: str = "0.1.0"
    API_V1_PREFIX: str = "/api/v1"

    # CORS
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"]

    # Database
    DATABASE_URL: str = ""

    # LLM / Embedding
    OPENAI_API_KEY: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
