from __future__ import annotations

from collections.abc import Sequence
from dotenv import load_dotenv
from typing import Any

import os

from roles.crawler.schema import CrawlerRequest
from common.utils import normalized
from knowledge.bank.main import SECTIONS
from knowledge.graph.convert import load_graph, node_map
from knowledge.graph.query import (
    get_dependents,
    get_prerequisites,
)
from .db import get_connection, init_db
from .mastery import INITIAL_MASTERY, update_mastery


load_dotenv()

WEAK_THRESHOLD = float(os.getenv("WEAK_THRESHOLD", "0.50"))
MASTERED_THRESHOLD = float(os.getenv("MASTERED_THRESHOLD", "0.80"))
MIN_QUESTIONS = int(os.getenv("PRACTICE_MIN_QUESTIONS", "6"))
CRAWL_TOP_K = int(os.getenv("CRAWL_TOP_K", "3"))
CRAWL_NODES = int(os.getenv("CRAWL_NODES", "2"))
CRAWL_GRADE = int(os.getenv("CRAWL_GRADE", "12"))
ERROR_CONFIDENCE_THRESHOLD = float(os.getenv("ERROR_CONFIDENCE_THRESHOLD", "0.65"))
RECENT_ERROR_DAYS = int(os.getenv("RECENT_ERROR_DAYS", "14"))
TYPE_GAP_THRESHOLD = float(os.getenv("TYPE_GAP_THRESHOLD", "0.15"))


def get_mastery(
    knowledge_id: str,
    *,
    user_id: str | None = None,
    question_type: str = "overall",
) -> float | None:
    if not user_id:
        return None

    with get_connection() as conn:
        row = conn.execute(
            """
            SELECT mastery
            FROM knowledge_state
            WHERE user_id = ? AND knowledge_id = ? AND type = ?
            """,
            (user_id, knowledge_id, question_type),
        ).fetchone()

    return None if row is None else row["mastery"]


def status(mastery: float | None) -> str:
    if mastery is None:
        return "untouched"

    if mastery < WEAK_THRESHOLD:
        return "weak"

    if mastery < MASTERED_THRESHOLD:
        return "learning"

    return "mastered"


def get_knowledge_graph(user_id: str | None = None) -> dict:
    init_db()

    mastery_by_id = {}
    if user_id:
        with get_connection() as conn:
            mastery_by_id = {
                row["knowledge_id"]: row["mastery"]
                for row in conn.execute(
                    """
                    SELECT knowledge_id, mastery
                    FROM knowledge_state
                    WHERE user_id = ? AND type = 'overall'
                    """,
                    (user_id,),
                )
            }

    graph_nodes, graph_edges = load_graph()

    nodes = []

    for node in graph_nodes:
        mastery = mastery_by_id.get(node["id"])

        nodes.append(
            {
                "id": node["id"],
                "label": node["name"],
                "grade": node["introduced_grade"],
                "status": status(mastery),
                "score": None if mastery is None else round(mastery * 100),
            }
        )

    return {
        "nodes": nodes,
        "edges": [
            {
                "source": edge["source"],
                "target": edge["target"],
                "relation": edge["relation"],
            }
            for edge in graph_edges
        ],
    }


