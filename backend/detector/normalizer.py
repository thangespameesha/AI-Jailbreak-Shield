# Stage 1: Input Normalizer
import unicodedata
import base64
import urllib.parse
import re

def normalize_input(prompt: str) -> dict:
    """
    Normalizes the input prompt:
    1. Standardizes Unicode formatting (NFKC)
    2. Collapses excessive whitespaces
    3. Detects and extracts decoded content from Base64, Hex, and URL-encoded tricks
    4. Limits the overall prompt length
    """
    # 1. Unicode normalization
    normalized = unicodedata.normalize('NFKC', prompt)
    
    # 2. Collapse excessive whitespace
    normalized = " ".join(normalized.split())
    
    # 3. Detect and extract encoded payloads
    decoded_contents = []
    
    # Base64 regex detection and extraction
    b64_pattern = re.compile(r"\b([A-Za-z0-9+/]{20,}=*)\b")
    for match in b64_pattern.finditer(normalized):
        b64_candidate = match.group(1)
        # Fix padding if needed
        padding_needed = -len(b64_candidate) % 4
        padded_candidate = b64_candidate + ('=' * padding_needed)
        try:
            decoded_bytes = base64.b64decode(padded_candidate, validate=True)
            decoded_text = decoded_bytes.decode('utf-8', errors='ignore')
            if len(decoded_text.strip()) > 5:
                decoded_contents.append(("base64", decoded_text.strip()))
        except Exception:
            pass

    # Hex escape sequences (e.g. \x41\x42...)
    hex_pattern = re.compile(r"(?:\\x[0-9a-fA-F]{2})+")
    for match in hex_pattern.finditer(normalized):
        hex_candidate = match.group(0).replace('\\x', '')
        try:
            decoded_text = bytes.fromhex(hex_candidate).decode('utf-8', errors='ignore')
            if len(decoded_text.strip()) > 3:
                decoded_contents.append(("hex", decoded_text.strip()))
        except Exception:
            pass
            
    # Plain Hex character block (e.g. 41424344...)
    hex_block_pattern = re.compile(r"\b([0-9a-fA-F]{16,})\b")
    for match in hex_block_pattern.finditer(normalized):
        hex_candidate = match.group(1)
        try:
            decoded_text = bytes.fromhex(hex_candidate).decode('utf-8', errors='ignore')
            # Check if the decoded text looks like readable text
            if len(decoded_text.strip()) > 5 and all(32 <= ord(c) < 127 or c in '\r\n\t' for c in decoded_text):
                decoded_contents.append(("hex", decoded_text.strip()))
        except Exception:
            pass

    # URL Encoding check
    if "%" in normalized:
        try:
            decoded_text = urllib.parse.unquote(normalized)
            if decoded_text != normalized:
                decoded_contents.append(("url", decoded_text.strip()))
        except Exception:
            pass

    # 4. Limit prompt length to prevent resource exhaustion (e.g. max 5000 characters)
    max_length = 5000
    is_truncated = False
    if len(normalized) > max_length:
        normalized = normalized[:max_length]
        is_truncated = True
        
    return {
        "normalized_prompt": normalized,
        "decoded_contents": decoded_contents,
        "is_truncated": is_truncated
    }
