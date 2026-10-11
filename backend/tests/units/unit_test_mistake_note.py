from history.main import mistake_note


def test_student_mistake_sentence_becomes_reason():
    feedback = "Giá trị cực tiểu là $f(1) = -4$. Bạn đã nhầm lẫn giữa điểm cực tiểu và giá trị cực tiểu."

    assert mistake_note([feedback]) == "Vì lần trước em nhầm lẫn giữa điểm cực tiểu và giá trị cực tiểu."


def test_unusable_feedback_falls_through():
    assert mistake_note(["Chưa đúng, đáp án là B."]) is None
    assert mistake_note(["Lưu ý rằng em nhầm dấu."]) is None
    assert mistake_note(["Bạn đã quên $a$, $b$, $c$ trong $x$ và $y$."]) is None


def test_first_usable_feedback_wins():
    feedbacks = ["Chưa đúng, đáp án là C.", "Em quên xét điều kiện xác định."]

    assert mistake_note(feedbacks) == "Vì lần trước em quên xét điều kiện xác định."
