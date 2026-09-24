from __future__ import annotations

from pydantic import BaseModel
from pydantic.json_schema import SkipJsonSchema
from common.schema import Option, Question, QuestionPart, QuestionType


class AuthoredPart(QuestionPart):
    solution: SkipJsonSchema[str | None] = None


class AuthoredQuestion(Question):
    type: QuestionType
    options: list[Option]
    parts: list[AuthoredPart]
    solution: SkipJsonSchema[str | None] = None


class AuthoredQuestions(BaseModel):
    questions: list[AuthoredQuestion]
