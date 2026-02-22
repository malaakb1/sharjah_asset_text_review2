from pydantic import BaseModel


# ── Content Schemas ──

class BilingualText(BaseModel):
    ar: str
    en: str


class AboutCard(BaseModel):
    key: str
    title: BilingualText
    text: BilingualText


class AboutResponse(BaseModel):
    section_title: BilingualText
    cards: list[AboutCard]


class StepItem(BaseModel):
    number: int
    title: BilingualText
    description: BilingualText


class StepsResponse(BaseModel):
    section_title: BilingualText
    steps: list[StepItem]


# ── Category Schemas ──

class SubCategory(BaseModel):
    id: str
    name: BilingualText


class Category(BaseModel):
    id: str
    name: BilingualText
    description: BilingualText
    icon: str
    subcategories: list[SubCategory] = []


class CategoriesResponse(BaseModel):
    categories: list[Category]
