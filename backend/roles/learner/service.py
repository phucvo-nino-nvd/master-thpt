from __future__ import annotations

from collections.abc import Mapping, Sequence
from datetime import datetime, timezone
from dotenv import load_dotenv
from fsrs import Card, Rating, Scheduler
from itertools import groupby
from typing import Any

import os
import random
import re

from roles.crawler.schema import CrawlerRequest
from common.utils import normalized
from knowledge.bank.main import SECTIONS
from knowledge.graph.chunk import load_chunks
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
CRAWL_GRADES = [int(grade) for grade in os.getenv("CRAWL_GRADES", "10,11,12").split(",")]
ERROR_CONFIDENCE_THRESHOLD = float(os.getenv("ERROR_CONFIDENCE_THRESHOLD", "0.65"))
RECENT_ERROR_DAYS = int(os.getenv("RECENT_ERROR_DAYS", "14"))
TYPE_GAP_THRESHOLD = float(os.getenv("TYPE_GAP_THRESHOLD", "0.15"))
CHAPTER_RE = re.compile(r"^CHƯƠNG\s+([IVXL]+)")
ROMAN = {"I": 1, "V": 5, "X": 10, "L": 50}
REVIEW_DAILY_LIMIT = int(os.getenv("REVIEW_DAILY_LIMIT", "20"))
STATION_QUESTIONS = int(os.getenv("STATION_QUESTIONS", "6"))
STAGE_QUESTIONS = int(os.getenv("STAGE_QUESTIONS", "10"))
PLACEMENT_QUESTIONS = int(os.getenv("PLACEMENT_QUESTIONS", "2"))
STATION_PASS_RATE = float(os.getenv("STATION_PASS_RATE", "0.8"))
OBSTACLE_DEPTH = int(os.getenv("OBSTACLE_DEPTH", "3"))
OBSTACLE_QUESTIONS = int(os.getenv("OBSTACLE_QUESTIONS", "6"))
SKIP_QUESTIONS = int(os.getenv("SKIP_QUESTIONS", "15"))
SCHEDULER = Scheduler(
    desired_retention=float(os.getenv("REVIEW_RETENTION", "0.9")),
    learning_steps=(),
    relearning_steps=(),
    enable_fuzzing=False,
)


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


def chapter_number(chapter: str | None) -> int:
    match = CHAPTER_RE.match(chapter or "")

    if not match:
        return 0

    digits = [ROMAN[char] for char in match.group(1)]

    return sum(
        -digit if digit < next_digit else digit
        for digit, next_digit in zip(digits, digits[1:] + [0])
    )


def book_of(chunk_id: str) -> str:
    return chunk_id.split(":")[0]


def stages() -> list[dict]:
    chunks = sorted(
        load_chunks(),
        key=lambda chunk: (book_of(chunk.id), chapter_number(chunk.chapter), chunk.id),
    )
    order = {chunk.id: index for index, chunk in enumerate(chunks)}
    knowledge_ids: dict[str, list[str]] = {chunk.id: [] for chunk in chunks}
    nodes, _ = load_graph()

    for node in nodes:
        known = [chunk_id for chunk_id in node.get("source_chunks", []) if chunk_id in order]

        if known:
            knowledge_ids[min(known, key=order.__getitem__)].append(node["id"])

    return [
        {
            "id": f"{book}:{chapter_number(chapter)}",
            "name": chapter,
            "stations": [
                {
                    "id": chunk.id,
                    "name": chunk.title,
                    "grade": chunk.grade,
                    "knowledge_ids": knowledge_ids[chunk.id],
                }
                for chunk in group
            ],
        }
        for (book, chapter), group in groupby(
            chunks, key=lambda chunk: (book_of(chunk.id), chunk.chapter)
        )
    ]


def passed(answers: Sequence[Mapping], knowledge_by_question: Mapping[str, list[str]]) -> bool:
    if not answers:
        return False

    if sum(bool(answer["correct"]) for answer in answers) < STATION_PASS_RATE * len(answers):
        return False

    known: dict[str, bool] = {}

    for answer in answers:
        for knowledge_id in knowledge_by_question.get(answer["question_id"], []):
            known[knowledge_id] = known.get(knowledge_id, False) or bool(answer["correct"])

    return all(known.values())


def pick_questions(
    groups: Sequence[Sequence[str]],
    limit: int,
    last_seen: Mapping[str, str],
) -> list[str]:
    queues = [sorted(group, key=lambda question_id: last_seen.get(question_id, "")) for group in groups]
    picked: list[str] = []

    while len(picked) < limit and any(queues):
        for queue in queues:
            while queue and queue[0] in picked:
                queue.pop(0)

            if queue and len(picked) < limit:
                picked.append(queue.pop(0))

    return picked


