import re

# Regex patterns for Phishing, Credential Theft, Social Engineering, and Data Exfiltration
PHISHING_PATTERNS = [
    # Phishing / Fake accounts
    re.compile(r"(write|generate)\s+a?\s*(phishing\s+email|fake\s+login|spear\s+phishing)", re.IGNORECASE),
    re.compile(r"(steal\s+credentials|harvest\s+passwords|fake\s+login\s+page|reset\s+your\s+password.*click\s+here)", re.IGNORECASE),
    
    # Social Engineering
    re.compile(r"(social\s+engineering\s+script|trick\s+the\s+user|manipulate\s+support|impersonate\s+admin)", re.IGNORECASE),
    
    # Data Exfiltration
    re.compile(r"(exfiltrate\s+data|exfiltration\s+pipeline|leak\s+sensitive|dump\s+database\s+to|send\s+logs\s+to)", re.IGNORECASE)
]
