import { personalInfo } from '../data/links'
import { useLinks } from '../features/links/hooks/useLinks'
import { detectSocialIconKey, socialIcons } from '../features/links/icons'
import { useI18n } from '../features/i18n/useI18n'

export default function Hero() {
  const { links } = useLinks()
  const { t } = useI18n()

  return (
    <section id="hero" className="flex flex-col justify-start max-w-5xl mx-auto px-6 pt-20 md:pt-28">
      <div>
        <div className="inline-flex items-center gap-2 mb-6 md:mb-10 px-3 py-1.5 rounded-full border border-[#E8E6E1] bg-white text-xs text-[#6B6B6B] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {t('hero.available')}
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-[#1A1A1A] leading-tight tracking-tight mb-6">
          {personalInfo.name}<br />
          <span className="text-[#6B6B6B]">{t('hero.title')}</span>
        </h1>
        <p className="text-base md:text-lg text-[#6B6B6B] max-w-xl leading-relaxed mb-10">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <a href="#projects" className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[#2D5BE3] transition-colors">
            {t('hero.ctaProjects')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a href={`mailto:${personalInfo.email}`} className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
            {personalInfo.email}
          </a>
        </div>
        <div className="flex items-center gap-4">
          {links
            .filter((l) => l.url)
            .map((link) => {
              const key = detectSocialIconKey(link.url)
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors text-sm"
                >
                  {socialIcons[key]}
                  <span className="hidden sm:inline">{link.label}</span>
                </a>
              )
            })}
        </div>
      </div>
    </section>
  )
}