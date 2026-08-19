from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from langsmith import traceable
from pydantic import BaseModel, Field

import hashlib
import json
import re
import unicodedata
import numpy as np

from .config import (
    CANONICAL_DIR,
    CANONICAL_MODEL,
    CANONICAL_SUMMARY_PATH,
    EMBEDDING_MODEL,
    EXTRACTED_DIR,
    GLOBAL_NODES_PATH,
    GROUP_CACHE_DIR,
    LOCAL_EDGES_PATH,
    NODE_MAPPING_PATH,
    SEMANTIC_EMBEDDING_BATCH_SIZE,
    SEMANTIC_EMBEDDING_CACHE_PATH,
    SEMANTIC_JUDGE_BATCH_SIZE,
    SEMANTIC_MIN_SIMILARITY,
    SEMANTIC_PAIR_DIR,
    SEMANTIC_TOP_K,
)
from .chunk import load_chunks
from .context import CANONICALIZATION_CONTEXT, SEMANTIC_DEDUP_CONTEXT
from .schema import ExtractionResult, KnowledgeNode, NodeType
from .utils import (
    build_embeddings,
    chat_model,
    embedding_text,
    load_json,
    require_online,
    write_json,
)


ID_RENAMES = {
    "BIEU_DIEN_MIEN_NGHIEM_BAT_PHUONG_TRINH_BAC_NHAI_AN": "BIEU_DIEN_MIEN_NGHIEM_BAT_PHUONG_TRINH_BAC_NHAT_HAI_AN",
}


class CanonicalNodeDecision(BaseModel):
    id: str
    name: str
    type: NodeType
    description: str


class OccurrenceAssignment(BaseModel):
    chunk_id: str
    original_id: str
    canonical_id: str | None
    rationale: str


class CanonicalizationDecision(BaseModel):
    nodes: list[CanonicalNodeDecision] = Field(default_factory=list)
    assignments: list[OccurrenceAssignment] = Field(default_factory=list)


class PairDecision(BaseModel):
    left_id: str
    right_id: str
    merge: bool
    rationale: str


class PairJudgeDecision(BaseModel):
    pair_index: int
    merge: bool
    rationale: str


class PairDecisionBatch(BaseModel):
    decisions: list[PairJudgeDecision] = Field(default_factory=list)


@dataclass(frozen=True)
class NodeOccurrence:
    chunk_id: str
    lesson: str
    node: KnowledgeNode

    @property
    def key(self) -> tuple[str, str]:
        return self.chunk_id, self.node.id


class DisjointSet:
    """Disjoint-set structure for candidate grouping."""

    def __init__(self, items: list) -> None:
        self.parent = {item: item for item in items}

    def find(self, item):
        if self.parent[item] != item:
            self.parent[item] = self.find(self.parent[item])

        return self.parent[item]

    def union(self, left, right) -> None:
        left_root = self.find(left)
        right_root = self.find(right)

        if left_root != right_root:
            self.parent[right_root] = left_root


@lru_cache(maxsize=1)
def canonicalizer():
    """Build the phase 1 structured model on first use."""
    return chat_model(CANONICAL_MODEL).with_structured_output(
        CanonicalizationDecision,
        method="json_schema",
        strict=True,
    )


@lru_cache(maxsize=1)
def judge():
    """Build the phase 2 structured model on first use."""
    return chat_model(CANONICAL_MODEL).with_structured_output(
        PairDecisionBatch,
        method="json_schema",
        strict=True,
    )


def normalize_id(value: str) -> str:
    """Normalize an ID to uppercase ASCII snake case."""
    value = unicodedata.normalize("NFD", value)
    value = "".join(c for c in value if unicodedata.category(c) != "Mn")
    value = re.sub(r"[^A-Za-z0-9]+", "_", value.upper())

    return re.sub(r"_+", "_", value).strip("_")


def normalize_name(value: str) -> str:
    """Normalize text for exact-name candidate grouping."""
    value = unicodedata.normalize("NFD", value)
    value = "".join(c for c in value if unicodedata.category(c) != "Mn")
    value = re.sub(r"\s+", " ", value.lower())

    return value.strip()


def load_results() -> list[ExtractionResult]:
    """Load cached extraction results."""
    results = []

    for path in sorted(EXTRACTED_DIR.glob("*.json")):
        results.append(ExtractionResult.model_validate(load_json(path)))

    return results


def load_lessons() -> dict[str, str]:
    """Map chunk IDs to lesson titles."""
    return {chunk.id: chunk.title for chunk in load_chunks()}


