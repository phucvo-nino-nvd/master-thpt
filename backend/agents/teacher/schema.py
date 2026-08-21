from __future__ import annotations

from pydantic import BaseModel, Field


class HintRequest(BaseModel):
    question_id: str
    level: int = 1
    student_answer: str | list[bool] = ""


class HintResponse(BaseModel):
    hint: str
    level: int = 1


class SolutionRequest(BaseModel):
    history_id: str
    question_id: str


class SolutionResponse(BaseModel):
    solution: str