from __future__ import annotations

import pytest

from roles.learner import db, service
from roles.learner.schema import ErrorDiagnosis
from roles.learner.service import run_learner
from roles.learner.service import (
    MIN_QUESTIONS,
    crawl_requests,
    matching_nodes,
    get_knowledge_graph,
    learning_path,
    process_attempt,
    recommend,
    status,
)

USER_ID = "student-1"


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
        user_id=USER_ID,
    )

    knowledge_graph = get_knowledge_graph(USER_ID)

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


def test_learning_path_puts_weak_node_before_untouched(learner_db):
    add_mapping("Q001", "DAO_HAM")

    process_attempt(
        "Q001",
        correct=False,
        user_id=USER_ID,
    )

    path = learning_path(USER_ID)
    knowledge_ids = [step["knowledge_id"] for step in path]

    assert knowledge_ids.index("DAO_HAM") < knowledge_ids.index("GIOI_HAN_HAM_SO")

    steps = {step["knowledge_id"]: step["action"] for step in path}

    assert steps["DAO_HAM"] == "practice"
    assert steps["GIOI_HAN_HAM_SO"] == "diagnose"


def test_learning_path_without_history_covers_every_untouched_node(learner_db):
    path = learning_path()

    assert path
    assert all(step["action"] == "diagnose" for step in path)

    assert "DAO_HAM" in {step["knowledge_id"] for step in path}


def test_question_without_mapping_updates_nothing(learner_db):
    assert process_attempt("Q_UNKNOWN", correct=False, user_id=USER_ID) == []


def test_first_wrong_attempt_creates_state(learner_db):
    add_mapping("Q001", "DAO_HAM")

    states = process_attempt(
        "Q001",
        correct=False,
        user_id=USER_ID,
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
        stored_state = conn.execute(
            """
            SELECT *
            FROM knowledge_state
            WHERE knowledge_id = ?
            """,
            ("DAO_HAM",),
        ).fetchone()

    assert stored_state["mastery"] == pytest.approx(0.375)
    assert stored_state["attempts"] == 1
    assert stored_state["incorrect"] == 1


def test_next_correct_attempt_updates_existing_state(learner_db):
    add_mapping("Q001", "DAO_HAM")

    process_attempt(
        "Q001",
        correct=False,
        user_id=USER_ID,
    )

    states = process_attempt(
        "Q001",
        correct=True,
        user_id=USER_ID,
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
        stored_state = conn.execute(
            """
            SELECT *
            FROM knowledge_state
            WHERE knowledge_id = ?
            """,
            ("DAO_HAM",),
        ).fetchone()

    assert stored_state["mastery"] == pytest.approx(0.5)
    assert stored_state["attempts"] == 2
    assert stored_state["correct"] == 1
    assert stored_state["incorrect"] == 1


def test_incorrect_typed_attempt_records_mastery_and_error(learner_db, monkeypatch):
    add_mapping("Q001", "DAO_HAM")
    monkeypatch.setattr(
        service,
        "recommend",
        lambda knowledge_id, *, user_id: {"knowledge_id": knowledge_id},
    )

    result = run_learner(
        user_id=USER_ID,
        attempts=[
            {
                "question_id": "Q001",
                "type": "short_answer",
                "correct": False,
                "diagnosis": ErrorDiagnosis(
                    error_type="wrong_setup",
                    confidence=0.9,
                ).model_dump(),
            }
        ],
    )

    assert {state["type"] for state in result["knowledge_states"]} == {
        "overall",
        "short_answer",
    }
    assert len(result["error_states"]) == 1
    error = result["error_states"][0]
    assert error["knowledge_id"] == "DAO_HAM"
    assert error["type"] == "short_answer"
    assert error["error_type"] == "wrong_setup"
    assert error["count"] == 1
    assert error["recent_count"] == 1
    assert error["last_seen"]


def test_recommend_prioritizes_weak_prerequisite(learner_db, monkeypatch):
    add_mapping("Q001", "DAO_HAM")
    process_attempt("Q001", correct=False, user_id=USER_ID)

    monkeypatch.setattr(
        service,
        "get_prerequisites",
        lambda knowledge_id: [{"id": "GIOI_HAN_HAM_SO"}],
    )

    assert recommend("DAO_HAM", user_id=USER_ID) == {
        "action": "diagnose",
        "knowledge_id": "GIOI_HAN_HAM_SO",
    }


def test_recommend_targets_confirmed_error(learner_db, monkeypatch):
    add_mapping("Q001", "DAO_HAM")
    monkeypatch.setattr(service, "get_prerequisites", lambda knowledge_id: [])

    run_learner(
        user_id=USER_ID,
        attempts=[
            {
                "question_id": "Q001",
                "type": "short_answer",
                "correct": False,
                "diagnosis": ErrorDiagnosis(
                    error_type="wrong_setup",
                    confidence=0.9,
                ).model_dump(),
            }
        ],
    )

    assert recommend("DAO_HAM", user_id=USER_ID) == {
        "action": "remediate",
        "knowledge_id": "DAO_HAM",
        "type": "short_answer",
        "error_type": "wrong_setup",
    }


def test_recommend_transfers_to_weaker_question_type(learner_db, monkeypatch):
    add_mapping("Q001", "DAO_HAM")
    add_mapping("Q002", "DAO_HAM")
    monkeypatch.setattr(service, "get_prerequisites", lambda knowledge_id: [])

    for _ in range(3):
        process_attempt(
            "Q001",
            correct=True,
            question_type="multiple_choice",
            user_id=USER_ID,
        )

    process_attempt(
        "Q002",
        correct=False,
        question_type="short_answer",
        user_id=USER_ID,
    )

    assert recommend("DAO_HAM", user_id=USER_ID) == {
        "action": "transfer",
        "knowledge_id": "DAO_HAM",
        "type": "short_answer",
    }

def test_search_skips_crawl_when_concept_already_stocked(learner_db):
    for number in range(MIN_QUESTIONS):
        add_mapping(f"Q{number:03d}", "DAO_HAM")

    assert crawl_requests(set(), [], "đạo hàm") == []

    solved = {f"Q{number:03d}" for number in range(2)}

    requests = crawl_requests(solved, [], "đạo hàm")

    assert [request.concept for request in requests] == ["đạo hàm"]


def test_matching_nodes_ignores_nodes_outside_learning_path(learner_db, monkeypatch):
    monkeypatch.setattr(
        service,
        "learning_path",
        lambda: [{"knowledge_id": "DAO_HAM_CAP_HAI"}],
    )

    assert matching_nodes("đạo hàm") == ["DAO_HAM_CAP_HAI"]
