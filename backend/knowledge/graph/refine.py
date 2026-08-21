from dataclasses import dataclass

import re
import unicodedata

from agents.parser.main import parse_textbook
from .config import DATA_DIR, REFINED_DIR


IMAGE_RE = re.compile(r"!\[[^\]]*\]\([^)]+\)")
HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$")
TOC_LESSON_RE = re.compile(r"^(?:Bài|Bai)\s+(\d+)[.\s:-]*\s*(.*)$", re.IGNORECASE)
PAGE_NUMBER_RE = re.compile(r"\s+\d+\s*$")
CHAPTER_RE = re.compile(r"^CHUONG\s*(X|IX|VIII|VII|VI|V|IV|III|II|I)")


@dataclass
class LessonSpec:
    number: int
    chapter: str
    title: str


@dataclass
class BodyLesson:
    chapter: str
    start: int
    end: int


def normalize(text: str) -> str:
    """Normalize Vietnamese text for reliable rule matching."""
    text = text.replace("Đ", "D").replace("đ", "d")
    text = unicodedata.normalize("NFD", text)
    text = "".join(char for char in text if not unicodedata.combining(char))
    text = text.upper()
    text = re.sub(r"[^A-Z0-9\s]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def chapter_key(text: str) -> str:
    """Return the Roman numeral of a chapter, e.g. CHƯƠNG VII -> VII."""
    match = CHAPTER_RE.match(normalize(text))

    if not match:
        raise ValueError(f"Cannot parse chapter: {text}")

    return match.group(1)


def clean_markdown(text: str) -> str:
    """Remove unused images and normalize whitespace."""
    text = IMAGE_RE.sub("", text)
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def get_heading(line: str) -> tuple[int, str] | None:
    """Return Markdown heading level and heading text."""
    match = HEADING_RE.match(line.strip())

    if not match:
        return None

    level = len(match.group(1))
    text = re.sub(r"[*_`]+", "", match.group(2)).strip()

    return level, text


def strip_page_number(text: str) -> str:
    """Remove a trailing page number from a TOC entry."""
    return PAGE_NUMBER_RE.sub("", text).strip()


def clean_toc_text(text: str) -> str:
    """Normalize a TOC line before matching."""
    text = re.sub(r"[*_`]+", "", text).strip()

    if text.startswith("|"):
        cells = text.strip("|").split("|")

        if cells:
            text = cells[0].strip()

    text = re.sub(r"^\s*[-+]\s+", "", text)
    text = re.sub(r"\s+", " ", text).strip()

    return text


def find_toc_start(lines: list[str]) -> int:
    """Find the MỤC LỤC heading."""
    for index, line in enumerate(lines):
        heading = get_heading(line)

        if heading and normalize(heading[1]) == "MUC LUC":
            return index

    raise ValueError("Cannot find MỤC LỤC")


def find_body_start(lines: list[str], toc_start: int) -> int:
    """
    Find the textbook body by locating the first chapter in the TOC
    and finding the same chapter again after the TOC.
    """
    first_chapter: str | None = None
    first_chapter_index: int | None = None

    for index in range(toc_start + 1, len(lines)):
        heading = get_heading(lines[index])

        if not heading:
            continue

        match = CHAPTER_RE.match(normalize(heading[1]))

        if match:
            first_chapter = match.group(1)
            first_chapter_index = index
            break

    if first_chapter is None or first_chapter_index is None:
        raise ValueError("Cannot find first chapter in MỤC LỤC")

    body_chapter_re = re.compile(rf"^CHUONG\s+{re.escape(first_chapter)}(?![IVXLCDM])")

    for index in range(first_chapter_index + 1, len(lines)):
        heading = get_heading(lines[index])

        if heading and body_chapter_re.match(normalize(heading[1])):
            return index

    raise ValueError(f"Cannot find textbook body for CHƯƠNG {first_chapter}")


def parse_toc(lines: list[str], toc_start: int, body_start: int) -> list[LessonSpec]:
    """Parse chapters and lessons from the table of contents."""
    lessons: list[LessonSpec] = []
    current_chapter: str | None = None
    index = toc_start + 1

    while index < body_start:
        raw_line = lines[index].strip()

        if not raw_line:
            index += 1
            continue

        heading = get_heading(raw_line)
        text = clean_toc_text(heading[1] if heading else raw_line)
        normalized = normalize(text)

        if normalized.startswith("CHUONG "):
            current_chapter = text
            index += 1
            continue

        lesson_match = TOC_LESSON_RE.match(text)

        if not lesson_match:
            index += 1
            continue

        if current_chapter is None:
            raise ValueError(f"Lesson found before chapter: {raw_line}")

        number = int(lesson_match.group(1))
        title_parts: list[str] = []

        first_part = strip_page_number(lesson_match.group(2))

        if first_part:
            title_parts.append(first_part)

        index += 1

        while index < body_start:
            next_raw = lines[index].strip()

            if not next_raw:
                index += 1
                break

            next_heading = get_heading(next_raw)
            next_text = clean_toc_text(next_heading[1] if next_heading else next_raw)
            next_normalized = normalize(next_text)

            if next_normalized.startswith("CHUONG "):
                break

            if TOC_LESSON_RE.match(next_text):
                break

            if next_normalized.startswith("BAI TAP CUOI CHUONG"):
                break

            cleaned = strip_page_number(next_text)

            if cleaned:
                title_parts.append(cleaned)

            index += 1

        title = re.sub(r"\s+", " ", " ".join(title_parts)).strip()

        lessons.append(
            LessonSpec(
                number=number,
                chapter=current_chapter,
                title=title,
            )
        )

    return lessons


def find_body_lessons(lines: list[str], body_start: int) -> list[BodyLesson]:
    """
    Find lesson starts using KIẾN THỨC, KĨ NĂNG.

    Every lesson keeps the chapter where it appears, so later
    matching happens only inside that chapter.
    """
    found: list[tuple[str, int]] = []
    current_chapter: str | None = None

    for index in range(body_start, len(lines)):
        heading = get_heading(lines[index])

        if not heading:
            continue

        _, text = heading
        normalized = normalize(text)

        if normalized.startswith("CHUONG "):
            current_chapter = text
            continue

        if normalized != "KIEN THUC KI NANG":
            continue

        if current_chapter is None:
            continue

        start = index

        for previous_index in range(index - 1, body_start - 1, -1):
            previous_heading = get_heading(lines[previous_index])

            if not previous_heading:
                continue

            if normalize(previous_heading[1]) == "THUAT NGU":
                start = previous_index

            break

        found.append((current_chapter, start))

    lessons: list[BodyLesson] = []

    for index, (chapter, start) in enumerate(found):
        end = found[index + 1][1] if index + 1 < len(found) else len(lines)

        lessons.append(
            BodyLesson(
                chapter=chapter,
                start=start,
                end=end,
            )
        )

    return lessons


def trim_lesson(lines: list[str], start: int, end: int) -> str:
    """
    Extract lesson knowledge content.

    Stop at the final BÀI TẬP section because exercises are handled
    by the item-bank pipeline.
    """
    content: list[str] = []

    for index in range(start, end):
        line = lines[index]
        heading = get_heading(line)

        if heading and normalize(heading[1]) == "BAI TAP":
            break

        content.append(line)

    text = "\n".join(content).strip()

    return re.sub(r"\n{3,}", "\n\n", text)


def refine_textbook(markdown: str) -> str:
    """
    Convert raw Datalab Markdown into lesson-oriented Markdown.

    Output:
        # CHƯƠNG ...
        ## Bài n. ...
        ...
    """
    markdown = clean_markdown(markdown)
    lines = markdown.splitlines()

    toc_start = find_toc_start(lines)
    body_start = find_body_start(lines, toc_start)

    toc_lessons = parse_toc(lines, toc_start, body_start)
    body_lessons = find_body_lessons(lines, body_start)

    print(f"TOC lessons: {len(toc_lessons)}")
    print(f"Body lessons: {len(body_lessons)}")

    toc_by_chapter: dict[str, list[LessonSpec]] = {}
    body_by_chapter: dict[str, list[BodyLesson]] = {}

    for lesson in toc_lessons:
        key = chapter_key(lesson.chapter)
        toc_by_chapter.setdefault(key, []).append(lesson)

    for lesson in body_lessons:
        key = chapter_key(lesson.chapter)
        body_by_chapter.setdefault(key, []).append(lesson)

    output: list[str] = []

    for key, chapter_lessons in toc_by_chapter.items():
        chapter_body = body_by_chapter.get(key, [])
        chapter_name = chapter_lessons[0].chapter

        print(f"{chapter_name}: TOC={len(chapter_lessons)} BODY={len(chapter_body)}")

        if len(chapter_lessons) != len(chapter_body):
            print(
                f"Warning: lesson count mismatch in {chapter_name}: "
                f"TOC={len(chapter_lessons)}, BODY={len(chapter_body)}"
            )

        count = min(len(chapter_lessons), len(chapter_body))

        if count == 0:
            continue

        if output:
            output.append("")

        output.append(f"# {chapter_name}")

        for index in range(count):
            lesson = chapter_lessons[index]
            body_lesson = chapter_body[index]
            content = trim_lesson(lines, body_lesson.start, body_lesson.end)

            output.append("")
            output.append(f"## Bài {lesson.number}. {lesson.title}")
            output.append("")

            if content:
                output.append(content)

    return "\n".join(output).strip() + "\n"


if __name__ == "__main__":
    pdf_paths = sorted(DATA_DIR.glob("*.pdf"))

    # PDF -> Datalab OCR -> raw Markdown
    markdown_paths = parse_textbook(pdf_paths)

    REFINED_DIR.mkdir(parents=True, exist_ok=True)

    for markdown_path in markdown_paths:
        print("\n" + "=" * 100)
        print(f"Book: {markdown_path.name}")

        # Raw Markdown -> refined Markdown
        markdown = markdown_path.read_text(encoding="utf-8")
        refined = refine_textbook(markdown)

        refined_path = REFINED_DIR / markdown_path.name
        refined_path.write_text(refined, encoding="utf-8")

        print(f"Refined Markdown saved: {refined_path}")
