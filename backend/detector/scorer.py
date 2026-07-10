# Stage 5: Scorer
def calculate_risk(regex_results: dict, keyword_results: dict, semantic_results: dict) -> dict:
    """
    Calculates the final aggregated risk score (0 to 100) and confidence.
    Uses category-based weights and semantic detector output.
    """
    # Merge threat categories from regex and keyword stages
    categories = list(set(regex_results["threat_categories"] + keyword_results["threat_categories"]))
    
    # Weight settings matching the requirements
    category_weights = {
        "Prompt Injection": 35,
        "Jailbreak Attempts": 45,
        "DAN attacks": 45,
        "Role-play Escalation": 45,
        "System Prompt Extraction": 35,
        "Instruction Override": 45,
        "Prompt Leaking": 35,
        
        "Malware Generation": 30,
        "Virus Creation": 30,
        "Ransomware": 30,
        "Trojan": 30,
        "Worm": 30,
        "Keylogger": 30,
        "Spyware": 30,
        
        "SQL Injection": 40,
        "Cross-Site Scripting (XSS)": 40,
        "Command Injection": 40,
        "Remote Code Execution": 50,
        "Reverse Shell": 50,
        "Directory Traversal": 30,
        "SSRF": 35,
        "XXE": 35,
        
        "Phishing": 35,
        "Credential Theft": 35,
        "Social Engineering": 35,
        "Data Exfiltration": 35,
        
        "Base64 Obfuscation": 20,
        "Hex Obfuscation": 20,
        "Unicode Obfuscation": 20,
        "Encoded Jailbreaks": 20
    }
    
    # If we have matched categories, find the maximum weight as a baseline
    if categories:
        matched_weights = [category_weights.get(cat, 15) for cat in categories]
        
        # Sort matched weights in descending order
        matched_weights.sort(reverse=True)
        
        # Aggregate score: start with the highest category weight,
        # then add fractional contributions from other categories to represent cumulative risk
        base_score = matched_weights[0]
        extra_score = sum(matched_weights[1:]) * 0.25
        
        # Add penalty for total number of matched items
        regex_penalty = len(regex_results["matched_patterns"]) * 3
        keyword_penalty = len(keyword_results["matched_keywords"]) * 1
        
        total_score = base_score + extra_score + regex_penalty + keyword_penalty
        
        # Determine ceiling capping (reverse shell and RCE can reach 99, others slightly lower)
        ceiling = 99 if any(cat in ["Reverse Shell", "Remote Code Execution", "Jailbreak Attempts"] for cat in categories) else 90
        risk_score = min(int(total_score), ceiling)
    else:
        # Fallback to semantic score only
        risk_score = int(semantic_results["semantic_score"] * 100)
        
    # Boundary checks
    risk_score = max(min(risk_score, 100), 0)
    
    # Calculate confidence (0.0 to 1.0)
    if categories:
        # Confidence increases with more matched indicators
        base_confidence = 0.60
        match_count = len(regex_results["matched_patterns"]) + len(keyword_results["matched_keywords"])
        added_conf = min(match_count * 0.05 + semantic_results["semantic_score"] * 0.1, 0.40)
        confidence = base_confidence + added_conf
    else:
        # Just use semantic detector's confidence
        confidence = semantic_results["confidence"]
        
    return {
        "risk_score": risk_score,
        "confidence": round(float(confidence), 2),
        "threat_categories": sorted(categories)
    }
