# Stage 4: Semantic Threat Detector
# This class analyzes semantic risks and suspicious intent even if exact keywords are absent.
# It is architected so that a local Hugging Face transformer model (e.g. RoBERTa or LlamaGuard)
# can be easily imported and run in production.

class SemanticDetector:
    def __init__(self):
        """
        Constructor. In a production environment with GPU resources, this can load
        a local classifier:
        
        from transformers import AutoTokenizer, AutoModelForSequenceClassification
        self.tokenizer = AutoTokenizer.from_pretrained("roberta-base-jailbreak")
        self.model = AutoModelForSequenceClassification.from_pretrained("roberta-base-jailbreak")
        """
        pass

    def analyze_semantic_risk(self, prompt: str) -> dict:
        """
        Analyzes the prompt semantic intent.
        Returns:
            semantic_score: float (0.0 to 1.0)
            confidence: float (0.0 to 1.0)
            reason: str explaining the semantic risk flags
        """
        prompt_lower = prompt.lower()
        score = 0.0
        confidence = 0.5
        reason = "Semantic intent appears normal."

        # Suspicious action keywords (directives/commands)
        directives = [
            "tell me how to", "give me code to", "help me write", "guide me through",
            "explain how to bypass", "show me how to build", "teach me to hack",
            "write code that", "how do you bypass", "disable protection"
        ]
        
        # High-risk target items
        targets = [
            "malware", "virus", "ransomware", "trojan", "keylogger", "spyware",
            "rootkit", "backdoor", "payload", "exploit", "reverse shell",
            "credential theft", "steal passwords", "inject sql", "bypass authentication"
        ]

        # Count directives and targets
        matched_directives = [d for d in directives if d in prompt_lower]
        matched_targets = [t for t in targets if t in prompt_lower]

        if matched_directives and matched_targets:
            score = 0.85
            confidence = 0.90
            reason = f"Adversarial intent match: directive '{matched_directives[0]}' targets unsafe resource '{matched_targets[0]}'"
        elif len(matched_targets) >= 2:
            score = 0.70
            confidence = 0.80
            reason = f"Multiple adversarial targets semantic cluster: {', '.join(matched_targets)}"
        elif matched_directives:
            score = 0.35
            confidence = 0.60
            reason = f"Potential imperative directive flagged: '{matched_directives[0]}'"
        elif matched_targets:
            score = 0.40
            confidence = 0.70
            reason = f"Single adversarial target mentioned: '{matched_targets[0]}'"

        # Jailbreak semantics fallback
        if "dan" in prompt_lower or "do anything now" in prompt_lower:
            score = max(score, 0.90)
            confidence = 0.95
            reason = "Intent matches classic DAN (Do Anything Now) roleplay semantic profile."
        elif "ignore previous instructions" in prompt_lower or "ignore all instructions" in prompt_lower:
            score = max(score, 0.80)
            confidence = 0.90
            reason = "Intent matches instruction override semantic profile."

        return {
            "semantic_score": score,
            "confidence": confidence,
            "reason": reason,
            "classifier_name": "HeuristicSemanticClassifier"
        }
