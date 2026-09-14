from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field
from enum import Enum

class JobStatus(str, Enum):
    PUBLISHED = "published"
    DRAFT = "draft"
    CLOSED = "closed"

class JobBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=120)
    department: str = Field(..., min_length=2, max_length=80)
    location: str = Field(..., max_length=100)
    job_type: str = Field(default="Full-time")  # Full-time, Part-time, Internship, Contract, Remote
    experience: str = Field(default="1-3 years")
    salary: Optional[str] = Field(default="Competitive")
    description: str = Field(..., min_length=10)
    responsibilities: List[str] = Field(default_factory=list)
    requirements: List[str] = Field(default_factory=list)
    skills: List[str] = Field(default_factory=list)
    status: JobStatus = Field(default=JobStatus.PUBLISHED)

class JobCreate(JobBase):
    pass

class JobUpdate(BaseModel):
    title: Optional[str] = None
    department: Optional[str] = None
    location: Optional[str] = None
    job_type: Optional[str] = None
    experience: Optional[str] = None
    salary: Optional[str] = None
    description: Optional[str] = None
    responsibilities: Optional[List[str]] = None
    requirements: Optional[List[str]] = None
    skills: Optional[List[str]] = None
    status: Optional[JobStatus] = None

class JobResponse(JobBase):
    id: str
    slug: str
    created_at: datetime
    updated_at: datetime
    views_count: int = 0
    applications_count: int = 0

    class Config:
        from_attributes = True

# --- Application Models ---
class ApplicationStatus(str, Enum):
    PENDING = "pending"
    REVIEWED = "reviewed"
    SHORTLISTED = "shortlisted"
    REJECTED = "rejected"
    HIRED = "hired"

class ApplicationCreate(BaseModel):
    job_id: str
    job_title: Optional[str] = ""
    name: str = Field(..., min_length=2)
    email: EmailStr
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    portfolio: Optional[str] = None
    experience_years: Optional[str] = None
    message: Optional[str] = None
    resume_url: Optional[str] = None

class ApplicationResponse(ApplicationCreate):
    id: str
    status: ApplicationStatus = ApplicationStatus.PENDING
    created_at: datetime

    class Config:
        from_attributes = True

class ApplicationStatusUpdate(BaseModel):
    status: ApplicationStatus

# --- Admin & Auth Models ---
class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class RefreshTokenRequest(BaseModel):
    refresh_token: Optional[str] = None

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    refresh_token: Optional[str] = None
    admin: dict

class AdminResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str = "admin"
    created_at: datetime

# --- Dashboard Stats Models ---
class DashboardStatsResponse(BaseModel):
    total_jobs: int
    active_jobs: int
    draft_jobs: int
    closed_jobs: int
    total_applications: int
    recent_applications_count: int
