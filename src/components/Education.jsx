import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, GraduationCap } from 'lucide-react'

const education = [
  {
    title: 'Master of Science in Computer Science',
    organization: 'California State University, East Bay',
    period: 'Aug 2023 - May 2025',
    detail: 'Graduate foundation in distributed systems, database systems, operating systems, algorithms, and software engineering.',
    type: 'Education',
    icon: GraduationCap,
  },
  {
    title: 'Bachelor of Engineering in Information Technology',
    organization: 'Savitribai Phule Pune University',
    period: 'Jun 2019 - May 2023',
    detail: 'Core study across computer networks, operating systems, software engineering, databases, and web technologies.',
    type: 'Education',
    icon: GraduationCap,
  },
  {
    title: 'AWS Certified Solutions Architect Associate',
    organization: 'Amazon Web Services',
    period: 'Active credential',
    detail: 'Architecture fundamentals across scalability, availability, security, cost awareness, networking, compute, and storage.',
    type: 'Certification',
    icon: Award,
  },
  {
    title: 'IBM Back-End Development Program',
    organization: 'Coursera',
    period: 'Completed',
    detail: 'Python, Flask, Django, SQL, Git/GitHub, Docker, Kubernetes, OpenShift, serverless, CI/CD, monitoring, Linux, shell scripting, and application security.',
    type: 'Coursework',
    icon: Award,
  },
]

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="px-5 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12 max-w-3xl"
        >
          <span className="text-sm font-bold text-blue-700">Education and credentials</span>
          <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            Academic depth plus current backend training.
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {education.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-blue-700">{item.type}</div>
                      <h3 className="mt-1 text-lg font-black leading-snug text-slate-950">{item.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-slate-500">{item.organization}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-4 inline-flex rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                  {item.period}
                </div>
                <p className="text-sm leading-7 text-slate-600">{item.detail}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
