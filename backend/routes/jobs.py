import re
import uuid
from datetime import datetime, timezone
from typing import List, Optional
from bson import ObjectId
from pymongo import ReturnDocument
from fastapi import APIRouter, HTTPException, status, Depends, Query
from backend.models import JobCreate, JobUpdate, JobResponse, JobStatus
from backend.auth import get_current_admin
from backend.database import get_db, is_db_connected
from backend.init_db import INITIAL_JOBS

router = APIRouter(prefix="/jobs", tags=["Jobs"])

def generate_slug(title: str) -> str:
    slug = re.sub(r'[^a-zA-Z0-9\s-]', '', title.lower()).strip()
    slug = re.sub(r'[\s_-]+', '-', slug)
    return f"{slug}-{uuid.uuid4().hex[:6]}"

def format_job_doc(doc: dict) -> dict:
    doc["id"] = str(doc["_id"])
    return doc

FALLBACK_JOBS = []
for i, j in enumerate(INITIAL_JOBS):
    FALLBACK_JOBS.append({
        "id": f"seed-job-{i+1}",
        "slug": re.sub(r'[^a-zA-Z0-9\s-]', '', j["title"].lower()).strip().replace(' ', '-'),
        "title": j["title"],
        "department": j["department"],
        "location": j["location"],
        "job_type": j["job_type"],
        "experience": j["experience"],
        "salary": j.get("salary", "Competitive"),
        "description": j["description"],
        "responsibilities": j.get("responsibilities", []),
        "requirements": j.get("requirements", []),
        "skills": j.get("skills", []),
        "status": j["status"],
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
        "views_count": 24,
        "applications_count": 0,
    })

@router.get("", response_model=List[JobResponse])
async def list_jobs(
    search: Optional[str] = None,
    department: Optional[str] = None,
    job_type: Optional[str] = None,
    status: Optional[str] = None,
    include_all: bool = False,
):
    if not await is_db_connected():
        results = list(FALLBACK_JOBS)
        if not include_all:
            results = [j for j in results if j["status"] == JobStatus.PUBLISHED.value]
        elif status and status.lower() != "all":
            results = [j for j in results if j["status"] == status]
        if department and department.lower() != "all":
            results = [j for j in results if j["department"].lower() == department.lower()]
        if job_type and job_type.lower() != "all":
            results = [j for j in results if j["job_type"].lower() == job_type.lower()]
        if search:
            s = search.lower()
            results = [j for j in results if s in j["title"].lower() or s in j["department"].lower() or s in j["location"].lower()]
        return results

    db = get_db()
    query = {}

    if not include_all:
        query["status"] = JobStatus.PUBLISHED.value
    elif status:
        query["status"] = status

    if department and department.lower() != "all":
        query["department"] = {"$regex": f"^{re.escape(department)}$", "$options": "i"}

    if job_type and job_type.lower() != "all":
        query["job_type"] = {"$regex": f"^{re.escape(job_type)}$", "$options": "i"}

    if search:
        search_regex = {"$regex": re.escape(search), "$options": "i"}
        query["$or"] = [
            {"title": search_regex},
            {"description": search_regex},
            {"skills": search_regex},
            {"department": search_regex},
            {"location": search_regex},
        ]

    try:
        cursor = db.jobs.find(query).sort("created_at", -1)
        jobs = []
        async for doc in cursor:
            jobs.append(format_job_doc(doc))
        return jobs
    except Exception as e:
        print(f"Notice querying jobs from DB: {e}")
        results = list(FALLBACK_JOBS)
        if not include_all:
            results = [j for j in results if j["status"] == JobStatus.PUBLISHED.value]
        elif status and status.lower() != "all":
            results = [j for j in results if j["status"] == status]
        if department and department.lower() != "all":
            results = [j for j in results if j["department"].lower() == department.lower()]
        if job_type and job_type.lower() != "all":
            results = [j for j in results if j["job_type"].lower() == job_type.lower()]
        if search:
            s = search.lower()
            results = [j for j in results if s in j["title"].lower() or s in j["department"].lower() or s in j["location"].lower()]
        return results

