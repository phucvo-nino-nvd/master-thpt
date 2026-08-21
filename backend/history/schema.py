from __future__ import annotations

from typing import Literal
from pydantic import BaseModel

from common.schema import Evaluation


Mode = Literal["exam", "practice"]


class HistoryRequest(BaseModel):
    exam_id: str
    mode: Mode = "practice"
    duration_seconds: int | None = None


class HistoryCreated(BaseModel):
    history_id: str


class HistoryQuestion(BaseModel):
    question_id: str
    student_answer: str | list[bool]
    evaluation: Evaluation


class HistoryItem(BaseModel):
    history_id: str
    exam_id: str
    mode: Mode
    total_score: float
    correct_count: int
    total_questions: int
    duration_seconds: int | None = None
    created_at: str


class HistoryDetail(HistoryItem):
    questions: list[HistoryQuestion]
