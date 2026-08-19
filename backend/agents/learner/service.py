from __future__ import annotations

from collections.abc import Sequence
from dotenv import load_dotenv
from typing import Any

import os

from knowledge.graph.query import (
    get_dependents,
    get_prerequisites,
)
from .db import get_connection, init_db
from .mastery import update_mastery


load_dotenv()

WEAK_THRESHOLD = float(os.getenv("WEAK_THRESHOLD", "0.50"))
MASTERED_THRESHOLD = float(os.getenv("MASTERED_THRESHOLD", "0.80"))


def get_mastery(knowledge_id: str) -> float | None:
    with get_connection() as conn:
        row = conn.execute(
            """
            SELECT mastery
            FROM knowledge_state
            WHERE knowledge_id = ?
            """,
            (knowledge_id,),
        ).fetchone()

    return None if row is None else row["mastery"]


def process_attempt(
    question_id: str,
    *,
    correct: bool,
) -> list[dict]:
    with get_connection() as conn:
        mappings = conn.execute(
            """
            SELECT knowledge_id
            FROM question_knowledge
            WHERE question_id = ?
            """,
            (question_id,),
        ).fetchall()

        if not mappings:
            raise ValueError(
                f"Question {question_id!r} has no knowledge mapping"
            )

        conn.execute(
            """
            INSERT INTO attempts (question_id, correct)
            VALUES (?, ?)
            """,
            (question_id, int(correct)),
        )

        updated_states = []

        for mapping in mappings:
            knowledge_id = mapping["knowledge_id"]

            state = conn.execute(
                """
                SELECT mastery, attempts, correct, incorrect
                FROM knowledge_state
                WHERE knowledge_id = ?
                """,
                (knowledge_id,),
            ).fetchone()

            old_mastery = None if state is None else state["mastery"]
            attempts = 0 if state is None else state["attempts"]
            correct_count = 0 if state is None else state["correct"]
            incorrect_count = 0 if state is None else state["incorrect"]

            mastery = update_mastery(
                old_mastery,
                correct=correct,
            )

            attempts += 1

            if correct:
                correct_count += 1
            else:
                incorrect_count += 1

            conn.execute(
                """
                INSERT INTO knowledge_state (
                    knowledge_id,
                    mastery,
                    attempts,
                    correct,
                    incorrect,
                    last_attempt_at,
                    updated_at
                )
                VALUES (
                    ?, ?, ?, ?, ?,
                    CURRENT_TIMESTAMP,
                    CURRENT_TIMESTAMP
                )
                ON CONFLICT(knowledge_id) DO UPDATE SET
                    mastery = excluded.mastery,
                    attempts = excluded.attempts,
                    correct = excluded.correct,
                    incorrect = excluded.incorrect,
                    last_attempt_at = CURRENT_TIMESTAMP,
                    updated_at = CURRENT_TIMESTAMP
                """,
                (
                    knowledge_id,
                    mastery,
                    attempts,
                    correct_count,
                    incorrect_count,
                ),
            )

            updated_states.append(
                {
                    "knowledge_id": knowledge_id,
                    "old_mastery": old_mastery,
                    "mastery": mastery,
                    "attempts": attempts,
                    "correct": correct_count,
                    "incorrect": incorrect_count,
                }
            )

    return updated_states


def recommend(knowledge_id: str) -> dict:
    mastery = get_mastery(knowledge_id)

    if mastery is None:
        return {
            "action": "diagnose",
            "knowledge_id": knowledge_id,
        }

    if mastery < WEAK_THRESHOLD:
        for prerequisite in get_prerequisites(knowledge_id):
            prerequisite_id = prerequisite["id"]
            prerequisite_mastery = get_mastery(prerequisite_id)

            if prerequisite_mastery is None:
                return {
                    "action": "diagnose",
                    "knowledge_id": prerequisite_id,
                }

            if prerequisite_mastery < WEAK_THRESHOLD:
                return {
                    "action": "review",
                    "knowledge_id": prerequisite_id,
                }

        return {
            "action": "practice",
            "knowledge_id": knowledge_id,
        }

    if mastery >= MASTERED_THRESHOLD:
        dependents = get_dependents(knowledge_id)

        if dependents:
            return {
                "action": "advance",
                "knowledge_id": dependents[0]["id"],
            }

    return {
        "action": "practice",
        "knowledge_id": knowledge_id,
    }


def run_learner(
    *,
    knowledge_id: str | None = None,
    attempts: Sequence[dict[str, Any]] = (),
) -> dict:
    """
    Public entry point for the learner module.
    """
    init_db()

    updated_states = []

    for attempt in attempts:
        updated_states.extend(
            process_attempt(
                attempt["question_id"],
                correct=attempt["correct"],
            )
        )

    target_id = knowledge_id

    if target_id is None and updated_states:
        target_id = updated_states[0]["knowledge_id"]

    return {
        "knowledge_states": updated_states,
        "recommendation": (
            recommend(target_id)
            if target_id is not None
            else None
        ),
    }