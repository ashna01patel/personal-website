import './Preview.css'

const PHOTO = '/profile.jpg'

const EXPERIENCE = [
  {
    company: 'Microsoft',
    logo: '/icons/microsoft.png',
    role: 'Product Manager II — Planner Growth',
    dates: '2022 – Present',
    location: 'New York, NY',
    summary: 'I\'ve spent the last few years working on Planner — a task management product used by millions across Microsoft 365. My work has spanned product-led growth, experimentation infrastructure, and most recently driving adoption of AI agent-based features. That last piece has been the most energizing: working directly with enterprise customers to understand where their workflows break down, identifying adoption blockers, and translating those insights into features and strategies that move the needle.',
  },
  {
    company: 'IBM Watson Health',
    logo: '/icons/ibm.svg',
    role: 'Data Analyst Intern',
    dates: 'May – Aug 2021',
    location: 'Remote',
    summary: 'At IBM Watson Health, I shaped the company\'s market entry strategy for the Healthcare Command Center space and co-built an ML model that identified key drivers of high surgical complication rates.',
  },
]

const SKILLS = {
  'Product': ['Customer Discovery', 'A/B Testing', 'Go-to-Market', 'Agentic AI', 'Product Strategy'],
  'Technical': ['SQL', 'Python', 'Power BI', 'Azure DevOps'],
  'Tools': ['Figma', 'Claude Code', 'Vercel'],
}

export default function Preview() {
  return (
    <div className="preview-app">
      <div className="preview-main">
        <div className="exp-page">

          {/* Hero */}
          <div className="exp-hero">
            <div className="exp-hero-left">
              <div className="exp-photo"></div>
              <h1 className="exp-name">Ashna Patel</h1>
              <div className="exp-title-badge">Product Manager · New York</div>
            </div>
            <div className="exp-hero-text">
              <p className="exp-bio">
                I turn messy customer problems into clean product decisions. At Microsoft I've shipped features
                used by tens of millions of people — from growth experiments to AI-powered experiences.
                I'm at my best working close to customers, getting to the root of real problems before building the thing that actually solves them.
              </p>
              <p className="exp-bio">
                Outside of work, I'm a marathon runner, commissioned visual artist, serial DIY-er, sourdough baker, and firm believer that great PM and builder instincts come from staying curious about everything.
              </p>
              <div className="exp-tags">
                <span className="exp-tag">🏗️ Builder</span>
                <span className="exp-tag">🎨 Visual Art</span>
                <span className="exp-tag">🏃 Marathon Runner</span>
                <span className="exp-tag">🔧 DIY</span>
              </div>
            </div>
          </div>

          <div className="exp-divider" />

          {/* Experience */}
          <section className="exp-section">
            <h2 className="exp-section-title">Experience</h2>
            <div className="exp-timeline">
              {EXPERIENCE.map((job, i) => (
                <div key={i} className="exp-card">
                  <div className="exp-card-header">
                    <img src={job.logo} alt={job.company} className="exp-card-logo-img" />
                    <div className="exp-card-meta">
                      <div className="exp-card-company">{job.company}</div>
                      <div className="exp-card-role">{job.role}</div>
                    </div>
                    <div className="exp-card-right">
                      <div className="exp-card-dates">{job.dates}</div>
                      <div className="exp-card-location">{job.location}</div>
                    </div>
                  </div>
                  <p className="exp-card-summary">{job.summary}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="exp-divider" />

          {/* Education */}
          <section className="exp-section">
            <h2 className="exp-section-title">Education</h2>
            <div className="exp-card">
              <div className="exp-card-header">
                <img src="/icons/unc.png" alt="UNC Chapel Hill" className="exp-card-logo-img" />
                <div className="exp-card-meta">
                  <div className="exp-card-company">UNC Chapel Hill</div>
                  <div className="exp-card-role">BS Computer Science · Minors in Statistics & Cognitive Science</div>
                </div>
                <div className="exp-card-right">
                  <div className="exp-card-dates">2022</div>
                  <div className="exp-card-location">Summa Cum Laude · 3.9 GPA</div>
                </div>
              </div>
              <p className="exp-card-summary">Graduated summa cum laude with a 3.9 GPA in computer science, with minors in statistics and cognitive science. I also served as Sponsorship Chair for <a href="https://pearlhacks.com" target="_blank" rel="noreferrer" className="exp-link">Pearl Hacks</a>, one of the largest hackathons for women and non-binary students in the country — <a href="https://www.unc.edu/discover/pearl-hacks-2022/" target="_blank" rel="noreferrer" className="exp-link">read about the impact</a>.</p>
            </div>
          </section>

          <div className="exp-divider" />

          {/* Skills */}
          <section className="exp-section">
            <h2 className="exp-section-title">Skills</h2>
            <div className="exp-skills">
              {Object.entries(SKILLS).map(([cat, items]) => (
                <div key={cat} className="exp-skill-group">
                  <div className="exp-skill-cat">{cat}</div>
                  <div className="exp-skill-pills">
                    {items.map(skill => (
                      <span key={skill} className="exp-skill-pill">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
