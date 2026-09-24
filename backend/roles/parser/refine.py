from __future__ import annotations

import json
import re
import string
import unicodedata

from html.parser import HTMLParser
from typing import Any
from common.schema import (
    Document,
    ImageRef,
    Option,
    Question,
    QuestionPart,
    SourceBlock,
)


PART_RE = re.compile(r"\bPHẦN\s+(I{1,3}|IV|V)\b", re.IGNORECASE)            # PHẦN I, PHẦN II, PHẦN III, PHẦN IV, PHẦN V
QUESTION_RE = re.compile(r"^\s*Câu\s+(\d+)\s*[.:]?\s*", re.IGNORECASE)      # Câu 1, Câu 2, Câu 3, ...
OPTION_RE = re.compile(r"(?<!\w)([A-D])\.\s*")                              # A. ..., B. ..., C. ..., D. ...
PART_ITEM_RE = re.compile(r"(?<!\w)([a-d])[\)\.]\s*", re.IGNORECASE)        # a) ..., b) ..., c) ..., d) ...
PART_ITEM_START_RE = re.compile(r"^\s*([a-d])[\)\.]\s*", re.IGNORECASE)     # a) ..., b) ..., c) ..., d) ... at the start of a block


# Math symbols the OCR emits as plain unicode instead of <math>
SYMBOLS = {
    "∫": r"\int",
    "∑": r"\sum",
    "∏": r"\prod",
    "√": r"\sqrt",
    "≠": r"\neq",
    "≤": r"\leq",
    "≥": r"\geq",
    "±": r"\pm",
    "×": r"\times",
    "÷": r"\div",
    "∞": r"\infty",
    "→": r"\to",
    "⇒": r"\Rightarrow",
    "⇔": r"\Leftrightarrow",
    "∈": r"\in",
    "∉": r"\notin",
    "⊂": r"\subset",
    "∪": r"\cup",
    "∩": r"\cap",
    "∅": r"\emptyset",
    "α": r"\alpha",
    "β": r"\beta",
    "γ": r"\gamma",
    "θ": r"\theta",
    "π": r"\pi",
    "Δ": r"\Delta",
    "°": r"^\circ",
}

FUNCTIONS = ("log", "ln", "exp", "sin", "cos", "tan", "cot", "lim", "max", "min")

OPENERS = "([{"
CLOSERS = ")]}"
MATH_CHARS = set(
    string.ascii_letters + string.digits + OPENERS + CLOSERS + "+-*/=<>;,.'!:_^"
) | set(SYMBOLS)

STRONG_RE = re.compile(
    r"[_^'=<>]|[A-Za-z]\(|[A-Za-z]\d|\d[A-Za-z]|[\[(][-+]?\d|\d;|[" + "".join(SYMBOLS) + "]"
)
TRAILING_RE = re.compile(r"[.,?:;]+$")
BRACKET_RE = re.compile(r"^[\[({]+|[\])}]+$")
PLAIN_WORD_RE = re.compile(r"^[A-Za-z]+$")
ACCENT_RE = re.compile(r"[À-ỹ]")
KEEP_MATH_RE = re.compile(r"\$[^$]*\$")
TAG_TEXT_RE = re.compile(r">([^<>]+)<")