def build_occurrences(results: list[ExtractionResult], lessons: dict[str, str]) -> list[NodeOccurrence]:
    """Flatten all extracted nodes into node occurrences."""
    occurrences = []

    for result in results:
        for node in result.nodes:
            occurrences.append(
                NodeOccurrence(
                    chunk_id=result.chunk_id,
                    lesson=lessons.get(result.chunk_id, ""),
                    node=node,
                )
            )

    return occurrences


def build_candidate_groups(occurrences: list[NodeOccurrence]) -> list[list[NodeOccurrence]]:
    """Group nodes sharing the same ID or normalized name."""
    dsu = DisjointSet(list(range(len(occurrences))))

    first_by_id: dict[str, int] = {}
    first_by_name: dict[str, int] = {}

    for index, occurrence in enumerate(occurrences):
        node_id = normalize_id(occurrence.node.id)
        name = normalize_name(occurrence.node.name)

        if node_id in first_by_id:
            dsu.union(index, first_by_id[node_id])
        else:
            first_by_id[node_id] = index

        if name in first_by_name:
            dsu.union(index, first_by_name[name])
        else:
            first_by_name[name] = index

    groups: dict[int, list[NodeOccurrence]] = defaultdict(list)

    for index, occurrence in enumerate(occurrences):
        groups[dsu.find(index)].append(occurrence)

    return list(groups.values())


def group_payload(group: list[NodeOccurrence]) -> list[dict]:
    """Build the occurrence payload shown to the model."""
    return [
        {
            "chunk_id": item.chunk_id,
            "lesson": item.lesson,
            "id": item.node.id,
            "name": item.node.name,
            "type": item.node.type,
            "description": item.node.description,
            "grade": item.node.grade,
        }
        for item in group
    ]


def group_cache_path(group: list[NodeOccurrence]) -> Path:
    """Return the fingerprinted cache file for one candidate group."""
    payload = {
        "model": CANONICAL_MODEL,
        "context": CANONICALIZATION_CONTEXT,
        "occurrences": sorted(
            (
                {
                    "chunk_id": item["chunk_id"],
                    "id": item["id"],
                    "name": item["name"],
                    "type": item["type"],
                    "description": item["description"],
                    "grade": item["grade"],
                }
                for item in group_payload(group)
            ),
            key=lambda item: (item["chunk_id"], item["id"]),
        ),
    }
    digest = hashlib.sha1(
        json.dumps(payload, ensure_ascii=False, sort_keys=True).encode("utf-8")
    ).hexdigest()[:20]

    return GROUP_CACHE_DIR / f"{digest}.json"


def legacy_group_cache_path(group: list[NodeOccurrence]) -> Path:
    """Return the pre-fingerprint cache file for one candidate group."""
    keys = sorted(f"{item.chunk_id}:{item.node.id}" for item in group)
    digest = hashlib.sha1("\n".join(keys).encode("utf-8")).hexdigest()[:16]

    return GROUP_CACHE_DIR / f"{digest}.json"


def build_group_prompt(group: list[NodeOccurrence]) -> str:
    """Build the LLM prompt for one ambiguous group."""
    return (
        f"{CANONICALIZATION_CONTEXT}\n\n"
        f"Node occurrences:\n{json.dumps(group_payload(group), ensure_ascii=False, indent=2)}"
    )


def normalize_decision(decision: CanonicalizationDecision) -> CanonicalizationDecision:
    """Normalize canonical IDs returned by the model."""
    nodes = [
        node.model_copy(update={"id": normalize_id(node.id)})
        for node in decision.nodes
    ]

    assignments = [
        assignment.model_copy(
            update={
                "canonical_id": normalize_id(assignment.canonical_id)
                if assignment.canonical_id
                else None
            }
        )
        for assignment in decision.assignments
    ]

    return decision.model_copy(update={"nodes": nodes, "assignments": assignments})


def repair_missing_definitions(
    group: list[NodeOccurrence],
    decision: CanonicalizationDecision,
) -> CanonicalizationDecision:
    """Repair missing definitions when the model reuses an original ID."""
    nodes_by_id = {node.id: node for node in decision.nodes}
    occurrences_by_id: dict[str, list[NodeOccurrence]] = defaultdict(list)

    for occurrence in group:
        occurrences_by_id[normalize_id(occurrence.node.id)].append(occurrence)

    missing_ids = {
        assignment.canonical_id
        for assignment in decision.assignments
        if assignment.canonical_id is not None and assignment.canonical_id not in nodes_by_id
    }

    repaired_nodes = list(decision.nodes)

    for canonical_id in sorted(missing_ids):
        candidates = occurrences_by_id.get(canonical_id)

        if not candidates:
            raise ValueError(f"Unknown canonical ID in assignment: {canonical_id}")

        source = candidates[0].node

        print(
            f"  Warning: canonical node {canonical_id} missing from model output; "
            "reusing original node definition"
        )

        repaired_nodes.append(
            CanonicalNodeDecision(
                id=canonical_id,
                name=source.name,
                type=source.type,
                description=source.description,
            )
        )

    return decision.model_copy(update={"nodes": repaired_nodes})


