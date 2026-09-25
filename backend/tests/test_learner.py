"""Live learner diagnosis check. Run: .venv/bin/python tests/test_learner.py"""

from pathlib import Path
import sys

from dotenv import load_dotenv


root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root))
load_dotenv(root / ".env", override=True)

from common.schema import Evaluation, Option
from knowledge.bank.main import Item
from roles.learner.main import diagnose_answer


item = Item(
    id="live-learner-choice",
    source_url="live://learner",
    source_title="Live learner test",
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
teacher_evaluation = Evaluation(
    score=0.0,
    correct=False,
    feedback="Đáp án đúng là A, vì $\\int_0^1 2x\\,dx = 1$.",
)
final_evaluation = Evaluation(
    score=0.0,
    correct=False,
    feedback="Verifier xác nhận đáp án đúng là A.",
)
diagnosis = diagnose_answer(
    item,
    student_answer,
    teacher_evaluation,
    final_evaluation,
)

print(diagnosis.model_dump_json(indent=2))
