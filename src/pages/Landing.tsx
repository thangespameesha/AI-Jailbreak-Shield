import { Shield, Zap, Lock, Eye, ChevronRight, GitBranch, Cpu, Globe, Award } from 'lucide-react'
import type { Page } from '../App'

const features = [
  {
    icon: <Zap size={20} className="text-cyan-400" />,
    title: 'Real-Time Detection',
    desc: 'Sub-50ms analysis pipeline classifies prompt intent before LLM execution using multi-stage neural classifiers.',
  },
  {
    icon: <Shield size={20} className="text-violet-400" />,
    title: 'Jailbreak Defense',
    desc: 'Detects 40+ jailbreak categories including DAN, role-play escalation, instruction override, and prompt leaking.',
  },
  {
    icon: <Eye size={20} className="text-cyan-400" />,
    title: 'Intent Analysis',
    desc: 'Semantic intent modeling surfaces adversarial goals that bypass keyword filters with 94.7% precision.',
  },
  {
    icon: <Lock size={20} className="text-violet-400" />,
    title: 'Injection Prevention',
    desc: 'Structural analysis catches prompt injection, system-prompt extraction, and context manipulation attacks.',
  },
  {
    icon: <GitBranch size={20} className="text-cyan-400" />,
    title: 'Decision Engine',
    desc: 'Three-path routing: ALLOW for safe prompts, REWRITE for borderline inputs, BLOCK for confirmed attacks.',
  },
  {
    icon: <Cpu size={20} className="text-violet-400" />,
    title: 'Model-Agnostic',
    desc: 'Works as a universal middleware layer for GPT-4, Claude, Gemini, Llama, and any custom LLM deployment.',
  },
]

const stats = [
  { value: '94.7%', label: 'Detection Precision', color: 'text-cyan-400' },
  { value: '97.2%', label: 'Recall Rate', color: 'text-violet-400' },
  { value: '<50ms', label: 'Latency Overhead', color: 'text-emerald-400' },
  { value: '2.1M+', label: 'Prompts Analyzed', color: 'text-cyan-400' },
  { value: '40+', label: 'Attack Categories', color: 'text-violet-400' },
  { value: '0.98', label: 'AUC-ROC Score', color: 'text-emerald-400' },
]

const pipeline = [
  { label: 'Prompt Analyzer', desc: 'Tokenizes & normalizes input' },
  { label: 'Intent Detection', desc: 'BERT-class semantic model' },
  { label: 'Jailbreak Detector', desc: '40+ pattern classifier' },
  { label: 'Risk Scoring', desc: '0–100 confidence score' },
  { label: 'Decision Engine', desc: 'Allow / Rewrite / Block' },
]

