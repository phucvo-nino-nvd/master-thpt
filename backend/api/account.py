from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Literal

import json

from history.db import get_connection, init_db
from history.main import runs_of
from roles.learner.service import knowledge_of, passed, quest_groups
from .schema import Account, AccountUpdate, ActivityDay, DailyTask


VIETNAM = timezone(timedelta(hours=7))
XP_PER_CORRECT = 4
XP_PER_CUP = 10
XP_PER_EXAM = 20
ANSWERED = """(
    (json_type(q.student_answer) = 'text' AND TRIM(json_extract(q.student_answer, '$')) != '')
    OR (json_type(q.student_answer) = 'array' AND json_array_length(q.student_answer) > 0)
)"""


def cups_of(user_id: str) -> int:
    path, _ = quest_groups()
    stage_ids = {stage["id"] for stage in path}
    runs = [run for run in runs_of(user_id=user_id) if run["mode"] == "checkpoint" and run["exam_id"] in stage_ids]
    knowledge = knowledge_of(sorted({answer["question_id"] for run in runs for answer in run["answers"]}))

    return len({run["exam_id"] for run in runs if passed(run["answers"], knowledge)})


def account_of(user_id: str, plan: Literal["free", "pro"] = "free") -> Account:
    if not user_id:
        raise ValueError("Missing account owner")

    init_db()
    today = datetime.now(VIETNAM).date()

    with get_connection() as conn:
        conn.execute("INSERT OR IGNORE INTO account_profile (user_id) VALUES (?)", (user_id,))
        profile = conn.execute("SELECT data, created_at FROM account_profile WHERE user_id = ?", (user_id,)).fetchone()
        joined = conn.execute("SELECT MIN(created_at) FROM history WHERE user_id = ?", (user_id,)).fetchone()[0]
        rows = conn.execute(
            f"""
            SELECT DATE(q.answered_at, '+7 hours') AS day,
                   COUNT(*) AS count, SUM(q.correct) AS correct
            FROM history_question q
            JOIN history h ON h.id = q.history_id
            WHERE h.user_id = ?
              AND DATE(q.answered_at, '+7 hours') <= ?
              AND {ANSWERED}
            GROUP BY day
            ORDER BY day
            """,
            (user_id, today.isoformat()),
        ).fetchall()
        exams = conn.execute(
            f"""
            SELECT COUNT(DISTINCT h.exam_id)
            FROM history h
            WHERE h.user_id = ? AND h.mode = 'exam'
              AND EXISTS (SELECT 1 FROM history_question q WHERE q.history_id = h.id)
              AND NOT EXISTS (SELECT 1 FROM history_question q WHERE q.history_id = h.id AND NOT {ANSWERED})
            """,
            (user_id,),
        ).fetchone()[0]

    settings = AccountUpdate.model_validate_json(profile["data"])
    learned = {row["day"] for row in rows}
    kept_today = today.isoformat() in learned
    cursor = today if kept_today else today - timedelta(days=1)
    streak = 0
    while cursor.isoformat() in learned:
        streak += 1
        cursor -= timedelta(days=1)

    monday = today - timedelta(days=today.weekday())
    today_xp = sum(row["correct"] for row in rows if row["day"] == today.isoformat()) * XP_PER_CORRECT
    joined_at = min(profile["created_at"], joined) if joined else profile["created_at"]

    return Account(
        **settings.model_dump(),
        plan=plan,
        joined_at=joined_at.replace(" ", "T") + "Z",
        xp=sum(row["correct"] for row in rows) * XP_PER_CORRECT + cups_of(user_id) * XP_PER_CUP + exams * XP_PER_EXAM,
        streak=streak,
        kept_today=kept_today,
        week=[(monday + timedelta(days=i)).isoformat() in learned for i in range(7)],
        daily=[DailyTask(id="insight", title="Tích lũy 30 Điểm thấu hiểu", current=min(30, today_xp), target=30)],
        activity=[ActivityDay(date=row["day"], count=row["count"]) for row in rows],
    )


def save_account(user_id: str, request: AccountUpdate) -> None:
    if not user_id:
        raise ValueError("Missing account owner")

    init_db()
    patch = request.model_dump(exclude_unset=True)
    with get_connection() as conn:
        conn.execute("BEGIN IMMEDIATE")
        conn.execute("INSERT OR IGNORE INTO account_profile (user_id) VALUES (?)", (user_id,))
        row = conn.execute("SELECT data FROM account_profile WHERE user_id = ?", (user_id,)).fetchone()
        current = json.loads(row["data"])
        if "settings" in patch:
            patch["settings"] = {**current.get("settings", {}), **patch["settings"]}
        merged = AccountUpdate.model_validate({**current, **patch})
        conn.execute("UPDATE account_profile SET data = ? WHERE user_id = ?", (merged.model_dump_json(), user_id))
