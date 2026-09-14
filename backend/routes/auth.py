from datetime import datetime, timezone, timedelta
from typing import Optional
from fastapi import APIRouter, HTTPException, status, Depends, Response, Request
from backend.models import AdminLogin, TokenResponse, AdminResponse, RefreshTokenRequest
from backend.auth import (
    verify_password,
    create_access_token,
    create_refresh_token,
    verify_refresh_token,
    get_current_admin
)
from backend.database import get_db
from backend.config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])

# In-memory store fallback for refresh tokens when MongoDB is offline
FALLBACK_REFRESH_TOKENS: dict = {}

async def save_refresh_token_to_db(email: str, token: str, expires_in_days: int = 7):
    expires_at = datetime.now(timezone.utc) + timedelta(days=expires_in_days)
    record = {
        "email": email.lower(),
        "token": token,
        "expires_at": expires_at,
        "created_at": datetime.now(timezone.utc)
    }
    # Always keep in-memory cache synchronized
    FALLBACK_REFRESH_TOKENS[email.lower()] = record

    try:
        db = get_db()
        if db is not None:
            await db.refresh_tokens.update_one(
                {"email": email.lower()},
                {"$set": record},
                upsert=True
            )
    except Exception as e:
        print(f"Notice: MongoDB refresh token store fallback: {e}")

async def verify_refresh_token_in_db(email: str, token: str) -> bool:
    email_clean = email.lower()
    db_found = False

    try:
        db = get_db()
        if db is not None:
            doc = await db.refresh_tokens.find_one({"email": email_clean, "token": token})
            if doc:
                db_found = True
    except Exception as e:
        print(f"Notice: MongoDB refresh token query fallback: {e}")

    # Check database doc first, or in-memory fallback
    if db_found:
        return True

    mem_record = FALLBACK_REFRESH_TOKENS.get(email_clean)
    if mem_record and mem_record.get("token") == token:
        return True

    return False

async def remove_refresh_token_from_db(email: str):
    email_clean = email.lower()
    FALLBACK_REFRESH_TOKENS.pop(email_clean, None)
    try:
        db = get_db()
        if db is not None:
            await db.refresh_tokens.delete_many({"email": email_clean})
    except Exception as e:
        print(f"Notice: MongoDB refresh token delete fallback: {e}")

@router.post("/login", response_model=TokenResponse)
async def login(credentials: AdminLogin, response: Response):
    email = credentials.email.strip().lower()
    is_default_admin = (
        email == settings.DEFAULT_ADMIN_EMAIL.lower() and
        credentials.password == settings.DEFAULT_ADMIN_PASSWORD
    )

    admin = None
    try:
        db = get_db()
        if db is not None:
            admin = await db.admins.find_one({"email": email})
    except Exception as e:
        print(f"Database lookup notice during login: {e}")

    if admin:
        if not verify_password(credentials.password, admin.get("hashed_password", "")):
            if not is_default_admin:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid email or password",
                    headers={"WWW-Authenticate": "Bearer"},
                )
        admin_data = {
            "id": str(admin["_id"]),
            "email": admin["email"],
            "name": admin.get("name", settings.DEFAULT_ADMIN_NAME),
            "role": admin.get("role", "admin")
        }
    elif is_default_admin:
        admin_data = {
            "id": "default-admin-001",
            "email": settings.DEFAULT_ADMIN_EMAIL.lower(),
            "name": settings.DEFAULT_ADMIN_NAME,
            "role": "admin"
        }
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Issue both access token and refresh token
    access_token = create_access_token(data={"sub": admin_data["email"]})
    refresh_token = create_refresh_token(data={"sub": admin_data["email"]})

    # Persist refresh token in DB & cache
    await save_refresh_token_to_db(admin_data["email"], refresh_token, settings.REFRESH_TOKEN_EXPIRE_DAYS)

    # Set refresh token in HttpOnly Cookie for automatic browser handling
    response.set_cookie(
        key=settings.REFRESH_TOKEN_COOKIE_NAME,
        value=refresh_token,
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400,
        httponly=True,
        samesite="lax",
        secure=settings.COOKIE_SECURE,
        path="/"
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "refresh_token": refresh_token,
        "admin": admin_data
    }

@router.post("/refresh", response_model=TokenResponse)
async def refresh_access_token(
    request: Request,
    response: Response,
    body: Optional[RefreshTokenRequest] = None
):
    # 1. Retrieve refresh token from Cookie or Request Body
    token = request.cookies.get(settings.REFRESH_TOKEN_COOKIE_NAME)
    if not token and body and body.refresh_token:
        token = body.refresh_token

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token missing from cookies or request payload",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # 2. Verify JWT signature, expiry and type
    email = verify_refresh_token(token)

    # 3. Match against stored token in DB / memory
    token_valid_in_db = await verify_refresh_token_in_db(email, token)
    if not token_valid_in_db:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token is invalid or has been revoked",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # 4. Resolve admin profile
    admin = None
    try:
        db = get_db()
        if db is not None:
            admin = await db.admins.find_one({"email": email})
    except Exception as e:
        print(f"Database lookup notice during refresh: {e}")

    if admin:
        admin_data = {
            "id": str(admin["_id"]),
            "email": admin["email"],
            "name": admin.get("name", settings.DEFAULT_ADMIN_NAME),
            "role": admin.get("role", "admin")
        }
    elif email.lower() == settings.DEFAULT_ADMIN_EMAIL.lower():
        admin_data = {
            "id": "default-admin-001",
            "email": settings.DEFAULT_ADMIN_EMAIL.lower(),
            "name": settings.DEFAULT_ADMIN_NAME,
            "role": "admin"
        }
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User associated with refresh token not found",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # 5. Issue fresh access token and rotated refresh token
    new_access_token = create_access_token(data={"sub": admin_data["email"]})
    new_refresh_token = create_refresh_token(data={"sub": admin_data["email"]})

    # 6. Update DB with rotated token
    await save_refresh_token_to_db(admin_data["email"], new_refresh_token, settings.REFRESH_TOKEN_EXPIRE_DAYS)

    # 7. Update cookie
    response.set_cookie(
        key=settings.REFRESH_TOKEN_COOKIE_NAME,
        value=new_refresh_token,
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400,
        httponly=True,
        samesite="lax",
        secure=settings.COOKIE_SECURE,
        path="/"
    )

    return {
        "access_token": new_access_token,
        "token_type": "bearer",
        "refresh_token": new_refresh_token,
        "admin": admin_data
    }

@router.post("/logout")
async def logout(request: Request, response: Response):
    # Retrieve refresh token from cookie or clear for user
    token = request.cookies.get(settings.REFRESH_TOKEN_COOKIE_NAME)
    if token:
        try:
            email = verify_refresh_token(token)
            await remove_refresh_token_from_db(email)
        except Exception:
            pass

    # Clear cookie from browser
    response.delete_cookie(
        key=settings.REFRESH_TOKEN_COOKIE_NAME,
        path="/"
    )

    return {"message": "Logged out successfully"}

@router.get("/me", response_model=AdminResponse)
async def get_my_profile(current_admin: dict = Depends(get_current_admin)):
    return current_admin

