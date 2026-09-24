from pathlib import Path

import base64
import json
import sys

from roles.parser.main import client, question_options
from roles.parser.refine import refine


ROOT = Path(__file__).resolve().parents[1]


if __name__ == "__main__":
    pdf_path = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "sample.pdf"

    result = client.convert(file_path=pdf_path, options=question_options)

    document_dir = ROOT / "artifacts" / "data" / pdf_path.stem
    images_dir = document_dir / "images"
    images_dir.mkdir(parents=True, exist_ok=True)

    with open(document_dir / "raw.json", "w", encoding="utf-8") as f:
        json.dump({"ocr": result.json}, f, ensure_ascii=False, indent=2)

    for image_name, image in (result.images or {}).items():
        with open(images_dir / image_name, "wb") as f:
            f.write(base64.b64decode(image))

    refined = refine(
        ocr=result.json,
        source_url=str(pdf_path),
        title=pdf_path.stem,
        image_path_prefix="images",
    )

    refined_path = document_dir / "refined.json"
    with open(refined_path, "w", encoding="utf-8") as f:
        json.dump(refined.model_dump(), f, ensure_ascii=False, indent=2)

    print(f"{refined_path}: {len(refined.questions)} câu")

    for question in refined.questions:
        print(
            f"  PHẦN {question.section} - Câu {question.number}"
            f" [{question.type}]"
            f" options={len(question.options)}"
            f" parts={len(question.parts)}"
            f" images={len(question.images)}"
            f" solution={'có' if question.solution else 'không'}"
        )
