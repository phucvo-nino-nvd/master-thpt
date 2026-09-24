from __future__ import annotations

from roles.teacher.rubric import apply_rubric, settled
from common.schema import Evaluation
from knowledge.bank.main import Item


def choice_item(solution: str) -> Item:
    return Item.model_validate(
        {
            "id": "q2",
            "source_url": "http://x/a.pdf",
            "source_title": "a",
            "section": "Phần I",
            "number": "1",
            "grade": 12,
            "type": "multiple_choice",
            "content": "c",
            "options": [{"label": label, "content": label} for label in "ABCD"],
            "parts": [],
            "images": [],
            "solution": solution,
        }
    )


KEYED_CHOICE = choice_item("Lời giải. Chọn **A**.")
UNKEYED_CHOICE = choice_item("Lời giải bị mất đáp án.")


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


def test_choice_key_overrules_the_llm_in_both_directions():
    wrong = apply_rubric(KEYED_CHOICE, "B", Evaluation(score=0.0, correct=True, feedback=""))

    assert not wrong.correct
    assert wrong.score == 0.0

    right = apply_rubric(KEYED_CHOICE, "A", Evaluation(score=0.0, correct=False, feedback=""))

    assert right.correct
    assert right.score == 0.25


def test_choice_without_a_key_still_leaves_the_verdict_to_the_llm():
    graded = apply_rubric(UNKEYED_CHOICE, "B", Evaluation(score=0.0, correct=True, feedback=""))

    assert graded.correct


def test_only_a_keyed_choice_skips_the_verifier():
    assert settled(KEYED_CHOICE)
    assert not settled(UNKEYED_CHOICE)
