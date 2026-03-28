import './Safari.css'

// ─── ADD YOUR PROJECTS HERE ──────────────────────────────────────────────────
const PROJECTS = [
  // {
  //   title: 'Project Name',
  //   description: 'Short description of what this project is.',
  //   tags: ['Tag1', 'Tag2'],
  //   link: 'https://...',
  // },
]
// ─────────────────────────────────────────────────────────────────────────────

export default function Safari() {
  return (
    <div className="safari-app">
      {/* Browser chrome */}
      <div className="safari-toolbar">
        <div className="safari-nav">
          <button className="safari-nav-btn">◁</button>
          <button className="safari-nav-btn">▷</button>
        </div>
        <div className="safari-addressbar">
          <span className="safari-lock">🔒</span>
          <span className="safari-url">ashnapatel.com/projects</span>
        </div>
        <div style={{ width: 60 }} />
      </div>

      {/* Page content */}
      <div className="safari-content">
        {PROJECTS.length === 0 ? (
          <div className="safari-empty">
            <div className="safari-empty-icon">🧭</div>
            <div className="safari-empty-title">Projects coming soon</div>
            <div className="safari-empty-sub">Add your projects in Safari.jsx to showcase them here.</div>
          </div>
        ) : (
          <div className="safari-projects">
            <h1 className="safari-page-title">Projects</h1>
            <div className="safari-grid">
              {PROJECTS.map((p, i) => (
                <a
                  key={i}
                  className="safari-card"
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="safari-card-title">{p.title}</div>
                  <div className="safari-card-desc">{p.description}</div>
                  <div className="safari-card-tags">
                    {p.tags.map(t => (
                      <span key={t} className="safari-tag">{t}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
