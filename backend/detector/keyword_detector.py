# Stage 3: Cybersecurity Keyword Detector
from rules.keywords import SECURITY_KEYWORDS

def detect_keyword_threats(prompt: str, decoded_contents: list) -> dict:
    """
    Scans the prompt and decoded contents for security keywords.
    """
    matched_keywords = []
    threat_categories = []
    
    # Standardize inputs to lowercase
    texts_to_scan = [prompt.lower()]
    for _, decoded in decoded_contents:
        texts_to_scan.append(decoded.lower())
        
    for category_name, keywords in SECURITY_KEYWORDS.items():
        for kw in keywords:
            for text in texts_to_scan:
                if kw in text:
                    matched_keywords.append(kw)
                    
                    # Map keyword categories to user-specified threat categories
                    if category_name == "prompt_injection":
                        threat_categories.extend(["Prompt Injection", "Prompt Leaking", "System Prompt Extraction"])
                    elif category_name == "jailbreak":
                        threat_categories.extend(["Jailbreak Attempts", "DAN attacks", "Role-play Escalation", "Instruction Override"])
                    elif category_name == "malware":
                        threat_categories.extend(["Malware Generation", "Virus Creation", "Ransomware", "Trojan", "Worm", "Keylogger", "Spyware"])
                    elif category_name == "web_attack":
                        threat_categories.extend(["SQL Injection", "Cross-Site Scripting (XSS)", "Directory Traversal", "SSRF", "XXE"])
                    elif category_name == "rce_shell":
                        threat_categories.extend(["Command Injection", "Remote Code Execution", "Reverse Shell"])
                    elif category_name == "phishing":
                        threat_categories.extend(["Phishing", "Credential Theft", "Social Engineering", "Data Exfiltration"])
                    elif category_name == "obfuscation":
                        threat_categories.extend(["Base64 Obfuscation", "Hex Obfuscation", "Unicode Obfuscation", "Encoded Jailbreaks"])

    return {
        "matched_keywords": sorted(list(set(matched_keywords))),
        "threat_categories": sorted(list(set(threat_categories)))
    }
