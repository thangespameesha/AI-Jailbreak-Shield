import { Shield, Target, Cpu, GitBranch, Users, ChevronRight } from 'lucide-react'

const techStack = [
  { cat: 'Core ML', items: ['PyTorch 2.2', 'Hugging Face Transformers', 'scikit-learn', 'BERT / RoBERTa'] },
  { cat: 'Backend', items: ['FastAPI', 'Python 3.11', 'Redis Queue', 'PostgreSQL'] },
  { cat: 'Frontend', items: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'Recharts'] },
  { cat: 'Infrastructure', items: ['Docker', 'GitHub Actions CI/CD', 'Hugging Face Hub', 'Weights & Biases'] },
]

const objectives = [
  'Curate and annotate a high-quality adversarial prompt dataset covering 40+ jailbreak and injection attack patterns.',
  'Design a multi-stage classification pipeline that achieves >90% precision and recall on jailbreak detection.',
  'Benchmark performance against existing safety systems (LlamaGuard, Perspective API, OpenAI Moderation).',
  'Deploy a model-agnostic middleware layer compatible with major LLM APIs.',
  'Publish findings and dataset to the AI safety research community under an open license.',
]

const pipeline = [
  { step: '01', title: 'Input Normalization', desc: 'UTF-8 validation, whitespace normalization, encoding attack detection, length bounding.' },
  { step: '02', title: 'Semantic Tokenization', desc: 'BERT tokenizer with subword encoding; extracts intent-bearing token sequences.' },
  { step: '03', title: 'Intent Classifier', desc: 'Fine-tuned RoBERTa classifier trained on 50K labeled prompts; outputs adversarial probability.' },
  { step: '04', title: 'Pattern Matcher', desc: '40+ rule-based regex patterns for known jailbreak templates (DAN, instruction overrides, role-play escalation).' },
  { step: '05', title: 'Risk Aggregator', desc: 'Ensemble weighted sum of semantic score (0.6) + pattern match score (0.4) → risk index 0–100.' },
  { step: '06', title: 'Decision Router', desc: 'Threshold logic: score < 30 → ALLOW; 30–65 → REWRITE (sanitize); > 65 → BLOCK.' },
]

const team = [
  { name: 'Research Lead', role: 'Pipeline Architecture & ML Training', initials: 'RL' },
  { name: 'Fellowship Mentor', role: 'AI Safety Research Advisor', initials: 'FM' },
  { name: 'Data Engineer', role: 'Dataset Curation & Labeling', initials: 'DE' },
  { name: 'Frontend Engineer', role: 'Dashboard & Visualization', initials: 'FE' },
]

export default function About() {
  return (
    <div className="pt-14 min-h-screen grid-bg">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-10">
          <span className="font-mono text-[11px] text-cyan-500 tracking-widest uppercase">About the Project</span>
          <h1 className="font-mono font-700 text-3xl text-white mt-2">AI Jailbreak Shield</h1>
          <p className="text-slate-400 mt-3 leading-relaxed max-w-2xl">
            A research-grade middleware system for detecting and mitigating adversarial prompts targeting Large Language Models, developed as part of the AI Safety Fellowship program.
          </p>
        </div>

        {/* Problem + Solution */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="glass rounded-2xl p-6 border border-red-500/15 glow-red">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Target size={18} className="text-red-400" />
              </div>
              <span className="font-mono font-600 text-sm text-red-300">Problem Statement</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Large Language Models are increasingly deployed in production environments where adversarial users exploit unguarded input pathways through jailbreak attacks, prompt injection, and instruction override techniques.
            </p>
            <div className="space-y-2">
              {[
                'Keyword filters fail against paraphrased attacks',
                'LLMs cannot reliably self-censor adversarial prompts',
                'No universal, model-agnostic defense standard exists',
                'Real-time detection remains computationally challenging',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="text-red-500 mt-0.5 shrink-0">×</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-emerald-500/15 glow-green">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Shield size={18} className="text-emerald-400" />
              </div>
              <span className="font-mono font-600 text-sm text-emerald-300">Solution Overview</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              AI Jailbreak Shield interposes a 6-stage semantic analysis pipeline between user input and LLM execution, combining fine-tuned transformer classifiers with structural pattern matching to detect adversarial intent with high precision.
            </p>
            <div className="space-y-2">
              {[
                'Semantic intent detection with 94.7% precision',
                '40+ attack pattern recognition templates',
                'Sub-50ms analysis overhead in production',
                'Model-agnostic: works with any LLM API',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Pipeline Diagram */}
        <div className="glass rounded-2xl p-6 border border-[rgba(0,212,255,0.1)] mb-8">
          <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase mb-6">AI Defense Pipeline — Architecture</div>
          <div className="space-y-3">
            {pipeline.map((stage, i) => (
              <div key={stage.step} className="flex gap-4 items-start group">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center font-mono text-[11px] text-cyan-400 font-700 border border-cyan-500/20 group-hover:border-cyan-500/50 transition-all">
                    {stage.step}
                  </div>
                  {i < pipeline.length - 1 && <div className="w-0.5 h-5 bg-gradient-to-b from-cyan-500/30 to-transparent mt-1" />}
                </div>
                <div className="pb-2">
                  <div className="font-mono font-600 text-sm text-slate-200 mb-0.5">{stage.title}</div>
                  <div className="text-slate-500 text-[13px] leading-relaxed">{stage.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Objectives */}
        <div className="glass rounded-2xl p-6 border border-[rgba(0,212,255,0.1)] mb-8">
          <div className="flex items-center gap-3 mb-5">
            <GitBranch size={16} className="text-violet-400" />
            <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">Research Objectives</span>
          </div>
          <div className="space-y-3">
            {objectives.map((obj, i) => (
              <div key={i} className="flex gap-3">
                <span className="font-mono text-[11px] text-violet-400 shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-slate-300 text-sm leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="glass rounded-2xl p-6 border border-[rgba(0,212,255,0.1)] mb-8">
          <div className="flex items-center gap-3 mb-5">
            <Cpu size={16} className="text-cyan-400" />
            <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">Technologies Used</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((group) => (
              <div key={group.cat}>
                <div className="font-mono text-[11px] text-cyan-400 font-600 mb-2 tracking-wide">{group.cat}</div>
                <div className="space-y-1.5">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                      <ChevronRight size={10} className="text-slate-600 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="glass rounded-2xl p-6 border border-[rgba(0,212,255,0.1)]">
          <div className="flex items-center gap-3 mb-5">
            <Users size={16} className="text-violet-400" />
            <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">Team & Mentor</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member) => (
              <div key={member.name} className="glass-purple rounded-xl p-4 border border-violet-500/10 hover:border-violet-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 flex items-center justify-center font-mono font-700 text-sm text-cyan-300 mb-3 border border-cyan-500/20">
                  {member.initials}
                </div>
                <div className="font-mono font-600 text-sm text-slate-200 mb-1">{member.name}</div>
                <div className="font-mono text-[10px] text-slate-500 leading-relaxed">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
