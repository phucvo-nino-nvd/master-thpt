from __future__ import annotations

from dotenv import load_dotenv
from langchain_core.messages import AIMessage, ToolMessage
from langchain_core.tools import tool
from sympy import N
from sympy.parsing.sympy_parser import (
    convert_xor,
    implicit_multiplication_application,
    parse_expr,
    standard_transformations,
)

import os


load_dotenv()

SYMPY_MAX_LENGTH = int(os.getenv("SYMPY_MAX_LENGTH", "200"))
SYMPY_DIGITS = int(os.getenv("SYMPY_DIGITS", "6"))

TRANSFORMATIONS = standard_transformations + (
    convert_xor,
    implicit_multiplication_application,
)

CALCULATE_DESCRIPTION = """
Evaluate one sympy expression exactly and return its value.

Use it for anything that decides correctness, for example:
"integrate(2*x, (x, 0, 1))", "diff(x**3 - 3*x, x)", "solve(x**2 - 4, x)",
"binomial(6, 3)", "limit(sin(x)/x, x, 0)".

To check whether two answers agree, compute their difference:
"simplify(23/5 - 4.6)" returns 0 when they are the same value.
""".strip()


@tool(description=CALCULATE_DESCRIPTION)
def calculate(expression: str) -> str:
    if len(expression) > SYMPY_MAX_LENGTH:
        return f"Expression too long, at most {SYMPY_MAX_LENGTH} characters."

    try:
        value = parse_expr(expression, transformations=TRANSFORMATIONS)
    except Exception as error:
        return f"Cannot evaluate: {error}"

    if not getattr(value, "is_number", False) or value.is_Integer:
        return str(value)

    try:
        return f"{value} = {N(value, SYMPY_DIGITS)}"
    except Exception:
        return str(value)


TOOLS = [calculate]
BY_NAME = {handler.name: handler for handler in TOOLS}


def tool_messages(reply: AIMessage) -> list[ToolMessage]:
    messages = []

    for call in getattr(reply, "tool_calls", []):
        handler = BY_NAME.get(call["name"])

        try:
            content = (
                handler.func(**call["args"])
                if handler is not None
                else f"No tool named {call['name']}."
            )
        except Exception as error:
            content = f"Cannot evaluate: {error}"

        messages.append(ToolMessage(content, tool_call_id=call["id"]))

    return messages
