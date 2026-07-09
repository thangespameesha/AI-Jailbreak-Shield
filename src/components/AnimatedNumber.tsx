import { useEffect, useRef, useState } from 'react'

/**
 * Smoothly tweens the displayed number toward `value` whenever it changes,
 * instead of snapping — used to make live-updating KPIs feel like a real
 * streaming dashboard rather than a static page.
 */
export default function AnimatedNumber({
  value,
  decimals = 0,
  duration = 500,
  formatter,
}: {
  value: number
  decimals?: number
  duration?: number
  formatter?: (n: number) => string
}) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const from = fromRef.current
    const to = value
    if (from === to) return

    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = from + (to - from) * eased
      setDisplay(current)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value, duration])

  const rounded = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString()
  return <>{formatter ? formatter(display) : rounded}</>
}
