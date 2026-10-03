from __future__ import annotations

from functools import lru_cache

from .convert import load_graph


@lru_cache(maxsize=1)
def requires() -> tuple[dict[str, dict], list[tuple[str, str]]]:
    nodes, edges = load_graph()

    return {node["id"]: node for node in nodes}, [(edge["source"], edge["target"]) for edge in edges if edge["relation"] == "REQUIRES"]


def neighbors(ids: list[str]) -> list[dict]:
    nodes, _ = requires()

    return sorted((nodes[i] for i in ids), key=lambda node: (node.get("introduced_grade") or 0, node["name"]))


def get_prerequisites(knowledge_id: str) -> list[dict]:
    return neighbors([target for source, target in requires()[1] if source == knowledge_id])


def get_dependents(knowledge_id: str) -> list[dict]:
    return neighbors([source for source, target in requires()[1] if target == knowledge_id])
