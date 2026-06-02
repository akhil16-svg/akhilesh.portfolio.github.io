/**
 * Education.jsx
 * ───────────────────────────────────────────────────────
 * Education and certifications section.
 *
 * TO CUSTOMISE → edit EDUCATION array below
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'

/* ── EDITABLE CONTENT ─────────────────────────────── */
const EDUCATION = [
  {
    type: 'Education',
    title: 'Master of Science in Computer Science',
    organization: 'California State University, East Bay',
    period: 'Aug 2023 – May 2025',
    detail: 'Graduate foundation in distributed systems, database systems, operating systems, algorithms, and software engineering.',
    icon: GraduationCap,
    color: '#3b7fd4',
  },
  {
    type: 'Education',
    title: 'Bachelor of Engineering in Information Technology',
    organization: 'Savitribai Phule Pune University',
    period: 'Jun 2019 – May 2023',
    detail: 'Core study across computer networks, operating systems, software engineering, databases, and web technologies.',
    icon: GraduationCap,
    color: '#7c5cd9',
  },
  {
    type: 'Certification',
    title: 'AWS Certified Solutions Architect Associate',
    organization: 'Amazon Web Services',
    period: 'Active credential',
    detail: 'Architecture fundamentals across scalability, availability, security, cost awareness, networking, compute, and storage.',
    icon: Award,
    color: '#d97c2e',
  },
  {
    type: 'Coursework',
    title: 'IBM Back-End Development Program',
    organization: 'Coursera',
    period: 'Completed',
    detail: 'Python, Flask, Django, SQL, Git/GitHub, Docker, Kubernetes, OpenShift, serverless, CI/CD, monitoring, Linux, shell scripting, and application security.',
    icon: Award,
    color: '#3db87a',
  },
]
/* ── END EDITABLE CONTENT ─────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: i => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
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
        <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>Education & Credentials</span>
        <h2 className="display-lg">
          Academic depth,<br />
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>current training.</span>
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {EDUCATION.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.article
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              custom={i}
              className="card"
            >
              {/* Accent line at top */}
              <div style={{ height: 2, borderRadius: 1, background: item.color, opacity: 0.6, marginBottom: '1.25rem' }} />

              {/* Icon + type */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 9,
                  background: `${item.color}18`,
                  border: `1px solid ${item.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.color, flexShrink: 0,
                }}>
                  <Icon size={17} />
                </div>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: item.color }}>
                  {item.type}
                </span>
              </div>

              {/* Title */}
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: '0.35rem' }}>
                {item.title}
              </h3>

              {/* Org */}
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                {item.organization}
              </p>

              {/* Period badge */}
              <span style={{
                display: 'inline-block',
                fontSize: '0.6875rem', fontWeight: 500,
                letterSpacing: '0.06em',
                color: 'var(--text-dim)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                borderRadius: 5,
                padding: '0.25rem 0.65rem',
                marginBottom: '1rem',
              }}>
                {item.period}
              </span>

              {/* Detail */}
              <p style={{ fontSize: '0.8125rem', lineHeight: 1.75, color: 'var(--text-muted)' }}>
                {item.detail}
              </p>
            </motion.article>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 640px) {
          #education > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
