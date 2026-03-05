import { Agentation } from 'agentation'
import './App.css'

const SYMBOLS = [
  '</>', '{}', '[]', '=>', 'px', 'rem', 'var()', 'flex', 'grid',
  'npm', 'fn()', '.tsx', '.jsx', '∆', '∞', '#fff', 'git', '&&',
  'const', 'rgb()', 'svg', '◈', '✦', '@media', 'async', 'await',
  'z-index', 'border:', 'typeof', 'import', '::after', '$var',
]

// Generated once at module load so positions stay stable across re-renders
const particles = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  symbol: SYMBOLS[i % SYMBOLS.length],
  left: `${Math.random() * 52}%`,
  duration: `${6 + Math.random() * 7}s`,
  delay: `${-(Math.random() * 12)}s`,
  fontSize: `${10 + Math.random() * 7}px`,
  opacity: 0.18 + Math.random() * 0.28,
}))

function App() {
  return (
    <>
      <section className="hero">
        <div className="hero__symbols" aria-hidden="true">
          {particles.map(p => (
            <span
              key={p.id}
              className="hero__symbol"
              style={{
                left: p.left,
                animationDuration: p.duration,
                animationDelay: p.delay,
                fontSize: p.fontSize,
              }}
            >
              {p.symbol}
            </span>
          ))}
        </div>

        <div className="hero__bars" aria-hidden="true">
          <div className="hero__bar"></div>
          <div className="hero__bar"></div>
          <div className="hero__bar"></div>
          <div className="hero__bar"></div>
          <div className="hero__bar"></div>
        </div>

        <h1 className="hero__heading">Personal projects</h1>
        <p className="hero__subheading">Designed by me. Executed with Claude Code.</p>
        <span className="hero__arrow" aria-hidden="true">↓</span>
      </section>

      <Agentation />
    </>
  )
}

export default App
