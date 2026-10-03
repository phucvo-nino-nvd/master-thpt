from dataclasses import dataclass
from pathlib import Path

import re
import unicodedata

from .config import REFINED_DIR


HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$")
GRADE_RE = re.compile(r"toan-(10|11|12)-tap-(1|2)")
LESSON_RE = re.compile(r"^Bài\s+\d+\.\s*(.+)$", re.IGNORECASE)


@dataclass
class MarkdownChunk:
    id: str
    grade: int
    chapter: str | None
    title: str
    content: str


def normalize_heading(text: str) -> str:
    """Normalize Vietnamese headings for rule matching."""
    text = re.sub(r"[*_`#>\-]+", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    text = text.replace("Đ", "D").replace("đ", "d")
    text = unicodedata.normalize("NFD", text)
    text = "".join(char for char in text if not unicodedata.combining(char))
    return text.upper()


def infer_book_id(path: Path) -> str:
    """Infer a stable book identifier from the refined Markdown filename."""
    return (
        path.stem.lower()
        .replace("sach-giao-khoa-", "")
        .replace("-ket-noi-tri-thuc-voi-cuoc-song", "")
        .replace(".refined", "")
    )


def infer_grade(book_id: str) -> int:
    """Infer grade 10, 11, or 12 from the book identifier."""
    match = GRADE_RE.search(book_id)

    if not match:
        raise ValueError(f"Cannot infer grade from {book_id}")

    return int(match.group(1))


def chunk_markdown_file(path: str | Path) -> list[MarkdownChunk]:
    """
    Split refined textbook Markdown into one chunk per lesson.

    Expected structure:
        # CHƯƠNG ...
        ## Bài n. ...
    """
    path = Path(path)
    text = path.read_text(encoding="utf-8")

    book_id = infer_book_id(path)
    grade = infer_grade(book_id)

    chunks: list[MarkdownChunk] = []
    current_chapter: str | None = None
    current_title: str | None = None
    current_body: list[str] = []

    def flush() -> None:
        """Save the currently accumulated lesson as a chunk."""
        nonlocal current_title, current_body

        if not current_title:
            return

        body = "\n".join(current_body).strip()

        if body:
            chunks.append(
                MarkdownChunk(
                    id=f"{book_id}:{len(chunks) + 1:04d}",
                    grade=grade,
                    chapter=current_chapter,
                    title=current_title,
                    content=body,
                )
            )

        current_title = None
        current_body = []

    for line in text.splitlines():
        match = HEADING_RE.match(line)

        if not match:
            if current_title:
                current_body.append(line)
            continue

        level = len(match.group(1))
        heading = re.sub(r"\s*<br\s*/?>\s*", " ", match.group(2), flags=re.IGNORECASE).strip()

        # Start a new chapter.
        if level == 1 and normalize_heading(heading).startswith("CHUONG "):
            flush()
            current_chapter = heading
            continue

        # Start a new lesson.
        lesson_match = LESSON_RE.match(heading)

        if level == 2 and lesson_match:
            flush()
            current_title = lesson_match.group(1).strip()
            current_body = []
            continue

        # Keep inner headings as part of the lesson content.
        if current_title:
            current_body.append(line)

    flush()
    return chunks


def load_chunks() -> list[MarkdownChunk]:
    """Load lesson chunks from all refined textbooks."""
    chunks: list[MarkdownChunk] = []

    for path in sorted(REFINED_DIR.glob("*.md")):
        chunks.extend(chunk_markdown_file(path))

    return chunks


if __name__ == "__main__":
    chunks = load_chunks()

    print(f"Total chunks: {len(chunks)}")

    for chunk in chunks:
        print(
            f"{chunk.id} | "
            f"Grade {chunk.grade} | "
            f"{chunk.chapter} | "
            f"{chunk.title}"
        )