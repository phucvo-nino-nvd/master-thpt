from pathlib import Path

import sys

BACKEND = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND))

from common.schema import Document
from knowledge.bank.main import Item, build_item_bank
from knowledge.bank.tagger import BATCH_SIZE, node_names, tag_items


ROOT = BACKEND.parent
BANK_PATH = ROOT / "artifacts" / "item_bank.jsonl"


def load_bank(path: Path) -> list[Item]:
    return [
        Item.model_validate_json(line)
        for line in path.read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]


if __name__ == "__main__":
    refined_path = (
        Path(sys.argv[1])
        if len(sys.argv) > 1
        else ROOT / "artifacts" / "data" / "sample" / "refined.json"
    )

    document = Document.model_validate_json(
        refined_path.read_text(encoding="utf-8")
    )

    items = build_item_bank(document)

    print(
        f"{refined_path}: {len(document.questions)} câu"
        f" -> {len(items)} item mới"
    )

    for item in items:
        print(
            f"  PHẦN {item.section} - Câu {item.number}"
            f" [{item.type}] {item.id}"
        )

    # Chạy lại cùng document phải ra 0 item mới (dedup + id deterministic).
    assert build_item_bank(document) == [], "dedup không chặn được lần chạy thứ 2"

    bank = load_bank(BANK_PATH)
    names = node_names()

    batches = -(-len(bank) // BATCH_SIZE)

    print(f"\n{BANK_PATH}: {len(bank)} item -> gọi LLM {batches} lần")

    tags = tag_items(bank)

    for item in bank:
        knowledge_id = tags[item.id]

        print(
            f"  PHẦN {item.section} - Câu {item.number}"
            f" -> {names[knowledge_id]} ({knowledge_id})"
        )

    assert len(tags) == len(bank), "thiếu mapping cho một số item"
