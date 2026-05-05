import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BriefcaseBusiness, Calendar, CheckCircle2 } from 'lucide-react'

const experiences = [
  {
    role: 'Software Engineer',
    company: 'Omatochi',
    period: 'Jul 2025 - Present',
    type: 'Full-time',
    bullets: [
      'Develop scalable React-based applications supporting enterprise AI and document processing workflows.',
      'Build modular UI components and integrate asynchronous REST API workflows with resilient error handling.',
      'Improve reliability, data visibility, and frontend architecture across production-facing features.',
      'Collaborate in Agile workflows with CI/CD practices and maintainable delivery standards.',
    ],
    tags: ['React', 'REST APIs', 'Frontend Architecture', 'CI/CD'],
  },
  {
    role: 'Software Development Intern',
    company: 'Omatochi',
    period: 'Jun 2024 - May 2025',
    type: 'Internship',
    bullets: [
      'Built RESTful backend APIs and Redis-backed asynchronous processing workflows.',
      'Improved productivity and reduced latency in dashboard-driven internal workflows.',
      'Connected backend services with user-facing features to improve visibility and operational efficiency.',
      'Translated product requirements into maintainable features across frontend and backend layers.',
    ],
    tags: ['Python', 'Redis', 'REST APIs', 'Backend'],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="bg-white px-5 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12 max-w-3xl"
        >
          <span className="text-sm font-bold text-blue-700">Experience</span>
          <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            Building inside product teams.
          </h2>
        </motion.div>

        <div className="space-y-5">
          {experiences.map((experience, index) => (
            <motion.article
              key={experience.period}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="rounded-2xl border border-slate-200 bg-[#f9fbfd] p-6 shadow-sm transition hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-slate-900/10"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
                    <BriefcaseBusiness size={21} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-950">{experience.role}</h3>
                    <p className="mt-1 text-sm font-bold text-blue-700">{experience.company}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-semibold">
                    <Calendar size={15} />
                    {experience.period}
                  </span>
                  <span className="rounded-lg bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700">
                    {experience.type}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {experience.bullets.map(item => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-teal-600" />
                    <p className="text-sm leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {experience.tags.map(tag => (
                  <span key={tag} className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
