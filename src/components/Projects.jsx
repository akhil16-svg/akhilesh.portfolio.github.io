/**
 * Projects.jsx
 * ─────────────────────────────────────────────────────────────────
 * Scroll-stacking card animation: as you scroll through the section,
 * each card "rises" into view while previous cards scale down and
 * drift upward — creating a natural submerging stack effect.
 *
 * Card design: glass surface, gradient border glow, 3D tilt on hover.
 * Click any card → centered modal with full details.
 *
 * Respects prefers-reduced-motion (renders a simple grid instead).
 *
 * TO ADD PREVIEW IMAGES:
 *   Set preview: '/projects/yourimage.png'  (place in /public/projects/)
 */

import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, X, ImageIcon } from 'lucide-react'

/* ── PROJECTS DATA ──────────────────────────────────── */
const PROJECTS = [
  {
    id: 'invoiceai',
    num: '01',
    title: 'InvoiceAI',
    subtitle: 'AI · OCR · Analytics',
    description: 'AI platform for invoice intelligence — OCR extraction, fraud detection, and financial analytics. Python backend, PostgreSQL, Streamlit, Docker.',
    longDescription: 'End-to-end AI platform that extracts structured data from unstructured invoices using OCR, detects anomalies and potential fraud, and surfaces financial analytics in a Streamlit dashboard backed by PostgreSQL. Fully containerised with Docker.',
    tags: ['Python', 'PostgreSQL', 'Docker', 'OCR', 'Streamlit', 'AI'],
    github: 'https://github.com/akhil16-svg/InvoiceAI',
    demo: null,
    preview: null,
    accentColor: '#7C5CFF',
    accentGlow: 'rgba(124, 92, 255, 0.15)',
  },
  {
    id: 'medical-chatbot',
    num: '02',
    title: 'Medical Assistant Chatbot',
    subtitle: 'RAG · LangChain · NLP',
    description: 'RAG-based chatbot answering health questions from a local knowledge base — no live APIs, embedding-based retrieval.',
    longDescription: 'Retrieval-augmented chatbot that queries a local medical knowledge base to answer health questions accurately. Uses embedding-based retrieval and LangChain-style orchestration. Entirely offline — no third-party LLM API dependencies.',
    tags: ['Python', 'LangChain', 'RAG', 'NLP', 'Knowledge Base'],
    github: 'https://github.com/akhil16-svg/Medical-Assistant-Chatbot',
    demo: null,
    preview: null,
    accentColor: '#00D4FF',
    accentGlow: 'rgba(0, 212, 255, 0.15)',
  },
  {
    id: 'walmart-forecasting',
    num: '03',
    title: 'Forecasting Walmart Sales',
    subtitle: 'ML · Time Series · Regression',
    description: 'ML forecasting project on Walmart historic data — preprocessing, feature engineering, regression modelling, and forecast visualisation.',
    longDescription: 'Applied time-series and regression techniques to Walmart\'s historic sales dataset. Handled data cleaning, holiday feature engineering, store-type segmentation, and model evaluation using MAE/RMSE metrics. Visualised forecast accuracy with Matplotlib.',
    tags: ['Python', 'Jupyter', 'Scikit-learn', 'Pandas', 'Forecasting'],
    github: 'https://github.com/akhil16-svg/Forecasting-Walmart-Sales',
    demo: null,
    preview: null,
    accentColor: '#3BFFB5',
    accentGlow: 'rgba(59, 255, 181, 0.12)',
  },
  {
    id: 'real-estate',
    num: '04',
    title: 'Real Estate Platform',
    subtitle: 'Full Stack · REST · MongoDB',
    description: 'Full-stack property listing and search platform — responsive UI, listing management, clean REST API design and modular architecture.',
    longDescription: 'Full-stack property search and listing management platform. Users can browse listings, filter by criteria, and manage property details. Built with clean REST API architecture, responsive layout, and maintainable modular code across Node.js, React, and MongoDB.',
    tags: ['JavaScript', 'Node.js', 'REST APIs', 'MongoDB', 'React'],
    github: 'https://github.com/akhil16-svg/Real-Estate-Platform',
    demo: null,
    preview: null,
    accentColor: '#FF6B9D',
    accentGlow: 'rgba(255, 107, 157, 0.12)',
  },
  {
    id: 'portfolio',
    num: '05',
    title: 'This Portfolio',
    subtitle: 'React · Framer Motion · Canvas',
    description: 'Built with React, Vite, Framer Motion — scroll-stacking cards, interactive cursor circuit, floating nav, premium glass design.',
    longDescription: 'Designed and built from scratch with a Space Grotesk bold design system, a premium #0A0F1F dark palette, and purple/cyan/green accent system. Features cursor-reactive circuit canvas, scroll-stacking project cards with 3D tilt, right-side floating section nav, and full mobile responsiveness.',
    tags: ['React', 'Vite', 'Framer Motion', 'Canvas API', 'GitHub Pages'],
    github: 'https://github.com/akhil16-svg/akhilesh.portfolio.github.io',
    demo: 'https://akhil16-svg.github.io/akhilesh.portfolio.github.io/',
    preview: null,
    accentColor: '#7C5CFF',
    accentGlow: 'rgba(124, 92, 255, 0.15)',
  },
]

