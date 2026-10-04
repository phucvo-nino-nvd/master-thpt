from concurrent.futures import ThreadPoolExecutor

import pytest
from langsmith import tracing_context

import main
from common.schema import Document, Evaluation, Question, QuestionPart
from knowledge.bank import main as bank
from roles.teacher.main import reference_solution
from roles.teacher.rubric import answer_of


@pytest.fixture(autouse=True)
def isolated_bank(tmp_path, monkeypatch):
    monkeypatch.setattr(bank, "ITEM_BANK_PATH", tmp_path / "item_bank.jsonl")
    with tracing_context(enabled=False):
        yield


def stock(kind="multiple_choice", **kwargs):
    return bank.build_item_bank(Document(
        source_url="test://exam", title="Exam",
        questions=[Question(number="1", type=kind, content="Question", **kwargs)],
    ))[0]


def grade(item, answer):
    return main.run(
        (main.teacher_agent, main.verifier_agent),
        {"submissions": [{"item": item, "student_answer": answer}]},
    )["final_evaluations"][0]


@pytest.mark.parametrize("kind,first,second", [
    ("multiple_choice", "B", "C"),
    ("short_answer", "3", "4"),
])
def test_verified_answer_is_reused_by_the_next_user(monkeypatch, kind, first, second):
    item = stock(kind)
    calls = []
    final = Evaluation(score=0, correct=False, feedback="Đáp án đúng là 2, tương ứng phương án A.")

    def evaluate(item, answer):
        calls.append(("teacher", reference_solution(item)))
        return Evaluation(score=0, correct=False, feedback="Nhận xét chưa được kiểm tra.")

    def verify(item, answer, evaluation):
        calls.append(("verifier", ""))
        return final

    monkeypatch.setattr(main, "evaluate", evaluate)
    monkeypatch.setattr(main, "verify", verify)

    assert grade(item, first) == final
    saved = bank.Item.model_validate(bank.load_items()[0])
    assert saved.solution == final.feedback
    assert saved.id == item.id
    assert saved.fingerprint == item.fingerprint

    grade(saved, second)
    assert [role for role, _ in calls] == ["teacher", "verifier", "teacher"]
    assert final.feedback in calls[-1][1]


def test_true_false_caches_statement_truth_not_student_correctness(monkeypatch):
    item = stock("true_false", parts=[
        QuestionPart(label=label, content=label) for label in "abcd"
    ])
    final = Evaluation(
        score=0.25, correct=False, part_correct=[False, False, True, True],
        feedback="Hai ý đầu chưa đúng.",
    )
    monkeypatch.setattr(main, "evaluate", lambda *args: final)
    monkeypatch.setattr(main, "verify", lambda *args: final)

    grade(item, [True, False, True, False])
    saved = bank.Item.model_validate(bank.load_items()[0])
    assert answer_of(saved) == [False, True, True, False]
    assert main.graded({"item": saved, "student_answer": [True] * 4})[1] is False


def test_a_correct_confirmation_is_not_saved_as_a_solution(monkeypatch):
    item = stock()
    final = Evaluation(score=0.25, correct=True, feedback="Đúng.")
    monkeypatch.setattr(main, "evaluate", lambda *args: final)
    monkeypatch.setattr(main, "verify", lambda *args: final)
    grade(item, "A")
    assert bank.load_items()[0]["solution"] is None


def test_failed_verification_does_not_write_a_solution(monkeypatch):
    item = stock()
    monkeypatch.setattr(main, "evaluate", lambda *args: Evaluation(score=0, correct=False, feedback="Chọn B."))

    def fail(*args):
        raise ValueError("verification failed")

    monkeypatch.setattr(main, "verify", fail)
    with pytest.raises(ValueError, match="verification failed"):
        grade(item, "A")
    assert bank.load_items()[0]["solution"] is None


def test_saving_keeps_existing_answers_and_other_items():
    items = bank.build_item_bank(Document(
        source_url="test://exam", title="Exam", questions=[
            Question(number="1", type="multiple_choice", content="First", solution="Chọn A."),
            Question(number="2", type="short_answer", content="Second"),
        ],
    ))
    for item in items:
        bank.save_solution(item, "B", Evaluation(score=0, correct=False, feedback="Kết quả: 2."))
    rows = bank.load_items()
    assert rows[0]["solution"] == "Chọn A."
    assert rows[1]["solution"] == "Kết quả: 2."
    assert rows[1]["content"] == "Second"


def test_concurrent_ingest_and_solution_save_keep_both_changes():
    item = stock()
    evaluation = Evaluation(score=0, correct=False, feedback="Chọn A.")
    document = Document(source_url="test://new", title="New", questions=[
        Question(number="1", type="short_answer", content="Another question"),
    ])
    with ThreadPoolExecutor(max_workers=2) as pool:
        tasks = [pool.submit(bank.save_solution, item, "B", evaluation), pool.submit(bank.build_item_bank, document)]
        for task in tasks:
            task.result()
    rows = bank.load_items()
    assert len(rows) == 2
    assert next(row for row in rows if row["id"] == item.id)["solution"] == "Chọn A."
