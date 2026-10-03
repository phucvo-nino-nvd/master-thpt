from types import SimpleNamespace
import sqlite3

import pytest
from fastapi import BackgroundTasks
from langsmith import tracing_context
from common.schema import Evaluation, QuestionPart
from history import db, main as history
from knowledge.bank.main import Item
from roles.teacher import main as teacher
from roles.teacher.rubric import maximum_score, question_score, score_on_ten


@pytest.fixture(autouse=True)
def no_tracing():
    with tracing_context(enabled=False):
        yield


def item(qid, kind='multiple_choice'):
    return Item(id=qid, source_url='test://exam', source_title='Exam', number=qid,
                type=kind, content='Question', solution='Chọn A.',
                parts=[QuestionPart(label=c, content=c, solution='ĐÚNG.') for c in 'abcd'] if kind == 'true_false' else [])


@pytest.fixture
def history_db(tmp_path, monkeypatch):
    monkeypatch.setattr(db, 'DB_PATH', tmp_path / 'history.db')
    db.init_db()
    monkeypatch.setattr(history, 'load_items', lambda: [])


@pytest.mark.parametrize('count,expected', [(5, 6.0), (10, 3.0)])
def test_same_three_correct_answers_are_scaled_to_actual_test_length(history_db, count, expected):
    attempt = history.start_history('test', 'checkpoint')
    for i in range(count):
        history.save_answer(attempt.history_id, str(i), 'A',
            Evaluation(score=.25 if i < 3 else 0, correct=i < 3, feedback=''), max_score=.25)
    assert history.get_history(attempt.history_id).total_score == expected
    assert history.list_history()[0].total_score == expected


def test_mixed_rubric_retains_partial_true_false_credit(history_db):
    attempt = history.start_history('mixed', 'practice')
    items = [item('mc'), item('tf', 'true_false'), item('sa', 'short_answer')]
    verdicts = [Evaluation(score=.25, correct=True, feedback=''),
                Evaluation(score=question_score('true_false', False, [True, True, False, False]), correct=False, part_correct=[True, True, False, False], feedback=''),
                Evaluation(score=.5, correct=True, feedback='')]
    for q, verdict in zip(items, verdicts):
        history.save_answer(attempt.history_id, q.id, 'A', verdict, max_score=maximum_score(q))
    detail = history.get_history(attempt.history_id)
    assert detail.correct_count == 2
    assert detail.total_score == 5.71  # (0.25 + 0.25 + 0.5) / (0.25 + 1 + 0.5) * 10
    assert [q.evaluation.score for q in detail.questions] == [.25, .25, .5]


def test_existing_history_uses_question_rubrics_without_overwriting_raw_scores(history_db, monkeypatch):
    bank = [item(str(i)) for i in range(5)]
    monkeypatch.setattr(history, 'load_items', lambda: [q.model_dump() for q in bank])
    attempt = history.start_history('old', 'checkpoint')
    for i, q in enumerate(bank):
        history.save_answer(attempt.history_id, q.id, 'A', Evaluation(score=.25 if i < 3 else 0, correct=i < 3, feedback=''))
    assert history.list_history()[0].total_score == 6
    assert history.get_history(attempt.history_id).total_score == 6
    with db.get_connection() as conn:
        assert conn.execute('SELECT SUM(score) FROM history_question').fetchone()[0] == .75


def test_saved_maximum_survives_question_bank_changes(history_db, monkeypatch):
    attempt = history.start_history('old', 'checkpoint')
    history.save_answer(attempt.history_id, 'q', 'A', Evaluation(score=.25, correct=True, feedback=''), max_score=.25)
    def unavailable():
        raise AssertionError('New attempts must not need the question bank to recover the rubric')
    monkeypatch.setattr(history, 'load_items', unavailable)
    assert history.get_history(attempt.history_id).total_score == 10
    assert history.list_history()[0].total_score == 10


