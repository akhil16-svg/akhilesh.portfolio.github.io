/**
 * Projects.jsx
 * ───────────────────────────────────────────────────────
 * Project cards with "pop-out" hover preview.
 *
 * HOW THE HOVER WORKS:
 *   When you hover a card, a floating expanded panel animates in above/near
 *   it — like a mini app screen popping out of the card. It shows:
 *     • A full-width preview image / video area
 *     • Full description + all tags
 *     • GitHub and live demo links
 *   Clicking anywhere on the card or the expanded panel opens the GitHub repo.
 *
 * TO CUSTOMISE:
 *   • Edit the PROJECTS array below
 *   • Add preview images to /public/projects/ and set the `preview` field
 *     e.g. preview: '/projects/invoiceai.png'
 *   • For video: previewVideo: '/projects/invoiceai.mp4'
 *   • Leave preview: null for the styled placeholder
 */

import { useRef, useState, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, ImageIcon } from 'lucide-react'

/* ── EDITABLE CONTENT ─────────────────────────────── */
const PROJECTS = [
  {
    id: 'invoiceai',
    title: 'InvoiceAI',
    subtitle: 'Invoice intelligence platform',
    description: 'AI platform for invoice OCR, fraud detection, and financial analytics. Python backend, PostgreSQL data layer, Streamlit interface, Docker setup.',
    longDescription: 'Built an end-to-end AI platform that extracts structured data from unstructured invoices using OCR, detects anomalies and potential fraud patterns, and surfaces financial analytics in a clean Streamlit dashboard backed by PostgreSQL.',
    tags: ['Python', 'PostgreSQL', 'Docker', 'OCR', 'Streamlit'],
    github: 'https://github.com/akhil16-svg/InvoiceAI',
    demo: null,
    /*
     * TO ADD PREVIEW: set preview to a path like '/projects/invoiceai.png'
     * Place the image in /public/projects/
     */
    preview: null,
    previewVideo: null,
    accentColor: '#3b7fd4',
  },
  {
    id: 'medical-chatbot',
    title: 'Medical Assistant Chatbot',
    subtitle: 'AI assistant prototype',
    description: 'Python chatbot that answers health-related questions from a local knowledge base, exploring retrieval-style assistant workflows.',
    longDescription: 'Designed and built a retrieval-augmented chatbot that queries a local medical knowledge base to answer health questions accurately. Explores embedding-based retrieval and LangChain-style orchestration without relying on live APIs.',
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
    longDescription: 'Applied time-series analysis and regression techniques to Walmart\'s historic sales dataset. Handled data cleaning, holiday feature engineering, store-type segmentation, and model evaluation using MAE/RMSE metrics.',
    tags: ['Python', 'Jupyter', 'Forecasting', 'Regression', 'Pandas'],
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
    longDescription: 'Full-stack property search and listing management platform. Users can browse listings, filter by criteria, and manage property details. Built with a focus on clean architecture, responsive layout, and maintainable code.',
    tags: ['JavaScript', 'Full Stack', 'Web App', 'REST APIs'],
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
    longDescription: 'Designed and built from scratch with a cinematic dark mountain theme. Features a parallax hero, hover-preview project cards, a scroll-driven milestone timeline, and a fixed sidebar navigation. Deployed to GitHub Pages.',
    tags: ['React', 'Tailwind', 'Vite', 'Framer Motion', 'GitHub Pages'],
    github: 'https://github.com/akhil16-svg/akhilesh.portfolio.github.io',
    demo: 'https://akhil16-svg.github.io/akhilesh.portfolio.github.io/',
    preview: null,
    previewVideo: null,
    accentColor: '#c5a96a',
  },
]
/* ── END EDITABLE CONTENT ─────────────────────────── */

