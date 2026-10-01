from __future__ import annotations

from collections.abc import Iterator
from functools import lru_cache
from langsmith import traceable

import os

from common.schema import Evaluation
from common.utils import chat_model
from knowledge.bank.main import Item
from .context import CHAT_CONTEXT, EVALUATE_CONTEXT, HINT_CONTEXT, HINT_LEVELS, SOLUTION_CONTEXT
from .rubric import answer_of, apply_rubric, settled
from .schema import ChatMessage, HintResponse, SolutionResponse


TEACHER_MODEL = os.getenv("OPENROUTER_TEACHER_MODEL")
MAX_HINT_LEVEL = len(HINT_LEVELS)


@lru_cache(maxsize=1)
def evaluator():
    return chat_model(TEACHER_MODEL).with_structured_output(
        Evaluation,
        method="json_schema",
        strict=True,
    )


@lru_cache(maxsize=1)
def hinter():
    return chat_model(TEACHER_MODEL).with_structured_output(
        HintResponse,
        method="json_schema",
        strict=True,
    )


@lru_cache(maxsize=1)
def explainer():
    return chat_model(TEACHER_MODEL).with_structured_output(
        SolutionResponse,
        method="json_schema",
        strict=True,
    )


def question_block(item: Item) -> str:
    sections = [
        f"Question type: {item.type}",
        f"Question:\n{item.content}",
    ]

    if item.options:
        sections.append(
            "Options:\n"
            + "\n".join(f"{option.label}. {option.content}" for option in item.options)
        )

    if item.parts:
        sections.append(
            "Sub-statements:\n"
            + "\n".join(f"{part.label}) {part.content}" for part in item.parts)
        )

    return "\n\n".join(sections)


def reference_solution(item: Item) -> str:
    solutions = [item.solution or ""]

    solutions.extend(
        f"{part.label}) {part.solution}"
        for part in item.parts
        if part.solution
    )

    solution = "\n".join(line for line in solutions if line)

    return f"Reference solution:\n{solution}" if solution else ""


def answer_text(item: Item, student_answer: str | list[bool]) -> str:
    if not isinstance(student_answer, list):
        return student_answer.strip()

    return "\n".join(
        f"{part.label}) {'Đúng' if given else 'Sai'}"
        for part, given in zip(item.parts, student_answer)
    )


def answer_key_block(item: Item) -> str:
    if not settled(item):
        return f"Return exactly {len(item.parts)} booleans in part_correct." if item.parts else ""

    key = answer_of(item)

    if isinstance(key, list):
        key = ", ".join(
            f"{part.label}) {'Đúng' if expected else 'Sai'}"
            for part, expected in zip(item.parts, key)
        )

    return (
        f"Answer key: {key}\n"
        "The key is authoritative and correctness is already settled from it. "
        "Write feedback only; correct and part_correct are discarded."
    )


def build_evaluate_prompt(item: Item, student_answer: str | list[bool]) -> str:
    sections = [
        EVALUATE_CONTEXT,
        question_block(item),
        reference_solution(item),
        answer_key_block(item),
        f"Student answer:\n{answer_text(item, student_answer) or '(empty)'}",
    ]

    return "\n\n".join(section for section in sections if section)


def build_hint_prompt(item: Item, level: int, student_answer: str | list[bool]) -> str:
    sections = [
        HINT_CONTEXT,
        question_block(item),
        reference_solution(item),
        HINT_LEVELS[level - 1],
    ]

    attempt = answer_text(item, student_answer)

    if attempt:
        sections.append(f"Student attempt:\n{attempt}")

    return "\n\n".join(section for section in sections if section)


def build_solution_prompt(item: Item, student_answer: str | list[bool], evaluation: Evaluation) -> str:
    sections = [
        SOLUTION_CONTEXT,
        question_block(item),
        reference_solution(item),
        f"Student answer:\n{answer_text(item, student_answer) or '(empty)'}",
        (
            "Grading already shown to the student:\n"
            f"correct: {evaluation.correct}\n"
            f"part_correct: {evaluation.part_correct}\n"
            f"feedback: {evaluation.feedback}"
        ),
    ]

    return "\n\n".join(section for section in sections if section)


def build_chat_prompt(item: Item | None, student_answer: str | list[bool]) -> str:
    if item is None:
        return CHAT_CONTEXT

    sections = [
        CHAT_CONTEXT,
        question_block(item),
        reference_solution(item),
        f"Student answer:\n{answer_text(item, student_answer) or '(not answered yet)'}",
    ]

    return "\n\n".join(section for section in sections if section)


@traceable(name="[TEACHER]: Evaluate student answer")
def evaluate(item: Item, student_answer: str | list[bool]) -> Evaluation:
    prompt = build_evaluate_prompt(item, student_answer)
    keyed = settled(item)

    evaluation = None

    for _ in range(2):
        evaluation = Evaluation.model_validate(evaluator().invoke(prompt))

        if keyed or len(evaluation.part_correct) == len(item.parts):
            return apply_rubric(item, student_answer, evaluation)

    raise ValueError(
        f"LLM judged {len(evaluation.part_correct) if evaluation else 0} sub-statements "
        f"for item {item.id} which has {len(item.parts)}"
    )


@traceable(name="[TEACHER]: Give hint")
def give_hint(item: Item, level: int = 1, student_answer: str | list[bool] = "") -> HintResponse:
    level = min(max(level, 1), MAX_HINT_LEVEL)

    result = HintResponse.model_validate(hinter().invoke(build_hint_prompt(item, level, student_answer)))

    return result.model_copy(update={"level": level})


@traceable(name="[TEACHER]: Chat")
def chat(
    message: str,
    history: list[ChatMessage],
    item: Item | None = None,
    student_answer: str | list[bool] = "",
) -> Iterator[dict]:
    messages = [
        ("system", build_chat_prompt(item, student_answer)),
        *((turn.role, turn.content) for turn in history),
        ("user", message),
    ]

    for chunk in chat_model(TEACHER_MODEL).stream(messages):
        if chunk.content:
            yield {"type": "content", "content": chunk.content}


@traceable(name="[TEACHER]: Explain solution")
def explain(item: Item, student_answer: str | list[bool], evaluation: Evaluation) -> SolutionResponse:
    return SolutionResponse.model_validate(
        explainer().invoke(build_solution_prompt(item, student_answer, evaluation))
    )