def validate_decision(
    group: list[NodeOccurrence],
    decision: CanonicalizationDecision,
) -> CanonicalizationDecision:
    """Validate and repair one LLM canonicalization result."""
    decision = normalize_decision(decision)
    decision = repair_missing_definitions(group, decision)

    expected = {item.key for item in group}

    assignment_keys = [
        (assignment.chunk_id, assignment.original_id)
        for assignment in decision.assignments
    ]

    if len(assignment_keys) != len(set(assignment_keys)):
        raise ValueError("Duplicate occurrence assignments")

    received = set(assignment_keys)

    if received != expected:
        missing = expected - received
        extra = received - expected
        raise ValueError(f"Invalid assignments. Missing={sorted(missing)}, Extra={sorted(extra)}")

    canonical_ids = [node.id for node in decision.nodes]

    if len(canonical_ids) != len(set(canonical_ids)):
        raise ValueError("Duplicate canonical IDs in one decision")

    valid_ids = set(canonical_ids)

    for assignment in decision.assignments:
        if assignment.canonical_id is None:
            continue

        if assignment.canonical_id not in valid_ids:
            raise ValueError(f"Unknown canonical ID in assignment: {assignment.canonical_id}")

    used_ids = {
        assignment.canonical_id
        for assignment in decision.assignments
        if assignment.canonical_id is not None
    }

    nodes = [node for node in decision.nodes if node.id in used_ids]

    return decision.model_copy(update={"nodes": nodes})


@traceable(name="Canonicalize knowledge nodes")
def invoke_canonicalizer(group: list[NodeOccurrence]) -> CanonicalizationDecision:
    """Canonicalize one ambiguous node group."""
    result = canonicalizer().invoke(
        build_group_prompt(group),
        config={
            "run_name": "KG node canonicalization",
            "tags": ["knowledge-graph", "canonicalization"],
            "metadata": {
                "group_size": len(group),
                "model": CANONICAL_MODEL,
            },
        },
    )

    return validate_decision(group, CanonicalizationDecision.model_validate(result))


def load_cached_group(group: list[NodeOccurrence]) -> CanonicalizationDecision | None:
    """Load a group decision from the fingerprinted or legacy cache."""
    for path in (group_cache_path(group), legacy_group_cache_path(group)):
        if not path.exists():
            continue

        decision = CanonicalizationDecision.model_validate(load_json(path))

        return validate_decision(group, decision)

    return None


def canonicalize_group(group: list[NodeOccurrence]) -> CanonicalizationDecision:
    """Load a cached decision or call the LLM."""
    cached = load_cached_group(group)

    if cached is not None:
        return cached

    ids = sorted(f"{item.chunk_id}:{item.node.id}" for item in group)
    require_online(f"canonicalization decision for group {ids}")

    decision = invoke_canonicalizer(group)
    group_cache_path(group).write_text(
        decision.model_dump_json(indent=2), encoding="utf-8"
    )

    return decision


def definition_score(node: CanonicalNodeDecision) -> int:
    """Score how informative a canonical definition is."""
    return len(node.description.strip())


def add_definition(definitions: dict[str, CanonicalNodeDecision], node: CanonicalNodeDecision) -> None:
    """Register or merge a canonical node definition."""
    existing = definitions.get(node.id)

    if existing is None:
        definitions[node.id] = node
        return

    if existing == node:
        return

    same_type = existing.type == node.type
    same_name = normalize_name(existing.name) == normalize_name(node.name)

    if same_type and same_name:
        definitions[node.id] = max((existing, node), key=definition_score)

        if existing.description != node.description:
            print(f"  Warning: merge compatible definitions for {node.id}; keeping richer description")

        return

    raise ValueError(
        f"Canonical ID collision: {node.id}\n"
        f"Existing: {existing}\n"
        f"New: {node}"
    )


