from __future__ import annotations

from collections.abc import Callable, Sequence
from concurrent.futures import ThreadPoolExecutor
from contextvars import copy_context
from pathlib import Path
from typing import Any
from dotenv import load_dotenv
from langsmith import traceable

import os

from agents.crawler.main import CrawlerRequest, crawl
from agents.parser.main import parse_question
from agents.teacher.main import evaluate
from agents.teacher.rubric import match_answer
from agents.verifier.main import verify
from common.schema import Document, Evaluation
from agents.learner.service import run_learner
from knowledge.bank.main import build_item_bank
from knowledge.bank.tagger import tag_items


State = dict[str, Any]
Node = Callable[[State], State]


load_dotenv(override=True)

MAX_GRADING_WORKERS = int(os.getenv("MAX_GRADING_WORKERS", "8"))

def run(nodes: Sequence[Node], state: State) -> State:
    for node in nodes:
        state = {**state, **(node(state) or {})}

    return state


@traceable(name="Crawler Agent", run_type="chain")
def crawler_agent(state: State) -> State:
    return {"crawled": crawl(state["request"])}


@traceable(name="Parser Agent", run_type="chain")
def parser_agent(state: State) -> State:
    # PDF/Word URL -> Datalab OCR -> refined.json per document
    return {"refined_paths": parse_question(state["crawled"])}


@traceable(name="Item Bank", run_type="chain")
def item_bank(state: State) -> State:
    items = []

    for path in state["refined_paths"]:
        document = Document.model_validate_json(
            Path(path).read_text(encoding="utf-8")
        )

        # Deduplicates against the existing bank, so this is append-only.
        items.extend(build_item_bank(document))

    # Only new items are tagged, so re-ingesting a document costs no LLM calls.
    return {"items": items, "tags": tag_items(items)}


def graded(submission: dict) -> tuple[Evaluation, bool]:
    matched = match_answer(submission["item"], submission["student_answer"])

    if matched:
        return matched, False

    return evaluate(submission["item"], submission["student_answer"]), True


@traceable(name="Teacher Agent", run_type="chain")
def teacher_agent(state: State) -> State:
    context = copy_context()

    with ThreadPoolExecutor(max_workers=MAX_GRADING_WORKERS) as pool:
        results = list(
            pool.map(lambda submission: context.run(graded, submission), state["submissions"])
        )

    return {
        "evaluations": [evaluation for evaluation, _ in results],
        "needs_review": [needs_review for _, needs_review in results],
    }


@traceable(name="Verifier Agent", run_type="chain")
def verifier_agent(state: State) -> State:
    def reviewed(args: tuple[dict, Evaluation, bool]) -> Evaluation:
        submission, evaluation, needs_review = args

        if not needs_review:
            return evaluation

        return verify(submission["item"], submission["student_answer"], evaluation)

    context = copy_context()
    pending = zip(state["submissions"], state["evaluations"], state["needs_review"])

    with ThreadPoolExecutor(max_workers=MAX_GRADING_WORKERS) as pool:
        return {
            "evaluations": list(pool.map(lambda args: context.run(reviewed, args), pending))
        }


def graded_attempts(state: State) -> list[dict]:
    return [
        {
            "question_id": submission["item"].id,
            "correct": evaluation.correct,
        }
        for submission, evaluation in zip(
            state.get("submissions", []),
            state.get("evaluations", []),
        )
    ]


@traceable(name="Learner Agent", run_type="chain")
def learner_agent(state: State) -> State:
    return run_learner(
        knowledge_id=state.get("knowledge_id"),
        attempts=graded_attempts(state),
    )


@traceable(name="Ingest Pipeline", run_type="chain")
def ingest(request: CrawlerRequest) -> State:
    return run((crawler_agent, parser_agent, item_bank), {"request": request})


@traceable(name="Grading Pipeline", run_type="chain")
def grade(submissions: Sequence[dict]) -> State:
    state = run(
        (teacher_agent, verifier_agent, learner_agent),
        {"submissions": list(submissions)},
    )

    return {
        **state,
        "total_score": round(
            sum(evaluation.score for evaluation in state["evaluations"]), 2
        ),
    }