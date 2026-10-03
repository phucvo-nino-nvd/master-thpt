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


def test_crawl_uses_concept_grade_inside_focus(learner_db, monkeypatch):
    monkeypatch.setattr(service, "node_map", lambda: {
        "LOG": {"name": "Logarit", "introduced_grade": 11},
        "CAP": {"name": "Cấp số cộng", "introduced_grade": 9},
    })
    monkeypatch.setattr(service, "CRAWL_GRADES", [10, 11, 12])
    monkeypatch.setattr(service, "stocked_count", lambda concept, solved, user_id=None: 0)

    assert [request.grade for request in crawl_requests(set(), [], "logarit")] == [11]
    assert crawl_requests(set(), [], "cấp số cộng") == []
    assert [request.grade for request in crawl_requests(set(), [], "chủ đề lạ")] == [12]


def test_matching_nodes_ignores_nodes_outside_learning_path(learner_db, monkeypatch):
    monkeypatch.setattr(
        service,
        "learning_path",
        lambda: [{"knowledge_id": "DAO_HAM_CAP_HAI"}],
    )

    assert matching_nodes("đạo hàm") == ["DAO_HAM_CAP_HAI"]


def test_stages_follow_chapter_number_and_first_lesson(monkeypatch):
    from knowledge.graph.chunk import MarkdownChunk

    chunks = [
        MarkdownChunk("toan-10-tap-2:0001", 10, "CHƯƠNG VI. A", "a", "x"),
        MarkdownChunk("toan-10-tap-2:0002", 10, "CHƯƠNG IX. C", "c", "x"),
        MarkdownChunk("toan-10-tap-2:0003", 10, "CHƯƠNG VII. B", "b", "x"),
    ]
    nodes = [{"id": "N", "source_chunks": ["toan-10-tap-2:0003", "toan-10-tap-2:0002"]}]
    monkeypatch.setattr(service, "load_chunks", lambda: chunks)
    monkeypatch.setattr(service, "load_graph", lambda: (nodes, []))

    result = service.stages()

    assert [stage["id"] for stage in result] == ["toan-10-tap-2:6", "toan-10-tap-2:7", "toan-10-tap-2:9"]
    assert result[1]["stations"][0]["knowledge_ids"] == ["N"]
    assert result[2]["stations"][0]["knowledge_ids"] == []


def test_due_reviews_only_wrong_concepts_and_spaces_out_after_correct(learner_db):
    from datetime import datetime, timezone

    with db.get_connection() as conn:
        conn.executemany(
            "INSERT INTO question_knowledge (question_id, knowledge_id) VALUES (?, ?)",
            [("q1", "WRONG"), ("q2", "WRONG"), ("q3", "FIXED"), ("q4", "FIXED"), ("q5", "NEVER_WRONG")],
        )

    attempts = [
        {"question_id": "q1", "correct": 0, "answered_at": "2026-09-01 08:00:00"},
        {"question_id": "q3", "correct": 0, "answered_at": "2026-09-01 08:00:00"},
        {"question_id": "q4", "correct": 1, "answered_at": "2026-09-02 08:00:00"},
        {"question_id": "q4", "correct": 1, "answered_at": "2026-09-05 08:00:00"},
        {"question_id": "q5", "correct": 1, "answered_at": "2026-09-01 08:00:00"},
    ]

    reviews = service.due_reviews(attempts, now=datetime(2026, 9, 6, tzinfo=timezone.utc))

    assert [review["knowledge_id"] for review in reviews] == ["WRONG"]
    assert reviews[0]["question_id"] == "q2"


def answers_of(*results):
    return [
        {"question_id": question_id, "correct": int(correct), "answered_at": "2026-09-01 08:00:00"}
        for question_id, correct in results
    ]