def resolve_singleton_id(
    definitions: dict[str, CanonicalNodeDecision],
    node: KnowledgeNode,
) -> str:
    """Resolve a safe canonical ID for a singleton node."""
    canonical_id = normalize_id(node.id)
    existing = definitions.get(canonical_id)

    if existing is None:
        return canonical_id

    same_type = existing.type == node.type
    same_name = normalize_name(existing.name) == normalize_name(node.name)

    if same_type and same_name:
        return canonical_id

    disambiguated_id = f"{canonical_id}_{node.type}"
    existing = definitions.get(disambiguated_id)

    if existing is None:
        print(
            f"  Warning: canonical ID {canonical_id} already exists with different semantics; "
            f"using {disambiguated_id}"
        )
        return disambiguated_id

    same_type = existing.type == node.type
    same_name = normalize_name(existing.name) == normalize_name(node.name)

    if same_type and same_name:
        return disambiguated_id

    raise ValueError(
        f"Cannot resolve canonical ID collision for {canonical_id}\n"
        f"Existing: {existing}\n"
        f"New: {node}"
    )


def canonicalize_occurrences(
    occurrences: list[NodeOccurrence],
    groups: list[list[NodeOccurrence]],
) -> tuple[dict[tuple[str, str], str | None], dict[str, CanonicalNodeDecision]]:
    """Canonicalize ambiguous groups and keep singleton nodes directly."""
    mapping: dict[tuple[str, str], str | None] = {}
    definitions: dict[str, CanonicalNodeDecision] = {}

    ambiguous = [group for group in groups if len(group) > 1]
    singletons = [group[0] for group in groups if len(group) == 1]

    for index, group in enumerate(ambiguous, start=1):
        ids = sorted({item.node.id for item in group})
        print(f"[{index}/{len(ambiguous)}] Canonicalize {ids}")

        decision = canonicalize_group(group)

        for node in decision.nodes:
            add_definition(definitions, node)

        for assignment in decision.assignments:
            mapping[(assignment.chunk_id, assignment.original_id)] = assignment.canonical_id

    for occurrence in singletons:
        canonical_id = resolve_singleton_id(definitions, occurrence.node)
        mapping[occurrence.key] = canonical_id

        add_definition(
            definitions,
            CanonicalNodeDecision(
                id=canonical_id,
                name=occurrence.node.name,
                type=occurrence.node.type,
                description=occurrence.node.description,
            ),
        )

    if len(mapping) != len(occurrences):
        raise ValueError("Not every node occurrence was canonicalized")

    return mapping, definitions


def build_global_nodes(
    occurrences: list[NodeOccurrence],
    mapping: dict[tuple[str, str], str | None],
    definitions: dict[str, CanonicalNodeDecision],
) -> list[dict]:
    """Build the global canonical node catalog."""
    grouped: dict[str, list[NodeOccurrence]] = defaultdict(list)

    for occurrence in occurrences:
        canonical_id = mapping[occurrence.key]

        if canonical_id is not None:
            grouped[canonical_id].append(occurrence)

    output = []

    for canonical_id in sorted(grouped):
        items = grouped[canonical_id]
        definition = definitions[canonical_id]

        grades = sorted({item.node.grade for item in items})
        aliases = sorted({item.node.name for item in items})
        source_ids = sorted({item.node.id for item in items})
        source_chunks = sorted({item.chunk_id for item in items})

        output.append(
            {
                "id": canonical_id,
                "name": definition.name,
                "type": definition.type,
                "description": definition.description,
                "introduced_grade": min(grades),
                "grades": grades,
                "aliases": aliases,
                "source_ids": source_ids,
                "source_chunks": source_chunks,
            }
        )

    return output


def build_mapping_output(
    occurrences: list[NodeOccurrence],
    mapping: dict[tuple[str, str], str | None],
) -> list[dict]:
    """Build original-node to canonical-node mapping."""
    return [
        {
            "chunk_id": item.chunk_id,
            "original_id": item.node.id,
            "original_name": item.node.name,
            "canonical_id": mapping[item.key],
        }
        for item in occurrences
    ]


def build_local_edges(
    results: list[ExtractionResult],
    mapping: dict[tuple[str, str], str | None],
) -> list[dict]:
    """Remap existing local edges to canonical node IDs."""
    edges: dict[tuple[str, str, str], dict] = {}

    for result in results:
        for edge in result.edges:
            source = mapping.get((result.chunk_id, edge.source))
            target = mapping.get((result.chunk_id, edge.target))

            if source is None or target is None or source == target:
                continue

            key = (source, target, edge.relation)

            if key not in edges:
                edges[key] = {
                    "source": source,
                    "target": target,
                    "relation": edge.relation,
                    "rationales": [],
                    "source_chunks": [],
                }

            item = edges[key]

            if edge.rationale and edge.rationale not in item["rationales"]:
                item["rationales"].append(edge.rationale)

            if result.chunk_id not in item["source_chunks"]:
                item["source_chunks"].append(result.chunk_id)

    return sorted(
        edges.values(),
        key=lambda edge: (edge["source"], edge["target"], edge["relation"]),
    )


def clean_text(value: str) -> str:
    """Repair known control-character corruption in mathematical text."""
    return value.replace("\x7f", "\\")


