from __future__ import annotations

from pydantic import BaseModel
from pydantic.json_schema import SkipJsonSchema
from common.schema import Option, Question, QuestionPart, QuestionType


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


class AuthoredPart(QuestionPart):
    solution: SkipJsonSchema[str | None] = None


class AuthoredQuestion(Question):
    type: QuestionType
    options: list[Option]
    parts: list[AuthoredPart]
    solution: SkipJsonSchema[str | None] = None


class AuthoredQuestions(BaseModel):
    questions: list[AuthoredQuestion]