class HTMLContentParser(HTMLParser):
    """
    Convert Datalab HTML into lightweight Markdown/LaTeX-ish text.

    - <math>...</math>       -> $...$
    - <math display=block>   -> $$...$$
    - <br>                   -> newline
    - table cells            -> " | "
    - image descriptions     -> ignored here; stored in ImageRef.caption
    """

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)

        self.out: list[str] = []

        self.in_math = False
        self.math_display = False
        self.math_buffer: list[str] = []

        self.skip_depth = 0

        self.table_rows: list[list[tuple[str, int, int, bool]]] | None = None
        self.row: list[tuple[str, int, int, bool]] = []
        self.cell_start = 0
        self.cell_span = (1, 1, False)

        self.images: list[dict[str, str | None]] = []

    def handle_starttag(
        self,
        tag: str,
        attrs: list[tuple[str, str | None]],
    ) -> None:
        attrs_dict = dict(attrs)

        if self.skip_depth:
            self.skip_depth += 1
            return

        if tag == "div":
            css_class = attrs_dict.get("class") or ""
            if "img-description" in css_class or "img-alt" in css_class:
                self.skip_depth = 1
                return

        if tag == "img":
            self.images.append(
                {
                    "src": attrs_dict.get("src"),
                    "alt": attrs_dict.get("alt"),
                }
            )
            return

        if tag == "math":
            self.in_math = True
            self.math_display = attrs_dict.get("display") == "block"
            self.math_buffer = []
            return

        if tag == "br":
            self.out.append("\n")
            return

        if tag == "table":
            self.table_rows = []
            return

        if self.table_rows is not None:
            if tag == "tr":
                self.row = []
                return

            if tag in {"td", "th"}:
                self.cell_start = len(self.out)
                self.cell_span = (
                    int(attrs_dict.get("rowspan") or 1),
                    int(attrs_dict.get("colspan") or 1),
                    tag == "th",
                )
                return

        if tag in {"p", "li", "h1", "h2", "h3", "h4", "h5", "h6", "tr"}:
            if self.out and not self.out[-1].endswith("\n"):
                self.out.append("\n")

    def handle_startendtag(
        self,
        tag: str,
        attrs: list[tuple[str, str | None]],
    ) -> None:
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag: str) -> None:
        if self.skip_depth:
            self.skip_depth -= 1
            return

        if tag == "math" and self.in_math:
            latex = "".join(self.math_buffer).strip()

            if latex:
                if self.math_display:
                    self.out.append(f"\n$${latex}$$\n")
                else:
                    self.out.append(f"${latex}$")

            self.in_math = False
            self.math_display = False
            self.math_buffer = []
            return

        if self.table_rows is not None:
            if tag in {"td", "th"}:
                cell = "".join(self.out[self.cell_start:]).strip().replace("\n", " ")
                del self.out[self.cell_start:]
                self.row.append((cell, *self.cell_span))
                return

            if tag == "tr":
                if self.row:
                    self.table_rows.append(self.row)
                self.row = []
                return

            if tag == "table":
                self.out.append(html_table(self.table_rows))
                self.table_rows = None
                return

        if tag in {"p", "li", "h1", "h2", "h3", "h4", "h5", "h6", "tr"}:
            self.out.append("\n")

    def handle_data(self, data: str) -> None:
        if self.skip_depth:
            return

        if self.in_math:
            self.math_buffer.append(data)
        else:
            self.out.append(data)

    def text(self) -> str:
        text = "".join(self.out)

        text = re.sub(r"[ \t]+\n", "\n", text)
        text = re.sub(r"\n[ \t]+", "\n", text)
        text = re.sub(r"[ \t]{2,}", " ", text)
        text = re.sub(r"\n{3,}", "\n\n", text)

        return text.strip()


def html_table(rows: list[list[tuple[str, int, int, bool]]]) -> str:
    if not rows:
        return ""

    lines = ["<table>"]

    for row in rows:
        cells = []

        for text, rowspan, colspan, is_header in row:
            tag = "th" if is_header else "td"
            spans = f' rowspan="{rowspan}"' if rowspan > 1 else ""
            spans += f' colspan="{colspan}"' if colspan > 1 else ""
            cells.append(f"<{tag}{spans}>{text}</{tag}>")

        lines.append("<tr>" + "".join(cells) + "</tr>")

    lines.append("</table>")

    return "\n" + "\n".join(lines) + "\n"


def parse_html(html: str | None) -> tuple[str, list[dict[str, str | None]]]:
    parser = HTMLContentParser()
    parser.feed(html or "")
    return parser.text(), parser.images


def fold(text: str) -> str:
    """
    Uppercase + remove Vietnamese accents for cheap rule matching.
    """
    normalized = unicodedata.normalize("NFD", text)

    return "".join(
        char
        for char in normalized
        if unicodedata.category(char) != "Mn"
    ).upper()


def flatten_blocks(ocr: dict[str, Any]) -> list[dict[str, Any]]:
    """
    Keep only blocks inside each Page.

    Important:
    Do NOT parse Page.html itself because it duplicates all child blocks.
    """
    blocks: list[dict[str, Any]] = []

    for page in ocr.get("children", []):
        if page.get("block_type") != "Page":
            continue

        page_number = page.get("page", 0)

        for block in page.get("children", []):
            if block.get("block_type") in {"PageHeader", "PageFooter"}:
                continue

            item = dict(block)

            if item.get("page") is None:
                item["page"] = page_number

            blocks.append(item)

    return blocks


