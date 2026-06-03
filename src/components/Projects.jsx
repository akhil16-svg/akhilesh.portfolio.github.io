/**
 * Projects.jsx
 * ───────────────────────────────────────────────────────────────────
 * Horizontal project pillars stacked vertically.
 * Each pillar = numbered row with title, tags, preview thumbnail.
 * Hover → pillar zooms in, preview becomes visible.
 * Click → centered modal (bottom-sheet on mobile) slides in with
 *          full details, GitHub link, live demo link.
 *
 * TO ADD PREVIEW IMAGES:
 *   Set preview: '/projects/yourimage.png'   (place in /public/projects/)
 *   Set previewVideo: '/projects/yourvideo.mp4'
 */

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowUpRight, ExternalLink, X, ImageIcon } from 'lucide-react'

/* ── EDITABLE CONTENT ─────────────────────────────── */
const PROJECTS = [
  {
    id: 'invoiceai',
    num: '01',
    title: 'InvoiceAI',
    subtitle: 'Invoice Intelligence Platform',
    description: 'AI platform for invoice OCR, fraud detection, and financial analytics. Python backend, PostgreSQL data layer, Streamlit interface, Docker setup.',
    longDescription: 'Built an end-to-end AI platform that extracts structured data from unstructured invoices using OCR, detects anomalies and potential fraud patterns, and surfaces financial analytics in a clean Streamlit dashboard backed by PostgreSQL. Fully containerised with Docker.',
    tags: ['Python', 'PostgreSQL', 'Docker', 'OCR', 'Streamlit', 'AI'],
    github: 'https://github.com/akhil16-svg/InvoiceAI',
    demo: null,
    preview: null,
    previewVideo: null,
    accentColor: '#3b7fd4',
  },
  {
    id: 'medical-chatbot',
    num: '02',
    title: 'Medical Assistant Chatbot',
    subtitle: 'RAG-Based AI Assistant',
    description: 'Python chatbot answering health-related questions from a local knowledge base — retrieval-augmented generation without live APIs.',
    longDescription: 'Designed and built a retrieval-augmented chatbot that queries a local medical knowledge base to answer health questions accurately. Explores embedding-based retrieval and LangChain-style orchestration. No reliance on live third-party APIs.',
    tags: ['Python', 'LangChain', 'RAG', 'NLP', 'Knowledge Base'],
    github: 'https://github.com/akhil16-svg/Medical-Assistant-Chatbot',
    demo: null,
    preview: null,
    previewVideo: null,
    accentColor: '#3db87a',
  },
  {
    id: 'walmart-forecasting',
    num: '03',
    title: 'Forecasting Walmart Sales',
    subtitle: 'ML Forecasting & Analytics',
    description: 'Jupyter/Python project for forecasting Walmart sales — data preprocessing, feature engineering, and regression-based modelling.',
    longDescription: 'Applied time-series analysis and regression techniques to Walmart\'s historic sales dataset. Handled data cleaning, holiday feature engineering, store-type segmentation, and model evaluation using MAE/RMSE metrics. Visualised forecast accuracy with Matplotlib.',
    tags: ['Python', 'Jupyter', 'Scikit-learn', 'Forecasting', 'Pandas', 'Regression'],
    github: 'https://github.com/akhil16-svg/Forecasting-Walmart-Sales',
    demo: null,
    preview: null,
    previewVideo: null,
    accentColor: '#d97c2e',
  },
  {
    id: 'real-estate',
    num: '04',
    title: 'Real Estate Platform',
    subtitle: 'Full-Stack Web Application',
    description: 'Property listing and search platform with responsive UI, listing management, and clean full-stack architecture.',
    longDescription: 'Full-stack property search and listing management platform. Users can browse listings, filter by criteria, and manage property details. Built with a focus on clean architecture, responsive layout, REST API design, and maintainable modular code.',
    tags: ['JavaScript', 'Node.js', 'REST APIs', 'MongoDB', 'React', 'Full Stack'],
    github: 'https://github.com/akhil16-svg/Real-Estate-Platform',
    demo: null,
    preview: null,
    previewVideo: null,
    accentColor: '#7c5cd9',
  },
  {
    id: 'portfolio',
    num: '05',
    title: 'This Portfolio',
    subtitle: 'Personal Portfolio Website',
    description: 'Built with React, Vite, Framer Motion — interactive circuit background, horizontal project pillars, scroll timeline.',
    longDescription: 'Designed and built from scratch with a bold Space Grotesk design system. Features interactive cursor-reactive circuit background, horizontal project pillars with center modal popups, scroll-driven milestone timeline, and full mobile responsiveness. Deployed to GitHub Pages.',
    tags: ['React', 'Vite', 'Framer Motion', 'Canvas API', 'GitHub Pages'],
    github: 'https://github.com/akhil16-svg/akhilesh.portfolio.github.io',
    demo: 'https://akhil16-svg.github.io/akhilesh.portfolio.github.io/',
    preview: null,
    previewVideo: null,
    accentColor: '#c5a96a',
  },
]
/* ── END EDITABLE CONTENT ─────────────────────────── */

