import { useEffect } from 'react'
import { useI18n } from '../features/i18n/useI18n'
import { useFrameworks } from '../features/frameworks/hooks/useFrameworks'
import {
  getFrameworksApiBody,
  getFrameworksApiTitle,
  getFrameworksHeroSubtitle,
  getFrameworksHeroTitle,
  getFrameworksHighlightsBody,
  getFrameworksHighlightsTitle,
  getFrameworksMobileBody,
  getFrameworksMobileTitle,
  getFrameworksNowBody,
  getFrameworksNowTitle,
  getFrameworksReactBody,
  getFrameworksReactTitle,
  getFrameworksToolingBody,
  getFrameworksToolingTitle,
} from '../features/frameworks/i18n'

export default function FrameworksPage() {
  const { lang } = useI18n()
  const { content } = useFrameworks()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <section className="pt-32 pb-16 max-w-5xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#E8E6E1] bg-white text-xs text-[#6B6B6B] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2D5BE3]" />
          {lang === 'fr' ? 'Compétences & intégrations' : 'Skills & integrations'}
        </div>
        <h1 className="text-3xl md:text-6xl font-light text-[#1A1A1A] tracking-tight mb-6">
          {getFrameworksHeroTitle(content, lang)}
        </h1>
        <p className="text-[#6B6B6B] text-base md:text-lg leading-relaxed max-w-3xl">
          {getFrameworksHeroSubtitle(content, lang)}
        </p>
      </section>

      <section className="pb-24 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-3 p-6 rounded-2xl border border-[#E8E6E1] bg-white">
            <p className="font-mono text-xs text-[#2D5BE3] mb-2">
              {getFrameworksHighlightsTitle(content, lang)}
            </p>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              {getFrameworksHighlightsBody(content, lang)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-[#E8E6E1] bg-white">
            <p className="font-mono text-xs text-[#2D5BE3] mb-2">{getFrameworksReactTitle(content, lang)}</p>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">{getFrameworksReactBody(content, lang)}</p>
          </div>

          <div className="p-6 rounded-2xl border border-[#E8E6E1] bg-white">
            <p className="font-mono text-xs text-[#2D5BE3] mb-2">{getFrameworksApiTitle(content, lang)}</p>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">{getFrameworksApiBody(content, lang)}</p>
          </div>

          <div className="p-6 rounded-2xl border border-[#E8E6E1] bg-white">
            <p className="font-mono text-xs text-[#2D5BE3] mb-2">{getFrameworksToolingTitle(content, lang)}</p>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">{getFrameworksToolingBody(content, lang)}</p>
          </div>

          <div className="p-6 rounded-2xl border border-[#E8E6E1] bg-white">
            <p className="font-mono text-xs text-[#2D5BE3] mb-2">{getFrameworksMobileTitle(content, lang)}</p>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">{getFrameworksMobileBody(content, lang)}</p>
          </div>

          <div className="md:col-span-2 p-6 rounded-2xl border border-[#E8E6E1] bg-white">
            <p className="font-mono text-xs text-[#2D5BE3] mb-2">{getFrameworksNowTitle(content, lang)}</p>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">{getFrameworksNowBody(content, lang)}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
