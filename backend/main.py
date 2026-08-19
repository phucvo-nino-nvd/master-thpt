from __future__ import annotations

from collections.abc import Callable, Sequence
from pathlib import Path
from typing import Any
from dotenv import load_dotenv
from langsmith import traceable

from agents.crawler.pipeline import CrawlerRequest, crawl
from agents.parser.pipeline import parse_question
from agents.parser.schema import Document
from agents.learner.service import run_learner
from knowledge.bank.pipeline import build_item_bank
from knowledge.bank.tagger import tag_items


State = dict[str, Any]
Node = Callable[[State], State]


load_dotenv(override=True)

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


@traceable(name="Learner Agent", run_type="chain")
def learner_agent(state: State) -> State:
    return run_learner(
        knowledge_id=state.get("knowledge_id"),
        attempts=state.get("attempts", []),
    )


@traceable(name="Ingest Pipeline", run_type="chain")
def ingest(request: CrawlerRequest) -> State:
    return run((crawler_agent, parser_agent, item_bank), {"request": request})


@traceable(name="Tutor Pipeline", run_type="chain")
def tutor(
    knowledge_id: str | None = None,
    attempts: Sequence[dict] = (),
) -> State:
    return run(
        (learner_agent,),
        {"knowledge_id": knowledge_id, "attempts": list(attempts)},
    )