/**
 * Certifications.jsx
 * ─────────────────────────────────────────────────────────────────
 * Certifications section — 1 premium glass card:
 *   - AWS Certified Solutions Architect – Associate
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, ShieldCheck, ExternalLink, Calendar } from 'lucide-react'

/* ── EDITABLE CONTENT ─────────────────────────────── */
const CERTIFICATION = {
  type: 'Professional Certification',
  title: 'AWS Certified Solutions Architect – Associate',
  issuer: 'Amazon Web Services (AWS)',
  period: 'Active Credential',
  score: '940 / 1000',
  detail: 'Validates comprehensive expertise in designing resilient, high-performing, secure, and cost-optimized distributed systems on AWS infrastructure. Covers core services across compute, networking, storage, database, and security.',
  badgeUrl: 'https://www.credly.com/org/amazon-web-services/badge/aws-certified-solutions-architect-associate',
  icon: ShieldCheck,
  color: '#FF9900', // AWS Orange
}
/* ── END EDITABLE CONTENT ─────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Certifications() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const item = CERTIFICATION
  const Icon = item.icon

  return (
    <section id="certifications" className="section" ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '3rem' }}
      >
        <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>
          Certifications
        </span>
        <h2 className="display-lg">
          Validated expertise,<br />
          <span style={{
            background: 'linear-gradient(135deg, #FF9900, #FF5500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            cloud native.
          </span>
        </h2>
      </motion.div>

      {/* Single premium card */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <motion.article
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
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

              {/* Verify Badge button */}
              <a
                href={item.badgeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: item.color,
                  background: `${item.color}10`,
                  border: `1px solid ${item.color}30`,
                  borderRadius: 8,
                  padding: '0.4rem 0.8rem',
                  textDecoration: 'none',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${item.color}20`
                  e.currentTarget.style.borderColor = `${item.color}50`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `${item.color}10`
                  e.currentTarget.style.borderColor = `${item.color}30`
                }}
              >
                Verify on Credly <ExternalLink size={12} />
              </a>
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

            {/* Issuer */}
            <p style={{
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              marginBottom: '0.875rem',
            }}>
              {item.issuer}
            </p>

            {/* Period + Score Badges */}
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
                fontSize: '0.8125rem', fontWeight: 600,
                color: item.color,
                background: `${item.color}10`,
                border: `1px solid ${item.color}30`,
                borderRadius: 6, padding: '0.3rem 0.7rem',
              }}>
                Passing Score: {item.score}
              </span>
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
      </div>
    </section>
  )
}
