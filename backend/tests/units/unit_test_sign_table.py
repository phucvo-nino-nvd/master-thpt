from roles.parser.refine import mark_undefined_derivative


def cells(*texts):
    return [(text, 1, 1, False) for text in texts]


def test_empty_derivative_under_finite_x_becomes_undefined():
    rows = [
        cells("$x$", "$-\\infty$", "", "$-1$", "", "$0$", "", "$1$", "", "$2$", "", "$+\\infty$"),
        cells("$y'$", "", "+", "0", "-", "0", "+", "", "-", "0", "+", ""),
    ]

    signs = [text for text, *_ in mark_undefined_derivative(rows)[1]]

    assert signs == ["$y'$", "", "+", "0", "-", "0", "+", "||", "-", "0", "+", ""]


def test_collapsed_and_non_sign_tables_are_untouched():
    collapsed = [
        cells("$x$", "$-\\infty$", "-1", "0", "1", "2", "$+\\infty$"),
        cells("$y'$", "+", "0", "-", "0", "+", "-"),
    ]
    variation = [
        cells("$x$", "$-\\infty$", "", "$1$", "", "$+\\infty$"),
        cells("$f'(x)$", "", "+", "0", "-", ""),
        cells("$f(x)$", "$-\\infty$", "", "2", "", "$-\\infty$"),
    ]
    true_false = [
        cells("", "Mệnh đề", "Đúng", "Sai"),
        cells("a)", "$f'(2) = 2$", "", ""),
    ]

    assert mark_undefined_derivative(collapsed) == collapsed
    assert mark_undefined_derivative(variation) == variation
    assert mark_undefined_derivative(true_false) == true_false
