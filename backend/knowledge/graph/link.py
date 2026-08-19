from __future__ import annotations

from collections import defaultdict
from functools import lru_cache
from pathlib import Path
from langsmith import traceable
from pydantic import BaseModel

import hashlib
import json
import numpy as np

from .config import (
    EMBEDDING_MODEL,
    GLOBAL_NODES_PATH,
    KNOWLEDGE_GRAPH_PATH,
    LINK_CYCLE_DIR,
    LINK_DIR,
    LINK_EMBEDDING_BATCH_SIZE,
    LINK_EMBEDDING_CACHE_PATH,
    LINK_MIN_SIMILARITY,
    LINK_MODEL,
    LINK_PAIR_DIR,
    LINK_SUMMARY_PATH,
    LINK_TOP_K,
    LOCAL_EDGES_PATH,
)
from .context import LINK_CONTEXT
from .utils import (
    build_embeddings,
    chat_model,
    load_json,
    require_online,
    write_json,
)

RELATION_MAP = {
    "left_requires_right": ("LEFT", "REQUIRES"),
    "right_requires_left": ("RIGHT", "REQUIRES"),
    "left_is_a_right": ("LEFT", "IS_A"),
    "right_is_a_left": ("RIGHT", "IS_A"),
    "left_subset_of_right": ("LEFT", "SUBSET_OF"),
    "right_subset_of_left": ("RIGHT", "SUBSET_OF"),
    "left_part_of_right": ("LEFT", "PART_OF"),
    "right_part_of_left": ("RIGHT", "PART_OF"),
}

VALID_RELATIONS = {"REQUIRES", "IS_A", "SUBSET_OF", "PART_OF"}


class RelationCheck(BaseModel):
    left_requires_right: bool
    right_requires_left: bool
    left_is_a_right: bool
    right_is_a_left: bool
    left_subset_of_right: bool
    right_subset_of_left: bool
    left_part_of_right: bool
    right_part_of_left: bool


class CycleResolution(BaseModel):
    source: str
    target: str
    reason: str


@lru_cache(maxsize=1)
def judge():
    """Build the relation judge on first use."""
    return chat_model(LINK_MODEL).with_structured_output(
        RelationCheck,
        method="json_schema",
        strict=True,
    )


@lru_cache(maxsize=1)
def cycle_judge():
    """Build the cycle resolver on first use."""
    return chat_model(LINK_MODEL).with_structured_output(
        CycleResolution,
        method="json_schema",
        strict=True,
    )


def node_payload(node: dict) -> dict:
    """Build compact node context for relation judging."""
    return {
        "id": node["id"],
        "name": node["name"],
        "type": node["type"],
        "description": node["description"],
        "grades": node.get("grades", []),
        "aliases": node.get("aliases", []),
    }


def build_local_evidence(edges: list[dict], node_ids: set[str]) -> dict[tuple[str, str], list[dict]]:
    """Group local edge evidence by unordered node pair."""
    evidence = {}

    for edge in edges:
        source = edge["source"]
        target = edge["target"]

        if source not in node_ids or target not in node_ids:
            raise ValueError(f"Unknown local edge endpoint: {source} -> {target}")

        if source == target:
            continue

        pair = tuple(sorted((source, target)))
        evidence.setdefault(pair, []).append(edge)

    return evidence


def build_candidates(nodes: list[dict], embeddings: dict[str, list[float]], local_evidence: dict[tuple[str, str], list[dict]]) -> list[tuple[str, str]]:
    """Build candidate pairs from local evidence and embedding neighbors."""
    node_ids = [node["id"] for node in nodes]
    matrix = np.asarray([embeddings[node_id] for node_id in node_ids], dtype=np.float32)

    norms = np.linalg.norm(matrix, axis=1, keepdims=True)
    norms[norms == 0] = 1.0
    matrix /= norms

    similarities = matrix @ matrix.T
    np.fill_diagonal(similarities, -1.0)

    candidates = set(local_evidence)
    top_k = min(LINK_TOP_K, len(node_ids) - 1)

    if top_k <= 0:
        return sorted(candidates)

    for left_index, left_id in enumerate(node_ids):
        scores = similarities[left_index]
        indices = np.argpartition(scores, -top_k)[-top_k:]

        for right_index in indices:
            if scores[right_index] < LINK_MIN_SIMILARITY:
                continue

            right_id = node_ids[right_index]
            candidates.add(tuple(sorted((left_id, right_id))))

    return sorted(candidates)


