from __future__ import annotations

from sqlite3 import Row
from uuid import uuid4

import json

from common.schema import Evaluation
from .db import get_connection, init_db
from .schema import HistoryCreated, HistoryDetail, HistoryItem, HistoryQuestion, Mode


SUMMARY_SQL = """
SELECT
    history.id,
    history.exam_id,
    history.mode,
    history.duration_seconds,
    history.created_at,
    COALESCE(SUM(history_question.score), 0.0) AS total_score,
    COALESCE(SUM(history_question.correct), 0) AS correct_count,
    COUNT(history_question.question_id) AS total_questions
FROM history
LEFT JOIN history_question ON history_question.history_id = history.id
"""


def encode(value: str | list[bool]) -> str:
    return json.dumps(value, ensure_ascii=False)


def item_of(row: Row) -> HistoryItem:
    return HistoryItem(
        history_id=row["id"],
        exam_id=row["exam_id"],
        mode=row["mode"],
        total_score=round(row["total_score"], 2),
        correct_count=row["correct_count"],
        total_questions=row["total_questions"],
        duration_seconds=row["duration_seconds"],
        created_at=row["created_at"],
    )


def question_of(row: Row) -> HistoryQuestion:
    return HistoryQuestion(
        question_id=row["question_id"],
        student_answer=json.loads(row["student_answer"]),
        evaluation=Evaluation(
            score=row["score"],
            correct=bool(row["correct"]),
            part_correct=json.loads(row["part_correct"]),
            feedback=row["feedback"],
        ),
    )


def start_history(exam_id: str, mode: Mode = "practice", duration_seconds: int | None = None) -> HistoryCreated:
    init_db()

    history_id = str(uuid4())

    with get_connection() as conn:
        conn.execute(
            """
            INSERT INTO history (id, exam_id, mode, duration_seconds)
            VALUES (?, ?, ?, ?)
            """,
            (history_id, exam_id, mode, duration_seconds),
        )

    return HistoryCreated(history_id=history_id)


def save_answer(
    history_id: str,
    question_id: str,
    student_answer: str | list[bool],
    evaluation: Evaluation,
) -> None:
    init_db()

    with get_connection() as conn:
        conn.execute(
            """
            INSERT INTO history_question (
                history_id,
                question_id,
                student_answer,
                correct,
                part_correct,
                score,
                feedback
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(history_id, question_id) DO UPDATE SET
                student_answer = excluded.student_answer,
                correct = excluded.correct,
                part_correct = excluded.part_correct,
                score = excluded.score,
                feedback = excluded.feedback,
                answered_at = CURRENT_TIMESTAMP
            """,
            (
                history_id,
                question_id,
                encode(student_answer),
                int(evaluation.correct),
                encode(evaluation.part_correct),
                evaluation.score,
                evaluation.feedback,
            ),
        )


def list_history() -> list[HistoryItem]:
    init_db()

    with get_connection() as conn:
        rows = conn.execute(
            SUMMARY_SQL + "GROUP BY history.id ORDER BY history.created_at DESC"
        ).fetchall()

    return [item_of(row) for row in rows]


def get_history(history_id: str) -> HistoryDetail | None:
    init_db()

    with get_connection() as conn:
        row = conn.execute(
            SUMMARY_SQL + "WHERE history.id = ? GROUP BY history.id",
            (history_id,),
        ).fetchone()

        if row is None:
            return None

        answers = conn.execute(
            """
            SELECT question_id, student_answer, correct, part_correct, score, feedback
            FROM history_question
            WHERE history_id = ?
            ORDER BY answered_at, rowid
            """,
            (history_id,),
        ).fetchall()

    return HistoryDetail(
        **item_of(row).model_dump(),
        questions=[question_of(answer) for answer in answers],
    )


def solved_question_ids() -> set[str]:
    init_db()

    with get_connection() as conn:
        rows = conn.execute(
            """
            SELECT DISTINCT question_id
            FROM history_question
            WHERE correct = 1
            """
        ).fetchall()

    return {row["question_id"] for row in rows}


def get_answer(history_id: str, question_id: str) -> HistoryQuestion | None:
    init_db()

    with get_connection() as conn:
        row = conn.execute(
            """
            SELECT question_id, student_answer, correct, part_correct, score, feedback
            FROM history_question
            WHERE history_id = ? AND question_id = ?
            """,
            (history_id, question_id),
        ).fetchone()

    return None if row is None else question_of(row)
