EXTRACTION_CONTEXT = """
You extract a knowledge graph from Vietnamese high-school mathematics textbooks.

Extract reusable mathematical knowledge only.

Node types:
- CONCEPT: mathematical concept, definition, object, property, or notation.
- THEOREM: reusable theorem, proposition, or mathematical result.
- FORMULA: reusable formula, identity, or symbolic relation.
- METHOD: reusable procedure or solving technique.

Relations:
- REQUIRES: A REQUIRES B means B should be understood before learning, defining, deriving, interpreting, or applying A.
- IS_A: A IS_A B means A is a more specific type or special case of the more general concept B.
- SUBSET_OF: A SUBSET_OF B means A and B are mathematical sets and every element of A belongs to B.
- PART_OF: A PART_OF B means A is an actual structural constituent of B.

Node rules:
- Prefer atomic, reusable knowledge.
- Do not create nodes for exercises, examples, or incidental text.
- Avoid duplicate or unnecessarily fine-grained nodes.
- Create METHOD only for an actual reusable procedure.
- Preserve mathematical notation.
- Correct obvious OCR errors when the intended mathematical term is clear.

Naming rules:
- `id`: uppercase ASCII snake case with Vietnamese diacritics removed.
- `name`: concise natural Vietnamese mathematical terminology.
- Never use the node ID as the node name.
- `description`: concise explanation supported by the textbook content.

Relation rules:
- Create only relations clearly supported by the lesson.
- Prefer no edge over an inaccurate or weak edge.

- Use REQUIRES for meaningful learning or conceptual dependencies.
- REQUIRES direction is strict:
  A REQUIRES B means B should be understood before A.

- Use IS_A only for strict subtype or special-case relationships.
- IS_A direction is strict:
  A IS_A B means A is the more specific concept and B is the more general concept.
- If "A is a specific case/type of B", the edge must be A IS_A B.
- Never reverse IS_A direction.
- Do not use IS_A for mathematical set inclusion.

- Use SUBSET_OF only for mathematical set inclusion.
- SUBSET_OF direction is strict:
  A SUBSET_OF B means every element of A belongs to B.
- Never reverse SUBSET_OF direction.

- Use PART_OF only for genuine structural constituents.
- Do not use PART_OF to mean "belongs to the topic", "is a property of", "is an operation on", or "is used to describe" another concept.

- If no allowed relation accurately represents the connection, create no edge.
- More than one relation between the same nodes is allowed only when each relation adds distinct meaning.
- Every edge source and target must reference IDs present in `nodes`.
- Do not create duplicate edges.

Examples:
- MENH_DE_PHU_DINH IS_A MENH_DE
- CONG_THUC_CONG_COS_A_TRU_B IS_A CONG_THUC_CONG
- MENH_DE_DAO REQUIRES MENH_DE_KEO_THEO
- DIEU_KIEN_CAN REQUIRES MENH_DE_KEO_THEO
- TICH_PHAN REQUIRES NGUYEN_HAM
- TAP_HOP_SO_TU_NHIEN SUBSET_OF TAP_HOP_SO_NGUYEN

Invalid examples:
- MENH_DE IS_A MENH_DE_PHU_DINH
- CONG_THUC_CONG IS_A CONG_THUC_CONG_COS_A_TRU_B
- TAP_HOP_SO_NGUYEN SUBSET_OF TAP_HOP_SO_TU_NHIEN
- GIAO_CUA_HAI_TAP_HOP PART_OF TAP_HOP
- BIEU_DO_VEN PART_OF TAP_HOP

Use the provided grade for every node.
Treat chapter and lesson titles as context, not automatically as nodes.
Return only data matching the provided structured schema.
""".strip()


