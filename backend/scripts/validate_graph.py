from __future__ import annotations

from collections import defaultdict
from pathlib import Path

import json
import re
import unicodedata


ROOT = Path(__file__).resolve().parents[2]
KG_DIR = ROOT / "artifacts" / "knowledge_graph"

CANONICAL_DIR = KG_DIR / "canonical"

SUMMARY_PATH = CANONICAL_DIR / "canonicalization_summary.json"
NODES_PATH = CANONICAL_DIR / "global_nodes.json"
MAPPING_PATH = CANONICAL_DIR / "node_mapping.json"
EDGES_PATH = CANONICAL_DIR / "local_edges.json"
REPORT_PATH = CANONICAL_DIR / "validation_report.json"

NODE_TYPES = {"CONCEPT", "THEOREM", "FORMULA", "METHOD"}
RELATIONS = {"REQUIRES", "IS_A", "SUBSET_OF", "PART_OF"}

ID_RE = re.compile(r"^[A-Z0-9_]+$")
SUSPICIOUS_ID_FRAGMENTS = {
    "_NHAI_": "_NHAT_",
}


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def write_json(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def normalize_text(text: str) -> str:
    text = unicodedata.normalize("NFKC", text or "").casefold()
    return re.sub(r"\s+", " ", text).strip()


def find_control_chars(text: str) -> list[str]:
    chars = []
    for char in text or "":
        if unicodedata.category(char) == "Cc" and char not in "\n\r\t":
            chars.append(f"U+{ord(char):04X}")
    return sorted(set(chars))


def validate_nodes(nodes: list[dict], errors: list[str], warnings: dict[str, list]) -> set[str]:
    node_ids = set()
    name_groups = defaultdict(list)
    description_groups = defaultdict(list)

    for index, node in enumerate(nodes):
        node_id = node.get("id")
        node_type = node.get("type")
        grades = node.get("grades") or []

        if not node_id:
            errors.append(f"Node at index {index} has no id.")
            continue

        if node_id in node_ids:
            errors.append(f"Duplicate canonical node id: {node_id}")
        node_ids.add(node_id)

        if node_type not in NODE_TYPES:
            errors.append(f"Invalid node type for {node_id}: {node_type}")

        if not ID_RE.fullmatch(node_id):
            warnings["invalid_id_format"].append(node_id)

        wrapped_id = f"_{node_id}_"
        for fragment, expected in SUSPICIOUS_ID_FRAGMENTS.items():
            if fragment in wrapped_id:
                warnings["suspicious_ids"].append({
                    "id": node_id,
                    "fragment": fragment.strip("_"),
                    "possible_replacement": expected.strip("_"),
                })

        if not grades:
            errors.append(f"Node has no grades: {node_id}")
        elif node.get("introduced_grade") != min(grades):
            errors.append(f"introduced_grade mismatch for {node_id}: {node.get('introduced_grade')} != {min(grades)}")

        for field in ("id", "name", "description"):
            chars = find_control_chars(node.get(field, ""))
            if chars:
                warnings["control_characters"].append({"id": node_id, "field": field, "chars": chars})

        for alias in node.get("aliases", []):
            chars = find_control_chars(alias)
            if chars:
                warnings["control_characters"].append({"id": node_id, "field": "aliases", "chars": chars})

        normalized_name = normalize_text(node.get("name", ""))
        normalized_description = normalize_text(node.get("description", ""))

        if normalized_name:
            name_groups[normalized_name].append(node_id)

        if normalized_description:
            description_groups[normalized_description].append(node_id)

    warnings["same_name_groups"] = [ids for ids in name_groups.values() if len(ids) > 1]
    warnings["same_description_groups"] = [ids for ids in description_groups.values() if len(ids) > 1]

    return node_ids


def validate_mapping(mapping: list[dict], node_ids: set[str], errors: list[str], warnings: dict[str, list]) -> tuple[int, set[str]]:
    dropped = 0
    referenced_ids = set()
    seen_entries = set()

    for item in mapping:
        key = (item.get("chunk_id"), item.get("original_id"), item.get("original_name"))
        canonical_id = item.get("canonical_id")

        if key in seen_entries:
            warnings["duplicate_mapping_entries"].append({
                "chunk_id": item.get("chunk_id"),
                "original_id": item.get("original_id"),
                "original_name": item.get("original_name"),
            })
        seen_entries.add(key)

        if canonical_id is None:
            dropped += 1
            continue

        if canonical_id not in node_ids:
            errors.append(f"Mapping points to missing canonical node: {canonical_id}")
            continue

        referenced_ids.add(canonical_id)

    unreferenced_ids = sorted(node_ids - referenced_ids)
    if unreferenced_ids:
        errors.append(f"Canonical nodes without any mapping occurrence: {unreferenced_ids}")

    return dropped, referenced_ids


def validate_edges(edges: list[dict], node_ids: set[str], errors: list[str], warnings: dict[str, list]) -> None:
    seen_edges = set()
    pair_relations = defaultdict(set)

    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        relation = edge.get("relation")

        if source not in node_ids:
            errors.append(f"Edge source does not exist: {source}")

        if target not in node_ids:
            errors.append(f"Edge target does not exist: {target}")

        if relation not in RELATIONS:
            errors.append(f"Invalid edge relation: {relation}")

        if source == target:
            errors.append(f"Self-edge: {source} --{relation}--> {target}")

        key = (source, target, relation)
        if key in seen_edges:
            errors.append(f"Duplicate edge: {source} --{relation}--> {target}")
        seen_edges.add(key)

        pair_relations[(source, target)].add(relation)

    warnings["multi_relation_pairs"] = [
        {"source": source, "target": target, "relations": sorted(relations)}
        for (source, target), relations in pair_relations.items()
        if len(relations) > 1
    ]

    reciprocal_edges = []
    for source, target, relation in seen_edges:
        if source < target and (target, source, relation) in seen_edges:
            reciprocal_edges.append({"left": source, "right": target, "relation": relation})

    warnings["reciprocal_edges"] = sorted(reciprocal_edges, key=lambda x: (x["relation"], x["left"], x["right"]))


def validate_summary(summary: dict, nodes: list[dict], mapping: list[dict], edges: list[dict], dropped: int, errors: list[str]) -> None:
    actual = {
        "node_occurrences": len(mapping),
        "canonical_nodes": len(nodes),
        "dropped_occurrences": dropped,
        "canonical_local_edges": len(edges),
    }

    for key, value in actual.items():
        if summary.get(key) != value:
            errors.append(f"Summary mismatch for {key}: expected {summary.get(key)}, actual {value}")


if __name__ == "__main__":
    summary = load_json(SUMMARY_PATH)
    nodes = load_json(NODES_PATH)
    mapping = load_json(MAPPING_PATH)
    edges = load_json(EDGES_PATH)

    errors = []
    warnings = defaultdict(list)

    node_ids = validate_nodes(nodes, errors, warnings)
    dropped, _ = validate_mapping(mapping, node_ids, errors, warnings)
    validate_edges(edges, node_ids, errors, warnings)
    validate_summary(summary, nodes, mapping, edges, dropped, errors)

    warning_counts = {key: len(value) for key, value in warnings.items()}

    report = {
        "status": "PASS" if not errors else "FAIL",
        "counts": {
            "node_occurrences": len(mapping),
            "canonical_nodes": len(nodes),
            "dropped_occurrences": dropped,
            "canonical_local_edges": len(edges),
        },
        "errors": errors,
        "warning_counts": warning_counts,
        "warnings": dict(warnings),
    }

    write_json(REPORT_PATH, report)

    print(f"status: {report['status']}")
    print(f"node_occurrences: {len(mapping)}")
    print(f"canonical_nodes: {len(nodes)}")
    print(f"dropped_occurrences: {dropped}")
    print(f"canonical_local_edges: {len(edges)}")
    print(f"errors: {len(errors)}")

    for key, count in warning_counts.items():
        print(f"{key}: {count}")

    print(f"report: {REPORT_PATH}")

    if errors:
        raise SystemExit(1)