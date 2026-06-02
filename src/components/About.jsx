/**
 * About.jsx
 * ───────────────────────────────────────────────────────
 * About Me section with profile photo, bio text, and key credentials.
 *
 * TO CUSTOMISE:
 *   • Photo       → replace /profile.png in /public/
 *   • Bio text    → edit BIO_PARAGRAPHS below
 *   • Credentials → edit CREDENTIALS array
 *   • Strengths   → edit STRENGTHS array
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, Award, GraduationCap, MapPin } from 'lucide-react'

/* ── EDITABLE CONTENT ─────────────────────────────── */
const BIO_PARAGRAPHS = [
  "I'm a software engineer with a Master's in Computer Science from California State University, East Bay. My work lives at the intersection of backend engineering, cloud infrastructure, and AI-powered product workflows.",
  "I build APIs that are clean to maintain, systems designed to scale, and user-facing workflows that feel simple — because the right work is happening behind the scenes.",
]

const CREDENTIALS = [
  {
    label: 'AWS Certified Solutions Architect',
    value: 'Associate · Active credential',
    icon: ShieldCheck,
  },
  {
    label: 'Master of Science, Computer Science',
    value: 'Cal State East Bay · 2023–2025',
    icon: GraduationCap,
  },
  {
    label: 'IBM Back-End Development',
    value: 'Coursera · Completed',
    icon: Award,
  },
  {
    label: 'Location',
    value: 'San Francisco Bay Area, CA',
    icon: MapPin,
  },
]

const STRENGTHS = [
  'Python backend development — Flask, Django, FastAPI, REST APIs',
  'Cloud architecture — AWS, Docker, Kubernetes, CI/CD pipelines',
  'AI-enabled workflows — invoice intelligence, chatbot systems, forecasting',
  'Graduate-level CS foundations — distributed systems, databases, OS',
]
/* ── END EDITABLE CONTENT ─────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] } }),
}

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="section" ref={ref}>
      {/* Section label */}
      <motion.span
        className="section-label"
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        custom={0}
        style={{ display: 'block', marginBottom: '1.25rem' }}
      >
        About Me
      </motion.span>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

        {/* Left col — Profile + Bio */}
        <div>
          {/* Profile photo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            custom={1}
            style={{ marginBottom: '2rem' }}
          >
            <div style={{
              width: 260,
              height: 260,
              borderRadius: '50%',
              border: '1.5px solid rgba(197,169,106,0.35)',
              padding: 5,
              marginBottom: '1.5rem',
            }}>
              <img
                src="/profile.png"
                alt="Akhilesh Pingle"
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', filter: 'grayscale(10%)' }}
              />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="display-md"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            custom={2}
            style={{ marginBottom: '1.5rem' }}
          >
            Practical engineering,<br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>backend-first mindset.</span>
          </motion.h2>

          {/* Bio paragraphs */}
          {BIO_PARAGRAPHS.map((para, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              custom={3 + i}
              style={{ fontSize: '0.9375rem', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1rem' }}
            >
              {para}
            </motion.p>
          ))}

          {/* Strengths */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            custom={5}
            style={{ marginTop: '2rem' }}
          >
            <p className="section-label" style={{ marginBottom: '1rem' }}>Core strengths</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {STRENGTHS.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', border: '1px solid rgba(197,169,106,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
                  </span>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>{s}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right col — Credentials */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          custom={2}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {CREDENTIALS.map(({ label, value, icon: Icon }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              custom={3 + i}
              className="card"
              style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
            >
              <div style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: 'rgba(197,169,106,0.08)',
                border: '1px solid rgba(197,169,106,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                flexShrink: 0,
              }}>
                <Icon size={18} />
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>{label}</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{value}</p>
              </div>
            </motion.div>
          ))}

          {/* Focus card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            custom={8}
            style={{
              background: 'rgba(197,169,106,0.06)',
              border: '1px solid rgba(197,169,106,0.18)',
              borderRadius: 16,
              padding: '1.5rem',
              marginTop: '0.5rem',
            }}
          >
            <p style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>
              Currently seeking
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--text-muted)' }}>
              Backend, cloud, and AI application roles where I can build scalable APIs,
              cloud-ready services, and AI tools that solve real business problems.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 768px) {
          #about > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}
