/**
 * Projects.jsx
 * ───────────────────────────────────────────────────────
 * Project cards with hover-preview effect.
 * • Default state: title, tags, description
 * • Hover state  : preview image fades in + GitHub link overlay
 * • Click        : opens GitHub repo in new tab
 *
 * TO CUSTOMISE:
 *   • Add/edit projects → edit the PROJECTS array below
 *   • Preview images    → add images to /public/projects/ folder
 *     and set the `preview` field to the path (e.g. '/projects/invoiceai.png')
 *     For video previews, set `previewVideo` to the .mp4 path.
 *   • Leave `preview` as null to show a styled placeholder instead.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

/* ── EDITABLE CONTENT ─────────────────────────────── */
const PROJECTS = [
  {
    id: 'invoiceai',
    title: 'InvoiceAI',
    subtitle: 'Invoice intelligence platform',
    description: 'AI platform for invoice OCR, fraud detection, and financial analytics. Python backend, PostgreSQL data layer, Streamlit interface, Docker setup.',
    tags: ['Python', 'PostgreSQL', 'Docker', 'OCR', 'Streamlit'],
    github: 'https://github.com/akhil16-svg/InvoiceAI',
    demo: null,
    preview: null,           // → add '/projects/invoiceai.png' when available
    previewVideo: null,      // → add '/projects/invoiceai.mp4' for video preview
    accentColor: '#3b7fd4',  // card accent stripe color
  },
  {
    id: 'medical-chatbot',
    title: 'Medical Assistant Chatbot',
    subtitle: 'AI assistant prototype',
    description: 'Python chatbot that answers health-related questions from a local knowledge base, exploring retrieval-style assistant workflows.',
    tags: ['Python', 'LangChain', 'RAG', 'Knowledge Base'],
    github: 'https://github.com/akhil16-svg/Medical-Assistant-Chatbot',
    demo: null,
    preview: null,
    previewVideo: null,
    accentColor: '#3db87a',
  },
  {
    id: 'walmart-forecasting',
    title: 'Forecasting Walmart Sales',
    subtitle: 'Forecasting & analytics',
    description: 'Jupyter/Python project for forecasting Walmart sales with data preprocessing, feature engineering, and regression-based modelling.',
    tags: ['Python', 'Jupyter', 'Forecasting', 'Regression'],
    github: 'https://github.com/akhil16-svg/Forecasting-Walmart-Sales',
    demo: null,
    preview: null,
    previewVideo: null,
    accentColor: '#d97c2e',
  },
  {
    id: 'real-estate',
    title: 'Real Estate Platform',
    subtitle: 'Full-stack web app',
    description: 'Property listing and search platform with responsive UI, listing management, and clean full-stack project structure.',
    tags: ['JavaScript', 'Full Stack', 'Web App'],
    github: 'https://github.com/akhil16-svg/Real-Estate-Platform',
    demo: null,
    preview: null,
    previewVideo: null,
    accentColor: '#7c5cd9',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    subtitle: 'Personal portfolio',
    description: 'This portfolio — built with React, Tailwind, Vite, Framer Motion, and deployed via GitHub Pages.',
    tags: ['React', 'Tailwind', 'Vite', 'Framer Motion'],
    github: 'https://github.com/akhil16-svg/akhilesh.portfolio.github.io',
    demo: 'https://akhil16-svg.github.io/akhilesh.portfolio.github.io/',
    preview: null,
    previewVideo: null,
    accentColor: '#c5a96a',
  },
]
/* ── END EDITABLE CONTENT ─────────────────────────── */

function ProjectCard({ project, index, inView }) {
  return (
    <motion.a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ display: 'block', textDecoration: 'none', minHeight: 320 }}
      aria-label={`${project.title} — open GitHub repository`}
    >
      {/* Default info layer */}
      <div className="project-card-info" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Accent stripe */}
        <div style={{ width: '100%', height: 2, borderRadius: 1, background: project.accentColor, opacity: 0.7, marginBottom: '1.5rem' }} />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              {project.subtitle}
            </p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {project.title}
            </h3>
          </div>
          <ArrowUpRight size={18} style={{ color: 'var(--text-dim)', flexShrink: 0, marginTop: 4 }} />
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--text-muted)', flex: 1, marginBottom: '1.5rem' }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
          {project.tags.map(tag => (
            <span key={tag} className="skill-tag">{tag}</span>
          ))}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 3,
                fontSize: '0.6875rem', color: 'var(--accent)', textDecoration: 'none',
                borderBottom: '1px solid rgba(197,169,106,0.3)',
                marginLeft: '0.25rem', paddingBottom: 1,
              }}
            >
              Live demo <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>

      {/* Hover preview layer */}
      <div className="project-card-preview">
        {project.previewVideo ? (
          <video
            src={project.previewVideo}
            autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : project.preview ? (
          <img src={project.preview} alt={`${project.title} preview`} />
        ) : (
          /* Stylised placeholder when no preview asset is available yet */
          <div style={{
            width: '100%', height: '100%', minHeight: 320,
            background: `linear-gradient(135deg, #0e1016 0%, #14171e 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(197,169,106,0.15)',
              letterSpacing: '0.05em',
            }}>
              {project.title}
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="project-card-preview-overlay" />

        {/* Bottom label */}
        <div className="project-card-preview-label">
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(197,169,106,0.8)', marginBottom: '0.25rem' }}>
              {project.subtitle}
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--text-primary)' }}>
              {project.title}
            </p>
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(197,169,106,0.15)',
            border: '1px solid rgba(197,169,106,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent)',
          }}>
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </motion.a>
  )
}

export default function Projects() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="section" ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '3rem' }}
      >
        <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>Projects</span>
        <h2 className="display-lg" style={{ maxWidth: 600, marginBottom: '1rem' }}>
          A portfolio built on<br />
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>real systems.</span>
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', maxWidth: 560, lineHeight: 1.8 }}>
          Selected work across backend APIs, AI-assisted workflows, forecasting, and full-stack product builds.
          Hover over any card to preview the project.
        </p>
      </motion.div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} inView={inView} />
        ))}
      </div>

      {/* Footer link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ marginTop: '2.5rem', textAlign: 'center' }}
      >
        <a
          href="https://github.com/akhil16-svg"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            fontSize: '0.8125rem', color: 'var(--text-muted)',
            textDecoration: 'none', letterSpacing: '0.05em',
            transition: 'color 0.2s ease',
            borderBottom: '1px solid var(--border)',
            paddingBottom: 2,
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          View all on GitHub <ArrowUpRight size={14} />
        </a>
      </motion.div>

      <style>{`
        @media (max-width: 640px) {
          #projects > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
