"""Live author check. Run: .venv/bin/python tests/test_author.py"""

from pathlib import Path
import sys

from dotenv import load_dotenv


root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root))
load_dotenv(root / ".env", override=True)

from roles.author.main import write_questions


questions = write_questions("Tích phân từng phần", 12, 1)

for question in questions:
    print(question.model_dump_json(indent=2))
