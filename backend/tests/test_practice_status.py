from __future__ import annotations

from contextvars import ContextVar
from threading import Barrier

import pytest

from agents.crawler.schema import CrawledDoc, CrawlerRequest, CrawlerResponse
from history import db, main as history

import main


@pytest.fixture
def history_db(tmp_path, monkeypatch):
    monkeypatch.setattr(db, "DB_PATH", tmp_path / "history" / "history.db")

    db.init_db()


def crawled(*urls: str) -> CrawlerResponse:
    return CrawlerResponse(
        request=CrawlerRequest(grade=12, concept="Đạo hàm"),
        query="q",
        docs=[CrawledDoc(url=url, title=url.upper(), score=0.5) for url in urls],
        missing=0,
    )


def test_run_reports_each_node_in_order():
    seen: list[str] = []

    def first(state):
        return {"first": True}

    def second(state):
        return {"second": True}

    state = main.run((first, second), {}, seen.append)

    assert seen == ["first", "second"]
    assert state == {"first": True, "second": True}


def test_stock_practice_publishes_progress_then_clears(monkeypatch):
    snapshots: list[dict] = []

    monkeypatch.setattr(main, "solved_question_ids", lambda: set())
    monkeypatch.setattr(main, "source_urls", lambda: [])
    monkeypatch.setattr(
        main,
        "crawl_requests",
        lambda solved, urls, concept: [CrawlerRequest(grade=12, concept="A"), CrawlerRequest(grade=12, concept="B")],
    )

    def fake_ingest(request, on_node=None):
        for stage in ("crawler_agent", "parser_agent", "item_bank"):
            on_node(stage)
            snapshots.append(dict(main.progress))

        return {}

    monkeypatch.setattr(main, "ingest", fake_ingest)

    main.stock_practice("Đạo hàm")

    assert main.progress is None
    assert [(shot["stage"], shot["step"]) for shot in snapshots] == [
        ("crawler_agent", 1),
        ("parser_agent", 1),
        ("item_bank", 1),
        ("crawler_agent", 2),
        ("parser_agent", 2),
        ("item_bank", 2),
    ]
    assert {shot["concept"] for shot in snapshots} == {"Đạo hàm"}
    assert {shot["total"] for shot in snapshots} == {2}


def test_mapped_runs_tasks_concurrently_in_separate_contexts():
    marker = ContextVar("marker", default="unset")
    marker.set("parent")

    barrier = Barrier(4, timeout=5)

    def slow(item: int) -> tuple[int, str]:
        barrier.wait()

        return item, marker.get()

    assert main.mapped(slow, range(4)) == [(index, "parent") for index in range(4)]


def test_manual_mode_queues_urls_until_approved(history_db, monkeypatch):
    parsed: list[list[str]] = []

    monkeypatch.setattr(main, "crawl", lambda request: crawled("a.pdf", "b.pdf"))
    monkeypatch.setattr(main, "manual", True)
    monkeypatch.setattr(
        main,
        "parse_question",
        lambda crawled: parsed.append([doc.url for doc in crawled.docs]) or [],
    )

    main.ingest(CrawlerRequest(grade=12, concept="Đạo hàm"))

    assert parsed == []
    assert [doc.url for doc in history.queued_docs()[0].docs] == ["a.pdf", "b.pdf"]

    history.drop_doc("a.pdf")
    main.approve("b.pdf")

    assert parsed == [["b.pdf"]]
    assert history.queued_docs() == []
    assert main.progress is None


def test_queue_keeps_one_row_per_url(history_db):
    history.queue_docs(crawled("a.pdf"))
    history.queue_docs(crawled("a.pdf", "b.pdf"))

    assert [doc.url for doc in history.queued_docs()[0].docs] == ["a.pdf", "b.pdf"]


def test_busy_pipeline_rejects_new_request_instead_of_dropping_it(monkeypatch):
    from fastapi import HTTPException

    from api import router

    monkeypatch.setattr(
        main,
        "progress",
        {"concept": "Đạo hàm", "stage": "crawler_agent", "step": 1, "total": 2},
    )

    with pytest.raises(HTTPException) as raised:
        router.reject_if_busy()

    assert raised.value.status_code == 409
    assert "Đạo hàm" in raised.value.detail


def test_restock_targets_the_weakest_node_just_graded(monkeypatch):
    monkeypatch.setattr(
        main,
        "node_map",
        lambda: {"a": {"name": "Đạo hàm"}, "b": {"name": "Tích phân"}},
    )

    state = {
        "knowledge_states": [
            {"knowledge_id": "b", "mastery": 0.7},
            {"knowledge_id": "a", "mastery": 0.2},
            {"knowledge_id": "unmapped", "mastery": 0.0},
        ]
    }

    assert main.restock_concept(state) == "Đạo hàm"
    assert main.restock_concept({"knowledge_states": []}) is None


def test_check_question_publishes_grading_then_clears(monkeypatch):
    from types import SimpleNamespace

    from api import router
    from api.schema import CheckRequest

    seen: list[str | None] = []

    monkeypatch.setattr(router, "submission_of", lambda question_id, answer: {})
    monkeypatch.setattr(router, "get_history", lambda history_id: SimpleNamespace(exam_id="node-1"))
    monkeypatch.setattr(router, "save_answer", lambda *args: None)
    monkeypatch.setattr(
        router,
        "grade",
        lambda submissions: seen.append(main.grading) or {"evaluations": ["graded"]},
    )

    request = CheckRequest(history_id="h1", question_id="q1", student_answer="3")

    assert router.post_practice_check(request) == "graded"
    assert seen == ["node-1"]
    assert main.grading is None
