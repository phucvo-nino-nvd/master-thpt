from typing import Literal

from pydantic import BaseModel, Field


ErrorType = Literal[
    "wrong_concept",
    "wrong_formula",
    "wrong_condition",
    "wrong_setup",
    "algebra_error",
    "calculation_error",
    "misread_question",
    "reasoning_error",
    "final_value_error",
    "format_error",
    "other",
]


class ErrorDiagnosis(BaseModel):
    error_type: ErrorType
    confidence: float = Field(ge=0.0, le=1.0)
