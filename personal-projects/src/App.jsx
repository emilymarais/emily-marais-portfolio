import { Agentation } from 'agentation'
import yaml from 'js-yaml'
import './App.css'

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  return match ? yaml.load(match[1]) ?? {} : {}
}

// Load all project markdown files at build time
const projectFiles = import.meta.glob('./content/projects/*.md', { as: 'raw', eager: true })
const projects = Object.values(projectFiles)
  .map(parseFrontmatter)
  .filter(p => p.published)

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

      <section className="projects">
        {projects.map((project, i) => (
          <div key={i} className="project-card">
            <h2 className="project-card__title">{project.title}</h2>
            <p className="project-card__description">{project.description}</p>
            {project.tags?.length > 0 && (
              <ul className="project-card__tags">
                {project.tags.map(tag => <li key={tag}>{tag}</li>)}
              </ul>
            )}
            {project.url && <a className="project-card__link" href={project.url} target="_blank" rel="noopener noreferrer">View project →</a>}
          </div>
        ))}
      </section>

      <Agentation />
    </>
  )
}

export default App
