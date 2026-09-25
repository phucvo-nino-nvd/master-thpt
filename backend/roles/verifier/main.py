from __future__ import annotations

from functools import lru_cache
from langchain_core.messages import BaseMessage, HumanMessage
from langsmith import traceable

import os

from roles.teacher.main import answer_text, question_block, reference_solution
from roles.teacher.rubric import apply_rubric
from common.schema import Evaluation
from common.utils import chat_model
from knowledge.bank.main import Item
from .context import VERIFY_CONTEXT
from .tools import TOOLS, tool_messages


VERIFIER_MODEL = os.getenv("OPENROUTER_VERIFIER_MODEL")
TOOL_TURNS = int(os.getenv("VERIFIER_TOOL_TURNS", "2"))


@lru_cache(maxsize=1)
def verifier():
    return chat_model(VERIFIER_MODEL).bind_tools(TOOLS).with_structured_output(
        Evaluation,
        method="json_schema",
        strict=True,
        include_raw=True,
    )


@lru_cache(maxsize=1)
def calculator():
    return chat_model(VERIFIER_MODEL).bind_tools(TOOLS, tool_choice="any")


def answered(messages: list[BaseMessage], reply: BaseMessage) -> bool:
    results = tool_messages(reply)

    if not results:
        return False

    messages.append(reply)
    messages.extend(results)

    return True


def build_verify_prompt(item: Item, student_answer: str | list[bool], evaluation: Evaluation) -> str:
    sections = [
        VERIFY_CONTEXT,
        question_block(item),
        reference_solution(item),
    ]

    if item.parts:
        sections.append(f"Return exactly {len(item.parts)} booleans in part_correct.")

    sections.append(f"Student answer:\n{answer_text(item, student_answer) or '(empty)'}")

    sections.append(
        "Decision under review:\n"
        f"correct: {evaluation.correct}\n"
        f"part_correct: {evaluation.part_correct}\n"
        f"score: {evaluation.score}\n"
        f"feedback: {evaluation.feedback}"
    )

    return "\n\n".join(section for section in sections if section)


@traceable(name="[VERIFIER]: Verify evaluation")
def verify(item: Item, student_answer: str | list[bool], evaluation: Evaluation) -> Evaluation:
    messages: list[BaseMessage] = [
        HumanMessage(build_verify_prompt(item, student_answer, evaluation))
    ]

    answered(messages, calculator().invoke(messages))

    reviewed = None

    for _ in range(TOOL_TURNS + 2):
        result = verifier().invoke(messages)

        if answered(messages, result["raw"]):
            continue

        if result["parsed"] is None:
            continue

        reviewed = Evaluation.model_validate(result["parsed"])

        if len(reviewed.part_correct) == len(item.parts):
            return apply_rubric(item, student_answer, reviewed)

    raise ValueError(
        f"Verifier judged {len(reviewed.part_correct) if reviewed else 0} sub-statements "
        f"for item {item.id} which has {len(item.parts)}"
    )
