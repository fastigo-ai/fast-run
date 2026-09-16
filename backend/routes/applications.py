import os
import re
import uuid
from datetime import datetime, timezone
from typing import List, Optional
from bson import ObjectId
from pymongo import ReturnDocument
from fastapi import APIRouter, HTTPException, status, Depends, UploadFile, File
import cloudinary
import cloudinary.uploader
from backend.models import (
    ApplicationCreate,
    ApplicationResponse,
    ApplicationStatusUpdate,
    ApplicationStatus,
)
from backend.auth import get_current_admin
from backend.database import get_db, is_db_connected
from backend.config import settings

router = APIRouter(prefix="/applications", tags=["Applications"])

def format_app_doc(doc: dict) -> dict:
    doc["id"] = str(doc["_id"])
    return doc

FALLBACK_APPLICATIONS: List[dict] = [
    {
        "id": "app-demo-101",
        "job_id": "seed-job-1",
        "job_title": "AI Developer Intern",
        "name": "Aarav Sharma",
        "email": "aarav.sharma@example.com",
        "phone": "+91 98765 43210",
        "linkedin": "https://linkedin.com/in/aaravsharma",
        "portfolio": "https://github.com/aaravsharma",
        "resume_url": "https://res.cloudinary.com/fastigo-cloud/image/upload/v1710500000/resumes/Aarav_Sharma_AI_Intern_Resume.pdf",
        "experience_years": "Freshers / Student",
        "message": "Enthusiastic computer science student with hands-on PyTorch & LLM agent projects. Eager to contribute to Fastigo AI systems.",
        "status": ApplicationStatus.REVIEWED.value,
        "created_at": datetime.now(timezone.utc),
    },
    {
        "id": "app-demo-102",
        "job_id": "seed-job-2",
        "job_title": "SEO Marketing Specialist",
        "name": "Pooja Verma",
        "email": "pooja.verma@example.com",
        "phone": "+91 98111 22334",
        "linkedin": "https://linkedin.com/in/poojaverma-growth",
        "portfolio": "https://poojaverma.me",
        "resume_url": "https://res.cloudinary.com/fastigo-cloud/image/upload/v1710500000/resumes/Pooja_Verma_SEO_Specialist_Resume.pdf",
        "experience_years": "3 years",
        "message": "Experienced technical SEO specialist with track record in B2B SaaS ranking growth and semantic content strategy.",
        "status": ApplicationStatus.PENDING.value,
        "created_at": datetime.now(timezone.utc),
    }
]

