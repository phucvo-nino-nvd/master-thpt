from __future__ import annotations

from collections.abc import Callable, Iterable, Sequence
from concurrent.futures import ThreadPoolExecutor
from contextvars import copy_context
from pathlib import Path
from threading import Thread
from typing import Any
from dotenv import load_dotenv
from langsmith import traceable
from tqdm import tqdm

import os

from roles.crawler.main import crawl
from roles.crawler.schema import CrawlerRequest
from roles.parser.main import parse_question
from roles.author.main import write_questions
from roles.teacher.main import evaluate
from roles.teacher.rubric import match_answer
from roles.verifier.main import verify
from roles.learner.main import diagnose_answer
from roles.learner.service import MIN_QUESTIONS, crawl_requests, run_learner, stocked_count
from roles.tagger.main import BATCH_SIZE, save_tags, tag_with_llm
from common.schema import Document, Evaluation
from common.utils import normalized, write_json
from history.main import queue_docs, solved_question_ids, take_doc
from knowledge.bank.main import GENERATED_PREFIX, Item, build_item_bank, numbered, source_urls
from knowledge.graph.convert import node_map


State = dict[str, Any]
Node = Callable[[State], State]


load_dotenv(override=True)

MAX_GRADING_WORKERS = int(os.getenv("MAX_GRADING_WORKERS", "8"))
ARTIFACTS = Path(__file__).resolve().parents[1] / "artifacts"

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

    return evaluate(item, student_answer), True


@traceable(name="Crawler", run_type="chain")
def crawler_agent(state: State) -> State:
    return {"crawled": crawl(state["request"])}


@traceable(name="Parser", run_type="chain")
def parser_agent(state: State) -> State:
    # PDF/Word URL -> Datalab OCR -> refined.json per document
    return {"refined_paths": parse_question(state["crawled"])}


@traceable(name="Author", run_type="chain")
def author_agent(state: State) -> State:
    request = state["request"]

    questions = write_questions(
        request.concept,
        request.grade,
        MIN_QUESTIONS - stocked_count(request.concept, solved_question_ids()),
    )

    if not questions:
        return {"refined_paths": []}

    source_url = f"{GENERATED_PREFIX}{normalized(request.concept).replace(' ', '-')}"

    document = Document(
        source_url=source_url,
        title=f"Câu tự sinh: {request.concept}",
        grade=request.grade,
        questions=numbered(questions, source_url),
    )

    path = ARTIFACTS / "data" / document.title / "refined.json"
    write_json(path, document.model_dump())

    return {"refined_paths": [path]}


@traceable(name="Tagger", run_type="chain")
def tagger(items: list[Item]) -> dict[str, list[str]]:
    tags: dict[str, list[str]] = {}
    failures: list[str] = []
    seen_ids: set[str] = set()

    for item in items:
        if item.id in seen_ids:
            raise ValueError(f"Duplicate item id: {item.id}")

        seen_ids.add(item.id)

    batches = [
        items[start:start + BATCH_SIZE]
        for start in range(0, len(items), BATCH_SIZE)
    ]

    for batch in tqdm(batches, unit="batch"):
        try:
            knowledge_ids = tag_with_llm(batch)
        except ValueError as error:
            failures.extend(f"{item.id}: {error}" for item in batch)
            continue

        for item, item_knowledge_ids in zip(batch, knowledge_ids):
            tags[item.id] = item_knowledge_ids

    save_tags(tags)

    if failures:
        raise ValueError(
            f"Tagged {len(tags)}/{len(items)} items, "
            f"{len(failures)} failed:\n" + "\n".join(failures)
        )

    return tags


@traceable(name="Teacher", run_type="chain")
def teacher_agent(state: State) -> State:
    results = mapped(graded, state["submissions"])

    return {
        "evaluations": [evaluation for evaluation, _ in results],
        "needs_review": [needs_review for _, needs_review in results],
    }


