import uuid
from datetime import datetime, timezone
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
from bson import ObjectId
from fastapi import APIRouter, HTTPException, status, Depends
from backend.database import get_db, is_db_connected
from backend.auth import get_current_admin

router = APIRouter(prefix="/contact", tags=["Contact"])

# In-memory store fallback for contact messages
FALLBACK_CONTACTS: List[dict] = []

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    company: Optional[str] = None
    service: Optional[str] = None
    message: str = Field(..., min_length=5, max_length=5000)

class ContactMessageResponse(BaseModel):
    id: str
    name: str
    email: str
    company: Optional[str] = None
    service: Optional[str] = None
    message: str
    created_at: datetime

    class Config:
        from_attributes = True

@router.post("", status_code=status.HTTP_201_CREATED)
async def submit_contact_message(msg_in: ContactMessageCreate):
    now = datetime.now(timezone.utc)
    msg_id = f"contact-{uuid.uuid4().hex[:8]}"

    doc = msg_in.model_dump()
    doc["id"] = msg_id
    doc["created_at"] = now

    FALLBACK_CONTACTS.insert(0, dict(doc))

    if await is_db_connected():
        try:
            db = get_db()
            db_doc = dict(doc)
            del db_doc["id"]
            res = await db.contacts.insert_one(db_doc)
            msg_id = str(res.inserted_id)
        except Exception as e:
            print(f"Notice inserting contact message to DB: {e}")

    return {
        "message": "Thank you for reaching out! We will be in touch shortly.",
        "id": msg_id
    }

@router.get("", response_model=List[ContactMessageResponse])
async def list_contact_messages(current_admin: dict = Depends(get_current_admin)):
    if await is_db_connected():
        try:
            db = get_db()
            cursor = db.contacts.find().sort("created_at", -1)
            messages = []
            async for d in cursor:
                d["id"] = str(d["_id"])
                messages.append(d)
            return messages
        except Exception as e:
            print(f"Notice listing contact messages from DB: {e}")

    return list(FALLBACK_CONTACTS)

@router.delete("/{msg_id}", status_code=status.HTTP_200_OK)
async def delete_contact_message(msg_id: str, current_admin: dict = Depends(get_current_admin)):
    global FALLBACK_CONTACTS
    initial_len = len(FALLBACK_CONTACTS)
    FALLBACK_CONTACTS = [c for c in FALLBACK_CONTACTS if c.get("id") != msg_id]

    deleted_in_db = False
    if await is_db_connected() and ObjectId.is_valid(msg_id):
        try:
            db = get_db()
            result = await db.contacts.delete_one({"_id": ObjectId(msg_id)})
            deleted_in_db = result.deleted_count > 0
        except Exception as e:
            print(f"Notice deleting contact message from DB: {e}")

    if not deleted_in_db and len(FALLBACK_CONTACTS) == initial_len:
        raise HTTPException(status_code=404, detail="Message not found")

    return {"message": "Contact message deleted successfully", "id": msg_id}