def pair_cache_path(pair: tuple[str, str], nodes_by_id: dict[str, dict]):
    """Return the cache path for one pair decision."""
    left_id, right_id = pair
    payload = {
        "model": LINK_MODEL,
        "context": LINK_CONTEXT,
        "left": node_payload(nodes_by_id[left_id]),
        "right": node_payload(nodes_by_id[right_id]),
    }
    digest = hashlib.sha1(json.dumps(payload, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()[:20]
    return LINK_PAIR_DIR / f"{digest}.json"


def build_judge_prompt(pair: tuple[str, str], nodes_by_id: dict[str, dict]) -> str:
    """Build a prompt for exactly one unordered node pair."""
    left_id, right_id = pair
    payload = {
        "left": node_payload(nodes_by_id[left_id]),
        "right": node_payload(nodes_by_id[right_id]),
    }
    return f"{LINK_CONTEXT}\n\nNode pair:\n{json.dumps(payload, ensure_ascii=False, indent=2)}"


@traceable(name="Judge global knowledge relation")
def invoke_judge(pair: tuple[str, str], nodes_by_id: dict[str, dict]) -> RelationCheck:
    """Judge all allowed directed relations for exactly one node pair."""
    return RelationCheck.model_validate(judge().invoke(
        build_judge_prompt(pair, nodes_by_id),
        config={
            "run_name": "KG global relation linking",
            "tags": ["knowledge-graph", "global-linking"],
            "metadata": {
                "left_id": pair[0],
                "right_id": pair[1],
                "model": LINK_MODEL,
            },
        },
    ))


def load_or_judge(pair: tuple[str, str], nodes_by_id: dict[str, dict]) -> tuple[RelationCheck, bool]:
    """Load a cached decision or judge one pair."""
    path = pair_cache_path(pair, nodes_by_id)

    if path.exists():
        try:
            return RelationCheck.model_validate(load_json(path)), True
        except Exception:
            pass

    require_online(f"link pair decision for {pair[0]} / {pair[1]}")

    check = invoke_judge(pair, nodes_by_id)
    write_json(path, check.model_dump())
    return check, False


def apply_check(pair: tuple[str, str], check: RelationCheck, local_evidence: dict[tuple[str, str], list[dict]]) -> tuple[dict | None, str]:
    """Convert one true boolean assertion into one directed edge."""
    active = [field for field, value in check.model_dump().items() if value]

    if not active:
        return None, "NONE"

    if len(active) > 1:
        return None, "AMBIGUOUS"

    decision = active[0]
    source_side, relation = RELATION_MAP[decision]
    left_id, right_id = pair

    if source_side == "LEFT":
        source = left_id
        target = right_id
    else:
        source = right_id
        target = left_id

    source_chunks = sorted({
        chunk_id
        for edge in local_evidence.get(pair, [])
        for chunk_id in edge.get("source_chunks", [])
    })

    return {
        "source": source,
        "target": target,
        "relation": relation,
        "rationale": None,
        "source_chunks": source_chunks,
    }, decision


def judge_candidates(candidates: list[tuple[str, str]], nodes: list[dict], local_evidence: dict[tuple[str, str], list[dict]]) -> tuple[list[dict], dict]:
    """Judge candidates independently with one model call per pair."""
    LINK_PAIR_DIR.mkdir(parents=True, exist_ok=True)

    nodes_by_id = {node["id"]: node for node in nodes}
    edges = []
    decision_counts = {}
    cache_hits = 0

    for index, pair in enumerate(candidates, start=1):
        check, cached = load_or_judge(pair, nodes_by_id)

        if cached:
            cache_hits += 1

        edge, decision = apply_check(pair, check, local_evidence)
        decision_counts[decision] = decision_counts.get(decision, 0) + 1

        if edge is not None:
            edges.append(edge)

        print(f"Judged {index}/{len(candidates)}")

    stats = {
        "decision_cache_hits": cache_hits,
        "decision_cache_misses": len(candidates) - cache_hits,
        "rejected_none": decision_counts.get("NONE", 0),
        "rejected_ambiguous": decision_counts.get("AMBIGUOUS", 0),
        "decisions": dict(sorted(decision_counts.items())),
    }

    return sorted(edges, key=lambda edge: (edge["source"], edge["target"], edge["relation"])), stats


def relation_counts(edges: list[dict]) -> dict[str, int]:
    """Count relation types."""
    counts = {}

    for edge in edges:
        relation = edge["relation"]
        counts[relation] = counts.get(relation, 0) + 1

    return dict(sorted(counts.items()))


def find_cycle(edges: list[dict], relation: str) -> list[str] | None:
    """Return one directed cycle for a relation, or None."""
    graph = defaultdict(list)

    for edge in edges:
        if edge["relation"] == relation:
            graph[edge["source"]].append(edge["target"])

    state = {}
    stack = []
    positions = {}

    def dfs(node: str) -> list[str] | None:
        state[node] = 1
        positions[node] = len(stack)
        stack.append(node)

        for target in graph[node]:
            if state.get(target, 0) == 0:
                cycle = dfs(target)

                if cycle is not None:
                    return cycle

            elif state[target] == 1:
                start = positions[target]
                return stack[start:] + [target]

        stack.pop()
        positions.pop(node, None)
        state[node] = 2
        return None

    nodes = set(graph)

    for targets in graph.values():
        nodes.update(targets)

    for node in sorted(nodes):
        if state.get(node, 0) != 0:
            continue

        cycle = dfs(node)

        if cycle is not None:
            return cycle

    return None


def get_cycle_edges(edges: list[dict], cycle: list[str], relation: str) -> list[dict]:
    edge_map = {
        (edge["source"], edge["target"], edge["relation"]): edge
        for edge in edges
    }

    result = []

    for i in range(len(cycle) - 1):
        key = (cycle[i], cycle[i + 1], relation)
        edge = edge_map.get(key)

        if edge is None:
            raise ValueError(f"Cycle edge not found: {key}")

        result.append(edge)

    return result


def cycle_cache_path(relation: str, cycle_edges: list[dict], nodes_by_id: dict[str, dict]) -> Path:
    node_ids = sorted({
        node_id
        for edge in cycle_edges
        for node_id in (edge["source"], edge["target"])
    })

    payload = {
        "model": LINK_MODEL,
        "context": LINK_CONTEXT,
        "relation": relation,
        "nodes": [node_payload(nodes_by_id[node_id]) for node_id in node_ids],
        "edges": [
            {
                "source": edge["source"],
                "target": edge["target"],
                "relation": edge["relation"],
                "source_chunks": edge.get("source_chunks", []),
            }
            for edge in cycle_edges
        ],
    }

    digest = hashlib.sha1(
        json.dumps(payload, ensure_ascii=False, sort_keys=True).encode("utf-8")
    ).hexdigest()[:20]

    return LINK_CYCLE_DIR / f"{digest}.json"


def build_cycle_prompt(relation: str, cycle_edges: list[dict], nodes_by_id: dict[str, dict]) -> str:
    node_ids = sorted({
        node_id
        for edge in cycle_edges
        for node_id in (edge["source"], edge["target"])
    })

    payload = {
        "relation": relation,
        "nodes": [node_payload(nodes_by_id[node_id]) for node_id in node_ids],
        "cycle_edges": [
            {
                "source": edge["source"],
                "target": edge["target"],
                "source_chunks": edge.get("source_chunks", []),
            }
            for edge in cycle_edges
        ],
    }

    semantics = {
        "REQUIRES": "source requires target as a prerequisite; target should be understood before source",
        "IS_A": "source is a kind of target",
        "SUBSET_OF": "source is a subset of target",
        "PART_OF": "source is a part of target",
    }

    return (
        f"{LINK_CONTEXT}\n\n"
        f"The following {relation} relations form a directed cycle.\n"
        f"Relation meaning: {semantics[relation]}.\n"
        "A valid knowledge graph must not contain this cycle.\n"
        "Choose exactly one existing edge that is semantically incorrect or reversed and should be removed.\n"
        "Do not choose arbitrarily just to break the cycle.\n"
        "Return source and target exactly as they appear in cycle_edges.\n\n"
        f"{json.dumps(payload, ensure_ascii=False, indent=2)}"
    )


@traceable(name="Resolve knowledge graph cycle")
def invoke_cycle_judge(relation: str, cycle_edges: list[dict], nodes_by_id: dict[str, dict]) -> CycleResolution:
    return CycleResolution.model_validate(cycle_judge().invoke(
        build_cycle_prompt(relation, cycle_edges, nodes_by_id),
        config={
            "run_name": "KG cycle resolution",
            "tags": ["knowledge-graph", "cycle-resolution"],
            "metadata": {
                "relation": relation,
                "model": LINK_MODEL,
            },
        },
    ))


def load_or_resolve_cycle(relation: str, cycle_edges: list[dict], nodes_by_id: dict[str, dict]) -> tuple[CycleResolution, bool]:
    path = cycle_cache_path(relation, cycle_edges, nodes_by_id)

    if path.exists():
        try:
            return CycleResolution.model_validate(load_json(path)), True
        except Exception:
            pass

    require_online(
        f"{relation} cycle decision for "
        f"{[(edge['source'], edge['target']) for edge in cycle_edges]}"
    )

    resolution = invoke_cycle_judge(relation, cycle_edges, nodes_by_id)
    write_json(path, resolution.model_dump())
    return resolution, False


def resolve_cycles(edges: list[dict], nodes: list[dict]) -> tuple[list[dict], dict]:
    LINK_CYCLE_DIR.mkdir(parents=True, exist_ok=True)

    nodes_by_id = {node["id"]: node for node in nodes}
    resolved = list(edges)
    removed = []
    cache_hits = 0

    while True:
        found_cycle = False

        for relation in sorted(VALID_RELATIONS):
            cycle = find_cycle(resolved, relation)

            if cycle is None:
                continue

            found_cycle = True
            cycle_edges = get_cycle_edges(resolved, cycle, relation)
            resolution, cached = load_or_resolve_cycle(relation, cycle_edges, nodes_by_id)

            if cached:
                cache_hits += 1

            edge = next(
                (
                    edge
                    for edge in cycle_edges
                    if edge["source"] == resolution.source
                    and edge["target"] == resolution.target
                ),
                None,
            )

            if edge is None:
                raise ValueError(
                    f"Cycle resolver returned invalid edge: "
                    f"{resolution.source} -> {resolution.target}"
                )

            resolved.remove(edge)

            removed.append({
                "source": edge["source"],
                "target": edge["target"],
                "relation": relation,
                "reason": resolution.reason,
            })

            print(
                f"Resolved {relation} cycle: "
                f"removed {edge['source']} -> {edge['target']}"
            )

            break

        if not found_cycle:
            break

    stats = {
        "cycle_resolutions": len(removed),
        "cycle_resolution_cache_hits": cache_hits,
        "cycle_resolution_cache_misses": len(removed) - cache_hits,
        "removed_cycle_edges": removed,
    }

    return sorted(
        resolved,
        key=lambda edge: (edge["source"], edge["target"], edge["relation"]),
    ), stats


def filter_invalid_requires_by_grade(edges: list[dict], nodes: list[dict]) -> tuple[list[dict], list[dict]]:
    nodes_by_id = {node["id"]: node for node in nodes}
    kept = []
    removed = []

    for edge in edges:
        if edge["relation"] != "REQUIRES" or edge.get("source_chunks"):
            kept.append(edge)
            continue

        source = nodes_by_id[edge["source"]]
        target = nodes_by_id[edge["target"]]

        source_grade = source["introduced_grade"]
        target_grade = target["introduced_grade"]
        source_grades = source.get("grades", [])

        if target_grade > source_grade and target_grade not in source_grades:
            removed.append({
                **edge,
                "reason": f"grade leak: source introduced in grade {source_grade}, target in grade {target_grade}",
            })
            continue

        kept.append(edge)

    return kept, removed


def validate_edges(edges: list[dict], node_ids: set[str]) -> None:
    """Validate final graph structure and relation DAGs."""
    seen_edges = set()
    seen_pairs = set()

    for edge in edges:
        source = edge["source"]
        target = edge["target"]
        relation = edge["relation"]

        if source not in node_ids:
            raise ValueError(f"Unknown edge source: {source}")

        if target not in node_ids:
            raise ValueError(f"Unknown edge target: {target}")

        if source == target:
            raise ValueError(f"Self edge: {source}")

        if relation not in VALID_RELATIONS:
            raise ValueError(f"Unknown relation: {relation}")

        key = (source, target, relation)

        if key in seen_edges:
            raise ValueError(f"Duplicate edge: {key}")

        pair = tuple(sorted((source, target)))

        if pair in seen_pairs:
            raise ValueError(f"Multiple or reciprocal relations for pair: {pair}")

        seen_edges.add(key)
        seen_pairs.add(pair)

    for relation in sorted(VALID_RELATIONS):
        cycle = find_cycle(edges, relation)

        if cycle is not None:
            raise ValueError(f"{relation} cycle: {' -> '.join(cycle)}")


if __name__ == "__main__":
    LINK_DIR.mkdir(parents=True, exist_ok=True)
    LINK_PAIR_DIR.mkdir(parents=True, exist_ok=True)

    nodes = load_json(GLOBAL_NODES_PATH)
    local_edges = load_json(LOCAL_EDGES_PATH)

    node_ids = {node["id"] for node in nodes}

    if len(node_ids) != len(nodes):
        raise ValueError("Duplicate clean node IDs")

    local_evidence = build_local_evidence(local_edges, node_ids)

    print(f"Clean nodes: {len(nodes)}")
    print(f"Local edges: {len(local_edges)}")
    print(f"Local node pairs: {len(local_evidence)}")
    print(f"Embedding model: {EMBEDDING_MODEL}")
    print(f"Link model: {LINK_MODEL}")
    print(f"Top-k: {LINK_TOP_K}")
    print(f"Min similarity: {LINK_MIN_SIMILARITY}")
    print()

    embeddings = build_embeddings(nodes, cache_path=LINK_EMBEDDING_CACHE_PATH, batch_size=LINK_EMBEDDING_BATCH_SIZE)
    candidates = build_candidates(nodes, embeddings, local_evidence)

    print()
    print(f"Candidate pairs: {len(candidates)}")
    print()

    global_edges, judge_stats = judge_candidates(candidates, nodes, local_evidence)
    global_edges, grade_removed = filter_invalid_requires_by_grade(global_edges, nodes)
    global_edges, cycle_stats = resolve_cycles(global_edges, nodes)
    validate_edges(global_edges, node_ids)

    local_supported = sum(bool(edge["source_chunks"]) for edge in global_edges)

    postprocess_stats = {
        "grade_invalid_requires_removed": len(grade_removed),
        "removed_grade_edges": grade_removed,
    }
    summary = {
        "clean_nodes": len(nodes),
        "local_edges_input": len(local_edges),
        "local_node_pairs": len(local_evidence),
        "candidate_pairs": len(candidates),
        "final_edges": len(global_edges),
        "local_supported_edges": local_supported,
        "inferred_edges": len(global_edges) - local_supported,
        "relations": relation_counts(global_edges),
        "embedding_model": EMBEDDING_MODEL,
        "link_model": LINK_MODEL,
        "top_k": LINK_TOP_K,
        "min_similarity": LINK_MIN_SIMILARITY,
        **judge_stats,
        **cycle_stats,
        **postprocess_stats,
    }

    write_json(KNOWLEDGE_GRAPH_PATH, {"nodes": nodes, "edges": global_edges})
    write_json(LINK_SUMMARY_PATH, summary)

    print()
    print("Global linking complete")
    print("=" * 40)

    for key, value in summary.items():
        print(f"{key}: {value}")

    print()
    print(f"Graph:   {KNOWLEDGE_GRAPH_PATH}")
    print(f"Summary: {LINK_SUMMARY_PATH}")
