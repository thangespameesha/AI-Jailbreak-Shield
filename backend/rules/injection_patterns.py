import re

# Regex patterns for Prompt Injection, Prompt Leaking, and System Prompt Extraction
INJECTION_PATTERNS = [
    # System Prompt Extraction and Leaking
    re.compile(r"\b(system\s+prompt|system\s+instructions|developer\s+instructions|leak\s+prompt)\b", re.IGNORECASE),
    re.compile(r"(reveal|print|show|output|leak|display)\s+(your)?\s*(system\s+prompt|internal\s+instructions|system\s+rules)", re.IGNORECASE),
    re.compile(r"what\s+are\s+your\s+(instructions|directives|rules|guidelines)", re.IGNORECASE),
    
    # Prompt Injection syntax overrides (like markdown wrappers, tag injection, translation escapes)
    re.compile(r"(\[ignore|\[override|\[system|\[instruction|\]\s*override)", re.IGNORECASE),
    re.compile(r"(translate\s+the\s+following.*and\s+instead|end\s+of\s+translation.*now\s+do)", re.IGNORECASE),
    re.compile(r"(</system>|<system>|\[assistant\]|\[user\])", re.IGNORECASE)
]
