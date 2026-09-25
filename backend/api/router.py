from __future__ import annotations

from pathlib import Path
from sqlite3 import IntegrityError
from uuid import NAMESPACE_URL, uuid5
from fastapi import BackgroundTasks, Depends, FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi_clerk_auth import (
    ClerkConfig,
    ClerkHTTPBearer,
    HTTPAuthorizationCredentials,
)

import main
import os
import re

from roles.learner.service import crawl_requests, get_knowledge_graph, learning_path, pending_of, stocked_count
from roles.teacher.main import explain, give_hint
from roles.teacher.rubric import answer_of
from roles.teacher.schema import HintRequest, HintResponse, SolutionRequest, SolutionResponse
from common.schema import Evaluation
from common.utils import normalized
from history.main import attempted_exam_ids, drop_doc, get_answer, get_history, list_history, queued_docs, save_answer, solved_question_ids, start_history, streak
from history.schema import HistoryCreated, HistoryDetail, HistoryItem, HistoryRequest
from knowledge.bank.main import GENERATED_PREFIX, Item, items_of, load_items, source_urls
from knowledge.graph.convert import node_map
from main import approve, grade, stock_practice
from .schema import CheckRequest, DocumentItem, GradingStatus, PracticeRequest, PracticeStatus, SubmitRequest, SubmitResponse

ROOT_DIR = Path(__file__).resolve().parents[2]
IMAGES_DIR = ROOT_DIR / "artifacts" / "data"
SECTION_ORDER = {"multiple_choice": 0, "true_false": 1, "short_answer": 2}
PRACTICE_CARD_LIMIT = int(os.getenv("PRACTICE_CARD_LIMIT", "6"))
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


