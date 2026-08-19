import hashlib

from .pipeline import Item


def normalize_content(text: str) -> str:
    return "".join(text.lower().split())


def make_fingerprint(item: Item) -> str:
    parts = [normalize_content(item.content)]

    for option in item.options:
        parts.append(
            f"{option.label}:{normalize_content(option.content)}"
        )

    for part in item.parts:
        parts.append(
            f"{part.label}:{normalize_content(part.content)}"
        )

    raw = "|".join(parts)

    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def dedup_items(items: list[Item]) -> list[Item]:
    seen: set[str] = set()
    unique: list[Item] = []

    for item in items:
        fingerprint = make_fingerprint(item)

        if fingerprint in seen:
            continue

        seen.add(fingerprint)
        unique.append(item)

    return unique