import type { Project } from '../types'
import { defaultProjects } from '../data/defaultProjects'

const STORAGE_KEY = 'portfolio.projects.v1'

export function hasStoredProjects(): boolean {
  return Boolean(localStorage.getItem(STORAGE_KEY))
}

export function loadProjects(): Project[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return defaultProjects
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return defaultProjects
    const stored = parsed as Project[]

    const bySlug = new Map<string, Project>()
    for (const p of stored) {
      if (p && typeof p.slug === 'string' && p.slug.trim()) {
        bySlug.set(p.slug, p)
      }
    }

    const merged: Project[] = [...stored]
    for (const p of defaultProjects) {
      if (!bySlug.has(p.slug)) merged.push(p)
    }

    return merged
  } catch {
    return defaultProjects
  }
}

export function saveProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export function resetProjects() {
  saveProjects(defaultProjects)
}
