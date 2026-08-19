from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from langsmith import traceable

import hashlib
import json

from .chunk import MarkdownChunk, load_chunks
from .config import EXTRACTED_DIR, EXTRACTION_MODEL
from .context import EXTRACTION_CONTEXT
from .schema import ExtractionResult, KnowledgeEdge, KnowledgeNode
from .utils import chat_model, load_json, require_online


@lru_cache(maxsize=1)
def extractor():
    """Build the structured extraction model on first use."""
    return chat_model(EXTRACTION_MODEL, max_tokens=16384).with_structured_output(
        ExtractionResult,
        method="json_schema",
        strict=True,
    )


def build_prompt(chunk: MarkdownChunk) -> str:
    """Build the extraction prompt for one textbook lesson."""
    return (
        f"{EXTRACTION_CONTEXT}\n\n"
        f"Grade: {chunk.grade}\n"
        f"Chapter: {chunk.chapter}\n"
        f"Lesson: {chunk.title}\n"
        f"Chunk ID: {chunk.id}\n\n"
        f"Textbook content:\n{chunk.content}"
    )


def fingerprint(chunk: MarkdownChunk) -> str:
    """Fingerprint the inputs that decide an extraction result."""
    payload = "\n".join(
        [
            EXTRACTION_MODEL,
            EXTRACTION_CONTEXT,
            chunk.id,
            chunk.content,
        ]
    )

    return hashlib.sha1(payload.encode("utf-8")).hexdigest()[:20]


def deduplicate_nodes(nodes: list[KnowledgeNode]) -> list[KnowledgeNode]:
    """Remove duplicate node IDs while preserving the first occurrence."""
    node_by_id: dict[str, KnowledgeNode] = {}

    for node in nodes:
        existing = node_by_id.get(node.id)

        if existing is None:
            node_by_id[node.id] = node
            continue

        if existing == node:
            print(
                f"  Warning: drop exact duplicate node "
                f"{node.id}"
            )
            continue

        print(
            f"  Warning: conflicting duplicate node ID "
            f"{node.id}; keeping first occurrence"
        )

        print(
            f"    First: "
            f"{existing.name} [{existing.type}]"
        )

        print(
            f"    Drop:  "
            f"{node.name} [{node.type}]"
        )

    return list(node_by_id.values())


def sanitize_edges(
    edges: list[KnowledgeEdge],
    node_ids: set[str],
) -> list[KnowledgeEdge]:
    """Remove invalid and duplicate local edges."""
    valid_edges: list[KnowledgeEdge] = []
    seen_edges: set[tuple[str, str, str]] = set()

    for edge in edges:
        if edge.source not in node_ids:
            print(
                f"  Warning: drop edge with unknown source "
                f"{edge.source} -> {edge.target} "
                f"({edge.relation})"
            )
            continue

        if edge.target not in node_ids:
            print(
                f"  Warning: drop edge with unknown target "
                f"{edge.source} -> {edge.target} "
                f"({edge.relation})"
            )
            continue

        key = (
            edge.source,
            edge.target,
            edge.relation,
        )

        if key in seen_edges:
            print(
                f"  Warning: drop duplicate edge "
                f"{edge.source} -> {edge.target} "
                f"({edge.relation})"
            )
            continue

        seen_edges.add(key)
        valid_edges.append(edge)

    return valid_edges


def sanitize_result(result: ExtractionResult) -> ExtractionResult:
    """Sanitize structural issues in one extraction result."""
    nodes = deduplicate_nodes(result.nodes)

    node_ids = {node.id for node in nodes}

    edges = sanitize_edges(result.edges, node_ids)

    return result.model_copy(
        update={
            "nodes": nodes,
            "edges": edges,
        }
    )


@traceable(name="Extract knowledge chunk")
def extract_chunk(chunk: MarkdownChunk) -> ExtractionResult:
    """Extract knowledge from one textbook lesson."""
    result = extractor().invoke(
        build_prompt(chunk),
        config={
            "run_name": "KG extraction",
            "tags": [
                "knowledge-graph",
                f"grade-{chunk.grade}",
            ],
            "metadata": {
                "chunk_id": chunk.id,
                "lesson": chunk.title,
                "model": EXTRACTION_MODEL,
            },
        },
    )

    result = ExtractionResult.model_validate(result).model_copy(
        update={
            "chunk_id": chunk.id,
        }
    )

    return sanitize_result(result)


def cache_path(chunk: MarkdownChunk) -> Path:
    """Return the cache path for one extracted chunk."""
    filename = chunk.id.replace(":", "_") + ".json"

    return EXTRACTED_DIR / filename


def load_cached(chunk: MarkdownChunk) -> ExtractionResult | None:
    """Load a cached extraction result, or None when missing or stale.

    Legacy cache files carry no fingerprint and stay valid.
    """
    path = cache_path(chunk)

    if not path.exists():
        return None

    data = load_json(path)
    cached = data.get("fingerprint")

    if cached is not None and cached != fingerprint(chunk):
        print(f"  Warning: stale extraction cache for {chunk.id}")
        return None

    return ExtractionResult.model_validate(data)


def write_cache(chunk: MarkdownChunk, result: ExtractionResult) -> None:
    """Cache one extraction result with its input fingerprint."""
    data = result.model_dump(mode="json")
    data["fingerprint"] = fingerprint(chunk)

    cache_path(chunk).write_text(
        json.dumps(data, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def extract_all_chunks(chunks: list[MarkdownChunk]) -> None:
    """Extract and cache all textbook chunks."""
    EXTRACTED_DIR.mkdir(parents=True, exist_ok=True)

    total = len(chunks)

    for index, chunk in enumerate(chunks, start=1):
        if load_cached(chunk) is not None:
            print(
                f"[{index}/{total}] Skip "
                f"{chunk.id} - {chunk.title}"
            )
            continue

        print(
            f"[{index}/{total}] Extract "
            f"{chunk.id} - {chunk.title}"
        )

        require_online(f"extraction result for chunk {chunk.id}")

        write_cache(chunk, extract_chunk(chunk))


if __name__ == "__main__":
    chunks = load_chunks()

    print(f"Loaded {len(chunks)} chunks")
    print(f"Model: {EXTRACTION_MODEL}")
    print(f"Cache: {EXTRACTED_DIR}")
    print()

    extract_all_chunks(chunks)
