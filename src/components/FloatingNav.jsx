/**
 * FloatingNav.jsx
 * ─────────────────────────────────────────────────────────────────
 * Right-side floating section navigation (desktop only).
 * Tracks active section via IntersectionObserver.
 * Appears after 120px of scroll.
 *
 * Sections: Home · Experience · Projects · Skills · Certifications · Contact
 */

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_SECTIONS = [
  { id: 'hero',           label: 'Home' },
  { id: 'experience',     label: 'Experience' },
  { id: 'projects',       label: 'Projects' },
  { id: 'skills',         label: 'Skills' },
  { id: 'education',      label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact',        label: 'Contact' },
]

export default function FloatingNav() {
  const [active,  setActive]  = useState('hero')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    /* Scroll visibility */
    const handleScroll = () => setVisible(window.scrollY > 120)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    /* IntersectionObserver — track which section is most visible */
    const ratios = {}

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { ratios[e.target.id] = e.intersectionRatio })
        const top = Object.entries(ratios).sort((a, b) => b[1] - a[1])[0]
        if (top && top[1] > 0) setActive(top[0])
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    )

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="floating-nav-wrap" aria-label="Section navigation">
      <motion.nav
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 16 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}
      >
        {NAV_SECTIONS.map(({ id, label }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              id={`floating-nav-${id}`}
              onClick={() => scrollTo(id)}
              aria-label={`Navigate to ${label}`}
              aria-current={isActive ? 'true' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem 0',
              }}
            >
              {/* Label — shown when active */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                    }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Dot indicator */}
              <motion.div
                animate={{
                  width:     isActive ? 10 : 5,
                  height:    isActive ? 10 : 5,
                  background: isActive
                    ? 'var(--accent)'
                    : 'rgba(255, 255, 255, 0.18)',
                  boxShadow: isActive
                    ? '0 0 10px rgba(124, 92, 255, 0.7), 0 0 20px rgba(124, 92, 255, 0.3)'
                    : 'none',
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  background: 'rgba(124, 92, 255, 0.5)',
                  scale: 1.3,
                }}
                style={{ borderRadius: '50%', flexShrink: 0 }}
              />
            </button>
          )
        })}

        {/* Vertical connecting line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 4,
            top: 12,
            bottom: 12,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(124,92,255,0.2) 20%, rgba(124,92,255,0.2) 80%, transparent)',
            zIndex: -1,
          }}
        />
      </motion.nav>
    </div>
  )
}
