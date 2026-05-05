import { useState, useEffect } from 'react'
import { Menu, X, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = document.querySelectorAll('section[id]')
      let current = ''
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 140) current = section.id
      })
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
          : 'bg-white/70 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-3"
          aria-label="Back to top"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white shadow-sm">
            AP
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-bold leading-4 text-slate-950">Akhilesh Pingle</span>
            <span className="block text-xs font-medium text-slate-500">Backend, cloud, AI apps</span>
          </span>
        </button>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <button
                onClick={() => handleNav(href)}
                className={`relative text-sm font-semibold transition-colors ${
                  active === href.slice(1) ? 'text-blue-700' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-blue-600 transition-all duration-300 ${
                    active === href.slice(1) ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="mailto:pingleakhil12@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            <Mail size={16} />
            Contact
          </a>
        </div>

        <button
          className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 md:hidden"
          onClick={() => setMenuOpen(value => !value)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-b border-slate-200 bg-white/95 px-5 py-4 shadow-sm md:hidden"
          >
            <ul className="flex flex-col gap-3">
              {[...navLinks, { label: 'Contact', href: '#contact' }].map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => handleNav(href)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                      active === href.slice(1)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
