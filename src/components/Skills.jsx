/**
 * Skills.jsx
 * ───────────────────────────────────────────────────────
 * Skills section — category grid with animated tag clouds.
 *
 * TO CUSTOMISE → edit SKILL_CATEGORIES and PROFICIENCY_BARS below
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Database, Cloud, GitBranch, Terminal, ShieldCheck } from 'lucide-react'

/* ── EDITABLE CONTENT ─────────────────────────────── */
const SKILL_CATEGORIES = [
  {
    label: 'Programming',
    icon: Code2,
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++'],
    color: '#3b7fd4',
  },
  {
    label: 'Backend',
    icon: Database,
    skills: ['Flask', 'Django', 'FastAPI', 'REST APIs', 'SQL', 'PostgreSQL'],
    color: '#3db87a',
  },
  {
    label: 'Cloud & DevOps',
    icon: Cloud,
    skills: ['AWS', 'Docker', 'Kubernetes', 'OpenShift', 'Serverless', 'Microservices'],
    color: '#d97c2e',
  },
  {
    label: 'Engineering Workflow',
    icon: GitBranch,
    skills: ['Git', 'GitHub', 'CI/CD', 'GitHub Actions', 'Jenkins', 'Agile'],
    color: '#7c5cd9',
  },
  {
    label: 'Systems',
    icon: Terminal,
    skills: ['Linux', 'Shell Scripting', 'Task Automation', 'Server Management'],
    color: '#c5a96a',
  },
  {
    label: 'Reliability & Security',
    icon: ShieldCheck,
    skills: ['Application Security', 'Monitoring', 'Observability', 'Error Handling'],
    color: '#d45b6a',
  },
]
/* ── END EDITABLE CONTENT ─────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: i => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Skills() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="section" ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '3rem' }}
      >
        <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>Skills</span>
        <h2 className="display-lg">
          Backend skills<br />
          <span style={{ color: 'var(--accent)' }}>with cloud depth.</span>
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginTop: '1rem', lineHeight: 1.8, maxWidth: 560 }}>
          The stack is centered on server-side development, cloud deployment,
          application security, and the tools needed to operate modern systems.
        </p>
      </motion.div>

      {/* Category grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {SKILL_CATEGORIES.map((cat, i) => {
          const Icon = cat.icon
          return (
            <motion.div
              key={cat.label}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              custom={i}
              className="card"
            >
              {/* Icon + label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: 38, height: 38,
                  borderRadius: 9,
                  background: `${cat.color}18`,
                  border: `1px solid ${cat.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: cat.color,
                  flexShrink: 0,
                }}>
                  <Icon size={17} />
                </div>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {cat.label}
                </h3>
              </div>

              {/* Skill tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {cat.skills.map(skill => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 640px) {
          #skills > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
