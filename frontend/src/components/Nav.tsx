import { Shield, Activity, BarChart3, BookOpen, Info, Menu, X } from 'lucide-react'
import { useState } from 'react'
import type { Page } from '../App'

const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: 'landing', label: 'Home', icon: <Shield size={14} /> },
  { id: 'analysis', label: 'Prompt Analysis', icon: <Activity size={14} /> },
  { id: 'detection', label: 'Attack Detection', icon: <BarChart3 size={14} /> },
  { id: 'research', label: 'Research', icon: <BookOpen size={14} /> },
  { id: 'about', label: 'About', icon: <Info size={14} /> },
]

export default function Nav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-[rgba(0,212,255,0.1)]">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => setPage('landing')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center glow-cyan">
            <Shield size={14} className="text-white" />
          </div>
          <span className="font-mono font-700 text-sm text-cyan-300 tracking-wider text-glow-cyan">
            AI<span className="text-slate-400 mx-0.5">//</span>JAILBREAK SHIELD
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`nav-link flex items-center gap-1.5 text-xs font-mono font-500 tracking-wide transition-colors ${
                page === item.id
                  ? 'text-cyan-300 active'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            SYSTEM ONLINE
          </span>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-cyan-300 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-[rgba(0,212,255,0.1)] px-4 py-3 flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setOpen(false) }}
              className={`flex items-center gap-2 text-xs font-mono font-500 tracking-wide py-1 ${
                page === item.id ? 'text-cyan-300' : 'text-slate-400'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