def detect_section(text: str) -> str | None:
    match = PART_RE.search(text)

    if not match:
        return None

    return match.group(1).upper()


def infer_question_type(header: str, section: str | None) -> str:
    normalized = fold(header)

    if "DUNG" in normalized and "SAI" in normalized:
        return "true_false"

    if "TRA LOI NGAN" in normalized:
        return "short_answer"

    if (
        "NHIEU PHUONG AN" in normalized
        or "CHON MOT PHUONG AN" in normalized
        or "CHI CHON MOT PHUONG AN" in normalized
    ):
        return "multiple_choice"

    # Fallback for the current Vietnamese THPT exam format.
    return {
        "I": "multiple_choice",
        "II": "true_false",
        "III": "short_answer",
    }.get(section, "unknown")


def is_end_marker(text: str) -> bool:
    normalized = fold(text)
    only_letters = re.sub(r"[^A-Z]", "", normalized)
    return only_letters == "HET"


def source_block(block: dict[str, Any]) -> SourceBlock:
    bbox = block.get("bbox")

    return SourceBlock(
        id=block.get("id"),
        page=int(block.get("page", 0)),
        bbox=list(bbox) if bbox else None,
    )


def append_source(question: Question, block: dict[str, Any]) -> None:
    source = source_block(block)

    if source.id is not None:
        for existing in question.source_blocks:
            if existing.id == source.id:
                return

    question.source_blocks.append(source)


def image_path(prefix: str, name: str) -> str:
    if not prefix:
        return name

    return f"{prefix.rstrip('/')}/{name.lstrip('/')}"


def image_markers(images: list[ImageRef]) -> str:
    return "\n\n".join(f"![{image.alt or ''}]({image.path})" for image in images)


def extract_images(
    block: dict[str, Any],
    parsed_images: list[dict[str, str | None]],
    image_path_prefix: str,
) -> list[ImageRef]:
    result: list[ImageRef] = []
    seen: set[str] = set()

    bbox = block.get("bbox")
    bbox_value = list(bbox) if bbox else None
    page = block.get("page")

    # First use <img src="..." alt="..."> from block HTML.
    for image in parsed_images:
        name = image.get("src")

        if not name or name in seen:
            continue

        seen.add(name)

        result.append(
            ImageRef(
                id=name,
                path=image_path(image_path_prefix, name),
                page=int(page) if page is not None else None,
                bbox=bbox_value,
                alt=image.get("alt"),
            )
        )

    # Fallback: Datalab also keeps images as {filename: base64}.
    for name in (block.get("images") or {}).keys():
        if name in seen:
            continue

        seen.add(name)

        result.append(
            ImageRef(
                id=name,
                path=image_path(image_path_prefix, name),
                page=int(page) if page is not None else None,
                bbox=bbox_value,
                caption=None,
            )
        )

    return result


def extract_options(text: str) -> list[Option]:
    """
    Extract A/B/C/D from a Datalab ListGroup.

    There is one annoying OCR case such as:

        A. ... + C. B. ... + C. C. ... + C. D. ...

    where the integration constant "C." looks like an option label.
    We therefore:
      1. remove immediately repeated identical labels,
      2. explicitly choose A -> B -> C -> D in order.
    """
    markers = list(OPTION_RE.finditer(text))

    if not markers:
        return []

    cleaned = []

    for index, marker in enumerate(markers):
        if index + 1 < len(markers):
            next_marker = markers[index + 1]

            same_label = (
                next_marker.group(1).upper()
                == marker.group(1).upper()
            )

            almost_adjacent = (
                next_marker.start() - marker.end()
                <= 2
            )

            if same_label and almost_adjacent:
                continue

        cleaned.append(marker)

    selected = []
    position = 0

    for expected_label in ("A", "B", "C", "D"):
        marker = next(
            (
                candidate
                for candidate in cleaned
                if candidate.group(1).upper() == expected_label
                and candidate.start() >= position
            ),
            None,
        )

        if marker is None:
            return []

        selected.append(marker)
        position = marker.end()

    options: list[Option] = []

    for index, marker in enumerate(selected):
        end = (
            selected[index + 1].start()
            if index + 1 < len(selected)
            else len(text)
        )

        content = text[marker.end():end].strip()

        options.append(
            Option(
                label=marker.group(1).upper(),
                content=content,
            )
        )

    return options


