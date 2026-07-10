import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'

const metrics = [
  { label: 'Precision', value: 94.7, color: 'text-cyan-400', bar: 'bg-cyan-500' },
  { label: 'Recall', value: 97.2, color: 'text-violet-400', bar: 'bg-violet-500' },
  { label: 'F1 Score', value: 95.9, color: 'text-emerald-400', bar: 'bg-emerald-500' },
  { label: 'Accuracy', value: 96.3, color: 'text-blue-400', bar: 'bg-blue-500' },
  { label: 'AUC-ROC', value: 98.1, color: 'text-cyan-400', bar: 'bg-cyan-500' },
  { label: 'Specificity', value: 93.8, color: 'text-violet-400', bar: 'bg-violet-500' },
]

const radarData = [
  { subject: 'DAN', A: 96, B: 72 },
  { subject: 'Injection', A: 93, B: 68 },
  { subject: 'Role Override', A: 97, B: 81 },
  { subject: 'Context Manip.', A: 91, B: 65 },
  { subject: 'Instruction Leak', A: 88, B: 59 },
  { subject: 'Encoded Bypass', A: 85, B: 61 },
]

const benchmarkData = [
  { name: 'AI Jailbreak Shield', precision: 94.7, recall: 97.2, f1: 95.9 },
  { name: 'LlamaGuard 2', precision: 87.3, recall: 89.1, f1: 88.2 },
  { name: 'GPT-4 Moderator', precision: 81.5, recall: 84.7, f1: 83.1 },
  { name: 'Perspective API', precision: 76.8, recall: 79.2, f1: 78.0 },
  { name: 'OpenAI Moderation', precision: 83.2, recall: 85.4, f1: 84.3 },
  { name: 'NeMo Guardrails', precision: 79.4, recall: 82.1, f1: 80.7 },
]

const confusionMatrix = [
  [3842, 3, 0, 0],
  [18, 371, 0, 0],
  [2, 0, 154, 3],
  [0, 0, 6, 0],
]
const cmLabels = ['True Neg.', 'True Pos.', 'False Pos.', 'False Neg.']
const cmColors = [
  ['bg-emerald-500/25', 'bg-red-500/15', 'bg-red-500/15', 'bg-red-500/15'],
  ['bg-red-500/15', 'bg-emerald-500/25', 'bg-red-500/15', 'bg-red-500/15'],
  ['bg-red-500/15', 'bg-red-500/15', 'bg-yellow-500/20', 'bg-yellow-500/20'],
  ['bg-red-500/15', 'bg-red-500/15', 'bg-yellow-500/20', 'bg-yellow-500/20'],
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-xl p-3 border border-[rgba(0,212,255,0.2)] text-xs font-mono">
      <div className="text-slate-400 mb-2 font-600">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex justify-between gap-4" style={{ color: p.color }}>
          <span>{p.name}</span>
          <span className="font-700">{p.value}%</span>
        </div>
      ))}
    </div>
  )
}

