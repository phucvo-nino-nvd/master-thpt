from __future__ import annotations

from pathlib import Path
from langchain_openrouter import ChatOpenRouter

import hashlib
import json
import requests

from .config import (
    EMBEDDING_MODEL,
    KG_OFFLINE,
    OPENROUTER_API_KEY,
    OPENROUTER_BASE_URL,
)


class OfflineCacheMiss(RuntimeError):
    """Raised when KG_OFFLINE is set and a required cache item is missing."""


def require_online(item: str) -> None:
    """Fail before any API call when running offline."""
    if KG_OFFLINE:
        raise OfflineCacheMiss(f"KG_OFFLINE=true and this cache item is missing: {item}")


def load_json(path: Path):
    """Load a JSON file."""
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data: object) -> None:
    """Write formatted UTF-8 JSON."""
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


def embedding_text(node: dict) -> str:
    """Build text used for node embedding."""
    aliases = [alias for alias in node.get("aliases", []) if alias != node.get("name")]

    return "\n".join(
        [
            f"Type: {node['type']}",
            f"Name: {node['name']}",
            f"Aliases: {', '.join(aliases)}",
            f"Description: {node['description']}",
        ]
    )


def text_hash(text: str) -> str:
    """Return a stable hash for embedding cache validation."""
    return hashlib.sha1(text.encode("utf-8")).hexdigest()


def load_embedding_cache(path: Path) -> dict:
    """Load cached embeddings, ignoring caches built with another model."""
    if not path.exists():
        return {"model": EMBEDDING_MODEL, "items": {}}

    data = load_json(path)

    if data.get("model") != EMBEDDING_MODEL:
        return {"model": EMBEDDING_MODEL, "items": {}}

    return data


def request_embeddings(texts: list[str]) -> list[list[float]]:
    """Request one embedding batch from OpenRouter."""
    if not OPENROUTER_API_KEY or not OPENROUTER_BASE_URL:
        raise RuntimeError("OPENROUTER_API_KEY and OPENROUTER_BASE_URL are required")

    response = requests.post(
        f"{OPENROUTER_BASE_URL}/embeddings",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": EMBEDDING_MODEL,
            "input": texts,
        },
        timeout=120,
    )
    response.raise_for_status()

    data = sorted(response.json().get("data", []), key=lambda item: item["index"])

    if len(data) != len(texts):
        raise ValueError(f"Embedding response size mismatch: expected {len(texts)}, got {len(data)}")

    return [item["embedding"] for item in data]


def build_embeddings(
    nodes: list[dict],
    cache_path: Path,
    batch_size: int = 64,
) -> dict[str, list[float]]:
    """Load cached vectors and embed changed or missing nodes."""
    cache_path.parent.mkdir(parents=True, exist_ok=True)

    cache = load_embedding_cache(cache_path)
    cached_items = cache["items"]
    texts = {node["id"]: embedding_text(node) for node in nodes}
    pending = []

    for node_id, text in texts.items():
        item = cached_items.get(node_id)

        if item is None or item.get("text_hash") != text_hash(text):
            pending.append(node_id)

    print(f"Embedding cache hits: {len(nodes) - len(pending)}")
    print(f"Embedding pending: {len(pending)}")

    if pending:
        require_online(f"{len(pending)} embeddings in {cache_path}, e.g. {pending[:3]}")

    for start in range(0, len(pending), batch_size):
        batch_ids = pending[start:start + batch_size]
        vectors = request_embeddings([texts[node_id] for node_id in batch_ids])

        for node_id, vector in zip(batch_ids, vectors):
            cached_items[node_id] = {
                "text_hash": text_hash(texts[node_id]),
                "embedding": vector,
            }

        write_json(cache_path, cache)

        end = min(start + batch_size, len(pending))
        print(f"Embedded {end}/{len(pending)}")

    valid_ids = set(texts)

    for node_id in list(cached_items):
        if node_id not in valid_ids:
            del cached_items[node_id]

    write_json(cache_path, cache)

    return {node_id: cached_items[node_id]["embedding"] for node_id in texts}