def quest_groups() -> tuple[list[dict], dict[str, list[list[str]]]]:
    path = stages()
    questions = questions_of(sorted({
        knowledge_id
        for stage in path
        for station in stage["stations"]
        for knowledge_id in station["knowledge_ids"]
    }))
    groups: dict[str, list[list[str]]] = {}

    for stage in path:
        for station in stage["stations"]:
            groups[station["id"]] = [
                questions[knowledge_id]
                for knowledge_id in station["knowledge_ids"]
                if knowledge_id in questions
            ]

        groups[stage["id"]] = [
            sorted({question_id for group in groups[station["id"]] for question_id in group})
            for station in stage["stations"]
            if groups[station["id"]]
        ]

    return path, groups


def question_count(groups: Sequence[Sequence[str]]) -> int:
    return len({question_id for group in groups for question_id in group})


def obstacle_of(
    item_id: str,
    runs: Sequence[Mapping],
    knowledge_by_question: Mapping[str, list[str]],
    user_id: str | None,
) -> tuple[dict | None, list[str]]:
    obstacle_id = f"obstacle:{item_id}"
    trail = [
        run
        for run in runs
        if (run["mode"], run["exam_id"]) in (("checkpoint", item_id), ("obstacle", obstacle_id))
    ]
    attempts = [position for position, run in enumerate(trail) if run["mode"] == "checkpoint"]

    if not attempts:
        return None, []

    chain = trail[attempts[-1]:]

    if len(chain) > OBSTACLE_DEPTH or any(passed(run["answers"], knowledge_by_question) for run in chain):
        return None, []

    wrong = {
        knowledge_id
        for answer in chain[-1]["answers"]
        if not answer["correct"]
        for knowledge_id in knowledge_by_question.get(answer["question_id"], [])
    }
    targets = set()

    for knowledge_id in sorted(wrong):
        advice = recommend(knowledge_id, user_id=user_id or "")
        targets.add(knowledge_id if advice["action"] == "advance" else advice["knowledge_id"])

    if len(chain) > 1 and targets <= wrong:
        return None, []

    questions = questions_of(sorted(targets))
    knowledge_ids = [knowledge_id for knowledge_id in sorted(targets) if knowledge_id in questions]
    missing = [knowledge_id for knowledge_id in sorted(targets) if knowledge_id not in questions]

    if not knowledge_ids:
        return None, missing

    return {
        "id": obstacle_id,
        "depth": len(chain),
        "knowledge_ids": knowledge_ids,
        "total_questions": question_count([questions[knowledge_id] for knowledge_id in knowledge_ids]),
    }, missing


def skip_review(runs: Sequence[Mapping], knowledge_by_question: Mapping[str, list[str]]) -> list[str]:
    skips = [position for position, run in enumerate(runs) if run["mode"] == "skip"]

    if not skips or passed(runs[skips[-1]]["answers"], knowledge_by_question):
        return []

    def concepts(answers, correct):
        return {
            knowledge_id
            for answer in answers
            if bool(answer["correct"]) == correct
            for knowledge_id in knowledge_by_question.get(answer["question_id"], [])
        }

    fixed = {
        knowledge_id
        for run in runs[skips[-1] + 1:]
        for knowledge_id in concepts(run["answers"], True)
    }

    return sorted(concepts(runs[skips[-1]]["answers"], False) - fixed)


def placement_runs(runs: Sequence[Mapping]) -> list[Mapping]:
    placements = [run for run in runs if run["mode"] == "placement"]
    resets = [position for position, run in enumerate(placements) if run["exam_id"] == "reset"]

    return placements[resets[-1] + 1:] if resets else placements


