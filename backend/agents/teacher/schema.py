from __future__ import annotations

from pydantic import BaseModel, Field


class Hint(BaseModel):
    hint: str
    level: int = 1