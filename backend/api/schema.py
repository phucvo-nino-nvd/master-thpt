from __future__ import annotations

from typing import Literal
from pydantic import BaseModel, ConfigDict, Field

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
    guest: bool = False


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


class AccountSettings(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)

    remind: bool = True
    sound: bool = True
    minutes: Literal[10, 20, 30, 45] = 20
    daily_goal: Literal[5, 10, 20] = 10


class AccountUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True, str_strip_whitespace=True)

    name: str = Field(default="", max_length=100)
    grade: Literal[10, 11, 12] | None = None
    goal: int | None = Field(default=None, ge=1, le=10)
    avatar: int = Field(default=0, ge=0, le=5)
    saved_exam_ids: list[str] = Field(default_factory=list, max_length=1000)
    settings: AccountSettings = Field(default_factory=AccountSettings)


class ActivityDay(BaseModel):
    date: str
    count: int


class DailyTask(BaseModel):
    id: str
    title: str
    current: int
    target: int


class Account(AccountUpdate):
    plan: Literal["free", "pro"] = "free"
    joined_at: str | None = None
    xp: int = 0
    streak: int = 0
    kept_today: bool = False
    week: list[bool] = Field(default_factory=lambda: [False] * 7)
    daily: list[DailyTask] = Field(default_factory=list)
    gains: list[dict] = Field(default_factory=list)
    activity: list[ActivityDay] = Field(default_factory=list)
