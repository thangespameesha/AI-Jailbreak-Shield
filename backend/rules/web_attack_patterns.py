import re

# Regex patterns for SQL Injection, XSS, Command Injection, RCE, Reverse Shell, Directory Traversal, SSRF, and XXE
WEB_ATTACK_PATTERNS = [
    # SQL Injection (SQLi)
    re.compile(r"(\bunion\s+select\b|\bselect\s+\*\s+from\b|\bdrop\s+table\b|\binsert\s+into\b|or\s+['\"]?1['\"]?\s*=\s*['\"]?1['\"]?|admin\s*['\"]?\s*--)", re.IGNORECASE),
    
    # Cross-Site Scripting (XSS)
    re.compile(r"(<script>|javascript:|onerror\s*=|onload\s*=|alert\(|document\.cookie|<img\s+src\s*=\s*['\"]?x['\"]?)", re.IGNORECASE),
    
    # Command Injection / RCE
    re.compile(r"\b(bash|sh|cmd|powershell)\b\s+.*(-c|-e|/c|--code)", re.IGNORECASE),
    re.compile(r"\b(system|eval|exec|popen|subprocess\.Popen)\b\s*\(", re.IGNORECASE),
    
    # Reverse Shell / Bind Shell
    re.compile(r"(nc\s+-e\s+/bin/sh|nc\s+-e\s+cmd\.exe|bash\s+-i\s*>\s*&|/dev/tcp/|reverse\s+shell|bind\s+shell|sh\s+-i)", re.IGNORECASE),
    
    # Directory Traversal / Local File Inclusion (LFI)
    re.compile(r"(\.\./\.\./\.\.|/etc/passwd|windows/win.ini|boot.ini|\.\.\\\.\.\\\.\.)", re.IGNORECASE),
    
    # SSRF / XXE
    re.compile(r"(http://169.254.169.254|metadata/v1/|<!ENTITY.*SYSTEM|<!DOCTYPE\s+\w+\s+\[\s*<!ENTITY)", re.IGNORECASE)
]
