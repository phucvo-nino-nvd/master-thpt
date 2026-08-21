from __future__ import annotations

from pathlib import Path
from dotenv import load_dotenv

import os


load_dotenv()

ROOT = Path(__file__).resolve().parents[3]
DATA_DIR = Path(__file__).resolve().parent / "data"

TEXTBOOK_DIR = ROOT / "artifacts" / "textbooks"
RAW_DIR = TEXTBOOK_DIR / "raw"
REFINED_DIR = TEXTBOOK_DIR / "refined"

KG_DIR = ROOT / "artifacts" / "knowledge_graph"
KNOWLEDGE_GRAPH_PATH = KG_DIR / "knowledge_graph.json"


EXTRACTED_DIR = KG_DIR / "extracted"
EXTRACTION_MODEL = os.getenv("OPENROUTER_EXTRACT_MODEL", "")
CANONICAL_MODEL = os.getenv("OPENROUTER_CANONICAL_MODEL", "")
EMBEDDING_MODEL = os.getenv("OPENROUTER_EMBEDDING_MODEL", "openai/text-embedding-3-small")
KG_OFFLINE = os.getenv("KG_OFFLINE", "").strip().lower() in {"1", "true", "yes", "on"}


CANONICAL_DIR = KG_DIR / "canonical"
GROUP_CACHE_DIR = CANONICAL_DIR / "groups"
GLOBAL_NODES_PATH = CANONICAL_DIR / "global_nodes.json"
NODE_MAPPING_PATH = CANONICAL_DIR / "node_mapping.json"
LOCAL_EDGES_PATH = CANONICAL_DIR / "local_edges.json"
CANONICAL_SUMMARY_PATH = CANONICAL_DIR / "canonicalization_summary.json"


SEMANTIC_DIR = KG_DIR / "semantic"
SEMANTIC_PAIR_DIR = SEMANTIC_DIR / "pairs"
SEMANTIC_EMBEDDING_CACHE_PATH = SEMANTIC_DIR / "embeddings.json"
SEMANTIC_TOP_K = int(os.getenv("SEMANTIC_TOP_K", "8"))
SEMANTIC_MIN_SIMILARITY = float(os.getenv("SEMANTIC_MIN_SIMILARITY", "0.82"))
SEMANTIC_EMBEDDING_BATCH_SIZE = int(os.getenv("SEMANTIC_EMBEDDING_BATCH_SIZE", "64"))
SEMANTIC_JUDGE_BATCH_SIZE = int(os.getenv("SEMANTIC_JUDGE_BATCH_SIZE", "20"))


LINK_DIR = KG_DIR / "link"
LINK_PAIR_DIR = LINK_DIR / "pairs"
LINK_CYCLE_DIR = LINK_DIR / "cycles"
LINK_SUMMARY_PATH = KG_DIR / "link_summary.json"
LINK_EMBEDDING_CACHE_PATH = LINK_DIR / "embeddings.json"
LINK_TOP_K = int(os.getenv("LINK_TOP_K", "10"))
LINK_MIN_SIMILARITY = float(os.getenv("LINK_MIN_SIMILARITY", "0.72"))
LINK_EMBEDDING_BATCH_SIZE = int(os.getenv("LINK_EMBEDDING_BATCH_SIZE", "64"))
LINK_MODEL = os.getenv("OPENROUTER_LINK_MODEL") or CANONICAL_MODEL


NEO4J_DIR = KG_DIR / "neo4j"
NEO4J_URI = os.getenv("NEO4J_URI", "")
NEO4J_USERNAME = os.getenv("NEO4J_USERNAME", "")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "")
NEO4J_DATABASE = os.getenv("NEO4J_DATABASE", "")