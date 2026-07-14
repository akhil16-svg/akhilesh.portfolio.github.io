import { useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  X,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './components/BrandIcons'

const NAV_ITEMS = [
  ['Expertise', '#expertise'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Education', '#education'],
]

const EXPERTISE = [
  {
    icon: Code2,
    number: '01',
    title: 'Backend systems',
    summary: 'Production APIs and microservices built for maintainability, observability, and predictable performance.',
    stack: 'Python · Flask · Django · FastAPI · REST · gRPC · SQL',
  },
  {
    icon: Sparkles,
    number: '02',
    title: 'Applied AI',
    summary: 'LLM workflows that retrieve, reason, call tools, validate outputs, and automate document-heavy work.',
    stack: 'RAG · Agentic AI · Multimodal LLMs · LangChain · FAISS · Pinecone',
  },
  {
    icon: Cloud,
    number: '03',
    title: 'Cloud architecture',
    summary: 'AWS-native services designed for elastic workloads, secure delivery, and low-operational-overhead scaling.',
    stack: 'AWS · Lambda · API Gateway · Bedrock · EKS · DynamoDB · S3',
  },
  {
    icon: Database,
    number: '04',
    title: 'Platform delivery',
    summary: 'Containerized delivery and monitoring that turns working software into reliable production services.',
    stack: 'Docker · Kubernetes · Terraform · GitHub Actions · Jenkins · CloudWatch',
  },
]

const PROJECTS = [
  {
    number: '01',
    title: 'Agentic Document Intelligence Platform',
    kicker: 'RAG + tool-using agents',
    description: 'A document intelligence service that retrieves evidence from invoices and contracts, plans multi-step work, calls tools, and validates the final output.',
    impact: '60%',
    impactLabel: 'fewer human review touchpoints',
    stack: ['Python', 'LangChain', 'AWS Bedrock', 'FAISS', 'FastAPI'],
  },
  {
    number: '02',
    title: 'Serverless Sales Forecasting API',
    kicker: 'Elastic ML delivery',
    description: 'A serverless forecasting service with DynamoDB-backed state, infrastructure automation, and a release workflow designed for bursty traffic at low cost.',
    impact: 'Daily',
    impactLabel: 'safe releases through CI/CD',
    stack: ['Python', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'CloudFormation'],
  },
  {
    number: '03',
    title: 'InvoiceAI',
    kicker: 'OCR + financial intelligence',
    description: 'An invoice-processing application that turns unstructured documents into reviewable data, anomaly signals, and financial analytics.',
    impact: 'End-to-end',
    impactLabel: 'document-to-insight workflow',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Streamlit'],
    href: 'https://github.com/akhil16-svg/InvoiceAI',
  },
]

const EXPERIENCE = [
  {
    role: 'AI Software Engineer',
    company: 'Omatochi',
    location: 'Dublin, CA',
    period: 'July 2025 — Present',
    stack: 'Python · Flask · Django · LLMs · AWS · Docker · Kubernetes · CI/CD',
    bullets: [
      ['Designed and shipped a RAG-based invoice intelligence pipeline using Python, LLMs, and AWS, reducing manual review time by ', { metric: '60%' }, '.'],
      ['Deployed Flask and Django microservices with Docker and Kubernetes, serving ', { metric: '10k+ requests/day' }, ' at ', { metric: '99.9% uptime' }, '.'],
      ['Built an agentic workflow for multi-step document and data tasks, cutting end-to-end processing from ', { metric: 'minutes to seconds' }, '.'],
      ['Integrated multimodal LLMs into extraction services, improving structured-field accuracy on noisy invoices by ', { metric: '25%' }, '.'],
      ['Owned CI/CD, monitoring, and application security for core services to increase deployment frequency and reduce production incidents.'],
    ],
  },
  {
    role: 'Software Development Intern',
    company: 'Omatochi',
    location: 'Dublin, CA',
    period: 'June 2024 — May 2025',
    stack: 'Python · REST APIs · SQL · React Native · Flask · Django · AWS · Redis',
    bullets: [
      ['Built core features for a sales forecasting tool and an internal chatbot using Python, REST APIs, and SQL.'],
      ['Shipped full-stack functionality across a React Native front end and Flask/Django backend using serverless AWS components.'],
      ['Optimized SQL queries and cached hot paths with Redis, cutting API response time by ', { metric: '35%' }, '.'],
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Deven Infotech Pvt Ltd',
    location: 'Pune, India',
    period: 'June 2022 — May 2023',
    stack: 'Python · REST APIs · SQL · Linux · Docker · CI/CD · Monitoring',
    bullets: [
      ['Developed Python and REST API services backing internal web applications deployed to Linux servers.'],
      ['Implemented SQL schema changes and query optimizations that reduced report-generation latency by ', { metric: '40%' }, '.'],
      ['Containerized legacy services and wired CI/CD pipelines, shortening release cycles from ', { metric: 'weekly to daily' }, '.'],
      ['Added structured logging and monitoring hooks across services to accelerate debugging and root-cause analysis.'],
    ],
  },
]

const EDUCATION = [
  {
    degree: 'Master of Science in Computer Science',
    school: 'California State University, East Bay',
    period: 'August 2023 — May 2025',
    detail: 'Hayward, CA · GPA 3.5 / 4.0',
  },
  {
    degree: 'Bachelor of Engineering in Information Technology',
    school: 'Savitribai Phule Pune University',
    period: 'June 2019 — June 2023',
    detail: 'Pune, India · GPA 9.3 / 10',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Metric({ children }) {
  return <strong className="metric">{children}</strong>
}

function RichText({ parts }) {
  return parts.map((part, index) => (
    typeof part === 'string'
      ? part
      : <Metric key={`${part.metric}-${index}`}>{part.metric}</Metric>
  ))
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="monogram" href="#top" aria-label="Back to top">AP</a>
      <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
        {NAV_ITEMS.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a className="nav-contact" href="mailto:pingleakhil12@gmail.com">Let&apos;s talk <ArrowUpRight size={15} /></a>
      </nav>
      <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}>
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
    </header>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()
  const items = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12, delayChildren: reduceMotion ? 0 : 0.1 } },
  }

  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <motion.div className="hero-inner" variants={items} initial="hidden" animate="visible">
        <motion.div className="portrait-wrap" variants={fadeUp} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <div className="portrait-halo" aria-hidden="true" />
          <img src="./profile.jpg" alt="Akhilesh Pingle working at his laptop" className="portrait" fetchPriority="high" />
          <span className="portrait-tag"><span /> San Francisco Bay Area</span>
        </motion.div>

        <motion.p className="eyebrow" variants={fadeUp} transition={{ duration: 0.8 }}>AI SOFTWARE ENGINEER · AWS CERTIFIED</motion.p>
        <motion.h1 variants={fadeUp} transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}>
          I build AI systems<br />that survive <em>production.</em>
        </motion.h1>
        <motion.p className="hero-summary" variants={fadeUp} transition={{ duration: 0.9 }}>
          Python backends, RAG pipelines, agentic workflows, and AWS infrastructure—designed as one reliable system from model call to monitored service.
        </motion.p>
        <motion.div className="hero-actions" variants={fadeUp} transition={{ duration: 0.9 }}>
          <a className="button button-dark" href="#projects">Explore my work <ArrowDown size={17} /></a>
          <a className="button button-light" href="./Akhilesh_Pingle_Resume.pdf" target="_blank" rel="noreferrer">View résumé <ArrowUpRight size={17} /></a>
        </motion.div>
      </motion.div>
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
    </section>
  )
}

