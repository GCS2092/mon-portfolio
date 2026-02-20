import type { Project, ProjectArchitecture, ProjectTech } from './types'
import type { Lang } from '../i18n/types'

function pick(lang: Lang, fr?: string, en?: string) {
  if (lang === 'en') return en?.trim() ? en : fr ?? ''
  return fr ?? ''
}

export function getProjectTitle(project: Project, lang: Lang) {
  return pick(lang, project.title, project.titleEn)
}

export function getProjectShortDescription(project: Project, lang: Lang) {
  return pick(lang, project.shortDescription, project.shortDescriptionEn)
}

export function getProjectFullDescription(project: Project, lang: Lang) {
  return pick(lang, project.fullDescription, project.fullDescriptionEn)
}

export function getProjectArchitectureDescription(
  architecture: ProjectArchitecture | undefined,
  lang: Lang
) {
  if (!architecture) return ''
  return pick(lang, architecture.description, architecture.descriptionEn)
}

export function getTechRole(tech: ProjectTech, lang: Lang) {
  return pick(lang, tech.role, tech.roleEn)
}

export function getTechDescription(tech: ProjectTech, lang: Lang) {
  return pick(lang, tech.description, tech.descriptionEn)
}

export function getTechHow(tech: ProjectTech, lang: Lang) {
  return pick(lang, tech.how, tech.howEn)
}

export function getTechImportance(tech: ProjectTech, lang: Lang) {
  return pick(lang, tech.importance, tech.importanceEn)
}