def placement_of(
    stations: Sequence[Mapping],
    groups: Mapping[str, list[list[str]]],
    runs: Sequence[Mapping],
    knowledge_by_question: Mapping[str, list[str]],
    grade: int | None,
) -> dict:
    index = {station["id"]: position for position, station in enumerate(stations)}
    probes = [run for run in placement_runs(runs) if run["exam_id"] in index]

    if probes:
        grade = stations[index[probes[0]["exam_id"]]]["grade"]

    in_grade = [position for position, station in enumerate(stations) if station["grade"] == grade]

    if not in_grade:
        return {"done": False, "grade": None, "probe": None, "start": -1}

    probeable = [
        position
        for position in in_grade
        if question_count(groups[stations[position]["id"]]) >= PLACEMENT_QUESTIONS
    ]
    lo, hi = 0, len(probeable)

    for run in probes:
        if index[run["exam_id"]] not in probeable:
            continue

        probe = probeable.index(index[run["exam_id"]])

        if passed(run["answers"], knowledge_by_question):
            lo = max(lo, probe + 1)
        else:
            hi = min(hi, probe)

    if lo < hi:
        return {
            "done": False,
            "grade": grade,
            "probe": stations[probeable[(lo + hi) // 2]]["id"],
            "start": -1,
        }

    return {
        "done": True,
        "grade": grade,
        "probe": None,
        "start": probeable[lo - 1] + 1 if lo else in_grade[0],
    }


def quest(runs: Sequence[Mapping], grade: int | None = None, user_id: str | None = None) -> dict:
    path, groups = quest_groups()
    stations = [station for stage in path for station in stage["stations"]]
    knowledge_by_question = knowledge_of(sorted({
        answer["question_id"] for run in runs for answer in run["answers"]
    }))
    placement = placement_of(stations, groups, runs, knowledge_by_question, grade)
    won = {
        run["exam_id"]
        for run in runs
        if run["mode"] == "checkpoint" and passed(run["answers"], knowledge_by_question)
    }
    order = {station["id"]: position for position, station in enumerate(stations)}
    start = max([placement["start"], *(
        order[stage["stations"][-1]["id"]] + 1
        for stage in path
        for run in runs
        if (run["mode"], run["exam_id"]) == ("skip", f"skip:{stage['id']}")
        and passed(run["answers"], knowledge_by_question)
    )])
    current = None
    obstacle = None
    missing: list[str] = []

    def status_of(item_id: str, skipped: bool) -> str:
        nonlocal current, obstacle, missing

        if not placement["done"] or current:
            return "locked"

        if skipped or item_id in won or not groups[item_id]:
            return "passed"

        current = item_id
        obstacle, missing = obstacle_of(item_id, runs, knowledge_by_question, user_id)

        return "blocked" if obstacle else "current"

    result = []

    for stage in path:
        stage_stations = []

        for station in stage["stations"]:
            stage_stations.append({
                "id": station["id"],
                "name": station["name"],
                "total_questions": question_count(groups[station["id"]]),
                "status": status_of(station["id"], order[station["id"]] < start),
            })

        result.append({
            "id": stage["id"],
            "name": stage["name"],
            "stations": stage_stations,
            "total_questions": question_count(groups[stage["id"]]),
            "status": status_of(
                stage["id"],
                all(order[station["id"]] < start for station in stage["stations"]),
            ),
        })

    return {
        "placement": {
            **placement,
            "start": stations[placement["start"]]["id"] if 0 <= placement["start"] < len(stations) else None,
        },
        "current": current,
        "obstacle": obstacle,
        "missing": missing,
        "skip_review": skip_review(runs, knowledge_by_question),
        "stages": result,
    }


def quest_test(item_id: str, runs: Sequence[Mapping], user_id: str | None = None) -> dict | None:
    state = quest(runs, user_id=user_id)
    placement = state["placement"]
    obstacle = state["obstacle"]

    if obstacle:
        allowed = {obstacle["id"]}
    elif placement["done"]:
        allowed = {
            item["id"]
            for stage in state["stages"]
            for item in [stage, *stage["stations"]]
            if item["status"] != "locked"
        }

        if not state["skip_review"]:
            allowed |= {f"skip:{stage['id']}" for stage in state["stages"] if stage["status"] == "locked"}
    else:
        allowed = {placement["probe"]}

    if item_id not in allowed:
        return None

    path, groups = quest_groups()
    last_seen = {
        answer["question_id"]: answer["answered_at"]
        for run in runs
        for answer in run["answers"]
    }

    status = {
        item["id"]: item["status"]
        for stage in state["stages"]
        for item in [stage, *stage["stations"]]
    }
    skipped: list[list[str]] = []

    for stage in path:
        skipped += [
            group
            for station in stage["stations"]
            if status[station["id"]] != "passed"
            for group in groups[station["id"]]
        ]

        if f"skip:{stage['id']}" == item_id:
            picked = random.sample(skipped, min(len(skipped), SKIP_QUESTIONS))

            return {
                "id": item_id,
                "name": f"Vượt cấp: {stage['name']}",
                "grade": stage["stations"][0]["grade"],
                "question_ids": pick_questions(picked, len(picked), last_seen),
            }

        for item in [stage, *stage["stations"]]:
            if obstacle and f"obstacle:{item['id']}" == item_id:
                questions = questions_of(obstacle["knowledge_ids"])

                return {
                    "id": item_id,
                    "name": f"Chướng ngại: {item['name']}",
                    "grade": stage["stations"][0]["grade"],
                    "question_ids": pick_questions(
                        [questions[knowledge_id] for knowledge_id in obstacle["knowledge_ids"]],
                        OBSTACLE_QUESTIONS,
                        last_seen,
                    ),
                }

            if item["id"] != item_id:
                continue

            if not placement["done"]:
                limit = PLACEMENT_QUESTIONS
            elif item is stage:
                limit = STAGE_QUESTIONS
            else:
                limit = STATION_QUESTIONS

            return {
                "id": item_id,
                "name": item["name"],
                "grade": stage["stations"][0]["grade"],
                "question_ids": pick_questions(groups[item_id], limit, last_seen),
            }

    return None


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


def knowledge_of(question_ids: Sequence[str]) -> dict[str, list[str]]:
    if not question_ids:
        return {}

    init_db()

    placeholders = ", ".join("?" * len(question_ids))

    with get_connection() as conn:
        rows = conn.execute(
            f"""
            SELECT question_id, knowledge_id
            FROM question_knowledge
            WHERE question_id IN ({placeholders})
            """,
            tuple(question_ids),
        ).fetchall()

    knowledge_by_question: dict[str, list[str]] = {}

    for row in rows:
        knowledge_by_question.setdefault(row["question_id"], []).append(row["knowledge_id"])

    return knowledge_by_question


def due_reviews(
    attempts: Sequence[Mapping],
    now: datetime | None = None,
    forced: Sequence[str] = (),
) -> list[dict]:
    now = now or datetime.now(timezone.utc)
    knowledge_by_question = knowledge_of(sorted({attempt["question_id"] for attempt in attempts}))
    cards: dict[str, Card] = {}
    last_seen: dict[str, datetime] = {}

    for attempt in sorted(attempts, key=lambda attempt: attempt["answered_at"]):
        answered_at = datetime.fromisoformat(attempt["answered_at"]).replace(tzinfo=timezone.utc)
        last_seen[attempt["question_id"]] = answered_at

        for knowledge_id in knowledge_by_question.get(attempt["question_id"], []):
            if knowledge_id not in cards and attempt["correct"]:
                continue

            cards[knowledge_id], _ = SCHEDULER.review_card(
                cards.get(knowledge_id) or Card(card_id=0, due=answered_at),
                Rating.Good if attempt["correct"] else Rating.Again,
                review_datetime=answered_at,
            )

    due = sorted(
        (
            (card.due, knowledge_id)
            for knowledge_id, card in cards.items()
            if card.due <= now or knowledge_id in forced
        ),
        key=lambda pair: (pair[1] not in forced, pair),
    )[:REVIEW_DAILY_LIMIT]
    questions = questions_of([knowledge_id for _, knowledge_id in due])
    never = datetime.min.replace(tzinfo=timezone.utc)
    picked: set[str] = set()
    reviews = []

    for due_at, knowledge_id in due:
        candidates = [
            question_id
            for question_id in questions.get(knowledge_id, [])
            if question_id not in picked
        ]
        question_id = min(candidates, key=lambda question_id: last_seen.get(question_id, never), default=None)

        if question_id:
            picked.add(question_id)

        reviews.append({"knowledge_id": knowledge_id, "question_id": question_id, "due": due_at})

    return reviews


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
    nodes = node_map()

    if concept:
        if stocked_count(concept, solved, user_id=user_id) >= MIN_QUESTIONS:
            return []

        wanted = normalized(concept)
        grades = {node["introduced_grade"] for node in nodes.values() if wanted in normalized(node["name"])}
        focused = sorted(grades & set(CRAWL_GRADES)) or ([] if grades else CRAWL_GRADES[-1:])

        return [
            CrawlerRequest(
                grade=grade,
                concept=concept,
                top_k=CRAWL_TOP_K,
                exclude_urls=exclude_urls,
            )
            for grade in focused[:1]
        ]

    return [
        CrawlerRequest(
            grade=nodes[knowledge_id]["introduced_grade"],
            concept=nodes[knowledge_id]["name"],
            top_k=CRAWL_TOP_K,
            exclude_urls=exclude_urls,
        )
        for knowledge_id in lacking_knowledge(solved, user_id=user_id)
        if nodes[knowledge_id]["introduced_grade"] in CRAWL_GRADES
    ][:CRAWL_NODES]


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
