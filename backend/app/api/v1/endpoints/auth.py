"""
Authentication endpoints for user login, signup, and draft management.
"""

import json
import os
from typing import Optional, Any
from pathlib import Path

from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr

router = APIRouter()

# Path to the JSON database file
DB_PATH = Path(__file__).parent.parent.parent.parent.parent / "data" / "users.json"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class SignupRequest(BaseModel):
    email: EmailStr
    password: str


class SubmitApplicationRequest(BaseModel):
    categorySlug: str
    referenceNumber: str
    submittedAt: str


class DraftData(BaseModel):
    data: dict


class UserResponse(BaseModel):
    id: int
    email: str
    registered: bool
    applied: bool
    appliedCategories: list[str] = []
    categoryStatuses: dict[str, str] = {}
    registrationData: Optional[dict] = None
    submissions: dict = {}
    draft: Optional[dict] = None
    isAdmin: bool = False
    isDirector: bool = False


def load_users() -> dict:
    """Load users from JSON file."""
    if not DB_PATH.exists():
        return {"users": []}
    with open(DB_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def save_users(data: dict) -> None:
    """Save users to JSON file."""
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(DB_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


@router.post("/login", response_model=UserResponse)
async def login(req: LoginRequest):
    """
    Login endpoint - validates email and password.
    Returns user data if credentials are correct.
    """
    db = load_users()
    users = db.get("users", [])

    user = next((u for u in users if u["email"] == req.email), None)

    if not user or user["password"] != req.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    return {
        "id": user["id"],
        "email": user["email"],
        "registered": user["registered"],
        "applied": user["applied"],
        "appliedCategories": user.get("appliedCategories", []),
        "categoryStatuses": user.get("categoryStatuses", {}),
        "registrationData": user.get("registrationData"),
        "submissions": user.get("submissions", {}),
        "draft": user.get("draft"),
        "isAdmin": user.get("isAdmin", False),
        "isDirector": user.get("isDirector", False)
    }


@router.post("/signup", response_model=UserResponse)
async def signup(req: SignupRequest):
    """
    Signup endpoint - creates a new user account.
    """
    db = load_users()
    users = db.get("users", [])

    # Check if email already exists
    if any(u["email"] == req.email for u in users):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create new user
    new_id = max([u["id"] for u in users], default=0) + 1
    new_user = {
        "id": new_id,
        "email": req.email,
        "password": req.password,
        "registered": False,
        "applied": False,
        "appliedCategories": [],
        "draft": None,
        "submissions": {}
    }

    users.append(new_user)
    db["users"] = users
    save_users(db)

    return {
        "id": new_user["id"],
        "email": new_user["email"],
        "registered": new_user["registered"],
        "applied": new_user["applied"],
        "appliedCategories": [],
        "categoryStatuses": {},
        "registrationData": None,
        "submissions": {},
        "draft": None,
        "isAdmin": False,
        "isDirector": False
    }


@router.get("/me/{user_id}", response_model=UserResponse)
async def get_current_user(user_id: int):
    """
    Get current user data by ID.
    """
    db = load_users()
    users = db.get("users", [])

    user = next((u for u in users if u["id"] == user_id), None)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return {
        "id": user["id"],
        "email": user["email"],
        "registered": user["registered"],
        "applied": user["applied"],
        "appliedCategories": user.get("appliedCategories", []),
        "categoryStatuses": user.get("categoryStatuses", {}),
        "registrationData": user.get("registrationData"),
        "submissions": user.get("submissions", {}),
        "draft": user.get("draft"),
        "isAdmin": user.get("isAdmin", False),
        "isDirector": user.get("isDirector", False)
    }


@router.get("/check-category/{user_id}/{category_slug}")
async def check_category_applied(user_id: int, category_slug: str):
    """
    Check if user has already applied to a specific category.
    """
    db = load_users()
    users = db.get("users", [])

    user = next((u for u in users if u["id"] == user_id), None)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    applied_categories = user.get("appliedCategories", [])
    has_applied = category_slug in applied_categories

    return {
        "hasApplied": has_applied,
        "appliedCategories": applied_categories
    }


@router.post("/draft/{user_id}")
async def save_draft(user_id: int, draft: DraftData):
    """
    Save draft data for a user.
    """
    db = load_users()
    users = db.get("users", [])

    user = next((u for u in users if u["id"] == user_id), None)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    user["draft"] = draft.data
    db["users"] = users
    save_users(db)

    return {"message": "Draft saved successfully"}


@router.get("/draft/{user_id}")
async def get_draft(user_id: int):
    """
    Get draft data for a user.
    """
    db = load_users()
    users = db.get("users", [])

    user = next((u for u in users if u["id"] == user_id), None)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return {"draft": user.get("draft")}


class RegistrationData(BaseModel):
    categorySlug: str
    data: dict
    status: str = "qualified"  # qualified, unqualified, waiting-approval


@router.post("/complete-registration/{user_id}")
async def complete_registration(user_id: int, registration: RegistrationData):
    """
    Mark user as registered and save registration data.
    Also tracks which category the user has applied to and its status.
    """
    db = load_users()
    users = db.get("users", [])

    user = next((u for u in users if u["id"] == user_id), None)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # Check if user has already applied to this category
    applied_categories = user.get("appliedCategories", [])
    if registration.categorySlug in applied_categories:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already submitted an application for this category"
        )

    # Add category to applied list
    applied_categories.append(registration.categorySlug)
    user["appliedCategories"] = applied_categories

    # Track category status
    category_statuses = user.get("categoryStatuses", {})
    category_statuses[registration.categorySlug] = registration.status
    user["categoryStatuses"] = category_statuses

    user["registered"] = True
    user["registrationData"] = registration.data

    db["users"] = users
    save_users(db)

    return {"message": "Registration completed successfully"}


@router.post("/submit-application/{user_id}")
async def submit_application(user_id: int, req: SubmitApplicationRequest):
    """
    Save submission data.
    """
    db = load_users()
    users = db.get("users", [])

    user = next((u for u in users if u["id"] == user_id), None)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    submissions = user.get("submissions", {})
    submissions[req.categorySlug] = {
        "referenceNumber": req.referenceNumber,
        "submittedAt": req.submittedAt
    }
    user["submissions"] = submissions

    # Also make sure appliedCategories has it?
    
    db["users"] = users
    save_users(db)

    return {"message": "Application submitted successfully"}


# ═══ Admin Endpoints ═══


@router.get("/admin/pending-registrations")
async def get_pending_registrations():
    """
    Get all users that have categories with 'waiting-approval' status.
    Returns a list of pending registration items.
    """
    db = load_users()
    users = db.get("users", [])

    pending = []
    for user in users:
        category_statuses = user.get("categoryStatuses", {})
        for cat_slug, cat_status in category_statuses.items():
            if cat_status == "waiting-approval":
                # Find registration data from the draft for this category
                draft = user.get("draft", {}) or {}
                reg_draft = draft.get(cat_slug, {})
                pending.append({
                    "userId": user["id"],
                    "email": user["email"],
                    "categorySlug": cat_slug,
                    "registrationData": reg_draft,
                    "submittedAt": None,
                })
    return {"pending": pending}


class ApproveRejectRequest(BaseModel):
    userId: int
    categorySlug: str
    action: str  # "approve" or "reject"


@router.post("/admin/review-registration")
async def review_registration(req: ApproveRejectRequest):
    """
    Approve or reject a pending registration.
    Approve → status becomes 'qualified' (user can proceed to submission).
    Reject → status becomes 'rejected'.
    """
    if req.action not in ("approve", "reject"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Action must be 'approve' or 'reject'"
        )

    db = load_users()
    users = db.get("users", [])

    user = next((u for u in users if u["id"] == req.userId), None)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    category_statuses = user.get("categoryStatuses", {})
    if req.categorySlug not in category_statuses:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category registration not found for this user"
        )

    if category_statuses[req.categorySlug] != "waiting-approval":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This registration is not in 'waiting-approval' state"
        )

    new_status = "qualified" if req.action == "approve" else "rejected"
    category_statuses[req.categorySlug] = new_status
    user["categoryStatuses"] = category_statuses

    db["users"] = users
    save_users(db)

    return {"message": f"Registration {req.action}d successfully", "newStatus": new_status}
