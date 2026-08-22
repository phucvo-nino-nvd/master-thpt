from __future__ import annotations

from collections.abc import Sequence
from dotenv import load_dotenv
from typing import Any

import os

from agents.crawler.schema import CrawlerRequest
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


def status(mastery: float | None) -> str:
    if mastery is None:
        return "untouched"

    if mastery < WEAK_THRESHOLD:
        return "weak"

    if mastery < MASTERED_THRESHOLD:
        return "learning"

    return "mastered"


def get_knowledge_graph() -> dict:
    """
    Knowledge graph overlaid with the learner's mastery, for the knowledge graph UI.
    """
    init_db()

    with get_connection() as conn:
        mastery_by_id = {
            row["knowledge_id"]: row["mastery"]
            for row in conn.execute(
                """
                SELECT knowledge_id, mastery
                FROM knowledge_state
                """
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


def prerequisite_map(edges: Sequence[dict]) -> dict[str, list[str]]:
    prerequisites: dict[str, list[str]] = {}

    for edge in edges:
        if edge["relation"] != "REQUIRES":
            continue

        prerequisites.setdefault(edge["source"], []).append(edge["target"])

    return prerequisites


def learning_path() -> list[dict]:
    init_db()

    with get_connection() as conn:
        mastery_by_id = {
            row["knowledge_id"]: row["mastery"]
            for row in conn.execute(
                """
                SELECT knowledge_id, mastery
                FROM knowledge_state
                """
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


def lacking_knowledge(solved: set[str]) -> list[str]:
    path = learning_path()
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
        key=lambda knowledge_id: get_mastery(knowledge_id) or 0.0,
    )

    return weak + [
        step["knowledge_id"]
        for step in lacking
        if step["action"] == "diagnose"
    ]


def crawl_requests(
    solved: set[str],
    exclude_urls: list[str],
    concept: str = "",
) -> list[CrawlerRequest]:
    if concept:
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
        for knowledge_id in lacking_knowledge(solved)[:CRAWL_NODES]
    ]


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