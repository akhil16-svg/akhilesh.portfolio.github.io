import { useEffect, useState } from 'react'
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
  Moon,
  Sparkles,
  Sun,
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
    icon: Sparkles,
    number: '01',
    title: 'Conversational & agentic AI',
    summary: 'Enterprise LLM workflows that retrieve context, orchestrate tools, trace prompts, and produce validated responses.',
    stack: 'AI Agents · Conversational AI · RAG · LangChain · LangGraph · LangSmith',
  },
  {
    icon: Code2,
    number: '02',
    title: 'Machine learning',
    summary: 'Forecasting and recommendation pipelines built from supervised learning, deep learning, and behavioral signals.',
    stack: 'PyTorch · Scikit-learn · Recommendation Systems · Forecasting Models',
  },
  {
    icon: Database,
    number: '03',
    title: 'Data & AI infrastructure',
    summary: 'Distributed processing and automated ETL pipelines that create dependable training and analytics datasets.',
    stack: 'Python · SQL · Apache Spark · PySpark · Databricks · Airflow · ETL',
  },
  {
    icon: Cloud,
    number: '04',
    title: 'Cloud, MLOps & inference',
    summary: 'Real-time AI services delivered through cloud-native APIs, container orchestration, caching, and CI/CD.',
    stack: 'AWS SageMaker · Lambda · EKS · Docker · Kubernetes · FastAPI · Redis',
  },
]

const PROJECTS = [
  {
    number: '01',
    title: 'Agentic Document Intelligence Platform',
    kicker: 'Contextual retrieval + tool-calling agents',
    description: 'A RAG platform that indexes invoices and contracts with FAISS, serves contextual retrieval through FastAPI on AWS, and orchestrates document analysis, validation, and response generation with LangGraph.',
    impact: '60%',
    impactLabel: 'less manual review effort',
    stack: ['Python', 'LangChain', 'LangGraph', 'AWS Bedrock', 'FAISS', 'FastAPI', 'PostgreSQL'],
  },
  {
    number: '02',
    title: 'Serverless Sales Forecasting API',
    kicker: 'Serverless real-time ML inference',
    description: 'A Scikit-learn forecasting service delivered through AWS Lambda and API Gateway, with low-latency DynamoDB persistence and an event-driven architecture for variable production workloads.',
    impact: 'Daily',
    impactLabel: 'reliable releases through CI/CD',
    stack: ['Python', 'Scikit-learn', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'GitHub Actions'],
  },
]

const EXPERIENCE = [
  {
    role: 'AI Engineer',
    company: 'Moveworks',
    location: 'CA, USA',
    period: 'January 2025 — Present',
    stack: 'LangChain · FastAPI · RAG · Pinecone · AWS EKS · Redis · LangSmith',
    bullets: [
      ['Built Conversational AI workflows with LangChain and FastAPI to automate enterprise support requests, reducing repetitive ticket escalations by ', { metric: '34%' }, '.'],
      ['Integrated RAG pipelines with Pinecone and Semantic Search to deliver contextual responses from enterprise knowledge sources.'],
      ['Deployed containerized AI services on AWS EKS with Kubernetes and Redis caching, reducing peak-workload response latency by ', { metric: '26%' }, '.'],
      ['Monitored prompt execution and response traces through LangSmith to improve debugging visibility and response validation.'],
      ['Automated multilingual document understanding with Hugging Face Transformers, Python microservices, and PostgreSQL for internal policy retrieval.'],
    ],
  },
  {
    role: 'ML Engineer',
    company: 'Naykaa',
    location: 'Pune, India',
    period: 'September 2021 — July 2023',
    stack: 'Scikit-learn · PyTorch · PySpark · Databricks · Airflow · SageMaker',
    bullets: [
      ['Built Scikit-learn demand forecasting models from sales, promotional, and seasonal data, improving inventory-planning accuracy by ', { metric: '21%' }, '.'],
      ['Developed personalized recommendation pipelines with PyTorch, feature engineering, and customer behavior signals.'],
      ['Engineered PySpark and Databricks workflows for transaction and catalog data, reducing reporting inconsistencies by ', { metric: '17%' }, '.'],
      ['Automated feature engineering and ETL pipelines with Python, Airflow, and SQL for evolving retail inventories.'],
      ['Used feature importance, cross-validation, and performance monitoring to improve recommendation consistency by ', { metric: '19%' }, '.'],
      ['Deployed forecasting models on AWS SageMaker through REST APIs for scalable real-time inventory-planning inference.'],
    ],
  },
]

const EDUCATION = [
  {
    degree: 'Master of Science in Computer Science',
    school: 'California State University',
    period: 'August 2023 — May 2025',
    detail: 'CA, USA',
  },
  {
    degree: 'Bachelor of Science in Information Technology',
    school: 'Savitribai Phule Pune University',
    period: 'June 2019 — May 2023',
    detail: 'MH, India',
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

function Header({ theme, onThemeToggle }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="monogram" href="#top" aria-label="Back to top">AP</a>
      <div className="header-actions">
        <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
          {NAV_ITEMS.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="nav-contact" href="mailto:pingleakhil12@gmail.com">Let&apos;s talk <ArrowUpRight size={15} /></a>
        </nav>
        <button
          className="theme-toggle"
          type="button"
          onClick={onThemeToggle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <span className="theme-icon">{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</span>
          <span className="theme-label">{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
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
          <span className="portrait-tag"><span /> California, USA</span>
        </motion.div>

        <motion.p className="eyebrow" variants={fadeUp} transition={{ duration: 0.8 }}>AI/ML ENGINEER · 3+ YEARS · AWS CERTIFIED</motion.p>
        <motion.h1 variants={fadeUp} transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}>
          I turn AI models into<br /><em>production systems.</em>
        </motion.h1>
        <motion.p className="hero-summary" variants={fadeUp} transition={{ duration: 0.9 }}>
          Conversational AI, RAG, recommendation systems, and demand forecasting—built with modern ML pipelines and deployed as scalable, cloud-native applications on AWS.
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
        title="Applied AI, end to end."
        copy="I work across LLM orchestration, machine learning, distributed data pipelines, real-time inference, and cloud-native deployment."
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
        title="Two systems built for production."
        copy="Both projects come directly from the attached résumé and show the path from model and retrieval logic to scalable APIs and deployment."
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
                <a href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}>
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
        copy="Production work across enterprise Conversational AI, contextual retrieval, recommendation systems, forecasting, data pipelines, and real-time inference."
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
          <h3>AWS Certified Solutions Architect — Associate (SAA-C03)</h3>
          <p>Professional AWS cloud architecture certification.</p>
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
        <h2>Building a production AI or ML system?</h2>
        <p>Let&apos;s make it reliable, scalable, and useful.</p>
        <a className="contact-email" href="mailto:pingleakhil12@gmail.com">
          pingleakhil12@gmail.com <ArrowUpRight size={24} />
        </a>
      </Reveal>
      <div className="contact-footer">
        <div><MapPin size={15} /> California, USA</div>
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
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return document.documentElement.dataset.theme || 'light'
  })
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 28, restDelta: 0.001 })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Header theme={theme} onThemeToggle={() => setTheme((value) => value === 'light' ? 'dark' : 'light')} />
      <main>
        <Hero />
        <div className="trust-strip" aria-label="Core technologies">
          <span>CONVERSATIONAL AI</span><i />
          <span>RAG</span><i />
          <span>PYTORCH</span><i />
          <span>PYSPARK + DATABRICKS</span><i />
          <span>AWS</span><i />
          <span>MLOPS</span>
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
