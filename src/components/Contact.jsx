import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react'
import { LinkedinIcon } from './BrandIcons'

function validate(fields) {
  const errors = {}
  if (!fields.name.trim() || fields.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = 'Enter a valid email address.'
  if (!fields.subject.trim() || fields.subject.trim().length < 3) errors.subject = 'Subject must be at least 3 characters.'
  if (!fields.message.trim() || fields.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
  return errors
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(f => ({ ...f, [name]: value }))
    if (errors[name]) {
      const newErrors = validate({ ...fields, [name]: value })
      setErrors(prev => ({ ...prev, [name]: newErrors[name] }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(fields)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStatus('success')
      setFields({ name: '', email: '', subject: '', message: '' })
      setErrors({})
      setTimeout(() => setStatus(null), 6000)
    }, 1200)
  }

  const inputClass = (field) =>
    `w-full bg-white/[0.04] border rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 focus:ring-1 ${
      errors[field]
        ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
        : 'border-white/[0.08] focus:border-sky-500/50 focus:ring-sky-500/10 hover:border-white/[0.12]'
    }`

  return (
    <section id="contact" className="py-24 px-6 bg-[#0d1017]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sky-400/70 text-sm tracking-wider">// contact</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Let&apos;s Build Something</h2>
          <p className="text-slate-400 mt-3 max-w-xl">
            Open to software engineering opportunities, contract work, and interesting projects. 
            Let&apos;s connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: Mail, label: 'Email', value: 'pingleakhil12@gmail.com', href: 'mailto:pingleakhil12@gmail.com' },
              { icon: LinkedinIcon, label: 'LinkedIn', value: 'linkedin.com/in/linkakhil', href: 'https://linkedin.com/in/linkakhil' },
              { icon: MapPin, label: 'Location', value: 'San Francisco Bay Area, CA', sub: 'Open to Relocate', href: null },
            ].map(({ icon: Icon, label, value, sub, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={15} className="text-sky-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">{label}</div>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      className="text-sm text-slate-300 hover:text-sky-400 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <div className="text-sm text-slate-300">{value}</div>
                  )}
                  {sub && <div className="text-xs text-emerald-400 mt-0.5">{sub}</div>}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input name="name" placeholder="Name" value={fields.name}
                    onChange={handleChange} className={inputClass('name')} />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input name="email" type="email" placeholder="Email" value={fields.email}
                    onChange={handleChange} className={inputClass('email')} />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <input name="subject" placeholder="Subject" value={fields.subject}
                  onChange={handleChange} className={inputClass('subject')} />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
              </div>
              <div>
                <textarea name="message" rows={5} placeholder="Your message..." value={fields.message}
                  onChange={handleChange} className={inputClass('message') + ' resize-none'} />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3">
                  <CheckCircle size={16} />
                  <span>Message sent! I&apos;ll get back to you soon.</span>
                </div>
              )}

              <button type="submit" disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-60 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-sky-500/20">
                <Send size={15} />
                {loading ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
