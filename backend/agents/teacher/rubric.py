from __future__ import annotations

from collections.abc import Sequence

import re

from common.schema import Evaluation, QuestionType
from knowledge.bank.main import Item


CHOICE_RE = re.compile(r"Chọn\s+\**\s*([A-D])")
RESULT_RE = re.compile(r"Kết quả:\s*([^\n_]+)")
TRUE_RE = re.compile(r"\s*\**\s*ĐÚNG")

TRUE_FALSE_POINTS = (0.0, 0.1, 0.25, 0.5, 1.0)
MAX_POINTS: dict[str, float] = {
    "multiple_choice": 0.25,
    "true_false": 1.0,
    "short_answer": 0.5,
}


def question_score(
    question_type: QuestionType,
    correct: bool,
    part_correct: Sequence[bool] = (),
) -> float:
    if question_type == "true_false":
        return TRUE_FALSE_POINTS[min(sum(part_correct), 4)]

    if question_type not in MAX_POINTS:
        raise ValueError(f"No rubric for question type: {question_type}")

    return MAX_POINTS[question_type] if correct else 0.0


def apply_rubric(item: Item, student_answer: str | list[bool], evaluation: Evaluation) -> Evaluation:
    key = answer_of(item)

    if item.type == "true_false" and isinstance(key, list) and key:
        given = student_answer if isinstance(student_answer, list) else []

        evaluation = evaluation.model_copy(
            update={
                "part_correct": [
                    index < len(given) and given[index] == expected
                    for index, expected in enumerate(key)
                ]
            }
        )

    score = question_score(item.type, evaluation.correct, evaluation.part_correct)

    return evaluation.model_copy(
        update={
            "score": score,
            "correct": (
                bool(evaluation.part_correct) and all(evaluation.part_correct)
                if item.type == "true_false"
                else score == MAX_POINTS[item.type]
            ),
        }
    )


def answer_of(item: Item) -> str | list[bool]:
    solution = item.solution or ""

    if item.type == "multiple_choice":
        match = CHOICE_RE.search(solution)

        return match.group(1) if match else ""

    if item.type == "true_false":
        if not item.parts or not all(part.solution for part in item.parts):
            return []

        return [bool(TRUE_RE.match(part.solution or "")) for part in item.parts]

    results = RESULT_RE.findall(solution)

    return results[-1].strip().rstrip(".") if results else ""


def settled(item: Item) -> bool:
    return item.type == "true_false" and bool(answer_of(item))


def normalize_answer(text: str) -> str:
    return text.strip().casefold().replace(",", ".").replace(" ", "").replace("$", "").rstrip(".")


def match_answer(item: Item, student_answer: str | list[bool]) -> Evaluation | None:
    key = answer_of(item)

    if not key:
        return None

    if isinstance(key, list):
        if not isinstance(student_answer, list) or student_answer != key:
            return None

        return apply_rubric(
            item,
            student_answer,
            Evaluation(
                score=0.0,
                correct=True,
                part_correct=[True] * len(key),
                feedback="Đúng cả các ý.",
            ),
        )

    if isinstance(student_answer, list):
        return None

    if normalize_answer(student_answer) != normalize_answer(key):
        return None

    return apply_rubric(
        item,
        student_answer,
        Evaluation(
            score=0.0,
            correct=True,
            feedback=f"Đúng, đáp án là {key}.",
        ),
    )