export default function Landing({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
        {/* Ambient glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-600/8 blur-[100px] pointer-events-none" />

        {/* Scan line animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="scan-line absolute inset-x-0 h-48 pointer-events-none" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 border border-cyan-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[11px] text-cyan-400 tracking-widest">AI SAFETY RESEARCH · FELLOWSHIP PROJECT</span>
          </div>

          {/* Shield graphic */}
          <div className="relative inline-flex items-center justify-center mb-8 animate-float">
            <div className="absolute w-40 h-40 rounded-full border border-cyan-500/20 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute w-28 h-28 rounded-full border border-cyan-500/30 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 flex items-center justify-center glow-cyan-strong border border-cyan-500/30">
              <Shield size={36} className="text-cyan-400 text-glow-cyan" />
            </div>
          </div>

          <h1 className="font-mono font-800 text-5xl md:text-7xl tracking-tight mb-6 leading-none">
            <span className="text-white">AI Jailbreak</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent text-glow-cyan">
              Shield
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Protecting Large Language Models from{' '}
            <span className="text-cyan-300 font-500">Prompt Injection</span> and{' '}
            <span className="text-violet-300 font-500">Jailbreak Attacks</span> — in real time,
            at scale, with research-grade precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setPage('analysis')}
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono font-600 text-sm px-8 py-3.5 rounded-lg glow-cyan transition-all hover:scale-105 hover:glow-cyan-strong"
            >
              Try Demo
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => setPage('about')}
              className="inline-flex items-center gap-2 glass text-cyan-300 font-mono font-600 text-sm px-8 py-3.5 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[rgba(0,212,255,0.08)] bg-[#040c1a]">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className={`font-mono font-700 text-2xl ${s.color} mb-1`}>{s.value}</div>
              <div className="text-[11px] text-slate-500 font-500 tracking-wide uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pipeline section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-mono text-[11px] text-cyan-500 tracking-widest uppercase mb-3 block">Architecture</span>
          <h2 className="font-mono font-700 text-3xl text-white mb-4">5-Stage Defense Pipeline</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Every prompt flows through a deterministic multi-stage analysis chain before reaching the LLM.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-0">
          {pipeline.map((stage, i) => (
            <div key={stage.label} className="flex flex-col md:flex-row items-center">
              <div className="glass rounded-xl p-5 w-44 text-center border border-cyan-500/15 hover:border-cyan-500/40 hover:glow-cyan transition-all group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mx-auto mb-3 font-mono text-xs text-cyan-400 font-700 group-hover:scale-110 transition-transform">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="font-mono text-[11px] font-600 text-slate-200 mb-1 leading-tight">{stage.label}</div>
                <div className="font-mono text-[10px] text-slate-500">{stage.desc}</div>
              </div>
              {i < pipeline.length - 1 && (
                <div className="w-0.5 h-6 md:w-8 md:h-0.5 bg-gradient-to-b md:bg-gradient-to-r from-cyan-500/40 to-cyan-500/10 mx-1 my-1 md:my-0" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#040c1a] border-y border-[rgba(0,212,255,0.06)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="font-mono text-[11px] text-violet-400 tracking-widest uppercase mb-3 block">Capabilities</span>
            <h2 className="font-mono font-700 text-3xl text-white mb-4">Built for Adversarial AI</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="glass rounded-xl p-6 border border-[rgba(0,212,255,0.08)] hover:border-[rgba(0,212,255,0.25)] transition-all group hover:glow-cyan">
                <div className="w-10 h-10 rounded-lg bg-[#0a1628] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="font-mono font-600 text-sm text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Impact */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-mono text-[11px] text-cyan-500 tracking-widest uppercase mb-3 block">Research Impact</span>
            <h2 className="font-mono font-700 text-3xl text-white mb-6 leading-tight">
              Advancing the frontier of<br />
              <span className="text-cyan-300">LLM safety research</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              AI Jailbreak Shield addresses the growing threat surface of production LLM deployments,
              providing a research-backed, empirically validated defense framework.
            </p>
            <div className="space-y-3">
              {['Novel multi-stage classification architecture', 'Curated dataset of 50,000+ labeled adversarial prompts', 'Benchmark comparisons against 6 existing safety systems', 'Deployed evaluation across 3 major LLM providers'].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="text-cyan-400 mt-0.5 shrink-0">›</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Fellowship Program', sub: 'AI Safety Research', icon: <Award size={20} className="text-cyan-400" /> },
              { label: 'Open Dataset', sub: '50K+ labeled prompts', icon: <Globe size={20} className="text-violet-400" /> },
              { label: 'Reproducible', sub: 'Full experiment logs', icon: <GitBranch size={20} className="text-cyan-400" /> },
              { label: 'Model-Agnostic', sub: 'Universal middleware', icon: <Cpu size={20} className="text-violet-400" /> },
            ].map((card) => (
              <div key={card.label} className="glass-purple rounded-xl p-5 border border-violet-500/15 hover:border-violet-500/35 transition-all">
                <div className="mb-3">{card.icon}</div>
                <div className="font-mono font-600 text-sm text-white mb-1">{card.label}</div>
                <div className="font-mono text-[11px] text-slate-500">{card.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-[rgba(0,212,255,0.08)]">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="font-mono font-700 text-3xl text-white mb-4">Ready to analyze a prompt?</h2>
          <p className="text-slate-400 mb-8">Enter any prompt and watch the 5-stage defense pipeline analyze it in real time.</p>
          <button
            onClick={() => setPage('analysis')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono font-600 text-sm px-10 py-4 rounded-lg glow-cyan-strong hover:scale-105 transition-all"
          >
            Launch Prompt Analyzer
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(0,212,255,0.08)] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Shield size={12} className="text-white" />
            </div>
            <span className="font-mono text-xs text-slate-500">AI Jailbreak Shield · AI Safety Fellowship 2025</span>
          </div>
          <span className="font-mono text-[11px] text-slate-600">Research · Not for production use without further validation</span>
        </div>
      </footer>
    </div>
  )
}
