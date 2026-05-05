import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BarChart3, Bot, ExternalLink, FileStack, Globe2, Home, Sparkles } from 'lucide-react'
import { GithubIcon } from './BrandIcons'

const projects = [
  {
    title: 'InvoiceAI',
    subtitle: 'Invoice intelligence platform',
    description:
      'AI platform for invoice OCR, fraud checks, and financial analytics with a Python backend, PostgreSQL data layer, Streamlit interface, and Docker-based setup.',
    tags: ['Python', 'Streamlit', 'PostgreSQL', 'Docker', 'OCR'],
    github: 'https://github.com/akhil16-svg/InvoiceAI',
    icon: FileStack,
    accent: 'bg-blue-600',
  },
  {
    title: 'Medical Assistant Chatbot',
    subtitle: 'AI assistant prototype',
    description:
      'Python chatbot prototype that answers health-related questions from a local knowledge base, built to explore retrieval-style assistant workflows.',
    tags: ['Python', 'Chatbot', 'AI Assistant', 'Knowledge Base'],
    github: 'https://github.com/akhil16-svg/Medical-Assistant-Chatbot',
    icon: Bot,
    accent: 'bg-teal-600',
  },
  {
    title: 'Forecasting Walmart Sales',
    subtitle: 'Forecasting and analytics',
    description:
      'Jupyter and Python project for forecasting Walmart sales with data preprocessing, feature engineering, and regression-based modeling.',
    tags: ['Python', 'Jupyter', 'Forecasting', 'Regression'],
    github: 'https://github.com/akhil16-svg/Forecasting-Walmart-Sales',
    icon: BarChart3,
    accent: 'bg-orange-500',
  },
  {
    title: 'Real Estate Platform',
    subtitle: 'Full-stack web app',
    description:
      'Property listing and search platform focused on full-stack workflows, responsive UI, listing management, and clean project structure.',
    tags: ['JavaScript', 'Full Stack', 'Web App', 'Listings'],
    github: 'https://github.com/akhil16-svg/Real-Estate-Platform',
    icon: Home,
    accent: 'bg-indigo-600',
  },
  {
    title: 'Portfolio Website',
    subtitle: 'Personal portfolio',
    description:
      'React and Tailwind portfolio site for presenting backend, cloud, AI, education, and professional experience in one polished place.',
    tags: ['React', 'Tailwind', 'Vite', 'GitHub Pages'],
    github: 'https://github.com/akhil16-svg/akhilesh.portfolio.github.io',
    demo: 'https://akhil16-svg.github.io/akhilesh.portfolio.github.io/',
    icon: Globe2,
    accent: 'bg-slate-950',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="bg-white px-5 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-3xl">
            <span className="text-sm font-bold text-blue-700">Projects</span>
            <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              A portfolio focused on real systems.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-500">
            Selected work across backend APIs, AI-assisted workflows, forecasting, and full-stack product builds.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className={`group flex min-h-[360px] flex-col rounded-2xl border border-slate-200 bg-[#f9fbfd] p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-slate-900/10 ${
                  index < 2 ? 'xl:col-span-1' : ''
                }`}
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${project.accent} text-white shadow-sm`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 transition hover:text-slate-950"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <GithubIcon size={18} />
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 transition hover:text-blue-700"
                        aria-label={`${project.title} live website`}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="mb-2 text-sm font-bold text-blue-700">{project.subtitle}</div>
                <h3 className="text-2xl font-black text-slate-950">{project.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{project.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-8 rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-teal-300">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black">More work is being refined.</h3>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Empty or early-stage repositories are being kept honest while the strongest projects stay front and center.
                </p>
              </div>
            </div>
            <a
              href="https://github.com/akhil16-svg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              View GitHub
              <ExternalLink size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