def cleanup_inputs(
    nodes: list[dict],
    mapping: list[dict],
    edges: list[dict],
) -> tuple[list[dict], list[dict], list[dict], dict[str, str]]:
    """Apply deterministic cleanup before semantic deduplication."""
    remap = {}

    for node in nodes:
        old_id = node["id"]
        new_id = ID_RENAMES.get(old_id, old_id)
        remap[old_id] = new_id

    cleaned_nodes = []

    for node in nodes:
        item = dict(node)
        item["id"] = remap[node["id"]]
        item["name"] = clean_text(item.get("name", ""))
        item["description"] = clean_text(item.get("description", ""))
        item["aliases"] = [clean_text(alias) for alias in item.get("aliases", [])]
        cleaned_nodes.append(item)

    if len({node["id"] for node in cleaned_nodes}) != len(cleaned_nodes):
        raise ValueError("Deterministic ID cleanup created a node ID collision")

    cleaned_mapping = []

    for item in mapping:
        entry = dict(item)
        canonical_id = entry.get("canonical_id")

        if canonical_id is not None:
            entry["canonical_id"] = remap.get(canonical_id, canonical_id)

        cleaned_mapping.append(entry)

    cleaned_edges = []

    for edge in edges:
        item = dict(edge)
        item["source"] = remap.get(item["source"], item["source"])
        item["target"] = remap.get(item["target"], item["target"])
        cleaned_edges.append(item)

    return cleaned_nodes, cleaned_mapping, cleaned_edges, remap


def build_semantic_candidates(nodes: list[dict], embeddings: dict[str, list[float]]) -> list[dict]:
    """Build top-k same-type semantic duplicate candidates."""
    by_type: dict[str, list[str]] = defaultdict(list)

    for node in nodes:
        by_type[node["type"]].append(node["id"])

    candidates: dict[tuple[str, str], dict] = {}

    for node_ids in by_type.values():
        if len(node_ids) < 2:
            continue

        matrix = np.asarray([embeddings[node_id] for node_id in node_ids], dtype=np.float64)

        norms = np.linalg.norm(matrix, axis=1, keepdims=True)
        norms[norms == 0] = 1.0
        matrix /= norms

        similarities = matrix @ matrix.T
        np.fill_diagonal(similarities, -1.0)

        for left_index, left_id in enumerate(node_ids):
            row = similarities[left_index]
            scores = sorted(
                (
                    (float(row[right_index]), node_ids[right_index])
                    for right_index in np.nonzero(row >= SEMANTIC_MIN_SIMILARITY)[0]
                ),
                reverse=True,
            )

            for similarity, right_id in scores[:SEMANTIC_TOP_K]:
                pair = tuple(sorted((left_id, right_id)))
                existing = candidates.get(pair)

                if existing is None or similarity > existing["similarity"]:
                    candidates[pair] = {
                        "left_id": pair[0],
                        "right_id": pair[1],
                        "similarity": similarity,
                    }

    return sorted(
        candidates.values(),
        key=lambda item: (-item["similarity"], item["left_id"], item["right_id"]),
    )


def pair_cache_path(left: dict, right: dict) -> Path:
    """Return the fingerprinted cache file for one semantic pair."""
    payload = "\n".join(
        [
            CANONICAL_MODEL,
            left["id"],
            embedding_text(left),
            right["id"],
            embedding_text(right),
            SEMANTIC_DEDUP_CONTEXT,
        ]
    )
    digest = hashlib.sha1(payload.encode("utf-8")).hexdigest()[:20]

    return SEMANTIC_PAIR_DIR / f"{digest}.json"


@lru_cache(maxsize=1)
def cached_pair_decisions() -> dict[tuple[str, str], PairDecision]:
    """Index every cached pair decision by node pair.

    Pair cache filenames depend on the prompt and node text, so decisions taken
    with an earlier prompt (including manual corrections) stay reusable.
    """
    index: dict[tuple[str, str], PairDecision] = {}

    if not SEMANTIC_PAIR_DIR.exists():
        return index

    for path in sorted(SEMANTIC_PAIR_DIR.glob("*.json")):
        try:
            decision = PairDecision.model_validate(load_json(path))
        except Exception:
            print(f"  Warning: skip unreadable pair cache {path.name}")
            continue

        index.setdefault(tuple(sorted((decision.left_id, decision.right_id))), decision)

    return index


