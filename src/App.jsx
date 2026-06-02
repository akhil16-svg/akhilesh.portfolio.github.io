/**
 * App.jsx — Root layout with global softened mountain background
 */

import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollTimeline from './components/ScrollTimeline'

export default function App() {
  return (
    <>
      {/* ── Global softened mountain background (fixed, behind everything) ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <img
          src="/mountain-bg.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            /* Very soft — just a hint of depth, won't compete with content */
            filter: 'brightness(0.12) saturate(0.3) blur(3px)',
            opacity: 0.9,
            display: 'block',
          }}
        />
        {/* Overlay to ensure text always readable */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10,12,16,0.72)',
        }} />
      </div>

      {/* Cinematic grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      <div className="layout-wrapper" style={{ position: 'relative', zIndex: 1 }}>
        <Sidebar />

        <main className="main-content">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Education />
          <Contact />
          <Footer />
        </main>

        {/* Scroll-driven milestone timeline — fixed on right edge */}
        <ScrollTimeline />
      </div>
    </>
  )
}
