"""Live teacher check. Run: .venv/bin/python tests/test_teacher.py"""

from pathlib import Path
import sys

from dotenv import load_dotenv


root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root))
load_dotenv(root / ".env", override=True)

from common.schema import Option
from knowledge.bank.main import Item
from roles.teacher.main import evaluate


item = Item(
    id="live-teacher-choice",
    source_url="live://teacher",
    source_title="Live teacher test",
    number="1",
    grade=12,
    type="multiple_choice",
    content="Giá trị của $\\int_0^1 2x\\,dx$ là:",
    options=[
        Option(label="A", content="$1$"),
        Option(label="B", content="$2$"),
        Option(label="C", content="$0$"),
        Option(label="D", content="$-1$"),
    ],
    solution="Chọn A.",
)
student_answer = "B"
evaluation = evaluate(item, student_answer)

print(evaluation.model_dump_json(indent=2))
