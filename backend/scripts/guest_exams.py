from __future__ import annotations

from pathlib import Path

import json

from api.router import PRACTICE_DURATION, exam_of
from knowledge.bank.main import items_of
from roles.learner.service import PLACEMENT_QUESTIONS, pick_questions, quest, quest_groups, quest_test


OUT_DIR = Path(__file__).resolve().parents[2] / "frontend" / "public" / "guest"


def write(name: str, test: dict | None) -> None:
    if not test or not test["question_ids"]:
        print(name, "skipped: no questions")
        return

    exam = exam_of(test["id"], test["name"], test["grade"], PRACTICE_DURATION, items_of(set(test["question_ids"])))
    (OUT_DIR / f"{name}.json").write_text(json.dumps(exam, ensure_ascii=False), encoding="utf-8")
    print(name, test["id"], len(exam["questions"]))


def main() -> None:
    _, groups = quest_groups()
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for grade in (10, 11, 12):
        probe = quest([], grade)["placement"]["probe"]
        write(f"{grade}-placement", probe and {
            "id": probe,
            "name": "Bài xác định trình độ",
            "grade": grade,
            "question_ids": pick_questions(groups[probe], PLACEMENT_QUESTIONS, {}),
        })

        runs = [{"mode": "placement", "exam_id": f"path:{grade}", "answers": []}]
        write(f"{grade}-checkpoint", quest_test(quest(runs)["placement"]["start"], runs))


if __name__ == "__main__":
    main()
