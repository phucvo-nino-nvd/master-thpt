from __future__ import annotations

from pathlib import Path

import sqlite3


ROOT_DIR = Path(__file__).resolve().parents[2]
DB_PATH = ROOT_DIR / "artifacts" / "history" / "history.db"


def get_connection() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")

    return conn


def init_db() -> None:
    with get_connection() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS account_profile (
                user_id TEXT PRIMARY KEY,
                data TEXT NOT NULL DEFAULT '{}',
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS history (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL DEFAULT '',
                exam_id TEXT NOT NULL,
                mode TEXT NOT NULL,
                duration_seconds INTEGER,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

                CHECK (mode IN ('exam', 'practice', 'placement', 'checkpoint', 'obstacle', 'review', 'skip'))
            );

            CREATE TABLE IF NOT EXISTS history_question (
                history_id TEXT NOT NULL REFERENCES history(id) ON DELETE CASCADE,
                question_id TEXT NOT NULL,
                student_answer TEXT NOT NULL,
                correct INTEGER NOT NULL,
                part_correct TEXT NOT NULL DEFAULT '[]',
                score REAL NOT NULL,
                feedback TEXT NOT NULL,
                error_type TEXT,
                error_confidence REAL,
                grading_trace TEXT,
                answered_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

                PRIMARY KEY (history_id, question_id),
                CHECK (correct IN (0, 1))
            );

            CREATE TABLE IF NOT EXISTS crawl_queue (
                url TEXT PRIMARY KEY,
                title TEXT NOT NULL DEFAULT '',
                score REAL NOT NULL DEFAULT 0.0,
                concept TEXT NOT NULL DEFAULT '',
                grade INTEGER NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
            """
        )
