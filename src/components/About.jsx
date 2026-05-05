import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, CheckCircle2, Code2, MapPin, ShieldCheck } from 'lucide-react'

function SectionIntro() {
  return (
    <div className="mb-12 max-w-3xl">
      <span className="text-sm font-bold text-blue-700">About</span>
      <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
        Practical engineering with a backend-first mindset.
      </h2>
      <p className="mt-5 text-lg leading-8 text-slate-600">
        I like building software that has a clear purpose: APIs that are easy to maintain,
        systems that can scale, and user workflows that feel simple because the backend is doing
        the right work.
      </p>
    </div>
  )
}

const strengths = [
  'Python backend development with Flask, Django, REST APIs, and SQL systems.',
  'Cloud architecture with AWS, Docker, Kubernetes, CI/CD, and deployment fundamentals.',
  'AI-enabled projects across invoice intelligence, chatbot workflows, and forecasting.',
  'CS fundamentals from graduate study in computer science, distributed systems, databases, and operating systems.',
]

const credentials = [
  { label: 'AWS Certified', value: 'Solutions Architect Associate', icon: ShieldCheck },
  { label: 'IBM Back-End Development', value: 'Coursera program completed', icon: Award },
  { label: 'Location', value: 'San Francisco Bay Area, CA', icon: MapPin },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="px-5 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <SectionIntro />
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.86fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Code2 size={24} />
            </div>
            <h3 className="text-2xl font-black text-slate-950">What I bring</h3>
            <p className="mt-4 leading-8 text-slate-600">
              I am a software engineer with a Master&apos;s in Computer Science from California State
              University, East Bay. My work is strongest at the intersection of backend engineering,
              cloud architecture, and AI application development.
            </p>

            <div className="mt-7 grid gap-4">
              {strengths.map(item => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 size={19} className="mt-1 shrink-0 text-teal-600" />
                  <p className="text-sm leading-6 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="grid gap-4"
          >
            {credentials.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-950">{label}</div>
                    <div className="mt-1 text-sm leading-6 text-slate-500">{value}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <div className="text-sm font-black text-blue-800">Currently focused on</div>
              <p className="mt-2 text-sm leading-6 text-blue-950/75">
                Backend roles where I can build APIs, cloud-ready services, deployment workflows,
                and AI tools that solve real business problems.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
