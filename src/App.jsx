/**
 * App.jsx — Root layout
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
import CircuitBackground from './components/CircuitBackground'
import FloatingNav from './components/FloatingNav'

export default function App() {
  return (
    <>
      {/* Interactive circuit board (desktop, cursor-reactive) */}
      <CircuitBackground />

      {/* Noise texture */}
      <div className="grain-overlay" aria-hidden="true" />

      <div className="layout-wrapper" style={{ position: 'relative', zIndex: 3 }}>
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

        {/* Right-side floating section nav (desktop only) */}
        <FloatingNav />

        {/* Scroll-driven milestone timeline */}
        <ScrollTimeline />
      </div>
    </>
  )
}
