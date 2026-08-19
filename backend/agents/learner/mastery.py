from __future__ import annotations

from dotenv import load_dotenv

import os


load_dotenv()

INITIAL_MASTERY = float(os.getenv("MASTERY_INITIAL", "0.5"))
CORRECT_RATE = float(os.getenv("MASTERY_CORRECT_RATE", "0.20"))
INCORRECT_RATE = float(os.getenv("MASTERY_INCORRECT_RATE", "0.25"))


def update_mastery(
    mastery: float | None,
    *,
    correct: bool,
) -> float:
    current = INITIAL_MASTERY if mastery is None else mastery

    if correct:
        return current + CORRECT_RATE * (1.0 - current)

    return current - INCORRECT_RATE * current