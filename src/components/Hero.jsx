/**
 * Hero.jsx
 * ───────────────────────────────────────────────────────
 * Full-viewport hero with mountain background image.
 * Text overlaid at the bottom of the image — cinematic style.
 *
 * TO CUSTOMISE:
 *   • Background image → replace /mountain-bg.png in /public/
 *   • Headline text    → edit HEADLINE and SUBHEADLINE
 *   • Status badge     → edit STATUS_TEXT
 *   • Quick-links      → edit QUICK_LINKS
 */

import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

/* ── EDITABLE CONTENT ─────────────────────────────── */
const HEADLINE    = 'Building systems that scale.'
const SUBHEADLINE = 'Python · AWS · REST APIs · AI Workflows'
const STATUS_TEXT = 'Open to backend, cloud, and AI application roles'

const QUICK_LINKS = [
  { label: 'View Projects', href: '#projects' },
  { label: 'Work Experience', href: '#experience' },
  { label: 'Contact Me', href: '#contact' },
]
/* ── END EDITABLE CONTENT ─────────────────────────── */

const scrollTo = (href) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section id="hero" className="hero-section" style={{ minHeight: '100vh' }}>
      {/* Background mountain image */}
      <div className="hero-bg">
        <img src="/mountain-bg.png" alt="Atmospheric mountain landscape" />
      </div>

      {/* Content at the bottom */}
      <div className="hero-content" style={{ width: '100%', maxWidth: 820 }}>
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#5cba87', boxShadow: '0 0 8px #5cba87', display: 'inline-block' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em', color: 'rgba(232,228,218,0.7)' }}>
            {STATUS_TEXT}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="display-xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{ marginBottom: '0.75rem', fontStyle: 'italic' }}
        >
          {HEADLINE}
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ fontSize: '1rem', letterSpacing: '0.15em', color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 400, marginBottom: '2.5rem' }}
        >
          {SUBHEADLINE}
        </motion.p>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
        >
          {QUICK_LINKS.map(({ label, href }, i) => (
            <button
              key={label}
              onClick={() => scrollTo(href)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: i === 0 ? '0.65rem 1.5rem' : '0.65rem 1.25rem',
                borderRadius: 8,
                fontSize: '0.8125rem',
                fontWeight: 500,
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                background: i === 0 ? 'var(--accent)' : 'transparent',
                color: i === 0 ? '#0a0c10' : 'var(--text-muted)',
                border: i === 0 ? 'none' : '1px solid var(--border)',
              }}
              onMouseEnter={e => {
                if (i !== 0) {
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.borderColor = 'var(--border-hover)'
                } else {
                  e.currentTarget.style.background = '#dbb96f'
                }
              }}
              onMouseLeave={e => {
                if (i !== 0) {
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                } else {
                  e.currentTarget.style.background = 'var(--accent)'
                }
              }}
            >
              {label}
              {i === 0 && <ArrowRight size={15} />}
            </button>
          ))}
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.75rem', letterSpacing: '0.06em' }}
        >
          <MapPin size={13} />
          San Francisco Bay Area, CA
        </motion.div>
      </div>
    </section>
  )
}
