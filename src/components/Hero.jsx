/**
 * Hero.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-viewport hero with PARALLAX mountain background.
 *
 * The mountain image scrolls at 40% of the page scroll speed — creating a
 * depth illusion as text moves faster than the mountain behind it.
 *
 * TO CUSTOMISE:
 *   • Background image → replace /mountain-bg.png in /public/
 *   • Headline text    → edit HEADLINE and SUBHEADLINE
 *   • Status badge     → edit STATUS_TEXT
 *   • Quick-links      → edit QUICK_LINKS
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

/* ── EDITABLE CONTENT ─────────────────────────────── */
const HEADLINE    = 'Building systems that scale.'
const SUBHEADLINE = 'Python · AWS · REST APIs · AI Workflows'
const STATUS_TEXT = 'Open to backend, cloud, and AI application roles'

const QUICK_LINKS = [
  { label: 'View Projects',   href: '#projects' },
  { label: 'Work Experience', href: '#experience' },
  { label: 'Contact Me',      href: '#contact' },
]
/* ── END EDITABLE CONTENT ─────────────────────────── */

const scrollTo = (href) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const heroRef = useRef(null)

  /* Track scroll progress within the hero section */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  /* Mountain moves upward at 40% of scroll speed — smooth spring physics */
  const rawY = useTransform(scrollYProgress, [0, 1], ['0%', '-28%'])
  const mountainY = useSpring(rawY, { stiffness: 80, damping: 25 })

  /* Text fades out and rises faster than the mountain */
  const textY       = useTransform(scrollYProgress, [0, 0.6], ['0%', '-18%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '4rem',
      }}
    >
      {/* ── Parallax mountain layer ─────────────────── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-20% 0 -20% 0',   /* extra height above/below for parallax travel */
          zIndex: 0,
          y: mountainY,
        }}
      >
        <img
          src="/mountain-bg.png"
          alt="Cinematic mountain landscape"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            /* Lightened so mountains are clearly visible */
            filter: 'brightness(0.68) saturate(0.75)',
            display: 'block',
          }}
        />

        {/* Bottom-to-top dark gradient — frames the text area */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(
              to bottom,
              rgba(10,12,16,0.15) 0%,
              rgba(10,12,16,0.05) 35%,
              rgba(10,12,16,0.60) 72%,
              rgba(10,12,16,0.97) 100%
            )`,
          }}
        />

        {/* Top vignette — blends the image into the dark header */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '22%',
            background: 'linear-gradient(to bottom, rgba(10,12,16,0.55), transparent)',
          }}
        />
      </motion.div>

      {/* ── Hero text content ───────────────────────── */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 820,
          y: textY,
          opacity: textOpacity,
        }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#5cba87',
            boxShadow: '0 0 10px rgba(92,186,135,0.7)',
            display: 'inline-block',
          }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em', color: 'rgba(232,228,218,0.75)' }}>
            {STATUS_TEXT}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
            fontWeight: 300,
            lineHeight: 1.0,
            fontStyle: 'italic',
            color: 'var(--text-primary)',
            marginBottom: '0.85rem',
          }}
        >
          {HEADLINE}
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontSize: '0.9rem',
            letterSpacing: '0.18em',
            color: 'var(--accent)',
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            marginBottom: '2.5rem',
            textTransform: 'uppercase',
          }}
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
                padding: i === 0 ? '0.7rem 1.6rem' : '0.7rem 1.3rem',
                borderRadius: 8,
                fontSize: '0.8125rem',
                fontWeight: 500,
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                background: i === 0 ? 'var(--accent)' : 'rgba(255,255,255,0.07)',
                color: i === 0 ? '#0a0c10' : 'var(--text-muted)',
                border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.12)',
                backdropFilter: i !== 0 ? 'blur(8px)' : 'none',
              }}
              onMouseEnter={e => {
                if (i !== 0) {
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                } else {
                  e.currentTarget.style.background = '#dbb96f'
                }
              }}
              onMouseLeave={e => {
                if (i !== 0) {
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
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
          transition={{ duration: 0.7, delay: 0.9 }}
          style={{
            marginTop: '2.5rem',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            color: 'var(--text-dim)',
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
          }}
        >
          <MapPin size={13} />
          San Francisco Bay Area, CA
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '2.5rem',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-dim)',
        }}
      >
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1, height: 36,
            background: 'linear-gradient(to bottom, var(--text-dim), transparent)',
            borderRadius: 1,
          }}
        />
      </motion.div>

      {/* ── Mobile responsive ───────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          #hero { padding: 2rem 1.25rem 3rem !important; }
          #hero > div:nth-child(3) { bottom: 1.5rem; right: 1.5rem; }
        }
      `}</style>
    </section>
  )
}
