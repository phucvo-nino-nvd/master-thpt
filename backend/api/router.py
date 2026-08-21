from __future__ import annotations

from pathlib import Path
from sqlite3 import IntegrityError
from uuid import NAMESPACE_URL, uuid5
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles

import json
import re

from agents.learner.service import get_knowledge_graph
from agents.teacher.main import explain, give_hint
from agents.teacher.rubric import answer_of
from agents.teacher.schema import HintRequest, HintResponse, SolutionRequest, SolutionResponse
from common.schema import Evaluation
from history.main import get_answer, get_history, list_history, save_answer, start_history
from history.schema import HistoryCreated, HistoryDetail, HistoryItem, HistoryRequest
from knowledge.bank.main import Item
from main import grade
from .schema import CheckRequest, DocumentItem, SubmitRequest, SubmitResponse

ROOT_DIR = Path(__file__).resolve().parents[2]
ITEM_BANK_PATH = ROOT_DIR / "artifacts" / "item_bank.jsonl"
IMAGES_DIR = ROOT_DIR / "artifacts" / "data"
SECTION_ORDER = {"multiple_choice": 0, "true_false": 1, "short_answer": 2}


def load_items() -> list[dict]:
    if not ITEM_BANK_PATH.exists():
        return []

    with open(ITEM_BANK_PATH, "r", encoding="utf-8") as f:
        return [json.loads(line) for line in f if line.strip()]


def document_id_of(source_url: str) -> str:
    return str(uuid5(NAMESPACE_URL, source_url))


def image_url(item: dict, image: dict) -> str:
    return f"/api/images/{item['source_title']}/{image['path']}"


def inline_image_urls(item: dict) -> str:
    content = item["content"]

    for image in item["images"]:
        content = content.replace(f"]({image['path']})", f"]({image_url(item, image)})")

    return content


def find_item(question_id: str) -> Item:
    item = next((item for item in load_items() if item["id"] == question_id), None)

    if not item:
        raise HTTPException(status_code=404, detail="Không tìm thấy câu hỏi.")

    return Item.model_validate(item)


def submission_of(question_id: str, student_answer: str | list[bool]) -> dict:
    return {"item": find_item(question_id), "student_answer": student_answer}


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
                "answer": answer_of(Item.model_validate(item)),
            }
            for item in items
        ],
    }


@app.post("/api/hints")
def post_hint(request: HintRequest) -> HintResponse:
    return give_hint(find_item(request.question_id), request.level, request.student_answer)


@app.post("/api/solutions")
def post_solution(request: SolutionRequest) -> SolutionResponse:
    answered = get_answer(request.history_id, request.question_id)

    if not answered:
        raise HTTPException(status_code=404, detail="Câu này chưa được chấm.")

    return explain(find_item(request.question_id), answered.student_answer, answered.evaluation)


@app.post("/api/history")
def post_history(request: HistoryRequest) -> HistoryCreated:
    return start_history(request.exam_id, request.mode, request.duration_seconds)


@app.get("/api/history")
def get_history_list() -> list[HistoryItem]:
    return list_history()


@app.get("/api/history/{history_id}")
def get_history_detail(history_id: str) -> HistoryDetail:
    detail = get_history(history_id)

    if not detail:
        raise HTTPException(status_code=404, detail="Không tìm thấy lượt làm bài.")

    return detail


@app.post("/api/exams/submit")
def post_exam_submit(request: SubmitRequest) -> SubmitResponse:
    submissions = [
        submission_of(answer.question_id, answer.student_answer)
        for answer in request.answers
    ]

    state = grade(submissions)
    created = start_history(request.exam_id, "exam", request.duration_seconds)

    for submission, evaluation in zip(submissions, state["evaluations"]):
        save_answer(
            created.history_id,
            submission["item"].id,
            submission["student_answer"],
            evaluation,
        )

    return SubmitResponse(
        exam_id=request.exam_id,
        history_id=created.history_id,
        total_score=state["total_score"],
        correct_count=sum(evaluation.correct for evaluation in state["evaluations"]),
        per_question={
            submission["item"].id: evaluation
            for submission, evaluation in zip(submissions, state["evaluations"])
        },
    )


@app.post("/api/practice/check-question")
def post_practice_check(request: CheckRequest) -> Evaluation:
    submission = submission_of(request.question_id, request.student_answer)
    evaluation = grade([submission])["evaluations"][0]

    try:
        save_answer(request.history_id, request.question_id, request.student_answer, evaluation)
    except IntegrityError:
        raise HTTPException(status_code=404, detail="Không tìm thấy lượt làm bài.")

    return evaluation


@app.get("/api/knowledge_graph")
def get_graph() -> dict:
    return get_knowledge_graph()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("api.router:app", host="0.0.0.0", port=8000, reload=True)
