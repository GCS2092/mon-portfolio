import { useState, useEffect } from 'react'
import { personalInfo } from '../data/links'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md border-b border-[#E8E6E1]' : 'bg-transparent'
    }`}>
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="font-mono text-sm font-medium text-[#1A1A1A] hover:text-[#2D5BE3] transition-colors">
          {personalInfo.name.toLowerCase().replace(' ', '.')}
        </a>
        <ul className="hidden md:flex items-center gap-8">
          <li><a href="#projects" className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">Projets</a></li>
          <li><a href="#contact" className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">Contact</a></li>
          <li>
            <a href={`mailto:${personalInfo.email}`}
              className="text-sm font-medium text-[#2D5BE3] border border-[#2D5BE3] px-4 py-1.5 rounded-full hover:bg-[#2D5BE3] hover:text-white transition-all">
              Me contacter
            </a>
          </li>
        </ul>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-1">
          <span className={`block w-5 h-px bg-[#1A1A1A] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-[#1A1A1A] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-[#1A1A1A] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#E8E6E1] px-6 py-6 flex flex-col gap-4">
          <a href="#projects" onClick={() => setMenuOpen(false)} className="text-sm text-[#6B6B6B]">Projets</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="text-sm text-[#6B6B6B]">Contact</a>
          <a href={`mailto:${personalInfo.email}`} className="text-sm font-medium text-[#2D5BE3]">Me contacter →</a>
        </div>
      )}
    </header>
  )
}