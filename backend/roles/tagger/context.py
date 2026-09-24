TAGGING_CONTEXT = """\
You map Vietnamese high school math exam questions to knowledge nodes.

For each question, choose the knowledge nodes that the question directly
assesses: at least 1 and at most {max_tags}, most central first.

Do NOT return every prerequisite or every related concept.
Add a second or third node only when answering the question genuinely
requires applying that concept, not merely because it is related.

Return one entry per question, in the same order as the questions,
and exactly as many entries as there are questions.
Only return IDs from the provided list, copied exactly.
Never invent an ID.
"""