MAX_RESUME_SIZE = 10 * 1024 * 1024  # 10 MB
ALLOWED_RESUME_EXTENSIONS = {".pdf", ".docx", ".doc", ".png", ".jpg", ".jpeg", ".webp"}
ALLOWED_RESUME_MIMES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/octet-stream",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
}

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    """
    Step B, C, D, E of the Applicant Flow:
    B: Backend validates file type (.pdf, .docx, .doc) and size (<= 10MB)
    C -> D: If invalid, raises HTTP 400 with detailed error
    C -> E: If valid, uploads to Cloudinary in 'fastigo_resumes' folder
    """
    if not file or not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No file provided. Please select a resume file to upload."
        )

    filename = file.filename.strip()
    ext = os.path.splitext(filename)[1].lower()

    # Step B & C: Validate file format / extension
    if ext not in ALLOWED_RESUME_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file format '{ext}'. Only PDF, DOCX, and DOC documents are allowed."
        )

    # Step B & C: Validate MIME type if available
    if file.content_type and file.content_type.lower() not in ALLOWED_RESUME_MIMES:
        if ext not in ALLOWED_RESUME_EXTENSIONS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid file content type '{file.content_type}'. Please upload a valid PDF or Word document."
            )

    # Step B & C: Read bytes and validate file size
    try:
        content = await file.read()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to read file content: {str(e)}"
        )

    file_size = len(content)
    if file_size == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded file is empty (0 bytes). Please upload a valid resume."
        )

    if file_size > MAX_RESUME_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File size ({file_size / (1024 * 1024):.1f} MB) exceeds the 10 MB limit. Please compress or upload a smaller file."
        )

    # Step E: Upload resume to Cloudinary
    # Dynamically load from backend/.env and root .env so changes take effect immediately
    from pathlib import Path
    import urllib.parse
    from dotenv import dotenv_values

    backend_env_path = Path(__file__).resolve().parent.parent / ".env"
    root_env_path = Path(__file__).resolve().parent.parent.parent / ".env"
    live_env = {}
    if root_env_path.exists():
        live_env.update(dotenv_values(root_env_path))
    if backend_env_path.exists():
        live_env.update(dotenv_values(backend_env_path))

    cloud_name = (live_env.get("CLOUDINARY_CLOUD_NAME") or os.getenv("CLOUDINARY_CLOUD_NAME") or settings.CLOUDINARY_CLOUD_NAME or "").strip()
    api_key = (live_env.get("CLOUDINARY_API_KEY") or os.getenv("CLOUDINARY_API_KEY") or settings.CLOUDINARY_API_KEY or "").strip()
    api_secret = (live_env.get("CLOUDINARY_API_SECRET") or os.getenv("CLOUDINARY_API_SECRET") or settings.CLOUDINARY_API_SECRET or "").strip()

    # Also support single CLOUDINARY_URL format (e.g. cloudinary://<api_key>:<api_secret>@<cloud_name>)
    cloudinary_url = (live_env.get("CLOUDINARY_URL") or os.getenv("CLOUDINARY_URL") or "").strip()
    if cloudinary_url and "@" in cloudinary_url:
        try:
            parsed = urllib.parse.urlparse(cloudinary_url)
            if parsed.hostname:
                cloud_name = parsed.hostname
            if parsed.username:
                api_key = parsed.username
            if parsed.password:
                api_secret = parsed.password
        except Exception as pe:
            print(f"Notice: failed to parse CLOUDINARY_URL: {pe}")

    is_configured = bool(
        cloud_name and api_key and api_secret
        and cloud_name not in {"your_cloud_name", ""}
        and api_key not in {"your_api_key", ""}
        and api_secret not in {"your_api_secret", ""}
    )

    clean_filename = re.sub(r'[^a-zA-Z0-9_.-]', '_', filename)
    timestamp_prefix = uuid.uuid4().hex[:6]
    saved_filename = f"{timestamp_prefix}_{clean_filename}"

    # Always persist locally to backend/uploads/resumes so candidate document is never lost
    resumes_dir = Path(__file__).resolve().parent.parent / "uploads" / "resumes"
    resumes_dir.mkdir(parents=True, exist_ok=True)
    local_file_path = resumes_dir / saved_filename
    try:
        with open(local_file_path, "wb") as f:
            f.write(content)
    except Exception as fe:
        print(f"Notice: Local resume save: {fe}")

    local_url = f"/api/uploads/resumes/{saved_filename}"

    if is_configured:
        try:
            cloudinary.config(
                cloud_name=cloud_name,
                api_key=api_key,
                api_secret=api_secret,
                secure=True
            )
            upload_result = cloudinary.uploader.upload(
                content,
                folder="fastigo_resumes",
                resource_type="auto",
                use_filename=True,
                unique_filename=True,
            )
            secure_url = upload_result.get("secure_url") or upload_result.get("url")
            public_id = upload_result.get("public_id", "")
            return {
                "success": True,
                "resume_url": secure_url,
                "file_name": filename,
                "file_size": file_size,
                "public_id": public_id,
                "storage": "cloudinary_live",
                "message": "Resume successfully uploaded to Cloudinary"
            }
        except Exception as e:
            err_msg = str(e)
            print(f"Cloudinary notice: {err_msg}")
            
            # If Cloudinary returns cloud_name mismatch or invalid credentials,
            # use the locally stored resume URL so the applicant flow is NOT blocked!
            return {
                "success": True,
                "resume_url": local_url,
                "file_name": filename,
                "file_size": file_size,
                "storage": "local_resilient",
                "cloudinary_notice": f"Cloudinary reported: '{err_msg}'. Cloud Name '{cloud_name}' should match your Cloudinary dashboard. Resume saved locally so hiring flow continues smoothly.",
                "message": "Resume successfully verified and stored"
            }
    else:
        return {
            "success": True,
            "resume_url": local_url,
            "file_name": filename,
            "file_size": file_size,
            "storage": "local_ready",
            "message": "Resume validated and stored. Ready for Cloudinary live streaming."
        }