def test_empty_attempt_and_official_ten_point_rubric(history_db):
    attempt = history.start_history('empty', 'exam')
    assert history.get_history(attempt.history_id).total_score == 0
    assert score_on_ten(7.25, 12*.25 + 4*1 + 6*.5) == 7.25


def test_migration_preserves_existing_rows(tmp_path, monkeypatch):
    path = tmp_path / 'old.db'
    monkeypatch.setattr(db, 'DB_PATH', path)
    with sqlite3.connect(path) as conn:
        conn.execute('CREATE TABLE history_question (question_id TEXT, score REAL)')
        conn.execute("INSERT INTO history_question VALUES ('q', 0.25)")
    db.init_db()
    db.init_db()
    with db.get_connection() as conn:
        row = conn.execute('SELECT question_id, score, max_score FROM history_question').fetchone()
        assert tuple(row) == ('q', .25, None)


@pytest.mark.parametrize('mode', ['exam', 'checkpoint'])
def test_submit_response_matches_history_weighted_score(history_db, monkeypatch, mode):
    from api import router
    from api.schema import SubmitRequest, Submission
    items = {'1': item('1'), '2': item('2', 'true_false')}
    verdicts = [Evaluation(score=.25, correct=True, feedback=''), Evaluation(score=.25, correct=False, part_correct=[True,True,False,False], feedback='')]
    monkeypatch.setattr(router, 'find_item', items.__getitem__)
    monkeypatch.setattr(router, 'grade', lambda *args, **kwargs: {'final_evaluations':verdicts, 'total_score':.5})
    monkeypatch.setattr(router, 'node_map', lambda: {})
    monkeypatch.setattr(router, 'runs_of', lambda **kwargs: [])
    monkeypatch.setattr(router, 'quest', lambda *args, **kwargs: {'missing':[]})
    result = router.post_exam_submit(SubmitRequest(exam_id='test', mode=mode, answers=[Submission(question_id='1',student_answer='A'), Submission(question_id='2', student_answer=[True,True,False,False])]), BackgroundTasks(), SimpleNamespace(decoded={'sub':'student'}))
    assert result.total_score == 4.0  # 0.5 / 1.25 * 10
    assert history.get_history(result.history_id, user_id='student').total_score == result.total_score


def test_solution_opens_stream_before_model_and_emits_each_chunk(monkeypatch):
    seen = []
    class Model:
        def stream(self, prompt):
            seen.append(prompt)
            for token in ['Bước 1.', ' Bước 2.']:
                seen.append(token)
                yield SimpleNamespace(content=token)
    monkeypatch.setattr(teacher, 'chat_model', lambda model: Model())
    events = teacher.explain(item('1'), 'B', Evaluation(score=0, correct=False, feedback='Chưa đúng.'))
    assert next(events)['type'] == 'model'
    assert seen == []
    assert next(events) == {'type':'content','content':'Bước 1.'}
    assert len(seen) == 2  # second token has not been generated yet
    prompt = seen[0]
    assert [role for role, content in prompt] == ['system','user']
    assert 'structured schema' not in prompt[0][1]
    assert 'Reference solution:' in prompt[1][1]
    assert 'Chưa đúng.' in prompt[1][1]
    assert list(events) == [{'type':'content','content':' Bước 2.'}]


def test_concurrent_initialization_migrates_old_database_once(tmp_path, monkeypatch):
    from concurrent.futures import ThreadPoolExecutor
    path = tmp_path / "concurrent.db"
    monkeypatch.setattr(db, "DB_PATH", path)
    with sqlite3.connect(path) as conn:
        conn.execute("CREATE TABLE history_question (question_id TEXT, score REAL)")
    with ThreadPoolExecutor(max_workers=4) as pool:
        list(pool.map(lambda _: db.init_db(), range(4)))
    with db.get_connection() as conn:
        assert [row["name"] for row in conn.execute("PRAGMA table_info(history_question)")].count("max_score") == 1
