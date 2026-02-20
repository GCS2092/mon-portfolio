import type { Lang } from '../i18n/types'
import type { FrameworksContent } from './types'

function pick(lang: Lang, fr?: string, en?: string) {
  if (lang === 'en') return en?.trim() ? en : fr ?? ''
  return fr ?? ''
}

export function getFrameworksHeroTitle(content: FrameworksContent, lang: Lang) {
  return pick(lang, content.heroTitle, content.heroTitleEn)
}

export function getFrameworksHeroSubtitle(content: FrameworksContent, lang: Lang) {
  return pick(lang, content.heroSubtitle, content.heroSubtitleEn)
}

export function getFrameworksHighlightsTitle(content: FrameworksContent, lang: Lang) {
  return pick(lang, content.highlightsTitle, content.highlightsTitleEn)
}

export function getFrameworksHighlightsBody(content: FrameworksContent, lang: Lang) {
  return pick(lang, content.highlightsBody, content.highlightsBodyEn)
}

export function getFrameworksReactTitle(content: FrameworksContent, lang: Lang) {
  return pick(lang, content.reactTitle, content.reactTitleEn)
}

export function getFrameworksReactBody(content: FrameworksContent, lang: Lang) {
  return pick(lang, content.reactBody, content.reactBodyEn)
}

export function getFrameworksApiTitle(content: FrameworksContent, lang: Lang) {
  return pick(lang, content.apiTitle, content.apiTitleEn)
}

export function getFrameworksApiBody(content: FrameworksContent, lang: Lang) {
  return pick(lang, content.apiBody, content.apiBodyEn)
}

export function getFrameworksMobileTitle(content: FrameworksContent, lang: Lang) {
  return pick(lang, content.mobileTitle, content.mobileTitleEn)
}

export function getFrameworksMobileBody(content: FrameworksContent, lang: Lang) {
  return pick(lang, content.mobileBody, content.mobileBodyEn)
}

export function getFrameworksToolingTitle(content: FrameworksContent, lang: Lang) {
  return pick(lang, content.toolingTitle, content.toolingTitleEn)
}

export function getFrameworksToolingBody(content: FrameworksContent, lang: Lang) {
  return pick(lang, content.toolingBody, content.toolingBodyEn)
}

export function getFrameworksNowTitle(content: FrameworksContent, lang: Lang) {
  return pick(lang, content.nowTitle, content.nowTitleEn)
}

export function getFrameworksNowBody(content: FrameworksContent, lang: Lang) {
  return pick(lang, content.nowBody, content.nowBodyEn)
}
