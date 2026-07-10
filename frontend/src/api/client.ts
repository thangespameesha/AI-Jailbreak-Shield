// Frontend API Client for communicating with the AI Jailbreak Shield Backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface PromptAnalysisRequest {
  prompt: string;
}

export interface PromptAnalysisResponse {
  riskScore: number;
  decision: 'ALLOW' | 'REWRITE' | 'BLOCK';
  threatType?: string;
  sanitizedPrompt?: string;
}

export async function analyzePrompt(prompt: string): Promise<PromptAnalysisResponse> {
  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to analyze prompt');
  }
  
  return response.json();
}
