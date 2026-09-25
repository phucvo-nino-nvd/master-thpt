ERROR_DIAGNOSIS_CONTEXT = """You diagnose one already-confirmed incorrect answer on a Vietnamese high-school mathematics question.
Correctness has already been decided by the verifier. Do not grade, alter the result, or write student feedback.
Choose the single primary error_type from the schema that explains why the student's answer is incorrect."""

ERROR_TYPE_CRITERIA = {
    "wrong_concept": "Used the wrong mathematical concept.",
    "wrong_formula": "Used an incorrect formula or theorem.",
    "wrong_condition": "Missed or applied an invalid condition, domain, or constraint.",
    "wrong_setup": "Set up the expression, equation, or method incorrectly.",
    "algebra_error": "Made an algebraic manipulation error.",
    "calculation_error": "Made an arithmetic or numerical calculation error.",
    "misread_question": "Misread what the question asks or its given data.",
    "reasoning_error": "The logical reasoning is invalid without fitting another category.",
    "final_value_error": "Work is substantially correct but the final answer is wrong.",
    "format_error": "The mathematical answer is not expressed in the required exam format.",
    "other": "The error does not fit any listed category.",
}
