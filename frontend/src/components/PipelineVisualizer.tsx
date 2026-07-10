import { useEffect, useState } from 'react'
import { CheckCircle, AlertTriangle, XCircle, Loader2 } from 'lucide-react'

export type StageStatus = 'idle' | 'processing' | 'safe' | 'warning' | 'blocked'
export type Decision = 'allow' | 'rewrite' | 'block' | null

export interface Stage {
  id: string
  label: string
  sublabel: string
  status: StageStatus
  detail: string
}

const stageColors: Record<StageStatus, string> = {
  idle: 'border-slate-700 bg-slate-900/50 text-slate-500',
  processing: 'border-cyan-500/60 bg-cyan-500/5 text-cyan-300',
  safe: 'border-emerald-500/60 bg-emerald-500/5 text-emerald-300',
  warning: 'border-yellow-500/60 bg-yellow-500/5 text-yellow-300',
  blocked: 'border-red-500/60 bg-red-500/5 text-red-300',
}

const stageGlow: Record<StageStatus, string> = {
  idle: '',
  processing: 'shadow-[0_0_16px_rgba(0,212,255,0.25)]',
  safe: 'shadow-[0_0_16px_rgba(16,185,129,0.25)]',
  warning: 'shadow-[0_0_16px_rgba(245,158,11,0.25)]',
  blocked: 'shadow-[0_0_16px_rgba(239,68,68,0.25)]',
}

const decisionConfig: Record<
  Exclude<Decision, null>,
  { label: string; color: string; bg: string; border: string; glow: string; icon: React.ReactNode }
> = {
  allow: {
    label: 'ALLOW',
    color: 'text-emerald-300',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/40',
    glow: 'shadow-[0_0_40px_rgba(16,185,129,0.2)]',
    icon: <CheckCircle size={32} className="text-emerald-400" />,
  },
  rewrite: {
    label: 'REWRITE',
    color: 'text-yellow-300',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/40',
    glow: 'shadow-[0_0_40px_rgba(245,158,11,0.2)]',
    icon: <AlertTriangle size={32} className="text-yellow-400" />,
  },
  block: {
    label: 'BLOCK',
    color: 'text-red-300',
    bg: 'bg-red-500/10',
    border: 'border-red-500/40',
    glow: 'shadow-[0_0_40px_rgba(239,68,68,0.2)]',
    icon: <XCircle size={32} className="text-red-400" />,
  },
}

function StageIcon({ status }: { status: StageStatus }) {
  if (status === 'processing') return <Loader2 size={14} className="text-cyan-400 animate-spin" />
  if (status === 'safe') return <CheckCircle size={14} className="text-emerald-400" />
  if (status === 'warning') return <AlertTriangle size={14} className="text-yellow-400" />
  if (status === 'blocked') return <XCircle size={14} className="text-red-400" />
  return <span className="w-3 h-3 rounded-full border border-slate-600 block" />
}

function ConnectorLine({ active, color }: { active: boolean; color: string }) {
  return (
    <div className="hidden md:flex items-center justify-center w-10 shrink-0">
      <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-slate-800">
        {active && (
          <div
            className={`absolute inset-y-0 left-0 ${color} transition-all duration-700`}
            style={{ width: '100%' }}
          />
        )}
      </div>
    </div>
  )
}

export default function PipelineVisualizer({
  stages,
  decision,
  riskScore,
  explanation,
}: {
  stages: Stage[]
  decision: Decision
  riskScore: number
  explanation: string
}) {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    if (riskScore > 0) {
      let start = 0
      const end = riskScore
      const step = Math.ceil(end / 30)
      const timer = setInterval(() => {
        start = Math.min(start + step, end)
        setDisplayScore(start)
        if (start >= end) clearInterval(timer)
      }, 25)
      return () => clearInterval(timer)
    } else {
      setDisplayScore(0)
    }
  }, [riskScore])

  const scoreColor =
    riskScore < 30 ? 'text-emerald-400' : riskScore < 65 ? 'text-yellow-400' : 'text-red-400'

  const scoreGradient =
    riskScore < 30
      ? 'from-emerald-500 to-emerald-400'
      : riskScore < 65
        ? 'from-yellow-500 to-yellow-400'
        : 'from-red-600 to-red-400'

  return (
    <div className="space-y-6">
      {/* Pipeline stages */}
      <div className="glass rounded-2xl p-6 border border-[rgba(0,212,255,0.1)]">
        <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase mb-5">
          Defense Pipeline
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-0">
          {stages.map((stage, i) => (
            <div key={stage.id} className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto">
              <div
                className={`pipeline-node rounded-xl border p-4 w-full md:w-36 transition-all duration-500 ${stageColors[stage.status]} ${stageGlow[stage.status]} ${stage.status !== 'idle' ? 'active' : ''}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <StageIcon status={stage.status} />
                  <span className="font-mono text-[10px] tracking-wider font-600 leading-tight">
                    {stage.label}
                  </span>
                </div>
                <div className="font-mono text-[9px] text-slate-500 leading-tight">{stage.sublabel}</div>
                {stage.status !== 'idle' && stage.detail && (
                  <div className="mt-2 font-mono text-[9px] leading-tight opacity-80 line-clamp-2">
                    {stage.detail}
                  </div>
                )}
              </div>

              {i < stages.length - 1 && (
                <>
                  {/* vertical connector mobile */}
                  <div className="md:hidden w-0.5 h-5 bg-gradient-to-b from-cyan-500/30 to-transparent ml-6" />
                  {/* horizontal connector desktop */}
                  <ConnectorLine
                    active={stage.status !== 'idle'}
                    color={
                      stage.status === 'blocked'
                        ? 'bg-red-500'
                        : stage.status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-cyan-500'
                    }
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Risk score + Decision */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Risk meter */}
        <div className="glass rounded-2xl p-6 border border-[rgba(0,212,255,0.1)]">
          <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase mb-4">
            Risk Score
          </div>
          <div className="flex items-end gap-4 mb-4">
            <div className={`font-mono font-800 text-5xl ${scoreColor}`}>{displayScore}</div>
            <div className="font-mono text-slate-600 text-lg mb-1">/100</div>
          </div>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden mb-3">
            <div
              className={`h-full bg-gradient-to-r ${scoreGradient} transition-all duration-1000 ease-out rounded-full`}
              style={{ width: `${displayScore}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-[10px] text-slate-600">
            <span>SAFE</span>
            <span>WARNING</span>
            <span>BLOCKED</span>
          </div>
        </div>

        {/* Decision */}
        {decision ? (
          <div
            className={`rounded-2xl p-6 border ${decisionConfig[decision].border} ${decisionConfig[decision].bg} ${decisionConfig[decision].glow} transition-all duration-700`}
          >
            <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase mb-4">
              Decision Engine
            </div>
            <div className="flex items-center gap-4 mb-4">
              {decisionConfig[decision].icon}
              <div className={`font-mono font-800 text-3xl ${decisionConfig[decision].color}`}>
                {decisionConfig[decision].label}
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed font-mono">{explanation}</p>
          </div>
        ) : (
          <div className="glass rounded-2xl p-6 border border-[rgba(0,212,255,0.1)] flex items-center justify-center">
            <div className="text-center text-slate-600">
              <div className="font-mono text-[10px] tracking-widest mb-2">AWAITING INPUT</div>
              <div className="font-mono text-xs">Decision Engine standby</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