CANONICALIZATION_CONTEXT = """
You canonicalize knowledge nodes extracted from Vietnamese high-school mathematics textbooks.

The input is one ambiguous group of node occurrences.

Decide whether the occurrences represent:
- the same reusable mathematical knowledge and should be MERGED,
- different mathematical knowledge and should be SPLIT,
- or an unsupported/noisy occurrence that should be DROPPED.

Rules:
- Grade differences alone are not a reason to split.
- The same original ID does not guarantee the same knowledge.
- Different original IDs may still describe the same knowledge.
- Split overloaded IDs when the mathematical meaning differs.
- A CONCEPT and a FORMULA should normally remain separate if one is the mathematical object and the other is a formula describing or calculating it.
- Drop occurrences that are clearly hallucinated, incidental, unsupported, or explicitly described as not being present in the lesson.
- Canonical IDs must be uppercase ASCII snake case.
- Prefer an existing good ID when possible.
- Canonical names must be concise natural Vietnamese mathematical terms.
- Create exactly one assignment for every input occurrence.
- canonical_id may be null only when that occurrence should be dropped.
- Every non-null canonical_id must refer to an ID returned in nodes.
- Return a canonical node definition for every canonical_id used by assignments, even when the canonical_id is unchanged from an original node ID.

Node types:
- CONCEPT: mathematical concept, object, definition, property, or notation.
- THEOREM: reusable theorem, proposition, or mathematical result.
- FORMULA: reusable formula, identity, or symbolic relation.
- METHOD: reusable procedure or solving technique.

Examples:

VECTO_KHONG in grade 10
VECTO_KHONG in grade 12
→ merge into VECTO_KHONG.

VECTO_PHAP_TUYEN meaning a normal vector of a line
VECTO_PHAP_TUYEN meaning a normal vector of a plane
→ split into VECTO_PHAP_TUYEN_DUONG_THANG and VECTO_PHAP_TUYEN_MAT_PHANG.

PHUONG_TRINH_CHINH_TAC describing a conic
PHUONG_TRINH_CHINH_TAC describing a line in space
→ split into separate canonical nodes.

If a node description explicitly says the concept is not mentioned in the lesson
→ drop that occurrence.

Return only data matching the provided structured schema.
""".strip()


SEMANTIC_DEDUP_CONTEXT = """
You judge whether two canonical knowledge nodes from Vietnamese high-school mathematics textbooks represent exactly the same reusable mathematical knowledge.

Return MERGE only when the two nodes are true semantic duplicates and one global node can replace both without losing a meaningful mathematical distinction.

Return KEEP when:
- the nodes are merely related,
- one is a prerequisite, component, property, application, interpretation, consequence, corollary, or partial statement of the other,
- one is a general concept and the other is a strict subtype or special case,
- they use similar formulas but represent different mathematical objects,
- they express the same mathematical pattern in different dimensional spaces or mathematical domains,
- they have the same or similar name but different meanings,
- they belong to different node types,
- or there is meaningful uncertainty about whether they are identical.

Scope rules:
- Do not assume that a shorter or more generic-looking name represents broader mathematical scope.
- Determine semantic scope primarily from the description and the available context, then from aliases and the name.
- If the names differ in specificity but the descriptions define the same mathematical object and the same reusable knowledge, MERGE.
- Treat a node as genuinely broader only when its description or context actually supports the broader scope.
- Different grades alone do not prevent merging.

Dimensional and domain distinctions:
- KEEP a 2D formula separate from a corresponding 3D formula when their coordinate spaces or mathematical objects differ.
- Do not merge nodes merely because one formula is a natural higher-dimensional analogue of another.
- For example, the coordinate formula for the centroid of a triangle in the plane and the coordinate formula for a triangle in Oxyz should remain separate if they encode different coordinate dimensions.

Theorem distinctions:
- KEEP a theorem separate from its interpretation, consequence, corollary, application, or only one part of its statement.
- Heavy overlap in descriptions does not imply identity.
- If one node contains additional mathematical content that the other does not, prefer KEEP unless the difference is purely wording.
- For example, a theorem stating both an integral-area relation and F(b) - F(a) should remain separate from a node that only states the geometric interpretation of the integral.

Examples:
- "Hàm số mũ" and "Hàm mũ", both describing y = a^x with a > 0 and a != 1 → MERGE.
- "Đạo hàm cấp hai" and "Đạo hàm cấp hai của hàm số", with the same definition → MERGE.
- "Giới hạn", described as the value a function approaches, and "Giới hạn của hàm số", described as the limit of a function → MERGE, because both descriptions define the limit of a function.
- "Phương trình chính tắc" of a conic and "Phương trình chính tắc" of a line in space → KEEP.
- A mathematical concept and a formula used to calculate or represent it → KEEP.
- A general concept and a more specific special case → KEEP.
- A 2D coordinate formula and its 3D analogue → KEEP.
- A theorem and its geometric interpretation → KEEP.

Be conservative.
Similarity alone is not enough.
When unsure, return KEEP.

Each candidate pair has a pair_index.
Use pair_index to identify the pair in the output.
Never reproduce, rewrite, correct, normalize, or modify node IDs in the output.

Return one decision for every provided candidate pair.
Return only data matching the provided structured schema.
""".strip()