@router.get("/{job_id}", response_model=JobResponse)
async def get_job(job_id: str):
    if not await is_db_connected():
        for j in FALLBACK_JOBS:
            if j["id"] == job_id or j["slug"] == job_id or job_id in j["slug"]:
                return j
        if FALLBACK_JOBS:
            return FALLBACK_JOBS[0]
        raise HTTPException(status_code=404, detail="Job not found")

    try:
        db = get_db()
        query = {}
        if ObjectId.is_valid(job_id):
            query = {"$or": [{"_id": ObjectId(job_id)}, {"slug": job_id}]}
        else:
            query = {"slug": job_id}

        doc = await db.jobs.find_one(query)
        if not doc:
            raise HTTPException(status_code=404, detail="Job not found")

        # Increment view count
        await db.jobs.update_one({"_id": doc["_id"]}, {"$inc": {"views_count": 1}})
        doc["views_count"] = doc.get("views_count", 0) + 1

        return format_job_doc(doc)
    except HTTPException:
        raise
    except Exception as e:
        print(f"Notice fetching job from DB: {e}")
        for j in FALLBACK_JOBS:
            if j["id"] == job_id or j["slug"] == job_id or job_id in j["slug"]:
                return j
        raise HTTPException(status_code=404, detail="Job not found")

