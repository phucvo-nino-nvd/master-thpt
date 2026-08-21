from __future__ import annotations

from pathlib import Path
from typing import get_args

import csv

from common.utils import load_json
from .config import KNOWLEDGE_GRAPH_PATH, NEO4J_DIR
from .schema import RelationType


RELATIONS = get_args(RelationType)

ARRAY_DELIMITER = "|"
ARRAY_FIELDS = {"grades", "aliases", "source_ids", "source_chunks"}

NODE_FIELDS = [
    "id",
    "name",
    "type",
    "description",
    "introduced_grade",
    "grades",
    "aliases",
    "source_ids",
    "source_chunks",
]

EDGE_FIELDS = [
    "source",
    "target",
    "rationale",
    "source_chunks",
]


def join_array(values: list) -> str:
    result = []

    for value in values:
        text = str(value)

        if ARRAY_DELIMITER in text:
            raise ValueError(f"Value contains array delimiter {ARRAY_DELIMITER!r}: {text!r}")

        result.append(text)

    return ARRAY_DELIMITER.join(result)


def csv_row(item: dict, fields: list[str]) -> dict:
    row = {}

    for field in fields:
        if field in ARRAY_FIELDS:
            row[field] = join_array(item.get(field) or [])
        else:
            value = item.get(field)
            row[field] = "" if value is None else value

    return row


def write_csv(path: Path, fields: list[str], items: list[dict]) -> int:
    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fields)
        writer.writeheader()

        for item in items:
            writer.writerow(csv_row(item, fields))

    return len(items)


def load_graph() -> tuple[list[dict], list[dict]]:
    data = load_json(KNOWLEDGE_GRAPH_PATH)

    for key in ("nodes", "edges"):
        if key not in data:
            raise ValueError(f"knowledge_graph.json is missing '{key}'")

    nodes = data["nodes"]
    edges = data["edges"]

    node_ids = {node["id"] for node in nodes}

    if len(node_ids) != len(nodes):
        raise ValueError("Duplicate node IDs found")

    seen_edges = set()

    for edge in edges:
        key = (edge["source"], edge["target"], edge["relation"])
        source, target, relation = key

        if source not in node_ids:
            raise ValueError(f"Unknown edge source: {source}")

        if target not in node_ids:
            raise ValueError(f"Unknown edge target: {target}")

        if source == target:
            raise ValueError(f"Self edge: {source}")

        if relation not in RELATIONS:
            raise ValueError(f"Unknown relation: {relation}")

        if key in seen_edges:
            raise ValueError(f"Duplicate edge: {key}")

        seen_edges.add(key)

    return nodes, edges


if __name__ == "__main__":
    nodes, edges = load_graph()

    NEO4J_DIR.mkdir(parents=True, exist_ok=True)

    write_csv(NEO4J_DIR / "nodes.csv", NODE_FIELDS, nodes)

    counts = {
        relation: write_csv(
            NEO4J_DIR / f"{relation.lower()}.csv",
            EDGE_FIELDS,
            [edge for edge in edges if edge["relation"] == relation],
        )
        for relation in RELATIONS
    }

    exported = sum(counts.values())

    if exported != len(edges):
        raise RuntimeError(f"Edge export mismatch: {exported} != {len(edges)}")

    print("Neo4j Aura export complete")
    print("=" * 40)
    print(f"Nodes:     {len(nodes)}")

    for relation in RELATIONS:
        print(f"{relation:<10} {counts[relation]}")

    print(f"Edges:     {exported}")
    print()
    print(f"Output: {NEO4J_DIR}")
