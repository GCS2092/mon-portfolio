import { useI18n } from '../features/i18n/useI18n'

function renderLines(text: string) {
  return text.split('\n').map((line, idx, arr) => (
    <span key={idx}>
      {line}
      {idx < arr.length - 1 ? <br /> : null}
    </span>
  ))
}

export default function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="py-24 md:py-28 max-w-5xl mx-auto px-6">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#2D5BE3]">01</span>
          <span className="h-px w-10 bg-[#E8E6E1]" />
        </div>

        <h2 className="text-3xl md:text-4xl font-light text-[#1A1A1A] tracking-tight">
          {t('about.title')}
        </h2>
        <p className="text-[#6B6B6B] text-sm mt-3 max-w-2xl leading-relaxed">
          {renderLines(t('about.body'))}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div id="hire" className="p-6 rounded-2xl border border-[#E8E6E1] bg-white">
          <p className="font-mono text-xs text-[#2D5BE3] mb-2">{t('about.hire.kicker')}</p>
          <h3 className="text-xl font-medium text-[#1A1A1A] mb-3">{t('about.hire.title')}</h3>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">{renderLines(t('about.hire.body'))}</p>
        </div>

        <div id="services" className="p-6 rounded-2xl border border-[#E8E6E1] bg-white">
          <p className="font-mono text-xs text-[#2D5BE3] mb-2">{t('about.services.kicker')}</p>
          <h3 className="text-xl font-medium text-[#1A1A1A] mb-3">{t('about.services.title')}</h3>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">{renderLines(t('about.services.body'))}</p>
        </div>
      </div>
    </section>
  )
}
