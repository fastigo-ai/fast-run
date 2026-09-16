import os
import sys
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

# Determine directory paths
BACKEND_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BACKEND_DIR.parent

# Ensure both project root and backend dir are on Python sys.path
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

# Support loading from either backend/.env or root .env
env_files = [f for f in [PROJECT_ROOT / ".env", BACKEND_DIR / ".env"] if f.exists()]

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=env_files if env_files else None,
        env_file_encoding="utf-8",
        extra="ignore"
    )

    PROJECT_NAME: str = "Fastigo Career Management System"
    API_V1_STR: str = "/api"
    
    # MongoDB Config (reads MONGO_URI and DB_NAME from .env)
    MONGO_URI: str = "mongodb://localhost:27017"
    DB_NAME: str = "fastigo_careers"
    
    # JWT Config (reads from .env)
    JWT_SECRET_KEY: str = "fastigo_super_secret_jwt_key_2026_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    REFRESH_TOKEN_COOKIE_NAME: str = "fastigo_refresh_token"
    COOKIE_SECURE: bool = False
    
    # Default Admin Credentials (reads from .env)
    DEFAULT_ADMIN_EMAIL: str = "admin@fastigo.co"
    DEFAULT_ADMIN_PASSWORD: str = "Fastigo@2026!"
    DEFAULT_ADMIN_NAME: str = "Fastigo Talent Admin"

    # Cloudinary Credentials (reads from .env)
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""

settings = Settings()

