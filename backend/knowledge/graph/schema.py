from typing import Literal
from pydantic import BaseModel, Field


NodeType = Literal[
    "CONCEPT",
    "THEOREM",
    "FORMULA",
    "METHOD",
]

RelationType = Literal[
    "REQUIRES",
    "IS_A",
    "SUBSET_OF",
    "PART_OF",
]


class KnowledgeNode(BaseModel):
    id: str
    name: str
    type: NodeType
    description: str
    grade: int = Field(ge=10, le=12)


class KnowledgeEdge(BaseModel):
    source: str
    target: str
    relation: RelationType
    rationale: str | None = None


class ExtractionResult(BaseModel):
    chunk_id: str
    nodes: list[KnowledgeNode] = Field(default_factory=list)
    edges: list[KnowledgeEdge] = Field(default_factory=list)