def load_pair_decision(left: dict, right: dict) -> PairDecision | None:
    """Load a cached decision for one pair, preferring the current fingerprint."""
    expected = tuple(sorted((left["id"], right["id"])))
    path = pair_cache_path(left, right)

    if path.exists():
        decision = PairDecision.model_validate(load_json(path))
        key = tuple(sorted((decision.left_id, decision.right_id)))

        if key != expected:
            raise ValueError(f"Cached semantic decision does not match pair: {path}")

        return decision

    return cached_pair_decisions().get(expected)


def build_judge_prompt(pairs: list[dict], nodes_by_id: dict[str, dict]) -> str:
    """Build the semantic duplicate judge prompt."""
    items = []

    for pair_index, pair in enumerate(pairs):
        left = nodes_by_id[pair["left_id"]]
        right = nodes_by_id[pair["right_id"]]

        items.append(
            {
                "pair_index": pair_index,
                "left": {
                    "id": left["id"],
                    "name": left["name"],
                    "type": left["type"],
                    "description": left["description"],
                    "grades": left.get("grades", []),
                    "aliases": left.get("aliases", []),
                },
                "right": {
                    "id": right["id"],
                    "name": right["name"],
                    "type": right["type"],
                    "description": right["description"],
                    "grades": right.get("grades", []),
                    "aliases": right.get("aliases", []),
                },
                "embedding_similarity": round(pair["similarity"], 6),
            }
        )

    return f"{SEMANTIC_DEDUP_CONTEXT}\n\nCandidate pairs:\n{json.dumps(items, ensure_ascii=False, indent=2)}"


def validate_batch_decisions(pairs: list[dict], result: PairDecisionBatch) -> dict[tuple[str, str], PairDecision]:
    """Validate LLM decisions using stable pair indexes."""
    if len(result.decisions) != len(pairs):
        raise ValueError(f"Semantic decision count mismatch: expected {len(pairs)}, got {len(result.decisions)}")

    by_index = {}

    for decision in result.decisions:
        if decision.pair_index in by_index:
            raise ValueError(f"Duplicate semantic pair index: {decision.pair_index}")

        if decision.pair_index < 0 or decision.pair_index >= len(pairs):
            raise ValueError(f"Invalid semantic pair index: {decision.pair_index}")

        by_index[decision.pair_index] = decision

    expected_indexes = set(range(len(pairs)))

    if set(by_index) != expected_indexes:
        missing = expected_indexes - set(by_index)
        extra = set(by_index) - expected_indexes
        raise ValueError(f"Invalid semantic pair indexes. Missing={sorted(missing)}, Extra={sorted(extra)}")

    output = {}

    for pair_index, pair in enumerate(pairs):
        result_item = by_index[pair_index]
        left_id = pair["left_id"]
        right_id = pair["right_id"]
        key = tuple(sorted((left_id, right_id)))

        output[key] = PairDecision(
            left_id=left_id,
            right_id=right_id,
            merge=result_item.merge,
            rationale=result_item.rationale,
        )

    return output


@traceable(name="Judge semantic duplicate pairs")
def invoke_judge(pairs: list[dict], nodes_by_id: dict[str, dict]) -> dict[tuple[str, str], PairDecision]:
    """Judge one uncached batch of semantic duplicate candidates."""
    result = judge().invoke(
        build_judge_prompt(pairs, nodes_by_id),
        config={
            "run_name": "KG semantic dedup",
            "tags": ["knowledge-graph", "semantic-dedup"],
            "metadata": {
                "pair_count": len(pairs),
                "model": CANONICAL_MODEL,
            },
        },
    )

    return validate_batch_decisions(pairs, PairDecisionBatch.model_validate(result))


def judge_candidates(candidates: list[dict], nodes: list[dict]) -> list[dict]:
    """Load cached pair decisions and judge uncached candidates."""
    SEMANTIC_PAIR_DIR.mkdir(parents=True, exist_ok=True)

    nodes_by_id = {node["id"]: node for node in nodes}
    decisions: dict[tuple[str, str], PairDecision] = {}
    pending = []

    for pair in candidates:
        left = nodes_by_id[pair["left_id"]]
        right = nodes_by_id[pair["right_id"]]
        decision = load_pair_decision(left, right)

        if decision is None:
            pending.append(pair)
        else:
            decisions[tuple(sorted((pair["left_id"], pair["right_id"])))] = decision

    print(f"Decision cache hits: {len(candidates) - len(pending)}")
    print(f"Decision pending: {len(pending)}")

    if pending:
        require_online(
            f"{len(pending)} semantic pair decisions in {SEMANTIC_PAIR_DIR}, "
            f"e.g. {[(pair['left_id'], pair['right_id']) for pair in pending[:3]]}"
        )

    for start in range(0, len(pending), SEMANTIC_JUDGE_BATCH_SIZE):
        batch = pending[start:start + SEMANTIC_JUDGE_BATCH_SIZE]
        batch_decisions = invoke_judge(batch, nodes_by_id)

        for pair in batch:
            key = tuple(sorted((pair["left_id"], pair["right_id"])))
            decision = batch_decisions[key]
            decisions[key] = decision

            left = nodes_by_id[pair["left_id"]]
            right = nodes_by_id[pair["right_id"]]
            write_json(pair_cache_path(left, right), decision.model_dump())

        end = min(start + SEMANTIC_JUDGE_BATCH_SIZE, len(pending))
        print(f"Judged {end}/{len(pending)}")

    output = []

    for pair in candidates:
        decision = decisions[tuple(sorted((pair["left_id"], pair["right_id"])))]

        output.append(
            {
                **pair,
                "merge": decision.merge,
                "rationale": decision.rationale,
            }
        )

    return output


