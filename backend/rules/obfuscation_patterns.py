import re

# Regex patterns for Base64, Hex, Unicode Obfuscation, and Encoded Jailbreaks
OBFUSCATION_PATTERNS = [
    # Base64 detection (matches blocks of Base64 characters length >= 20, optional padding)
    re.compile(r"\b([A-Za-z0-9+/]{20,}=*)\b"),
    
    # Hex escape string detection (e.g. \x41\x42\x43 or 41424344...)
    re.compile(r"(?:\\x[0-9a-fA-F]{2}){4,}"),
    re.compile(r"\b([0-9a-fA-F]{2}){12,}\b"),
    
    # Unicode / Encoded tricks (high frequency of non-ASCII character runs, or character replacements)
    re.compile(r"([^\x00-\x7F]{6,})")
]
