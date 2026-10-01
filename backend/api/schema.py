from __future__ import annotations

from pydantic import BaseModel

from common.schema import Evaluation
from history.schema import Mode


class Submission(BaseModel):
    question_id: str
    student_answer: str | list[bool] = ""


class CheckRequest(Submission):
    history_id: str


class SubmitRequest(BaseModel):
    exam_id: str
    answers: list[Submission]
    duration_seconds: int | None = None
    mode: Mode = "exam"


class SubmitResponse(BaseModel):
    exam_id: str
    history_id: str
    total_score: float
    correct_count: int
    per_question: dict[str, Evaluation]


class PracticeRequest(BaseModel):
    request: str = ""


class PracticeStatus(BaseModel):
    concept: str | None = None
    stage: str | None = None
    step: int = 0
    total: int = 0


class GradingStatus(BaseModel):
    exam_id: str | None = None


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
