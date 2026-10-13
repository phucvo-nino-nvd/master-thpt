import base64
import hashlib
import hmac
import json
import time

from fastapi.testclient import TestClient

from api import router
from common.schema import Evaluation
from history import db as history_db, main as history
from roles.learner import db as learner_db

SECRET = "whsec_" + base64.b64encode(b"test-secret").decode()


def signed(body: bytes, secret: str = SECRET) -> dict:
    message_id, timestamp = "msg_1", str(int(time.time()))
    key = base64.b64decode(secret.removeprefix("whsec_"))
    signature = base64.b64encode(hmac.new(key, f"{message_id}.{timestamp}.".encode() + body, hashlib.sha256).digest()).decode()
    return {"svix-id": message_id, "svix-timestamp": timestamp, "svix-signature": f"v1,{signature}"}


def rows(path, table: str) -> list[str]:
    with path() as conn:
        return sorted(row[0] for row in conn.execute(f"SELECT user_id FROM {table}"))


def test_deleted_clerk_user_loses_all_their_data(tmp_path, monkeypatch):
    monkeypatch.setattr(history_db, "DB_PATH", tmp_path / "history.db")
    monkeypatch.setattr(learner_db, "DB_PATH", tmp_path / "learner.db")
    monkeypatch.setattr(router, "CLERK_WEBHOOK_SECRET", SECRET)
    learner_db.init_db()

    for user_id in ("gone", "kept"):
        created = history.start_history("exam", "exam", 10, user_id=user_id)
        history.save_answer(created.history_id, "q1", "A", Evaluation(score=0.25, correct=True, feedback="Đúng."), max_score=0.25)
        with history_db.get_connection() as conn:
            conn.execute("INSERT INTO account_profile (user_id) VALUES (?)", (user_id,))
            conn.execute("INSERT INTO crawl_queue (user_id, url, grade) VALUES (?, 'https://a', 12)", (user_id,))
        with learner_db.get_connection() as conn:
            conn.execute("INSERT INTO knowledge_state (user_id, knowledge_id) VALUES (?, 'k')", (user_id,))
            conn.execute("INSERT INTO error_state (user_id, knowledge_id, type, error_type) VALUES (?, 'k', 'overall', 'algebra_error')", (user_id,))

    client = TestClient(router.app)
    body = json.dumps({"type": "user.deleted", "data": {"id": "gone"}}).encode()

    assert client.post("/api/clerk/webhook", content=body, headers=signed(body, "whsec_" + base64.b64encode(b"other").decode())).status_code == 401
    assert rows(history_db.get_connection, "history") == ["gone", "kept"]

    assert client.post("/api/clerk/webhook", content=body, headers=signed(body)).status_code == 200
    for table in ("history", "account_profile", "crawl_queue"):
        assert rows(history_db.get_connection, table) == ["kept"]
    for table in ("knowledge_state", "error_state"):
        assert rows(learner_db.get_connection, table) == ["kept"]
    with history_db.get_connection() as conn:
        assert conn.execute("SELECT COUNT(*) FROM history_question").fetchone()[0] == 1
