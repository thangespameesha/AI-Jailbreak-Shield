# Stage 6: Decision Engine
import re

def make_decision(risk_score: int, prompt: str, categories: list) -> dict:
    """
    Decides whether to ALLOW, REWRITE, or BLOCK the prompt based on the risk score.
    Returns the decision, sanitized prompt, and reason string.
    """
    if risk_score >= 65:
        decision = "BLOCK"
        reason = f"Request blocked due to high safety risk ({risk_score}/100). Threat categories: {', '.join(categories)}."
        sanitized_prompt = prompt  # No need to sanitize since it will be blocked
    elif risk_score >= 30:
        decision = "REWRITE"
        reason = f"Request flagged for sanitization ({risk_score}/100). Moderate risk detected: {', '.join(categories)}."
        sanitized_prompt = sanitize_prompt(prompt)
    else:
        decision = "ALLOW"
        reason = "Request allowed. Prompt cleared safety checks."
        sanitized_prompt = prompt
        
    return {
        "decision": decision,
        "sanitized_prompt": sanitized_prompt,
        "reason": reason
    }

def sanitize_prompt(prompt: str) -> str:
    """
    Sanitizes the prompt by redacting or replacing common adversarial patterns and commands.
    """
    sanitized = prompt
    
    # Redaction map for common jailbreak command phrases
    replacements = {
        r"\b(ignore\s+previous\s+instructions|disregard\s+all\s+previous|override\s+instructions)\b": "[REDACTED (Instruction Override Attempt)]",
        r"\b(dan|do\s+anything\s+now|developer\s+mode|unfiltered\s+assistant)\b": "[REDACTED (Role-play Request)]",
        r"\b(system\s+prompt|system\s+instructions|reveal\s+rules|leak\s+prompt)\b": "[REDACTED (System Prompt Extraction Attempt)]",
        r"(<script>|javascript:|onerror\s*=|onload\s*=)": "[REDACTED (Script Scripting Injection)]",
        r"(\bunion\s+select\b|or\s+['\"]?1['\"]?\s*=\s*['\"]?1['\"]?|admin\s*['\"]?\s*--)": "[REDACTED (SQL Injection Attempt)]",
        r"(nc\s+-e\s+|bash\s+-i\s*>\s*&|/dev/tcp/|reverse\s+shell)": "[REDACTED (Shell Command Attempt)]"
    }
    
    for pattern, substitution in replacements.items():
        sanitized = re.sub(pattern, substitution, sanitized, flags=re.IGNORECASE)
        
    return sanitized
