from roles.crawler.refine import page_count


PAGE = b"<< /Type /Page /Parent 2 0 R >>\n"
TREE = b"<< /Type /Pages /Kids [3 0 R] /Count 99 >>\n"


def test_page_count_counts_page_objects():
    body = b"%PDF-1.7\n" + PAGE * 7 + TREE

    assert page_count(body) == 7


def test_page_count_of_non_pdf_is_zero():
    assert page_count(b"PK\x03\x04word/document.xml") == 0