/* ── Pop-out expanded preview panel ─────────────── */
function ProjectPopout({ project, cardRect, onClose }) {
  if (!cardRect) return null

  /* Determine if panel should appear above or below the card */
  const viewportH    = window.innerHeight
  const spaceBelow   = viewportH - cardRect.bottom
  const panelH       = 480
  const showAbove    = spaceBelow < panelH + 24

  /* X position — align with card, clamp to viewport */
  const panelW = Math.min(460, window.innerWidth - 32)
  let leftPos  = cardRect.left
  if (leftPos + panelW > window.innerWidth - 16) leftPos = window.innerWidth - panelW - 16
  if (leftPos < 16) leftPos = 16

  const topPos = showAbove
    ? cardRect.top - panelH - 12
    : cardRect.bottom + 12

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, scale: 0.88, y: showAbove ? 16 : -16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: showAbove ? 16 : -16 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      style={{
        position: 'fixed',
        top: topPos,
        left: leftPos,
        width: panelW,
        zIndex: 1000,
        borderRadius: 18,
        background: '#13161f',
        border: `1px solid ${project.accentColor}45`,
        boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px ${project.accentColor}18`,
        overflow: 'hidden',
        cursor: 'default',
      }}
      onClick={e => e.stopPropagation()}
    >
      {/* Preview image area */}
      <div style={{
        height: 200,
        background: `linear-gradient(135deg, #0d0f16 0%, #14171e 100%)`,
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {project.previewVideo ? (
          <video
            src={project.previewVideo}
            autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : project.preview ? (
          <img
            src={project.preview}
            alt={`${project.title} preview`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          /* Placeholder when no image uploaded yet */
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '0.75rem',
          }}>
            <ImageIcon size={28} style={{ color: `${project.accentColor}60` }} />
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}>
              Add preview image to /public/projects/
            </p>
          </div>
        )}

        {/* Accent top border flash */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: project.accentColor, opacity: 0.8 }} />

        {/* Accent tag in corner */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: `${project.accentColor}22`,
          border: `1px solid ${project.accentColor}44`,
          borderRadius: 6, padding: '0.3rem 0.7rem',
          fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: project.accentColor,
        }}>
          {project.subtitle}
        </div>
      </div>

      {/* Content area */}
      <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem', fontWeight: 500,
          color: 'var(--text-primary)', lineHeight: 1.15,
          marginBottom: '0.625rem',
        }}>
          {project.title}
        </h3>

        <p style={{ fontSize: '0.8375rem', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '1.125rem' }}>
          {project.longDescription || project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.25rem' }}>
          {project.tags.map(tag => (
            <span key={tag} className="skill-tag">{tag}</span>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.625rem' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
              background: 'var(--accent)', color: '#0a0c10',
              borderRadius: 8, padding: '0.6rem 1rem',
              fontSize: '0.8rem', fontWeight: 600,
              textDecoration: 'none', letterSpacing: '0.04em',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#dbb96f'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                border: '1px solid var(--border)', color: 'var(--text-muted)',
                borderRadius: 8, padding: '0.6rem 1rem',
                fontSize: '0.8rem', fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-hover)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Individual card ─────────────────────────────── */
function ProjectCard({ project, index, inView, onHover, onLeave }) {
  const cardRef = useRef(null)

  const handleMouseEnter = useCallback(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      onHover(project, rect)
    }
  }, [project, onHover])

  return (
    <motion.div
      ref={cardRef}
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave}
      style={{ minHeight: 260, cursor: 'pointer' }}
      onClick={() => window.open(project.github, '_blank', 'noopener,noreferrer')}
    >
      <div className="project-card-info" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Accent stripe */}
        <div style={{
          width: '100%', height: 2, borderRadius: 1,
          background: project.accentColor, opacity: 0.65,
          marginBottom: '1.4rem',
        }} />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              {project.subtitle}
            </p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {project.title}
            </h3>
          </div>
          <ArrowUpRight size={17} style={{ color: 'var(--text-dim)', flexShrink: 0, marginTop: 4 }} />
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--text-muted)', flex: 1, marginBottom: '1.25rem' }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
          {project.tags.map(tag => (
            <span key={tag} className="skill-tag">{tag}</span>
          ))}
        </div>

        {/* Hover hint */}
        <p style={{ fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '1rem' }}>
          Hover to preview · Click to open GitHub
        </p>
      </div>
    </motion.div>
  )
}

/* ── Main Projects section ───────────────────────── */
export default function Projects() {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(null)       // { project, rect }

  const handleHover = useCallback((project, rect) => {
    setHovered({ project, rect })
  }, [])

  const handleLeave = useCallback(() => {
    setHovered(null)
  }, [])

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
          Hover any card for a preview.
        </p>
      </motion.div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            inView={inView}
            onHover={handleHover}
            onLeave={handleLeave}
          />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ marginTop: '2.5rem', textAlign: 'center' }}
      >
        <a
          href="https://github.com/akhil16-svg"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            fontSize: '0.8125rem', color: 'var(--text-muted)',
            textDecoration: 'none', letterSpacing: '0.05em',
            borderBottom: '1px solid var(--border)', paddingBottom: 2,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          View all on GitHub <ArrowUpRight size={14} />
        </a>
      </motion.div>

      {/* Pop-out hover panel (rendered at body level via fixed positioning) */}
      <AnimatePresence>
        {hovered && (
          <ProjectPopout
            key={hovered.project.id}
            project={hovered.project}
            cardRect={hovered.rect}
            onClose={handleLeave}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          #projects > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
