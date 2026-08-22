from common.schema import Option, Question
from agents.parser.refine import rescued
from agents.teacher.rubric import answer_of, match_answer
from api import router
from knowledge.bank import main as bank

import pytest


@pytest.fixture
def bank_file(tmp_path, monkeypatch):
    monkeypatch.setattr(bank, "ITEM_BANK_PATH", tmp_path / "item_bank.jsonl")


def authored(question_type: str, content: str) -> Question:
    return Question(number="", type=question_type, content=content)


def test_rescued_pulls_options_out_of_the_stem():
    question = rescued(
        authored(
            "multiple_choice",
            "Đạo hàm của y = x^3 là A. y' = 3x^2. B. y' = x^2. C. y' = 3x. D. y' = 2x.",
        )
    )

    assert [option.label for option in question.options] == ["A", "B", "C", "D"]
    assert "A." not in question.content
    assert "$" in question.content


def test_rescued_keeps_options_the_author_already_split():
    question = authored("multiple_choice", "Đạo hàm của $y = x^3$ là")
    question.options = [Option(label="A", content="3x^2")]

    assert rescued(question).options[0].content == "$3x^2$"


def test_generated_items_stay_out_of_the_original_exam_shelf(monkeypatch):
    monkeypatch.setattr(
        router,
        "load_items",
        lambda: [
            {"id": "a", "source_url": "https://toanmath.com/de.pdf", "source_title": "Đề gốc", "number": "1", "grade": 12},
            {"id": "b", "source_url": "generated://dao-ham", "source_title": "Câu tự sinh", "number": "1", "grade": 12},
        ],
    )
    monkeypatch.setattr(router, "attempted_exam_ids", lambda: set())

    assert [document.title for document in router.list_documents()] == ["Đề gốc"]


def test_latex_wrapped_short_answer_key_still_matches_typed_text():
    item = bank.Item(
        id="q1",
        source_url="generated://dao-ham",
        source_title="Câu tự sinh",
        number="1",
        type="short_answer",
        content="Tính $v(2)$.",
        solution="Kết quả: $-4.6$",
    )

    assert answer_of(item) == "$-4.6$"
    assert match_answer(item, "-4,6") is not None


def test_numbered_continues_after_the_existing_batch(bank_file):
    source_url = "generated://dao-ham"

    first = bank.numbered([authored("multiple_choice", "Câu một")], source_url)
    bank.build_item_bank(
        bank.Document(source_url=source_url, title="Câu tự sinh", questions=first)
    )

    second = bank.numbered([authored("multiple_choice", "Câu hai")], source_url)

    assert (first[0].section, first[0].number) == ("I", "1")
    assert (second[0].section, second[0].number) == ("I", "2")

    written = bank.build_item_bank(
        bank.Document(source_url=source_url, title="Câu tự sinh", questions=second)
    )

    assert len(written) == 1


def test_rescued_promotes_an_unknown_stem_that_still_holds_its_options():
    question = rescued(
        authored(
            "unknown",
            "Biết $\\int_0^2 f(x)dx = 4$ thì $\\int_0^2 f(x) - 1 dx$ bằng\n\nA. 3.\n\nB. 5.\n\nC. -3.\n\nD. 2.",
        )
    )

    assert question.type == "multiple_choice"
    assert [option.label for option in question.options] == ["A", "B", "C", "D"]
    assert "A. 3" not in question.content


def test_rescued_leaves_a_short_answer_stem_intact():
    content = "Cho tam giác cân tại A. Biết cạnh AB dài 3. Tính chu vi."
    question = rescued(authored("short_answer", content))

    assert question.type == "short_answer"
    assert question.options == []
    assert "Tính chu vi" in question.content


def test_authored_schema_never_asks_for_the_answer():
    import json

    from agents.teacher.schema import AuthoredQuestions

    schema = AuthoredQuestions.model_json_schema()

    assert "solution" not in json.dumps(schema)
    assert schema["$defs"]["AuthoredQuestion"]["required"] == [
        "number",
        "type",
        "content",
        "options",
        "parts",
    ]


def test_authored_question_reaches_the_bank_without_a_key(bank_file):
    from agents.teacher.rubric import answer_of, match_answer
    from agents.teacher.schema import AuthoredQuestion

    authored_question = AuthoredQuestion(
        number="",
        type="short_answer",
        content="Tính $\\int_0^1 2x\\,dx$.",
        options=[],
        parts=[],
    )
    source_url = "generated://tich-phan"

    written = bank.build_item_bank(
        bank.Document(
            source_url=source_url,
            title="Câu tự sinh",
            questions=bank.numbered([authored_question], source_url),
        )
    )

    assert written[0].solution is None
    assert answer_of(written[0]) == ""
    assert match_answer(written[0], "1") is None


def test_bank_refuses_a_question_the_rubric_cannot_score(bank_file):
    written = bank.build_item_bank(
        bank.Document(
            source_url="https://toanmath.com/de.pdf",
            title="Đề gốc",
            questions=[
                Question(number="1", type="multiple_choice", content="Câu chấm được"),
                Question(number="2", type="unknown", content="Câu tự luận"),
            ],
        )
    )

    assert [item.number for item in written] == ["1"]
