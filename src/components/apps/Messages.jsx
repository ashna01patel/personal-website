import { useState } from 'react'
import './Messages.css'

function formatTimestamp(minuteOffset = 0) {
  const d = new Date(Date.now() - minuteOffset * 60 * 1000)
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

const decorativeContacts = [
  {
    initials: 'JP',
    name: 'Jane Park',
    preview: 'sounds good, talk soon!',
    date: '3/10',
    color: '#5E5CE6',
  },
  {
    initials: 'MK',
    name: 'Mike Kwan',
    preview: 'haha yes exactly 😄',
    date: '3/9',
    color: '#32ADE6',
  },
  {
    initials: 'SR',
    name: 'Sara R.',
    preview: 'let me check and get back to you',
    date: '3/8',
    color: '#FF6B6B',
  },
]

export default function Messages() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText('ashna01patel@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="messages-app">
      {/* SIDEBAR */}
      <div className="messages-sidebar">
        <div className="messages-search">
          <div className="search-bar">
            <svg className="search-svg" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="#8E8E93" strokeWidth="1.4" />
              <path d="M10.5 10.5L14 14" stroke="#8E8E93" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span className="search-placeholder">Search</span>
          </div>
        </div>

        {/* Active contact first */}
        <div className="messages-contact active">
          <div className="contact-avatar profile-avatar"></div>
          <div className="contact-info">
            <div className="contact-row">
              <span className="contact-name">Ashna Patel</span>
              <span className="contact-date">Now</span>
            </div>
            <span className="contact-preview">ashna01patel@gmail.com</span>
          </div>
        </div>

        {decorativeContacts.map((c, i) => (
          <div key={i} className="messages-contact">
            <div className="contact-avatar" style={{ background: c.color }}>{c.initials}</div>
            <div className="contact-info">
              <div className="contact-row">
                <span className="contact-name">{c.name}</span>
                <span className="contact-date">{c.date}</span>
              </div>
              <span className="contact-preview">{c.preview}</span>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div className="messages-main">
        <div className="messages-header">
          <div className="header-center">
            <div className="contact-avatar header-avatar profile-avatar"></div>
            <span className="messages-title">Ashna Patel</span>
          </div>
          <svg className="info-icon" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#8E8E93" strokeWidth="1.5" />
            <path d="M12 11v6" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="8" r="0.75" fill="#8E8E93" />
          </svg>
        </div>

        <div className="messages-body">
          <div className="timestamp-sep">{formatTimestamp(2)}</div>

          <div className="message-bubble">
            <p>Hey! Thanks for visiting my site. I'm Ashna — a product manager based in NYC. Would love to connect! 👋</p>
          </div>

          <div className="timestamp-sep">{formatTimestamp(1)}</div>

          <div className="message-bubble">
            <p>Best way to reach me is email:</p>
            <div className="link-row">
              <a className="msg-link" href="mailto:ashna01patel@gmail.com">
                ashna01patel@gmail.com
              </a>
              <button className="copy-btn" onClick={copyEmail} title="Copy email">
                {copied ? (
                  <span className="copied-label">Copied!</span>
                ) : (
                  <svg className="chain-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="message-bubble">
            <p>Or find me on LinkedIn:</p>
            <a className="msg-link" href="https://www.linkedin.com/in/ashnatpatel/" target="_blank" rel="noreferrer">
              linkedin.com/in/ashnatpatel
            </a>
          </div>
        </div>

        <div className="input-bar">
          <button className="input-plus">+</button>
          <div className="input-field">
            <span className="input-placeholder">iMessage</span>
          </div>
          <button className="input-emoji-btn">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9.5" stroke="#8E8E93" strokeWidth="1.4" />
              <circle cx="9" cy="10.5" r="1" fill="#8E8E93" />
              <circle cx="15" cy="10.5" r="1" fill="#8E8E93" />
              <path d="M8.5 14.5c.83 1.5 6.17 1.5 7 0" stroke="#8E8E93" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
