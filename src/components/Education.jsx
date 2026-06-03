/**
 * Education.jsx
 * ─────────────────────────────────────────────────────────────────
 * Education section — 3 cards:
 *   1. Master of Science in Computer Science (CSUEB)
 *   2. Teaching Assistant (CSUEB)
 *   3. Bachelor of Engineering in Information Technology (SPU)
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, BookOpen, MapPin, Calendar } from 'lucide-react'

/* ── EDITABLE CONTENT ─────────────────────────────── */
const EDUCATION = [
  {
    type: 'Graduate Education',
    title: "Master of Science in Computer Science",
    institution: 'California State University, East Bay',
    location: 'San Francisco Bay Area, CA',
    period: 'Aug 2023 – May 2025',
    gpa: '3.5 / 4.0',
    detail: 'Graduate study in distributed systems, cloud computing, database systems, algorithms, and software engineering.',
    icon: GraduationCap,
    color: '#7C5CFF',
  },
  {
    type: 'Academic Role',
    title: 'Teaching Assistant',
    institution: 'California State University, East Bay',
    location: 'San Francisco Bay Area, CA',
    period: 'Aug 2023 – May 2025',
    gpa: null,
    detail: 'Supported undergraduate CS coursework with instruction support, grading, and student mentoring in programming fundamentals and data structures.',
    icon: BookOpen,
    color: '#00D4FF',
  },
  {
    type: 'Undergraduate Education',
    title: 'Bachelor of Engineering in Information Technology',
    institution: 'Savitribai Phule Pune University',
    location: 'Pune, India',
    period: 'Jun 2019 – May 2023',
    gpa: '9.3 / 10',
    detail: 'Core study across computer networks, operating systems, databases, software engineering, and web technologies.',
    icon: GraduationCap,
    color: '#3BFFB5',
  },
]
/* ── END EDITABLE CONTENT ─────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: i => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function EducationCard({ item, index, inView }) {
  const Icon = item.icon

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      custom={index}
      style={{
        position: 'relative',
        background: 'rgba(14, 20, 38, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${item.color}28`,
        borderRadius: 18,
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        cursor: 'default',
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${item.color}55`
        e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4), 0 0 32px ${item.color}12`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${item.color}28`
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 2,
        background: `linear-gradient(to right, ${item.color}, ${item.color}00)`,
      }} />

      {/* Body */}
      <div style={{ padding: '1.75rem 2rem' }}>

        {/* Icon + type */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 11,
            background: `${item.color}15`,
            border: `1px solid ${item.color}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: item.color, flexShrink: 0,
          }}>
            <Icon size={20} />
          </div>
          <span style={{
            fontSize: '0.72rem', fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: item.color,
          }}>
            {item.type}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.15rem, 2vw, 1.375rem)',
          fontWeight: 700,
          letterSpacing: '-0.015em',
          color: 'var(--text-primary)',
          lineHeight: 1.25,
          marginBottom: '0.5rem',
        }}>
          {item.title}
        </h3>

        {/* Institution */}
        <p style={{
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          marginBottom: '0.875rem',
        }}>
          {item.institution}
        </p>

        {/* Period + Location + GPA */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.125rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-muted)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 6, padding: '0.3rem 0.7rem',
          }}>
            <Calendar size={12} style={{ opacity: 0.7 }} />
            {item.period}
          </span>

          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-muted)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 6, padding: '0.3rem 0.7rem',
          }}>
            <MapPin size={12} style={{ opacity: 0.7 }} />
            {item.location}
          </span>

          {item.gpa && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              fontSize: '0.8125rem', fontWeight: 600,
              color: item.color,
              background: `${item.color}10`,
              border: `1px solid ${item.color}30`,
              borderRadius: 6, padding: '0.3rem 0.7rem',
            }}>
              GPA {item.gpa}
            </span>
          )}
        </div>

        {/* Description */}
        <p style={{
          fontSize: '0.9375rem',
          lineHeight: 1.75,
          color: 'var(--text-muted)',
        }}>
          {item.detail}
        </p>
      </div>

      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, right: 0,
        width: '50%', height: '50%',
        background: `radial-gradient(ellipse at 100% 100%, ${item.color}08, transparent 70%)`,
        pointerEvents: 'none',
      }} />
    </motion.article>
  )
}

export default function Education() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="section" ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '3rem' }}
      >
        <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>
          Education
        </span>
        <h2 className="display-lg">
          Academic foundation,<br />
          <span style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent-cool))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            built to last.
          </span>
        </h2>
      </motion.div>

      {/* Cards — single column, full width */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {EDUCATION.map((item, i) => (
          <EducationCard key={item.title} item={item} index={i} inView={inView} />
        ))}
      </div>
    </section>
  )
}
