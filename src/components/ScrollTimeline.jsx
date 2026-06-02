/**
 * ScrollTimeline.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Two thin vertical lines fixed to the right edge of the viewport.
 * As the user scrolls, glowing dots appear along each line — representing
 * milestones from Work Experience (left line) and Projects (right line).
 *
 * The lines shimmer and dots pulse when active — fully scroll-driven via
 * Framer Motion useScroll + useTransform.
 *
 * TO CUSTOMISE:
 *   • Edit EXPERIENCE_MILESTONES and PROJECT_MILESTONES below
 *   • `progress` is the scroll fraction (0–1) when each dot activates
 */

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

/* ── EDITABLE CONTENT ─────────────────────────────── */

/*
 * `progress` = scroll fraction at which this dot activates.
 * 0 = top of page, 1 = bottom of page.
 * Adjust these values to match where your sections appear.
 */
const EXPERIENCE_MILESTONES = [
  { label: 'Software Dev Intern',  sub: 'Omatochi · 2024', progress: 0.45 },
  { label: 'Software Engineer',    sub: 'Omatochi · 2025', progress: 0.55 },
]

const PROJECT_MILESTONES = [
  { label: 'Real Estate Platform',      sub: 'Full-stack app', progress: 0.30 },
  { label: 'Walmart Forecasting',       sub: 'ML analytics',   progress: 0.37 },
  { label: 'Medical Chatbot',           sub: 'RAG / AI',       progress: 0.43 },
  { label: 'InvoiceAI',                 sub: 'OCR + AI',       progress: 0.50 },
]
/* ── END EDITABLE CONTENT ─────────────────────────── */

/* Single glowing dot with animated label */
function TimelineDot({ label, sub, active, side, color }) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      {/* Label — shown on left for right-side dots, right for left-side */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, x: side === 'left' ? 8 : -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: side === 'left' ? 8 : -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              [side === 'left' ? 'right' : 'left']: 20,
              whiteSpace: 'nowrap',
              textAlign: side === 'left' ? 'right' : 'left',
              pointerEvents: 'none',
            }}
          >
            <p style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.04em', lineHeight: 1.2 }}>
              {label}
            </p>
            <p style={{ fontSize: '0.58rem', color: 'var(--text-dim)', marginTop: 1, letterSpacing: '0.04em' }}>
              {sub}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The dot */}
      <motion.div
        animate={active ? {
          scale: [1, 1.25, 1],
          boxShadow: [`0 0 0px ${color}00`, `0 0 14px ${color}cc`, `0 0 8px ${color}88`],
        } : {
          scale: 1,
          boxShadow: `0 0 0px ${color}00`,
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          width: active ? 9 : 5,
          height: active ? 9 : 5,
          borderRadius: '50%',
          background: active ? color : 'rgba(255,255,255,0.15)',
          border: active ? `1px solid ${color}` : '1px solid rgba(255,255,255,0.1)',
          transition: 'width 0.3s, height 0.3s, background 0.3s',
          flexShrink: 0,
        }}
      />
    </div>
  )
}