def process_attempt(
    question_id: str,
    *,
    correct: bool,
    question_type: str = "overall",
    user_id: str,
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
            return []

        updated_states = []

        state_types = ("overall",) if question_type == "overall" else ("overall", question_type)

        for mapping in mappings:
            knowledge_id = mapping["knowledge_id"]

            for state_type in state_types:
                state = conn.execute(
                    """
                    SELECT mastery, attempts, correct, incorrect
                    FROM knowledge_state
                    WHERE user_id = ? AND knowledge_id = ? AND type = ?
                    """,
                    (user_id, knowledge_id, state_type),
                ).fetchone()

                old_mastery = None if state is None else state["mastery"]
                attempts = 0 if state is None else state["attempts"]
                correct_count = 0 if state is None else state["correct"]
                incorrect_count = 0 if state is None else state["incorrect"]
                mastery = update_mastery(old_mastery, correct=correct)

                attempts += 1
                if correct:
                    correct_count += 1
                else:
                    incorrect_count += 1

                conn.execute(
                    """
                    INSERT INTO knowledge_state (
                        user_id, knowledge_id, type, mastery, attempts, correct, incorrect,
                        last_attempt_at, updated_at
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                    ON CONFLICT(user_id, knowledge_id, type) DO UPDATE SET
                        mastery = excluded.mastery,
                        attempts = excluded.attempts,
                        correct = excluded.correct,
                        incorrect = excluded.incorrect,
                        last_attempt_at = CURRENT_TIMESTAMP,
                        updated_at = CURRENT_TIMESTAMP
                    """,
                    (
                        user_id,
                        knowledge_id,
                        state_type,
                        mastery,
                        attempts,
                        correct_count,
                        incorrect_count,
                    ),
                )

                updated_states.append(
                    {
                        "knowledge_id": knowledge_id,
                        "type": state_type,
                        "old_mastery": old_mastery,
                        "mastery": mastery,
                        "attempts": attempts,
                        "correct": correct_count,
                        "incorrect": incorrect_count,
                    }
                )

    return updated_states


def recurring_error(knowledge_id: str, *, user_id: str) -> dict | None:
    with get_connection() as conn:
        row = conn.execute(
            """
            SELECT type, error_type, count, recent_count, last_seen
            FROM error_state
            WHERE user_id = ? AND knowledge_id = ?
            ORDER BY recent_count DESC, count DESC, last_seen DESC
            LIMIT 1
            """,
            (user_id, knowledge_id),
        ).fetchone()

    return None if row is None else dict(row)


def weakest_type_gap(
    knowledge_id: str,
    overall_mastery: float,
    *,
    user_id: str,
) -> dict | None:
    with get_connection() as conn:
        rows = conn.execute(
            """
            SELECT type, mastery
            FROM knowledge_state
            WHERE user_id = ? AND knowledge_id = ? AND type != 'overall'
            ORDER BY mastery ASC
            """,
            (user_id, knowledge_id),
        ).fetchall()

    for row in rows:
        if row["type"] not in SECTIONS:
            continue

        if overall_mastery - row["mastery"] >= TYPE_GAP_THRESHOLD:
            return dict(row)

    return None


def record_error(
    *,
    question_id: str,
    question_type: str,
    error_type: str | None,
    confidence: float | None,
    user_id: str,
) -> list[dict]:
    if not error_type or confidence is None or confidence < ERROR_CONFIDENCE_THRESHOLD:
        return []

    with get_connection() as conn:
        mappings = conn.execute(
            """
            SELECT knowledge_id
            FROM question_knowledge
            WHERE question_id = ?
            """,
            (question_id,),
        ).fetchall()

        updated = []
        for mapping in mappings:
            knowledge_id = mapping["knowledge_id"]
            conn.execute(
                """
                INSERT INTO error_state (
                    user_id, knowledge_id, type, error_type,
                    count, recent_count, last_seen
                )
                VALUES (?, ?, ?, ?, 1, 1, CURRENT_TIMESTAMP)
                ON CONFLICT(user_id, knowledge_id, type, error_type) DO UPDATE SET
                    count = error_state.count + 1,
                    recent_count = CASE
                        WHEN error_state.last_seen >= datetime('now', ?)
                        THEN error_state.recent_count + 1
                        ELSE 1
                    END,
                    last_seen = CURRENT_TIMESTAMP
                """,
                (
                    user_id,
                    knowledge_id,
                    question_type,
                    error_type,
                    f"-{RECENT_ERROR_DAYS} days",
                ),
            )
            row = conn.execute(
                """
                SELECT knowledge_id, type, error_type, count, recent_count, last_seen
                FROM error_state
                WHERE user_id = ? AND knowledge_id = ? AND type = ? AND error_type = ?
                """,
                (user_id, knowledge_id, question_type, error_type),
            ).fetchone()
            updated.append(dict(row))

    return updated


def recommend(knowledge_id: str, *, user_id: str) -> dict:
    mastery = get_mastery(knowledge_id, user_id=user_id)

    if mastery is None:
        return {
            "action": "diagnose",
            "knowledge_id": knowledge_id,
        }

    if mastery < WEAK_THRESHOLD:
        for prerequisite in get_prerequisites(knowledge_id):
            prerequisite_id = prerequisite["id"]
            prerequisite_mastery = get_mastery(prerequisite_id, user_id=user_id)

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

    error = recurring_error(knowledge_id, user_id=user_id)
    if error is not None:
        return {
            "action": "remediate",
            "knowledge_id": knowledge_id,
            "type": error["type"],
            "error_type": error["error_type"],
        }

    type_gap = weakest_type_gap(
        knowledge_id,
        mastery,
        user_id=user_id,
    )
    if type_gap is not None:
        return {
            "action": "transfer",
            "knowledge_id": knowledge_id,
            "type": type_gap["type"],
        }

    if mastery < WEAK_THRESHOLD:
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


def prerequisite_map(edges: Sequence[dict]) -> dict[str, list[str]]:
    prerequisites: dict[str, list[str]] = {}

    for edge in edges:
        if edge["relation"] != "REQUIRES":
            continue

        prerequisites.setdefault(edge["source"], []).append(edge["target"])

    return prerequisites


def learning_path(user_id: str | None = None) -> list[dict]:
    init_db()

    mastery_by_id = {}
    if user_id:
        with get_connection() as conn:
            mastery_by_id = {
                row["knowledge_id"]: row["mastery"]
                for row in conn.execute(
                    """
                    SELECT knowledge_id, mastery
                    FROM knowledge_state
                    WHERE user_id = ? AND type = 'overall'
                    """,
                    (user_id,),
                )
            }

    graph_nodes, graph_edges = load_graph()

    node_by_id = {node["id"]: node for node in graph_nodes}
    prerequisites = prerequisite_map(graph_edges)

    def state_of(knowledge_id: str) -> str:
        return status(mastery_by_id.get(knowledge_id))

    selected: set[str] = set()
    pending = [
        node["id"]
        for node in graph_nodes
        if state_of(node["id"]) == "weak"
    ]

    while pending:
        knowledge_id = pending.pop()

        if knowledge_id in selected or knowledge_id not in node_by_id:
            continue

        selected.add(knowledge_id)

        pending.extend(
            prerequisite_id
            for prerequisite_id in prerequisites.get(knowledge_id, ())
            if state_of(prerequisite_id) in ("untouched", "weak")
        )

    selected |= {
        node["id"]
        for node in graph_nodes
        if state_of(node["id"]) == "untouched"
    }

    depth_by_id: dict[str, int] = {}

    def depth_of(knowledge_id: str, visiting: frozenset[str]) -> int:
        if knowledge_id in depth_by_id:
            return depth_by_id[knowledge_id]

        if knowledge_id in visiting:
            return 0

        parents = [
            prerequisite_id
            for prerequisite_id in prerequisites.get(knowledge_id, ())
            if prerequisite_id in selected
        ]

        depth = 0 if not parents else 1 + max(
            depth_of(parent, visiting | {knowledge_id})
            for parent in parents
        )

        depth_by_id[knowledge_id] = depth

        return depth

    ordered = sorted(
        selected,
        key=lambda knowledge_id: (
            mastery_by_id.get(knowledge_id, INITIAL_MASTERY),
            depth_of(knowledge_id, frozenset()),
            node_by_id[knowledge_id]["introduced_grade"] or 0,
            node_by_id[knowledge_id]["name"],
        ),
    )

    return [
        {
            "action": (
                "diagnose"
                if state_of(knowledge_id) == "untouched"
                else "practice"
            ),
            "knowledge_id": knowledge_id,
        }
        for knowledge_id in ordered
    ]


def questions_of(knowledge_ids: Sequence[str]) -> dict[str, list[str]]:
    if not knowledge_ids:
        return {}

    init_db()

    placeholders = ", ".join("?" * len(knowledge_ids))

    with get_connection() as conn:
        rows = conn.execute(
            f"""
            SELECT knowledge_id, question_id
            FROM question_knowledge
            WHERE knowledge_id IN ({placeholders})
            ORDER BY question_id
            """,
            tuple(knowledge_ids),
        ).fetchall()

    questions: dict[str, list[str]] = {}

    for row in rows:
        questions.setdefault(row["knowledge_id"], []).append(row["question_id"])

    return questions


def pending_of(knowledge_ids: Sequence[str], solved: set[str]) -> dict[str, list[str]]:
    return {
        knowledge_id: [
            question_id
            for question_id in question_ids
            if question_id not in solved
        ]
        for knowledge_id, question_ids in questions_of(knowledge_ids).items()
    }


def lacking_knowledge(
    solved: set[str],
    *,
    user_id: str | None = None,
) -> list[str]:
    path = learning_path(user_id) if user_id else learning_path()
    pending = pending_of([step["knowledge_id"] for step in path], solved)

    lacking = [
        step
        for step in path
        if len(pending.get(step["knowledge_id"], [])) < MIN_QUESTIONS
    ]

    weak = sorted(
        (
            step["knowledge_id"]
            for step in lacking
            if step["action"] == "practice"
        ),
        key=lambda knowledge_id: get_mastery(knowledge_id, user_id=user_id) or 0.0,
    )

    return weak + [
        step["knowledge_id"]
        for step in lacking
        if step["action"] == "diagnose"
    ]


def matching_nodes(
    concept: str,
    *,
    user_id: str | None = None,
) -> list[str]:
    wanted = normalized(concept)
    nodes = node_map()
    path = learning_path(user_id) if user_id else learning_path()

    return [
        step["knowledge_id"]
        for step in path
        if wanted in normalized(nodes[step["knowledge_id"]]["name"])
    ]


def stocked_count(
    concept: str,
    solved: set[str],
    *,
    user_id: str | None = None,
) -> int:
    pending = pending_of(matching_nodes(concept, user_id=user_id), solved)

    return sum(len(question_ids) for question_ids in pending.values())


def crawl_requests(
    solved: set[str],
    exclude_urls: list[str],
    concept: str = "",
    *,
    user_id: str | None = None,
) -> list[CrawlerRequest]:
    if concept:
        if stocked_count(concept, solved, user_id=user_id) >= MIN_QUESTIONS:
            return []

        return [
            CrawlerRequest(
                grade=CRAWL_GRADE,
                concept=concept,
                top_k=CRAWL_TOP_K,
                exclude_urls=exclude_urls,
            )
        ]

    nodes = node_map()

    return [
        CrawlerRequest(
            grade=nodes[knowledge_id]["introduced_grade"] or CRAWL_GRADE,
            concept=nodes[knowledge_id]["name"],
            top_k=CRAWL_TOP_K,
            exclude_urls=exclude_urls,
        )
        for knowledge_id in lacking_knowledge(solved, user_id=user_id)[:CRAWL_NODES]
    ]


def run_learner(
    *,
    knowledge_id: str | None = None,
    attempts: Sequence[dict[str, Any]] = (),
    user_id: str | None = None,
) -> dict:
    if not user_id:
        return {
            "knowledge_states": [],
            "error_states": [],
            "recommendation": None,
        }

    init_db()

    error_states = []
    for attempt in attempts:
        diagnosis = attempt.get("diagnosis") or {}

        if attempt["correct"] or not isinstance(diagnosis, dict):
            continue

        error_states.extend(
            record_error(
                question_id=attempt["question_id"],
                question_type=attempt.get("type", "unknown"),
                error_type=diagnosis.get("error_type"),
                confidence=diagnosis.get("confidence"),
                user_id=user_id,
            )
        )

    updated_states = []

    for attempt in attempts:
        updated_states.extend(
            process_attempt(
                attempt["question_id"],
                correct=attempt["correct"],
                question_type=attempt.get("type", "overall"),
                user_id=user_id,
            )
        )

    target_id = knowledge_id

    if target_id is None and updated_states:
        target_id = updated_states[0]["knowledge_id"]

    return {
        "knowledge_states": updated_states,
        "error_states": error_states,
        "recommendation": (
            recommend(target_id, user_id=user_id)
            if target_id is not None
            else None
        ),
    }
