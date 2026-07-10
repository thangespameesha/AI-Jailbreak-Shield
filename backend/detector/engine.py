# Detection Engine Coordinator
from detector.normalizer import normalize_input
from detector.regex_detector import detect_regex_threats
from detector.keyword_detector import detect_keyword_threats
from detector.semantic_detector import SemanticDetector
from detector.scorer import calculate_risk
from detector.decision import make_decision

class DetectionEngine:
    def __init__(self):
        # Initialize semantic model classifier helper
        self.semantic_detector = SemanticDetector()

    def analyze(self, raw_prompt: str) -> dict:
        """
        Executes the full 6-stage detection pipeline.
        """
        # Stage 1: Input Normalization
        norm_results = normalize_input(raw_prompt)
        normalized_prompt = norm_results["normalized_prompt"]
        decoded_contents = norm_results["decoded_contents"]
        
        # Stage 2: Regex Pattern Detection
        regex_results = detect_regex_threats(normalized_prompt, decoded_contents)
        
        # Stage 3: Cybersecurity Keyword Detection
        keyword_results = detect_keyword_threats(normalized_prompt, decoded_contents)
        
        # Stage 4: Semantic Risk Analysis
        semantic_results = self.semantic_detector.analyze_semantic_risk(normalized_prompt)
        
        # Stage 5: Risk Aggregation
        scoring_results = calculate_risk(regex_results, keyword_results, semantic_results)
        
        # Stage 6: Decision Engine
        decision_results = make_decision(
            risk_score=scoring_results["risk_score"],
            prompt=raw_prompt,
            categories=scoring_results["threat_categories"]
        )
        
        # Consolidate details
        return {
            "riskScore": scoring_results["risk_score"],
            "decision": decision_results["decision"],
            "threatCategories": scoring_results["threat_categories"],
            "matchedPatterns": regex_results["matched_patterns"],
            "matchedKeywords": keyword_results["matched_keywords"],
            "confidence": scoring_results["confidence"],
            "reason": decision_results["reason"],
            "sanitizedPrompt": decision_results["sanitized_prompt"]
        }
