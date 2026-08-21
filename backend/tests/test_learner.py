from __future__ import annotations

import pytest

from agents.learner import db
from agents.learner.service import get_knowledge_graph, process_attempt, status


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


def test_status_thresholds():
    assert status(None) == "untouched"
    assert status(0.0) == "weak"
    assert status(0.49) == "weak"
    assert status(0.50) == "learning"
    assert status(0.79) == "learning"
    assert status(0.80) == "mastered"
    assert status(1.0) == "mastered"


def test_knowledge_graph_overlays_mastery(learner_db):
    add_mapping("Q001", "DAO_HAM")

    process_attempt(
        "Q001",
        correct=False,
    )

    knowledge_graph = get_knowledge_graph()

    nodes = {node["id"]: node for node in knowledge_graph["nodes"]}

    # Attempted: mastery 0.375 -> weak.
    assert nodes["DAO_HAM"]["status"] == "weak"
    assert nodes["DAO_HAM"]["score"] == 38
    assert nodes["DAO_HAM"]["label"] == "Đạo hàm"

    # Never attempted nodes stay grey, not weak.
    untouched = [
        node
        for node in knowledge_graph["nodes"]
        if node["id"] != "DAO_HAM"
    ]

    assert untouched
    assert all(node["status"] == "untouched" for node in untouched)
    assert all(node["score"] is None for node in untouched)

    assert knowledge_graph["edges"]

    node_ids = set(nodes)

    assert all(
        edge["source"] in node_ids and edge["target"] in node_ids
        for edge in knowledge_graph["edges"]
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