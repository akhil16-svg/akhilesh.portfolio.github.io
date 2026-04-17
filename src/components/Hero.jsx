import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, FileText, ArrowDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

const phrases = [
  'Full-Stack Software Engineer',
  'React & Frontend Developer',
  'Backend API Engineer',
  'Cloud & DevOps Practitioner',
]

function useTyping(phrases) {
  const [display, setDisplay] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIdx]
    const delay = deleting ? 35 : charIdx === current.length ? 2000 : 65

    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true)
      } else if (deleting && charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1))
        setCharIdx(c => c - 1)
      } else {
        setDeleting(false)
        setPhraseIdx(i => (i + 1) % phrases.length)
      }
    }, delay)

    return () => clearTimeout(t)
  }, [charIdx, deleting, phraseIdx, phrases])

  return display
}

export default function Hero() {
  const typed = useTyping(phrases)

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-sky-500/5 blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[100px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#94a3b8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for Software Engineering roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-3"
        >
          Akhilesh Pingle
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-mono text-slate-500 text-base mb-6"
        >
          @akhilcodes
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl font-semibold text-sky-400 mb-6 h-8 flex items-center justify-center gap-1"
        >
          <span>{typed}</span>
          <span className="animate-blink text-sky-400">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Software engineer building scalable web applications — from responsive React frontends 
          and reusable UI systems to backend service integrations, cloud deployments, and CI/CD pipelines.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-sky-500/20 hover:shadow-sky-400/30"
          >
            View Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="px-6 py-3 rounded-lg border border-white/10 hover:border-sky-500/40 text-slate-300 hover:text-white font-semibold text-sm transition-all duration-200 bg-white/[0.03] hover:bg-white/[0.06]"
          >
            Get in Touch
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-violet-500/30 hover:border-violet-400/60 text-violet-400 hover:text-violet-300 font-semibold text-sm transition-all duration-200 bg-violet-500/[0.04] hover:bg-violet-500/[0.08]"
          >
            <FileText size={15} />
            Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-center gap-5"
        >
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-200 transition-colors">
            <GithubIcon size={20} />
          </a>
          <a href="https://linkedin.com/in/linkakhil" target="_blank" rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-200 transition-colors">
            <LinkedinIcon size={20} />
          </a>
          <a href="mailto:pingleakhil12@gmail.com"
            className="text-slate-500 hover:text-slate-200 transition-colors">
            <Mail size={20} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-xs"
        >
          <span className="font-mono">scroll</span>
          <ArrowDown size={14} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}
