QUERY = "một đề thi thử tốt nghiệp THPT trường THPT môn Toán lớp {grade} {concept} có đáp án PDF"


def build_query(concept: str, grade: int) -> str:
    return " ".join(QUERY.format(concept=concept, grade=grade).split())