LINK_CONTEXT = """
You determine the strongest valid mathematical relation between exactly two canonical knowledge nodes from Vietnamese high-school mathematics textbooks.

The input contains:
- LEFT node
- RIGHT node

Judge these eight statements independently:

- left_requires_right
- right_requires_left
- left_is_a_right
- right_is_a_left
- left_subset_of_right
- right_subset_of_left
- left_part_of_right
- right_part_of_left

REQUIRES:
- A REQUIRES B means B should be understood before A.
- Use only for meaningful conceptual, definitional, derivational, or learning prerequisites.
- A method normally requires the concept it operates on.
- A formula normally requires the concept or more fundamental formula from which it is defined or derived.
- Do not use REQUIRES merely because two nodes are related, taught near each other, or one is useful when working with the other.
- Never reverse prerequisite direction.

IS_A:
- A IS_A B means A is a strict subtype or special case of B.
- The specific node points to the general node.
- "Every A is a B" should be mathematically natural.
- Do not use IS_A for applications, interpretations, representations, components, parameters, or tools.
- A formula is not automatically a subtype of the concept it calculates.
- Do not use IS_A for mathematical set inclusion.

SUBSET_OF:
- A SUBSET_OF B means A and B are mathematical sets and every element of A belongs to B.
- Both nodes must genuinely represent sets or set-valued mathematical objects.
- Do not use SUBSET_OF for element membership.
- Do not reinterpret an individual object as a singleton set to force a subset relation.

PART_OF:
- A PART_OF B means A is a genuine structural constituent of B.
- A parameter explicitly contained in a formula or mathematical structure may be PART_OF that structure.
- Do not use PART_OF for prerequisite, application, interpretation, derivation, representation, topical association, or "used to calculate".
- "Used in", "defined using", or "helps determine" does not by itself mean PART_OF.

Precision rules:
- Be conservative.
- Semantic similarity alone is not enough.
- If no allowed relation precisely describes the pair, return all fields false.
- Normally exactly zero or one field should be true.
- Never mark both directions of the same relation true.
- If more than one relation seems plausible, choose only the strongest precise mathematical relation.
- Structural relations IS_A, SUBSET_OF, and PART_OF take precedence over REQUIRES when they exactly describe the relationship.

Examples:

LEFT = "Đạo hàm tại một điểm"
RIGHT = "Giới hạn"

left_requires_right = true
all other fields = false

LEFT = "Giới hạn"
RIGHT = "Phương pháp tính giới hạn"

right_requires_left = true
all other fields = false

LEFT = "Bất phương trình mũ"
RIGHT = "Bất phương trình mũ cơ bản"

right_is_a_left = true
all other fields = false

LEFT = "Biến cố"
RIGHT = "Không gian mẫu"

left_subset_of_right = true
all other fields = false

LEFT = "Căn bậc n"
RIGHT = "Căn số học bậc n"

right_is_a_left = true
all other fields = false

LEFT = "Chỉnh hợp"
RIGHT = "Hoán vị"

right_is_a_left = true
all other fields = false

LEFT = "Công thức cộng"
RIGHT = "Công thức nhân đôi"

right_requires_left = true
all other fields = false

Return only data matching the provided structured schema.
""".strip()