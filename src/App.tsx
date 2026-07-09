import { useState } from 'react'
import Nav from './components/Nav'
import Landing from './pages/Landing'
import PromptAnalysis from './pages/PromptAnalysis'
import AttackDetection from './pages/AttackDetection'
import Research from './pages/Research'
import About from './pages/About'

export type Page = 'landing' | 'analysis' | 'detection' | 'research' | 'about'

export default function App() {
  const [page, setPage] = useState<Page>('landing')

  return (
    <div className="min-h-screen bg-[#03070f] text-slate-200 font-sans">
      <Nav page={page} setPage={setPage} />
      <main>
        {page === 'landing' && <Landing setPage={setPage} />}
        {page === 'analysis' && <PromptAnalysis />}
        {page === 'detection' && <AttackDetection />}
        {page === 'research' && <Research />}
        {page === 'about' && <About />}
      </main>
    </div>
  )
}
