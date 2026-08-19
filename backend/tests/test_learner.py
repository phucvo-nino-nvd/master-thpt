from __future__ import annotations

import pytest

from agents.learner import db
from agents.learner.service import process_attempt


@pytest.fixture
def learner_db(tmp_path, monkeypatch):
    learner_db = tmp_path / "learner" / "learner.db"

    monkeypatch.setattr(db, "DB_PATH", learner_db)

    db.init_db()

    return learner_db


def add_mapping(
    question_id: str,
    knowledge_id: str,
) -> None:
    with db.get_connection() as conn:
        conn.execute(
            """
            INSERT INTO question_knowledge (
                question_id,
                knowledge_id
            )
            VALUES (?, ?)
            """,
            (question_id, knowledge_id),
        )


def test_question_without_mapping_raises_error(learner_db):
    with pytest.raises(ValueError):
        process_attempt(
            "Q_UNKNOWN",
            correct=False,
        )


def test_first_wrong_attempt_creates_state(learner_db):
    add_mapping("Q001", "DAO_HAM")

    states = process_attempt(
        "Q001",
        correct=False,
    )

    assert len(states) == 1

    state = states[0]

    assert state["knowledge_id"] == "DAO_HAM"
    assert state["old_mastery"] is None
    assert state["mastery"] == pytest.approx(0.375)

    assert state["attempts"] == 1
    assert state["correct"] == 0
    assert state["incorrect"] == 1

    with db.get_connection() as conn:
        attempt = conn.execute(
            """
            SELECT question_id, correct
            FROM attempts
            """
        ).fetchone()

        stored_state = conn.execute(
            """
            SELECT *
            FROM knowledge_state
            WHERE knowledge_id = ?
            """,
            ("DAO_HAM",),
        ).fetchone()

    assert attempt["question_id"] == "Q001"
    assert attempt["correct"] == 0

    assert stored_state["mastery"] == pytest.approx(0.375)
    assert stored_state["attempts"] == 1
    assert stored_state["incorrect"] == 1


def test_next_correct_attempt_updates_existing_state(learner_db):
    add_mapping("Q001", "DAO_HAM")

    process_attempt(
        "Q001",
        correct=False,
    )

    states = process_attempt(
        "Q001",
        correct=True,
    )

    state = states[0]

    # First wrong:
    # 0.5 -> 0.375
    #
    # Then correct:
    # 0.375 + 0.2 * (1 - 0.375)
    # = 0.5
    assert state["old_mastery"] == pytest.approx(0.375)
    assert state["mastery"] == pytest.approx(0.5)

    assert state["attempts"] == 2
    assert state["correct"] == 1
    assert state["incorrect"] == 1

    with db.get_connection() as conn:
        attempt_count = conn.execute(
            "SELECT COUNT(*) FROM attempts"
        ).fetchone()[0]

        stored_state = conn.execute(
            """
            SELECT *
            FROM knowledge_state
            WHERE knowledge_id = ?
            """,
            ("DAO_HAM",),
        ).fetchone()

    assert attempt_count == 2

    assert stored_state["mastery"] == pytest.approx(0.5)
    assert stored_state["attempts"] == 2
    assert stored_state["correct"] == 1
    assert stored_state["incorrect"] == 1