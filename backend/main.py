from __future__ import annotations

from collections.abc import Callable, Iterable, Sequence
from concurrent.futures import ThreadPoolExecutor
from contextvars import copy_context
from pathlib import Path
from typing import Any
from dotenv import load_dotenv
from langsmith import traceable

import os

from agents.crawler.main import crawl
from agents.crawler.schema import CrawlerRequest
from agents.parser.main import parse_question
from agents.teacher.main import evaluate
from agents.teacher.rubric import match_answer, settled
from agents.verifier.main import verify
from common.schema import Document, Evaluation
from agents.learner.service import crawl_requests, run_learner
from history.main import queue_docs, solved_question_ids, take_doc
from knowledge.bank.main import build_item_bank, source_urls
from knowledge.bank.tagger import tag_items


State = dict[str, Any]
Node = Callable[[State], State]


load_dotenv(override=True)

MAX_GRADING_WORKERS = int(os.getenv("MAX_GRADING_WORKERS", "8"))

def run(
    nodes: Sequence[Node],
    state: State,
    on_node: Callable[[str], None] | None = None,
) -> State:
    for node in nodes:
        if on_node is not None:
            on_node(node.__name__)

        state = {**state, **(node(state) or {})}

    return state


def mapped(fn: Callable[[Any], Any], items: Iterable[Any]) -> list[Any]:
    tasks = [(copy_context(), item) for item in items]

    with ThreadPoolExecutor(max_workers=MAX_GRADING_WORKERS) as pool:
        return list(pool.map(lambda task: task[0].run(fn, task[1]), tasks))


def graded(submission: dict) -> tuple[Evaluation, bool]:
    item, student_answer = submission["item"], submission["student_answer"]
    matched = match_answer(item, student_answer)

    if matched:
        return matched, False

    return evaluate(item, student_answer), not settled(item)


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


@traceable(name="Teacher Agent", run_type="chain")
def teacher_agent(state: State) -> State:
    results = mapped(graded, state["submissions"])

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

    pending = zip(state["submissions"], state["evaluations"], state["needs_review"])

    return {"evaluations": mapped(reviewed, pending)}


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
def ingest(request: CrawlerRequest, on_node: Callable[[str], None] | None = None) -> State:
    state = run((crawler_agent,), {"request": request}, on_node)

    if manual:
        queue_docs(state["crawled"])

        return state

    return run((parser_agent, item_bank), state, on_node)


progress: State | None = None
grading: str | None = None
manual: bool = True


@traceable(name="Manual Ingest", run_type="chain")
def approve(url: str) -> None:
    global progress

    if progress is not None:
        return

    batches = take_doc(url)

    running: State = {"concept": "", "stage": "planning", "step": 0, "total": len(batches)}
    progress = running

    try:
        for step, crawled in enumerate(batches, start=1):
            running.update(concept=crawled.request.concept, step=step)

            run(
                (parser_agent, item_bank),
                {"crawled": crawled},
                lambda stage: running.update(stage=stage),
            )
    finally:
        progress = None


@traceable(name="Practice Stocking", run_type="chain")
def stock_practice(concept: str = "") -> None:
    global progress

    if progress is not None:
        return

    running: State = {"concept": concept, "stage": "planning", "step": 0, "total": 0}
    progress = running

    try:
        requests = crawl_requests(solved_question_ids(), source_urls(), concept)
        running["total"] = len(requests)

        for step, request in enumerate(requests, start=1):
            request.exclude_urls = source_urls()
            running["step"] = step

            ingest(request, lambda stage: running.update(stage=stage))
    finally:
        progress = None


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