QUERY = "đề thi THPT, thi thử ở các điểm trường chuyên, bộ giáo dục {concept} Toán lớp {grade} {type} {difficulty} có đáp án lời giải PDF"

TYPE_MAP = {
    "multiple_choice": "trắc nghiệm nhiều lựa chọn",
    "true_false": "trắc nghiệm đúng sai",
    "short_answer": "trả lời ngắn",
    "free_response": "tự luận",
}

DIFFICULTY_MAP = {
    "nhan_biet": "nhận biết",
    "thong_hieu": "thông hiểu",
    "van_dung": "vận dụng",
    "van_dung_cao": "vận dụng cao",
}


def build_query(concept: str, grade: int, type: str, difficulty: str) -> str:
    return " ".join(
        QUERY.format(
            concept=concept,
            grade=grade,
            type=TYPE_MAP.get(type, type),
            difficulty=DIFFICULTY_MAP.get(difficulty, difficulty),
        ).split()
    )