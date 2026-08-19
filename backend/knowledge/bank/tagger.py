from __future__ import annotations

from collections.abc import Sequence
from functools import lru_cache
from langsmith import traceable
from pydantic import BaseModel
from tqdm import tqdm

import os

from agents.learner.db import get_connection, init_db
from knowledge.graph.canonicalize import normalize_name
from knowledge.graph.config import CANONICAL_MODEL, KNOWLEDGE_GRAPH_PATH
from knowledge.graph.utils import chat_model, load_json, require_online

from .pipeline import Item


MIN_ALIAS_LENGTH = int(os.getenv("TAGGER_MIN_ALIAS_LENGTH", "6"))
BATCH_SIZE = int(os.getenv("TAGGER_BATCH_SIZE", "8"))

TAGGING_CONTEXT = """\
You map Vietnamese high school math exam questions to knowledge nodes.

For each question, choose the ONE knowledge node that the question most
directly assesses.

Do NOT return every prerequisite or every related concept.
Choose only the single most central concept required to answer the question.

Return one knowledge_id per question, in the same order as the questions,
and exactly as many IDs as there are questions.
Only return IDs from the provided list, copied exactly.
Never invent an ID.
"""


class TaggingDecision(BaseModel):
    knowledge_ids: list[str]


@lru_cache(maxsize=1)
def tagger():
    return chat_model(CANONICAL_MODEL).with_structured_output(
        TaggingDecision,
        method="json_schema",
        strict=True,
    )


@lru_cache(maxsize=1)
def node_names() -> dict[str, str]:
    graph = load_json(KNOWLEDGE_GRAPH_PATH)

    return {
        node["id"]: node["name"]
        for node in graph["nodes"]
    }


@lru_cache(maxsize=1)
def alias_index() -> list[tuple[str, tuple[str, ...]]]:
    graph = load_json(KNOWLEDGE_GRAPH_PATH)

    aliases: dict[str, set[str]] = {}

    for node in graph["nodes"]:
        knowledge_id = node["id"]

        for alias in {node["name"], *node.get("aliases", [])}:
            normalized = normalize_name(alias)

            if len(normalized) < MIN_ALIAS_LENGTH:
                continue

            aliases.setdefault(normalized, set()).add(knowledge_id)

    return sorted(
        (
            (alias, tuple(sorted(knowledge_ids)))
            for alias, knowledge_ids in aliases.items()
        ),
        key=lambda entry: -len(entry[0]),
    )


@lru_cache(maxsize=8)
def catalog_ids(grade: int | None = None) -> tuple[str, ...]:
    graph = load_json(KNOWLEDGE_GRAPH_PATH)

    return tuple(
        sorted(
            node["id"]
            for node in graph["nodes"]
            if grade is None or node.get("introduced_grade", 0) <= grade
        )
    )


def item_text(item: Item) -> str:
    """Join all useful textual evidence from one item."""
    texts: list[str] = [item.content]

    texts.extend(
        option.content
        for option in item.options
        if option.content
    )

    texts.extend(
        part.content
        for part in item.parts
        if part.content
    )

    if item.solution:
        texts.append(item.solution)

    return "\n".join(texts)


def match_aliases(item: Item) -> list[str]:
    text = normalize_name(item_text(item))

    knowledge_ids: list[str] = []
    seen_ids: set[str] = set()

    matched_aliases: list[str] = []

    for alias, alias_knowledge_ids in alias_index():
        if alias not in text:
            continue

        # Example:
        # "cấp số cộng" matched first.
        # Do not later count a shorter alias such as "cấp số"
        # if it is entirely contained in that matched phrase.
        if any(alias in matched for matched in matched_aliases):
            continue

        matched_aliases.append(alias)

        for knowledge_id in alias_knowledge_ids:
            if knowledge_id in seen_ids:
                continue

            seen_ids.add(knowledge_id)
            knowledge_ids.append(knowledge_id)

    return knowledge_ids


