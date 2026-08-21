from uuid import NAMESPACE_URL, uuid5
from pydantic import BaseModel, Field
from pathlib import Path

import json

from common.schema import (
    Document,
    ImageRef,
    Option,
    QuestionPart,
    QuestionType,
    SourceBlock,
)


class Item(BaseModel):
    id: str

    # Provenance
    source_url: str
    source_title: str
    section: str | None = None
    number: str

    grade: int | None = None

    # Question data
    type: QuestionType = "unknown"
    content: str

    options: list[Option] = Field(default_factory=list)
    parts: list[QuestionPart] = Field(default_factory=list)
    images: list[ImageRef] = Field(default_factory=list)

    solution: str | None = None

    source_blocks: list[SourceBlock] = Field(default_factory=list)


def make_item_id(source_url: str, section: str | None, number: str) -> str:
    key = "|".join([
        source_url.strip(),
        section or "",
        number.strip(),
    ])

    return str(uuid5(NAMESPACE_URL, key))


def document_to_items(document: Document) -> list[Item]:
    items: list[Item] = []

    for question in document.questions:
        item = Item(
            id=make_item_id(
                source_url=document.source_url,
                section=question.section,
                number=question.number,
            ),

            source_url=document.source_url,
            source_title=document.title,

            section=question.section,
            number=question.number,

            grade=document.grade,

            type=question.type,
            content=question.content,

            options=question.options,
            parts=question.parts,
            images=question.images,

            solution=question.solution,

            source_blocks=question.source_blocks,
        )

        items.append(item)

    return items

def build_item_bank(document: Document) -> list[Item]:
    from .dedup import dedup_items, make_fingerprint

    items = document_to_items(document)
    unique_items = dedup_items(items)

    path = Path(__file__).resolve().parents[3] / "artifacts" / "item_bank.jsonl"
    path.parent.mkdir(parents=True, exist_ok=True)

    existing_fingerprints: set[str] = set()
    if path.exists():
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                if not line.strip():
                    continue

                old_item = Item.model_validate_json(line)
                existing_fingerprints.add(make_fingerprint(old_item))

    new_items: list[Item] = []
    for item in unique_items:
        fingerprint = make_fingerprint(item)

        if fingerprint in existing_fingerprints:
            continue

        existing_fingerprints.add(fingerprint)
        new_items.append(item)

    # Append new items to the item bank file
    with open(path, "a", encoding="utf-8") as f:
        for item in new_items:
            f.write(
                json.dumps(
                    item.model_dump(),
                    ensure_ascii=False,
                )
                + "\n"
            )

    return new_items