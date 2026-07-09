import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import { Shield, AlertTriangle, XCircle, Activity, TrendingUp, Clock, Radio } from 'lucide-react'
import { useState } from 'react'
import { useLiveThreatFeed } from '../hooks/useLiveThreatFeed'
import AnimatedNumber from '../components/AnimatedNumber'

const PIE_COLORS = ['#06b6d4', '#7c3aed', '#ef4444', '#f59e0b', '#10b981', '#64748b', '#ec4899', '#22d3ee', '#a3e635']

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-xl p-3 border border-[rgba(0,212,255,0.2)] text-xs font-mono">
      <div className="text-slate-400 mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</div>
      ))}
    </div>
  )
}

export default function AttackDetection() {
  const [live, setLive] = useState(true)
  const { clock, buckets, recentAttacks, categoryData, hourlyBlocks, totals, avgRisk, blockedRate } =
    useLiveThreatFeed(!live)

  return (
    <div className="pt-14 min-h-screen grid-bg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="font-mono text-[11px] text-cyan-500 tracking-widest uppercase">Attack Detection Dashboard</span>
            <h1 className="font-mono font-700 text-2xl text-white mt-1">Threat Intelligence Center</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLive((v) => !v)}
              className={`flex items-center gap-2 glass rounded-lg px-4 py-2 border transition-colors ${
                live ? 'border-emerald-500/20' : 'border-slate-700'
              }`}
            >
              <span className="relative flex h-2 w-2">
                {live && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${live ? 'bg-emerald-400' : 'bg-slate-600'}`} />
              </span>
              <span className={`font-mono text-[11px] ${live ? 'text-emerald-400' : 'text-slate-500'}`}>
                {live ? 'LIVE' : 'PAUSED'} · {clock.toLocaleTimeString('en-US', { hour12: false })}
              </span>
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'Total Prompts', value: totals.total, icon: <Activity size={16} className="text-cyan-400" />, color: 'text-cyan-300', border: 'border-cyan-500/15' },
            { label: 'Safe Prompts', value: totals.safe, icon: <Shield size={16} className="text-emerald-400" />, color: 'text-emerald-300', border: 'border-emerald-500/15' },
            { label: 'Jailbreak Attempts', value: totals.jailbreak, icon: <XCircle size={16} className="text-red-400" />, color: 'text-red-300', border: 'border-red-500/15' },
            { label: 'Injection Attempts', value: totals.injection, icon: <AlertTriangle size={16} className="text-yellow-400" />, color: 'text-yellow-300', border: 'border-yellow-500/15' },
          ].map((card) => (
            <div key={card.label} className={`glass rounded-2xl p-4 border ${card.border} hover:border-opacity-50 transition-all`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-slate-500 tracking-wide uppercase leading-tight">{card.label}</span>
                {card.icon}
              </div>
              <div className={`font-mono font-800 text-3xl ${card.color}`}>
                <AnimatedNumber value={card.value} />
              </div>
            </div>
          ))}
          <div className="glass rounded-2xl p-4 border border-violet-500/15 hover:border-opacity-50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] text-slate-500 tracking-wide uppercase leading-tight">Avg Risk Score</span>
              <TrendingUp size={16} className="text-violet-400" />
            </div>
            <div className="font-mono font-800 text-3xl text-violet-300">
              <AnimatedNumber value={avgRisk} decimals={1} />
            </div>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          {/* Area chart */}
          <div className="lg:col-span-2 glass rounded-2xl p-5 border border-[rgba(0,212,255,0.1)]">
            <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase mb-4 flex items-center gap-2">
              Attack Trends (Live Window)
              {live && <Radio size={11} className="text-cyan-400 animate-pulse" />}
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={buckets}>
                <defs>
                  <linearGradient id="gradSafe" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradJail" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradInj" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.06)" />
                <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="safe" name="Safe" stroke="#10b981" strokeWidth={1.5} fill="url(#gradSafe)" isAnimationActive animationDuration={600} />
                <Area type="monotone" dataKey="jailbreak" name="Jailbreak" stroke="#ef4444" strokeWidth={1.5} fill="url(#gradJail)" isAnimationActive animationDuration={600} />
                <Area type="monotone" dataKey="injection" name="Injection" stroke="#f59e0b" strokeWidth={1.5} fill="url(#gradInj)" isAnimationActive animationDuration={600} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div className="glass rounded-2xl p-5 border border-[rgba(0,212,255,0.1)]">
            <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase mb-4">Attack Categories</div>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" stroke="none" isAnimationActive animationDuration={500}>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} opacity={0.85} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2 max-h-[130px] overflow-y-auto pr-1">
              {categoryData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span className="font-mono text-[10px] text-slate-400">{item.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-300 font-600">
                    <AnimatedNumber value={item.value} formatter={(n) => `${Math.round(n)}%`} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hourly bars + table */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-4">
          <div className="glass rounded-2xl p-5 border border-[rgba(0,212,255,0.1)]">
            <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase mb-4">Blocks per Window</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={hourlyBlocks} barSize={12}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.06)" />
                <XAxis dataKey="h" tick={{ fill: '#475569', fontSize: 9, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 9, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="v" name="Blocked" fill="#7c3aed" radius={[3, 3, 0, 0]} opacity={0.8} isAnimationActive animationDuration={500} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 pt-3 border-t border-[rgba(0,212,255,0.06)]">
              <div className="font-mono text-[10px] text-slate-500 mb-1">Block Rate (cumulative)</div>
              <div className="font-mono font-700 text-2xl text-red-400">
                <AnimatedNumber value={parseFloat(blockedRate)} decimals={1} formatter={(n) => `${n.toFixed(1)}%`} />
              </div>
            </div>
          </div>

          {/* Recent attacks table */}
          <div className="glass rounded-2xl border border-[rgba(0,212,255,0.1)] overflow-hidden">
            <div className="flex items-center gap-2 p-4 border-b border-[rgba(0,212,255,0.06)]">
              <Clock size={13} className="text-slate-500" />
              <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">Recent Detected Attacks</span>
              {live && <span className="ml-auto font-mono text-[9px] text-emerald-400/70 animate-pulse">streaming…</span>}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(0,212,255,0.06)]">
                    {['ID', 'Time', 'Attack Type', 'Risk', 'Decision', 'Prompt Snippet'].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left font-mono text-[9px] text-slate-600 tracking-widest uppercase font-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentAttacks.map((row) => {
                    const isNew = Date.now() - row.createdAt < 1800
                    return (
                      <tr
                        key={row.id}
                        className={`border-b border-[rgba(0,212,255,0.04)] data-row transition-colors duration-700 ${isNew ? 'row-flash' : ''}`}
                      >
                        <td className="px-4 py-3 font-mono text-[11px] text-slate-500">{row.id}</td>
                        <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{row.ts}</td>
                        <td className="px-4 py-3 font-mono text-[11px] text-cyan-300">{row.type}</td>
                        <td className="px-4 py-3">
                          <span className={`font-mono text-[11px] font-700 ${row.risk >= 65 ? 'text-red-400' : 'text-yellow-400'}`}>{row.risk}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-600 border ${
                            row.decision === 'block'
                              ? 'bg-red-500/15 text-red-300 border-red-500/30'
                              : 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30'
                          }`}>
                            {row.decision.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-[11px] text-slate-500 max-w-xs truncate">{row.snippet}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
