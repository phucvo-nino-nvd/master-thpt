from pathlib import Path

from knowledge.graph.chunk import REFINED_DIR, chunk_markdown_file


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