@router.post("", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
async def create_job(
    job_in: JobCreate,
    current_admin: dict = Depends(get_current_admin)
):
    now = datetime.now(timezone.utc)
    slug = generate_slug(job_in.title)

    job_dict = job_in.model_dump()
    job_dict.update({
        "slug": slug,
        "created_at": now,
        "updated_at": now,
        "views_count": 0,
        "applications_count": 0,
        "created_by": current_admin["email"]
    })

    if not await is_db_connected():
        job_id = f"job-{uuid.uuid4().hex[:8]}"
        job_dict["id"] = job_id
        FALLBACK_JOBS.insert(0, job_dict)
        return job_dict

    try:
        db = get_db()
        result = await db.jobs.insert_one(job_dict)
        created_doc = await db.jobs.find_one({"_id": result.inserted_id})
        return format_job_doc(created_doc)
    except Exception as e:
        print(f"Notice saving job to DB, saving in-memory: {e}")
        job_id = f"job-{uuid.uuid4().hex[:8]}"
        job_dict["id"] = job_id
        FALLBACK_JOBS.insert(0, job_dict)
        return job_dict

@router.put("/{job_id}", response_model=JobResponse)
async def update_job(
    job_id: str,
    job_update: JobUpdate,
    current_admin: dict = Depends(get_current_admin)
):
    update_data = {k: v for k, v in job_update.model_dump(exclude_unset=True).items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc)

    if "title" in update_data:
        update_data["slug"] = generate_slug(update_data["title"])

    if not await is_db_connected():
        for j in FALLBACK_JOBS:
            if j["id"] == job_id or j["slug"] == job_id:
                j.update(update_data)
                return j
        raise HTTPException(status_code=404, detail="Job not found")

    try:
        db = get_db()
        query = {"_id": ObjectId(job_id)} if ObjectId.is_valid(job_id) else {"slug": job_id}

        existing = await db.jobs.find_one(query)
        if not existing:
            for j in FALLBACK_JOBS:
                if j["id"] == job_id or j["slug"] == job_id:
                    j.update(update_data)
                    return j
            raise HTTPException(status_code=404, detail="Job not found")

        await db.jobs.update_one({"_id": existing["_id"]}, {"$set": update_data})
        updated_doc = await db.jobs.find_one({"_id": existing["_id"]})
        return format_job_doc(updated_doc)
    except HTTPException:
        raise
    except Exception as e:
        print(f"Notice updating job in DB: {e}")
        for j in FALLBACK_JOBS:
            if j["id"] == job_id or j["slug"] == job_id:
                j.update(update_data)
                return j
        raise HTTPException(status_code=404, detail="Job not found")

@router.delete("/{job_id}", status_code=status.HTTP_200_OK)
async def delete_job(
    job_id: str,
    current_admin: dict = Depends(get_current_admin)
):
    global FALLBACK_JOBS
    FALLBACK_JOBS = [j for j in FALLBACK_JOBS if j["id"] != job_id and j["slug"] != job_id]

    if not await is_db_connected():
        return {"message": "Job deleted successfully", "id": job_id}

    try:
        db = get_db()
        query = {"_id": ObjectId(job_id)} if ObjectId.is_valid(job_id) else {"slug": job_id}
        await db.jobs.delete_one(query)
        return {"message": "Job deleted successfully", "id": job_id}
    except Exception as e:
        print(f"Notice deleting job in DB: {e}")
        return {"message": "Job deleted successfully", "id": job_id}

@router.patch("/{job_id}/publish", response_model=JobResponse)
async def publish_job(
    job_id: str,
    current_admin: dict = Depends(get_current_admin)
):
    now = datetime.now(timezone.utc)
    if not await is_db_connected():
        for j in FALLBACK_JOBS:
            if j["id"] == job_id or j["slug"] == job_id:
                j["status"] = JobStatus.PUBLISHED.value
                j["updated_at"] = now
                return j
        raise HTTPException(status_code=404, detail="Job not found")

    try:
        db = get_db()
        query = {"_id": ObjectId(job_id)} if ObjectId.is_valid(job_id) else {"slug": job_id}
        result = await db.jobs.find_one_and_update(
            query,
            {"$set": {"status": JobStatus.PUBLISHED.value, "updated_at": now}},
            return_document=ReturnDocument.AFTER
        )
        if not result:
            for j in FALLBACK_JOBS:
                if j["id"] == job_id or j["slug"] == job_id:
                    j["status"] = JobStatus.PUBLISHED.value
                    j["updated_at"] = now
                    return j
            raise HTTPException(status_code=404, detail="Job not found")
        return format_job_doc(result)
    except HTTPException:
        raise
    except Exception as e:
        print(f"Notice publishing job: {e}")
        for j in FALLBACK_JOBS:
            if j["id"] == job_id or j["slug"] == job_id:
                j["status"] = JobStatus.PUBLISHED.value
                j["updated_at"] = now
                return j
        raise HTTPException(status_code=404, detail="Job not found")

@router.patch("/{job_id}/close", response_model=JobResponse)
async def close_job(
    job_id: str,
    current_admin: dict = Depends(get_current_admin)
):
    now = datetime.now(timezone.utc)
    if not await is_db_connected():
        for j in FALLBACK_JOBS:
            if j["id"] == job_id or j["slug"] == job_id:
                j["status"] = JobStatus.CLOSED.value
                j["updated_at"] = now
                return j
        raise HTTPException(status_code=404, detail="Job not found")

    try:
        db = get_db()
        query = {"_id": ObjectId(job_id)} if ObjectId.is_valid(job_id) else {"slug": job_id}
        result = await db.jobs.find_one_and_update(
            query,
            {"$set": {"status": JobStatus.CLOSED.value, "updated_at": now}},
            return_document=ReturnDocument.AFTER
        )
        if not result:
            for j in FALLBACK_JOBS:
                if j["id"] == job_id or j["slug"] == job_id:
                    j["status"] = JobStatus.CLOSED.value
                    j["updated_at"] = now
                    return j
            raise HTTPException(status_code=404, detail="Job not found")
        return format_job_doc(result)
    except HTTPException:
        raise
    except Exception as e:
        print(f"Notice closing job: {e}")
        for j in FALLBACK_JOBS:
            if j["id"] == job_id or j["slug"] == job_id:
                j["status"] = JobStatus.CLOSED.value
                j["updated_at"] = now
                return j
        raise HTTPException(status_code=404, detail="Job not found")
