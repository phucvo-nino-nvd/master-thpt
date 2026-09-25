from __future__ import annotations

from functools import lru_cache
from langsmith import traceable

import os

from common.schema import Question
from common.utils import chat_model
from ..parser.refine import rescued
from .context import AUTHOR_CONTEXT
from .schema import AuthoredQuestions


AUTHOR_MODEL = os.getenv("OPENROUTER_AUTHOR_MODEL")

@lru_cache(maxsize=1)
def writer():
    return chat_model(AUTHOR_MODEL).with_structured_output(
        AuthoredQuestions,
        method="json_schema",
        strict=True,
    )


def build_author_prompt(concept: str, grade: int, count: int) -> str:
    return "\n\n".join([
        AUTHOR_CONTEXT,
        f"Concept: {concept}",
        f"Grade: {grade}",
        f"Questions to write: {count}",
    ])


@traceable(name="[AUTHOR]: Write questions")
def write_questions(concept: str, grade: int, count: int) -> list[Question]:
    if count < 1:
        return []

    result = AuthoredQuestions.model_validate(
        writer().invoke(build_author_prompt(concept, grade, count))
    )

    return [
        rescued(question)
        for question in result.questions
        if question.content.strip()
    ][:count]
