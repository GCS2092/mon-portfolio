import { useEffect, useRef, useState } from 'react'
import { personalInfo } from '../data/links'
import { useLinks } from '../features/links/hooks/useLinks'
import { detectSocialIconKey, socialIcons } from '../features/links/icons'
import { useI18n } from '../features/i18n/useI18n'

export default function Contact() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const { links } = useLinks()
  const { t } = useI18n()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 max-w-5xl mx-auto px-6">
      <div className="h-px w-full bg-[#E8E6E1] mb-24" />
      <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#2D5BE3]">03</span>
          <span className="h-px w-10 bg-[#E8E6E1]" />
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-light text-[#1A1A1A] tracking-tight leading-tight mb-4">
              {t('contact.title').split('\n').map((line, idx, arr) => (
                <span key={idx}>
                  {line}
                  {idx < arr.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
            <p className="text-[#6B6B6B] text-sm max-w-sm leading-relaxed">
              {t('contact.subtitle').split('\n').map((line, idx, arr) => (
                <span key={idx}>
                  {line}
                  {idx < arr.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          </div>
          <a href={`mailto:${personalInfo.email}`}
            className="group inline-flex items-center gap-3 text-[#1A1A1A] font-light text-xl md:text-2xl hover:text-[#2D5BE3] transition-colors">
            <span>{personalInfo.email}</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
        <div className="flex items-center gap-6 mt-14 pt-10 border-t border-[#E8E6E1]">
          <span className="font-mono text-xs text-[#6B6B6B] mr-2">{t('contact.findMeOn')}</span>
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
                  <span>{link.label}</span>
                </a>
              )
            })}
        </div>
      </div>
    </section>
  )
}