def test_passed_needs_rate_and_every_concept_right_once():
    knowledge = {"a1": ["A"], "a2": ["A"], "b1": ["B"], "c1": ["C"], "c2": ["C"], "c3": ["C"]}

    assert service.passed(answers_of(("a1", 1), ("a2", 0), ("b1", 1), ("c1", 1), ("c2", 1), ("c3", 1)), knowledge)
    assert not service.passed(answers_of(("a1", 1), ("a2", 1), ("b1", 0), ("c1", 1), ("c2", 1), ("c3", 1)), knowledge)
    assert not service.passed(answers_of(("a1", 1), ("a2", 0), ("b1", 1), ("c1", 0), ("c2", 1), ("c3", 1)), knowledge)
    assert not service.passed([], knowledge)


@pytest.fixture
def quest_book(learner_db, monkeypatch):
    def station(name, grade):
        return {"id": f"s-{name}", "name": name, "grade": grade, "knowledge_ids": [name]}

    path = [
        {"id": "g11", "name": "Lớp 11", "stations": [station("S", 11)]},
        {"id": "g12", "name": "Lớp 12", "stations": [station(name, 12) for name in "ABCDEF"]},
    ]
    monkeypatch.setattr(service, "stages", lambda: path)

    with db.get_connection() as conn:
        conn.executemany(
            "INSERT INTO question_knowledge (question_id, knowledge_id) VALUES (?, ?)",
            [(f"{name}{number}", name) for name in "SABCDE" for number in (1, 2)],
        )


def probe_run(name, correct):
    return {
        "mode": "placement",
        "exam_id": f"s-{name}",
        "answers": answers_of((f"{name}1", correct), (f"{name}2", correct)),
    }


def test_single_placement_opens_station_without_another_probe(quest_book):
    assert service.quest([], grade=12)["placement"]["probe"] == "s-C"

    state = service.quest([probe_run("C", True)])
    statuses = {
        item["id"]: item["status"]
        for stage in state["stages"]
        for item in [stage, *stage["stations"]]
    }

    assert state["placement"] == {"done": True, "grade": 12, "probe": None, "start": "s-D"}
    assert state["current"] == "s-D"
    assert statuses == {
        "g11": "passed", "s-S": "passed",
        "s-A": "passed", "s-B": "passed", "s-C": "passed", "s-D": "current",
        "s-E": "locked", "s-F": "locked", "g12": "locked",
    }


def test_single_failed_placement_opens_first_station(quest_book):
    runs = [probe_run("C", False)]
    state = service.quest(runs)

    assert state["placement"] == {"done": True, "grade": 12, "probe": None, "start": "s-A"}
    assert state["current"] == "s-A"
    assert service.quest_test("s-A", runs)["question_ids"] == ["A1", "A2"]


def test_placement_uses_latest_completed_attempt(quest_book):
    runs = [probe_run("C", True), probe_run("C", False)]
    assert service.quest(runs)["current"] == "s-A"

    runs.append(probe_run("D", True))
    assert service.quest(runs)["current"] == "s-E"


def test_empty_placement_history_does_not_complete_test(quest_book):
    runs = [{"mode": "placement", "exam_id": "s-C", "answers": []}]
    assert service.quest(runs, grade=12)["placement"]["done"] is False


def test_placement_reset_forgets_probes_and_grade(quest_book):
    runs = [probe_run("C", True), probe_run("E", False), probe_run("D", True)]
    runs.append({"mode": "placement", "exam_id": "reset", "answers": []})

    assert service.quest(runs)["placement"] == {"done": False, "grade": None, "probe": None, "start": None}
    assert service.quest(runs, grade=12)["placement"]["probe"] == "s-C"

    runs.append(probe_run("C", False))
    assert service.quest(runs)["placement"]["done"] is True
    assert service.quest(runs)["current"] == "s-A"


