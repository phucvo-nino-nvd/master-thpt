from uuid import NAMESPACE_URL, uuid5
from pydantic import BaseModel, Field
from pathlib import Path

import fcntl
import json
import tempfile

from common.schema import (
    Document,
    Evaluation,
    ImageRef,
    Option,
    Question,
    QuestionPart,
    QuestionType,
    SourceBlock,
)


ITEM_BANK_PATH = Path(__file__).resolve().parents[3] / "artifacts" / "item_bank.jsonl"
SECTIONS = {"multiple_choice": "I", "true_false": "II", "short_answer": "III"}
GENERATED_PREFIX = "generated://"


class Item(BaseModel):
    id: str
    fingerprint: str = ""

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


def load_items() -> list[dict]:
    if not ITEM_BANK_PATH.exists():
        return []

    with open(ITEM_BANK_PATH, "r", encoding="utf-8") as f:
        return [json.loads(line) for line in f if line.strip()]


def source_urls() -> list[str]:
    return sorted({item["source_url"] for item in load_items()})


def items_of(question_ids: set[str]) -> list[dict]:
    return [item for item in load_items() if item["id"] in question_ids]


def make_item_id(source_url: str, section: str | None, number: str) -> str:
    key = "|".join([
        source_url.strip(),
        section or "",
        number.strip(),
    ])

    return str(uuid5(NAMESPACE_URL, key))


def numbered(questions: list[Question], source_url: str) -> list[Question]:
    counters: dict[str | None, int] = {}

    for item in load_items():
        if item["source_url"] == source_url:
            section = item["section"]
            counters[section] = max(counters.get(section, 0), int(item["number"]))

    ordered = []

    for question in questions:
        section = SECTIONS.get(question.type)
        counters[section] = counters.get(section, 0) + 1

        ordered.append(
            question.model_copy(
                update={"section": section, "number": str(counters[section])}
            )
        )

    return ordered


def document_to_items(document: Document) -> list[Item]:
    items: list[Item] = []

    for question in document.questions:
        if question.type not in SECTIONS:
            continue

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

    path = ITEM_BANK_PATH
    path.parent.mkdir(parents=True, exist_ok=True)

    existing_fingerprints: set[str] = set()
    existing_ids: set[str] = set()
    if path.exists():
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                if not line.strip():
                    continue

                old_item = Item.model_validate_json(line)
                existing_fingerprints.add(old_item.fingerprint or make_fingerprint(old_item))
                existing_ids.add(old_item.id)

    new_items: list[Item] = []
    for item in unique_items:
        item.fingerprint = make_fingerprint(item)

        if item.fingerprint in existing_fingerprints or item.id in existing_ids:
            continue

        existing_fingerprints.add(item.fingerprint)
        existing_ids.add(item.id)
        new_items.append(item)

    with open(path.with_suffix(".lock"), "a") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
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


def save_solution(item: Item, student_answer: str | list[bool], evaluation: Evaluation) -> None:
    if evaluation.correct or not evaluation.feedback.strip() or not ITEM_BANK_PATH.exists():
        return

    with open(ITEM_BANK_PATH.with_suffix(".lock"), "a") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        rows = load_items()
        row = next((row for row in rows if row["id"] == item.id), None)
        if row is None or row.get("solution"):
            return

        if item.type == "true_false":
            if not isinstance(student_answer, list) or not (len(student_answer) == len(row["parts"]) == len(evaluation.part_correct)):
                return
            for part, given, correct in zip(row["parts"], student_answer, evaluation.part_correct):
                if not part.get("solution"):
                    part["solution"] = "ĐÚNG." if given == correct else "SAI."
        row["solution"] = evaluation.feedback

        with tempfile.TemporaryDirectory(dir=ITEM_BANK_PATH.parent) as directory:
            temporary = Path(directory) / ITEM_BANK_PATH.name
            temporary.write_text(
                "".join(json.dumps(row, ensure_ascii=False) + "\n" for row in rows),
                encoding="utf-8",
            )
            temporary.replace(ITEM_BANK_PATH)
