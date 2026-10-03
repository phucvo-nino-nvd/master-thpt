from knowledge.graph.chunk import REFINED_DIR, chunk_markdown_file
import pytest


@pytest.mark.parametrize("line_break", ["<br>", "<br/>", "<br />", "<BR>"])
def test_heading_line_breaks_become_spaces(tmp_path, line_break):
    path = tmp_path / "toan-11-tap-2.md"
    body = "Nội dung<br>giữ nguyên."
    path.write_text(
        f"# CHƯƠNG I.{line_break}HÌNH HỌC\n"
        f"## Bài 3. Phép chiếu vuông góc.{line_break}Góc giữa đường thẳng và mặt phẳng\n"
        f"{body}\n",
        encoding="utf-8",
    )

    chunks = chunk_markdown_file(path)

    assert len(chunks) == 1
    assert chunks[0].id == "toan-11-tap-2:0001"
    assert chunks[0].chapter == "CHƯƠNG I. HÌNH HỌC"
    assert chunks[0].title == "Phép chiếu vuông góc. Góc giữa đường thẳng và mặt phẳng"
    assert chunks[0].content == body


TARGET_IDS = {
    "toan-10-tap-2:0005",
    "toan-10-tap-2:0006",
    "toan-10-tap-2:0007",
    "toan-10-tap-2:0011",
}


if __name__ == "__main__":
    markdown_paths = sorted(REFINED_DIR.glob("*.md"))

    if not markdown_paths:
        raise FileNotFoundError(f"No refined Markdown files found in {REFINED_DIR}")

    found_ids: set[str] = set()

    for markdown_path in markdown_paths:
        chunks = chunk_markdown_file(markdown_path)

        for chunk in chunks:
            if chunk.id not in TARGET_IDS:
                continue

            found_ids.add(chunk.id)

            print("\n" + "=" * 100)
            print(f"ID:      {chunk.id}")
            print(f"Grade:   {chunk.grade}")
            print(f"Chapter: {chunk.chapter}")
            print(f"Title:   {chunk.title}")
            print("-" * 100)
            print(chunk.content)

    missing = TARGET_IDS - found_ids

    if missing:
        print("\nMissing chunks:")
        for chunk_id in sorted(missing):
            print(f"  - {chunk_id}")
