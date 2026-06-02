/**
 * App.jsx
 * ───────────────────────────────────────────────────────
 * Root layout — sidebar + main content.
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

export default function App() {
  return (
    <>
      {/* Subtle cinematic grain overlay (CSS-only, no performance cost) */}
      <div className="grain-overlay" aria-hidden="true" />

      <div className="layout-wrapper">
        {/* Fixed sidebar / top navbar */}
        <Sidebar />

        {/* Scrollable main content */}
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
      </div>
    </>
  )
}
