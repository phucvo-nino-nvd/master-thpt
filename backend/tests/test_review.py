from __future__ import annotations

import pytest

from api import router
from history.schema import HistoryDetail, HistoryQuestion
from common.schema import Evaluation


ITEM = {
    "id": "q1",
    "source_url": "http://x/a.pdf",
    "source_title": "a",
    "section": "Phần I",
    "number": "1",
    "grade": 12,
    "type": "short_answer",
    "content": "1 + 1 = ?",
    "options": [],
    "parts": [],
    "images": [],
    "solution": "2",
}


@pytest.fixture
def solved_practice_set(monkeypatch):
    monkeypatch.setattr(router, "load_items", lambda: [ITEM])
    monkeypatch.setattr(
        router,
        "node_map",
        lambda: {"TRUNG_VI": {"name": "Trung vị", "introduced_grade": 12}},
    )
    monkeypatch.setattr(router, "pending_of", lambda ids, solved: {})
    monkeypatch.setattr(router, "solved_question_ids", lambda: {"q1"})
    monkeypatch.setattr(router, "items_of", lambda ids: [ITEM] if "q1" in ids else [])
    monkeypatch.setattr(
        router,
        "get_history",
        lambda history_id: HistoryDetail(
            history_id=history_id,
            exam_id="TRUNG_VI",
            mode="practice",
            total_score=1.0,
            correct_count=1,
            total_questions=1,
            created_at="2026-08-22T07:20:00",
            questions=[
                HistoryQuestion(
                    question_id="q1",
                    student_answer="2",
                    evaluation=Evaluation(score=1.0, correct=True, part_correct=[], feedback=""),
                )
            ],
        ),
    )


def test_review_of_solved_practice_set_keeps_its_questions(solved_practice_set):
    exam = router.get_document("TRUNG_VI", history_id="h1")

    assert [question["id"] for question in exam["questions"]] == ["q1"]


def test_fresh_practice_set_without_pending_is_not_found(solved_practice_set):
    with pytest.raises(router.HTTPException) as raised:
        router.get_document("TRUNG_VI")

    assert raised.value.status_code == 404