/* A single vertical track (line + dots) */
function Track({ milestones, scrollProgress, color, side, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, position: 'relative' }}>

      {/* Track label at top */}
      <p style={{
        fontSize: '0.52rem',
        fontWeight: 700,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--text-dim)',
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        marginBottom: 8,
        whiteSpace: 'nowrap',
      }}>
        {label}
      </p>

      {/* The vertical track */}
      <div style={{
        position: 'relative',
        width: 16,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Background line (dim) */}
        <div style={{
          position: 'absolute',
          top: 0, bottom: 0,
          left: '50%', transform: 'translateX(-50%)',
          width: 1,
          background: 'rgba(255,255,255,0.08)',
        }} />

        {/* Active fill line — grows as you scroll */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 1,
            height: useTransform(scrollProgress, [0, 1], ['0%', '100%']),
            background: `linear-gradient(to bottom, ${color}00, ${color}cc, ${color}44)`,
            transformOrigin: 'top',
          }}
        />

        {/* Shimmering moving highlight */}
        <motion.div
          style={{
            position: 'absolute',
            top: useTransform(scrollProgress, [0, 1], ['-5%', '100%']),
            left: '50%',
            transform: 'translateX(-50%)',
            width: 1,
            height: 40,
            background: `linear-gradient(to bottom, transparent, ${color}ff, transparent)`,
            borderRadius: 1,
            filter: `blur(0.5px)`,
          }}
        />

        {/* Dots distributed along the line */}
        <div style={{
          position: 'absolute',
          top: 0, bottom: 0, left: 0, right: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: 4, paddingBottom: 4,
        }}>
          {milestones.map((m, i) => (
            <TimelineDot
              key={i}
              label={m.label}
              sub={m.sub}
              active={scrollProgress.get() >= m.progress}
              side={side}
              color={color}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Main component ───────────────────────────────── */
export default function ScrollTimeline() {
  const { scrollYProgress } = useScroll()
  const [scroll, setScroll] = useState(0)

  /* Subscribe to scroll to re-render dots */
  useEffect(() => {
    return scrollYProgress.on('change', v => setScroll(v))
  }, [scrollYProgress])

  /* Hide on very small screens */
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const check = () => setVisible(window.innerWidth >= 1280)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!visible) return null

  /* Determine active dots based on current scroll */
  const expDots  = EXPERIENCE_MILESTONES.map(m => scroll >= m.progress)
  const projDots = PROJECT_MILESTONES.map(m => scroll >= m.progress)

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        right: 20,
        top: '15vh',
        bottom: '15vh',
        zIndex: 80,
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'stretch',
        pointerEvents: 'none',
      }}
    >
      {/* Left track — Work Experience */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
        {/* Top label */}
        <p style={{
          fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--text-dim)',
          writingMode: 'vertical-rl', transform: 'rotate(180deg)',
          marginBottom: 8, whiteSpace: 'nowrap',
        }}>
          Experience
        </p>

        {/* Line + dots wrapper */}
        <div style={{ position: 'relative', flex: 1, width: 1 }}>
          {/* Dim background line */}
          <div style={{
            position: 'absolute', inset: 0,
            width: 1, left: 0,
            background: 'rgba(255,255,255,0.07)',
          }} />

          {/* Glowing fill — top to progress */}
          <motion.div style={{
            position: 'absolute', top: 0, left: 0, width: 1,
            height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
            background: 'linear-gradient(to bottom, #6ea8c800, #6ea8c8cc, #6ea8c844)',
          }} />

          {/* Moving shimmer */}
          <motion.div style={{
            position: 'absolute', left: 0, width: 1,
            top: useTransform(scrollYProgress, [0, 1], ['-5%', '100%']),
            height: 40,
            background: 'linear-gradient(to bottom, transparent, #6ea8c8ff, transparent)',
            filter: 'blur(0.5px)',
          }} />

          {/* Milestone dots */}
          {EXPERIENCE_MILESTONES.map((m, i) => {
            const isActive = scroll >= m.progress
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: `${m.progress * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* Label to the LEFT of this track */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.3 }}
                      style={{ position: 'absolute', right: 14, whiteSpace: 'nowrap', textAlign: 'right' }}
                    >
                      <p style={{ fontSize: '0.6rem', fontWeight: 600, color: '#6ea8c8', lineHeight: 1.2 }}>{m.label}</p>
                      <p style={{ fontSize: '0.55rem', color: 'var(--text-dim)', marginTop: 1 }}>{m.sub}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dot */}
                <motion.div
                  animate={isActive
                    ? { scale: [1, 1.4, 1], boxShadow: ['0 0 0px #6ea8c800', '0 0 12px #6ea8c8cc', '0 0 6px #6ea8c888'] }
                    : { scale: 1, boxShadow: '0 0 0px #6ea8c800' }
                  }
                  transition={{ duration: 0.45 }}
                  style={{
                    width: isActive ? 8 : 4,
                    height: isActive ? 8 : 4,
                    borderRadius: '50%',
                    background: isActive ? '#6ea8c8' : 'rgba(255,255,255,0.12)',
                    border: `1px solid ${isActive ? '#6ea8c8' : 'rgba(255,255,255,0.08)'}`,
                    transition: 'width 0.3s, height 0.3s, background 0.3s',
                    flexShrink: 0,
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Right track — Projects */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
        <p style={{
          fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--text-dim)',
          writingMode: 'vertical-rl', transform: 'rotate(180deg)',
          marginBottom: 8, whiteSpace: 'nowrap',
        }}>
          Projects
        </p>

        <div style={{ position: 'relative', flex: 1, width: 1 }}>
          <div style={{
            position: 'absolute', inset: 0, width: 1, left: 0,
            background: 'rgba(255,255,255,0.07)',
          }} />

          <motion.div style={{
            position: 'absolute', top: 0, left: 0, width: 1,
            height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
            background: 'linear-gradient(to bottom, #c5a96a00, #c5a96acc, #c5a96a44)',
          }} />

          <motion.div style={{
            position: 'absolute', left: 0, width: 1,
            top: useTransform(scrollYProgress, [0, 1], ['-5%', '100%']),
            height: 40,
            background: 'linear-gradient(to bottom, transparent, #c5a96aff, transparent)',
            filter: 'blur(0.5px)',
          }} />

          {PROJECT_MILESTONES.map((m, i) => {
            const isActive = scroll >= m.progress
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: `${m.progress * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* Dot */}
                <motion.div
                  animate={isActive
                    ? { scale: [1, 1.4, 1], boxShadow: ['0 0 0px #c5a96a00', '0 0 12px #c5a96acc', '0 0 6px #c5a96a88'] }
                    : { scale: 1, boxShadow: '0 0 0px #c5a96a00' }
                  }
                  transition={{ duration: 0.45 }}
                  style={{
                    width: isActive ? 8 : 4,
                    height: isActive ? 8 : 4,
                    borderRadius: '50%',
                    background: isActive ? '#c5a96a' : 'rgba(255,255,255,0.12)',
                    border: `1px solid ${isActive ? '#c5a96a' : 'rgba(255,255,255,0.08)'}`,
                    transition: 'width 0.3s, height 0.3s, background 0.3s',
                    flexShrink: 0,
                  }}
                />

                {/* Label to the RIGHT */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.3 }}
                      style={{ position: 'absolute', left: 14, whiteSpace: 'nowrap' }}
                    >
                      <p style={{ fontSize: '0.6rem', fontWeight: 600, color: '#c5a96a', lineHeight: 1.2 }}>{m.label}</p>
                      <p style={{ fontSize: '0.55rem', color: 'var(--text-dim)', marginTop: 1 }}>{m.sub}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