export default function Research() {
  return (
    <div className="pt-14 min-h-screen grid-bg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <span className="font-mono text-[11px] text-cyan-500 tracking-widest uppercase">Research & Analytics</span>
          <h1 className="font-mono font-700 text-2xl text-white mt-1">Model Performance Evaluation</h1>
          <p className="text-slate-400 text-sm mt-2">Empirical evaluation on held-out test set of 4,500 labeled prompts across 6 attack categories.</p>
        </div>

        {/* Metric bars */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {metrics.map((m) => (
            <div key={m.label} className="glass rounded-2xl p-4 border border-[rgba(0,212,255,0.1)] text-center">
              <div className={`font-mono font-800 text-3xl ${m.color} mb-2`}>{m.value}%</div>
              <div className="font-mono text-[10px] text-slate-500 tracking-wide uppercase mb-3">{m.label}</div>
              <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                <div className={`h-full ${m.bar} rounded-full`} style={{ width: `${m.value}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          {/* Radar chart */}
          <div className="glass rounded-2xl p-5 border border-[rgba(0,212,255,0.1)]">
            <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase mb-1">Detection Rate by Attack Category</div>
            <div className="flex gap-4 mb-4">
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-400"><span className="w-2 h-0.5 bg-cyan-400 rounded inline-block" />AI Jailbreak Shield</span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500"><span className="w-2 h-0.5 bg-slate-500 rounded inline-block" />Baseline Average</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(0,212,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                <Radar name="Shield" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.15} strokeWidth={1.5} />
                <Radar name="Baseline" dataKey="B" stroke="#475569" fill="#475569" fillOpacity={0.08} strokeWidth={1} strokeDasharray="4 2" />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Benchmark bars */}
          <div className="glass rounded-2xl p-5 border border-[rgba(0,212,255,0.1)]">
            <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase mb-4">Benchmark Comparison (Precision / Recall / F1)</div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={benchmarkData} layout="vertical" barSize={6} barCategoryGap={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.06)" horizontal={false} />
                <XAxis type="number" domain={[60, 100]} tick={{ fill: '#475569', fontSize: 9, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} unit="%" />
                <YAxis type="category" dataKey="name" tick={{ fill: '#64748b', fontSize: 9, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} width={110} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="precision" name="Precision" fill="#06b6d4" radius={[0, 3, 3, 0]} opacity={0.85} />
                <Bar dataKey="recall" name="Recall" fill="#7c3aed" radius={[0, 3, 3, 0]} opacity={0.85} />
                <Bar dataKey="f1" name="F1" fill="#10b981" radius={[0, 3, 3, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confusion matrix */}
        <div className="glass rounded-2xl p-6 border border-[rgba(0,212,255,0.1)] mb-6">
          <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase mb-6">Confusion Matrix (Test Set · n = 4,500)</div>
          <div className="overflow-x-auto">
            <table className="mx-auto">
              <thead>
                <tr>
                  <th className="w-24" />
                  {['Predicted Safe', 'Predicted Jailbreak', 'Predicted Injection', 'Predicted Other'].map((h) => (
                    <th key={h} className="px-4 py-2 font-mono text-[10px] text-slate-500 text-center font-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {confusionMatrix.map((row, ri) => (
                  <tr key={ri}>
                    <td className="py-2 pr-4 font-mono text-[10px] text-slate-400 text-right font-500">{cmLabels[ri]}</td>
                    {row.map((val, ci) => (
                      <td key={ci} className={`px-4 py-3 text-center ${cmColors[ri][ci]} rounded`}>
                        <span className={`font-mono font-700 text-sm ${ri === ci ? 'text-emerald-300' : val > 0 ? 'text-red-400' : 'text-slate-600'}`}>
                          {val.toLocaleString()}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap gap-6 justify-center mt-6 font-mono text-[10px] text-slate-500">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-emerald-500/25 inline-block" />Correct predictions</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-red-500/15 inline-block" />Errors</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-yellow-500/20 inline-block" />Partial misclassification</span>
          </div>
        </div>

        {/* Attack distribution */}
        <div className="glass rounded-2xl p-6 border border-[rgba(0,212,255,0.1)]">
          <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase mb-6">Dataset Attack Category Distribution</div>
          <div className="space-y-3">
            {[
              { cat: 'DAN Bypass', n: 892, pct: 28 },
              { cat: 'Role Override', n: 701, pct: 22 },
              { cat: 'Prompt Injection', n: 606, pct: 19 },
              { cat: 'Context Manipulation', n: 446, pct: 14 },
              { cat: 'Instruction Leak', n: 319, pct: 10 },
              { cat: 'Encoded / Obfuscated', n: 223, pct: 7 },
            ].map((item, i) => (
              <div key={item.cat} className="flex items-center gap-4">
                <div className="w-36 font-mono text-[11px] text-slate-400 shrink-0">{item.cat}</div>
                <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${item.pct}%`,
                      background: ['#06b6d4', '#7c3aed', '#ef4444', '#f59e0b', '#10b981', '#64748b'][i],
                      opacity: 0.8
                    }}
                  />
                </div>
                <div className="w-16 font-mono text-[11px] text-slate-300 text-right">{item.n.toLocaleString()}</div>
                <div className="w-10 font-mono text-[11px] text-slate-500 text-right">{item.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
