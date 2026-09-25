from __future__ import annotations

from pathlib import Path

import sqlite3


ROOT_DIR = Path(__file__).resolve().parents[3]
DB_PATH = ROOT_DIR / "artifacts" / "learner" / "learner.db"


def get_connection() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")

    return conn


def init_db() -> None:
    with get_connection() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS question_knowledge (
                question_id TEXT NOT NULL,
                knowledge_id TEXT NOT NULL,
                PRIMARY KEY (question_id, knowledge_id)
            );

            CREATE TABLE IF NOT EXISTS knowledge_state (
                user_id TEXT NOT NULL,
                knowledge_id TEXT NOT NULL,
                type TEXT NOT NULL DEFAULT 'overall',
                mastery REAL,
                attempts INTEGER NOT NULL DEFAULT 0,
                correct INTEGER NOT NULL DEFAULT 0,
                incorrect INTEGER NOT NULL DEFAULT 0,
                last_attempt_at TEXT,
                updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

                PRIMARY KEY (user_id, knowledge_id, type),
                CHECK (
                    mastery IS NULL
                    OR mastery BETWEEN 0.0 AND 1.0
                )
            );

            CREATE TABLE IF NOT EXISTS error_state (
                user_id TEXT NOT NULL,
                knowledge_id TEXT NOT NULL,
                type TEXT NOT NULL,
                error_type TEXT NOT NULL,
                count INTEGER NOT NULL DEFAULT 0,
                recent_count INTEGER NOT NULL DEFAULT 0,
                last_seen TEXT,

                PRIMARY KEY (user_id, knowledge_id, type, error_type),
                CHECK (count >= 0),
                CHECK (recent_count >= 0)
            );
            """
        )
