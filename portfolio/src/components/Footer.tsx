import { personalInfo } from '../data/links'

export default function Footer() {
  return (
    <footer className="border-t border-[#E8E6E1] py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="font-mono text-xs text-[#6B6B6B]">© {new Date().getFullYear()} {personalInfo.name}</span>
        <span className="font-mono text-xs text-[#6B6B6B]">Built with React + Tailwind CSS</span>
      </div>
    </footer>
  )
}