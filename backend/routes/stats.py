from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends
from backend.models import DashboardStatsResponse, JobStatus
from backend.auth import get_current_admin
from backend.database import get_db, is_db_connected

router = APIRouter(prefix="/admin", tags=["Admin Stats"])

@router.get("/stats", response_model=DashboardStatsResponse)
async def get_dashboard_stats(current_admin: dict = Depends(get_current_admin)):
    try:
        if not await is_db_connected():
            return {
                "total_jobs": 0,
                "active_jobs": 0,
                "draft_jobs": 0,
                "closed_jobs": 0,
                "total_applications": 0,
                "recent_applications_count": 0,
            }
        
        db = get_db()
        if db is None:
            raise Exception("Database client not available")
        
        total_jobs = await db.jobs.count_documents({})
        active_jobs = await db.jobs.count_documents({"status": JobStatus.PUBLISHED.value})
        draft_jobs = await db.jobs.count_documents({"status": JobStatus.DRAFT.value})
        closed_jobs = await db.jobs.count_documents({"status": JobStatus.CLOSED.value})
        
        total_applications = await db.applications.count_documents({})
        
        # Recent applications in last 7 days
        seven_days_ago = datetime.now(timezone.utc) - timedelta(days=7)
        recent_apps = await db.applications.count_documents({"created_at": {"$gte": seven_days_ago}})
        
        return {
            "total_jobs": total_jobs,
            "active_jobs": active_jobs,
            "draft_jobs": draft_jobs,
            "closed_jobs": closed_jobs,
            "total_applications": total_applications,
            "recent_applications_count": recent_apps,
        }
    except Exception as e:
        print(f"Stats query notice: {e}")
        return {
            "total_jobs": 0,
            "active_jobs": 0,
            "draft_jobs": 0,
            "closed_jobs": 0,
            "total_applications": 0,
            "recent_applications_count": 0,
        }
