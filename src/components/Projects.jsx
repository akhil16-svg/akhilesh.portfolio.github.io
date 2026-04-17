import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './BrandIcons'

const projects = [
  {
    title: 'Real Estate Platform',
    description:
      'Full-stack real estate platform with secure authentication, RESTful CRUD APIs, and responsive user experiences. Designed scalable data workflows and deployed the end-to-end application on AWS.',
    tags: ['React', 'Node.js', 'MySQL', 'AWS'],
    highlights: [
      'Secure JWT authentication and role-based access control',
      'RESTful CRUD APIs with input validation and error handling',
      'Responsive frontend with optimized rendering',
      'Deployed on AWS EC2 with S3 static asset storage',
    ],
    github: 'https://github.com',
    demo: null,
    featured: true,
  },
  {
    title: 'Walmart Sales Forecasting',
    description:
      'Machine learning sales forecasting pipeline exposed via REST API. Deployed serverlessly on AWS Lambda + API Gateway with S3 artifact storage and CloudWatch observability.',
    tags: ['Python', 'Scikit-learn', 'AWS Lambda', 'API Gateway', 'S3'],
    highlights: [
      'Forecasting pipeline using Pandas and Scikit-learn models',
      'Serverless REST API via AWS Lambda and API Gateway',
      'Dataset and model artifact storage in S3',
      'CloudWatch monitoring for execution visibility',
    ],
    github: 'https://github.com',
    demo: null,
    featured: true,
  },
]

const capabilities = [
  { label: 'Scalable UI Systems', icon: '⚛️' },
  { label: 'Async API Integration', icon: '🔗' },
  { label: 'Cloud Deployment', icon: '☁️' },
  { label: 'Production Monitoring', icon: '📊' },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-24 px-6 bg-[#0d1017]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sky-400/70 text-sm tracking-wider">// projects</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">What I&apos;ve Built</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 hover:border-sky-500/30 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-white group-hover:text-sky-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="text-slate-500 hover:text-slate-200 transition-colors">
                      <GithubIcon size={16} />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="text-slate-500 hover:text-slate-200 transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.description}</p>

              <ul className="space-y-1.5 mb-5">
                {project.highlights.map(h => (
                  <li key={h} className="flex items-start gap-2 text-xs text-slate-500">
                    <span className="text-sky-400 mt-0.5">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {capabilities.map(({ label, icon }) => (
            <div key={label}
              className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 text-center hover:border-sky-500/20 transition-all duration-200">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="text-xs text-slate-400 font-medium">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
