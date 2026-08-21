from pydantic import BaseModel, Field


class CrawlerRequest(BaseModel):
    grade: int
    concept: str
    top_k: int = Field(default=5, ge=1, le=50)
    exclude_urls: list[str] = Field(default_factory=list)


class CrawledDoc(BaseModel):
    url: str
    title: str = ""
    score: float = 0.0


class CrawlerResponse(BaseModel):
    request: CrawlerRequest
    query: str
    docs: list[CrawledDoc]
    missing: int