@traceable(name="Verifier", run_type="chain")
def verifier_agent(state: State) -> State:
    def reviewed(args: tuple[dict, Evaluation, bool]) -> Evaluation:
        submission, evaluation, needs_review = args

        if not needs_review:
            return evaluation

        return verify(submission["item"], submission["student_answer"], evaluation)

    pending = zip(state["submissions"], state["evaluations"], state["needs_review"])

    return {"final_evaluations": mapped(reviewed, pending)}


def graded_attempts(state: State) -> list[dict]:
    return [
        {
            "question_id": submission["item"].id,
            "type": submission["item"].type,
            "correct": evaluation.correct,
            "diagnosis": diagnosis.model_dump() if diagnosis else None,
        }
        for submission, evaluation, diagnosis in zip(
            state.get("submissions", []),
            state.get("final_evaluations", []),
            state.get("error_diagnoses", []),
        )
    ]


@traceable(name="Learner", run_type="chain")
def learner_agent(state: State) -> State:
    if not state.get("user_id"):
        error_diagnoses = [None] * len(state["submissions"])
    else:
        def classified(args: tuple[dict, Evaluation, Evaluation]) -> Any:
            submission, teacher_evaluation, final_evaluation = args

            if final_evaluation.correct:
                return None

            return diagnose_answer(
                submission["item"],
                submission["student_answer"],
                teacher_evaluation,
                final_evaluation,
            )

        error_diagnoses = mapped(
            classified,
            zip(
                state["submissions"],
                state["evaluations"],
                state["final_evaluations"],
            ),
        )

    state = {**state, "error_diagnoses": error_diagnoses}
    learned = run_learner(
        knowledge_id=state.get("knowledge_id"),
        attempts=graded_attempts(state),
        user_id=state.get("user_id"),
    )
    concept = restock_concept(learned)

    if concept is not None:
        Thread(target=stock_practice, args=(concept,), daemon=True).start()

    return {**learned, "error_diagnoses": error_diagnoses}


def restock_concept(state: State) -> str | None:
    nodes = node_map()

    touched = [
        updated
        for updated in state["knowledge_states"]
        if updated["knowledge_id"] in nodes
    ]

    if not touched:
        return None

    weakest = min(touched, key=lambda updated: updated["mastery"])

    return nodes[weakest["knowledge_id"]]["name"]


@traceable(name="[INGEST]: Item Bank", run_type="chain")
def item_bank(state: State) -> State:
    items = []

    for path in state["refined_paths"]:
        document = Document.model_validate_json(
            Path(path).read_text(encoding="utf-8")
        )

        # Deduplicates against the existing bank, so this is append-only.
        items.extend(build_item_bank(document))

    # Only new items are tagged, so re-ingesting a document costs no LLM calls.
    return {"items": items, "tags": tagger(items)}


@traceable(name="[INGEST]: Content Ingestion", run_type="chain")
def ingest(request: CrawlerRequest, on_node: Callable[[str], None] | None = None) -> State:
    state = run((crawler_agent,), {"request": request}, on_node)

    if not state["crawled"].docs:
        return run((author_agent, item_bank), state, on_node)

    if manual:
        queue_docs(state["crawled"])

        return state

    return run((parser_agent, item_bank), state, on_node)


progress: State | None = None
grading: str | None = None
manual: bool = True


@traceable(name="[INGEST]: Manual Ingest", run_type="chain")
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


@traceable(name="[INGEST]: Practice Stocking", run_type="chain")
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


@traceable(name="[GRADING]: Submission Grading", run_type="chain")
def grade(submissions: Sequence[dict], *, user_id: str | None = None) -> State:
    state = run(
        (teacher_agent, verifier_agent, learner_agent),
        {"submissions": list(submissions), "user_id": user_id},
    )

    return {
        **state,
        "total_score": round(
            sum(evaluation.score for evaluation in state["final_evaluations"]), 2
        ),
    }
