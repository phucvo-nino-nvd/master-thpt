from __future__ import annotations

from pathlib import Path
from dotenv import load_dotenv
from langchain_openrouter import ChatOpenRouter

import json
import os


load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = os.getenv("OPENROUTER_BASE_URL", "").rstrip("/")


def load_json(path: Path):
    """Load a JSON file."""
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data: object) -> None:
    """Write formatted UTF-8 JSON, creating parent directories."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def chat_model(model: str, **kwargs) -> ChatOpenRouter:
    """Build an OpenRouter chat model. Call lazily, never at import time."""
    if not OPENROUTER_API_KEY or not OPENROUTER_BASE_URL:
        raise RuntimeError("OPENROUTER_API_KEY and OPENROUTER_BASE_URL are required")

    return ChatOpenRouter(
        model=model,
        api_key=OPENROUTER_API_KEY,
        base_url=OPENROUTER_BASE_URL,
        temperature=0,
        max_retries=0,
        openrouter_provider={"require_parameters": True},
        **kwargs,
    )
