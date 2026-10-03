from __future__ import annotations

from pathlib import Path

import json

from api.router import PRACTICE_DURATION, exam_of
from knowledge.bank.main import items_of
from roles.learner.service import GRADE, quest, quest_test


OUT_DIR = Path(__file__).resolve().parents[2] / "frontend" / "public" / "guest"


def write(name: str, test: dict | None) -> None:
    if not test or not test["question_ids"]:
        print(name, "skipped: no questions")
        return

    exam = exam_of(test["id"], test["name"], test["grade"], PRACTICE_DURATION, items_of(set(test["question_ids"])))

    if "stations" in test:
        order = {question_id: position for position, question_id in enumerate(test["question_ids"])}
        exam["questions"].sort(key=lambda question: order[question["id"]])
        for question in exam["questions"]:
            question["station"] = test["stations"][question["id"]]

    (OUT_DIR / f"{name}.json").write_text(json.dumps(exam, ensure_ascii=False), encoding="utf-8")
    missing = [question["id"] for question in exam["questions"] if question["answer"] in ("", [], None)]
    print(name, test["id"], len(exam["questions"]), f"missing answers: {missing}" if missing else "")


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    write(f"{GRADE}-placement", quest_test(f"placement:{GRADE}", []))

    runs = [{"mode": "placement", "exam_id": f"path:{GRADE}", "answers": []}]
    write(f"{GRADE}-checkpoint", quest_test(quest(runs)["placement"]["start"], runs))


if __name__ == "__main__":
    main()
