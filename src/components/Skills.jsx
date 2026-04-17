import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillCategories = [
  {
    label: 'Languages & Databases',
    icon: '{ }',
    skills: ['Python', 'Java', 'JavaScript', 'SQL', 'MySQL', 'MongoDB'],
  },
  {
    label: 'Frontend / Full Stack',
    icon: '⚛',
    skills: ['React', 'Redux', 'Material UI', 'Responsive Design', 'UI Performance', 'REST API Integration'],
  },
  {
    label: 'Cloud & DevOps',
    icon: '☁',
    skills: ['AWS', 'EC2', 'EKS', 'VPC', 'S3', 'CloudFormation', 'Docker', 'Jenkins', 'Kubernetes', 'Git', 'CI/CD', 'GitHub Actions'],
  },
  {
    label: 'Tools',
    icon: '⚙',
    skills: ['GitHub Copilot', 'Cursor AI', 'Grafana'],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sky-400/70 text-sm tracking-wider">// skills</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Tech Stack</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 hover:border-sky-500/20 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-sky-400 text-lg">{cat.icon}</span>
                <h3 className="text-sm font-semibold text-slate-200">{cat.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="text-xs px-3 py-1.5 rounded-md bg-[#0d1017] border border-white/[0.08] text-slate-400 hover:border-sky-500/30 hover:text-sky-400 transition-all duration-150 cursor-default font-mono"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