def extract_multiple_parts(text: str) -> list[QuestionPart]:
    """
    For one ListGroup containing:
        a) ...
        b) ...
        c) ...
        d) ...
    """
    markers = list(PART_ITEM_RE.finditer(text))

    if len(markers) < 2:
        return []

    parts: list[QuestionPart] = []

    for index, marker in enumerate(markers):
        end = (
            markers[index + 1].start()
            if index + 1 < len(markers)
            else len(text)
        )

        content = text[marker.end():end].strip()

        parts.append(
            QuestionPart(
                label=marker.group(1).lower(),
                content=content,
            )
        )

    return parts


def extract_single_part(text: str) -> QuestionPart | None:
    """
    For Datalab blocks where each true/false item is a separate Text block:
        a) ...
        b) ...
    """
    match = PART_ITEM_START_RE.match(text)

    if not match:
        return None

    return QuestionPart(
        label=match.group(1).lower(),
        content=text[match.end():].strip(),
    )


def append_content(question: Question, text: str) -> None:
    text = text.strip()

    if not text:
        return

    if question.content:
        question.content = f"{question.content}\n\n{text}"
    else:
        question.content = text


def extract_inline_solution_start(text: str) -> str | None:
    match = re.compile(r"^\s*(?:Lời\s+giải|Bài\s+giải)\s*:?\s*(.*)$", re.IGNORECASE | re.DOTALL).match(text)

    if not match:
        return None

    return match.group(1).strip()


def parse_questions(
    blocks: list[dict[str, Any]],
    image_path_prefix: str,
) -> list[tuple[str | None, Question]]:
    """
    Parse the exam/questions part.

    Returns (section, Question) internally so "Câu 1" in PHẦN I,
    PHẦN II and PHẦN III do not collide.
    """
    records: list[tuple[str | None, Question]] = []

    current_section: str | None = None
    current_type = "unknown"
    current_question: Question | None = None
    in_inline_solution = False

    for block in blocks:
        text, parsed_images = parse_html(block.get("html"))

        if not text and not parsed_images:
            continue

        if is_end_marker(text):
            if current_question is not None:
                records.append((current_section, current_question))
                current_question = None
            break

        section = detect_section(text)

        if section is not None:
            if current_question is not None:
                records.append((current_section, current_question))
                current_question = None

            current_section = section
            current_type = infer_question_type(text, section)
            in_inline_solution = False
            continue

        question_match = QUESTION_RE.match(text)

        if question_match:
            if current_question is not None:
                records.append((current_section, current_question))

            number = question_match.group(1)
            content = text[question_match.end():].strip()

            current_question = Question(
                section=current_section,
                number=number,
                type=current_type,
                content=content,
                source_blocks=[source_block(block)],
            )

            in_inline_solution = False

            # Very rare but safe: question-start block itself may contain image.
            images = extract_images(
                block,
                parsed_images,
                image_path_prefix,
            )

            if images:
                current_question.images.extend(images)
                append_content(current_question, image_markers(images))

            continue

        if current_question is None:
            continue

        images = extract_images(
            block,
            parsed_images,
            image_path_prefix,
        )

        if images:
            current_question.images.extend(images)
            append_content(current_question, image_markers(images))
            append_source(current_question, block)

        inline_solution = extract_inline_solution_start(text)
        if inline_solution is not None:
            in_inline_solution = True

            # If the inline solution is on the same block as the question content
            if inline_solution:
                if current_question.solution:
                    current_question.solution = (
                        f"{current_question.solution}\n\n{inline_solution}"
                    )
                else:
                    current_question.solution = inline_solution

            append_source(current_question, block)

            continue

        # If we are currently in an inline solution block, append the text to the solution.
        if in_inline_solution:
            if text:
                if current_question.solution:
                    current_question.solution = (
                        f"{current_question.solution}\n\n{text}"
                    )
                else:
                    current_question.solution = text

            append_source(current_question, block)

            continue

        # Multiple choice options.
        if block.get("block_type") in {"ListGroup", "ListItem"}:
            options = extract_options(text)

            if options:
                if current_question.type == "unknown":
                    current_question.type = "multiple_choice"

                current_question.options.extend(options)
                append_source(current_question, block)
                continue

        # True/False options can be either:
        #   1. a single ListGroup block containing a) ... b) ... c) ... d) ...
        #   2. each a/b/c/d as its own Text block.
        if current_question.type == "true_false":
            parts = extract_multiple_parts(text)

            if parts:
                current_question.parts.extend(parts)
                append_source(current_question, block)
                continue

            # Or each a/b/c/d can be its own Text block.
            part = extract_single_part(text)

            if part is not None:
                current_question.parts.append(part)
                append_source(current_question, block)
                continue

        # Figure/Picture blocks usually contain no textual content after
        # image descriptions have been removed.
        if (
            block.get("block_type") in {"Picture", "Figure"}
            and not text
        ):
            continue

        append_content(current_question, text)
        append_source(current_question, block)

    if current_question is not None:
        records.append((current_section, current_question))

    return records


