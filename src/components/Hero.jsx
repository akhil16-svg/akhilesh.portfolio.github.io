/**
 * Hero.jsx
 * Full-viewport hero section — no background image.
 * Bold Space Grotesk typography that demands attention.
 *
 * TO CUSTOMISE:
 *   • HEADLINE, SUBHEADLINE, STATUS_TEXT → edit below
 *   • QUICK_LINKS → edit the href anchors and labels
 */

import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

/* ── EDITABLE CONTENT ─────────────────────────────── */
const HEADLINE    = 'Building systems\nthat scale.'
const SUBHEADLINE = 'Python · AWS · REST APIs · AI Workflows'
const STATUS_TEXT = 'Open to backend, cloud & AI application roles'

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

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'clamp(2rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4.5rem)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow — purely CSS, no images */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 60% at 30% 40%,
              rgba(197,169,106,0.06) 0%,
              transparent 65%
            ),
            radial-gradient(ellipse 50% 40% at 70% 70%,
              rgba(110,168,200,0.04) 0%,
              transparent 60%
            )
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Top horizontal rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut', delay: 0.1 }}
        style={{
          position: 'absolute',
          top: '10%',
          left: 'clamp(1.5rem, 5vw, 4.5rem)',
          right: '4rem',
          height: 1,
          background: 'linear-gradient(to right, rgba(197,169,106,0.5), transparent)',
          transformOrigin: 'left',
        }}
      />

      {/* ── Main content ───────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        style={{ position: 'relative', zIndex: 1, maxWidth: 860 }}
      >
        {/* Status badge */}
        <motion.div variants={fadeUp} style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.625rem' }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#5cba87',
            boxShadow: '0 0 10px rgba(92,186,135,0.8)',
            display: 'inline-block',
            animation: 'pulse-dot 2.5s ease-in-out infinite',
          }} />
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: 'rgba(232,228,218,0.65)',
            fontFamily: 'var(--font-body)',
            textTransform: 'uppercase',
          }}>
            {STATUS_TEXT}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 7.5vw, 7rem)',
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: '1.25rem',
            whiteSpace: 'pre-line',
          }}
        >
          {HEADLINE.split('\n').map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {i === 1
                ? <><span style={{ color: 'var(--accent)' }}>that</span> scale.</>
                : line
              }
            </span>
          ))}
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
            letterSpacing: '0.2em',
            color: 'var(--accent)',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            marginBottom: '2.75rem',
            textTransform: 'uppercase',
          }}
        >
          {SUBHEADLINE}
        </motion.p>

        {/* Quick links */}
        <motion.div
          variants={fadeUp}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
        >
          {QUICK_LINKS.map(({ label, href }, i) => (
            <button
              key={label}
              id={`hero-link-${label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => scrollTo(href)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: i === 0 ? '0.75rem 1.75rem' : '0.75rem 1.4rem',
                borderRadius: 8,
                fontSize: '0.8125rem',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                background: i === 0 ? 'var(--accent)' : 'rgba(255,255,255,0.055)',
                color: i === 0 ? '#080a0f' : 'var(--text-muted)',
                border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)',
                backdropFilter: i !== 0 ? 'blur(8px)' : 'none',
                textTransform: 'uppercase',
              }}
              onMouseEnter={e => {
                if (i !== 0) {
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.09)'
                } else {
                  e.currentTarget.style.background = '#dbb96f'
                }
              }}
              onMouseLeave={e => {
                if (i !== 0) {
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.055)'
                } else {
                  e.currentTarget.style.background = 'var(--accent)'
                }
              }}
            >
              {label}
              {i === 0 && <ArrowRight size={14} />}
            </button>
          ))}
        </motion.div>

        {/* Location */}
        <motion.div
          variants={fadeUp}
          style={{
            marginTop: '3rem',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            color: 'var(--text-dim)',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            fontWeight: 500,
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
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontWeight: 600 }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1, height: 40,
            background: 'linear-gradient(to bottom, var(--text-dim), transparent)',
            borderRadius: 1,
          }}
        />
      </motion.div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 10px rgba(92,186,135,0.8); }
          50%       { box-shadow: 0 0 16px rgba(92,186,135,1), 0 0 30px rgba(92,186,135,0.4); }
        }
        @media (max-width: 768px) {
          #hero { padding: 2rem 1.25rem 3.5rem !important; }
        }
      `}</style>
    </section>
  )
}
