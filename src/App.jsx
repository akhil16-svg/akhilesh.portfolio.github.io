/**
 * App.jsx — Root layout
 * Circuit background appears on mouse hover (desktop only).
 * No mountain image — clean dark base.
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

export default function App() {
  return (
    <>
      {/* Interactive circuit board — appears on cursor movement */}
      <CircuitBackground />

      {/* Cinematic grain texture */}
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

        {/* Scroll-driven milestone timeline — fixed on right edge */}
        <ScrollTimeline />
      </div>
    </>
  )
}
