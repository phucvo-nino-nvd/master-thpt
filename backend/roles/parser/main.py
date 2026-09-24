from datalab_sdk import DatalabClient, ConvertOptions
from dotenv import load_dotenv
from pathlib import Path

import base64
import json
import os

from ..crawler.schema import CrawlerResponse
from .refine import refine


load_dotenv(override=True)

client = DatalabClient(api_key=os.environ.get("DATALAB_API_KEY"))

question_options = ConvertOptions(
    output_format="json",
    disable_image_extraction=False,
    disable_image_captions=False,
    mode="balanced"
)

textbook_options = ConvertOptions(
    output_format="markdown",
    disable_image_extraction=True,
    disable_image_captions=True,
)


def parse_question(crawled: CrawlerResponse) -> list[Path]:
    artifacts_dir = Path(__file__).resolve().parents[3] / "artifacts"
    saved: list[Path] = []

    for doc in crawled.docs:
        result = client.convert(file_url=doc.url, options=question_options)

        document_dir = artifacts_dir / "data" / doc.title
        document_dir.mkdir(parents=True, exist_ok=True)

        images_dir = document_dir / "images"
        images_dir.mkdir(parents=True, exist_ok=True)

        raw_path = document_dir / "raw.json"

        with open(raw_path, "w", encoding="utf-8") as f:
            json.dump(
                {"ocr": result.json},
                f,
                ensure_ascii=False,
                indent=2,
            )

        for image_name, image in result.images.items():
            with open(images_dir / image_name, "wb") as f:
                f.write(base64.b64decode(image))

        refined = refine(
            ocr=result.json,
            source_url=doc.url,
            title=doc.title,
            image_path_prefix="images",
            grade=crawled.request.grade,
        )

        refined_path = document_dir / "refined.json"

        with open(refined_path, "w", encoding="utf-8") as f:
            json.dump(
                refined.model_dump(),
                f,
                ensure_ascii=False,
                indent=2,
            )

        saved.append(refined_path)

    return saved


def parse_textbook(paths: list[str | Path]) -> list[Path]:
    """Convert textbook PDFs to raw Markdown files."""
    artifacts_dir = Path(__file__).resolve().parents[3] / "artifacts"
    textbooks_dir = artifacts_dir / "textbooks"
    textbooks_dir.mkdir(parents=True, exist_ok=True)

    saved: list[Path] = []

    for path in paths:
        path = Path(path)

        result = client.convert(str(path), options=textbook_options)

        output_path = textbooks_dir / f"{path.stem}.md"
        output_path.write_text(result.markdown, encoding="utf-8")

        saved.append(output_path)

    return saved