def representative_score(node: dict) -> tuple:
    """Rank which existing canonical ID should represent one merge group."""
    grades = node.get("grades", [])
    introduced_grade = node.get("introduced_grade", min(grades) if grades else 0)

    return (
        len(node.get("source_chunks", [])),
        len(node.get("source_ids", [])),
        len(grades),
        -introduced_grade,
        len(node.get("description", "").strip()),
        len(node.get("name", "")),
        node["id"],
    )


def build_semantic_mapping(nodes: list[dict], decisions: list[dict]) -> tuple[dict[str, str], list[list[str]]]:
    """Convert positive pair decisions into semantic merge groups."""
    nodes_by_id = {node["id"]: node for node in nodes}
    dsu = DisjointSet(list(nodes_by_id))

    for decision in decisions:
        if decision["merge"]:
            dsu.union(decision["left_id"], decision["right_id"])

    groups = defaultdict(list)

    for node_id in nodes_by_id:
        groups[dsu.find(node_id)].append(node_id)

    semantic_mapping = {}
    merged_groups = []

    for group in groups.values():
        representative = max(group, key=lambda node_id: representative_score(nodes_by_id[node_id]))

        for node_id in group:
            semantic_mapping[node_id] = representative

        if len(group) > 1:
            merged_groups.append(sorted(group))

    merged_groups.sort(key=lambda group: (group[0], len(group)))

    return semantic_mapping, merged_groups


def merge_nodes(nodes: list[dict], semantic_mapping: dict[str, str]) -> list[dict]:
    """Merge canonical node metadata using the semantic mapping."""
    grouped = defaultdict(list)

    for node in nodes:
        grouped[semantic_mapping[node["id"]]].append(node)

    output = []

    for canonical_id in sorted(grouped):
        items = grouped[canonical_id]
        representative = next(node for node in items if node["id"] == canonical_id)
        richest = max(items, key=lambda node: len(node.get("description", "").strip()))

        grades = sorted({grade for node in items for grade in node.get("grades", [])})
        aliases = sorted({
            value
            for node in items
            for value in [node.get("name", ""), *node.get("aliases", [])]
            if value
        })
        source_ids = sorted({
            source_id
            for node in items
            for source_id in node.get("source_ids", [])
        })
        source_chunks = sorted({
            chunk_id
            for node in items
            for chunk_id in node.get("source_chunks", [])
        })

        output.append(
            {
                "id": canonical_id,
                "name": representative["name"],
                "type": representative["type"],
                "description": richest["description"],
                "introduced_grade": min(grades),
                "grades": grades,
                "aliases": aliases,
                "source_ids": source_ids,
                "source_chunks": source_chunks,
            }
        )

    return output


def remap_mapping(mapping: list[dict], semantic_mapping: dict[str, str]) -> list[dict]:
    """Remap occurrence mappings after semantic merges."""
    output = []

    for item in mapping:
        entry = dict(item)
        canonical_id = entry.get("canonical_id")

        if canonical_id is not None:
            entry["canonical_id"] = semantic_mapping[canonical_id]

        output.append(entry)

    return output


def remap_edges(edges: list[dict], semantic_mapping: dict[str, str]) -> list[dict]:
    """Remap and merge local edge evidence after semantic node merges."""
    output = {}

    for edge in edges:
        source = semantic_mapping[edge["source"]]
        target = semantic_mapping[edge["target"]]

        if source == target:
            continue

        key = (source, target, edge["relation"])

        if key not in output:
            output[key] = {
                "source": source,
                "target": target,
                "relation": edge["relation"],
                "rationales": [],
                "source_chunks": [],
            }

        item = output[key]

        for rationale in edge.get("rationales", []):
            if rationale and rationale not in item["rationales"]:
                item["rationales"].append(rationale)

        for chunk_id in edge.get("source_chunks", []):
            if chunk_id not in item["source_chunks"]:
                item["source_chunks"].append(chunk_id)

    return sorted(output.values(), key=lambda edge: (edge["source"], edge["target"], edge["relation"]))


