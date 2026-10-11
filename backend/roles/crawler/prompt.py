QUERY = "một đề thi thử tốt nghiệp THPT trường THPT môn Toán lớp {grade} {concept} có đáp án PDF"


def build_query(concept: str, grade: int, year: int | None = None) -> str:
    query = QUERY.format(concept=concept, grade=grade)
    return " ".join(f"{query} năm {year}".split() if year else query.split())
