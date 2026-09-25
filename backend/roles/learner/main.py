from __future__ import annotations

from langsmith import traceable
from typesafe_sdk import Choice, Noul, Score, TypeSafeClient

import os

from common.schema import Evaluation
from knowledge.bank.main import Item
from roles.teacher.main import answer_text, question_block, reference_solution
from .context import (
    ERROR_DIAGNOSIS_CONTEXT,
    ERROR_TYPE_CRITERIA,
)
from .schema import ErrorDiagnosis


LEARNER_MODEL = os.getenv("OPENROUTER_LEARNER_MODEL")
DIAGNOSIS_CLARITY = (
    "There is not enough evidence to identify a primary error.",
    "There is some evidence, but more than one primary error is plausible.",
    "The student's work and the evaluations clearly show one primary error.",
)


def evaluation_block(label: str, evaluation: Evaluation) -> str:
    return "\n".join(
        (
            f"{label}:",
            f"correct: {evaluation.correct}",
            f"part_correct: {evaluation.part_correct}",
            f"score: {evaluation.score}",
            f"feedback: {evaluation.feedback}",
        )
    )


def build_diagnosis_prompt(
    item: Item,
    student_answer: str | list[bool],
    teacher_evaluation: Evaluation,
    verifier_evaluation: Evaluation,
) -> str:
    return "\n\n".join(
        (
            ERROR_DIAGNOSIS_CONTEXT,
            "Error type definitions:\n"
            + "\n".join(
                f"- {error_type}: {description}"
                for error_type, description in ERROR_TYPE_CRITERIA.items()
            ),
            question_block(item),
            reference_solution(item),
            f"Student answer:\n{answer_text(item, student_answer) or '(empty)'}",
            evaluation_block("Teacher evaluation", teacher_evaluation),
            evaluation_block("Verifier final evaluation", verifier_evaluation),
        )
    )


def diagnosis_questions() -> dict:
    return {
        "error_type": Choice(
            instructions="Choose the one primary error that best explains the incorrect answer.",
            criteria=ERROR_TYPE_CRITERIA,
        ),
        "identifiable": Noul(
            instructions="Is there enough evidence to identify one primary error type?",
        ),
        "clarity": Score(
            instructions="How clear is the evidence for the selected primary error?",
            criteria=DIAGNOSIS_CLARITY,
        ),
    }

@traceable(name="[LEARNER]: Diagnosis answer")
def diagnose_answer(
    item: Item,
    student_answer: str | list[bool],
    teacher_evaluation: Evaluation,
    verifier_evaluation: Evaluation,
) -> ErrorDiagnosis | None:
    if verifier_evaluation.correct:
        return None

    learner = TypeSafeClient(
        api_key=os.environ["OPENROUTER_API_KEY"],
        base_url="https://openrouter.ai/api",
        model=LEARNER_MODEL,
    )

    response = learner.system_one(
        state=build_diagnosis_prompt(
            item,
            student_answer,
            teacher_evaluation,
            verifier_evaluation,
        ),
        questions=diagnosis_questions(),
    )
    error_type = response.choices["error_type"]
    identifiable = response.nouls["identifiable"].noul
    clarity = response.scores["clarity"].score / (len(DIAGNOSIS_CLARITY) - 1)

    return ErrorDiagnosis(
        error_type=error_type.choice if identifiable >= 0.5 else "other",
        confidence=min(error_type.confidence, identifiable, clarity),
    )