def append_solution(
    store: dict[tuple[str | None, str], str],
    key: tuple[str | None, str],
    text: str,
) -> None:
    text = text.strip()

    if not text:
        return

    previous = store.get(key)

    if previous:
        store[key] = f"{previous}\n\n{text}"
    else:
        store[key] = text


def append_part_solution(
    store: dict[tuple[str | None, str, str], str],
    key: tuple[str | None, str, str],
    text: str,
) -> None:
    text = text.strip()

    if not text:
        return

    previous = store.get(key)

    if previous:
        store[key] = f"{previous}\n\n{text}"
    else:
        store[key] = text


def parse_solutions(
    blocks: list[dict[str, Any]],
) -> tuple[
    dict[tuple[str | None, str], str],
    dict[tuple[str | None, str, str], str],
]:
    """
    Parse everything after "HƯỚNG DẪN GIẢI".

    Question solution key:
        (section, question_number)

    Part solution key for PHẦN II:
        (section, question_number, a/b/c/d)
    """
    question_solutions: dict[tuple[str | None, str], str] = {}
    part_solutions: dict[tuple[str | None, str, str], str] = {}

    current_section: str | None = None
    current_question_key: tuple[str | None, str] | None = None
    current_part: str | None = None

    for block in blocks:
        text, _ = parse_html(block.get("html"))

        if not text:
            continue

        section = detect_section(text)

        if section is not None:
            current_section = section
            current_question_key = None
            current_part = None
            continue

        question_match = QUESTION_RE.match(text)

        if question_match:
            number = question_match.group(1)

            current_question_key = (
                current_section,
                number,
            )

            current_part = None

            remainder = text[question_match.end():].strip()

            if remainder:
                append_solution(
                    question_solutions,
                    current_question_key,
                    remainder,
                )

            continue

        if current_question_key is None:
            continue

        # PHẦN II solutions commonly start with:
        #   a) ĐÚNG: ...
        #   b) SAI: ...
        if current_section == "II":
            part_match = PART_ITEM_START_RE.match(text)

            if part_match:
                current_part = part_match.group(1).lower()

                remainder = text[part_match.end():].strip()

                if remainder:
                    append_part_solution(
                        part_solutions,
                        (
                            current_section,
                            current_question_key[1],
                            current_part,
                        ),
                        remainder,
                    )

                continue

            if current_part is not None:
                append_part_solution(
                    part_solutions,
                    (
                        current_section,
                        current_question_key[1],
                        current_part,
                    ),
                    text,
                )
                continue

        append_solution(
            question_solutions,
            current_question_key,
            text,
        )

    return question_solutions, part_solutions


def is_math_token(token: str) -> bool:
    core = TRAILING_RE.sub("", token)

    if not core or not set(core) <= MATH_CHARS:
        return False

    word = BRACKET_RE.sub("", core)

    if PLAIN_WORD_RE.match(word) and len(word) > 2:
        return word.isupper() or word.lower() in FUNCTIONS

    return True


def math_to_latex(run: str) -> str:
    for symbol, command in SYMBOLS.items():
        run = run.replace(symbol, f" {command} ")

    for name in FUNCTIONS:
        run = re.sub(rf"(?<![\\A-Za-z]){name}(?![A-Za-z])", rf"\\{name}", run)

    run = re.sub(r"(?<!\\)([{}])", r"\\\1", run)

    return re.sub(r"\s+", " ", run).strip()


def wrap_math_run(run: list[str]) -> str:
    body = " ".join(run)
    tail = TRAILING_RE.search(body)
    tail_text = tail.group() if tail else ""
    body = body[: len(body) - len(tail_text)]

    if not body or not STRONG_RE.search(body):
        return f"{body}{tail_text}"

    return f"${math_to_latex(body)}${tail_text}"