def deduplicate_semantically(
    nodes: list[dict],
    mapping: list[dict],
    edges: list[dict],
) -> tuple[list[dict], list[dict], list[dict], dict]:
    """Run phase 2 on the phase 1 canonical graph."""
    nodes, mapping, edges, cleanup_remap = cleanup_inputs(nodes, mapping, edges)

    renamed_ids = {
        old_id: new_id
        for old_id, new_id in cleanup_remap.items()
        if old_id != new_id
    }

    embeddings = build_embeddings(
        nodes,
        cache_path=SEMANTIC_EMBEDDING_CACHE_PATH,
        batch_size=SEMANTIC_EMBEDDING_BATCH_SIZE,
    )
    candidates = build_semantic_candidates(nodes, embeddings)

    print()
    print(f"Semantic candidates: {len(candidates)}")

    decisions = judge_candidates(candidates, nodes)
    merge_decisions = [decision for decision in decisions if decision["merge"]]

    semantic_mapping, merged_groups = build_semantic_mapping(nodes, decisions)

    final_nodes = merge_nodes(nodes, semantic_mapping)
    final_mapping = remap_mapping(mapping, semantic_mapping)
    final_edges = remap_edges(edges, semantic_mapping)

    stats = {
        "semantic_candidates": len(candidates),
        "semantic_merged_pairs": len(merge_decisions),
        "semantic_merged_groups": len(merged_groups),
        "local_edges_before_semantic": len(edges),
        "deterministic_id_renames": renamed_ids,
        "embedding_model": EMBEDDING_MODEL,
        "semantic_top_k": SEMANTIC_TOP_K,
        "semantic_min_similarity": SEMANTIC_MIN_SIMILARITY,
        "merge_groups": merged_groups,
        "merge_decisions": merge_decisions,
    }

    return final_nodes, final_mapping, final_edges, stats


if __name__ == "__main__":
    CANONICAL_DIR.mkdir(parents=True, exist_ok=True)
    GROUP_CACHE_DIR.mkdir(parents=True, exist_ok=True)

    results = load_results()

    if not results:
        raise RuntimeError(f"No extraction results found in {EXTRACTED_DIR}")

    lessons = load_lessons()
    occurrences = build_occurrences(results, lessons)
    groups = build_candidate_groups(occurrences)
    ambiguous_count = sum(len(group) > 1 for group in groups)

    print(f"Extraction results: {len(results)}")
    print(f"Node occurrences: {len(occurrences)}")
    print(f"Candidate groups: {len(groups)}")
    print(f"Ambiguous groups: {ambiguous_count}")
    print(f"Model: {CANONICAL_MODEL}")
    print()

    mapping, definitions = canonicalize_occurrences(occurrences, groups)

    phase1_nodes = build_global_nodes(occurrences, mapping, definitions)
    phase1_mapping = build_mapping_output(occurrences, mapping)
    phase1_edges = build_local_edges(results, mapping)

    print()
    print(f"Phase 1 canonical nodes: {len(phase1_nodes)}")
    print(f"Phase 1 local edges: {len(phase1_edges)}")
    print()

    global_nodes, node_mapping, local_edges, semantic_stats = deduplicate_semantically(
        phase1_nodes,
        phase1_mapping,
        phase1_edges,
    )

    summary = {
        "extraction_results": len(results),
        "node_occurrences": len(occurrences),
        "candidate_groups": len(groups),
        "ambiguous_groups": ambiguous_count,
        "canonical_nodes_phase1": len(phase1_nodes),
        "dropped_occurrences": sum(canonical_id is None for canonical_id in mapping.values()),
        "canonical_nodes": len(global_nodes),
        "canonical_local_edges": len(local_edges),
        "model": CANONICAL_MODEL,
        **semantic_stats,
    }

    write_json(GLOBAL_NODES_PATH, global_nodes)
    write_json(NODE_MAPPING_PATH, node_mapping)
    write_json(LOCAL_EDGES_PATH, local_edges)
    write_json(CANONICAL_SUMMARY_PATH, summary)

    print()
    print("Canonicalization complete")
    print("=" * 40)

    for key, value in summary.items():
        if key not in {"merge_groups", "merge_decisions"}:
            print(f"{key}: {value}")

    print()
    print(f"Nodes:   {GLOBAL_NODES_PATH}")
    print(f"Mapping: {NODE_MAPPING_PATH}")
    print(f"Edges:   {LOCAL_EDGES_PATH}")
    print(f"Summary: {CANONICAL_SUMMARY_PATH}")
