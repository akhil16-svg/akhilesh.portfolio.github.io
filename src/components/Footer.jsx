import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-sm font-semibold text-slate-500">
          <span className="text-slate-950">Akhilesh Pingle</span>
          <span className="mx-2 text-slate-300">/</span>
          <span>Copyright {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/akhil16-svg" target="_blank" rel="noopener noreferrer"
            className="text-slate-400 transition hover:text-slate-950" aria-label="GitHub">
            <GithubIcon size={17} />
          </a>
          <a href="https://linkedin.com/in/linkakhil" target="_blank" rel="noopener noreferrer"
            className="text-slate-400 transition hover:text-blue-700" aria-label="LinkedIn">
            <LinkedinIcon size={17} />
          </a>
          <a href="mailto:pingleakhil12@gmail.com"
            className="text-slate-400 transition hover:text-slate-950" aria-label="Email">
            <Mail size={17} />
          </a>
        </div>
      </div>
    </footer>
  )
}