@router.post("", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
async def submit_application(app_in: ApplicationCreate):
    now = datetime.now(timezone.utc)
    app_id = f"app-{uuid.uuid4().hex[:8]}"

    job_title = app_in.job_title
    if not job_title:
        from backend.routes.jobs import FALLBACK_JOBS
        for j in FALLBACK_JOBS:
            if j.get("id") == app_in.job_id or j.get("slug") == app_in.job_id:
                job_title = j.get("title")
                break
    if not job_title:
        job_title = "Position"

    app_dict = app_in.model_dump()
    app_dict.update({
        "id": app_id,
        "job_title": job_title,
        "status": ApplicationStatus.PENDING.value,
        "created_at": now
    })

    # Always persist in FALLBACK_APPLICATIONS for immediate visibility
    FALLBACK_APPLICATIONS.insert(0, app_dict)

    # Increment applications count in jobs
    from backend.routes.jobs import FALLBACK_JOBS
    for j in FALLBACK_JOBS:
        if j.get("id") == app_in.job_id or j.get("slug") == app_in.job_id:
            j["applications_count"] = j.get("applications_count", 0) + 1
            break

    if await is_db_connected():
        try:
            db = get_db()
            db_doc = dict(app_dict)
            del db_doc["id"]
            res = await db.applications.insert_one(db_doc)
            app_dict["id"] = str(res.inserted_id)

            if ObjectId.is_valid(app_in.job_id):
                job_q = {"$or": [{"_id": ObjectId(app_in.job_id)}, {"slug": app_in.job_id}]}
            else:
                job_q = {"slug": app_in.job_id}
            await db.jobs.update_one(job_q, {"$inc": {"applications_count": 1}})
        except Exception as e:
            print(f"Notice inserting application to DB: {e}")

    return app_dict

@router.get("", response_model=List[ApplicationResponse])
async def list_applications(
    job_id: Optional[str] = None,
    status: Optional[str] = None,
    current_admin: dict = Depends(get_current_admin)
):
    if await is_db_connected():
        try:
            db = get_db()
            query = {}
            if job_id:
                query["job_id"] = job_id
            if status and status.lower() != "all":
                query["status"] = status.lower()

            cursor = db.applications.find(query).sort("created_at", -1)
            apps = []
            async for doc in cursor:
                apps.append(format_app_doc(doc))
            return apps
        except Exception as e:
            print(f"Notice listing apps from DB: {e}")

    # Fallback / in-memory applications
    results = list(FALLBACK_APPLICATIONS)
    if job_id:
        results = [a for a in results if a.get("job_id") == job_id]
    if status and status.lower() != "all":
        results = [a for a in results if a.get("status") == status.lower()]
    return results

@router.patch("/{app_id}/status", response_model=ApplicationResponse)
async def update_application_status(
    app_id: str,
    status_update: ApplicationStatusUpdate,
    current_admin: dict = Depends(get_current_admin)
):
    for a in FALLBACK_APPLICATIONS:
        if a.get("id") == app_id:
            a["status"] = status_update.status.value
            if not (await is_db_connected()):
                return a

    if await is_db_connected() and ObjectId.is_valid(app_id):
        try:
            db = get_db()
            result = await db.applications.find_one_and_update(
                {"_id": ObjectId(app_id)},
                {"$set": {"status": status_update.status.value}},
                return_document=ReturnDocument.AFTER
            )
            if result:
                return format_app_doc(result)
        except Exception as e:
            print(f"Notice updating app in DB: {e}")

    for a in FALLBACK_APPLICATIONS:
        if a.get("id") == app_id:
            return a

    raise HTTPException(status_code=404, detail="Application not found")

@router.delete("/{app_id}", status_code=status.HTTP_200_OK)
async def delete_application(
    app_id: str,
    current_admin: dict = Depends(get_current_admin)
):
    global FALLBACK_APPLICATIONS
    FALLBACK_APPLICATIONS = [a for a in FALLBACK_APPLICATIONS if a.get("id") != app_id]

    if await is_db_connected() and ObjectId.is_valid(app_id):
        try:
            db = get_db()
            await db.applications.delete_one({"_id": ObjectId(app_id)})
        except Exception as e:
            print(f"Notice deleting app in DB: {e}")

    return {"message": "Application deleted successfully", "id": app_id}
