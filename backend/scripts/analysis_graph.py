from __future__ import annotations

from collections import Counter, defaultdict
from pathlib import Path

import json
import re
import unicodedata

from knowledge.graph.schema import ExtractionResult, KnowledgeNode


KG_DIR = Path(__file__).resolve().parents[2] / "artifacts" / "knowledge_graph"
EXTRACTED_DIR = KG_DIR / "extracted"
REPORT_PATH = KG_DIR / "analysis.json"


def normalize_text(text: str) -> str:
    """Normalize Vietnamese text for duplicate detection."""
    text = unicodedata.normalize("NFD", text)

    text = "".join(
        char
        for char in text
        if unicodedata.category(char) != "Mn"
    )

    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", " ", text)
    text = re.sub(r"\s+", " ", text)

    return text.strip()


def load_results() -> list[ExtractionResult]:
    """Load all cached extraction results."""
    results: list[ExtractionResult] = []

    for path in sorted(EXTRACTED_DIR.glob("*.json")):
        data = json.loads(path.read_text(encoding="utf-8"))

        results.append(ExtractionResult.model_validate(data))

    return results


def node_signature(node: KnowledgeNode) -> tuple[str, str, int]:
    """Return fields used to detect conflicting duplicate IDs."""
    return (
        normalize_text(node.name),
        node.type,
        node.grade,
    )


def analyze_results(results: list[ExtractionResult]) -> dict:
    """Analyze node and edge consistency across all chunks."""
    nodes_by_id: dict[str, list[tuple[str, KnowledgeNode]]] = defaultdict(list)
    nodes_by_name: dict[str, list[tuple[str, KnowledgeNode]]] = defaultdict(list)

    total_nodes = 0
    total_edges = 0

    node_type_counts: Counter[str] = Counter()
    relation_counts: Counter[str] = Counter()

    for result in results:
        total_nodes += len(result.nodes)
        total_edges += len(result.edges)

        for node in result.nodes:
            node_type_counts[node.type] += 1

            nodes_by_id[node.id].append(
                (
                    result.chunk_id,
                    node,
                )
            )

            normalized_name = normalize_text(node.name)

            nodes_by_name[normalized_name].append(
                (
                    result.chunk_id,
                    node,
                )
            )

        for edge in result.edges:
            relation_counts[edge.relation] += 1

    repeated_ids = {}
    conflicting_ids = {}

    for node_id, occurrences in nodes_by_id.items():
        if len(occurrences) < 2:
            continue

        repeated_ids[node_id] = [
            {
                "chunk_id": chunk_id,
                "name": node.name,
                "type": node.type,
                "grade": node.grade,
                "description": node.description,
            }
            for chunk_id, node in occurrences
        ]

        signatures = {
            node_signature(node)
            for _, node in occurrences
        }

        if len(signatures) > 1:
            conflicting_ids[node_id] = repeated_ids[node_id]

    same_name_different_ids = {}

    for normalized_name, occurrences in nodes_by_name.items():
        ids = {
            node.id
            for _, node in occurrences
        }

        if len(ids) < 2:
            continue

        same_name_different_ids[normalized_name] = [
            {
                "chunk_id": chunk_id,
                "id": node.id,
                "name": node.name,
                "type": node.type,
                "grade": node.grade,
            }
            for chunk_id, node in occurrences
        ]

    unique_node_ids = len(nodes_by_id)

    report = {
        "summary": {
            "chunks": len(results),
            "total_nodes": total_nodes,
            "unique_node_ids": unique_node_ids,
            "duplicate_node_occurrences": total_nodes - unique_node_ids,
            "total_edges": total_edges,
            "node_types": dict(node_type_counts),
            "relations": dict(relation_counts),
            "repeated_ids": len(repeated_ids),
            "conflicting_ids": len(conflicting_ids),
            "same_name_different_ids": len(same_name_different_ids),
        },
        "conflicting_ids": conflicting_ids,
        "repeated_ids": repeated_ids,
        "same_name_different_ids": same_name_different_ids,
    }

    return report


def print_summary(report: dict) -> None:
    """Print the high-level analysis summary."""
    summary = report["summary"]

    print()
    print("Knowledge Graph Extraction Analysis")
    print("=" * 40)

    print(f"Chunks:                     {summary['chunks']}")
    print(f"Total nodes:                {summary['total_nodes']}")
    print(f"Unique node IDs:            {summary['unique_node_ids']}")
    print(
        "Duplicate occurrences:      "
        f"{summary['duplicate_node_occurrences']}"
    )
    print(f"Total local edges:          {summary['total_edges']}")
    print(f"Repeated IDs:               {summary['repeated_ids']}")
    print(f"Conflicting IDs:            {summary['conflicting_ids']}")
    print(
        "Same name, different IDs:   "
        f"{summary['same_name_different_ids']}"
    )

    print()
    print("Node types:")

    for node_type, count in sorted(summary["node_types"].items()):
        print(f"  {node_type:<10} {count}")

    print()
    print("Relations:")

    for relation, count in sorted(summary["relations"].items()):
        print(f"  {relation:<10} {count}")


if __name__ == "__main__":
    results = load_results()

    if not results:
        raise RuntimeError(f"No cached extraction results found in {EXTRACTED_DIR}")

    report = analyze_results(results)

    KG_DIR.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text(
        json.dumps(
            report,
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )

    print_summary(report)

    print()
    print(f"Report saved to: {REPORT_PATH}")
