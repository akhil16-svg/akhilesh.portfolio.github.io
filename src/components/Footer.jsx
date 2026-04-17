import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-mono text-slate-500 text-sm">
          <span className="text-sky-400">AP</span>
          <span className="text-slate-600 mx-2">/</span>
          <span>© {new Date().getFullYear()} Akhilesh Pingle</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-300 transition-colors">
            <GithubIcon size={16} />
          </a>
          <a href="https://linkedin.com/in/linkakhil" target="_blank" rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-300 transition-colors">
            <LinkedinIcon size={16} />
          </a>
          <a href="mailto:pingleakhil12@gmail.com"
            className="text-slate-600 hover:text-slate-300 transition-colors">
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
