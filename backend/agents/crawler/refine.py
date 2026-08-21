from __future__ import annotations

from urllib.parse import unquote, urlparse

import re

from common.utils import normalized


BUNDLES = (
    "tong hop",
    "tuyen tap",
    "tuyen chon",
    "chuyen de",
    "bo de",
    "ngan hang",
    "cac de",
    "nhieu de",
)
BUNDLE_COUNT = re.compile(r"(?<!toan )(?<!lop )(?<!lan )(?<!khoi )\b\d{1,3}\s*de\b")
EXAM_NUMBER = re.compile(r"(?<!ma )\bde\s*(?:so\s*)?(\d{1,2})\b")
SEPARATORS = re.compile(r"[\s\-_.+/]+")
MIN_EXAMS = 2


def folded(text: str) -> str:
    return SEPARATORS.sub(" ", normalized(text))


def path_of(url: str) -> str:
    return folded(unquote(urlparse(url).path))


def slug_of(url: str) -> str:
    return folded(unquote(urlparse(url).path.rstrip("/").rsplit("/", 1)[-1]))


def is_bundle(title: str, url: str) -> bool:
    if any(phrase in f"{folded(title)} {path_of(url)}" for phrase in BUNDLES):
        return True

    return any(BUNDLE_COUNT.search(text) for text in (folded(title), slug_of(url)))


def exam_numbers(text: str) -> set[str]:
    return {match.group(1) for match in EXAM_NUMBER.finditer(folded(text))}


def is_multi_exam(text: str) -> bool:
    return len(exam_numbers(text)) >= MIN_EXAMS


def is_single_exam(title: str, url: str, content: str = "") -> bool:
    return not is_bundle(title, url) and not is_multi_exam(f"{title} {content}")

