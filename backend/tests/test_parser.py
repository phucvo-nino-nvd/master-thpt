"""Live Datalab parser check. Set PARSER_TEST_URL, then run this file directly."""

from pathlib import Path
import os
import sys

from dotenv import load_dotenv


root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root))
load_dotenv(root / ".env", override=True)

from roles.crawler.schema import CrawledDoc, CrawlerRequest, CrawlerResponse
from roles.parser.main import parse_question


url = os.environ["PARSER_TEST_URL"]
request = CrawlerRequest(grade=12, concept="Tích phân", top_k=1)
crawled = CrawlerResponse(
    request=request,
    query="live parser test",
    docs=[CrawledDoc(url=url, title="parser-live-test")],
    missing=0,
)
paths = parse_question(crawled)

print("\n".join(str(path) for path in paths))
