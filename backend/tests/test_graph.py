"""Offline checks for the knowledge graph pipeline pure functions."""

from pathlib import Path

import math
import tempfile

from knowledge.graph import canonicalize as c
from knowledge.graph import extract as e
from knowledge.graph import utils
from knowledge.graph.chunk import MarkdownChunk
from knowledge.graph.schema import ExtractionResult, KnowledgeNode


def node(node_id, name, type_="CONCEPT", chunks=(), ids=(), grades=(10,), description="x"):
    return {
        "id": node_id,
        "name": name,
        "type": type_,
        "description": description,
        "introduced_grade": min(grades),
        "grades": list(grades),
        "aliases": [],
        "source_ids": list(ids),
        "source_chunks": list(chunks),
    }


def test_normalizers():
    assert c.normalize_id("Giới hạn của hàm số") == "GIOI_HAN_CUA_HAM_SO"
    assert c.normalize_id("__a--b__") == "A_B"
    assert c.normalize_name("  Giới   HẠN ") == "gioi han"


def test_candidates_match_brute_force():
    vectors = {
        "A": [1.0, 0.0, 0.0],
        "B": [0.99, 0.14, 0.0],
        "C": [0.0, 1.0, 0.0],
        "D": [2.0, 0.0, 0.0],
    }
    nodes = [node(node_id, node_id) for node_id in vectors]
    nodes.append(node("E", "E", type_="METHOD"))
    vectors["E"] = [1.0, 0.0, 0.0]

    def cosine(left, right):
        dot = sum(a * b for a, b in zip(left, right))
        return dot / (math.dist(left, [0] * 3) * math.dist(right, [0] * 3))

    expected = set()

    for left in vectors:
        for right in vectors:
            if left == right:
                continue

            same_type = (left == "E") == (right == "E")

            if same_type and cosine(vectors[left], vectors[right]) >= c.SEMANTIC_MIN_SIMILARITY:
                expected.add(tuple(sorted((left, right))))

    found = {
        (pair["left_id"], pair["right_id"])
        for pair in c.build_semantic_candidates(nodes, vectors)
    }

    assert found == expected
    assert ("A", "E") not in found


def test_representative_prefers_evidence_then_coverage():
    wide = node("WIDE", "wide", chunks=("a", "b"), ids=("x",))
    narrow = node("NARROW", "narrow", chunks=("a",), ids=("x", "y", "z"))
    assert c.representative_score(wide) > c.representative_score(narrow)

    early = node("EARLY", "early", grades=(10, 11))
    late = node("LATE", "late", grades=(12,))
    assert c.representative_score(early) > c.representative_score(late)

    rich = node("RICH", "rich", description="a long description")
    poor = node("POOR", "poor", description="short")
    assert c.representative_score(rich) > c.representative_score(poor)


def test_merge_unions_metadata():
    left = node("LEFT", "left", chunks=("c1",), ids=("L",), grades=(10,), description="longer text")
    right = node("RIGHT", "right", chunks=("c2",), ids=("R",), grades=(12,))
    right["aliases"] = ["alias"]

    merged = c.merge_nodes([left, right], {"LEFT": "LEFT", "RIGHT": "LEFT"})

    assert len(merged) == 1
    assert merged[0]["id"] == "LEFT"
    assert merged[0]["grades"] == [10, 12]
    assert merged[0]["introduced_grade"] == 10
    assert merged[0]["aliases"] == ["alias", "left", "right"]
    assert merged[0]["source_ids"] == ["L", "R"]
    assert merged[0]["source_chunks"] == ["c1", "c2"]
    assert merged[0]["description"] == "longer text"


def test_remap_edges_drops_self_edges_and_merges_evidence():
    edges = [
        {"source": "A", "target": "B", "relation": "REQUIRES", "rationales": ["r1"], "source_chunks": ["c1"]},
        {"source": "A", "target": "C", "relation": "REQUIRES", "rationales": ["r2"], "source_chunks": ["c2"]},
        {"source": "B", "target": "C", "relation": "REQUIRES", "rationales": [], "source_chunks": []},
    ]
    remapped = c.remap_edges(edges, {"A": "A", "B": "B", "C": "B"})

    assert len(remapped) == 1
    assert remapped[0]["rationales"] == ["r1", "r2"]
    assert remapped[0]["source_chunks"] == ["c1", "c2"]


def test_group_cache_paths_are_stable_and_distinct():
    occurrence = c.NodeOccurrence(
        chunk_id="toan-10-tap-1:0001",
        lesson="Lesson",
        node=KnowledgeNode(id="TAP_HOP", name="Tập hợp", type="CONCEPT", description="d", grade=10),
    )
    other = c.NodeOccurrence(
        chunk_id=occurrence.chunk_id,
        lesson=occurrence.lesson,
        node=occurrence.node.model_copy(update={"description": "other"}),
    )

    assert c.group_cache_path([occurrence]) == c.group_cache_path([occurrence])
    assert c.group_cache_path([occurrence]) != c.group_cache_path([other])
    assert c.legacy_group_cache_path([occurrence]) == c.legacy_group_cache_path([other])
    assert c.group_cache_path([occurrence]) != c.legacy_group_cache_path([occurrence])


def test_extraction_cache_accepts_legacy_and_rejects_stale():
    chunk = MarkdownChunk(id="book:0001", grade=10, chapter=None, title="t", content="body")
    result = ExtractionResult(chunk_id=chunk.id, nodes=[], edges=[])

    with tempfile.TemporaryDirectory() as directory:
        e.EXTRACTED_DIR = Path(directory)

        legacy = e.cache_path(chunk)
        legacy.write_text(result.model_dump_json(), encoding="utf-8")
        assert e.load_cached(chunk) is not None

        e.write_cache(chunk, result)
        assert e.load_cached(chunk) is not None

        stale = chunk.__class__(**{**chunk.__dict__, "content": "changed"})
        assert e.load_cached(stale) is None


def test_offline_guard():
    utils.KG_OFFLINE = True

    try:
        utils.require_online("semantic embedding for X")
    except utils.OfflineCacheMiss as error:
        assert "semantic embedding for X" in str(error)
    else:
        raise AssertionError("offline guard did not raise")

    utils.KG_OFFLINE = False
    utils.require_online("anything")


if __name__ == "__main__":
    for name, test in sorted(globals().items()):
        if name.startswith("test_"):
            test()
            print(f"ok {name}")

    print("all graph checks passed")
