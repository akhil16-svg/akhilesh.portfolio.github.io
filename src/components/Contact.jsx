/**
 * Contact.jsx
 * ───────────────────────────────────────────────────────
 * Contact section with direct links.
 *
 * TO CUSTOMISE → edit EMAIL, LINKEDIN, GITHUB below
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, ArrowRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

/* ── EDITABLE CONTENT ─────────────────────────────── */
const EMAIL    = 'pingleakhil12@gmail.com'
const LINKEDIN = { label: 'linkedin.com/in/linkakhil', href: 'https://linkedin.com/in/linkakhil' }
const GITHUB   = { label: 'github.com/akhil16-svg',   href: 'https://github.com/akhil16-svg' }
const LOCATION = 'San Francisco Bay Area, CA — Open to on-site, hybrid, and remote roles.'
/* ── END EDITABLE CONTENT ─────────────────────────── */

const CONTACT_LINKS = [
  { label: 'Email', value: EMAIL,           href: `mailto:${EMAIL}`,    icon: Mail },
  { label: 'LinkedIn', value: LINKEDIN.label, href: LINKEDIN.href,        icon: LinkedinIcon },
  { label: 'GitHub',   value: GITHUB.label,   href: GITHUB.href,          icon: GithubIcon },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: i => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="section" ref={ref}
      style={{ background: 'linear-gradient(to bottom, var(--bg-base), #060709)' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

        {/* Left: headline + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>Get in Touch</span>
          <h2 className="display-lg" style={{ marginBottom: '1.5rem' }}>
            Let's talk<br />
            <span style={{ color: 'var(--accent)' }}>backend, cloud,<br/>or AI work.</span>
          </h2>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.85, color: 'var(--text-muted)', maxWidth: 440, marginBottom: '2.5rem' }}>
            I'm open to software engineering, backend development, cloud engineering,
            and AI application roles. The fastest way to reach me is email or LinkedIn.
          </p>

          {/* Primary CTA buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={`mailto:${EMAIL}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--accent)',
                color: '#0a0c10',
                padding: '0.7rem 1.5rem',
                borderRadius: 8,
                fontSize: '0.8125rem', fontWeight: 600,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'background 0.2s',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#dbb96f'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
            >
              <Mail size={15} /> Email Me
            </a>
            <a
              href={LINKEDIN.href}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                padding: '0.7rem 1.25rem',
                borderRadius: 8,
                fontSize: '0.8125rem', fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.2s',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-hover)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              LinkedIn <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>

        {/* Right: link cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {/* Location */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            custom={0}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '1rem 1.25rem',
              border: '1px solid var(--border)',
              borderRadius: 12,
              background: 'var(--bg-card)',
              marginBottom: '0.25rem',
            }}
          >
            <MapPin size={17} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{LOCATION}</p>
          </motion.div>

          {/* Contact link cards */}
          {CONTACT_LINKS.map(({ label, value, href, icon: Icon }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="contact-link"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              custom={i + 1}
              aria-label={label}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 9,
                background: 'rgba(197,169,106,0.07)',
                border: '1px solid rgba(197,169,106,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)', flexShrink: 0,
              }}>
                <Icon size={17} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '0.2rem' }}>
                  {label}
                </p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{value}</p>
              </div>
              <ArrowRight size={15} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
            </motion.a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}