function SectionIntro({ label, title, copy }) {
  return (
    <Reveal className="section-intro">
      <p className="section-label">{label}</p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </Reveal>
  )
}

function Expertise() {
  return (
    <section className="section" id="expertise">
      <SectionIntro
        label="Expertise"
        title="Backend-first AI engineering."
        copy="I work across the full path from retrieval and model orchestration to APIs, infrastructure, deployment, and monitoring."
      />
      <div className="expertise-grid">
        {EXPERTISE.map(({ icon: Icon, number, title, summary, stack }, index) => (
          <Reveal key={title} className="expertise-card" delay={index * 0.08}>
            <div className="card-topline"><Icon size={22} /><span>{number}</span></div>
            <h3>{title}</h3>
            <p>{summary}</p>
            <div className="stack-line">{stack}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="section section-ink" id="projects">
      <SectionIntro
        label="Selected Projects"
        title="Three systems. One production mindset."
        copy="The first two projects are drawn directly from my résumé, followed by InvoiceAI."
      />
      <div className="project-list">
        {PROJECTS.map((project, index) => (
          <Reveal key={project.title} className="project-card" delay={index * 0.08}>
            <div className="project-number">{project.number}</div>
            <div className="project-main">
              <p className="project-kicker">{project.kicker}</p>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="chips">
                {project.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            <div className="project-impact">
              <strong>{project.impact}</strong>
              <span>{project.impactLabel}</span>
              {project.href && (
                <a href={project.href} target="_blank" rel="noreferrer" aria-label="View InvoiceAI on GitHub">
                  View repository <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section" id="experience">
      <SectionIntro
        label="Experience"
        title="Measured impact, not vague output."
        copy="Selected engineering work across applied AI, backend services, cloud infrastructure, and full-stack delivery."
      />
      <div className="experience-list">
        {EXPERIENCE.map((job, index) => (
          <Reveal key={`${job.company}-${job.role}`} className="experience-item" delay={index * 0.06}>
            <div className="experience-meta">
              <span className="experience-index">0{index + 1}</span>
              <p>{job.period}</p>
              <p>{job.location}</p>
            </div>
            <div className="experience-content">
              <div className="experience-heading">
                <div>
                  <h3>{job.role}</h3>
                  <p className="company">{job.company}</p>
                </div>
                <span className="experience-stack">{job.stack}</span>
              </div>
              <ul>
                {job.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex}><RichText parts={bullet} /></li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Credentials() {
  return (
    <section className="section credentials" id="education">
      <SectionIntro label="Foundation" title="Education and credentials." />
      <div className="credential-layout">
        <div className="education-list">
          {EDUCATION.map((item, index) => (
            <Reveal key={item.degree} className="education-card" delay={index * 0.08}>
              <GraduationCap size={23} />
              <div>
                <h3>{item.degree}</h3>
                <p>{item.school}</p>
                <span>{item.period}</span>
                <span>{item.detail}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="cert-card" delay={0.12}>
          <Award size={28} />
          <p className="section-label">Certification</p>
          <h3>AWS Certified Solutions Architect — Associate</h3>
          <p>Architecture expertise across secure, resilient, high-performing, and cost-aware AWS systems.</p>
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <Reveal>
        <p className="section-label">Contact</p>
        <h2>Have a hard backend or AI systems problem?</h2>
        <p>Let&apos;s build something reliable.</p>
        <a className="contact-email" href="mailto:pingleakhil12@gmail.com">
          pingleakhil12@gmail.com <ArrowUpRight size={24} />
        </a>
      </Reveal>
      <div className="contact-footer">
        <div><MapPin size={15} /> San Francisco, CA · Open to relocation</div>
        <div className="socials">
          <a href="https://github.com/akhil16-svg" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon size={19} /></a>
          <a href="https://linkedin.com/in/linkakhil" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon size={19} /></a>
          <a href="mailto:pingleakhil12@gmail.com" aria-label="Email"><Mail size={19} /></a>
        </div>
        <span>© {new Date().getFullYear()} Akhilesh Pingle</span>
      </div>
    </section>
  )
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 28, restDelta: 0.001 })

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Header />
      <main>
        <Hero />
        <div className="trust-strip" aria-label="Core technologies">
          <span>PYTHON</span><i />
          <span>AWS</span><i />
          <span>RAG</span><i />
          <span>AGENTIC AI</span><i />
          <span>MICROSERVICES</span><i />
          <span>DOCKER + KUBERNETES</span>
        </div>
        <Expertise />
        <Projects />
        <Experience />
        <Credentials />
        <Contact />
      </main>
    </>
  )
}
