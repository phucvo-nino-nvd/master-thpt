from tavily import TavilyClient
from dotenv import load_dotenv
from urllib.parse import urlparse, urljoin, parse_qs
from bs4 import BeautifulSoup

import os
import re
import requests

from .prompt import build_query
from .refine import is_single_exam, page_count
from .schema import CrawledDoc, CrawlerRequest, CrawlerResponse

load_dotenv(override=True)


client = TavilyClient(api_key=os.environ.get("TAVILY_API_KEY"))

PARSABLE = (".pdf", ".doc", ".docx")
DOMAINS = ["toanmath.com"]
TIMEOUT = int(os.getenv("CRAWLER_TIMEOUT", "15"))
MAX_PAGES = int(os.getenv("CRAWLER_MAX_PAGES", "15"))


def crawl(request: CrawlerRequest) -> CrawlerResponse:
    query = build_query(request.concept, request.grade)

    results = client.search(
        query,
        search_depth="advanced",
        max_results=min(request.top_k * 5, 50),
        include_domains=DOMAINS,
    )["results"]

    results.sort(key=lambda r: r.get("score", 0.0), reverse=True)

    # Filter out duplicates and non-parsable URLs
    seen = set(request.exclude_urls)
    docs = []

    for r in results:
        url = r["url"]

        if url in seen or not is_single_exam(r.get("title", ""), url, r.get("content", "")):
            continue

        response = requests.get(url, timeout=TIMEOUT, allow_redirects=True, stream=True)
        content_type = response.headers.get("content-type", "").lower()

        # Tavily returns direct PDF URL
        if (
            "application/pdf" in content_type
            or "application/msword" in content_type
            or "application/vnd.openxmlformats-officedocument.wordprocessingml.document" in content_type
        ):
            url, payload = response.url, response

        # Tavily returns HTML page with a link to the PDF/Word file
        elif "text/html" in content_type:
            soup = BeautifulSoup(response.text, "html.parser")
            file_url = None

            for tag in soup.find_all("a", href=True):
                href = urljoin(response.url, tag["href"])
                text = tag.get_text(" ", strip=True).lower()

                if "download" in text or "tải" in text:
                    if "drive.google.com" in href or urlparse(href).path.lower().endswith(PARSABLE):
                        file_url = href
                        break
                        
            if not file_url:
                continue

            # Google Drive preview -> direct download URL
            if "drive.google.com" in file_url:
                match = re.search(r"/file/d/([^/]+)", file_url)

                if match:
                    file_id = match.group(1)
                    file_url = f"https://drive.google.com/uc?export=download&id={file_id}"
                else:
                    file_id = parse_qs(urlparse(file_url).query).get("id", [None])[0]

                    if file_id:
                        file_url = f"https://drive.google.com/uc?export=download&id={file_id}"

            # Double-check if the file URL is a PDF or Word document
            file_response = requests.get(
                file_url,
                timeout=TIMEOUT,
                allow_redirects=True,
                stream=True,
            )

            file_content_type = file_response.headers.get("content-type", "").lower()
            content_disposition = file_response.headers.get("content-disposition", "").lower()

            is_file = (
                "application/pdf" in file_content_type
                or "application/msword" in file_content_type
                or "application/vnd.openxmlformats-officedocument.wordprocessingml.document" in file_content_type
                or ".pdf" in content_disposition
                or ".doc" in content_disposition
                or ".docx" in content_disposition
            )

            if not is_file:
                continue

            url, payload = file_response.url, file_response

        else:
            continue

        if url in seen or page_count(payload.content) > MAX_PAGES:
            continue

        seen.add(url)

        docs.append(
            CrawledDoc(
                url=url,
                title=r.get("title", ""),
                score=r.get("score", 0.0),
            )
        )

        if len(docs) == request.top_k:
            break

    return CrawlerResponse(
        request=request,
        query=query,
        docs=docs,
        missing=request.top_k - len(docs),
    )