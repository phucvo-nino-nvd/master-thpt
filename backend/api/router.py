from __future__ import annotations

from pathlib import Path
from sqlite3 import IntegrityError
from uuid import NAMESPACE_URL, uuid5
from fastapi import BackgroundTasks, FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles

import os
import re

from agents.learner.service import get_knowledge_graph, learning_path, pending_of
from agents.teacher.main import explain, give_hint
from agents.teacher.rubric import answer_of
from agents.teacher.schema import HintRequest, HintResponse, SolutionRequest, SolutionResponse
from common.schema import Evaluation
from common.utils import normalized
from history.main import get_answer, get_history, list_history, save_answer, solved_question_ids, start_history
from history.schema import HistoryCreated, HistoryDetail, HistoryItem, HistoryRequest
from knowledge.bank.main import Item, items_of, load_items
from knowledge.graph.convert import node_map
from main import grade, stock_practice
from .schema import CheckRequest, DocumentItem, PracticeRequest, SubmitRequest, SubmitResponse

ROOT_DIR = Path(__file__).resolve().parents[2]
IMAGES_DIR = ROOT_DIR / "artifacts" / "data"
SECTION_ORDER = {"multiple_choice": 0, "true_false": 1, "short_answer": 2}
PRACTICE_LIMIT = int(os.getenv("PRACTICE_LIMIT", "6"))
PRACTICE_DURATION = int(os.getenv("PRACTICE_DURATION", "0"))


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


def exam_of(exam_id: str, title: str, grade: int, duration_minutes: int, items: list[dict]) -> dict:
    items.sort(key=lambda item: (SECTION_ORDER.get(item["type"], 9), int(item["number"])))

    return {
        "exam_id": exam_id,
        "title": title,
        "subject": "Toán",
        "grade": grade,
        "duration_minutes": duration_minutes,
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


def practice_sets(query: str = "") -> list[DocumentItem]:
    path = learning_path()
    nodes = node_map()
    pending = pending_of([step["knowledge_id"] for step in path], solved_question_ids())
    wanted = normalized(query)

    sets: list[DocumentItem] = []

    for step in path:
        knowledge_id = step["knowledge_id"]
        question_ids = pending.get(knowledge_id, [])

        if not question_ids:
            continue

        node = nodes[knowledge_id]

        if wanted and wanted not in normalized(node["name"]):
            continue

        sets.append(
            DocumentItem(
                id=knowledge_id,
                title=node["name"],
                subject="Toán",
                grade=node["introduced_grade"] or 12,
                source=knowledge_id,
                total_questions=len(question_ids),
                duration=PRACTICE_DURATION,
                is_completed=False,
            )
        )

        if len(sets) == PRACTICE_LIMIT:
            break

    return sets


def practice_set_of(knowledge_id: str) -> dict:
    node = node_map().get(knowledge_id)

    if node is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy đề thi.")

    question_ids = set(pending_of([knowledge_id], solved_question_ids()).get(knowledge_id, []))
    items = items_of(question_ids)

    if not items:
        raise HTTPException(status_code=404, detail="Phần này chưa có câu luyện tập.")

    return exam_of(
        knowledge_id,
        node["name"],
        node["introduced_grade"] or 12,
        PRACTICE_DURATION,
        items,
    )


app = FastAPI()

if IMAGES_DIR.exists():
    app.mount("/api/images", StaticFiles(directory=IMAGES_DIR), name="images")


@app.get("/api/documents")
def get_documents() -> list[DocumentItem]:
    return list_documents()


@app.get("/api/practice")
def get_practice(q: str = "") -> list[DocumentItem]:
    return practice_sets(q)


@app.post("/api/practice/update")
def post_practice_update(request: PracticeRequest, background: BackgroundTasks) -> list[DocumentItem]:
    query = request.request.strip()

    background.add_task(stock_practice, query)

    return practice_sets(query)


@app.get("/api/documents/{document_id}")
def get_document(document_id: str) -> dict:
    items = [item for item in load_items() if document_id_of(item["source_url"]) == document_id]

    if not items:
        return practice_set_of(document_id)

    return exam_of(
        document_id,
        items[0]["source_title"],
        items[0].get("grade") or 12,
        90,
        items,
    )


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
def post_exam_submit(request: SubmitRequest, background: BackgroundTasks) -> SubmitResponse:
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

    background.add_task(stock_practice)

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