def list_documents(user_id: str | None = None) -> list[DocumentItem]:
    groups: dict[str, list[dict]] = {}
    for item in load_items():
        if item["source_url"].startswith(GENERATED_PREFIX):
            continue

        groups.setdefault(item["source_url"], []).append(item)

    attempted = attempted_exam_ids(user_id=user_id) if user_id else attempted_exam_ids()

    documents = []
    for source_url, group in groups.items():
        title = group[0]["source_title"]
        year_match = re.search(r"20\d{2}", title)
        document_id = document_id_of(source_url)

        documents.append(
            DocumentItem(
                id=document_id,
                title=title,
                subject="Toán",
                grade=group[0].get("grade") or 12,
                year=int(year_match.group()) if year_match else None,
                source=source_url,
                total_questions=len(group),
                duration=90,
                is_completed=document_id in attempted,
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


def practice_sets(user_id: str | None = None, query: str = "") -> list[DocumentItem]:
    path = learning_path(user_id) if user_id else learning_path()
    nodes = node_map()
    pending = pending_of(
        [step["knowledge_id"] for step in path],
        solved_question_ids(user_id=user_id) if user_id else solved_question_ids(),
    )
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

        if len(sets) == PRACTICE_CARD_LIMIT:
            break

    return sets


def ingest_state() -> dict:
    return {"manual": main.manual, "batches": queued_docs()}


def reject_if_busy() -> None:
    if main.progress is None:
        return

    raise HTTPException(
        status_code=409,
        detail=f"Đang nạp đề cho \"{main.progress['concept'] or 'phần bạn còn yếu'}\". Xong sẽ tự cập nhật, thử lại sau.",
    )


def practice_set_of(
    knowledge_id: str,
    user_id: str | None = None,
    question_ids: set[str] | None = None,
) -> dict:
    node = node_map().get(knowledge_id)

    if node is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy đề thi.")

    if question_ids is None:
        question_ids = set(
            pending_of(
                [knowledge_id],
                solved_question_ids(user_id=user_id) if user_id else solved_question_ids(),
            ).get(knowledge_id, [])
        )

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


@app.middleware("http")
async def clerk_token_header(request: Request, call_next):
    """CloudFront owns Authorization, so the Clerk token rides X-Clerk-Token."""
    token = request.headers.get("x-clerk-token")

    if token:
        request.scope["headers"] = [
            (name, value)
            for name, value in request.scope["headers"]
            if name != b"authorization"
        ] + [(b"authorization", token.encode())]

    return await call_next(request)


clerk_bearer = ClerkHTTPBearer(
    ClerkConfig(jwks_url=os.getenv("CLERK_JWKS_URL"))
)


def clerk_guard(
    creds: HTTPAuthorizationCredentials = Depends(clerk_bearer),
) -> HTTPAuthorizationCredentials:
    return creds


def credential_user_id(creds: HTTPAuthorizationCredentials) -> str | None:
    decoded = getattr(creds, "decoded", None)

    return decoded.get("sub") if isinstance(decoded, dict) else None

if IMAGES_DIR.exists():
    app.mount("/api/images", StaticFiles(directory=IMAGES_DIR), name="images")


@app.get("/api/documents")
def get_documents(creds: HTTPAuthorizationCredentials = Depends(clerk_guard)) -> list[DocumentItem]:
    return list_documents(creds.decoded["sub"])


@app.get("/api/documents/{document_id}")
def get_document(
    document_id: str,
    history_id: str = "",
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
) -> dict:
    user_id = credential_user_id(creds)
    items = [item for item in load_items() if document_id_of(item["source_url"]) == document_id]

    if not items:
        reviewed = (
            get_history(history_id, user_id=user_id)
            if history_id and user_id
            else get_history(history_id) if history_id else None
        )

        return practice_set_of(
            document_id, user_id,
            {answer.question_id for answer in reviewed.questions} if reviewed else None,
        )

    return exam_of(
        document_id,
        items[0]["source_title"],
        items[0].get("grade") or 12,
        90,
        items,
    )


@app.get("/api/ingest")
def get_ingest(creds: HTTPAuthorizationCredentials = Depends(clerk_guard)) -> dict:
    return ingest_state()


@app.post("/api/ingest/mode")
def post_ingest_mode(
    manual: bool,
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
) -> dict:
    main.manual = manual

    return ingest_state()


@app.delete("/api/ingest")
def delete_ingest(
    url: str,
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
) -> dict:
    drop_doc(url)

    return ingest_state()


@app.post("/api/ingest/approve")
def post_ingest_approve(
    url: str,
    background: BackgroundTasks,
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
) -> dict:
    reject_if_busy()

    background.add_task(approve, url)

    return ingest_state()


@app.get("/api/practice")
def get_practice(
    q: str = "",
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
) -> list[DocumentItem]:
    return practice_sets(creds.decoded["sub"], q)


@app.get("/api/practice/status")
def get_practice_status(
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
) -> PracticeStatus:
    return PracticeStatus(**(main.progress or {}))


@app.post("/api/practice/update")
def post_practice_update(
    request: PracticeRequest,
    background: BackgroundTasks,
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
) -> list[DocumentItem]:
    query = request.request.strip()
    user_id = credential_user_id(creds)

    reject_if_busy()

    solved = solved_question_ids(user_id=user_id)

    if query and not crawl_requests(solved, source_urls(), query, user_id=user_id):
        raise HTTPException(
            status_code=409,
            detail=(
                f'You already have {stocked_count(query, solved, user_id=user_id)} '
                f'unanswered "{query}" questions. No new questions are needed yet.'
            ),
        )

    background.add_task(stock_practice, query, user_id)

    return practice_sets(user_id, query)


@app.post("/api/hints")
def post_hint(
    request: HintRequest,
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
) -> HintResponse:
    return give_hint(find_item(request.question_id), request.level, request.student_answer)


@app.post("/api/solutions")
def post_solution(
    request: SolutionRequest,
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
) -> SolutionResponse:
    answered = get_answer(
        request.history_id,
        request.question_id,
        user_id=creds.decoded["sub"],
    )

    if not answered:
        raise HTTPException(status_code=404, detail="Câu này chưa được chấm.")

    return explain(find_item(request.question_id), answered.student_answer, answered.evaluation)


@app.post("/api/history")
def post_history(
    request: HistoryRequest,
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
) -> HistoryCreated:
    return start_history(
        request.exam_id,
        request.mode,
        request.duration_seconds,
        user_id=creds.decoded["sub"],
    )


@app.get("/api/history")
def get_history_list(
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
) -> list[HistoryItem]:
    return list_history(user_id=creds.decoded["sub"])


@app.get("/api/history/{history_id}")
def get_history_detail(
    history_id: str,
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
) -> HistoryDetail:
    detail = get_history(history_id, user_id=creds.decoded["sub"])

    if not detail:
        raise HTTPException(status_code=404, detail="Không tìm thấy lượt làm bài.")

    return detail


@app.get("/api/exams/grading-status")
def get_grading_status(
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
) -> GradingStatus:
    return GradingStatus(exam_id=main.grading)


@app.post("/api/exams/submit")
def post_exam_submit(
    request: SubmitRequest,
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
) -> SubmitResponse:
    user_id = creds.decoded["sub"]
    submissions = [
        submission_of(answer.question_id, answer.student_answer)
        for answer in request.answers
    ]

    main.grading = request.exam_id

    try:
        state = grade(submissions, user_id=user_id)
        created = start_history(
            request.exam_id,
            "exam",
            request.duration_seconds,
            user_id=user_id,
        )

        for submission, evaluation in zip(submissions, state["final_evaluations"]):
            save_answer(
                created.history_id,
                submission["item"].id,
                submission["student_answer"],
                evaluation,
            )
    finally:
        main.grading = None

    return SubmitResponse(
        exam_id=request.exam_id,
        history_id=created.history_id,
        total_score=state["total_score"],
        correct_count=sum(evaluation.correct for evaluation in state["final_evaluations"]),
        per_question={
            submission["item"].id: evaluation
            for submission, evaluation in zip(submissions, state["final_evaluations"])
        },
    )


@app.post("/api/practice/check-question")
def post_practice_check(
    request: CheckRequest,
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
) -> Evaluation:
    user_id = credential_user_id(creds)
    submission = submission_of(request.question_id, request.student_answer)
    reviewed = (
        get_history(request.history_id, user_id=user_id)
        if user_id
        else get_history(request.history_id)
    )

    main.grading = reviewed.exam_id if reviewed else None

    try:
        state = grade([submission], user_id=user_id) if user_id else grade([submission])
        evaluation = state.get("final_evaluations", state["evaluations"])[0]
        save_answer(request.history_id, request.question_id, request.student_answer, evaluation)
    except IntegrityError:
        raise HTTPException(status_code=404, detail="Không tìm thấy lượt làm bài.")
    finally:
        main.grading = None

    return evaluation


@app.get("/api/knowledge_graph")
def get_graph(
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
) -> dict:
    user_id = creds.decoded["sub"]
    return {**get_knowledge_graph(user_id), "streak": streak(user_id=user_id)}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("api.router:app", host="0.0.0.0", port=8000, reload=True)
