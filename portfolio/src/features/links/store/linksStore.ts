import type { SocialLink } from '../types'

const STORAGE_KEY = 'portfolio:social_links:v1'

export function loadLinks(): SocialLink[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  const parsed = JSON.parse(raw) as unknown
  if (!Array.isArray(parsed)) return []
  return parsed as SocialLink[]
}

export function saveLinks(links: SocialLink[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links))
}
