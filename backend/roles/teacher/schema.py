from __future__ import annotations

from typing import Literal
from pydantic import BaseModel


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


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []
    question_id: str = ""
    student_answer: str | list[bool] = ""