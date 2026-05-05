import { motion } from 'framer-motion'
import { ArrowRight, Cloud, Database, Mail, MapPin, Server, ShieldCheck } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import heroLayer from '../assets/hero.png'

const highlights = [
  { label: 'AWS Certified', value: 'Solutions Architect Associate', icon: ShieldCheck },
  { label: 'Backend Stack', value: 'Python, Flask, Django, REST APIs', icon: Server },
  { label: 'Cloud Ready', value: 'Docker, Kubernetes, AWS, CI/CD', icon: Cloud },
]

const systemLayers = [
  { title: 'API Layer', detail: 'Flask, Django, REST', color: 'bg-blue-600' },
  { title: 'Data Layer', detail: 'SQL, PostgreSQL', color: 'bg-teal-600' },
  { title: 'Deploy Layer', detail: 'AWS, Docker, K8s', color: 'bg-orange-500' },
]

export default function Hero() {
  const scrollToProjects = (event) => {
    event.preventDefault()
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 pb-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[#f6f8fb]" />
      <div className="absolute inset-0 -z-10 opacity-70 [background-image:linear-gradient(#dbeafe_1px,transparent_1px),linear-gradient(90deg,#dbeafe_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-56 bg-gradient-to-b from-blue-100 via-teal-50 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.88fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Open to backend, cloud, and AI application roles
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] text-slate-950 sm:text-6xl lg:text-7xl">
            Building backend systems that are useful, secure, and ready to scale.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            I am Akhilesh Pingle, a software engineer focused on Python backend development,
            AWS architecture, REST APIs, SQL systems, and AI-powered product workflows.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              View Projects
              <ArrowRight size={17} />
            </a>
            <a
              href="mailto:pingleakhil12@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700"
            >
              <Mail size={17} />
              Contact Me
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm font-semibold text-slate-500">
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-blue-700" />
              San Francisco Bay Area
            </span>
            <a href="https://github.com/akhil16-svg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-slate-950">
              <GithubIcon size={17} />
              GitHub
            </a>
            <a href="https://linkedin.com/in/linkakhil" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-blue-700">
              <LinkedinIcon size={17} />
              LinkedIn
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {highlights.map(({ label, value, icon: Icon }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
                className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm"
              >
                <Icon size={19} className="mb-3 text-blue-700" />
                <div className="text-sm font-bold text-slate-950">{label}</div>
                <div className="mt-1 text-xs leading-5 text-slate-500">{value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="relative"
        >
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10">
            <div className="relative min-h-[520px] overflow-hidden rounded-[22px] bg-slate-950 p-6 text-white">
              <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(#334155_1px,transparent_1px),linear-gradient(90deg,#334155_1px,transparent_1px)] [background-size:42px_42px]" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-teal-300">SYSTEM SNAPSHOT</p>
                  <h2 className="mt-1 text-2xl font-black">Backend + Cloud</h2>
                </div>
                <Database size={26} className="text-orange-300" />
              </div>

              <div className="relative mt-8 flex justify-center">
                <img src={heroLayer} alt="Layered platform architecture" className="h-56 w-56 object-contain drop-shadow-2xl sm:h-64 sm:w-64" />
              </div>

              <div className="relative mt-8 grid gap-3">
                {systemLayers.map(layer => (
                  <div key={layer.title} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.08] p-4">
                    <span className={`h-10 w-1.5 rounded-full ${layer.color}`} />
                    <div>
                      <div className="text-sm font-bold">{layer.title}</div>
                      <div className="mt-0.5 text-xs text-slate-300">{layer.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative mt-6 rounded-xl border border-teal-300/20 bg-teal-300/10 p-4">
                <div className="text-xs font-semibold text-teal-200">CURRENT FOCUS</div>
                <div className="mt-2 text-sm leading-6 text-slate-100">
                  Scalable APIs, cloud deployments, observability, application security, and AI-assisted workflows.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
