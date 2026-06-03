/**
 * Sidebar.jsx
 * ─────────────────────────────────────────────────────────────────
 * Desktop: fixed left panel — profile photo, name, role, short bio,
 *          social links, resume button. Nav is handled by FloatingNav.
 * Mobile:  top navbar with hamburger menu that expands full nav.
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, FileText, Mail } from 'lucide-react'

/* ── EDITABLE ─────────────────────────────────────── */
const PROFILE_NAME    = 'Akhilesh Pingle'
const PROFILE_TAGLINE = 'Backend · Cloud · AI'
const PROFILE_BIO     = 'Backend engineer building APIs, cloud systems, and AI workflows at the intersection of reliability and product impact.'
const RESUME_HREF     = '/resume.pdf'

const MOBILE_NAV_LINKS = [
  { label: 'Home',           href: '#hero' },
  { label: 'About',          href: '#about' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Certifications', href: '#education' },
  { label: 'Contact',        href: '#contact' },
]

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/akhil16-svg',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/linkakhil',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:pingleakhil12@gmail.com',
    icon: <Mail size={15} />,
  },
]
/* ── END EDITABLE ─────────────────────────────────── */

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  /* Track scroll for mobile active section */
  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      let current = 'hero'
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 180) current = s.id
      })
      setActiveSection(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const close = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <aside className="sidebar">

        {/* ── Profile ─────────────────────────────── */}
        <div
          className="sidebar-profile"
          style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}
        >
          {/* Photo */}
          <div style={{
            width: 56, height: 56,
            borderRadius: '50%',
            border: '2px solid rgba(124,92,255,0.4)',
            padding: 2,
            flexShrink: 0,
            boxShadow: '0 0 18px rgba(124,92,255,0.2)',
          }}>
            <img
              src="/profile.jpg"
              alt={`${PROFILE_NAME} profile photo`}
              loading="lazy"
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>

          {/* Name + tagline */}
          <div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.9375rem', fontWeight: 700,
              color: 'var(--text-primary)', lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}>
              {PROFILE_NAME}
            </p>
            <p style={{
              fontSize: '0.62rem', color: 'var(--accent)',
              letterSpacing: '0.14em', marginTop: '0.25rem',
              fontWeight: 600, textTransform: 'uppercase',
            }}>
              {PROFILE_TAGLINE}
            </p>
          </div>

          {/* Mobile hamburger */}
          <button
            className="sidebar-mobile-menu"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            style={{
              marginLeft: 'auto', background: 'none',
              border: '1px solid var(--border-subtle)',
              borderRadius: 8, padding: '0.4rem',
              color: 'var(--text-muted)', cursor: 'pointer',
              display: 'none',
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ── Bio (desktop only) ──────────────────── */}
        <p
          className="sidebar-desktop-only"
          style={{
            fontSize: '0.8125rem',
            lineHeight: 1.75,
            color: 'var(--text-muted)',
            marginTop: '1.5rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {PROFILE_BIO}
        </p>

        {/* ── Status badge (desktop) ──────────────── */}
        <div
          className="sidebar-desktop-only"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            marginTop: '1.25rem',
            padding: '0.625rem 0.875rem',
            background: 'rgba(59, 255, 181, 0.05)',
            border: '1px solid rgba(59, 255, 181, 0.18)',
            borderRadius: 8,
          }}
        >
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#3BFFB5',
            boxShadow: '0 0 8px rgba(59,255,181,0.8)',
            display: 'block', flexShrink: 0,
          }} />
          <span style={{
            fontSize: '0.62rem', fontWeight: 600,
            letterSpacing: '0.1em', color: 'rgba(59,255,181,0.85)',
            textTransform: 'uppercase',
          }}>
            Open to new roles
          </span>
        </div>

        {/* ── Socials + Resume (desktop) ──────────── */}
        <div
          className="sidebar-desktop-only"
          style={{ marginTop: 'auto', paddingTop: '2rem' }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="social-link"
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </div>
          <a href={RESUME_HREF} target="_blank" rel="noopener noreferrer" className="btn-resume">
            <FileText size={12} /> Resume
          </a>
        </div>
      </aside>

      {/* ── Mobile nav overlay ────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {MOBILE_NAV_LINKS.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => scrollTo(href)}
                  style={{
                    textAlign: 'left',
                    background: 'none', border: 'none',
                    padding: '0.875rem 0',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem', fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: activeSection === href.slice(1) ? 'var(--accent)' : 'var(--text-primary)',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'color 0.2s',
                  }}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '0.625rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer" className="social-link" aria-label={label}>
                  {icon}
                </a>
              ))}
              <a href={RESUME_HREF} target="_blank" rel="noopener noreferrer"
                className="btn-resume" style={{ marginLeft: '0.5rem' }}>
                <FileText size={12} /> Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