/* ─── GITHUB SVG ICON ─────────────────────────────── */
const GithubSVG = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

/* ─── MODAL ───────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
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
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-box"
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Preview banner */}
        <div style={{
          height: 210,
          background: `linear-gradient(135deg, #0b1022, ${project.accentColor}18)`,
          position: 'relative', overflow: 'hidden',
          borderRadius: '22px 22px 0 0',
        }}>
          {project.preview ? (
            <img src={project.preview} alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
            }}>
              <ImageIcon size={30} style={{ color: `${project.accentColor}50` }} />
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.12)', textTransform: 'uppercase', fontWeight: 600 }}>
                Preview coming soon
              </p>
            </div>
          )}

          {/* Top accent bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(to right, ${project.accentColor}, transparent)` }} />

          {/* Num watermark */}
          <div style={{
            position: 'absolute', bottom: 12, left: 22,
            fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 700,
            color: `${project.accentColor}15`, lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none',
          }}>{project.num}</div>

          {/* Subtitle pill */}
          <div style={{
            position: 'absolute', top: 14, right: 50,
            background: `${project.accentColor}18`,
            border: `1px solid ${project.accentColor}35`,
            borderRadius: 6, padding: '0.28rem 0.75rem',
            fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: project.accentColor,
          }}>{project.subtitle}</div>

          {/* Close */}
          <button onClick={onClose} aria-label="Close modal" style={{
            position: 'absolute', top: 12, right: 12,
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.75rem 2rem 2rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700,
            color: 'var(--text-primary)', letterSpacing: '-0.02em',
            marginBottom: '0.75rem', lineHeight: 1.1,
          }}>{project.title}</h2>

          <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            {project.longDescription}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.75rem' }}>
            {project.tags.map(tag => (
              <span key={tag} className="tech-chip"
                style={{ color: project.accentColor, borderColor: `${project.accentColor}35`, background: `${project.accentColor}10` }}>
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, minWidth: 140,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                background: project.accentColor, color: '#080a18',
                borderRadius: 10, padding: '0.75rem 1.25rem',
                fontSize: '0.8rem', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <GithubSVG /> View on GitHub
            </a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.45rem',
                  border: '1px solid var(--border-subtle)', color: 'var(--text-muted)',
                  borderRadius: 10, padding: '0.75rem 1.25rem',
                  fontSize: '0.8rem', fontWeight: 600,
                  textDecoration: 'none', transition: 'all 0.2s',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
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

/* ─── STICKY STACKING CARD ────────────────────────── */
function StickyCard({ project, index, total, scrollYProgress, onOpen }) {
  const tiltRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const n        = total
  const entryAt  = index / n                          // when card starts entering
  const buryAt   = Math.min(0.999, (index + 1) / n)  // when burial starts

  /* Entry: slide up from below, fade in */
  const y = useTransform(
    scrollYProgress,
    [Math.max(0.001, entryAt - 0.04), entryAt + 0.01, buryAt, 1],
    [52, 0, 0, index < n - 1 ? -(n - 1 - index) * 12 : 0],
    { clamp: true }
  )

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0.001, entryAt - 0.04), entryAt + 0.01, buryAt, 1],
    [0, 1, 1, index < n - 1 ? 0.78 : 1],
    { clamp: true }
  )

  /* Burial: scale down as subsequent cards stack on top */
  const scale = useTransform(
    scrollYProgress,
    [buryAt, 1],
    [1, Math.max(0.82, 1 - (n - 1 - index) * 0.038)],
    { clamp: true }
  )

  /* 3D tilt on hover */
  const handleMouseMove = useCallback((e) => {
    if (!tiltRef.current) return
    const rect = tiltRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 9
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -7
    tiltRef.current.style.transform = `perspective(1100px) rotateY(${x}deg) rotateX(${y}deg)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!tiltRef.current) return
    tiltRef.current.style.transform = 'perspective(1100px) rotateY(0deg) rotateX(0deg)'
    setHovered(false)
  }, [])

  return (
    <motion.div
      style={{
        position: 'sticky',
        top: '11vh',
        zIndex: index + 1,
        marginBottom: index < n - 1 ? '50vh' : '0',
        y,
        opacity,
        scale,
        transformOrigin: 'center top',
      }}
    >
      <div
        ref={tiltRef}
        className="project-card-glass"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        onClick={() => onOpen(project)}
        style={{
          position: 'relative',
          transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Accent top bar */}
        <div style={{
          height: 2,
          background: `linear-gradient(to right, ${project.accentColor}, transparent 60%)`,
        }} />

        {/* Card inner */}
        <div style={{ padding: '2rem 2.5rem 2rem', display: 'flex', gap: '2rem', alignItems: 'stretch' }}>

          {/* Left: main content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Number + subtitle */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.75rem' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.75rem', fontWeight: 700,
                color: hovered ? project.accentColor : 'rgba(255,255,255,0.08)',
                lineHeight: 1, letterSpacing: '-0.04em',
                transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                userSelect: 'none',
              }}>
                {project.num}
              </span>
              <span style={{
                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: project.accentColor, opacity: 0.75,
              }}>
                {project.subtitle}
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)',
              fontWeight: 700, letterSpacing: '-0.02em',
              color: hovered ? 'var(--text-primary)' : 'rgba(248,250,252,0.88)',
              lineHeight: 1.15, marginBottom: '0.75rem',
              transition: 'color 0.3s ease',
            }}>
              {project.title}
            </h3>

            {/* Description */}
            <p style={{
              fontSize: '0.875rem', color: 'var(--text-muted)',
              lineHeight: 1.75, marginBottom: '1.25rem', maxWidth: 520,
            }}>
              {project.description}
            </p>

            {/* Tech chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {project.tags.map(tag => (
                <span key={tag} className="tech-chip"
                  style={hovered ? {
                    color: project.accentColor,
                    borderColor: `${project.accentColor}40`,
                    background: `${project.accentColor}12`,
                  } : {}}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: preview + arrow */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem', flexShrink: 0 }}>
            {/* Preview */}
            <div style={{
              width: 180, height: 115, borderRadius: 12, overflow: 'hidden',
              background: `linear-gradient(135deg, ${project.accentColor}10, rgba(8,10,24,0.8))`,
              border: `1px solid ${project.accentColor}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: hovered ? 1 : 0.6,
              transition: 'opacity 0.3s ease',
              flexShrink: 0,
            }}>
              {project.preview ? (
                <img src={project.preview} alt={project.title} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                  <ImageIcon size={20} style={{ color: `${project.accentColor}45` }} />
                  <p style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.1)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                    Preview
                  </p>
                </div>
              )}
            </div>

            {/* Arrow */}
            <motion.div
              animate={{ x: hovered ? 2 : 0, opacity: hovered ? 1 : 0.35 }}
              transition={{ duration: 0.2 }}
              style={{ color: project.accentColor }}
            >
              <ArrowUpRight size={20} />
            </motion.div>

            {/* Click hint */}
            <AnimatePresence>
              {hovered && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ fontSize: '0.55rem', color: 'var(--text-dim)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}
                >
                  Click to expand
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%', height: '60%',
            background: project.accentGlow,
            filter: 'blur(60px)',
            opacity: hovered ? 0.6 : 0,
            transition: 'opacity 0.5s ease',
            pointerEvents: 'none',
            borderRadius: '50%',
          }}
        />
      </div>
    </motion.div>
  )
}

