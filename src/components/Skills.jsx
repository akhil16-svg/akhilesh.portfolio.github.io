import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Boxes, Cloud, Code2, Database, GitBranch, MonitorCheck, ShieldCheck, Terminal } from 'lucide-react'

const skillCategories = [
  {
    label: 'Programming',
    icon: Code2,
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++'],
  },
  {
    label: 'Backend',
    icon: Database,
    skills: ['Flask', 'Django', 'FastAPI', 'REST APIs', 'SQL', 'PostgreSQL'],
  },
  {
    label: 'Cloud and DevOps',
    icon: Cloud,
    skills: ['AWS', 'Docker', 'Kubernetes', 'OpenShift', 'Serverless', 'Microservices'],
  },
  {
    label: 'Engineering Workflow',
    icon: GitBranch,
    skills: ['Git', 'GitHub', 'CI/CD', 'GitHub Actions', 'Jenkins', 'Agile'],
  },
  {
    label: 'Systems',
    icon: Terminal,
    skills: ['Linux', 'Shell Scripting', 'Task Automation', 'Server Management'],
  },
  {
    label: 'Reliability and Security',
    icon: ShieldCheck,
    skills: ['Application Security', 'Monitoring', 'Observability', 'Error Handling'],
  },
]

const learningPath = [
  { title: 'Build', detail: 'Advanced Python, REST APIs, Flask, Django', icon: Code2 },
  { title: 'Persist', detail: 'SQL design, querying, backend data modeling', icon: Database },
  { title: 'Package', detail: 'Docker, Kubernetes, OpenShift, microservices', icon: Boxes },
  { title: 'Operate', detail: 'CI/CD, monitoring, observability, Linux automation', icon: MonitorCheck },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="px-5 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12 max-w-3xl"
        >
          <span className="text-sm font-bold text-blue-700">Skills</span>
          <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            Backend skills with cloud depth.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            The stack is centered on server-side development, deployment, security, and the tools needed
            to operate modern applications.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-black text-slate-950">{category.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <span
                      key={skill}
                      className="rounded-md border border-slate-200 bg-[#f9fbfd] px-3 py-1.5 text-xs font-bold text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-8 grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-4">
          {learningPath.map(({ title, detail, icon: Icon }) => (
            <div key={title} className="border-slate-200 md:border-r md:pr-5 last:border-r-0">
              <Icon size={22} className="mb-3 text-teal-600" />
              <div className="text-sm font-black text-slate-950">{title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
