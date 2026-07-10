import re

# Regex patterns for Jailbreak Attempts, DAN attacks, Role-play Escalation, and Instruction Override
JAILBREAK_PATTERNS = [
    # DAN-like developer modes or Do Anything Now variations
    re.compile(r"\b(dan|do-anything-now|do anything now|dev mode|developer mode|assistant mode)\b", re.IGNORECASE),
    re.compile(r"bypass\s+(safety|rules|boundaries|policies|protocols|restrictions)", re.IGNORECASE),
    re.compile(r"(without|no)\s+(restrictions|limits|bounds|rules|safety|filters)", re.IGNORECASE),
    
    # Role-play framing
    re.compile(r"(pretend\s+you\s+are|acting\s+as|roleplay\s+as|play\s+the\s+role\s+of|fictional\s+scenario)", re.IGNORECASE),
    re.compile(r"(imagine\s+a\s+world|hypothetically\s+speaking|in\s+a\s+simulation|write\s+a\s+story\s+where)", re.IGNORECASE),
    re.compile(r"(game\s+rules|rules\s+of\s+the\s+game|play\s+a\s+game)", re.IGNORECASE),
    
    # Instruction Override & Disregard rules
    re.compile(r"(ignore\s+previous\s+instructions|disregard\s+all\s+previous|override\s+safety|forget\s+guidelines)", re.IGNORECASE),
    re.compile(r"(new\s+rule:|from\s+now\s+on\s+you\s+must|you\s+are\s+now\s+programmed|overwrite\s+instructions)", re.IGNORECASE)
]