def format_catalog(knowledge_ids: Sequence[str]) -> str:
    names = node_names()

    return "\n".join(
        f"{knowledge_id}: {names[knowledge_id]}"
        for knowledge_id in knowledge_ids
    )


def batch_grade(items: Sequence[Item]) -> int | None:
    grades = [item.grade for item in items]

    if None in grades:
        return None

    return max(grade for grade in grades if grade is not None)


def build_prompt(items: Sequence[Item]) -> str:
    sections = [
        TAGGING_CONTEXT,
        "Knowledge nodes. Choose exactly ONE per question, any node below is"
        f" allowed.\n{format_catalog(catalog_ids(batch_grade(items)))}",
    ]

    for position, item in enumerate(items, start=1):
        block = f"Question {position}:\n{item_text(item)}"

        candidates = match_aliases(item)

        if candidates:
            block += (
                "\n\nCandidate hints from alias matching for question"
                f" {position}. These are lexical matches only, they may be"
                f" wrong or incomplete.\n{format_catalog(candidates)}"
            )

        sections.append(block)

    sections.append(
        f"Return exactly {len(items)} knowledge_ids, "
        f"one per question, in question order."
    )

    return "\n\n".join(sections)


@traceable(name="Tag item batch with LLM")
def tag_with_llm(items: Sequence[Item]) -> list[str]:
    require_online(f"LLM tag for {len(items)} items")

    prompt = build_prompt(items)
    names = node_names()

    knowledge_ids: list[str] = []

    for _ in range(2):
        decision = tagger().invoke(prompt)

        knowledge_ids = [
            knowledge_id.strip()
            for knowledge_id in decision.knowledge_ids
        ]

        if len(knowledge_ids) == len(items) and all(
            knowledge_id in names
            for knowledge_id in knowledge_ids
        ):
            return knowledge_ids

    raise ValueError(
        f"LLM returned invalid knowledge_ids {knowledge_ids!r} "
        f"for a batch of {len(items)} items"
    )


def save_tags(tags: dict[str, str]) -> int:
    if not tags:
        return 0

    valid_ids = set(node_names())

    for question_id, knowledge_id in tags.items():
        if knowledge_id not in valid_ids:
            raise ValueError(
                f"Unknown knowledge_id {knowledge_id!r} "
                f"for item {question_id}"
            )

    init_db()

    rows = list(tags.items())

    with get_connection() as conn:
        conn.executemany(
            """
            DELETE FROM question_knowledge
            WHERE question_id = ?
            """,
            [
                (question_id,)
                for question_id in tags
            ],
        )

        conn.executemany(
            """
            INSERT INTO question_knowledge (
                question_id,
                knowledge_id
            )
            VALUES (?, ?)
            """,
            rows,
        )

    return len(rows)


@traceable(name="Item Tagger", run_type="chain")
def tag_items(items: list[Item]) -> dict[str, str]:
    tags: dict[str, str] = {}
    failures: list[str] = []

    # An item can fail tagging, so duplicates are tracked separately.
    seen_ids: set[str] = set()

    for item in items:
        if item.id in seen_ids:
            raise ValueError(
                f"Duplicate item id: {item.id}"
            )

        seen_ids.add(item.id)

    batches = [
        items[start:start + BATCH_SIZE]
        for start in range(0, len(items), BATCH_SIZE)
    ]

    for batch in tqdm(batches, unit="batch"):
        try:
            knowledge_ids = tag_with_llm(batch)
        except ValueError as error:
            failures.extend(f"{item.id}: {error}" for item in batch)
            continue

        for item, knowledge_id in zip(batch, knowledge_ids):
            tags[item.id] = knowledge_id

    save_tags(tags)

    if failures:
        raise ValueError(
            f"Tagged {len(tags)}/{len(items)} items, "
            f"{len(failures)} failed:\n" + "\n".join(failures)
        )

    return tags