from __future__ import annotations

from pathlib import Path
from uuid import NAMESPACE_URL, uuid5
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

import json
import re

from agents.learner.service import get_knowledge_graph

ROOT_DIR = Path(__file__).resolve().parents[2]
ITEM_BANK_PATH = ROOT_DIR / "artifacts" / "item_bank.jsonl"
IMAGES_DIR = ROOT_DIR / "artifacts" / "data"
SECTION_ORDER = {"multiple_choice": 0, "true_false": 1, "short_answer": 2}


class DocumentItem(BaseModel):
    id: str
    title: str
    subject: str
    grade: int
    year: int | None = None
    source: str
    total_questions: int
    duration: int
    is_completed: bool


def load_items() -> list[dict]:
    if not ITEM_BANK_PATH.exists():
        return []

    with open(ITEM_BANK_PATH, "r", encoding="utf-8") as f:
        return [json.loads(line) for line in f if line.strip()]


def document_id_of(source_url: str) -> str:
    return str(uuid5(NAMESPACE_URL, source_url))


def answer_of(item: dict) -> str | list[bool]:
    solution = item.get("solution") or ""

    if item["type"] == "multiple_choice":
        match = re.search(r"Chọn\s+\**\s*([A-D])", solution)
        return match.group(1) if match else ""

    if item["type"] == "true_false":
        return [
            bool(re.match(r"\s*\**\s*ĐÚNG", part.get("solution") or ""))
            for part in item["parts"]
        ]

    results = re.findall(r"Kết quả:\s*([^\n_]+)", solution)
    return results[-1].strip().rstrip(".") if results else ""


def image_url(item: dict, image: dict) -> str:
    return f"/api/images/{item['source_title']}/{image['path']}"


def inline_image_urls(item: dict) -> str:
    content = item["content"]

    for image in item["images"]:
        content = content.replace(f"]({image['path']})", f"]({image_url(item, image)})")

    return content


def list_documents() -> list[DocumentItem]:
    groups: dict[str, list[dict]] = {}
    for item in load_items():
        groups.setdefault(item["source_url"], []).append(item)

    documents = []
    for source_url, group in groups.items():
        title = group[0]["source_title"]
        year_match = re.search(r"20\d{2}", title)

        documents.append(
            DocumentItem(
                id=document_id_of(source_url),
                title=title,
                subject="Toán",
                grade=group[0].get("grade") or 12,
                year=int(year_match.group()) if year_match else None,
                source=source_url,
                total_questions=len(group),
                duration=90,
                is_completed=False,
            )
        )

    return documents


app = FastAPI()

if IMAGES_DIR.exists():
    app.mount("/api/images", StaticFiles(directory=IMAGES_DIR), name="images")


@app.get("/api/documents")
def get_documents() -> list[DocumentItem]:
    return list_documents()


@app.get("/api/documents/{document_id}")
def get_document(document_id: str) -> dict:
    items = [item for item in load_items() if document_id_of(item["source_url"]) == document_id]

    if not items:
        raise HTTPException(status_code=404, detail="Không tìm thấy đề thi.")

    items.sort(key=lambda item: (SECTION_ORDER.get(item["type"], 9), int(item["number"])))

    return {
        "exam_id": document_id,
        "title": items[0]["source_title"],
        "subject": "Toán",
        "grade": items[0].get("grade") or 12,
        "duration_minutes": 90,
        "total_questions": len(items),
        "questions": [
            {
                "id": item["id"],
                "section": item["section"],
                "number": int(item["number"]),
                "type": item["type"],
                "content": inline_image_urls(item),
                "options": item["options"],
                "parts": item["parts"],
                "images": [
                    {
                        "url": image_url(item, image),
                        "alt": image.get("alt"),
                    }
                    for image in item["images"]
                ],
                "answer": answer_of(item),
            }
            for item in items
        ],
    }


@app.get("/api/knowledge_graph")
def get_graph() -> dict:
    return get_knowledge_graph()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("api.router:app", host="0.0.0.0", port=8000, reload=True)
