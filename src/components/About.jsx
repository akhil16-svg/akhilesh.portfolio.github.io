import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function SectionLabel({ label }) {
  return (
    <span className="font-mono text-sky-400/70 text-sm tracking-wider">{label}</span>
  )
}

function StatCard({ num, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5 text-center hover:border-sky-500/30 hover:bg-white/[0.06] transition-all duration-200"
    >
      <div className="text-2xl font-bold text-sky-400 mb-1">{num}</div>
      <div className="text-xs text-slate-500 leading-snug">{label}</div>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <SectionLabel label="// about" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Building Software That Ships
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-slate-400 leading-relaxed">
              I&apos;m a <span className="text-slate-200 font-medium">Software Engineer</span> with a{' '}
              <span className="text-slate-200 font-medium">Master&apos;s in Computer Science</span> from California 
              State University, East Bay. My academic foundation covers object-oriented programming, data 
              structures and algorithms, operating systems, database systems, and distributed computing.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I apply this foundation to engineer scalable React frontends, production-grade backend APIs, 
              asynchronous workflows, and cloud-deployed services. I care deeply about code quality, 
              system reliability, and delivering features that hold up under real-world load.
            </p>

            <div className="bg-[#0d1017] border border-white/[0.08] rounded-xl overflow-hidden font-mono text-sm">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-3 text-slate-500 text-xs">terminal</span>
              </div>
              <div className="p-5 space-y-3 text-slate-400">
                <div>
                  <span className="text-sky-400">$ </span>
                  <span className="text-slate-300">whoami</span>
                </div>
                <div className="text-emerald-400 pl-2">&gt; akhilesh_pingle</div>
                <div className="mt-2">
                  <span className="text-sky-400">$ </span>
                  <span className="text-slate-300">cat focus.txt</span>
                </div>
                <div className="text-emerald-400 pl-2">
                  &gt; react, javascript, python,<br />
                  &gt; aws, redis, rest_apis, ci_cd
                </div>
                <div className="mt-2">
                  <span className="text-sky-400">$ </span>
                  <span className="text-slate-300">echo $STATUS</span>
                </div>
                <div className="text-emerald-400 pl-2">
                  &gt; open_to_work
                  <span className="inline-block w-2 h-4 bg-emerald-400/70 ml-1 animate-blink" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <StatCard num="10k+" label="Daily Workflows Supported" />
              <StatCard num="25%" label="Failure Rate Reduction" />
              <StatCard num="40%" label="Productivity Improvement" />
              <StatCard num="2+" label="Years Engineering Experience" />
            </div>

            <div className="space-y-3">
              {[
                { icon: '📍', text: 'San Francisco Bay Area, CA — Open to Relocate' },
                { icon: '✉️', text: 'pingleakhil12@gmail.com' },
                { icon: '🔗', text: 'linkedin.com/in/linkakhil' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-slate-400 text-sm">
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
