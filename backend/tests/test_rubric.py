from __future__ import annotations

from agents.teacher.rubric import apply_rubric
from common.schema import Evaluation
from knowledge.bank.main import Item


ITEM = Item.model_validate(
    {
        "id": "q1",
        "source_url": "http://x/a.pdf",
        "source_title": "a",
        "section": "Phần II",
        "number": "1",
        "grade": 12,
        "type": "true_false",
        "content": "c",
        "options": [],
        "parts": [
            {"label": "a", "content": "a", "solution": "ĐÚNG."},
            {"label": "b", "content": "b", "solution": "**SAI**."},
        ],
        "images": [],
        "solution": "",
    }
)


def test_part_correct_comes_from_the_reference_solution_not_the_llm():
    graded = apply_rubric(ITEM, [True, False], Evaluation(score=0.0, correct=False, feedback="", part_correct=[False, False]))

    assert graded.part_correct == [True, True]
    assert graded.correct


def test_missing_answers_stay_wrong_and_keep_one_flag_per_part():
    graded = apply_rubric(ITEM, [], Evaluation(score=0.0, correct=False, feedback="", part_correct=[True, True]))

    assert graded.part_correct == [False, False]
    assert not graded.correct
