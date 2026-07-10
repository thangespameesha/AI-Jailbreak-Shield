# Stage 2: Regex Pattern Detector
from rules.jailbreak_patterns import JAILBREAK_PATTERNS
from rules.injection_patterns import INJECTION_PATTERNS
from rules.malware_patterns import MALWARE_PATTERNS
from rules.web_attack_patterns import WEB_ATTACK_PATTERNS
from rules.phishing_patterns import PHISHING_PATTERNS
from rules.obfuscation_patterns import OBFUSCATION_PATTERNS

def detect_regex_threats(prompt: str, decoded_contents: list) -> dict:
    """
    Scans the normalized prompt and any decoded contents against regular expression patterns.
    """
    matched_patterns = []
    threat_categories = []
    
    def scan(text: str, source: str):
        # Jailbreak attempts & instructions overrides
        for i, pattern in enumerate(JAILBREAK_PATTERNS):
            if pattern.search(text):
                matched_patterns.append(f"Regex Jailbreak #{i+1} ({source})")
                threat_categories.append("Jailbreak Attempts")
                threat_categories.append("Role-play Escalation")
                threat_categories.append("Instruction Override")
                
        # Injections, leaks, system prompts extraction
        for i, pattern in enumerate(INJECTION_PATTERNS):
            if pattern.search(text):
                matched_patterns.append(f"Regex Injection #{i+1} ({source})")
                threat_categories.append("Prompt Injection")
                threat_categories.append("System Prompt Extraction")
                threat_categories.append("Prompt Leaking")
                
        # Malware creation
        for i, pattern in enumerate(MALWARE_PATTERNS):
            if pattern.search(text):
                matched_patterns.append(f"Regex Malware #{i+1} ({source})")
                threat_categories.append("Malware Generation")
                threat_categories.append("Virus Creation")
                threat_categories.append("Ransomware")
                threat_categories.append("Trojan")
                threat_categories.append("Worm")
                threat_categories.append("Keylogger")
                threat_categories.append("Spyware")
                
        # Web attacks (SQLi, XSS, RCE, traverse, shell, etc.)
        for i, pattern in enumerate(WEB_ATTACK_PATTERNS):
            if pattern.search(text):
                matched_patterns.append(f"Regex Web Attack #{i+1} ({source})")
                # Map specific pattern indexes to more granular categories
                if i == 0:
                    threat_categories.append("SQL Injection")
                elif i == 1:
                    threat_categories.append("Cross-Site Scripting (XSS)")
                elif i == 2:
                    threat_categories.append("Command Injection")
                elif i == 3:
                    threat_categories.append("Remote Code Execution")
                elif i == 4:
                    threat_categories.append("Reverse Shell")
                elif i == 5:
                    threat_categories.append("Directory Traversal")
                elif i == 6:
                    threat_categories.append("SSRF")
                    threat_categories.append("XXE")
                else:
                    threat_categories.append("SQL Injection")
                    
        # Phishing and social engineering
        for i, pattern in enumerate(PHISHING_PATTERNS):
            if pattern.search(text):
                matched_patterns.append(f"Regex Phishing #{i+1} ({source})")
                threat_categories.append("Phishing")
                threat_categories.append("Credential Theft")
                threat_categories.append("Social Engineering")
                threat_categories.append("Data Exfiltration")
                
        # Obfuscation patterns
        for i, pattern in enumerate(OBFUSCATION_PATTERNS):
            if pattern.search(text):
                matched_patterns.append(f"Regex Obfuscation #{i+1} ({source})")
                threat_categories.append("Base64 Obfuscation")
                threat_categories.append("Hex Obfuscation")
                threat_categories.append("Unicode Obfuscation")
                threat_categories.append("Encoded Jailbreaks")

    # Scan the main normalized prompt
    scan(prompt, "main")
    
    # Scan all successfully decoded sections
    for encoding_type, decoded_text in decoded_contents:
        scan(decoded_text, f"decoded_{encoding_type}")
        # Explicitly tag as encoded jailbreak
        threat_categories.append("Encoded Jailbreaks")
        if encoding_type == "base64":
            threat_categories.append("Base64 Obfuscation")
        elif encoding_type == "hex":
            threat_categories.append("Hex Obfuscation")

    return {
        "matched_patterns": sorted(list(set(matched_patterns))),
        "threat_categories": sorted(list(set(threat_categories)))
    }
