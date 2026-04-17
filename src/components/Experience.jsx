import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const experiences = [
  {
    role: 'Software Engineer',
    company: 'Omatochi',
    period: 'Jul 2025 – Present',
    type: 'Full-time',
    bullets: [
      'Designed and developed scalable React-based frontend applications supporting 10k+ daily document processing workflows in enterprise AI platforms',
      'Built modular and reusable UI components using React Hooks, Context API, and Redux',
      'Engineered asynchronous REST API integrations with robust error handling and retry mechanisms',
      'Improved system reliability and reduced failures by 25%',
      'Worked in Agile environments with Jenkins-powered CI/CD pipelines',
      'Identified bottlenecks in data flow and frontend behavior, improving coding standards and architecture',
    ],
    tags: ['React', 'Redux', 'REST APIs', 'Jenkins', 'CI/CD'],
  },
  {
    role: 'Software Development Intern',
    company: 'Omatochi',
    period: 'Jun 2024 – May 2025',
    type: 'Internship',
    bullets: [
      'Designed and developed RESTful backend APIs and Redis-backed asynchronous processing workflows',
      'Increased productivity by 30–40% while reducing latency during peak traffic',
      'Built backend integrations and dashboard-backed workflows end to end',
      'Turned product requirements into maintainable features that improved visibility and user efficiency',
    ],
    tags: ['Python', 'Redis', 'REST APIs', 'Backend'],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-24 px-6 bg-[#0d1017]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sky-400/70 text-sm tracking-wider">// experience</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Where I&apos;ve Worked</h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.period}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group bg-white/[0.03] border border-white/[0.07] rounded-xl p-7 hover:border-sky-500/30 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
                <div>
                  <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                  <p className="text-sky-400 font-medium text-sm">{exp.company}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="font-mono text-slate-500 text-xs">{exp.period}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/[0.04] text-slate-500 border border-white/[0.06]">
                    {exp.type}
                  </span>
                </div>
              </div>

              <ul className="space-y-2 mb-5">
                {exp.bullets.map(b => (
                  <li key={b} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="text-sky-400 mt-1 flex-shrink-0">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-md font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
