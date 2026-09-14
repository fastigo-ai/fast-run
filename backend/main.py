import sys
from pathlib import Path
from contextlib import asynccontextmanager

# Ensure both project root and backend dir are in sys.path
_BACKEND_DIR = Path(__file__).resolve().parent
_PROJECT_ROOT = _BACKEND_DIR.parent
if str(_PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(_PROJECT_ROOT))
if str(_BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(_BACKEND_DIR))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.config import settings
from backend.database import connect_to_mongo, close_mongo_connection
from backend.routes.auth import router as auth_router
from backend.routes.jobs import router as jobs_router
from backend.routes.applications import router as apps_router
from backend.routes.stats import router as stats_router
from backend.routes.contact import router as contact_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    yield
    # Shutdown
    await close_mongo_connection()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Fastigo Career Management System - Production Backend APIs",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration (allows credentials/cookies with frontend dev & preview servers)
allowed_origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(auth_router, prefix="/api")
app.include_router(jobs_router, prefix="/api")
app.include_router(apps_router, prefix="/api")
app.include_router(stats_router, prefix="/api")
app.include_router(contact_router, prefix="/api")

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "Fastigo Career Management System API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "fastigo-careers-api"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
