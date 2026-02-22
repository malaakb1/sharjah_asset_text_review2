"""Service layer for award categories data.

Currently hardcoded — designed to swap to a database later without
changing the API contract.
"""

from app.api.schemas import Category, SubCategory, BilingualText


def get_all_categories() -> list[Category]:
    """Return all award categories with their subcategories."""
    return [
        Category(
            id="department",
            name=BilingualText(ar="الإدارة المتميزة", en="Outstanding Department"),
            description=BilingualText(
                ar="تكريم الأقسام التي حققت أداءً استثنائياً وتميّزاً في العمليات والنتائج.",
                en="Recognizing departments that achieved exceptional performance and operational excellence.",
            ),
            icon="building-office",
            subcategories=[],
        ),
        Category(
            id="employee",
            name=BilingualText(ar="الموظف المتميز", en="Outstanding Employee"),
            description=BilingualText(
                ar="تقدير الموظفين الذين أظهروا تميّزاً في أدائهم ومساهماتهم المتميّزة.",
                en="Acknowledging employees who demonstrated excellence in their performance and outstanding contributions.",
            ),
            icon="user",
            subcategories=[
                SubCategory(
                    id="administrative",
                    name=BilingualText(ar="إداري", en="Administrative"),
                ),
                SubCategory(
                    id="specialist",
                    name=BilingualText(ar="تخصصي", en="Specialist"),
                ),
                SubCategory(
                    id="technical",
                    name=BilingualText(ar="فني", en="Technical"),
                ),
                SubCategory(
                    id="customer_service",
                    name=BilingualText(ar="خدمة متعاملين", en="Customer Service"),
                ),
                SubCategory(
                    id="unsung_hero",
                    name=BilingualText(ar="جندي مجهول", en="Unsung Hero"),
                ),
                SubCategory(
                    id="leader",
                    name=BilingualText(ar="قائد", en="Leader"),
                ),
                SubCategory(
                    id="future_leader",
                    name=BilingualText(ar="قائد مستقبلي", en="Future Leader"),
                ),
            ],
        ),
        Category(
            id="project",
            name=BilingualText(ar="المشروع المتميز", en="Outstanding Project"),
            description=BilingualText(
                ar="الاحتفاء بالمشاريع المبتكرة التي حققت نتائج ملموسة وأثراً إيجابياً.",
                en="Celebrating innovative projects that achieved tangible results and positive impact.",
            ),
            icon="rocket-launch",
            subcategories=[],
        ),
        Category(
            id="green",
            name=BilingualText(ar="الممارسات الخضراء", en="Green Practices"),
            description=BilingualText(
                ar="تكريم المبادرات والممارسات التي تعزز الاستدامة البيئية والتميّز الأخضر.",
                en="Honoring initiatives and practices that promote environmental sustainability and green excellence.",
            ),
            icon="globe",
            subcategories=[],
        ),
        Category(
            id="knowledge",
            name=BilingualText(ar="إدارة المعرفة", en="Knowledge Management"),
            description=BilingualText(
                ar="تقدير الجهود المتميّزة في إدارة المعرفة ونقلها ومشاركتها داخل المؤسسة.",
                en="Recognizing distinguished efforts in managing, transferring, and sharing knowledge within the organization.",
            ),
            icon="book-open",
            subcategories=[],
        ),
    ]


def get_category_by_id(category_id: str) -> Category | None:
    """Retrieve a single category by its ID."""
    for cat in get_all_categories():
        if cat.id == category_id:
            return cat
    return None
