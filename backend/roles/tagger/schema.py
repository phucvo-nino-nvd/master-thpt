from __future__ import annotations

from pydantic import BaseModel


class QuestionTags(BaseModel):
    knowledge_ids: list[str]


class TaggingDecision(BaseModel):
    questions: list[QuestionTags]
