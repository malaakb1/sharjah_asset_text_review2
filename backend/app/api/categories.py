from fastapi import APIRouter, HTTPException
from app.api.schemas import CategoriesResponse, Category
from app.services.categories import get_all_categories, get_category_by_id

router = APIRouter(tags=["categories"])


@router.get("/categories", response_model=CategoriesResponse)
async def list_categories():
    """Return all award categories with subcategories."""
    categories = get_all_categories()
    return CategoriesResponse(categories=categories)


@router.get("/categories/{category_id}", response_model=Category)
async def get_category(category_id: str):
    """Return a single category by ID with full metadata."""
    category = get_category_by_id(category_id)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return category
