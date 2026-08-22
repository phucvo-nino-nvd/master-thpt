from __future__ import annotations

import pytest

from history import db, main


@pytest.fixture
def history_db(tmp_path, monkeypatch):
    monkeypatch.setattr(db, "DB_PATH", tmp_path / "history" / "history.db")

    db.init_db()


def answer_correctly(question_id: str, days_ago: int) -> None:
    with db.get_connection() as conn:
        conn.execute(
            """
            INSERT INTO history (id, exam_id, mode)
            VALUES (?, 'E1', 'practice')
            """,
            (question_id,),
        )
        conn.execute(
            """
            INSERT INTO history_question (
                history_id,
                question_id,
                student_answer,
                correct,
                score,
                feedback,
                answered_at
            )
            VALUES (?, ?, '"2"', 1, 1.0, '', datetime('now', ?))
            """,
            (question_id, question_id, f"-{days_ago} days"),
        )


def test_solved_question_returns_to_practice_after_interval(history_db):
    answer_correctly("fresh", 0)
    answer_correctly("stale", main.REVIEW_DAYS + 1)

    assert main.solved_question_ids() == {"fresh"}


def test_streak_counts_back_from_the_last_day_practiced(history_db):
    assert main.streak() == 0

    answer_correctly("today", 0)
    answer_correctly("also-today", 0)
    answer_correctly("yesterday", 1)
    answer_correctly("two-days-ago", 2)
    answer_correctly("old", 5)

    assert main.streak() == 3


def test_streak_survives_a_day_not_yet_practiced_but_not_two(history_db):
    answer_correctly("yesterday", 1)

    assert main.streak() == 1

    with db.get_connection() as conn:
        conn.execute("DELETE FROM history_question")

    answer_correctly("two-days-ago", 2)

    assert main.streak() == 0
