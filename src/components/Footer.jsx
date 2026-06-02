/**
 * Footer.jsx
 * ───────────────────────────────────────────────────────
 */

import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

export default function Footer() {
  return (
    <footer className="footer">
      <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.06em' }}>
        <span style={{ color: 'var(--text-muted)' }}>Akhilesh Pingle</span>
        <span style={{ margin: '0 0.5rem', color: 'var(--border)' }}>·</span>
        <span>© {new Date().getFullYear()}</span>
        <span style={{ margin: '0 0.5rem', color: 'var(--border)' }}>·</span>
        <span>Built with React, Vite, Tailwind</span>
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <a href="https://github.com/akhil16-svg" target="_blank" rel="noopener noreferrer"
          className="social-link" aria-label="GitHub">
          <GithubIcon size={15} />
        </a>
        <a href="https://linkedin.com/in/linkakhil" target="_blank" rel="noopener noreferrer"
          className="social-link" aria-label="LinkedIn">
          <LinkedinIcon size={15} />
        </a>
        <a href="mailto:pingleakhil12@gmail.com"
          className="social-link" aria-label="Email">
          <Mail size={15} />
        </a>
      </div>
    </footer>
  )
}
