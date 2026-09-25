"""Live crawler check. Run: .venv/bin/python tests/test_crawler.py"""

from pathlib import Path
import sys

from dotenv import load_dotenv


root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root))
load_dotenv(root / ".env", override=True)

from roles.crawler.main import crawl
from roles.crawler.schema import CrawlerRequest


request = CrawlerRequest(grade=12, concept="Tích phân", top_k=1)
response = crawl(request)

print(response.model_dump_json(indent=2))
