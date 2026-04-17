import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

const education = [
  {
    degree: 'Master of Science in Computer Science',
    school: 'California State University, East Bay',
    period: 'Aug 2023 – May 2025',
    gpa: '3.5',
    highlights: ['Object-Oriented Programming', 'Data Structures & Algorithms', 'Distributed Systems', 'Database Systems'],
  },
  {
    degree: 'Bachelor of Engineering in Information Technology',
    school: 'Savitribai Phule Pune University',
    period: 'Jun 2019 – May 2023',
    gpa: '4.0',
    highlights: ['Computer Networks', 'Operating Systems', 'Software Engineering', 'Web Technologies'],
  },
]

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sky-400/70 text-sm tracking-wider">// education</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Academic Background</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-7 hover:border-sky-500/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={18} className="text-sky-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white leading-snug">{edu.degree}</h3>
                  <p className="text-sky-400 text-sm font-medium mt-0.5">{edu.school}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-5 text-sm">
                <span className="font-mono text-slate-500 text-xs">{edu.period}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  GPA: {edu.gpa}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {edu.highlights.map(h => (
                  <span key={h} className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                    {h}
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
