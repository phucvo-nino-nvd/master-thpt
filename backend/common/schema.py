from typing import Literal
from pydantic import BaseModel, Field


QuestionType = Literal[
    "multiple_choice",
    "true_false",
    "short_answer",
    "free_response",
    "unknown",
]


class SourceBlock(BaseModel):
    id: str | None = None
    page: int
    bbox: list[float] | None = None


class ImageRef(BaseModel):
    id: str
    path: str
    page: int | None = None
    bbox: list[float] | None = None
    alt: str | None = None


class Option(BaseModel):
    label: str                 # A, B, C, D
    content: str               # Markdown + LaTeX


class QuestionPart(BaseModel):
    label: str                 # a, b, c...
    content: str

    solution: str | None = None


class Question(BaseModel):
    section: str | None = None # "I", "II", "III"
    number: str                # "1", "2", "3"

    type: QuestionType = "unknown"

    content: str

    # If question is multiple choice
    options: list[Option] = Field(default_factory=list)

    # If question has multiple parts (a, b, c...)
    parts: list[QuestionPart] = Field(default_factory=list)

    images: list[ImageRef] = Field(default_factory=list)

    solution: str | None = None

    source_blocks: list[SourceBlock] = Field(default_factory=list)


class Document(BaseModel):
    source_url: str
    title: str

    grade: int | None = None

    questions: list[Question]


class Evaluation(BaseModel):
    score: float = Field(ge=0.0, le=1.0)
    correct: bool
    feedback: str