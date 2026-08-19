from __future__ import annotations

from functools import lru_cache
from typing import get_args
from neo4j import Driver, GraphDatabase

from .config import (
    NEO4J_DATABASE,
    NEO4J_PASSWORD,
    NEO4J_URI,
    NEO4J_USERNAME,
)
from .schema import RelationType


RELATIONS = get_args(RelationType)


@lru_cache(maxsize=1)
def driver() -> Driver:
    if not NEO4J_URI or not NEO4J_USERNAME or not NEO4J_PASSWORD:
        raise RuntimeError("NEO4J_URI, NEO4J_USERNAME and NEO4J_PASSWORD are required")

    return GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USERNAME, NEO4J_PASSWORD))


def execute(query: str, **parameters) -> list[dict]:
    records, _, _ = driver().execute_query(
        query,
        parameters_=parameters,
        database_=NEO4J_DATABASE or None,
    )

    return [dict(record) for record in records]


def build_neighbor_query(relation: str, outgoing: bool) -> str:
    if relation not in RELATIONS:
        raise ValueError(f"Unknown relation: {relation}")

    node = "(:Knowledge {id: $knowledge_id})"
    other = "(other:Knowledge)"
    source, target = (node, other) if outgoing else (other, node)

    return f"""
        MATCH {source}-[:{relation}]->{target}
        RETURN other {{.*}} AS knowledge
        ORDER BY knowledge.introduced_grade, knowledge.name
    """


def get_neighbors(knowledge_id: str, relation: str, outgoing: bool) -> list[dict]:
    rows = execute(
        build_neighbor_query(relation, outgoing),
        knowledge_id=knowledge_id,
    )

    return [row["knowledge"] for row in rows]


def get_prerequisites(knowledge_id: str) -> list[dict]:
    return get_neighbors(knowledge_id, "REQUIRES", outgoing=True)


def get_dependents(knowledge_id: str) -> list[dict]:
    return get_neighbors(knowledge_id, "REQUIRES", outgoing=False)
