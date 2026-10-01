from __future__ import annotations

from datetime import date
from dotenv import load_dotenv
from sqlite3 import Row
from uuid import uuid4

import json
import os

from roles.crawler.schema import CrawledDoc, CrawlerRequest, CrawlerResponse
from common.schema import Evaluation
from .db import get_connection, init_db
from .schema import HistoryCreated, HistoryDetail, HistoryItem, HistoryQuestion, Mode


load_dotenv()

REVIEW_DAYS = int(os.getenv("REVIEW_INTERVAL_DAYS", "7"))

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


def start_history(
    exam_id: str,
    mode: Mode = "practice",
    duration_seconds: int | None = None,
    *,
    user_id: str | None = None,
) -> HistoryCreated:
    init_db()

    history_id = str(uuid4())

    with get_connection() as conn:
        conn.execute(
            """
            INSERT INTO history (id, user_id, exam_id, mode, duration_seconds)
            VALUES (?, ?, ?, ?, ?)
            """,
            (history_id, user_id or "", exam_id, mode, duration_seconds),
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


def list_history(*, user_id: str | None = None) -> list[HistoryItem]:
    init_db()

    with get_connection() as conn:
        query = SUMMARY_SQL + "GROUP BY history.id ORDER BY history.created_at DESC"
        params: tuple[str, ...] = ()
        if user_id:
            query = (
                SUMMARY_SQL
                + "WHERE history.user_id = ? GROUP BY history.id ORDER BY history.created_at DESC"
            )
            params = (user_id,)

        rows = conn.execute(query, params).fetchall()

    return [item_of(row) for row in rows]


def get_history(
    history_id: str,
    *,
    user_id: str | None = None,
) -> HistoryDetail | None:
    init_db()

    with get_connection() as conn:
        query = SUMMARY_SQL + "WHERE history.id = ? GROUP BY history.id"
        params: tuple[str, ...] = (history_id,)
        if user_id:
            query = SUMMARY_SQL + "WHERE history.id = ? AND history.user_id = ? GROUP BY history.id"
            params = (history_id, user_id)

        row = conn.execute(query, params).fetchone()

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


def attempted_exam_ids(*, user_id: str | None = None) -> set[str]:
    init_db()

    with get_connection() as conn:
        query = "SELECT DISTINCT exam_id FROM history"
        params: tuple[str, ...] = ()
        if user_id:
            query += " WHERE user_id = ?"
            params = (user_id,)

        rows = conn.execute(query, params).fetchall()

    return {row["exam_id"] for row in rows}


def solved_question_ids(*, user_id: str | None = None) -> set[str]:
    init_db()

    with get_connection() as conn:
        query = """
            SELECT question_id
            FROM history_question
            JOIN history ON history.id = history_question.history_id
            WHERE correct = 1
        """
        params: tuple[str, ...] = ()
        if user_id:
            query += " AND history.user_id = ?"
            params = (user_id,)
        query += " GROUP BY question_id HAVING MAX(answered_at) > datetime('now', ?)"
        rows = conn.execute(query, (*params, f"-{REVIEW_DAYS} days")).fetchall()

    return {row["question_id"] for row in rows}


def runs_of(*, user_id: str | None = None) -> list[dict]:
    init_db()

    with get_connection() as conn:
        query = """
            SELECT
                history.id,
                history.mode,
                history.exam_id,
                history_question.question_id,
                history_question.correct,
                history_question.answered_at
            FROM history
            LEFT JOIN history_question ON history_question.history_id = history.id
        """
        params: tuple[str, ...] = ()
        if user_id:
            query += " WHERE history.user_id = ?"
            params = (user_id,)
        query += " ORDER BY history.created_at, history.rowid, history_question.answered_at"
        rows = conn.execute(query, params).fetchall()

    runs: dict[str, dict] = {}

    for row in rows:
        run = runs.setdefault(
            row["id"],
            {"mode": row["mode"], "exam_id": row["exam_id"], "answers": []},
        )

        if row["question_id"] is not None:
            run["answers"].append({
                "question_id": row["question_id"],
                "correct": row["correct"],
                "answered_at": row["answered_at"],
            })

    return list(runs.values())


def streak(*, user_id: str | None = None) -> int:
    init_db()

    with get_connection() as conn:
        today = conn.execute("SELECT DATE('now', 'localtime') AS day").fetchone()["day"]
        query = """
            SELECT DISTINCT DATE(answered_at, 'localtime') AS day
            FROM history_question
            JOIN history ON history.id = history_question.history_id
        """
        params: tuple[str, ...] = ()
        if user_id:
            query += " WHERE history.user_id = ?"
            params = (user_id,)
        query += " ORDER BY day DESC"
        rows = conn.execute(query, params).fetchall()

    days = [date.fromisoformat(row["day"]) for row in rows]

    if not days or (date.fromisoformat(today) - days[0]).days > 1:
        return 0

    count = 1

    for previous, current in zip(days, days[1:]):
        if (previous - current).days != 1:
            break

        count += 1

    return count


def batches_of(rows: list[Row]) -> list[CrawlerResponse]:
    batches: dict[tuple[str, int], CrawlerResponse] = {}

    for row in rows:
        batch = batches.setdefault(
            (row["concept"], row["grade"]),
            CrawlerResponse(
                request=CrawlerRequest(grade=row["grade"], concept=row["concept"]),
                query="",
                docs=[],
                missing=0,
            ),
        )

        batch.docs.append(
            CrawledDoc(url=row["url"], title=row["title"], score=row["score"])
        )

    return list(batches.values())


def queue_docs(crawled: CrawlerResponse) -> None:
    init_db()

    with get_connection() as conn:
        conn.executemany(
            """
            INSERT INTO crawl_queue (url, title, score, concept, grade)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(url) DO NOTHING
            """,
            [
                (doc.url, doc.title, doc.score, crawled.request.concept, crawled.request.grade)
                for doc in crawled.docs
            ],
        )


def queued_docs() -> list[CrawlerResponse]:
    init_db()

    with get_connection() as conn:
        rows = conn.execute(
            """
            SELECT url, title, score, concept, grade
            FROM crawl_queue
            ORDER BY created_at, rowid
            """
        ).fetchall()

    return batches_of(rows)


def drop_doc(url: str) -> None:
    init_db()

    with get_connection() as conn:
        conn.execute(
            """
            DELETE FROM crawl_queue
            WHERE url = ?
            """,
            (url,),
        )


def take_doc(url: str) -> list[CrawlerResponse]:
    init_db()

    with get_connection() as conn:
        rows = conn.execute(
            """
            DELETE FROM crawl_queue
            WHERE url = ?
            RETURNING url, title, score, concept, grade
            """,
            (url,),
        ).fetchall()

    return batches_of(rows)


def get_answer(
    history_id: str,
    question_id: str,
    *,
    user_id: str | None = None,
) -> HistoryQuestion | None:
    init_db()

    with get_connection() as conn:
        query = """
            SELECT question_id, student_answer, correct, part_correct, score, feedback
            FROM history_question
            JOIN history ON history.id = history_question.history_id
            WHERE history_id = ? AND question_id = ?
        """
        params: tuple[str, ...] = (history_id, question_id)
        if user_id:
            query += " AND history.user_id = ?"
            params = (history_id, question_id, user_id)

        row = conn.execute(query, params).fetchone()

    return None if row is None else question_of(row)
