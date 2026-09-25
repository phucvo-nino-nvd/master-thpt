"""Live tagger check. Run: .venv/bin/python tests/test_tagger.py"""

from pathlib import Path
import sys

from dotenv import load_dotenv


root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root))
load_dotenv(root / ".env", override=True)

from knowledge.bank.main import Item
from roles.tagger.main import tag_with_llm


item = Item(
    id="live-tagger-integral",
    source_url="live://tagger",
    source_title="Live tagger test",
    number="1",
    grade=12,
    type="short_answer",
    content="Tính $\\int_0^1 2x\\,dx$.",
    solution="Kết quả: 1.",
)
knowledge_ids = tag_with_llm([item])

print(knowledge_ids)
