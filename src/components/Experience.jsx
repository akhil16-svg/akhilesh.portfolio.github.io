/**
 * Experience.jsx
 * ───────────────────────────────────────────────────────
 * Work experience section — timeline layout with impact images.
 *
 * TO CUSTOMISE:
 *   • Jobs        → edit EXPERIENCES array below
 *   • Impact imgs → add images to /public/experience/ and set
 *                   the `images` array for each job
 *   • Bullets     → update the `bullets` array for each role
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── EDITABLE CONTENT ─────────────────────────────── */
const EXPERIENCES = [
  {
    id: 'omatochi-swe',
    role: 'Software Engineer',
    company: 'Omatochi',
    period: 'Jul 2025 – Present',
    type: 'Full-time',
    location: 'San Francisco Bay Area',
    summary:
      'Building enterprise AI and document-processing workflows with React, REST APIs, and production-grade frontend architecture.',
    bullets: [
      'Develop scalable React applications supporting enterprise AI and document processing workflows.',
      'Build modular UI components with asynchronous REST API integration and resilient error handling.',
      'Improve data visibility and frontend architecture across production-facing features.',
      'Deliver in Agile workflows with CI/CD practices and maintainable code standards.',
    ],
    tags: ['React', 'REST APIs', 'Frontend Architecture', 'CI/CD', 'Agile'],
    /*
     * Impact images — add real screenshots/photos here.
     * Example: ['/experience/omatochi-dashboard.png', '/experience/omatochi-ui.png']
     * Leave as [] until you have images ready.
     */
    images: [],
    accentColor: '#3b7fd4',
  },
  {
    id: 'omatochi-intern',
    role: 'Software Development Intern',
    company: 'Omatochi',
    period: 'Jun 2024 – May 2025',
    type: 'Internship',
    location: 'San Francisco Bay Area',
    summary:
      'Built RESTful backend APIs and Redis-backed asynchronous processing — connecting backend services to user-facing features.',
    bullets: [
      'Built RESTful backend APIs and Redis-backed asynchronous processing workflows.',
      'Improved productivity and reduced latency in dashboard-driven internal tools.',
      'Connected backend services with user-facing features to improve operational efficiency.',
      'Translated product requirements into maintainable features across frontend and backend layers.',
    ],
    tags: ['Python', 'Redis', 'REST APIs', 'Backend Engineering'],
    images: [],
    accentColor: '#3db87a',
  },
]
/* ── END EDITABLE CONTENT ─────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: i => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Experience() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="section" ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '3.5rem' }}
      >
        <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>Work Experience</span>
        <h2 className="display-lg">
          Built inside<br />
          <span style={{ color: 'var(--accent)' }}>product teams.</span>
        </h2>
      </motion.div>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
        {/* Vertical line */}
        <div className="timeline-line" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {EXPERIENCES.map((exp, i) => (
            <motion.article
              key={exp.id}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              custom={i}
              style={{ position: 'relative' }}
            >
              {/* Timeline dot */}
              <div className="timeline-dot" />

              {/* Role header */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: exp.accentColor, display: 'block', marginBottom: '0.35rem' }}>
                    {exp.type}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.15 }}>
                    {exp.role}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.06em', whiteSpace: 'nowrap', paddingTop: 6 }}>
                  {exp.period}
                </span>
              </div>

              {/* Summary */}
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '1.25rem', maxWidth: 680 }}>
                {exp.summary}
              </p>

              {/* Two-column: bullets + impact images */}
              <div style={{ display: 'grid', gridTemplateColumns: exp.images.length > 0 ? '1fr 1fr' : '1fr', gap: '2rem', alignItems: 'start' }}>

                {/* Bullets */}
                <div className="card" style={{ padding: '1.25rem' }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '0.875rem' }}>
                    Impact
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <span style={{
                          width: 5, height: 5, borderRadius: '50%', background: exp.accentColor,
                          flexShrink: 0, marginTop: 8, opacity: 0.8,
                        }} />
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>{b}</p>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    {exp.tags.map(t => (
                      <span key={t} className="skill-tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Impact images (only if available) */}
                {exp.images.length > 0 && (
                  <div>
                    <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '0.875rem' }}>
                      Work Highlights
                    </p>
                    <div className="impact-grid" style={{ gridTemplateColumns: exp.images.length === 1 ? '1fr' : 'repeat(2, 1fr)' }}>
                      {exp.images.map((src, ii) => (
                        <img key={ii} src={src} alt={`${exp.company} work highlight ${ii + 1}`} className="impact-img" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Placeholder when no images added yet */}
                {exp.images.length === 0 && (
                  <div style={{
                    border: '1px dashed var(--border)',
                    borderRadius: 12,
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    minHeight: 140,
                  }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center', letterSpacing: '0.06em' }}>
                      Add work highlight images to<br />
                      <code style={{ color: 'var(--accent)', fontSize: '0.7rem' }}>/public/experience/</code>
                    </p>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #experience article > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
