import uuid
from datetime import datetime, timezone
from typing import List, Optional
from bson import ObjectId
from pymongo import ReturnDocument
from fastapi import APIRouter, HTTPException, status, Depends
from backend.models import (
    ApplicationCreate,
    ApplicationResponse,
    ApplicationStatusUpdate,
    ApplicationStatus,
)
from backend.auth import get_current_admin
from backend.database import get_db, is_db_connected

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
        "experience_years": "3 years",
        "message": "Experienced technical SEO specialist with track record in B2B SaaS ranking growth and semantic content strategy.",
        "status": ApplicationStatus.PENDING.value,
        "created_at": datetime.now(timezone.utc),
    }
]

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
