from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List

from services.huggingface_client import generate_response
from detector.engine import DetectionEngine

app = FastAPI(title="AI Jailbreak Shield API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instantiate the modular detection engine
engine = DetectionEngine()

class PromptRequest(BaseModel):
    prompt: str

class PromptResponse(BaseModel):
    riskScore: int
    decision: str
    threatType: Optional[str] = None  # Compatible with old frontend schema
    sanitizedPrompt: Optional[str] = None
    response: Optional[str] = None
    threatCategories: List[str] = []
    matchedPatterns: List[str] = []
    matchedKeywords: List[str] = []
    confidence: float = 0.0
    reason: str = ""

@app.get("/")
def home():
    return {
        "status": "healthy",
        "service": "AI Jailbreak Shield Backend"
    }

@app.post("/api/analyze", response_model=PromptResponse)
def analyze_prompt(request: PromptRequest):
    prompt = request.prompt.strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")
        
    try:
        # Execute the 6-stage detection pipeline
        analysis = engine.analyze(prompt)
        
        # Map threatType for old schema compatibility (first category if any, else None)
        threat_type = analysis["threatCategories"][0] if analysis["threatCategories"] else None
        
        # Route logic based on decision
        if analysis["decision"] == "BLOCK":
            return PromptResponse(
                riskScore=analysis["riskScore"],
                decision=analysis["decision"],
                threatType=threat_type,
                sanitizedPrompt=analysis["sanitizedPrompt"],
                response="Request blocked due to a possible jailbreak attack.",
                threatCategories=analysis["threatCategories"],
                matchedPatterns=analysis["matchedPatterns"],
                matchedKeywords=analysis["matchedKeywords"],
                confidence=analysis["confidence"],
                reason=analysis["reason"]
            )
            
        # ALLOW / REWRITE
        llm_prompt = analysis["sanitizedPrompt"] if analysis["decision"] == "REWRITE" else prompt
        
        try:
            ai_response = generate_response(llm_prompt)
        except Exception as e:
            # Fallback gracefully if Hugging Face API has service/auth errors, retaining security metrics
            ai_response = f"[Hugging Face API Service Error: {str(e)}]"
            
        return PromptResponse(
            riskScore=analysis["riskScore"],
            decision=analysis["decision"],
            threatType=threat_type,
            sanitizedPrompt=analysis["sanitizedPrompt"],
            response=ai_response,
            threatCategories=analysis["threatCategories"],
            matchedPatterns=analysis["matchedPatterns"],
            matchedKeywords=analysis["matchedKeywords"],
            confidence=analysis["confidence"],
            reason=analysis["reason"]
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Security analysis pipeline failure: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )