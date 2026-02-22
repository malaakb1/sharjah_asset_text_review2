"""Smoke tests for API endpoints."""

from fastapi.testclient import TestClient


def test_health(app):
    client = TestClient(app)
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"


def test_categories_list(app):
    client = TestClient(app)
    res = client.get("/api/v1/categories")
    assert res.status_code == 200
    data = res.json()
    assert "categories" in data
    assert len(data["categories"]) == 5


def test_category_by_id(app):
    client = TestClient(app)
    res = client.get("/api/v1/categories/employee")
    assert res.status_code == 200
    data = res.json()
    assert data["id"] == "employee"
    assert len(data["subcategories"]) == 7


def test_category_not_found(app):
    client = TestClient(app)
    res = client.get("/api/v1/categories/nonexistent")
    assert res.status_code == 404


def test_content_about(app):
    client = TestClient(app)
    res = client.get("/api/v1/content/about")
    assert res.status_code == 200
    data = res.json()
    assert len(data["cards"]) == 3


def test_content_steps(app):
    client = TestClient(app)
    res = client.get("/api/v1/content/steps")
    assert res.status_code == 200
    data = res.json()
    assert len(data["steps"]) == 6
