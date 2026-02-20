import type { FrameworksContent } from '../types'

const STORAGE_KEY = 'portfolio:frameworks:v1'

export function loadFrameworks(): FrameworksContent | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  const parsed = JSON.parse(raw) as unknown
  if (!parsed || typeof parsed !== 'object') return null
  return parsed as FrameworksContent
}

export function saveFrameworks(content: FrameworksContent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
}
