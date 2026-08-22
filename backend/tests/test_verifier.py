from langchain_core.messages import AIMessage

from agents.verifier.main import answered
from agents.verifier.tools import SYMPY_MAX_LENGTH, calculate, tool_messages


def compute(expression: str) -> str:
    return calculate.invoke({"expression": expression})


def test_calculate_evaluates_what_decides_a_question():
    assert compute("integrate(Abs(x**2 - 4*x + 3), (x, 0, 2))") == "2"
    assert compute("binomial(6, 3)") == "20"
    assert compute("solve(x^2 - 4, x)") == "[-2, 2]"
    assert compute("diff(x**3 - 3x, x)") == "3*x**2 - 3"


def test_calculate_settles_equivalent_forms():
    assert compute("simplify(23/5 - 4.6)") == "0"
    assert compute("simplify(1/2 - 0.5)") == "0"
    assert compute("simplify(8/3 - 2)") != "0"


def test_calculate_answers_instead_of_raising():
    assert compute("rm -rf /").startswith("Cannot evaluate")
    assert compute("x" * (SYMPY_MAX_LENGTH + 1)).startswith("Expression too long")


def call(name: str, **args) -> AIMessage:
    return AIMessage(content="", tool_calls=[{"name": name, "args": args, "id": "call-1"}])


def test_tool_messages_answers_every_call_it_is_given():
    assert [message.content for message in tool_messages(call("calculate", expression="binomial(6, 3)"))] == ["20"]
    assert tool_messages(AIMessage(content="verdict")) == []


def test_tool_messages_reports_a_bad_call_instead_of_raising():
    assert tool_messages(call("calculate", wrong="x"))[0].content.startswith("Cannot evaluate")
    assert tool_messages(call("browse", url="x"))[0].content == "No tool named browse."


def test_answered_feeds_results_back_and_stops_on_a_verdict():
    messages = []

    assert answered(messages, call("calculate", expression="binomial(6, 3)")) is True
    assert messages[-1].content == "20"
    assert answered(messages, AIMessage(content="verdict")) is False
