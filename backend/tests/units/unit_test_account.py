from datetime import datetime, timezone
from types import SimpleNamespace
import json
import socket

import pytest
from fastapi.testclient import TestClient

from api import account
from history import db


class FixedClock(datetime):
    @classmethod
    def now(cls, tz=None):
        return cls(2026, 10, 3, 5, tzinfo=timezone.utc).astimezone(tz)


@pytest.fixture
def client(tmp_path, monkeypatch):
    def blocked(*args, **kwargs):
        raise AssertionError("Network calls are forbidden")

    monkeypatch.setattr(socket.socket, "connect", blocked)
    monkeypatch.setattr(socket, "create_connection", blocked)
    monkeypatch.setattr(db, "DB_PATH", tmp_path / "history.db")
    monkeypatch.setattr(account, "datetime", FixedClock)

    from api import router

    creds = SimpleNamespace(decoded={"sub": "user-a"})
    router.app.dependency_overrides[router.clerk_guard] = lambda: creds
    with TestClient(router.app) as http:
        yield http, creds
    router.app.dependency_overrides.clear()


def answer(user_id, history_id, question_id, when, value="A", correct=True):
    db.init_db()
    with db.get_connection() as conn:
        conn.execute(
            "INSERT OR IGNORE INTO history (id, user_id, exam_id, mode, created_at) VALUES (?, ?, 'exam', 'exam', ?)",
            (history_id, user_id, when),
        )
        conn.execute(
            """
            INSERT OR REPLACE INTO history_question
                (history_id, question_id, student_answer, correct, score, feedback, answered_at)
            VALUES (?, ?, ?, ?, 1, '', ?)
            """,
            (history_id, question_id, json.dumps(value), correct, when),
        )


def test_new_account_has_empty_activity_and_complete_defaults(client):
    http, _ = client
    response = http.get("/api/me")
    assert response.status_code == 200
    data = response.json()
    assert data["activity"] == []
    assert data["streak"] == data["xp"] == 0
    assert data["week"] == [False] * 7
    assert data["kept_today"] is False
    assert data["plan"] == "free"
    assert data["settings"] == {"remind": True, "sound": True, "minutes": 20, "daily_goal": 10}
    assert data["joined_at"].endswith("Z")
    assert http.get("/api/me").json()["joined_at"] == data["joined_at"]


def test_activity_uses_vietnam_dates_and_only_owners_nonempty_answers(client):
    http, creds = client
    answer("user-a", "a1", "q1", "2026-10-01 16:59:00")
    answer("user-a", "a1", "q2", "2026-10-01 17:01:00", correct=False)
    answer("user-a", "a2", "q3", "2026-10-02 17:00:00", value=[False, False])
    answer("user-a", "a2", "blank", "2026-10-03 01:00:00", value="   ")
    answer("user-a", "a2", "empty", "2026-10-03 01:00:00", value=[])
    answer("user-a", "future", "q4", "2026-10-04 01:00:00")
    answer("user-b", "b1", "q5", "2026-10-02 17:00:00")
    with db.get_connection() as conn:
        conn.execute("INSERT INTO history (id, user_id, exam_id, mode) VALUES ('empty-run', 'user-a', 'path:12', 'placement')")

    data = http.get("/api/me?user_id=user-b").json()
    assert data["activity"] == [
        {"date": "2026-10-01", "count": 1},
        {"date": "2026-10-02", "count": 1},
        {"date": "2026-10-03", "count": 1},
    ]
    assert data["streak"] == 3
    assert data["kept_today"] is True
    assert data["week"] == [False, False, False, True, True, True, False]
    assert data["xp"] == 8
    assert data["daily"][0]["current"] == 4
    assert data["joined_at"] == "2026-10-01T16:59:00Z"
    answer("user-a", "a2", "q3", "2026-10-02 17:01:00", value=[False, True])
    assert http.get("/api/me").json()["activity"] == data["activity"]
    creds.decoded = {"sub": "user-b"}
    assert http.get("/api/me").json()["activity"] == [{"date": "2026-10-03", "count": 1}]


def test_streak_survives_yesterday_and_resets_after_gap(client):
    http, _ = client
    answer("user-a", "a1", "q1", "2026-10-01 20:00:00")
    answer("user-a", "a2", "q2", "2026-09-30 20:00:00")
    data = http.get("/api/me").json()
    assert data["streak"] == 2
    assert data["kept_today"] is False
    with db.get_connection() as conn:
        conn.execute("DELETE FROM history WHERE id = 'a1'")
    assert http.get("/api/me").json()["streak"] == 0


def test_profile_patch_persists_and_merges_settings_without_changing_activity(client):
    http, creds = client
    answer("user-a", "a1", "q1", "2026-10-03 01:00:00")
    response = http.patch("/api/me", json={"name": "  Gia Bảo  ", "grade": 12, "goal": 8, "avatar": 2, "saved_exam_ids": ["exam"], "settings": {"sound": False, "minutes": 30}})
    assert response.status_code == 200
    response = http.patch("/api/me", json={"settings": {"daily_goal": 20}})
    data = response.json()
    assert data["name"] == "Gia Bảo"
    assert data["settings"] == {"remind": True, "sound": False, "minutes": 30, "daily_goal": 20}
    assert data["activity"] == [{"date": "2026-10-03", "count": 1}]
    assert http.get("/api/me").json() == data
    creds.decoded = {"sub": "user-b"}
    assert http.get("/api/me").json()["name"] == ""
    assert http.get("/api/me").json()["settings"]["sound"] is True


@pytest.mark.parametrize("patch", [
    {"user_id": "user-b"}, {"plan": "pro"}, {"xp": 10000}, {"activity": []},
    {"grade": 9}, {"avatar": 6}, {"name": None}, {"settings": None},
    {"settings": {"daily_goal": 100}}, {"settings": {"sound": "false"}},
])
def test_patch_rejects_invalid_values_and_server_owned_fields(client, patch):
    http, _ = client
    assert http.patch("/api/me", json=patch).status_code == 422


def test_plan_is_derived_from_verified_claims_and_auth_is_required(client):
    http, creds = client
    creds.decoded = {"sub": "user-a", "pla": "u:pro"}
    assert http.get("/api/me").json()["plan"] == "pro"
    creds.decoded = {}
    assert http.get("/api/me").status_code == 401
    assert http.patch("/api/me", json={"name": "No owner"}).status_code == 401
    from api import router

    router.app.dependency_overrides.clear()
    assert http.get("/api/me").status_code in (401, 403)