def test_failed_station_chains_obstacles_down_prerequisites(quest_book, monkeypatch):
    prerequisite = {"E": "D", "D": "C", "C": "C"}
    monkeypatch.setattr(
        service, "recommend",
        lambda knowledge_id, user_id: {"action": "review", "knowledge_id": prerequisite[knowledge_id]},
    )
    placed = [probe_run("C", True), probe_run("E", False), probe_run("D", True)]

    def run(mode, exam_id, name):
        return {"mode": mode, "exam_id": exam_id, "answers": answers_of((f"{name}1", 0), (f"{name}2", 1))}

    runs = [*placed, run("checkpoint", "s-E", "E")]
    state = service.quest(runs)

    assert state["obstacle"] == {"id": "obstacle:s-E", "depth": 1, "knowledge_ids": ["D"], "total_questions": 2}
    assert state["current"] == "s-E"
    assert service.quest_test("s-E", runs) is None
    assert service.quest_test("obstacle:s-E", runs)["question_ids"] == ["D1", "D2"]

    runs.append(run("obstacle", "obstacle:s-E", "D"))
    assert service.quest(runs)["obstacle"]["knowledge_ids"] == ["C"]

    runs.append(run("obstacle", "obstacle:s-E", "C"))
    assert service.quest(runs)["obstacle"] is None

    cleared = [*placed, run("checkpoint", "s-E", "E"), {
        "mode": "obstacle", "exam_id": "obstacle:s-E", "answers": answers_of(("D1", 1), ("D2", 1)),
    }]
    assert service.quest(cleared)["obstacle"] is None
    assert service.quest_test("s-E", cleared)["question_ids"] == ["E1", "E2"]

    monkeypatch.setattr(service, "OBSTACLE_DEPTH", 1)
    assert service.quest(runs[:-1])["obstacle"] is None

    prerequisite["E"] = "F"
    state = service.quest(runs[:4])
    assert (state["obstacle"], state["missing"], state["current"]) == (None, ["F"], "s-E")


def test_skip_covers_every_concept_and_failure_needs_review(quest_book):
    runs = [probe_run("S", False)]
    test = service.quest_test("skip:g12", runs)

    assert service.quest(runs)["current"] == "s-S"
    assert service.quest_test("skip:g11", [probe_run("S", True)]) is None
    assert sorted(question[0] for question in test["question_ids"]) == list("ABCDES")

    failed = [*runs, {"mode": "skip", "exam_id": "skip:g12", "answers": answers_of(
        ("S1", 0), ("A1", 1), ("B1", 1), ("C1", 1), ("D1", 1), ("E1", 1),
    )}]
    state = service.quest(failed)

    assert (state["obstacle"], state["current"], state["skip_review"]) == (None, "s-S", ["S"])
    assert service.quest_test("skip:g12", failed) is None

    reviewed = [*failed, {"mode": "review", "exam_id": "review", "answers": answers_of(("S2", 1))}]
    assert service.quest(reviewed)["skip_review"] == []
    assert service.quest_test("skip:g12", reviewed) is not None

    won = [*runs, {"mode": "skip", "exam_id": "skip:g12", "answers": answers_of(
        *((f"{name}1", 1) for name in "SABCDE"),
    )}]
    state = service.quest(won)

    assert state["current"] is None
    assert {stage["status"] for stage in state["stages"]} == {"passed"}


def test_quest_test_only_opens_current_and_auto_passes_empty_station(quest_book):
    runs = [probe_run("C", True), probe_run("E", False), probe_run("D", True)]

    assert service.quest_test("s-F", runs) is None
    assert service.quest_test("s-E", runs)["question_ids"] == ["E1", "E2"]

    runs.append({"mode": "checkpoint", "exam_id": "s-E", "answers": answers_of(("E1", 1), ("E2", 1))})
    state = service.quest(runs)

    assert state["current"] == "g12"
    assert sorted(service.quest_test("g12", runs)["question_ids"]) == sorted(
        f"{name}{number}" for name in "ABCDE" for number in (1, 2)
    )
