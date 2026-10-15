from types import SimpleNamespace

import pytest

from knowledge.bank.main import Item
from roles.tagger import main as tagger


def decision(*questions: list[str]):
    return SimpleNamespace(questions=[SimpleNamespace(knowledge_ids=ids) for ids in questions])


def item(item_id: str) -> Item:
    return Item.model_validate({"id": item_id, "source_url": "", "source_title": "", "number": "1", "type": "short_answer", "content": "Tính tích phân."})


@pytest.fixture
def replies(monkeypatch):
    queue: list = []
    monkeypatch.setattr(tagger, "node_names", lambda: {"TICH_PHAN": "Tích phân", "PARABOL": "Parabol", "XAC_SUAT": "Xác suất"})
    monkeypatch.setattr(tagger, "build_prompt", lambda items: "prompt")
    monkeypatch.setattr(tagger, "tagger", lambda: SimpleNamespace(invoke=lambda prompt: queue.pop(0)))
    return queue


def test_unknown_ids_are_dropped_instead_of_failing_the_batch(replies):
    replies.append(decision(["THE_TICH_KHOI_TRON_XOAY", "TICH_PHAN", "PARABOL"], ["XAC_SUAT"]))

    assert tagger.tag_with_llm([item("a"), item("b")]) == [["TICH_PHAN", "PARABOL"], ["XAC_SUAT"]]


def test_retries_when_a_question_has_no_known_id(replies):
    replies.extend([decision(["BIA_DAT"], ["XAC_SUAT"]), decision(["TICH_PHAN"], ["XAC_SUAT"])])

    assert tagger.tag_with_llm([item("a"), item("b")]) == [["TICH_PHAN"], ["XAC_SUAT"]]


def test_fails_when_a_question_never_gets_a_known_id(replies):
    replies.extend([decision(["BIA_DAT"]), decision(["BIA_DAT"])])

    with pytest.raises(ValueError):
        tagger.tag_with_llm([item("a")])