/* ─── SIMPLIFIED CARD (prefers-reduced-motion) ────── */
function SimpleCard({ project, index, inView, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(project)}
      className="project-card-glass"
      style={{ marginBottom: '1rem', cursor: 'pointer', position: 'relative' }}
    >
      <div style={{ height: 2, background: `linear-gradient(to right, ${project.accentColor}, transparent 60%)` }} />
      <div style={{ padding: '1.75rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '0.35rem' }}>
              {project.subtitle}
            </p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '0.625rem' }}>
              {project.title}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 540 }}>
              {project.description}
            </p>
          </div>
          <ArrowUpRight size={18} style={{ color: project.accentColor, flexShrink: 0, marginLeft: '1rem' }} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '1rem' }}>
          {project.tags.map(t => <span key={t} className="tech-chip">{t}</span>)}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── MAIN COMPONENT ──────────────────────────────── */
export default function Projects() {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef   = useRef(null)
  const containerRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const [activeProject, setActiveProject] = useState(null)

  /* scrollYProgress over the card stack container */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const openModal  = useCallback((p) => setActiveProject(p), [])
  const closeModal = useCallback(() => setActiveProject(null), [])

  return (
    <section id="projects" ref={sectionRef} style={{ position: 'relative' }}>
      {/* ── Section header ─────────────────────── */}
      <div style={{ padding: '6rem 4rem 3rem', borderBottom: 'none' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>
            Selected Work
          </span>
          <h2 className="display-lg" style={{ marginBottom: '1rem' }}>
            Projects I have built
            <br />
            <span style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-cool))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              and shipped.
            </span>
          </h2>
          <p style={{
            fontSize: '0.9375rem', color: 'var(--text-muted)',
            maxWidth: 520, lineHeight: 1.8, fontWeight: 400,
          }}>
            Backend APIs, AI-assisted workflows, ML forecasting, and full-stack builds.
            {!shouldReduceMotion && ' Scroll to explore — click any card for details.'}
          </p>
        </motion.div>
      </div>

      {/* ── Card stack / simple grid ────────────── */}
      {shouldReduceMotion ? (
        /* Accessible: simple stacked list, no scroll animation */
        <div style={{ padding: '0 4rem 6rem', borderBottom: '1px solid var(--border-subtle)' }}>
          {PROJECTS.map((p, i) => (
            <SimpleCard key={p.id} project={p} index={i} inView={inView} onOpen={openModal} />
          ))}
        </div>
      ) : (
        /* Animated scroll-stacking */
        <div
          ref={containerRef}
          style={{ padding: '0 4rem', position: 'relative', borderBottom: '1px solid var(--border-subtle)' }}
        >
          {PROJECTS.map((project, i) => (
            <StickyCard
              key={project.id}
              project={project}
              index={i}
              total={PROJECTS.length}
              scrollYProgress={scrollYProgress}
              onOpen={openModal}
            />
          ))}
          {/* Bottom spacer — clears the last sticky card */}
          <div style={{ height: '20vh' }} />
        </div>
      )}

      {/* ── Footer link ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ padding: '2.5rem 4rem', textAlign: 'center' }}
      >
        <a
          href="https://github.com/akhil16-svg"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            fontSize: '0.8125rem', color: 'var(--text-muted)',
            textDecoration: 'none', letterSpacing: '0.08em', fontWeight: 600,
            borderBottom: '1px solid var(--border-subtle)', paddingBottom: 2,
            textTransform: 'uppercase', transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
        >
          View all repositories on GitHub <ArrowUpRight size={14} />
        </a>
      </motion.div>

      {/* ── Modal ───────────────────────────────── */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal key={activeProject.id} project={activeProject} onClose={closeModal} />
        )}
      </AnimatePresence>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 1023px) {
          #projects > div:nth-child(2) { padding: 0 1.25rem; }
          #projects > div:first-child  { padding: 3.5rem 1.25rem 2.5rem; }
          #projects > div:last-child   { padding: 2rem 1.25rem; }
        }
        @media (max-width: 768px) {
          .project-card-glass > div:nth-child(2) { padding: 1.5rem !important; flex-direction: column !important; }
          .project-card-glass > div:nth-child(2) > div:last-child { flex-direction: row !important; align-items: center; }
        }
      `}</style>
    </section>
  )
}