def mathify_line(line: str) -> str:
    out: list[str] = []
    run: list[str] = []
    depth = 0

    for token in line.split(" "):
        if run and depth > 0 and not ACCENT_RE.search(token):
            run.append(token)
        elif is_math_token(token):
            run.append(token)
        else:
            if run:
                out.append(wrap_math_run(run))
                run = []

            out.append(token)
            continue

        depth = max(
            0,
            depth
            + sum(char in OPENERS for char in token)
            - sum(char in CLOSERS for char in token),
        )

    if run:
        out.append(wrap_math_run(run))

    return " ".join(out)


def mathify_text(text: str) -> str:
    parts = KEEP_MATH_RE.split(text)
    kept = KEEP_MATH_RE.findall(text) + [""]

    return "".join(mathify_line(part) + keep for part, keep in zip(parts, kept))


def mathify(text: str) -> str:
    """Wrap ASCII math left behind by the OCR in $...$, keeping existing LaTeX spans intact."""
    lines = []

    for line in text.split("\n"):
        stripped = line.lstrip()

        if stripped.startswith("!["):
            lines.append(line)
        elif stripped.startswith("<"):
            lines.append(TAG_TEXT_RE.sub(lambda match: f">{mathify_text(match.group(1))}<", line))
        else:
            lines.append(mathify_text(line))

    return "\n".join(lines)


def mathified(question: Question) -> Question:
    question.content = mathify(question.content)

    for option in question.options:
        option.content = mathify(option.content)

    for part in question.parts:
        part.content = mathify(part.content)

    return question


def rescued(question: Question) -> Question:
    """Pull A/B/C/D or a)/b)/c)/d) back out of a stem an author left them in."""
    if not question.options and question.type in ("unknown", "multiple_choice"):
        options = extract_options(question.content)
        marker = OPTION_RE.search(question.content)

        if len(options) > 1 and marker is not None:
            question.content = question.content[: marker.start()].strip()
            question.options = options
            question.type = "multiple_choice"

    if not question.parts and question.type == "true_false":
        parts = extract_multiple_parts(question.content)
        marker = PART_ITEM_RE.search(question.content)

        if parts and marker is not None:
            question.content = question.content[: marker.start()].strip()
            question.parts = parts

    return mathified(question)


def refine(
    ocr: dict[str, Any] | str,
    source_url: str,
    title: str,
    image_path_prefix: str = "",
    grade: int | None = None,
) -> Document:
    """
    Datalab OCR JSON -> structured Document.

    Args:
        ocr:
            result.json from Datalab.
            Can be either dict or JSON string.

        source_url:
            Original PDF URL.

        title:
            Document title.

        image_path_prefix:
            Prefix used in ImageRef.path.

            Example:
                ""
                -> 9b2d..._img.jpg

                "images"
                -> images/9b2d..._img.jpg

                "https://cdn.example.com/questions"
                -> https://cdn.example.com/questions/9b2d..._img.jpg

    Behavior:
        - Reads page child blocks in document order.
        - Joins questions across page boundaries automatically.
        - Separates PHẦN I / II / III.
        - Parses A/B/C/D.
        - Parses true/false a/b/c/d.
        - Attaches Figure/Picture blocks to the current question.
        - Keeps SourceBlock traceability.
        - If "HƯỚNG DẪN GIẢI" exists, attaches solutions back to
          the corresponding (section, question number).
    """
    if isinstance(ocr, str):
        ocr = json.loads(ocr)

    blocks = flatten_blocks(ocr)

    solution_start = next(
        (
            index
            for index, block in enumerate(blocks)
            if "HUONG DAN GIAI"
            in fold(parse_html(block.get("html"))[0])
        ),
        None,
    )

    if solution_start is None:
        question_blocks = blocks
        solution_blocks: list[dict[str, Any]] = []
    else:
        question_blocks = blocks[:solution_start]
        solution_blocks = blocks[solution_start + 1:]

    records = parse_questions(
        question_blocks,
        image_path_prefix=image_path_prefix,
    )

    if solution_blocks:
        question_solutions, part_solutions = parse_solutions(solution_blocks)

        for section, question in records:
            question.solution = question_solutions.get((section, question.number))

            for part in question.parts:
                part.solution = part_solutions.get(
                    (
                        section,
                        question.number,
                        part.label,
                    )
                )

    for _, question in records:
        rescued(question)

    return Document(
        source_url=source_url,
        title=title,
        grade=grade,
        questions=[question for _, question in records],
    )
