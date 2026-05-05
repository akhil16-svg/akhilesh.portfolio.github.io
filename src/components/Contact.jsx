import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

const contactLinks = [
  {
    label: 'Email',
    value: 'pingleakhil12@gmail.com',
    href: 'mailto:pingleakhil12@gmail.com',
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/linkakhil',
    href: 'https://linkedin.com/in/linkakhil',
    icon: LinkedinIcon,
  },
  {
    label: 'GitHub',
    value: 'github.com/akhil16-svg',
    href: 'https://github.com/akhil16-svg',
    icon: GithubIcon,
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="bg-slate-950 px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="grid gap-10 lg:grid-cols-[1fr_0.82fr]"
        >
          <div>
            <span className="text-sm font-bold text-teal-300">Contact</span>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Let&apos;s talk about backend, cloud, or AI application work.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              I am open to software engineering, backend development, cloud engineering,
              and AI application roles. The fastest way to reach me is email or LinkedIn.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:pingleakhil12@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                <Mail size={17} />
                Email Me
              </a>
              <a
                href="https://linkedin.com/in/linkakhil"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-teal-300 hover:text-teal-200"
              >
                Connect on LinkedIn
                <ArrowRight size={17} />
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6">
            <div className="mb-6 flex items-start gap-3 rounded-xl bg-white/[0.06] p-4">
              <MapPin size={19} className="mt-0.5 text-teal-300" />
              <div>
                <div className="text-sm font-bold">San Francisco Bay Area, CA</div>
                <div className="mt-1 text-sm text-slate-300">Open to on-site, hybrid, and remote roles.</div>
              </div>
            </div>

            <div className="space-y-3">
              {contactLinks.map(({ label, value, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-teal-300/50 hover:bg-white/[0.08]"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="text-teal-300" />
                    <div>
                      <div className="text-xs font-bold text-slate-400">{label}</div>
                      <div className="mt-0.5 text-sm font-semibold text-white">{value}</div>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-slate-500" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
