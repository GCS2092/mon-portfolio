import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { personalInfo } from '../data/links'
import { useI18n } from '../features/i18n/useI18n'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, toggleLang } = useI18n()

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
        <Link to="/#hero" className="font-mono text-sm font-medium text-[#1A1A1A] hover:text-[#2D5BE3] transition-colors">
          {personalInfo.name.toLowerCase().replace(' ', '.')}
        </Link>
        <ul className="hidden md:flex items-center gap-8">
          <li><Link to="/#projects" className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">{t('nav.projects')}</Link></li>
          <li><Link to="/frameworks" className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">{t('nav.frameworks')}</Link></li>
          <li><Link to="/#contact" className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">{t('nav.contact')}</Link></li>
          <li>
            <a href={`mailto:${personalInfo.email}`}
              className="text-sm font-medium text-[#2D5BE3] border border-[#2D5BE3] px-4 py-1.5 rounded-full hover:bg-[#2D5BE3] hover:text-white transition-all">
              {t('nav.cta')}
            </a>
          </li>
          <li>
            <button
              type="button"
              onClick={toggleLang}
              className="text-xs font-mono text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors border border-[#E8E6E1] bg-white px-3 py-1.5 rounded-full"
              aria-label="Toggle language"
            >
              {t('nav.lang')}
            </button>
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
          <Link to="/#projects" onClick={() => setMenuOpen(false)} className="text-sm text-[#6B6B6B]">{t('nav.projects')}</Link>
          <Link to="/frameworks" onClick={() => setMenuOpen(false)} className="text-sm text-[#6B6B6B]">{t('nav.frameworks')}</Link>
          <Link to="/#contact" onClick={() => setMenuOpen(false)} className="text-sm text-[#6B6B6B]">{t('nav.contact')}</Link>
          <a href={`mailto:${personalInfo.email}`} className="text-sm font-medium text-[#2D5BE3]">{t('nav.cta')} →</a>
          <button
            type="button"
            onClick={() => {
              toggleLang()
            }}
            className="text-xs font-mono text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors border border-[#E8E6E1] bg-white px-3 py-2 rounded-full w-fit"
          >
            {t('nav.lang')}
          </button>
        </div>
      )}

    </header>
  )
}