/* ── Centered project modal ───────────────────────── */
function ProjectModal({ project, onClose }) {
  /* Close on Escape key */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-box"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 340, damping: 30 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Preview image / placeholder */}
        <div style={{
          height: 220,
          background: `linear-gradient(135deg, #0c0f18, #13161f)`,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '20px 20px 0 0',
        }}>
          {project.previewVideo ? (
            <video src={project.previewVideo} autoPlay loop muted playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : project.preview ? (
            <img src={project.preview} alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
            }}>
              <ImageIcon size={32} style={{ color: `${project.accentColor}55` }} />
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase', fontWeight: 600 }}>
                Preview Coming Soon
              </p>
            </div>
          )}

          {/* Top accent bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: project.accentColor }} />

          {/* Project number */}
          <div style={{
            position: 'absolute', bottom: 16, left: 24,
            fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 700,
            color: `${project.accentColor}22`, lineHeight: 1, letterSpacing: '-0.04em',
            userSelect: 'none',
          }}>
            {project.num}
          </div>

          {/* Subtitle tag */}
          <div style={{
            position: 'absolute', top: 16, right: 50,
            background: `${project.accentColor}20`,
            border: `1px solid ${project.accentColor}40`,
            borderRadius: 6, padding: '0.3rem 0.75rem',
            fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: project.accentColor,
          }}>
            {project.subtitle}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute', top: 14, right: 14,
              width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = 'var(--text-primary)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.75rem 2rem 2rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: '0.75rem',
            lineHeight: 1.1,
          }}>
            {project.title}
          </h2>

          <p style={{
            fontSize: '0.9rem', lineHeight: 1.8,
            color: 'var(--text-muted)', marginBottom: '1.5rem',
          }}>
            {project.longDescription || project.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.75rem' }}>
            {project.tags.map(tag => (
              <span key={tag} className="skill-tag"
                style={{ color: project.accentColor, borderColor: `${project.accentColor}35` }}>
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={project.github}
              target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, minWidth: 140,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                background: project.accentColor,
                color: '#080a0f',
                borderRadius: 9, padding: '0.75rem 1.25rem',
                fontSize: '0.8rem', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.45rem',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  borderRadius: 9, padding: '0.75rem 1.25rem',
                  fontSize: '0.8rem', fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
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
    </motion.div>
  )
}

/* ── Individual horizontal pillar ─────────────────── */
function ProjectPillar({ project, index, inView, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="project-pillar"
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
      role="button"
      aria-label={`Open ${project.title} details`}
      style={{ minHeight: 120 }}
    >
      {/* Left accent bar */}
      <div style={{
        width: 3,
        flexShrink: 0,
        background: hovered ? project.accentColor : 'rgba(255,255,255,0.05)',
        transition: 'background 0.3s ease',
      }} />

      {/* Main body */}
      <div className="pillar-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {/* Number */}
          <span className="pillar-number">{project.num}</span>

          {/* Title + subtitle + tags */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{
              fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--text-dim)',
              marginBottom: '0.3rem',
            }}>
              {project.subtitle}
            </p>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontWeight: 700,
              color: hovered ? 'var(--text-primary)' : 'rgba(237,234,226,0.85)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '0.6rem',
              transition: 'color 0.3s',
            }}>
              {project.title}
            </h3>
            <p style={{
              fontSize: '0.82rem', color: 'var(--text-muted)',
              lineHeight: 1.6, marginBottom: '0.8rem',
              maxWidth: 560,
            }}>
              {project.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {project.tags.slice(0, 5).map(tag => (
                <span key={tag} className="skill-tag"
                  style={hovered ? { color: project.accentColor, borderColor: `${project.accentColor}35` } : {}}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: preview + arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingRight: '1.5rem', flexShrink: 0 }}>
        {/* Preview thumbnail */}
        <div className="pillar-preview" style={{
          width: 180, height: 110, borderRadius: 10, overflow: 'hidden',
          background: `linear-gradient(135deg, ${project.accentColor}12, #0c0f18)`,
          border: `1px solid ${project.accentColor}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {project.previewVideo ? (
            <video src={project.previewVideo} autoPlay loop muted playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : project.preview ? (
            <img src={project.preview} alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <ImageIcon size={22} style={{ color: `${project.accentColor}50` }} />
              <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>Preview</p>
            </div>
          )}
        </div>

        {/* Arrow */}
        <motion.div
          animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0.35 }}
          transition={{ duration: 0.2 }}
          style={{ color: project.accentColor }}
        >
          <ArrowUpRight size={20} />
        </motion.div>
      </div>

      {/* "Click to open" hint */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              bottom: 10, right: 60,
              fontSize: '0.58rem', fontWeight: 600,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--text-dim)',
            }}
          >
            Click to expand
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Main Projects section ───────────────────────── */
export default function Projects() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [activeProject, setActiveProject] = useState(null)

  const openModal  = useCallback((project) => setActiveProject(project), [])
  const closeModal = useCallback(() => setActiveProject(null), [])

  return (
    <section id="projects" className="section" ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '3rem' }}
      >
        <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>Selected Work</span>
        <h2 className="display-lg" style={{ marginBottom: '1rem' }}>
          Projects built on
          <br />
          <span style={{ color: 'var(--accent)' }}>real systems.</span>
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', maxWidth: 560, lineHeight: 1.8, fontWeight: 400 }}>
          Backend APIs, AI-assisted workflows, forecasting, and full-stack builds.
          Click any project to see full details.
        </p>
      </motion.div>

      {/* Horizontal pillar stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {PROJECTS.map((project, i) => (
          <ProjectPillar
            key={project.id}
            project={project}
            index={i}
            inView={inView}
            onClick={openModal}
          />
        ))}
      </div>

      {/* Footer link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{ marginTop: '2.5rem', textAlign: 'center' }}
      >
        <a
          href="https://github.com/akhil16-svg"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            fontSize: '0.8125rem', color: 'var(--text-muted)',
            textDecoration: 'none', letterSpacing: '0.08em', fontWeight: 600,
            borderBottom: '1px solid var(--border)', paddingBottom: 2,
            textTransform: 'uppercase',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          View all repositories on GitHub <ArrowUpRight size={14} />
        </a>
      </motion.div>

      {/* Centered modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            key={activeProject.id}
            project={activeProject}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
